#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const content = JSON.parse(fs.readFileSync(path.join(root, 'src/data/content-index.json'), 'utf8'));
const config = JSON.parse(fs.readFileSync(path.join(root, 'src/data/site-config.json'), 'utf8'));
const today = new Date('2026-08-11T12:00:00-03:00');
const warnDays = config.editorial?.reviewWarningDays ?? 180;
const articleFiles = fs.readdirSync(path.join(root, 'artigos')).filter((name) => name.endsWith('.html')).sort();
const items = content.items ?? [];
const errors = [];
const warnings = [];

if (items.length !== articleFiles.length) errors.push(`content-index possui ${items.length} itens, mas artigos/ possui ${articleFiles.length} HTML.`);
const urls = new Set(items.map((item) => item.url));
for (const file of articleFiles) {
  const url = `artigos/${file}`;
  if (!urls.has(url)) errors.push(`Artigo não indexado: ${url}`);
}
for (const item of items) {
  for (const field of ['slug', 'title', 'url', 'category', 'categoryName', 'contentType', 'datePublished', 'dateModified']) {
    if (!item[field]) errors.push(`${item.slug ?? item.url}: campo obrigatório ausente: ${field}`);
  }
  if (item.datePublished && item.dateModified && item.dateModified < item.datePublished) errors.push(`${item.slug}: dateModified anterior a datePublished.`);
  if (!Array.isArray(item.tags) || item.tags.length === 0) warnings.push(`${item.slug}: sem tags.`);
  if (!Array.isArray(item.relations) || item.relations.length < 2) warnings.push(`${item.slug}: menos de duas relações editoriais.`);
  if (!item.scientificReviewIso) continue;
  const reviewed = new Date(`${item.scientificReviewIso}T12:00:00-03:00`);
  const ageDays = Math.floor((today - reviewed) / 86400000);
  if (ageDays > warnDays) warnings.push(`${item.slug}: revisão científica com ${ageDays} dias (limite editorial ${warnDays}).`);
}
const missingScientificReview = items.filter((item) => !item.scientificReviewIso).length;

console.log('LET FLOW 369 — AUDITORIA EDITORIAL');
console.log(`Artigos indexados ............ ${items.length}`);
console.log(`Revisão científica registrada ${items.length - missingScientificReview}`);
console.log(`Revisão científica ausente ... ${missingScientificReview}`);
console.log(`Erros ........................ ${errors.length}`);
console.log(`Avisos ....................... ${warnings.length}`);
for (const error of errors) console.error(`ERROR ${error}`);
for (const warning of warnings) console.warn(`WARN  ${warning}`);
if (errors.length) process.exit(1);
