#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { extractHeader, normalizeHeaderMarkup, renderHeader } from './lib/shared-header.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const template = fs.readFileSync(path.join(root, 'src/templates/header.html'), 'utf8').trim();
const expectedCssVersion = 'v=20260811-4';
const files = walk(root).filter((file) => file.endsWith('.html') && !isGeneratedOrTemplate(file));
const errors = [];

for (const file of files) {
  const relative = slash(path.relative(root, file));
  const html = fs.readFileSync(file, 'utf8');
  const actual = extractHeader(html);
  const expected = renderHeader(template, relative);

  if (!actual) {
    errors.push(`${relative}: header ausente.`);
    continue;
  }
  if (normalizeHeaderMarkup(actual) !== normalizeHeaderMarkup(expected)) {
    errors.push(`${relative}: header diverge do template compartilhado.`);
  }
  if (!html.includes(`src/styles/components/header.css?${expectedCssVersion}`)) {
    errors.push(`${relative}: versão esperada do CSS do header ausente (${expectedCssVersion}).`);
  }
}

if (errors.length) {
  console.error(`HEADER GLOBAL — FALHOU (${errors.length} problema(s))`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`HEADER GLOBAL — APROVADO (${files.length} páginas idênticas ao template; CSS ${expectedCssVersion}).`);

function isGeneratedOrTemplate(file) {
  const relative = slash(path.relative(root, file));
  return relative.startsWith('dist/') || relative.startsWith('src/templates/');
}
function walk(directory) {
  const out = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}
function slash(value) { return value.split(path.sep).join('/'); }
