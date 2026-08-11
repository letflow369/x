(() => {
  'use strict';

  const root = document.documentElement;
  const base = root.dataset.siteBase || (/\/artigos\//.test(location.pathname) ? '../' : './');
  const slug = location.pathname.split('/').pop().replace(/\.html$/, '');
  const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[char]);

  fetch(`${base}src/data/content-index.json`)
    .then((response) => response.ok ? response.json() : Promise.reject(new Error('Falha ao carregar índice de conteúdo')))
    .then((data) => {
      const item = data.items.find((entry) => entry.slug === slug);
      if (!item) return;
      const articleMap = new Map(data.items.map((entry) => [entry.slug, entry]));
      const section = document.createElement('section');
      section.className = 'content-network';
      section.setAttribute('aria-labelledby', 'content-network-title');

      const tags = item.tags.map((tag) => `<a class="content-network__tag" href="${base}tags.html?tag=${encodeURIComponent(tag)}">#${esc(tag)}</a>`).join('');
      const related = item.relations
        .map((relation) => articleMap.get(relation))
        .filter(Boolean)
        .slice(0, 4)
        .map((entry) => `<article class="content-network__card"><p class="content-network__eyebrow">${esc(entry.categoryName)}</p><h3><a class="text-link" href="${base}${entry.url}">${esc(entry.title)}</a></h3><p>${esc(entry.summary || 'Conteúdo relacionado para aprofundar o tema.')}</p></article>`)
        .join('');

      const review = item.scientificReview
        ? `<br>Revisão científica declarada: ${esc(item.scientificReview)}`
        : '';
      const modified = item.dateModified ? formatDate(item.dateModified) : 'não informada';

      section.innerHTML = `
        <p class="content-network__eyebrow">Rede de conhecimento</p>
        <h2 id="content-network-title">Explore as conexões</h2>
        <p>Esta página possui uma categoria principal e conexões editoriais com outros temas do projeto.</p>
        <div class="content-network__tags" aria-label="Tags relacionadas">${tags}</div>
        ${related ? `<div class="content-network__grid">${related}</div>` : ''}
        <dl class="content-network__meta">
          <div><dt>Categoria principal</dt><dd><a class="text-link" href="${base}${item.categoryUrl}">${esc(item.categoryName)}</a></dd></div>
          <div><dt>Tipo de conteúdo</dt><dd>${esc(item.contentType)}</dd></div>
          <div><dt>Atualização editorial</dt><dd>${esc(modified)}${review}</dd></div>
        </dl>`;

      document.querySelector('main')?.append(section);
    })
    .catch(console.error);

  function formatDate(value) {
    const match = String(value).match(/^(\d{4})-(\d{2})-(\d{2})/);
    return match ? `${match[3]}/${match[2]}/${match[1]}` : value;
  }
})();
