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
    PRE_LAYOUT_SECTIONS: (data.page.article.preLayoutSections || []).map(renderSection).join('\n'),
    LAYOUT: renderArticleLayout(data.page.article),
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
  for (const href of doc.headTailStyles || []) lines.push(`<link href="${escapeAttr(href)}" rel="stylesheet"/>`);
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
  if (toc.innerHtml) {
    const aria = toc.ariaLabel ? ` aria-label="${escapeAttr(toc.ariaLabel)}"` : '';
    return `<aside class="${escapeAttr(toc.classes.join(' '))}"${aria}>${toc.innerHtml}</aside>`;
  }
  const items = toc.items.map((item) => `<li><a href="${escapeAttr(item.href)}">${escapeHtml(item.label)}</a></li>`).join('');
  return `<aside class="${escapeAttr(toc.classes.join(' '))}"><div class="article-toc__inner"><p>${escapeHtml(toc.title)}</p><nav aria-label="Índice desta página"><ol>${items}</ol></nav></div></aside>`;
}

function renderArticleLayout(article) {
  const layout = article.layout || {};
  const layoutClasses = layout.classes?.length ? layout.classes : ['article-layout'];
  const contentClasses = layout.contentClasses?.length ? layout.contentClasses : ['article-content'];
  const toc = renderToc(article.toc);
  const sections = article.sections.map(renderSection).join('\n');
  let html = `<div class="${escapeAttr(layoutClasses.join(' '))}">${toc}\n<div class="${escapeAttr(contentClasses.join(' '))}">\n${sections}\n</div></div>`;
  if (layout.outerClasses?.length) html = `<div class="${escapeAttr(layout.outerClasses.join(' '))}">${html}</div>`;
  return html;
}

function renderSection(section) {
  const attrs = [
    `class="${escapeAttr(section.classes.join(' '))}"`,
    section.id ? `id="${escapeAttr(section.id)}"` : '',
    section.ariaLabelledBy ? `aria-labelledby="${escapeAttr(section.ariaLabelledBy)}"` : '',
  ].filter(Boolean).join(' ');
  let content;
  if (Array.isArray(section.blocks)) {
    content = renderBlocks(section.blocks);
    if (section.innerClasses?.length) content = `<div class="${escapeAttr(section.innerClasses.join(' '))}">${content}</div>`;
  } else {
    content = section.innerHtml || '';
  }
  return `<section ${attrs}>${content}</section>`;
}

function renderBlocks(blocks = []) {
  return blocks.map(renderBlock).join('');
}

function renderBlock(block) {
  switch (block.type) {
    case 'section-heading': return renderSectionHeadingBlock(block);
    case 'summary-grid': return renderSummaryGridBlock(block);
    case 'evidence-key': return renderEvidenceKeyBlock(block);
    case 'card-grid': return renderCardGridBlock(block);
    case 'timeline': return renderTimelineBlock(block);
    case 'flow': return renderFlowBlock(block);
    case 'callout': return renderCalloutBlock(block);
    case 'table': return renderTableBlock(block);
    case 'clinical-study': return renderClinicalStudyBlock(block);
    case 'details-list': return renderDetailsListBlock(block);
    case 'filter-bar': return renderFilterBarBlock(block);
    case 'study-grid': return renderStudyGridBlock(block);
    case 'review-date': return renderReviewDateBlock(block);
    case 'paragraph': return renderParagraphBlock(block);
    default: throw new Error(`Bloco editorial não suportado: ${block.type}`);
  }
}

function renderSectionHeadingBlock(block) {
  const badge = block.badge
    ? `<span class="${escapeAttr(block.badge.classes.join(' '))}">${rich(block.badge)}</span>`
    : '';
  const level = Number(block.heading?.level || 2);
  const headingId = block.heading?.id ? ` id="${escapeAttr(block.heading.id)}"` : '';
  const heading = `<h${level}${headingId}>${rich(block.heading)}</h${level}>`;
  const paragraphs = (block.paragraphs || []).map((item) => `<p${classAttr(item.classes)}>${rich(item)}</p>`).join('');
  return `<div class="${escapeAttr((block.classes || ['section-heading']).join(' '))}">${badge}${heading}${paragraphs}</div>`;
}

function renderSummaryGridBlock(block) {
  const items = (block.items || []).map((item) => {
    const paragraphs = (item.paragraphs || []).map((paragraph) => `<p>${rich(paragraph)}</p>`).join('');
    return `<article${classAttr(item.classes)}><span>${rich(item.label)}</span><strong>${rich(item.title)}</strong>${paragraphs}</article>`;
  }).join('');
  return `<div class="${escapeAttr(block.classes.join(' '))}">${items}</div>`;
}

function renderEvidenceKeyBlock(block) {
  const items = (block.items || []).map((item) => `<div class="${escapeAttr(item.classes.join(' '))}"><strong>${rich(item.title)}</strong>${(item.paragraphs || []).map((paragraph) => `<p>${rich(paragraph)}</p>`).join('')}</div>`).join('');
  const aria = block.ariaLabel ? ` aria-label="${escapeAttr(block.ariaLabel)}"` : '';
  return `<div${aria} class="${escapeAttr(block.classes.join(' '))}">${items}</div>`;
}

function renderCardGridBlock(block) {
  const cards = (block.cards || []).map((card) => {
    const label = card.label ? `<span class="${escapeAttr(card.label.classes.join(' '))}">${rich(card.label)}</span>` : '';
    const level = Number(card.heading?.level || 3);
    const heading = card.heading ? `<h${level}>${rich(card.heading)}</h${level}>` : '';
    const paragraphs = (card.paragraphs || []).map((paragraph) => `<p>${rich(paragraph)}</p>`).join('');
    const link = card.link ? renderTextLink(card.link) : '';
    return `<article class="${escapeAttr(card.classes.join(' '))}">${label}${heading}${paragraphs}${link}</article>`;
  }).join('');
  return `<div class="${escapeAttr(block.classes.join(' '))}">${cards}</div>`;
}

function renderTimelineBlock(block) {
  const items = (block.items || []).map((item) => `<li><span>${rich(item.label)}</span><strong>${rich(item.title)}</strong>${(item.paragraphs || []).map((paragraph) => `<p>${rich(paragraph)}</p>`).join('')}</li>`).join('');
  return `<ol class="${escapeAttr(block.classes.join(' '))}">${items}</ol>`;
}

function renderFlowBlock(block) {
  const aria = block.ariaLabel ? ` aria-label="${escapeAttr(block.ariaLabel)}"` : '';
  const parts = [];
  (block.steps || []).forEach((step, index) => {
    if (index > 0) parts.push(`<span aria-hidden="true" class="${escapeAttr(block.arrowClasses.join(' '))}">${escapeHtml(block.arrow || '→')}</span>`);
    parts.push(`<span class="${escapeAttr(block.nodeClasses.join(' '))}">${rich(step)}</span>`);
  });
  return `<div${aria} class="${escapeAttr(block.classes.join(' '))}">${parts.join('')}</div>`;
}

function renderCalloutBlock(block) {
  const title = block.title ? `<strong>${rich(block.title)}</strong>` : '';
  const paragraphs = (block.paragraphs || []).map((paragraph) => `<p>${rich(paragraph)}</p>`).join('');
  return `<div class="${escapeAttr(block.classes.join(' '))}">${title}${paragraphs}</div>`;
}

function renderTableBlock(block) {
  const tableAttrs = renderAttributes(block.tableAttributes || {});
  const head = block.headRows?.length ? `<thead>${block.headRows.map(renderTableRow).join('')}</thead>` : '';
  const body = block.bodyRows?.length ? `<tbody>${block.bodyRows.map(renderTableRow).join('')}</tbody>` : '';
  const table = `<table class="${escapeAttr(block.tableClasses.join(' '))}"${tableAttrs}>${head}${body}</table>`;
  return block.wrapperClasses?.length ? `<div class="${escapeAttr(block.wrapperClasses.join(' '))}">${table}</div>` : table;
}

function renderTableRow(row) {
  return `<tr>${(row.cells || []).map((cell) => {
    const tag = cell.tag === 'th' ? 'th' : 'td';
    return `<${tag}${renderAttributes(cell.attributes || {})}>${rich(cell)}</${tag}>`;
  }).join('')}</tr>`;
}

function renderClinicalStudyBlock(block) {
  const lead = block.lead || {};
  const badge = lead.badge ? `<span class="${escapeAttr(lead.badge.classes.join(' '))}">${rich(lead.badge)}</span>` : '';
  const heading = lead.heading ? `<h${Number(lead.heading.level || 3)}>${rich(lead.heading)}</h${Number(lead.heading.level || 3)}>` : '';
  const paragraphs = (lead.paragraphs || []).map((paragraph) => `<p>${rich(paragraph)}</p>`).join('');
  const stats = (block.stats?.items || []).map((item) => `<div><strong>${rich(item.value)}</strong><span>${rich(item.label)}</span></div>`).join('');
  const statsAria = block.stats?.ariaLabel ? ` aria-label="${escapeAttr(block.stats.ariaLabel)}"` : '';
  const statsHtml = block.stats ? `<div${statsAria} class="${escapeAttr(block.stats.classes.join(' '))}">${stats}</div>` : '';
  return `<article class="${escapeAttr(block.classes.join(' '))}"><div>${badge}${heading}${paragraphs}</div>${statsHtml}</article>`;
}

function renderDetailsListBlock(block) {
  return (block.items || []).map((item) => `<details class="${escapeAttr(item.classes.join(' '))}"><summary>${rich(item.summary)}</summary>${(item.paragraphs || []).map((paragraph) => `<p>${rich(paragraph)}</p>`).join('')}</details>`).join('');
}

function renderFilterBarBlock(block) {
  const attrs = renderAttributes(block.attributes || {});
  const buttons = (block.buttons || []).map((button) => `<button${renderAttributes(button.attributes || {})}>${rich(button)}</button>`).join('');
  return `<div class="${escapeAttr(block.classes.join(' '))}"${attrs}>${buttons}</div>`;
}

function renderStudyGridBlock(block) {
  const cards = (block.cards || []).map((card) => {
    const attrs = renderAttributes(card.attributes || {});
    const meta = card.badge ? `<div class="${escapeAttr(card.metaClasses.join(' '))}"><span class="${escapeAttr(card.badge.classes.join(' '))}">${rich(card.badge)}</span></div>` : '';
    const heading = `<h${Number(card.heading.level || 3)}>${rich(card.heading)}</h${Number(card.heading.level || 3)}>`;
    const paragraphs = (card.paragraphs || []).map((paragraph) => `<p>${rich(paragraph)}</p>`).join('');
    const link = card.link ? renderTextLink(card.link) : '';
    return `<article class="${escapeAttr(card.classes.join(' '))}"${attrs}>${meta}${heading}${paragraphs}${link}</article>`;
  }).join('');
  return `<div class="${escapeAttr(block.classes.join(' '))}">${cards}</div>`;
}

function renderReviewDateBlock(block) {
  return `<p class="${escapeAttr(block.classes.join(' '))}"><strong>${rich(block.label)}</strong>${rich(block.value)}</p>`;
}

function renderParagraphBlock(block) {
  return `<p${classAttr(block.classes)}>${rich(block)}</p>`;
}

function renderTextLink(link) {
  const attrs = {
    href: link.href,
    rel: link.rel,
    target: link.target,
    class: (link.classes || ['text-link']).join(' '),
    ...link.attributes,
  };
  const arrow = link.arrow ? ` <span aria-hidden="true">${escapeHtml(link.arrow)}</span>` : '';
  return `<a${renderAttributes(attrs)}>${rich(link)}${arrow}</a>`;
}

function rich(value) {
  if (value == null) return '';
  if (typeof value === 'string') return escapeHtml(value);
  if (Object.hasOwn(value, 'html')) return String(value.html);
  return escapeHtml(value.text || '');
}

function classAttr(classes) {
  return classes?.length ? ` class="${escapeAttr(classes.join(' '))}"` : '';
}

function renderAttributes(attributes = {}) {
  const entries = Object.entries(attributes).filter(([, value]) => value !== null && value !== undefined && value !== false);
  if (!entries.length) return '';
  return entries.map(([name, value]) => value === true || value === ''
    ? ` ${escapeAttr(name)}=""`
    : ` ${escapeAttr(name)}="${escapeAttr(value)}"`).join('');
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
