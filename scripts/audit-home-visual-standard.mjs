import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const excludedDirectories = new Set(['.git', 'dist', 'node_modules', 'playwright-report', 'test-results', 'templates']);
const requiredFamilies = ['Cinzel+Decorative', 'Inter', 'Marcellus', 'Spectral'];

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isDirectory() && excludedDirectories.has(entry.name)) return [];
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) return walk(absolute);
    return [absolute];
  });
}

function isPublicHtml(file, html) {
  return file.endsWith('.html') && /<!doctype html>/i.test(html) && /<head[\s>]/i.test(html) && /<main[\s>]/i.test(html);
}

const failures = [];
let checked = 0;

for (const file of walk(root)) {
  if (!file.endsWith('.html')) continue;
  const html = fs.readFileSync(file, 'utf8');
  if (!isPublicHtml(file, html)) continue;
  checked += 1;

  const relative = path.relative(root, file).split(path.sep).join('/');
  const styleLinks = [...html.matchAll(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/gi)].map((match) => ({ html: match[0] }));
  const contractLinks = styleLinks.filter((link) => /site-standard\.css/.test(link.html));
  const googleLinks = [...html.matchAll(/<link\b[^>]*href=["']https:\/\/fonts\.googleapis\.com\/css2[^"']*["'][^>]*\/?>/gi)].map((match) => match[0]);

  if (contractLinks.length !== 1) {
    failures.push(`${relative}: esperado 1 link para site-standard.css; encontrado ${contractLinks.length}.`);
  } else if (styleLinks.at(-1)?.html !== contractLinks[0].html) {
    failures.push(`${relative}: site-standard.css não é a última folha de estilo.`);
  }

  if (googleLinks.length !== 1) {
    failures.push(`${relative}: esperado 1 stylesheet do Google Fonts; encontrado ${googleLinks.length}.`);
  } else {
    for (const family of requiredFamilies) {
      if (!googleLinks[0].includes(`family=${family}`) && !googleLinks[0].includes(`&amp;family=${family}`)) {
        failures.push(`${relative}: família ${family.replaceAll('+', ' ')} ausente do carregamento tipográfico.`);
      }
    }
  }
}

const standardCssPath = path.join(root, 'src/styles/site-standard.css');
if (!fs.existsSync(standardCssPath)) {
  failures.push('src/styles/site-standard.css ausente.');
} else {
  const css = fs.readFileSync(standardCssPath, 'utf8');
  for (const token of ['--font-title', '--font-subtitle', '--font-body', '--font-interface', '--color-background', '--color-primary', '--color-text', '--reading-width']) {
    if (!css.includes(`var(${token})`)) failures.push(`site-standard.css não referencia ${token}.`);
  }
}

console.log('LET FLOW 369 — CONTRATO VISUAL DA HOME');
console.log(`Páginas públicas ............ ${checked}`);
console.log(`Falhas ...................... ${failures.length}`);

if (failures.length) {
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('Resultado ................... APROVADO');
