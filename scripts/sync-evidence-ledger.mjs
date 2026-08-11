#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const evidencePath = path.join(root, 'src/data/evidence-index.json');
const contentPath = path.join(root, 'src/data/content-index.json');
const evidence = JSON.parse(fs.readFileSync(evidencePath, 'utf8'));
const content = JSON.parse(fs.readFileSync(contentPath, 'utf8'));
const articles = new Map(content.items.map((item) => [item.slug, item]));

for (const item of evidence.items) {
  const article = articles.get(item.article);
  if (!article) throw new Error(`Evidência referencia artigo inexistente: ${item.article}`);
  const basis = classifyBasis(item);
  item.evidenceBasis = basis.key;
  item.evidenceBasisLabel = basis.label;
  item.sourceArticleUrl = article.url;
  item.verifiedAt = article.scientificReviewIso || article.dateModified;
}

evidence.version = '2026-08-11';
fs.writeFileSync(evidencePath, `${JSON.stringify(evidence, null, 2)}\n`);
console.log(`Ledger de evidências sincronizado: ${evidence.items.length} alegações.`);

function classifyBasis(item) {
  if (item.article === 'changa' && item.title.includes('DMT + harmalas')) {
    return { key: 'indireta', label: 'Evidência indireta' };
  }
  if (item.type === 'mecanismo') return { key: 'mecanismo', label: 'Evidência de mecanismo' };
  if (item.type === 'alegação') return { key: 'alegacao-avaliada', label: 'Alegação avaliada' };
  return { key: 'direta', label: 'Evidência direta' };
}
