#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { replaceHeader } from './lib/shared-header.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const template = fs.readFileSync(path.join(root, 'src/templates/header.html'), 'utf8').trim();
const files = walk(root).filter((file) => file.endsWith('.html') && !isGeneratedOrTemplate(file));
let changed = 0;

for (const file of files) {
  const relative = slash(path.relative(root, file));
  const before = fs.readFileSync(file, 'utf8');
  const after = replaceHeader(before, template, relative);
  if (after !== before) {
    fs.writeFileSync(file, after);
    changed += 1;
  }
}

console.log(`Header compartilhado sincronizado em ${files.length} páginas; ${changed} arquivo(s) atualizado(s).`);

function isGeneratedOrTemplate(file) {
  const relative = slash(path.relative(root, file));
  return relative.startsWith('dist/') || relative.startsWith('src/templates/');
}

function walk(directory) {
  const out = [];
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else out.push(full);
  }
  return out;
}

function slash(value) { return value.split(path.sep).join('/'); }
