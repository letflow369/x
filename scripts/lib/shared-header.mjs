import path from 'node:path';

export function navState(relative) {
  if (relative === 'index.html') return 'home';
  if (relative.startsWith('artigos/') || relative.startsWith('assuntos/')) return 'topics';
  if (relative === 'trilhas.html') return 'trails';
  if (relative === 'evidencias.html') return 'evidence';
  if (relative === 'busca.html') return 'search';
  return null;
}

export function renderHeader(template, relative) {
  const normalized = slash(relative);
  const base = normalized.includes('/') ? '../' : './';
  const current = navState(normalized);
  return render(template, {
    BASE: base,
    CURRENT_HOME: current === 'home' ? ' aria-current="page"' : '',
    CURRENT_TOPICS: current === 'topics' ? ' aria-current="location"' : '',
    CURRENT_TRAILS: current === 'trails' ? ' aria-current="page"' : '',
    CURRENT_EVIDENCE: current === 'evidence' ? ' aria-current="page"' : '',
    CURRENT_SEARCH: current === 'search' ? ' aria-current="page"' : '',
  });
}

export function replaceHeader(html, template, relative) {
  const header = renderHeader(template, relative);
  if (!/<header class=["']site-header["']>[\s\S]*?<\/header>/i.test(html)) {
    throw new Error(`Header compartilhado ausente em ${relative}`);
  }
  return html.replace(/<header class=["']site-header["']>[\s\S]*?<\/header>/i, header);
}

export function normalizeHeaderMarkup(value) {
  return value
    .replace(/>\s+</g, '><')
    .replace(/\s+/g, ' ')
    .trim();
}

export function extractHeader(html) {
  return html.match(/<header class=["']site-header["']>[\s\S]*?<\/header>/i)?.[0] ?? null;
}

function render(template, values) {
  return Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{{${key}}}`, value), template);
}

function slash(value) {
  return value.split(path.sep).join('/');
}
