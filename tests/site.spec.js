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
const layoutWidths = [320, 360, 390, 768, 1024, 1440];

async function blockExternalRequests(page) {
  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === '127.0.0.1' || url.hostname === 'localhost') return route.continue();
    return route.abort();
  });
}

async function inspectHorizontalOverflow(page) {
  return page.evaluate(() => {
    const root = document.documentElement;
    const viewportWidth = root.clientWidth;
    const documentOverflow = root.scrollWidth - viewportWidth;
    const offenders = [];
    const selectorFor = (element) => {
      if (element.id) return `#${CSS.escape(element.id)}`;
      const classes = [...element.classList].slice(0, 3).map((name) => `.${CSS.escape(name)}`).join('');
      return `${element.tagName.toLowerCase()}${classes}`;
    };

    for (const element of document.body.querySelectorAll('*')) {
      const style = getComputedStyle(element);
      if (style.position === 'fixed') continue;
      const rect = element.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;

      const ownScrollableOverflow = ['auto', 'scroll'].includes(style.overflowX)
        && element.scrollWidth > element.clientWidth + 1;
      if (ownScrollableOverflow) continue;

      const leftOverflow = Math.max(0, -rect.left);
      const rightOverflow = Math.max(0, rect.right - viewportWidth);
      if (leftOverflow <= 1 && rightOverflow <= 1) continue;

      offenders.push({
        selector: selectorFor(element),
        left: Math.round(rect.left * 10) / 10,
        right: Math.round(rect.right * 10) / 10,
        width: Math.round(rect.width * 10) / 10,
        scrollWidth: element.scrollWidth,
        overflowX: style.overflowX,
      });
    }

    return {
      viewportWidth,
      documentWidth: root.scrollWidth,
      documentOverflow,
      offenders: offenders
        .sort((a, b) => Math.max(b.right - viewportWidth, -b.left) - Math.max(a.right - viewportWidth, -a.left))
        .slice(0, 12),
    };
  });
}

async function inspectGlobalAlignment(page) {
  return page.evaluate(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    const contentWidth = Number.parseFloat(rootStyles.getPropertyValue('--content-width')) * Number.parseFloat(rootStyles.fontSize);
    const viewport = document.documentElement.clientWidth;
    const expectedMaximum = Math.min(contentWidth, viewport);
    const selectors = ['.site-header__inner', '.breadcrumbs', '.site-footer__inner'];
    const measurements = selectors
      .map((selector) => {
        const element = document.querySelector(selector);
        if (!element) return null;
        const rect = element.getBoundingClientRect();
        return { selector, width: rect.width, left: rect.left, right: rect.right };
      })
      .filter(Boolean);
    return { contentWidth, expectedMaximum, measurements };
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

test.describe('contrato geométrico — todas as rotas', () => {
  for (const route of routes) {
    test(`${route} respeita viewport e eixos globais`, async ({ page }) => {
      test.setTimeout(90_000);
      await blockExternalRequests(page);

      for (const width of layoutWidths) {
        await page.setViewportSize({ width, height: 900 });
        const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
        expect(response?.status(), `${route} @ ${width}px: status HTTP`).toBe(200);

        const overflow = await inspectHorizontalOverflow(page);
        expect(
          overflow.documentWidth,
          `${route} @ ${width}px: documento ${overflow.documentWidth}px > viewport ${overflow.viewportWidth}px.\n` +
            `Elementos suspeitos:\n${JSON.stringify(overflow.offenders, null, 2)}`,
        ).toBeLessThanOrEqual(overflow.viewportWidth + 1);

        const alignment = await inspectGlobalAlignment(page);
        for (const measurement of alignment.measurements) {
          expect(
            measurement.width,
            `${route} @ ${width}px: ${measurement.selector} excede o contrato global (${measurement.width}px).`,
          ).toBeLessThanOrEqual(alignment.expectedMaximum + 1);
        }
      }
    });
  }
});
