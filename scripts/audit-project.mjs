#!/usr/bin/env node

/**
 * Let Flow 369 — Auditoria estática do projeto
 *
 * Uso:
 *   node scripts/audit-project.mjs
 *   node scripts/audit-project.mjs --root . --strict
 *   node scripts/audit-project.mjs --json
 *
 * Exit codes:
 *   0 = sem erros (avisos não falham, exceto com --strict)
 *   1 = erros encontrados, ou avisos em --strict
 *   2 = erro interno / argumentos inválidos
 *
 * Sem dependências externas: usa apenas módulos nativos do Node.js.
 */

import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_ROOT = path.resolve(SCRIPT_DIR, '..');

const CONFIG = Object.freeze({
  siteOrigin: 'https://letflow369.github.io',
  deploymentBase: '/x/',
  expectedBrandName: 'Let Flow 369',
  expectedTagline: 'Por dentro da mente de um adulto com TDAH.',
  requiredRootFiles: [
    'index.html',
    '404.html',
    'sitemap.xml',
    'robots.txt',
    'site.webmanifest',
  ],
  ignoredDirectories: new Set([
    '.git',
    'node_modules',
    'dist',
    'build',
    '.cache',
    '.idea',
    '.vscode',
    'templates',
  ]),
  publicHtmlExcludedFromSitemap: new Set(['404.html']),
  ignoredAuditFiles: new Set(['scripts/audit-project.mjs']),
  placeholderPatterns: [
    { regex: /\blorem ipsum\b/i, label: 'Lorem ipsum' },
    { regex: /\bTODO\b/, label: 'TODO' },
    { regex: /\bFIXME\b/, label: 'FIXME' },
  ],
  prohibitedReadingFeaturePatterns: [
    { regex: /\bspeechSynthesis\b/i, label: 'Web Speech API: speechSynthesis' },
    { regex: /\bSpeechSynthesisUtterance\b/i, label: 'Web Speech API: SpeechSynthesisUtterance' },
    { regex: /\btext[-_ ]?to[-_ ]?speech\b/i, label: 'text-to-speech' },
    { regex: /\bread[-_ ]?aloud\b/i, label: 'read-aloud' },
    { regex: /\breading[-_ ]?controls?\b/i, label: 'controles próprios de leitura' },
    { regex: /\bfont[-_ ]?size[-_ ]?controls?\b/i, label: 'controle próprio de tamanho de fonte' },
    { regex: /\btext[-_ ]?size[-_ ]?controls?\b/i, label: 'controle próprio de tamanho de texto' },
    { regex: /\bfont[-_ ]?controls?\b/i, label: 'controle próprio de fonte' },
    { regex: /\bouvir\s+(?:a\s+)?p[aá]gina\b/i, label: 'botão/ação “ouvir página”' },
    { regex: /\bler\s+(?:a\s+)?p[aá]gina\b/i, label: 'botão/ação “ler página”' },
    { regex: /\bleitura\s+em\s+voz\s+alta\b/i, label: 'leitura em voz alta' },
  ],
});

const args = parseArgs(process.argv.slice(2));
const root = path.resolve(args.root ?? DEFAULT_ROOT);
const colorEnabled = !args.json && !args.noColor && process.stdout.isTTY;

const issues = [];
const stats = {
  html: 0,
  css: 0,
  js: 0,
  assetsChecked: 0,
  internalLinksChecked: 0,
  fragmentsChecked: 0,
  sitemapUrls: 0,
};

const fileCache = new Map();
const htmlIdCache = new Map();
const domClassChildTags = new Map();

main().catch((error) => {
  if (args.json) {
    process.stdout.write(`${JSON.stringify({ ok: false, internalError: String(error?.stack ?? error) }, null, 2)}\n`);
  } else {
    console.error(`\nErro interno da auditoria:\n${error?.stack ?? error}`);
  }
  process.exitCode = 2;
});

async function main() {
  ensureRoot();

  const files = walkFiles(root);
  const htmlFiles = files.filter((file) => file.endsWith('.html'));
  const cssFiles = files.filter((file) => file.endsWith('.css'));
  const jsFiles = files
    .filter((file) => file.endsWith('.js') || file.endsWith('.mjs'))
    .filter((file) => !CONFIG.ignoredAuditFiles.has(rel(file)));

  stats.html = htmlFiles.length;
  stats.css = cssFiles.length;
  stats.js = jsFiles.length;

  buildDomClassChildIndex(htmlFiles);
  auditProjectStructure();

  for (const file of htmlFiles) auditHtmlFile(file);
  for (const file of cssFiles) auditCssFile(file);
  for (const file of jsFiles) auditJsFile(file);

  auditManifest();
  auditSitemap(htmlFiles);
  auditRobots();
  auditGlobalProjectRules(files);

  const sorted = [...issues].sort(compareIssues);
  const counts = summarize(sorted);
  const failed = counts.error > 0 || (args.strict && counts.warning > 0);

  if (args.json) {
    const payload = {
      ok: !failed,
      strict: args.strict,
      root,
      stats,
      summary: counts,
      issues: sorted,
    };
    process.stdout.write(`${JSON.stringify(payload, null, 2)}\n`);
  } else {
    printHumanReport(sorted, counts, failed);
  }

  process.exitCode = failed ? 1 : 0;
}

function parseArgs(argv) {
  const parsed = {
    root: null,
    strict: false,
    json: false,
    noColor: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];

    if (arg === '--root') {
      const value = argv[i + 1];
      if (!value || value.startsWith('--')) failArgs('--root exige um caminho.');
      parsed.root = value;
      i += 1;
      continue;
    }

    if (arg.startsWith('--root=')) {
      parsed.root = arg.slice('--root='.length);
      continue;
    }

    if (arg === '--strict') {
      parsed.strict = true;
      continue;
    }

    if (arg === '--json') {
      parsed.json = true;
      continue;
    }

    if (arg === '--no-color') {
      parsed.noColor = true;
      continue;
    }

    if (arg === '--help' || arg === '-h') {
      printHelp();
      process.exit(0);
    }

    failArgs(`Argumento desconhecido: ${arg}`);
  }

  return parsed;
}

function failArgs(message) {
  console.error(message);
  console.error('Use --help para ver as opções.');
  process.exit(2);
}

function printHelp() {
  console.log(`Let Flow 369 — auditoria estática\n\nUso:\n  node scripts/audit-project.mjs [opções]\n\nOpções:\n  --root <caminho>  Raiz do projeto (padrão: diretório pai de scripts/)\n  --strict          Avisos também causam exit code 1\n  --json            Saída JSON para CI ou processamento\n  --no-color        Desabilita cores no terminal\n  -h, --help        Exibe esta ajuda\n\nExit codes:\n  0  sem erros\n  1  auditoria falhou\n  2  erro interno ou de argumentos\n`);
}

function ensureRoot() {
  if (!fs.existsSync(root) || !fs.statSync(root).isDirectory()) {
    throw new Error(`Raiz do projeto não encontrada: ${root}`);
  }
}

function walkFiles(directory) {
  const output = [];
  const entries = fs.readdirSync(directory, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory() && CONFIG.ignoredDirectories.has(entry.name)) continue;

    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      output.push(...walkFiles(absolute));
    } else if (entry.isFile()) {
      output.push(absolute);
    }
  }

  return output;
}

function auditProjectStructure() {
  for (const relative of CONFIG.requiredRootFiles) {
    const absolute = path.join(root, relative);
    if (!fs.existsSync(absolute)) {
      addIssue('error', 'PROJECT_REQUIRED_FILE_MISSING', relative, `Arquivo obrigatório ausente: ${relative}`);
    }
  }
}

function auditHtmlFile(file) {
  const html = readText(file);
  const relative = rel(file);
  const masked = maskRawText(html);

  const mainCount = countOpeningTags(masked, 'main');
  if (mainCount !== 1) {
    addIssue('error', 'HTML_MAIN_COUNT', relative, `Esperado exatamente 1 <main>; encontrado(s): ${mainCount}.`);
  }

  const h1Count = countOpeningTags(masked, 'h1');
  if (h1Count !== 1) {
    addIssue('error', 'HTML_H1_COUNT', relative, `Esperado exatamente 1 <h1>; encontrado(s): ${h1Count}.`);
  }

  const htmlTag = findFirstStartTag(masked, 'html');
  if (htmlTag) {
    const attrs = parseAttributes(htmlTag.text);
    const lang = attrs.get('lang');
    if (!lang) {
      addIssue('warning', 'HTML_LANG_MISSING', relative, '<html> sem atributo lang.');
    } else if (!/^pt(?:-br)?$/i.test(lang)) {
      addIssue('warning', 'HTML_LANG_UNEXPECTED', relative, `Idioma inesperado no <html>: ${lang}. Esperado pt-BR.`);
    }
  }

  auditHtmlIds(html, relative);
  auditHtmlMetadata(masked, relative);
  auditBrand(html, relative);
  auditHtmlAttributesAndReferences(file, html, masked);
  auditHtmlPlaceholders(html, relative);
}

function auditHtmlIds(html, relative) {
  const ids = extractIds(html);
  const seen = new Map();

  for (const item of ids) {
    if (seen.has(item.id)) {
      addIssue(
        'error',
        'HTML_DUPLICATE_ID',
        relative,
        `ID duplicado: #${item.id}.`,
        lineNumber(html, item.index),
      );
    } else {
      seen.set(item.id, item.index);
    }
  }
}

function auditHtmlMetadata(html, relative) {
  const is404 = relative === '404.html';
  const titleMatches = [...html.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)];

  if (titleMatches.length !== 1) {
    addIssue('error', 'SEO_TITLE_COUNT', relative, `Esperado exatamente 1 <title>; encontrado(s): ${titleMatches.length}.`);
  } else if (!stripHtml(titleMatches[0][1]).trim()) {
    addIssue('error', 'SEO_TITLE_EMPTY', relative, '<title> vazio.');
  }

  const descriptionMatches = [...html.matchAll(/<meta\b[^>]*\bname\s*=\s*["']description["'][^>]*>/gi)];
  if (!is404 && descriptionMatches.length === 0) {
    addIssue('warning', 'SEO_DESCRIPTION_MISSING', relative, 'Meta description ausente.');
  }

  const canonicalMatches = [...html.matchAll(/<link\b[^>]*\brel\s*=\s*["'][^"']*canonical[^"']*["'][^>]*>/gi)];
  if (!is404 && canonicalMatches.length === 0) {
    addIssue('warning', 'SEO_CANONICAL_MISSING', relative, 'Link canonical ausente.');
  }

  const ogTitle = [...html.matchAll(/<meta\b[^>]*\bproperty\s*=\s*["']og:title["'][^>]*>/gi)];
  const ogDescription = [...html.matchAll(/<meta\b[^>]*\bproperty\s*=\s*["']og:description["'][^>]*>/gi)];
  if (!is404 && ogTitle.length === 0) {
    addIssue('warning', 'SEO_OG_TITLE_MISSING', relative, 'Open Graph og:title ausente.');
  }
  if (!is404 && ogDescription.length === 0) {
    addIssue('warning', 'SEO_OG_DESCRIPTION_MISSING', relative, 'Open Graph og:description ausente.');
  }
}

function auditBrand(html, relative) {
  const taglines = extractClassElementText(html, 'brand__tagline');
  const names = extractClassElementText(html, 'brand__name');

  for (const value of taglines) {
    if (normalizeText(value.text) !== normalizeText(CONFIG.expectedTagline)) {
      addIssue(
        'error',
        'BRAND_TAGLINE_MISMATCH',
        relative,
        `Slogan incorreto: “${normalizeText(value.text)}”. Esperado: “${CONFIG.expectedTagline}”`,
        lineNumber(html, value.index),
      );
    }
  }

  for (const value of names) {
    if (normalizeText(value.text).toLowerCase() !== CONFIG.expectedBrandName.toLowerCase()) {
      addIssue(
        'warning',
        'BRAND_NAME_MISMATCH',
        relative,
        `Nome de marca inesperado: “${normalizeText(value.text)}”.`,
        lineNumber(html, value.index),
      );
    }
  }

  if (relative !== '404.html' && taglines.length === 0) {
    addIssue('warning', 'BRAND_TAGLINE_MISSING', relative, 'Cabeçalho sem .brand__tagline.');
  }
}

function auditHtmlAttributesAndReferences(file, html, masked) {
  const relative = rel(file);
  const ids = getHtmlIds(file);
  const tags = extractStartTags(masked);

  for (const tag of tags) {
    const attrs = parseAttributes(tag.text);
    const line = lineNumber(html, tag.index);

    if (tag.name === 'img' && !attrs.has('alt')) {
      addIssue('error', 'A11Y_IMG_ALT_MISSING', relative, '<img> sem atributo alt.', line);
    }

    if (attrs.has('aria-labelledby')) {
      for (const id of splitIdRefs(attrs.get('aria-labelledby'))) {
        if (!ids.has(id)) {
          addIssue('error', 'A11Y_ARIA_LABELLEDBY_BROKEN', relative, `aria-labelledby aponta para #${id}, que não existe.`, line);
        }
      }
    }

    if (attrs.has('aria-describedby')) {
      for (const id of splitIdRefs(attrs.get('aria-describedby'))) {
        if (!ids.has(id)) {
          addIssue('error', 'A11Y_ARIA_DESCRIBEDBY_BROKEN', relative, `aria-describedby aponta para #${id}, que não existe.`, line);
        }
      }
    }

    if (tag.name === 'label' && attrs.has('for')) {
      const id = attrs.get('for');
      if (id && !ids.has(id)) {
        addIssue('error', 'A11Y_LABEL_FOR_BROKEN', relative, `<label for="${id}"> aponta para ID inexistente.`, line);
      }
    }

    if (attrs.get('target') === '_blank') {
      const relAttr = attrs.get('rel') ?? '';
      if (!/\bnoopener\b/i.test(relAttr)) {
        addIssue('warning', 'SECURITY_TARGET_BLANK_NO_NOOPENER', relative, 'Link target="_blank" sem rel="noopener".', line);
      }
    }

    if (attrs.has('href')) {
      auditReference(file, attrs.get('href'), 'href', line);
    }

    if (attrs.has('src')) {
      auditReference(file, attrs.get('src'), 'src', line);
    }

    if (attrs.has('srcset')) {
      for (const candidate of parseSrcset(attrs.get('srcset'))) {
        auditReference(file, candidate, 'srcset', line);
      }
    }
  }
}

function auditReference(sourceFile, rawValue, attribute, line) {
  if (!rawValue) return;
  const value = decodeHtmlEntities(rawValue.trim());
  const relative = rel(sourceFile);

  if (/^javascript:/i.test(value)) {
    addIssue('error', 'HTML_JAVASCRIPT_URL', relative, `${attribute} usa URL javascript:, evite esse padrão.`, line);
    return;
  }

  const sameSiteAbsolute = mapSameSiteAbsoluteUrl(value);
  if (sameSiteAbsolute == null && isSameOriginAbsoluteOutsideBase(value)) {
    addIssue(
      'error',
      'SITE_URL_OUTSIDE_DEPLOYMENT_BASE',
      relative,
      `URL da própria origem está fora da base ${CONFIG.deploymentBase}: ${value}`,
      line,
    );
    return;
  }
  if (sameSiteAbsolute == null && isSkippableUrl(value)) return;

  const effective = sameSiteAbsolute ?? value;
  const { pathPart, fragment } = splitUrl(effective);

  if (pathPart.startsWith('/') && !pathPart.startsWith(CONFIG.deploymentBase)) {
    addIssue(
      'error',
      'ROOT_PATH_OUTSIDE_DEPLOYMENT_BASE',
      relative,
      `Caminho absoluto local fora da base ${CONFIG.deploymentBase}: ${value}`,
      line,
    );
    return;
  }

  if (!pathPart && fragment) {
    stats.fragmentsChecked += 1;
    const targetIds = getHtmlIds(sourceFile);
    if (!targetIds.has(fragment)) {
      addIssue('error', 'LINK_FRAGMENT_BROKEN', relative, `Fragmento #${fragment} não existe na própria página.`, line);
    }
    return;
  }

  const target = resolveLocalReference(sourceFile, pathPart);
  if (!target) return;

  stats.assetsChecked += 1;
  if (attribute === 'href') stats.internalLinksChecked += 1;

  if (!isInsideRoot(target)) {
    addIssue('error', 'LINK_ESCAPES_PROJECT', relative, `Referência sai da raiz do projeto: ${value}`, line);
    return;
  }

  if (!fs.existsSync(target)) {
    addIssue('error', 'LOCAL_REFERENCE_MISSING', relative, `Arquivo local não encontrado (${attribute}): ${value}`, line);
    return;
  }

  if (fragment && target.toLowerCase().endsWith('.html')) {
    stats.fragmentsChecked += 1;
    const targetIds = getHtmlIds(target);
    if (!targetIds.has(fragment)) {
      addIssue('error', 'LINK_FRAGMENT_BROKEN', relative, `Fragmento #${fragment} não existe em ${rel(target)}.`, line);
    }
  }
}

function auditHtmlPlaceholders(html, relative) {
  for (const { regex, label } of CONFIG.placeholderPatterns) {
    const match = regex.exec(html);
    regex.lastIndex = 0;
    if (match) {
      addIssue('warning', 'CONTENT_PLACEHOLDER', relative, `Possível conteúdo provisório encontrado: ${label}.`, lineNumber(html, match.index));
    }
  }
}

function auditCssFile(file) {
  const css = readText(file);
  const relative = rel(file);
  const balance = scanCssBalance(css);

  if (balance.error) {
    addIssue('error', 'CSS_SYNTAX_BALANCE', relative, balance.error, balance.line);
  }

  auditCssDirectChildSelectors(css, relative);

  const urlRegex = /url\(\s*(["']?)(.*?)\1\s*\)/gi;
  for (const match of css.matchAll(urlRegex)) {
    const value = match[2].trim();
    if (!value || isSkippableUrl(value) || value.startsWith('#')) continue;

    const target = resolveLocalReference(file, splitUrl(value).pathPart);
    if (!target) continue;
    stats.assetsChecked += 1;

    if (!isInsideRoot(target)) {
      addIssue('error', 'CSS_URL_ESCAPES_PROJECT', relative, `url() sai da raiz do projeto: ${value}`, lineNumber(css, match.index));
    } else if (!fs.existsSync(target)) {
      addIssue('error', 'CSS_URL_MISSING', relative, `Arquivo referenciado por url() não encontrado: ${value}`, lineNumber(css, match.index));
    }
  }
}

function auditJsFile(file) {
  const relative = rel(file);
  const result = spawnSync(process.execPath, ['--check', file], {
    cwd: root,
    encoding: 'utf8',
    timeout: 20_000,
  });

  if (result.error) {
    addIssue('error', 'JS_CHECK_FAILED', relative, `Falha ao executar node --check: ${result.error.message}`);
    return;
  }

  if (result.status !== 0) {
    const message = (result.stderr || result.stdout || 'Erro de sintaxe JavaScript.').trim().split('\n').slice(-4).join(' ');
    addIssue('error', 'JS_SYNTAX', relative, message);
  }
}

function auditManifest() {
  const file = path.join(root, 'site.webmanifest');
  if (!fs.existsSync(file)) return;

  let manifest;
  try {
    manifest = JSON.parse(readText(file));
  } catch (error) {
    addIssue('error', 'MANIFEST_JSON_INVALID', 'site.webmanifest', `JSON inválido: ${error.message}`);
    return;
  }

  if (!manifest.name || !manifest.short_name) {
    addIssue('warning', 'MANIFEST_NAME_MISSING', 'site.webmanifest', 'Manifest sem name ou short_name.');
  }

  if (Array.isArray(manifest.icons)) {
    for (const icon of manifest.icons) {
      if (!icon?.src) continue;
      const target = resolveLocalReference(file, splitUrl(icon.src).pathPart);
      if (target && !fs.existsSync(target)) {
        addIssue('error', 'MANIFEST_ICON_MISSING', 'site.webmanifest', `Ícone do manifest não encontrado: ${icon.src}`);
      }
    }
  }
}

function auditSitemap(htmlFiles) {
  const file = path.join(root, 'sitemap.xml');
  if (!fs.existsSync(file)) return;

  const xml = readText(file);
  const openUrlset = (xml.match(/<urlset\b/gi) ?? []).length;
  const closeUrlset = (xml.match(/<\/urlset>/gi) ?? []).length;
  if (openUrlset !== 1 || closeUrlset !== 1) {
    addIssue('error', 'SITEMAP_STRUCTURE', 'sitemap.xml', 'Estrutura <urlset> inválida ou incompleta.');
  }

  const locs = [...xml.matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => decodeHtmlEntities(match[1].trim()));
  stats.sitemapUrls = locs.length;
  const seen = new Set();
  const mappedFiles = new Set();

  for (const loc of locs) {
    if (seen.has(loc)) {
      addIssue('error', 'SITEMAP_DUPLICATE_URL', 'sitemap.xml', `URL duplicada no sitemap: ${loc}`);
      continue;
    }
    seen.add(loc);

    const local = mapSameSiteAbsoluteUrl(loc);
    if (local == null) {
      addIssue('warning', 'SITEMAP_EXTERNAL_ORIGIN', 'sitemap.xml', `URL fora da origem esperada: ${loc}`);
      continue;
    }

    const target = resolveLocalReference(path.join(root, 'index.html'), splitUrl(local).pathPart);
    if (!target || !fs.existsSync(target)) {
      addIssue('error', 'SITEMAP_TARGET_MISSING', 'sitemap.xml', `URL do sitemap não corresponde a arquivo existente: ${loc}`);
      continue;
    }

    mappedFiles.add(rel(target));
  }

  for (const htmlFile of htmlFiles) {
    const relative = rel(htmlFile);
    if (CONFIG.publicHtmlExcludedFromSitemap.has(relative)) continue;
    if (!mappedFiles.has(relative)) {
      addIssue('warning', 'SITEMAP_PAGE_MISSING', relative, 'Página pública HTML não aparece no sitemap.');
    }
  }
}

function auditRobots() {
  const file = path.join(root, 'robots.txt');
  if (!fs.existsSync(file)) return;
  const content = readText(file);
  const sitemapLine = content.match(/^\s*Sitemap:\s*(\S+)\s*$/im);
  if (!sitemapLine) {
    addIssue('warning', 'ROBOTS_SITEMAP_MISSING', 'robots.txt', 'robots.txt não informa Sitemap:.');
    return;
  }

  const expected = `${CONFIG.siteOrigin}${CONFIG.deploymentBase}sitemap.xml`;
  if (sitemapLine[1] !== expected) {
    addIssue('warning', 'ROBOTS_SITEMAP_UNEXPECTED', 'robots.txt', `Sitemap informado: ${sitemapLine[1]}; esperado: ${expected}`);
  }
}

function auditGlobalProjectRules(files) {
  const auditable = files.filter((file) => /\.(?:html|css|js|mjs)$/i.test(file));

  for (const file of auditable) {
    if (CONFIG.ignoredAuditFiles.has(rel(file))) continue;
    const content = readText(file);
    const relative = rel(file);

    for (const { regex, label } of CONFIG.prohibitedReadingFeaturePatterns) {
      const match = regex.exec(content);
      regex.lastIndex = 0;
      if (match) {
        addIssue(
          'error',
          'PROJECT_PROHIBITED_READING_FEATURE',
          relative,
          `Recurso específico de acessibilidade de leitura detectado: ${label}.`,
          lineNumber(content, match.index),
        );
      }
    }
  }
}

function mapSameSiteAbsoluteUrl(value) {
  if (!/^https?:\/\//i.test(value)) return null;

  let url;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  if (url.origin !== CONFIG.siteOrigin) return null;
  if (!url.pathname.startsWith(CONFIG.deploymentBase)) return null;

  const relativePath = url.pathname.slice(CONFIG.deploymentBase.length);
  const suffix = `${url.search}${url.hash}`;
  return relativePath ? `/${CONFIG.deploymentBase.replace(/^\//, '')}${relativePath}${suffix}` : `/${CONFIG.deploymentBase.replace(/^\//, '')}${suffix}`;
}

function isSameOriginAbsoluteOutsideBase(value) {
  if (!/^https?:\/\//i.test(value)) return false;
  try {
    const url = new URL(value);
    return url.origin === CONFIG.siteOrigin && !url.pathname.startsWith(CONFIG.deploymentBase);
  } catch {
    return false;
  }
}

function resolveLocalReference(sourceFile, rawPath) {
  if (rawPath == null) return null;
  let value = rawPath.trim();
  if (!value) return sourceFile;

  try {
    value = decodeURIComponent(value);
  } catch {
    // Mantém valor original quando percent-encoding é inválido; a checagem de existência acusará o problema.
  }

  let target;
  if (value === CONFIG.deploymentBase || value === CONFIG.deploymentBase.replace(/\/$/, '')) {
    target = path.join(root, 'index.html');
  } else if (value.startsWith(CONFIG.deploymentBase)) {
    target = path.join(root, value.slice(CONFIG.deploymentBase.length));
  } else if (value.startsWith('/')) {
    // O site é publicado em /x/. Caminhos absolutos fora de /x/ são provavelmente incorretos.
    return path.resolve(root, `.${value}`);
  } else {
    target = path.resolve(path.dirname(sourceFile), value);
  }

  if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
    target = path.join(target, 'index.html');
  } else if (!fs.existsSync(target) && value.endsWith('/')) {
    target = path.join(target, 'index.html');
  }

  return target;
}

function isSkippableUrl(value) {
  return /^(?:https?:|mailto:|tel:|data:|blob:|about:|chrome:|file:)/i.test(value)
    || value.startsWith('//');
}

function splitUrl(value) {
  const hashIndex = value.indexOf('#');
  const beforeHash = hashIndex >= 0 ? value.slice(0, hashIndex) : value;
  const fragmentRaw = hashIndex >= 0 ? value.slice(hashIndex + 1) : '';
  const queryIndex = beforeHash.indexOf('?');
  const pathPart = queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;

  let fragment = fragmentRaw;
  try {
    fragment = decodeURIComponent(fragmentRaw);
  } catch {
    // Mantém o fragmento como está.
  }

  return { pathPart, fragment };
}

function parseSrcset(value) {
  return value
    .split(',')
    .map((part) => part.trim().split(/\s+/)[0])
    .filter(Boolean);
}

function splitIdRefs(value) {
  return String(value ?? '').trim().split(/\s+/).filter(Boolean);
}

function extractIds(html) {
  const output = [];
  // Exige espaço em branco antes de "id=" para não confundir com "?id=" ou
  // "&id=" dentro de query strings de URLs em atributos href/src.
  const regex = /(?<=\s)id\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/gi;
  for (const match of html.matchAll(regex)) {
    const id = match[1] ?? match[2] ?? match[3] ?? '';
    if (id) output.push({ id: decodeHtmlEntities(id), index: match.index });
  }
  return output;
}

function getHtmlIds(file) {
  const absolute = path.resolve(file);
  if (htmlIdCache.has(absolute)) return htmlIdCache.get(absolute);
  if (!fs.existsSync(absolute)) return new Set();

  const ids = new Set(extractIds(readText(absolute)).map((entry) => entry.id));
  htmlIdCache.set(absolute, ids);
  return ids;
}

function extractClassElementText(html, className) {
  const output = [];
  const escapedClass = escapeRegex(className);
  const regex = new RegExp(
    `<([a-z][\\w:-]*)\\b(?=[^>]*\\bclass\\s*=\\s*[\"'][^\"']*\\b${escapedClass}\\b[^\"']*[\"'])[^>]*>([\\s\\S]*?)<\\/\\1>`,
    'gi',
  );

  for (const match of html.matchAll(regex)) {
    output.push({ text: stripHtml(match[2]), index: match.index });
  }
  return output;
}

function findFirstStartTag(html, name) {
  const regex = new RegExp(`<${escapeRegex(name)}\\b[^>]*>`, 'i');
  const match = regex.exec(html);
  return match ? { text: match[0], index: match.index } : null;
}

function countOpeningTags(html, name) {
  const regex = new RegExp(`<${escapeRegex(name)}\\b[^>]*>`, 'gi');
  return [...html.matchAll(regex)].length;
}

function extractStartTags(html) {
  const output = [];
  const regex = /<([a-z][\w:-]*)\b[^>]*>/gi;
  for (const match of html.matchAll(regex)) {
    output.push({ name: match[1].toLowerCase(), text: match[0], index: match.index });
  }
  return output;
}

function parseAttributes(startTag) {
  const attrs = new Map();
  const body = startTag
    .replace(/^<\s*[\w:-]+\s*/i, '')
    .replace(/\/?>\s*$/, '');

  const regex = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
  for (const match of body.matchAll(regex)) {
    const name = match[1].toLowerCase();
    const value = match[2] ?? match[3] ?? match[4] ?? '';
    attrs.set(name, decodeHtmlEntities(value));
  }
  return attrs;
}

function buildDomClassChildIndex(htmlFiles) {
  const voidElements = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
    'param', 'source', 'track', 'wbr',
  ]);

  for (const file of htmlFiles) {
    const html = maskRawText(readText(file));
    const stack = [];
    const tokenRegex = /<\/?([a-z][\w:-]*)\b[^>]*>/gi;

    for (const match of html.matchAll(tokenRegex)) {
      const token = match[0];
      const tagName = match[1].toLowerCase();
      const closing = /^<\//.test(token);

      if (closing) {
        for (let i = stack.length - 1; i >= 0; i -= 1) {
          if (stack[i].tagName === tagName) {
            stack.length = i;
            break;
          }
        }
        continue;
      }

      const attrs = parseAttributes(token);
      const classes = (attrs.get('class') ?? '').split(/\s+/).filter(Boolean);
      const parent = stack.at(-1);

      if (parent) {
        for (const parentClass of parent.classes) {
          if (!domClassChildTags.has(parentClass)) domClassChildTags.set(parentClass, new Set());
          domClassChildTags.get(parentClass).add(tagName);
        }
      }

      for (const className of classes) {
        if (!domClassChildTags.has(className)) domClassChildTags.set(className, new Set());
      }

      const selfClosing = /\/\s*>$/.test(token) || voidElements.has(tagName);
      if (!selfClosing) stack.push({ tagName, classes });
    }
  }
}

function auditCssDirectChildSelectors(css, relative) {
  const stripped = css.replace(/\/\*[\s\S]*?\*\//g, ' ');
  const ruleRegex = /([^{}]+)\{/g;
  const reported = new Set();

  for (const rule of stripped.matchAll(ruleRegex)) {
    const selectorGroup = rule[1].trim();
    if (!selectorGroup || selectorGroup.startsWith('@')) continue;

    for (const selector of selectorGroup.split(',')) {
      const directChildRegex = /\.([_a-zA-Z][\w-]*)\s*>\s*([a-zA-Z][\w-]*)\b/g;
      for (const match of selector.matchAll(directChildRegex)) {
        const className = match[1];
        const expectedChild = match[2].toLowerCase();
        if (!domClassChildTags.has(className)) continue;

        const actualChildren = domClassChildTags.get(className);
        if (actualChildren.size === 0 || actualChildren.has(expectedChild)) continue;

        const key = `${className}>${expectedChild}`;
        if (reported.has(key)) continue;
        reported.add(key);

        addIssue(
          'warning',
          'CSS_DIRECT_CHILD_MISMATCH',
          relative,
          `Seletor .${className} > ${expectedChild} não corresponde aos filhos diretos observados no HTML (${[...actualChildren].sort().join(', ')}). Verifique DOM × CSS.`,
          lineNumber(css, rule.index),
        );
      }
    }
  }
}

function maskRawText(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, (value) => ' '.repeat(value.length))
    .replace(/<(script|style|template|svg)\b[^>]*>[\s\S]*?<\/\1>/gi, (value) => ' '.repeat(value.length));
}

function scanCssBalance(css) {
  let braceDepth = 0;
  let quote = null;
  let inComment = false;

  for (let i = 0; i < css.length; i += 1) {
    const char = css[i];
    const next = css[i + 1];

    if (inComment) {
      if (char === '*' && next === '/') {
        inComment = false;
        i += 1;
      }
      continue;
    }

    if (quote) {
      if (char === '\\') {
        i += 1;
        continue;
      }
      if (char === quote) quote = null;
      continue;
    }

    if (char === '/' && next === '*') {
      inComment = true;
      i += 1;
      continue;
    }

    if (char === '"' || char === "'") {
      quote = char;
      continue;
    }

    if (char === '{') braceDepth += 1;
    if (char === '}') {
      braceDepth -= 1;
      if (braceDepth < 0) {
        return { error: 'Chave de fechamento } sem abertura correspondente.', line: lineNumber(css, i) };
      }
    }
  }

  if (inComment) return { error: 'Comentário CSS não encerrado.', line: lineNumber(css, css.length - 1) };
  if (quote) return { error: 'String CSS não encerrada.', line: lineNumber(css, css.length - 1) };
  if (braceDepth !== 0) return { error: `Chaves CSS desbalanceadas; saldo final: ${braceDepth}.`, line: lineNumber(css, css.length - 1) };
  return { error: null, line: null };
}

function readText(file) {
  const absolute = path.resolve(file);
  if (!fileCache.has(absolute)) {
    fileCache.set(absolute, fs.readFileSync(absolute, 'utf8'));
  }
  return fileCache.get(absolute);
}

function rel(file) {
  return path.relative(root, file).split(path.sep).join('/');
}

function isInsideRoot(file) {
  const relative = path.relative(root, file);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

function normalizeText(value) {
  return decodeHtmlEntities(stripHtml(value)).replace(/\s+/g, ' ').trim();
}

function stripHtml(value) {
  return String(value ?? '').replace(/<[^>]*>/g, ' ');
}

function decodeHtmlEntities(value) {
  return String(value ?? '')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(Number.parseInt(hex, 16)));
}

function lineNumber(content, index) {
  if (index == null || index < 0) return null;
  return content.slice(0, index).split('\n').length;
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function addIssue(severity, code, file, message, line = null) {
  issues.push({ severity, code, file, line, message });
}

function compareIssues(a, b) {
  const severityOrder = { error: 0, warning: 1, info: 2 };
  return (severityOrder[a.severity] ?? 9) - (severityOrder[b.severity] ?? 9)
    || a.file.localeCompare(b.file, 'pt-BR')
    || (a.line ?? 0) - (b.line ?? 0)
    || a.code.localeCompare(b.code);
}

function summarize(list) {
  return list.reduce((acc, issue) => {
    acc[issue.severity] = (acc[issue.severity] ?? 0) + 1;
    return acc;
  }, { error: 0, warning: 0, info: 0 });
}

function printHumanReport(list, counts, failed) {
  console.log(`${paint('LET FLOW 369 — AUDITORIA DO PROJETO', 'bold')}\n`);
  console.log(`Raiz: ${root}`);
  console.log(`Modo: ${args.strict ? 'strict' : 'normal'}\n`);

  console.log(`${paint('Arquivos analisados', 'bold')}`);
  console.log(`  HTML ............ ${stats.html}`);
  console.log(`  CSS ............. ${stats.css}`);
  console.log(`  JavaScript ...... ${stats.js}`);
  console.log(`  Referências ..... ${stats.assetsChecked}`);
  console.log(`  Links internos .. ${stats.internalLinksChecked}`);
  console.log(`  Fragmentos ...... ${stats.fragmentsChecked}`);
  console.log(`  URLs sitemap .... ${stats.sitemapUrls}\n`);

  if (list.length === 0) {
    console.log(`${paint('PASS', 'green')} Nenhum erro ou aviso detectado.`);
  } else {
    for (const issue of list) {
      const marker = issue.severity === 'error'
        ? paint('ERROR', 'red')
        : issue.severity === 'warning'
          ? paint('WARN ', 'yellow')
          : paint('INFO ', 'cyan');
      const location = issue.line ? `${issue.file}:${issue.line}` : issue.file;
      console.log(`${marker} ${location} [${issue.code}]`);
      console.log(`      ${issue.message}`);
    }
  }

  console.log('\n' + paint('Resumo', 'bold'));
  console.log(`  Erros ........... ${counts.error}`);
  console.log(`  Avisos .......... ${counts.warning}`);
  console.log(`  Informações ..... ${counts.info}`);
  console.log(`  Resultado ....... ${failed ? paint('FALHOU', 'red') : paint('APROVADO', 'green')}`);

  if (counts.warning > 0 && !args.strict) {
    console.log(`\n${paint('Nota:', 'yellow')} avisos não falham a auditoria em modo normal. Use --strict para tratá-los como falha.`);
  }
}

function paint(value, style) {
  if (!colorEnabled) return value;
  const codes = {
    bold: ['\u001b[1m', '\u001b[22m'],
    red: ['\u001b[31m', '\u001b[39m'],
    green: ['\u001b[32m', '\u001b[39m'],
    yellow: ['\u001b[33m', '\u001b[39m'],
    cyan: ['\u001b[36m', '\u001b[39m'],
  };
  const pair = codes[style];
  return pair ? `${pair[0]}${value}${pair[1]}` : value;
}
