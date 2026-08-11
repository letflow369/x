import fs from 'node:fs';
import path from 'node:path';

export function prerenderDirectories({ root, outputRoot }) {
  const content = readJson(path.join(root, 'src/data/content-index.json')).items ?? [];
  const evidence = readJson(path.join(root, 'src/data/evidence-index.json')).items ?? [];
  const glossary = readJson(path.join(root, 'src/data/glossary.json')).items ?? [];

  const results = [];
  results.push(prerenderSearch(path.join(outputRoot, 'busca.html'), content));
  results.push(prerenderEvidence(path.join(outputRoot, 'evidencias.html'), evidence, content));
  results.push(prerenderTags(path.join(outputRoot, 'tags.html'), content));
  results.push(prerenderGlossary(path.join(outputRoot, 'glossario.html'), glossary));
  return results;
}

function prerenderSearch(file, items) {
  let html = fs.readFileSync(file, 'utf8');
  const categories = [...new Map(items.map((item) => [item.category, item.categoryName])).entries()];
  const types = [...new Set(items.map((item) => item.contentType))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  html = replaceInner(html, 'select', 'category', `<option value="">Todas</option>${categories.map(([value, label]) => `<option value="${esc(value)}">${esc(label)}</option>`).join('')}`);
  html = replaceInner(html, 'select', 'type', `<option value="">Todos</option>${types.map((value) => `<option>${esc(value)}</option>`).join('')}`);
  html = replaceInner(html, 'p', 'status', `${items.length} resultados`);
  html = replaceInner(html, 'div', 'results', items.map(renderSearchCard).join(''), true);
  fs.writeFileSync(file, html);
  return { file: 'busca.html', count: items.length };
}

function prerenderEvidence(file, items, content) {
  let html = fs.readFileSync(file, 'utf8');
  const articleMap = new Map(content.map((item) => [item.slug, item]));
  const levels = [...new Map(items.map((item) => [item.level, item.levelLabel])).entries()];
  const types = [...new Set(items.map((item) => item.type))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  html = replaceInner(html, 'select', 'level', `<option value="">Todos</option>${levels.map(([value, label]) => `<option value="${esc(value)}">${esc(label)}</option>`).join('')}`);
  html = replaceInner(html, 'select', 'type', `<option value="">Todos</option>${types.map((value) => `<option>${esc(value)}</option>`).join('')}`);
  html = replaceInner(html, 'p', 'status', `${items.length} afirmações mapeadas`);
  html = replaceInner(html, 'div', 'results', items.map((item) => renderEvidenceCard(item, articleMap)).join(''), true);
  fs.writeFileSync(file, html);
  return { file: 'evidencias.html', count: items.length };
}

function prerenderTags(file, items) {
  let html = fs.readFileSync(file, 'utf8');
  const counts = new Map();
  for (const item of items) for (const tag of item.tags ?? []) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  const recurring = [...counts.entries()]
    .filter(([, count]) => count >= 2)
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'pt-BR'));
  html = replaceInner(html, 'div', 'tag-list', recurring.map(([tag, count]) => `<a class="content-network__tag" href="tags.html?tag=${encodeURIComponent(tag)}">#${esc(tag)} <small>${count}</small></a>`).join(''), true);
  html = replaceInner(html, 'div', 'results', items.map((item) => `<article class="directory-card"><p class="directory-eyebrow">${esc(item.categoryName)}</p><h2><a class="text-link" href="${esc(item.url)}">${esc(item.title)}</a></h2><p>${esc(item.summary)}</p></article>`).join(''), true);
  fs.writeFileSync(file, html);
  return { file: 'tags.html', count: items.length, tags: recurring.length };
}

function prerenderGlossary(file, items) {
  let html = fs.readFileSync(file, 'utf8');
  const cards = items.map((item) => `<article class="directory-card" id="${slugify(item.term)}"><h2>${esc(item.term)}</h2><p>${esc(item.definition)}</p>${item.related?.length ? `<p class="directory-card__meta">Relacionado: ${item.related.map((slug) => `<span class="directory-pill">${esc(slug.replace(/-/g, ' '))}</span>`).join(' ')}</p>` : ''}</article>`).join('');
  html = replaceInner(html, 'div', 'results', cards, true);
  fs.writeFileSync(file, html);
  return { file: 'glossario.html', count: items.length };
}

function renderSearchCard(item) {
  const tags = (item.tags ?? []).slice(0, 4).map((tag) => `<a class="directory-pill" href="tags.html?tag=${encodeURIComponent(tag)}">#${esc(tag)}</a>`).join('');
  return `<article class="directory-card"><p class="directory-eyebrow">${esc(item.categoryName)}</p><h2><a class="text-link" href="${esc(item.url)}">${esc(item.title)}</a></h2><p>${esc(item.summary)}</p><div class="directory-card__meta">${tags}</div></article>`;
}

function renderEvidenceCard(item, articleMap) {
  const article = articleMap.get(item.article);
  const cssLevel = item.level === 'consistente' ? 'consistent'
    : item.level === 'moderada' ? 'moderate'
      : item.level === 'promissora' ? 'promissora'
        : item.level === 'preliminar' ? 'preliminary'
          : item.level === 'insuficiente' ? 'insufficient' : 'limited';
  const verified = item.verifiedAt ? `<span class="directory-pill">Verificado ${esc(formatDate(item.verifiedAt))}</span>` : '';
  const basis = item.evidenceBasisLabel ? `<span class="directory-pill">${esc(item.evidenceBasisLabel)}</span>` : '';
  return `<article class="directory-card directory-card--${cssLevel}"><p class="directory-eyebrow">${esc(item.levelLabel)}</p><h2>${esc(item.title)}</h2><p>${esc(item.summary)}</p><div class="directory-card__meta">${basis}${verified}</div>${article ? `<p><a class="text-link" href="${esc(article.url)}">Ler contexto completo em ${esc(article.title)} →</a></p>` : ''}</article>`;
}

function replaceInner(html, tag, id, content, mark = false) {
  const pattern = new RegExp(`<${tag}\\b([^>]*\\bid=["']${escapeRegExp(id)}["'][^>]*)>[\\s\\S]*?<\\/${tag}>`, 'i');
  if (!pattern.test(html)) throw new Error(`Elemento #${id} ausente em diretório.`);
  return html.replace(pattern, (_match, attrs) => {
    const normalizedAttrs = mark && !/\bdata-prerendered=/i.test(attrs) ? `${attrs} data-prerendered="true"` : attrs;
    return `<${tag}${normalizedAttrs}>${content}</${tag}>`;
  });
}

function readJson(file) { return JSON.parse(fs.readFileSync(file, 'utf8')); }
function esc(value) { return String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]); }
function slugify(value) { return String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function formatDate(value) { const [year, month, day] = String(value).slice(0, 10).split('-'); return day && month && year ? `${day}/${month}/${year}` : value; }
function escapeRegExp(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); }
