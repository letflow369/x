import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const standardCss = path.join(root, 'src/styles/site-standard.css');
const excludedDirectories = new Set([
  '.git',
  'dist',
  'node_modules',
  'playwright-report',
  'test-results',
]);

const fontHref = 'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700&family=Inter:wght@500;600;700&family=Marcellus&family=Spectral:ital,wght@0,400;0,600;1,400&display=swap';
const fontLink = `<link href="${fontHref.replaceAll('&', '&amp;')}" rel="stylesheet"/>`;

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) return [];
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(absolute);
    return [absolute];
  });
}

function toHref(file) {
  let href = path.relative(path.dirname(file), standardCss).split(path.sep).join('/');
  if (!href.startsWith('.')) href = `./${href}`;
  return `${href}?v=20260818-1`;
}

function isPublicHtml(file, html) {
  return file.endsWith('.html') && /<!doctype html>/i.test(html) && /<head[\s>]/i.test(html) && /<main[\s>]/i.test(html);
}

function normalizeFonts(html) {
  const googleFontLinePattern = /[\t ]*<link\b[^>]*href=["']https:\/\/fonts\.googleapis\.com\/css2[^"']*["'][^>]*\/?>[\t ]*(?:\r?\n)?/gi;
  html = html.replace(googleFontLinePattern, '');

  const firstStylesheet = html.search(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/i);
  if (firstStylesheet >= 0) {
    html = `${html.slice(0, firstStylesheet)}${fontLink}\n${html.slice(firstStylesheet)}`;
  } else {
    html = html.replace(/<\/head>/i, `${fontLink}\n</head>`);
  }

  return html.replace(/(<link\b[^>]*fonts\.googleapis\.com\/css2[^>]*>)(?:\r?\n){2,}/i, '$1\n');
}

function normalizeContractLink(html, file) {
  const contractPattern = /[\t ]*<link\b[^>]*href=["'][^"']*src\/styles\/site-standard\.css(?:\?[^"']*)?["'][^>]*\/?>[\t ]*(?:\r?\n)?/gi;
  html = html.replace(contractPattern, '');
  const href = toHref(file);
  const contractLink = `<link data-site-standard="home" href="${href}" rel="stylesheet"/>`;
  return html.replace(/<\/head>/i, `${contractLink}\n</head>`);
}

let changed = 0;
let publicPages = 0;

for (const file of walk(root)) {
  if (!file.endsWith('.html')) continue;
  const original = fs.readFileSync(file, 'utf8');
  if (!isPublicHtml(file, original)) continue;
  publicPages += 1;

  let html = normalizeFonts(original);
  html = normalizeContractLink(html, file);

  if (html !== original) {
    fs.writeFileSync(file, html);
    changed += 1;
  }
}

console.log(`Contrato visual: ${publicPages} página(s) pública(s) verificadas; ${changed} atualizada(s).`);
