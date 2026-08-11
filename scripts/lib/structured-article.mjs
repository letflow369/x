import fs from 'node:fs';
import path from 'node:path';
import { renderHeader } from './shared-header.mjs';


export function listStructuredArticles(root) {
  const directory = path.join(root, 'content', 'artigos');
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory)
    .filter((name) => name.endsWith('.json'))
    .map((name) => name.slice(0, -5))
    .sort();
}

export function loadStructuredArticle(root, slug) {
  const file = path.join(root, 'content', 'artigos', `${slug}.json`);
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export function renderStructuredArticle({ root, data, relative = `artigos/${data.slug}.html` }) {
  validateArticle(data);
  const template = fs.readFileSync(path.join(root, 'src/templates/substance-article.html'), 'utf8').trim();
  const headerTemplate = fs.readFileSync(path.join(root, 'src/templates/header.html'), 'utf8').trim();
  const footerTemplate = fs.readFileSync(path.join(root, 'src/templates/footer.html'), 'utf8').trim();
  const base = relative.includes('/') ? '../' : './';

  return render(template, {
    LANG: escapeAttr(data.document.lang || 'pt-BR'),
    HEAD: renderHead(data.document),
    BODY_ID: data.document.bodyId ? ` id="${escapeAttr(data.document.bodyId)}"` : '',
    SKIP_LINK: renderSkipLink(data.page.skipLink),
    READING_PROGRESS: data.page.readingProgress ? '<div class="integrative-progress" aria-hidden="true"><span data-reading-progress></span></div>' : '',
    HEADER: renderHeader(headerTemplate, relative),
    MAIN_ID: escapeAttr(data.page.mainId || 'conteudo-principal'),
    BREADCRUMBS: renderBreadcrumbs(data.page.breadcrumbs),
    ARTICLE_CLASSES: escapeAttr(data.page.article.classes.join(' ')),
    ARTICLE_DATA: data.page.article.dataIntegrativePage ? ' data-integrative-page' : '',
    HERO: renderHero(data.page.article.hero),
    TOC: renderToc(data.page.article.toc),
    SECTIONS: data.page.article.sections.map(renderSection).join('\n'),
    ARTICLE_FOOTER: renderArticleFooter(data.page.article.footer),
    BACK_TO_TOP: renderBackToTop(data.page.backToTop),
    SITE_FOOTER: render(footerTemplate, { BASE: base }),
    POST_SCRIPTS: renderScripts(data.page.postScripts),
  }) + '\n';
}

export function structuredArticleSignature(html) {
  return {
    text: visibleText(html),
    ids: [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((m) => m[1]).sort(),
    hrefs: [...html.matchAll(/\bhref=["']([^"']+)["']/gi)].map((m) => m[1]).sort(),
    headings: [...html.matchAll(/<h([1-6])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((m) => `${m[1]}:${visibleText(m[2])}`),
    refs: [...html.matchAll(/\bid=["']ref-(\d+)["']/gi)].map((m) => Number(m[1])).sort((a,b)=>a-b),
  };
}

function validateArticle(data) {
  if (data?.schemaVersion !== 1) throw new Error('schemaVersion de artigo estruturado não suportada.');
  if (data?.template !== 'substance-dossier-v1') throw new Error(`Template não suportado: ${data?.template}`);
  if (!data?.slug || !data?.document?.title || !Array.isArray(data?.page?.article?.sections)) {
    throw new Error('Artigo estruturado incompleto.');
  }
}

function renderHead(doc) {
  const og = doc.openGraph || {};
  const article = doc.articleMeta || {};
  const twitter = doc.twitter || {};
  const lines = [
    '<meta charset="utf-8"/>',
    '<meta content="width=device-width, initial-scale=1" name="viewport"/>',
    meta('description', doc.description),
    meta('theme-color', doc.themeColor),
    `<title>${escapeHtml(doc.title)}</title>`,
    `<link href="${escapeAttr(doc.canonical)}" rel="canonical"/>`,
    propertyMeta('og:type', og.type), propertyMeta('og:locale', og.locale), propertyMeta('og:site_name', og.siteName),
    propertyMeta('og:title', og.title), propertyMeta('og:description', og.description), propertyMeta('og:url', og.url),
    propertyMeta('og:image', og.image), propertyMeta('og:image:width', og.imageWidth), propertyMeta('og:image:height', og.imageHeight), propertyMeta('og:image:alt', og.imageAlt),
    propertyMeta('article:published_time', article.publishedTime), propertyMeta('article:modified_time', article.modifiedTime), propertyMeta('article:section', article.section),
    meta('twitter:card', twitter.card), meta('twitter:title', twitter.title), meta('twitter:description', twitter.description), meta('twitter:image', twitter.image),
    `<link href="${escapeAttr(doc.favicon)}" rel="icon" sizes="32x32" type="image/png"/>`,
    `<link href="${escapeAttr(doc.appleTouchIcon)}" rel="apple-touch-icon" sizes="180x180"/>`,
    `<link href="${escapeAttr(doc.manifest)}" rel="manifest"/>`,
  ].filter(Boolean);

  const googleStyle = doc.styles.find((href) => href.startsWith('https://fonts.googleapis.com/css2'));
  if (googleStyle) {
    lines.push('<link href="https://fonts.googleapis.com" rel="preconnect"/>');
    lines.push('<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>');
  }
  for (const href of doc.styles) {
    if (href.startsWith('https://fonts.googleapis.com') && href !== googleStyle) continue;
    lines.push(`<link href="${escapeAttr(href)}" rel="stylesheet"/>`);
  }
  lines.push(...renderScripts(doc.headScripts, false).split('\n').filter(Boolean));
  if (doc.structuredData) lines.push(`<script type="application/ld+json">${safeJson(doc.structuredData)}</script>`);
  return lines.join('\n');
}

function renderBreadcrumbs(items = []) {
  const lis = items.map((item) => item.current
    ? `<li aria-current="page"><span>${escapeHtml(item.label)}</span></li>`
    : `<li><a href="${escapeAttr(item.href)}">${escapeHtml(item.label)}</a></li>`).join('');
  return `<nav aria-label="Navegação estrutural" class="breadcrumbs"><ol>${lis}</ol></nav>`;
}

function renderHero(hero) {
  return `<header class="${escapeAttr(hero.classes.join(' '))}" id="${escapeAttr(hero.id)}">${hero.innerHtml}</header>`;
}

function renderToc(toc) {
  const items = toc.items.map((item) => `<li><a href="${escapeAttr(item.href)}">${escapeHtml(item.label)}</a></li>`).join('');
  return `<aside class="${escapeAttr(toc.classes.join(' '))}"><div class="article-toc__inner"><p>${escapeHtml(toc.title)}</p><nav aria-label="Índice desta página"><ol>${items}</ol></nav></div></aside>`;
}

function renderSection(section) {
  const attrs = [
    `class="${escapeAttr(section.classes.join(' '))}"`,
    section.id ? `id="${escapeAttr(section.id)}"` : '',
    section.ariaLabelledBy ? `aria-labelledby="${escapeAttr(section.ariaLabelledBy)}"` : '',
  ].filter(Boolean).join(' ');
  return `<section ${attrs}>${section.innerHtml}</section>`;
}

function renderArticleFooter(footer) {
  return `<footer class="${escapeAttr(footer.classes.join(' '))}">${footer.innerHtml}</footer>`;
}

function renderBackToTop(back) {
  const dataAttr = back.dataAttribute ? ` ${back.dataAttribute}` : '';
  return `<button aria-label="${escapeAttr(back.ariaLabel)}" class="${escapeAttr(back.classes.join(' '))}"${dataAttr} type="button">${back.innerHtml}</button>`;
}

function renderSkipLink(skip) {
  return `<a class="skip-link" href="${escapeAttr(skip.href)}">${escapeHtml(skip.label)}</a>`;
}

function renderScripts(scripts = [], defaultDefer = true) {
  return scripts.map((script) => {
    const attrs = [];
    if (script.defer ?? defaultDefer) attrs.push('defer');
    if (script.type) attrs.push(`type="${escapeAttr(script.type)}"`);
    attrs.push(`src="${escapeAttr(script.src)}"`);
    return `<script ${attrs.join(' ')}></script>`;
  }).join('\n');
}

function meta(name, content) {
  return content ? `<meta content="${escapeAttr(content)}" name="${escapeAttr(name)}"/>` : '';
}
function propertyMeta(property, content) {
  return content ? `<meta content="${escapeAttr(content)}" property="${escapeAttr(property)}"/>` : '';
}
function render(template, values) {
  return Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{{${key}}}`, String(value)), template);
}
function safeJson(value) { return JSON.stringify(value).replace(/</g, '\\u003c'); }
function visibleText(value) {
  return String(value)
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}
function escapeHtml(value='') {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function escapeAttr(value='') { return escapeHtml(value); }
