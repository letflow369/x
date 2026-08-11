#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { isDeepStrictEqual } from 'node:util';
import { listStructuredArticles, loadStructuredArticle, renderStructuredArticle, structuredArticleSignature } from './lib/structured-article.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slugs = listStructuredArticles(root);
let failures = 0;
for (const slug of slugs) {
  const data = loadStructuredArticle(root, slug);
  const relative = `artigos/${slug}.html`;
  const expected = renderStructuredArticle({ root, data, relative });
  const actual = fs.readFileSync(path.join(root, relative), 'utf8');
  if (actual !== expected) {
    failures++;
    const sameSignature = isDeepStrictEqual(structuredArticleSignature(actual), structuredArticleSignature(expected));
    console.error(`FAIL ${relative}: HTML derivado está fora de sincronia com o conteúdo estruturado.${sameSignature ? ' Assinatura editorial ainda coincide.' : ' Assinatura editorial também diverge.'}`);
  } else {
    console.log(`PASS ${relative}: sincronizado com conteúdo estruturado.`);
  }
}
if (failures) process.exit(1);
console.log(`\nConteúdo estruturado — APROVADO (${slugs.length} artigo(s)).`);
