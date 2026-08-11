import fs from 'node:fs';
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const sitemap = fs.readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const routes = [...sitemap.matchAll(/<loc>https:\/\/letflow369\.github\.io\/x\/([^<]*)<\/loc>/g)]
  .map((match) => match[1] || 'index.html');
const representative = [
  'index.html',
  'assuntos/substancias-farmacologia-consciencia.html',
  'artigos/lsd.html',
  'artigos/tdah.html',
  'evidencias.html',
  'busca.html',
];

async function blockExternalRequests(page) {
  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === '127.0.0.1' || url.hostname === 'localhost') return route.continue();
    return route.abort();
  });
}

test.describe('páginas públicas', () => {
  for (const route of routes) {
    test(`${route} carrega com estrutura principal`, async ({ page }) => {
      await blockExternalRequests(page);
      const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
      expect(response?.status(), `${route}: status HTTP`).toBe(200);
      await expect(page.locator('main'), `${route}: main`).toHaveCount(1);
      await expect(page.locator('h1'), `${route}: h1`).toHaveCount(1);
      await expect(page.locator('.brand__tagline')).toHaveText('Por dentro da mente de um adulto com TDAH.');
      await expect(page.locator('.site-nav__list > li')).toHaveCount(5);
    });
  }
});

test.describe('acessibilidade automatizada — amostra representativa', () => {
  for (const route of representative) {
    test(`${route} sem violações WCAG automaticamente detectáveis`, async ({ page }) => {
      await blockExternalRequests(page);
      await page.goto(route, { waitUntil: 'domcontentloaded' });
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();
      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
    });
  }
});

test('busca encontra DMT', async ({ page }) => {
  await blockExternalRequests(page);
  await page.goto('busca.html', { waitUntil: 'networkidle' });
  await page.locator('#q').fill('DMT');
  await expect(page.locator('#results')).toContainText('DMT');
});

test('layout móvel não cria overflow horizontal na amostra', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await blockExternalRequests(page);
  for (const route of ['index.html', 'artigos/lsd.html', 'evidencias.html', 'busca.html']) {
    await page.goto(route, { waitUntil: 'domcontentloaded' });
    const sizes = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, client: document.documentElement.clientWidth }));
    expect(sizes.scroll, `${route}: scrollWidth ${sizes.scroll} > clientWidth ${sizes.client}`).toBeLessThanOrEqual(sizes.client + 1);
  }
});
