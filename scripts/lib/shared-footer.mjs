import path from 'node:path';

export function renderFooter(template, relative) {
  const normalized = slash(relative);
  const base = normalized.includes('/') ? '../' : './';
  return render(template, { BASE: base });
}

export function replaceFooter(html, template, relative) {
  const footer = renderFooter(template, relative);
  if (!/<footer class=["']site-footer["']>[\s\S]*?<\/footer>/i.test(html)) {
    throw new Error(`Footer compartilhado ausente em ${relative}`);
  }
  return html.replace(/<footer class=["']site-footer["']>[\s\S]*?<\/footer>/i, footer);
}

export function extractFooter(html) {
  return html.match(/<footer class=["']site-footer["']>[\s\S]*?<\/footer>/i)?.[0] ?? null;
}

function render(template, values) {
  return Object.entries(values).reduce((result, [key, value]) => result.replaceAll(`{{${key}}}`, value), template);
}

function slash(value) {
  return value.split(path.sep).join('/');
}
