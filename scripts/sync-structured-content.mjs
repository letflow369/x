#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { listStructuredArticles, loadStructuredArticle, renderStructuredArticle } from './lib/structured-article.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : listStructuredArticles(root);
for (const slug of slugs) {
  const data = loadStructuredArticle(root, slug);
  const relative = `artigos/${slug}.html`;
  const html = renderStructuredArticle({ root, data, relative });
  fs.writeFileSync(path.join(root, relative), html);
  console.log(`Sincronizado: ${relative} ← content/artigos/${slug}.json`);
}
