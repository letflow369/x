#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', process.argv.includes('--source') ? '' : 'dist');
const htmlFiles = walk(root).filter((file) => file.endsWith('.html'));
const errors = [];
let breadcrumbs = 0;
let articlesWithDates = 0;

for (const file of htmlFiles) {
  const rel = slash(path.relative(root, file));
  if (rel === '404.html') continue;
  const html = fs.readFileSync(file, 'utf8');
  const canonical = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1]
    ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1];
  if (!canonical) errors.push(`${rel}: canonical ausente.`);

  const jsonLd = [];
  for (const match of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { jsonLd.push(JSON.parse(match[1])); }
    catch (error) { errors.push(`${rel}: JSON-LD inválido (${error.message}).`); }
  }
  const nodes = jsonLd.flatMap((entry) => Array.isArray(entry?.['@graph']) ? entry['@graph'] : [entry]);
  const hasBreadcrumbDom = /class=["'][^"']*breadcrumbs/i.test(html);
  const breadcrumb = nodes.find((node) => node?.['@type'] === 'BreadcrumbList');
  if (hasBreadcrumbDom) {
    if (!breadcrumb) errors.push(`${rel}: breadcrumb visual sem BreadcrumbList JSON-LD.`);
    else breadcrumbs++;
  }
  if (rel.startsWith('artigos/')) {
    const article = nodes.find((node) => ['Article', 'MedicalWebPage', 'ScholarlyArticle', 'WebPage'].includes(node?.['@type']) && node?.datePublished);
    if (!article) errors.push(`${rel}: schema editorial com datePublished ausente.`);
    else if (!article.dateModified) errors.push(`${rel}: dateModified ausente no schema editorial.`);
    else articlesWithDates++;
  }
  if (rel === 'index.html') {
    if (!nodes.some((node) => node?.['@type'] === 'WebSite')) errors.push('index.html: WebSite JSON-LD ausente.');
    if (!nodes.some((node) => node?.['@type'] === 'Organization')) errors.push('index.html: Organization JSON-LD ausente.');
  }
}

console.log('LET FLOW 369 — AUDITORIA DE DADOS ESTRUTURADOS');
console.log(`HTML públicos ................. ${htmlFiles.length}`);
console.log(`BreadcrumbList encontrados .... ${breadcrumbs}`);
console.log(`Artigos com datas estruturadas  ${articlesWithDates}`);
console.log(`Erros .......................... ${errors.length}`);
for (const error of errors) console.error(`ERROR ${error}`);
if (errors.length) process.exit(1);

function walk(directory) {
  const out = [];
  if (!fs.existsSync(directory)) return out;
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) out.push(...walk(full)); else out.push(full);
  }
  return out;
}
function slash(value) { return value.split(path.sep).join('/'); }
