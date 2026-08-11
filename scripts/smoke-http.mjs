#!/usr/bin/env node
import fs from 'node:fs';
import { spawn } from 'node:child_process';

const port = 4174;
const base = `http://127.0.0.1:${port}/x/`;
const server = spawn(process.execPath, ['scripts/serve-dist.mjs', '--port', String(port)], { stdio: ['ignore', 'pipe', 'inherit'] });

try {
  await waitForServer(server.stdout);
  const sitemap = fs.readFileSync('dist/sitemap.xml', 'utf8');
  const routes = [...sitemap.matchAll(/<loc>https:\/\/letflow369\.github\.io\/x\/([^<]*)<\/loc>/g)].map((match) => match[1] || 'index.html');
  const failures = [];
  for (const route of routes) {
    const response = await fetch(new URL(route, base));
    const body = await response.text();
    if (response.status !== 200) failures.push(`${route}: HTTP ${response.status}`);
    if (!/<main\b/i.test(body)) failures.push(`${route}: <main> ausente`);
    if (!/<h1\b/i.test(body)) failures.push(`${route}: <h1> ausente`);
  }
  console.log(`Smoke HTTP: ${routes.length} páginas verificadas; ${failures.length} falhas.`);
  for (const failure of failures) console.error(`ERROR ${failure}`);
  if (failures.length) process.exitCode = 1;
} finally {
  server.kill('SIGTERM');
}

function waitForServer(stream) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Servidor local não iniciou em 5s.')), 5000);
    stream.setEncoding('utf8');
    stream.on('data', (chunk) => {
      if (chunk.includes('Let Flow 369:')) {
        clearTimeout(timer);
        resolve();
      }
    });
    server.once('exit', (code) => {
      clearTimeout(timer);
      reject(new Error(`Servidor encerrou antes do teste (code ${code}).`));
    });
  });
}
