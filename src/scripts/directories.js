(() => {
  'use strict';

  const page = document.body.dataset.directory;
  const $ = (selector) => document.querySelector(selector);
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);
  const load = (url) => fetch(url).then((response) => response.ok ? response.json() : Promise.reject(new Error(`Falha ao carregar ${url}`)));

  function norm(value) {
    return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  }

  function renderSearch(items) {
    const q = $('#q');
    const category = $('#category');
    const type = $('#type');
    const out = $('#results');
    const status = $('#status');
    if (!q || !category || !type || !out || !status) return;

    const categories = [...new Map(items.map((item) => [item.category, item.categoryName])).entries()];
    category.innerHTML = '<option value="">Todas</option>' + categories.map(([value, label]) => `<option value="${esc(value)}">${esc(label)}</option>`).join('');
    const types = [...new Set(items.map((item) => item.contentType))].sort();
    type.innerHTML = '<option value="">Todos</option>' + types.map((value) => `<option>${esc(value)}</option>`).join('');

    const update = () => {
      const query = norm(q.value);
      const filtered = items.filter((item) =>
        (!category.value || item.category === category.value)
        && (!type.value || item.contentType === type.value)
        && (!query || norm([item.title, item.summary, ...item.tags].join(' ')).includes(query))
      );
      status.textContent = `${filtered.length} resultado${filtered.length === 1 ? '' : 's'}`;
      out.innerHTML = filtered.length ? filtered.map((item) => `
        <article class="directory-card">
          <p class="directory-eyebrow">${esc(item.categoryName)}</p>
          <h2><a class="text-link" href="${esc(item.url)}">${esc(item.title)}</a></h2>
          <p>${esc(item.summary)}</p>
          <div class="directory-card__meta">${item.tags.slice(0, 4).map((tag) => `<a class="directory-pill" href="tags.html?tag=${encodeURIComponent(tag)}">#${esc(tag)}</a>`).join('')}</div>
        </article>`).join('') : '<p class="directory-empty">Nenhum conteúdo corresponde aos filtros atuais.</p>';
    };

    q.addEventListener('input', update);
    category.addEventListener('change', update);
    type.addEventListener('change', update);
    update();
  }

  function renderTags(items) {
    const params = new URLSearchParams(location.search);
    const selected = params.get('tag') || '';
    const counts = new Map();
    items.forEach((item) => item.tags.forEach((tag) => counts.set(tag, (counts.get(tag) || 0) + 1)));
    const tags = [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], 'pt-BR'));
    const recurring = tags.filter(([, count]) => count >= 2);
    const nav = $('#tag-list');
    const out = $('#results');
    const title = $('#tag-title');
    if (!nav || !out || !title) return;

    const visibleTags = selected && !recurring.some(([tag]) => norm(tag) === norm(selected))
      ? [[selected, counts.get(selected) || 1], ...recurring]
      : recurring;
    nav.innerHTML = visibleTags.map(([tag, count]) => `<a class="content-network__tag" href="tags.html?tag=${encodeURIComponent(tag)}">#${esc(tag)} <small>${count}</small></a>`).join('');
    const filtered = selected ? items.filter((item) => item.tags.some((tag) => norm(tag) === norm(selected))) : items;
    title.textContent = selected ? `#${selected}` : 'Conexões mais recorrentes';
    out.innerHTML = filtered.map((item) => `<article class="directory-card"><p class="directory-eyebrow">${esc(item.categoryName)}</p><h2><a class="text-link" href="${esc(item.url)}">${esc(item.title)}</a></h2><p>${esc(item.summary)}</p></article>`).join('');
  }

  function renderEvidence(items, content) {
    const q = $('#q');
    const level = $('#level');
    const type = $('#type');
    const out = $('#results');
    const status = $('#status');
    if (!q || !level || !type || !out || !status) return;

    const articleMap = new Map(content.map((item) => [item.slug, item]));
    const levels = [...new Map(items.map((item) => [item.level, item.levelLabel])).entries()];
    level.innerHTML = '<option value="">Todos</option>' + levels.map(([value, label]) => `<option value="${esc(value)}">${esc(label)}</option>`).join('');
    const types = [...new Set(items.map((item) => item.type))].sort();
    type.innerHTML = '<option value="">Todos</option>' + types.map((value) => `<option>${esc(value)}</option>`).join('');

    const update = () => {
      const query = norm(q.value);
      const filtered = items.filter((item) =>
        (!level.value || item.level === level.value)
        && (!type.value || item.type === type.value)
        && (!query || norm(`${item.title} ${item.summary} ${item.evidenceBasisLabel || ''}`).includes(query))
      );
      status.textContent = `${filtered.length} afirmação${filtered.length === 1 ? '' : 'ões'} mapeada${filtered.length === 1 ? '' : 's'}`;
      out.innerHTML = filtered.map((item) => {
        const article = articleMap.get(item.article);
        const cssLevel = item.level === 'consistente' ? 'consistent'
          : item.level === 'moderada' ? 'moderate'
            : item.level === 'promissora' ? 'promissora'
              : item.level === 'preliminar' ? 'preliminary'
                : item.level === 'insuficiente' ? 'insufficient' : 'limited';
        const verified = item.verifiedAt ? `<span class="directory-pill">Verificado ${esc(formatDate(item.verifiedAt))}</span>` : '';
        const basis = item.evidenceBasisLabel ? `<span class="directory-pill">${esc(item.evidenceBasisLabel)}</span>` : '';
        return `<article class="directory-card directory-card--${cssLevel}">
          <p class="directory-eyebrow">${esc(item.levelLabel)}</p>
          <h2>${esc(item.title)}</h2>
          <p>${esc(item.summary)}</p>
          <div class="directory-card__meta">${basis}${verified}</div>
          ${article ? `<p><a class="text-link" href="${esc(article.url)}">Ler contexto completo em ${esc(article.title)} →</a></p>` : ''}
        </article>`;
      }).join('');
    };

    q.addEventListener('input', update);
    level.addEventListener('change', update);
    type.addEventListener('change', update);
    update();
  }

  function renderGlossary(items) {
    const out = $('#results');
    if (!out) return;
    out.innerHTML = items.map((item) => `<article class="directory-card" id="${norm(item.term).replace(/[^a-z0-9]+/g, '-')}"><h2>${esc(item.term)}</h2><p>${esc(item.definition)}</p>${item.related?.length ? `<p class="directory-card__meta">Relacionado: ${item.related.map((slug) => `<span class="directory-pill">${esc(slug.replace(/-/g, ' '))}</span>`).join(' ')}</p>` : ''}</article>`).join('');
  }

  function formatDate(value) {
    const [year, month, day] = String(value).slice(0, 10).split('-');
    return day && month && year ? `${day}/${month}/${year}` : value;
  }

  if (page === 'search') load('src/data/content-index.json').then((data) => renderSearch(data.items)).catch(console.error);
  if (page === 'tags') load('src/data/content-index.json').then((data) => renderTags(data.items)).catch(console.error);
  if (page === 'evidence') Promise.all([load('src/data/evidence-index.json'), load('src/data/content-index.json')]).then(([evidence, content]) => renderEvidence(evidence.items, content.items)).catch(console.error);
  if (page === 'glossary') load('src/data/glossary.json').then((data) => renderGlossary(data.items)).catch(console.error);
})();
