#!/usr/bin/env node
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { listStructuredArticles, loadStructuredArticle } from './lib/structured-article.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const supported = new Set([
  'section-heading', 'summary-grid', 'evidence-key', 'card-grid', 'timeline',
  'flow', 'callout', 'table', 'clinical-study', 'details-list', 'filter-bar',
  'study-grid', 'review-date', 'paragraph',
]);
let failures = 0;
let typedSections = 0;
let typedBlocks = 0;

for (const slug of listStructuredArticles(root)) {
  const data = loadStructuredArticle(root, slug);
  for (const section of [...(data.page.article.preLayoutSections || []), ...(data.page.article.sections || [])]) {
    const hasRaw = typeof section.innerHtml === 'string';
    const hasBlocks = Array.isArray(section.blocks);
    if (hasRaw === hasBlocks) {
      failures++;
      console.error(`FAIL ${slug}#${section.id}: seção deve usar innerHtml ou blocks, nunca ambos/nem nenhum.`);
      continue;
    }
    if (hasBlocks) {
      typedSections++;
      if (!section.blocks.length) {
        failures++;
        console.error(`FAIL ${slug}#${section.id}: lista de blocks vazia.`);
      }
      for (const block of section.blocks) {
        typedBlocks++;
        if (!supported.has(block.type)) {
          failures++;
          console.error(`FAIL ${slug}#${section.id}: bloco não suportado '${block.type}'.`);
        }
      }
    }
  }
}

const dmt = loadStructuredArticle(root, 'dmt');
const pilot = dmt.page.article.typedBlocks;
const requiredSections = new Set(['essencial','o-que-e','historia','mecanismo','mitos','depressao','seguranca','comparacao','faq','referencias']);
const actualTyped = new Set(dmt.page.article.sections.filter((section) => Array.isArray(section.blocks)).map((section) => section.id));
for (const id of requiredSections) {
  if (!actualTyped.has(id)) {
    failures++;
    console.error(`FAIL DMT: seção piloto '${id}' ainda não usa blocos tipados.`);
  }
}
if (!pilot?.pilot || pilot.version !== 1) {
  failures++;
  console.error('FAIL DMT: metadados do piloto de blocos tipados ausentes ou inválidos.');
}

const usedTypes = new Set(dmt.page.article.sections.flatMap((section) => section.blocks || []).map((block) => block.type));
const requiredTypes = ['section-heading','summary-grid','evidence-key','card-grid','timeline','flow','callout','table','clinical-study','details-list','filter-bar','study-grid','review-date'];
for (const type of requiredTypes) {
  if (!usedTypes.has(type)) {
    failures++;
    console.error(`FAIL DMT: tipo representativo '${type}' não está coberto pelo piloto.`);
  }
}

if (failures) process.exit(1);
console.log(`Blocos tipados — APROVADO (${typedSections} seção(ões), ${typedBlocks} bloco(s)).`);
console.log(`DMT piloto — ${actualTyped.size} seções tipadas, ${usedTypes.size} tipos de bloco em uso.`);
