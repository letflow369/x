import fs from 'node:fs';
import { test, expect } from '@playwright/test';

const sitemap = fs.readFileSync(new URL('../dist/sitemap.xml', import.meta.url), 'utf8');
const allRoutes = [...sitemap.matchAll(/<loc>https:\/\/letflow369\.github\.io\/x\/([^<]*)<\/loc>/g)]
  .map((match) => match[1] || 'index.html');
const requestedRoutes = String(process.env.VISUAL_ROUTES || '')
  .split(',')
  .map((route) => route.trim())
  .filter(Boolean);
const routes = requestedRoutes.length
  ? allRoutes.filter((route) => requestedRoutes.includes(route))
  : allRoutes;
const viewports = [390, 1440];

async function blockExternalRequests(page) {
  await page.route('**/*', async (route) => {
    const url = new URL(route.request().url());
    if (url.hostname === '127.0.0.1' || url.hostname === 'localhost') return route.continue();
    return route.abort();
  });
}

async function inspectVisualContract(page) {
  return page.evaluate(() => {
    const root = getComputedStyle(document.documentElement);
    const rem = Number.parseFloat(root.fontSize);
    const readingWidth = Number.parseFloat(root.getPropertyValue('--reading-width')) * rem;
    const imageMaxHeight = Number.parseFloat(root.getPropertyValue('--site-image-max-height')) * rem;
    const heroImageWidth = Number.parseFloat(root.getPropertyValue('--site-image-hero-width')) * rem;

    const fontOf = (selector) => {
      const element = document.querySelector(selector);
      return element ? getComputedStyle(element).fontFamily : null;
    };
    const colorOf = (selector) => {
      const element = document.querySelector(selector);
      return element ? getComputedStyle(element).color : null;
    };

    const stylesheets = [...document.querySelectorAll('link[rel="stylesheet"]')].map((link) => link.getAttribute('href'));
    const figures = [...document.querySelectorAll('main figure')]
      .filter((figure) => getComputedStyle(figure).display !== 'none')
      .map((figure) => {
        const rect = figure.getBoundingClientRect();
        const image = figure.querySelector('img');
        const imageRect = image?.getBoundingClientRect();
        const className = String(figure.className || '');
        const ancestor = figure.closest('[class$="-hero"], [class*="-hero "]');
        const heroLike = /(^|\s)[^\s]*(?:hero|portrait|profile)(?:\s|$)/.test(className)
          || Boolean(ancestor);
        return {
          className,
          ancestorClassName: ancestor ? String(ancestor.className || '') : '',
          width: Math.round(rect.width * 10) / 10,
          imageHeight: Math.round((imageRect?.height ?? 0) * 10) / 10,
          heroLike,
        };
      });

    const blockSelector = [
      '[class$="-card"]', '[class*="-card "]', '[class$="__card"]', '[class*="__card "]',
      '[class$="-panel"]', '[class*="-panel "]', '[class$="__panel"]', '[class*="__panel "]',
      '[class$="-notice"]', '[class*="-notice "]', '[class$="__notice"]', '[class*="__notice "]',
      '[class$="-callout"]', '[class*="-callout "]', '[class$="__callout"]', '[class*="__callout "]',
      '[class$="-box"]', '[class*="-box "]', '[class$="__box"]', '[class*="__box "]',
      '[class$="-summary"]', '[class*="-summary "]', '[class$="__summary"]', '[class*="__summary "]',
    ].join(',');

    const blockViolations = [...document.querySelectorAll(`main :is(${blockSelector})`)]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.width > 0 && rect.height > 0;
      })
      .map((element) => {
        const style = getComputedStyle(element);
        return {
          selector: `${element.tagName.toLowerCase()}.${[...element.classList].slice(0, 3).join('.')}`,
          radius: Number.parseFloat(style.borderTopLeftRadius),
          borderStyle: style.borderTopStyle,
          borderWidth: Number.parseFloat(style.borderTopWidth),
          background: style.backgroundImage === 'none' ? style.backgroundColor : style.backgroundImage,
        };
      })
      .filter((item) => item.radius < 13 || item.borderStyle === 'none' || item.borderWidth < 0.9)
      .slice(0, 20);

    return {
      bodyBackground: getComputedStyle(document.body).backgroundColor,
      bodyFont: getComputedStyle(document.body).fontFamily,
      h1Font: fontOf('main h1'),
      h2Font: fontOf('main h2'),
      h3Font: fontOf('main h3'),
      h1Color: colorOf('main h1'),
      paragraphColor: colorOf('main p'),
      lastStylesheet: stylesheets.at(-1) || '',
      readingWidth,
      imageMaxHeight,
      heroImageWidth,
      figures,
      blockViolations,
    };
  });
}

function collectViolations(contract) {
  const violations = [];

  if (!contract.lastStylesheet.includes('site-standard.css')) {
    violations.push({ type: 'stylesheet-order', actual: contract.lastStylesheet });
  }
  if (contract.bodyBackground !== 'rgb(11, 12, 16)') {
    violations.push({ type: 'body-background', actual: contract.bodyBackground });
  }
  if (!contract.bodyFont.includes('Spectral')) {
    violations.push({ type: 'body-font', actual: contract.bodyFont });
  }
  if (!contract.h1Font?.includes('Cinzel Decorative')) {
    violations.push({ type: 'h1-font', actual: contract.h1Font });
  }
  if (contract.h2Font && !contract.h2Font.includes('Marcellus')) {
    violations.push({ type: 'h2-font', actual: contract.h2Font });
  }
  if (contract.h3Font && !contract.h3Font.includes('Marcellus')) {
    violations.push({ type: 'h3-font', actual: contract.h3Font });
  }
  if (contract.h1Color !== 'rgb(241, 231, 213)') {
    violations.push({ type: 'h1-color', actual: contract.h1Color });
  }

  for (const block of contract.blockViolations) {
    violations.push({ type: 'block', ...block });
  }

  for (const figure of contract.figures) {
    const maximumWidth = figure.heroLike ? contract.heroImageWidth : contract.readingWidth;
    if (figure.width > maximumWidth + 1) {
      violations.push({ type: 'figure-width', maximumWidth, ...figure });
    }
    if (figure.imageHeight > contract.imageMaxHeight + 1) {
      violations.push({ type: 'image-height', maximumHeight: contract.imageMaxHeight, ...figure });
    }
  }

  return violations;
}

test.describe('padrão visual da página inicial — todas as rotas', () => {
  for (const route of routes) {
    test(`${route} usa tipografia, paleta, blocos e imagens do contrato global`, async ({ page }) => {
      test.setTimeout(60_000);
      await blockExternalRequests(page);

      for (const width of viewports) {
        await page.setViewportSize({ width, height: 1000 });
        const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
        expect(response?.status(), `${route} @ ${width}px`).toBe(200);

        const contract = await inspectVisualContract(page);
        const violations = collectViolations(contract);
        expect(
          violations,
          `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
        ).toEqual([]);
      }
    });
  }
});
