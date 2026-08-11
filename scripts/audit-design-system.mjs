#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dossiers = [
  { file: 'artigos/dmt.html', theme: 'src/styles/dmt.css', level: 'extended' },
  { file: 'artigos/lsd.html', theme: 'src/styles/lsd.css', level: 'extended' },
  { file: 'artigos/cbd.html', theme: 'src/styles/cbd.css', level: 'core' },
  { file: 'artigos/changa.html', theme: 'src/styles/changa.css', level: 'extended' },
  { file: 'artigos/ayahuasca.html', theme: 'src/styles/ayahuasca.css', level: 'core' },
  { file: 'artigos/psilocibina.html', theme: 'src/styles/psilocibina.css', level: 'core' },
  { file: 'artigos/cannabis-sativa.html', theme: 'src/styles/cannabis-sativa.css', level: 'core', botanical: true },
  { file: 'artigos/cannabis-indica.html', theme: 'src/styles/cannabis-indica.css', level: 'core', botanical: true },
];

const coreClasses = [
  'substance-dossier',
  'substance-hero',
  'substance-hero__inner',
  'substance-hero__subtitle',
  'substance-hero__intro',
  'substance-hero__notice',
  'substance-hero__visual',
  'substance-quick',
];

const extendedClasses = [
  'substance-section',
  'substance-section__inner',
  'substance-article-footer',
];

const errors = [];
const componentPath = path.join(root, 'src/styles/components/substance-dossier.css');
const botanicalPath = path.join(root, 'src/styles/components/cannabis-botanical.css');
const tokensPath = path.join(root, 'src/styles/tokens.css');

if (!fs.existsSync(componentPath)) errors.push('Componente ausente: src/styles/components/substance-dossier.css');
if (!fs.existsSync(botanicalPath)) errors.push('Componente ausente: src/styles/components/cannabis-botanical.css');

const tokens = fs.readFileSync(tokensPath, 'utf8');
for (const token of ['--font-display:', '--font-reading:']) {
  if (!tokens.includes(token)) errors.push(`Token obrigatório ausente em tokens.css: ${token}`);
}

for (const dossier of dossiers) {
  const html = fs.readFileSync(path.join(root, dossier.file), 'utf8');
  const css = fs.readFileSync(path.join(root, dossier.theme), 'utf8');

  if (!/substance-dossier\.css\?v=20260811-1/.test(html)) {
    errors.push(`${dossier.file}: stylesheet compartilhado do dossiê ausente ou com versão incorreta.`);
  }

  const requiredClasses = dossier.level === 'extended' ? [...coreClasses, ...extendedClasses] : coreClasses;
  for (const className of requiredClasses) {
    const pattern = new RegExp(`class=["'][^"']*\\b${className}\\b`, 'i');
    if (!pattern.test(html)) errors.push(`${dossier.file}: classe compartilhada ausente: ${className}`);
  }

  if (!css.includes('--substance-')) {
    errors.push(`${dossier.theme}: tema não declara o contrato de custom properties --substance-*.`);
  }

  if (dossier.botanical) {
    if (!/cannabis-botanical\.css\?v=20260811-2/.test(html)) {
      errors.push(`${dossier.file}: componente botânico compartilhado ausente.`);
    }
    for (const className of ['cannabis-botanical', 'botanical-domain-list', 'botanical-hero-plate', 'botanical-plate-caption']) {
      const pattern = new RegExp(`class=["'][^"']*\\b${className}\\b`, 'i');
      if (!pattern.test(html)) errors.push(`${dossier.file}: classe botânica compartilhada ausente: ${className}`);
    }
  }
}

if (errors.length) {
  console.error('LET FLOW 369 — AUDITORIA DO DESIGN SYSTEM');
  for (const error of errors) console.error(`ERRO ${error}`);
  console.error(`\nResultado: REPROVADO (${errors.length} erro(s))`);
  process.exitCode = 1;
} else {
  console.log('LET FLOW 369 — AUDITORIA DO DESIGN SYSTEM');
  console.log(`Dossiês de substâncias ....... ${dossiers.length}`);
  console.log('Componente compartilhado .... OK');
  console.log('Componente botânico ......... OK');
  console.log('Contrato de tema ............ OK');
  console.log('Tokens tipográficos ......... OK');
  console.log('Resultado ................... APROVADO');
}
