#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const contentIndex = JSON.parse(fs.readFileSync(path.join(root, 'src/data/content-index.json'), 'utf8'));
const config = JSON.parse(fs.readFileSync(path.join(root, 'src/data/site-config.json'), 'utf8'));
const today = new Date();
const warnDays = config.editorial?.reviewWarningDays ?? 180;
const articleFiles = fs.readdirSync(path.join(root, 'artigos')).filter((name) => name.endsWith('.html')).sort();
const items = contentIndex.items ?? [];
const errors = [];
const warnings = [];

const allowedContentTypes = new Set([
  'terapia',
  'conceito/sistema simbólico',
  'condição/conceito',
  'filosofia/sistema simbólico',
  'neurodesenvolvimento',
  'substância',
  'religião/tradição',
  'mitologia',
  'biografia',
  'filósofo/história da filosofia',
  'povo/cultura',
  'psicoterapia',
]);

const reviewPriorityCategories = new Set([
  'saude-terapias-reabilitacao',
  'psicologia-saude-mental',
  'desenvolvimento-aprendizagem-neurodiversidade',
  'substancias-farmacologia-consciencia',
]);

const slugs = new Set(items.map((item) => item.slug));
const urls = new Set(items.map((item) => item.url));

if (items.length !== articleFiles.length) {
  errors.push(`content-index possui ${items.length} itens, mas artigos/ possui ${articleFiles.length} HTML.`);
}

for (const file of articleFiles) {
  const url = `artigos/${file}`;
  if (!urls.has(url)) errors.push(`Artigo não indexado: ${url}`);
}

auditUnique('slug', (item) => item.slug);
auditUnique('URL', (item) => item.url);
auditUnique('título', (item) => item.title?.trim().toLocaleLowerCase('pt-BR'));

for (const item of items) {
  for (const field of ['slug', 'title', 'url', 'category', 'categoryName', 'contentType', 'datePublished', 'dateModified']) {
    if (!item[field]) errors.push(`${item.slug ?? item.url}: campo obrigatório ausente: ${field}`);
  }

  if (item.contentType && !allowedContentTypes.has(item.contentType)) {
    errors.push(`${item.slug}: contentType fora do vocabulário controlado: ${item.contentType}`);
  }

  if (item.datePublished && item.dateModified && item.dateModified < item.datePublished) {
    errors.push(`${item.slug}: dateModified anterior a datePublished.`);
  }

  if (!Array.isArray(item.tags) || item.tags.length === 0) {
    warnings.push(`${item.slug}: sem tags.`);
  } else {
    const normalizedTags = new Set();
    for (const tag of item.tags) {
      const normalized = normalize(tag);
      if (normalizedTags.has(normalized)) errors.push(`${item.slug}: tag duplicada semanticamente: ${tag}`);
      normalizedTags.add(normalized);
    }
  }

  if (!Array.isArray(item.relations) || item.relations.length < 2) {
    warnings.push(`${item.slug}: menos de duas relações editoriais.`);
  } else {
    for (const relation of item.relations) {
      if (relation === item.slug) errors.push(`${item.slug}: relação editorial aponta para o próprio artigo.`);
      else if (!slugs.has(relation)) errors.push(`${item.slug}: relação editorial inexistente: ${relation}`);
    }
  }

  if (!item.scientificReviewIso) {
    if (reviewPriorityCategories.has(item.category)) {
      warnings.push(`${item.slug}: revisão científica ausente em categoria prioritária.`);
    }
    continue;
  }

  const reviewed = new Date(`${item.scientificReviewIso}T12:00:00-03:00`);
  if (Number.isNaN(reviewed.getTime())) {
    errors.push(`${item.slug}: scientificReviewIso inválido: ${item.scientificReviewIso}`);
    continue;
  }

  const ageDays = Math.floor((today - reviewed) / 86400000);
  if (ageDays < -1) errors.push(`${item.slug}: revisão científica está no futuro: ${item.scientificReviewIso}`);
  else if (ageDays > warnDays) warnings.push(`${item.slug}: revisão científica com ${ageDays} dias (limite editorial ${warnDays}).`);
}

auditCanonicalTags();

const missingScientificReview = items.filter((item) => !item.scientificReviewIso).length;
const priorityMissingReview = items.filter(
  (item) => reviewPriorityCategories.has(item.category) && !item.scientificReviewIso,
).length;

console.log('LET FLOW 369 — AUDITORIA EDITORIAL');
console.log(`Artigos indexados ............ ${items.length}`);
console.log(`Revisão científica registrada ${items.length - missingScientificReview}`);
console.log(`Revisão científica ausente ... ${missingScientificReview}`);
console.log(`Ausente em áreas prioritárias  ${priorityMissingReview}`);
console.log(`Erros ........................ ${errors.length}`);
console.log(`Avisos ....................... ${warnings.length}`);
for (const error of errors) console.error(`ERROR ${error}`);
for (const warning of warnings) console.warn(`WARN  ${warning}`);
if (errors.length) process.exit(1);

function auditUnique(label, getValue) {
  const seen = new Map();
  for (const item of items) {
    const value = getValue(item);
    if (!value) continue;
    if (seen.has(value)) errors.push(`${item.slug}: ${label} duplicado com ${seen.get(value)}: ${value}`);
    else seen.set(value, item.slug);
  }
}

function auditCanonicalTags() {
  const variants = new Map();
  for (const item of items) {
    for (const tag of item.tags ?? []) {
      const key = normalize(tag);
      if (!variants.has(key)) variants.set(key, new Set());
      variants.get(key).add(tag);
    }
  }
  for (const [key, labels] of variants) {
    if (labels.size > 1) {
      warnings.push(`tag sem grafia canônica (${key}): ${[...labels].join(' | ')}`);
    }
  }
}

function normalize(value) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('pt-BR')
    .trim();
}
