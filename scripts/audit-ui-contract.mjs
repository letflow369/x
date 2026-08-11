#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const requested = process.argv.includes('--root') ? process.argv[process.argv.indexOf('--root') + 1] : 'dist';
const root = path.resolve(projectRoot, requested || 'dist');
const errors = [];
const htmlFiles = walk(root).filter((file) => file.endsWith('.html'));

for (const file of htmlFiles) {
  const relative = slash(path.relative(root, file));
  const html = fs.readFileSync(file, 'utf8');
  for (const nav of html.matchAll(/<nav\b[^>]*>/gi)) {
    if (!/(aria-label|aria-labelledby)=["'][^"']+["']/i.test(nav[0])) errors.push(`${relative}: <nav> sem nome acessível.`);
  }
  const clean = html.replace(/<script\b[\s\S]*?<\/script>/gi, '').replace(/<style\b[\s\S]*?<\/style>/gi, '');
  const headings = [...clean.matchAll(/<h([1-6])\b[^>]*>/gi)].map((match) => Number(match[1]));
  for (let i = 1; i < headings.length; i += 1) if (headings[i] > headings[i - 1] + 1) errors.push(`${relative}: salto de heading h${headings[i - 1]} → h${headings[i]}.`);
}

const headerCss = fs.readFileSync(path.join(root, 'src/styles/components/header.css'), 'utf8');
if (/overflow-x\s*:\s*auto/i.test(headerCss) || /scrollbar-width\s*:\s*none/i.test(headerCss)) errors.push('header.css: navegação não deve depender de scroll horizontal oculto.');
if (!/@media\s*\(max-width:\s*32rem\)[\s\S]*?\.site-nav\s*\{[\s\S]*?flex:\s*1 0 100%/i.test(headerCss)) errors.push('header.css: breakpoint de 32rem deve mover a navegação para linha própria.');
if (!/@media\s*\(max-width:\s*23rem\)[\s\S]*?grid-template-columns:\s*repeat\(3,/i.test(headerCss)) errors.push('header.css: largura estreita deve distribuir o menu em grade de 3 colunas.');

for (const cssFile of walk(path.join(root, 'src/styles')).filter((file) => file.endsWith('.css'))) {
  const css = fs.readFileSync(cssFile, 'utf8');
  for (const match of css.matchAll(/font-size\s*:\s*(0?\.\d+)rem\s*;/gi)) {
    if (Number(match[1]) < 0.7) errors.push(`${slash(path.relative(root, cssFile))}: font-size ${match[1]}rem abaixo do piso de microtipografia (0.7rem).`);
  }
  for (const match of css.matchAll(/font-size\s*:\s*(\d+(?:\.\d+)?)px\s*;/gi)) {
    if (Number(match[1]) < 11) errors.push(`${slash(path.relative(root, cssFile))}: font-size ${match[1]}px abaixo do piso de microtipografia (11px).`);
  }
}

const expectedCounts = {
  'busca.html': JSON.parse(fs.readFileSync(path.join(projectRoot, 'src/data/content-index.json'), 'utf8')).items.length,
  'evidencias.html': JSON.parse(fs.readFileSync(path.join(projectRoot, 'src/data/evidence-index.json'), 'utf8')).items.length,
  'tags.html': JSON.parse(fs.readFileSync(path.join(projectRoot, 'src/data/content-index.json'), 'utf8')).items.length,
  'glossario.html': JSON.parse(fs.readFileSync(path.join(projectRoot, 'src/data/glossary.json'), 'utf8')).items.length,
};
for (const [relative, expected] of Object.entries(expectedCounts)) {
  const file = path.join(root, relative);
  if (!fs.existsSync(file)) { errors.push(`${relative}: página ausente.`); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const results = extractElementById(html, 'div', 'results');
  if (!/data-prerendered=["']true["']/i.test(results)) errors.push(`${relative}: resultados não marcados como pré-renderizados.`);
  const count = (results.match(/<article\b/gi) || []).length;
  if (count !== expected) errors.push(`${relative}: pré-render esperava ${expected} cards e encontrou ${count}.`);
}

if (errors.length) {
  console.error(`UI CONTRACT — FALHOU (${errors.length} problema(s))`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`UI CONTRACT — APROVADO (${htmlFiles.length} HTML; headings, landmarks, header mobile, microtipografia e pré-render verificados).`);

function extractElementById(html, tag, id) {
  const open = new RegExp(`<${tag}\\b[^>]*\\bid=[\"']${id}[\"'][^>]*>`, 'i');
  const match = open.exec(html);
  if (!match) return '';
  const start = match.index;
  const token = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
  token.lastIndex = match.index + match[0].length;
  let depth = 1;
  let current;
  while ((current = token.exec(html))) {
    if (current[0].startsWith(`</${tag}`)) depth -= 1;
    else depth += 1;
    if (depth === 0) return html.slice(start, token.lastIndex);
  }
  return '';
}

function walk(directory) { const out=[]; for (const entry of fs.readdirSync(directory,{withFileTypes:true})) { if (entry.name === 'node_modules' || entry.name === '.git') continue; const full=path.join(directory,entry.name); if (entry.isDirectory()) out.push(...walk(full)); else out.push(full); } return out; }
function slash(value) { return value.split(path.sep).join('/'); }
