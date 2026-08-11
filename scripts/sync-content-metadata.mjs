#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const indexPath = path.join(root, 'src/data/content-index.json');
const data = JSON.parse(fs.readFileSync(indexPath, 'utf8'));

for (const item of data.items) {
  const file = path.join(root, item.url);
  if (!fs.existsSync(file)) throw new Error(`Artigo ausente: ${item.url}`);
  const html = fs.readFileSync(file, 'utf8');
  const schemas = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  let article = null;
  for (const match of schemas) {
    try {
      const parsed = JSON.parse(match[1]);
      const candidates = Array.isArray(parsed?.['@graph']) ? parsed['@graph'] : [parsed];
      article = candidates.find((entry) => ['Article', 'MedicalWebPage', 'ScholarlyArticle', 'WebPage'].includes(entry?.['@type'])) ?? article;
    } catch {
      // O auditor principal reportará JSON-LD inválido; este script apenas sincroniza metadados válidos.
    }
  }
  if (!article) throw new Error(`Schema editorial ausente em ${item.url}`);
  if (!article.datePublished || !article.dateModified) {
    throw new Error(`datePublished/dateModified ausentes em ${item.url}`);
  }
  item.datePublished = article.datePublished;
  item.dateModified = article.dateModified;
  item.scientificReviewIso = parsePortugueseDate(item.scientificReview);
}

data.version = '2026-08-11';
fs.writeFileSync(indexPath, `${JSON.stringify(data, null, 2)}\n`);
console.log(`Metadados sincronizados para ${data.items.length} artigos.`);

function parsePortugueseDate(value) {
  if (!value) return null;
  const months = {
    janeiro: '01', fevereiro: '02', março: '03', marco: '03', abril: '04', maio: '05', junho: '06',
    julho: '07', agosto: '08', setembro: '09', outubro: '10', novembro: '11', dezembro: '12',
  };
  const normalized = value.toLocaleLowerCase('pt-BR').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const match = normalized.match(/(\d{1,2})\s+de\s+([a-z]+)\s+de\s+(\d{4})/);
  if (!match) return null;
  const month = months[match[2]];
  if (!month) return null;
  return `${match[3]}-${month}-${match[1].padStart(2, '0')}`;
}
