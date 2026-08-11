#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const requested = process.argv.includes('--root') ? process.argv[process.argv.indexOf('--root') + 1] : 'dist';
const root = path.resolve(projectRoot, requested || 'dist');
const config = JSON.parse(fs.readFileSync(path.join(projectRoot, 'src/data/site-config.json'), 'utf8'));
const files = walk(root).filter((file) => file.endsWith('.html'));
const errors = [];
let audited = 0;

const requiredOg = ['og:type','og:locale','og:site_name','og:title','og:description','og:url','og:image','og:image:width','og:image:height','og:image:alt'];
const requiredTwitter = ['twitter:card','twitter:title','twitter:description','twitter:image','twitter:image:alt'];

for (const file of files) {
  const relative = slash(path.relative(root, file));
  if (relative === '404.html') continue;
  audited += 1;
  const html = fs.readFileSync(file, 'utf8');
  const metas = [...html.matchAll(/<meta\b[^>]*>/gi)].map((match) => parseAttrs(match[0]));
  const canonical = getCanonical(html);
  if (!canonical) { errors.push(`${relative}: canonical ausente.`); continue; }

  for (const name of requiredOg) checkMeta(relative, metas, 'property', name);
  for (const name of requiredTwitter) checkMeta(relative, metas, 'name', name);

  const ogUrl = valueOf(metas, 'property', 'og:url');
  if (ogUrl && ogUrl !== canonical) errors.push(`${relative}: og:url diverge do canonical.`);
  const ogType = valueOf(metas, 'property', 'og:type');
  const expectedType = relative.startsWith('artigos/') ? 'article' : 'website';
  if (ogType && ogType !== expectedType) errors.push(`${relative}: og:type=${ogType}; esperado ${expectedType}.`);
  const locale = valueOf(metas, 'property', 'og:locale');
  const expectedLocale = String(config.defaultLocale || 'pt-BR').replace('-', '_');
  if (locale && locale !== expectedLocale) errors.push(`${relative}: og:locale=${locale}; esperado ${expectedLocale}.`);
  if (valueOf(metas, 'property', 'og:site_name') !== config.siteName) errors.push(`${relative}: og:site_name incorreto.`);
  if (valueOf(metas, 'property', 'og:image:width') !== '1200' || valueOf(metas, 'property', 'og:image:height') !== '630') errors.push(`${relative}: dimensões OG devem ser 1200×630.`);
  if (valueOf(metas, 'name', 'twitter:card') !== 'summary_large_image') errors.push(`${relative}: twitter:card deve ser summary_large_image.`);

  const ogImage = valueOf(metas, 'property', 'og:image');
  const twImage = valueOf(metas, 'name', 'twitter:image');
  for (const [label, url] of [['og:image', ogImage], ['twitter:image', twImage]]) {
    if (!url) continue;
    if (!/^https:\/\//i.test(url)) errors.push(`${relative}: ${label} precisa usar HTTPS.`);
    const baseUrl = new URL(config.basePath, config.origin).href;
    if (url.startsWith(baseUrl)) {
      const local = decodeURIComponent(url.slice(baseUrl.length));
      if (!fs.existsSync(path.join(root, local))) errors.push(`${relative}: ${label} aponta para arquivo local inexistente (${local}).`);
    }
  }
}

if (errors.length) {
  console.error(`SOCIAL METADATA — FALHOU (${errors.length} problema(s))`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
console.log(`SOCIAL METADATA — APROVADO (${audited} páginas indexáveis; Open Graph + Twitter/X completos).`);

function checkMeta(relative, metas, key, name) {
  const matches = metas.filter((attrs) => String(attrs[key] || '').toLowerCase() === name.toLowerCase());
  if (matches.length !== 1) errors.push(`${relative}: ${name} deve existir exatamente uma vez (encontrado ${matches.length}).`);
  else if (!String(matches[0].content || '').trim()) errors.push(`${relative}: ${name} vazio.`);
}
function valueOf(metas, key, name) { return metas.find((attrs) => String(attrs[key] || '').toLowerCase() === name.toLowerCase())?.content ?? null; }
function parseAttrs(tag) { const out = {}; for (const match of tag.matchAll(/([:\w-]+)\s*=\s*(["'])(.*?)\2/gs)) out[match[1].toLowerCase()] = decode(match[3]); return out; }
function getCanonical(html) { return html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1] ?? html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i)?.[1] ?? null; }
function decode(value) { return String(value ?? '').replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>'); }
function walk(directory) { const out=[]; for (const entry of fs.readdirSync(directory,{withFileTypes:true})) { const full=path.join(directory,entry.name); if (entry.isDirectory()) out.push(...walk(full)); else out.push(full); } return out; }
function slash(value) { return value.split(path.sep).join('/'); }
