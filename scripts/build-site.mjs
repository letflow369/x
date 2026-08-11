#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { replaceHeader } from './lib/shared-header.mjs';
import { listStructuredArticles, loadStructuredArticle, renderStructuredArticle } from './lib/structured-article.mjs';
import { prerenderDirectories } from './lib/directory-prerender.mjs';
import { normalizeSocialMetadata } from './lib/social-metadata.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const config = JSON.parse(fs.readFileSync(path.join(root, 'src/data/site-config.json'), 'utf8'));
const headerTemplate = fs.readFileSync(path.join(root, 'src/templates/header.html'), 'utf8').trim();
const footerTemplate = fs.readFileSync(path.join(root, 'src/templates/footer.html'), 'utf8').trim();
const previousSitemap = readSitemapLastmods(path.join(root, 'sitemap.xml'));

fs.rmSync(dist, { recursive: true, force: true });
fs.mkdirSync(dist, { recursive: true });

for (const file of ['.nojekyll', 'robots.txt', 'site.webmanifest', 'IMAGE-CREDITS.md']) copyIfExists(file);
for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (entry.isFile() && entry.name.endsWith('.html')) copyIfExists(entry.name);
}
for (const directory of ['artigos', 'assuntos']) copyDirectory(directory);
copyDirectory('src/assets');
copyDirectory('src/styles');
copyDirectory('src/scripts');
copyDirectory('src/data');

// Artigos estruturados sobrescrevem o HTML derivado copiado da árvore-fonte.
for (const slug of listStructuredArticles(root)) {
  const data = loadStructuredArticle(root, slug);
  const relative = `artigos/${slug}.html`;
  fs.writeFileSync(path.join(dist, relative), renderStructuredArticle({ root, data, relative }));
}

const directoryPrerender = prerenderDirectories({ root, outputRoot: dist });
for (const item of directoryPrerender) console.log(`Pré-render: ${item.file} (${item.count} item(ns))`);

const htmlFiles = walk(dist).filter((file) => file.endsWith('.html'));
for (const file of htmlFiles) {
  const relative = slash(path.relative(dist, file));
  let html = fs.readFileSync(file, 'utf8');
  const base = relative.includes('/') ? '../' : './';
  html = replaceSharedShell(html, relative, base);
  html = injectReferrerPolicy(html);
  html = normalizeSocialMetadata(html, { relative, config });
  html = injectStructuredData(html, relative);
  html = injectAnalytics(html, base);
  fs.writeFileSync(file, html);
}

generateSitemap(htmlFiles);
console.log(`Build concluído: ${htmlFiles.length} páginas em dist/.`);

function copyIfExists(relative) {
  const source = path.join(root, relative);
  if (!fs.existsSync(source)) return;
  const target = path.join(dist, relative);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

function copyDirectory(relative) {
  const source = path.join(root, relative);
  if (!fs.existsSync(source)) return;
  const target = path.join(dist, relative);
  fs.cpSync(source, target, { recursive: true, filter(src) {
    const rel = slash(path.relative(root, src));
    return !rel.startsWith('src/templates');
  }});
}

function replaceSharedShell(html, relative, base) {
  html = replaceHeader(html, headerTemplate, relative);
  const footer = render(footerTemplate, { BASE: base });
  if (!/<footer class=["']site-footer["']>[\s\S]*?<\/footer>/i.test(html)) {
    throw new Error(`Footer compartilhado ausente em ${relative}`);
  }
  return html.replace(/<footer class=["']site-footer["']>[\s\S]*?<\/footer>/i, footer);
}

function injectReferrerPolicy(html) {
  if (/<meta[^>]+name=["']referrer["']/i.test(html)) return html;
  return html.replace(/<meta[^>]+name=["']viewport["'][^>]*>/i, (match) => `${match}\n<meta name="referrer" content="strict-origin-when-cross-origin"/>`);
}

function injectStructuredData(html, relative) {
  html = html.replace(/\n?<script type="application\/ld\+json" data-generated="let-flow-breadcrumbs">[\s\S]*?<\/script>/gi, '');
  html = html.replace(/\n?<script type="application\/ld\+json" data-generated="let-flow-site">[\s\S]*?<\/script>/gi, '');
  const canonical = getCanonical(html);
  if (!canonical) {
    if (relative === '404.html') return html;
    throw new Error(`Canonical ausente em ${relative}`);
  }

  const breadcrumb = parseBreadcrumbs(html, canonical);
  let scripts = '';
  if (breadcrumb.length >= 2) {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumb.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url,
      })),
    };
    scripts += `\n<script type="application/ld+json" data-generated="let-flow-breadcrumbs">${safeJson(data)}</script>`;
  }
  if (relative === 'index.html') {
    const baseUrl = new URL(config.basePath, config.origin).href;
    const data = {
      '@context': 'https://schema.org',
      '@graph': [
        { '@type': 'WebSite', '@id': `${baseUrl}#website`, url: baseUrl, name: config.siteName, inLanguage: config.defaultLocale },
        { '@type': 'Organization', '@id': `${baseUrl}#organization`, name: config.siteName, url: baseUrl, logo: `${baseUrl}src/assets/images/logo-let-flow-369.webp` },
      ],
    };
    scripts += `\n<script type="application/ld+json" data-generated="let-flow-site">${safeJson(data)}</script>`;
  }
  return scripts ? html.replace(/<\/head>/i, `${scripts}\n</head>`) : html;
}

function parseBreadcrumbs(html, canonical) {
  const nav = html.match(/<nav[^>]+class=["'][^"']*breadcrumbs[^"']*["'][^>]*>[\s\S]*?<\/nav>/i)?.[0];
  if (!nav) return [];
  const items = [];
  for (const match of nav.matchAll(/<li\b[^>]*>([\s\S]*?)<\/li>/gi)) {
    const body = match[1];
    const anchor = body.match(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/i);
    if (anchor) {
      items.push({ name: text(anchor[2]), url: new URL(anchor[1], canonical).href });
    } else {
      const name = text(body);
      if (name) items.push({ name, url: canonical });
    }
  }
  return items;
}

function injectAnalytics(html, base) {
  const analytics = config.analytics ?? {};
  html = html.replace(/\n?<script>window\.__LET_FLOW_ANALYTICS__=[\s\S]*?<\/script>\n?<link[^>]+analytics\.css[^>]*>\n?<script[^>]+analytics\.js[^>]*><\/script>/gi, '');
  if (!analytics.enabled || !/^G-[A-Z0-9]+$/i.test(analytics.measurementId || '')) return html;
  const runtime = {
    enabled: true,
    measurementId: analytics.measurementId,
    consentRequired: analytics.consentRequired !== false,
    privacyUrl: `${base}privacidade.html`,
  };
  const block = `\n<script>window.__LET_FLOW_ANALYTICS__=${safeJson(runtime)};</script>\n<link href="${base}src/styles/analytics.css?v=20260811-1" rel="stylesheet"/>\n<script src="${base}src/scripts/analytics.js?v=20260811-1" defer></script>`;
  return html.replace(/<\/head>/i, `${block}\n</head>`);
}

function generateSitemap(files) {
  const urls = [];
  for (const file of files) {
    const relative = slash(path.relative(dist, file));
    if (relative === '404.html') continue;
    const html = fs.readFileSync(file, 'utf8');
    const canonical = getCanonical(html);
    if (!canonical) continue;
    const modified = getDateModified(html) ?? previousSitemap.get(canonical) ?? (relative === 'privacidade.html' ? '2026-08-11' : null);
    urls.push({ canonical, modified });
  }
  urls.sort((a, b) => a.canonical.localeCompare(b.canonical));
  const body = urls.map(({ canonical, modified }) => `  <url>\n    <loc>${xml(canonical)}</loc>${modified ? `\n    <lastmod>${xml(modified)}</lastmod>` : ''}\n  </url>`).join('\n');
  fs.writeFileSync(path.join(dist, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
}

function getCanonical(html) {
  return html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1]
    ?? null;
}

function getDateModified(html) {
  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      const parsed = JSON.parse(match[1]);
      const nodes = Array.isArray(parsed?.['@graph']) ? parsed['@graph'] : [parsed];
      const node = nodes.find((entry) => entry?.dateModified);
      if (node?.dateModified && /^\d{4}-\d{2}-\d{2}/.test(node.dateModified)) return node.dateModified.slice(0, 10);
    } catch { /* audit elsewhere */ }
  }
  return null;
}

function readSitemapLastmods(file) {
  const map = new Map();
  if (!fs.existsSync(file)) return map;
  const xmlText = fs.readFileSync(file, 'utf8');
  for (const match of xmlText.matchAll(/<url>\s*<loc>([^<]+)<\/loc>(?:\s*<lastmod>([^<]+)<\/lastmod>)?[\s\S]*?<\/url>/gi)) {
    if (match[2]) map.set(match[1].trim(), match[2].trim());
  }
  return map;
}

function render(template, values) {
  return Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{{${key}}}`, value), template);
}

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function text(value) {
  return value.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function xml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function walk(directory) {
  const out = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function slash(value) { return value.split(path.sep).join('/'); }
