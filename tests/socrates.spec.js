import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const route = 'artigos/socrates.html';

async function blockExternalRequests(page) {
  await page.route('**/*', async (requestRoute) => {
    const url = new URL(requestRoute.request().url());
    if (url.hostname === '127.0.0.1' || url.hostname === 'localhost') {
      await requestRoute.continue();
      return;
    }
    await requestRoute.abort();
  });
}

test.beforeEach(async ({ page }) => {
  await blockExternalRequests(page);
});

test('Sócrates carrega a narrativa completa e os marcadores de evidência', async ({ page }) => {
  const response = await page.goto(route, { waitUntil: 'domcontentloaded' });
  expect(response?.status()).toBe(200);
  await expect(page.getByRole('heading', { level: 1, name: 'Sócrates' })).toBeVisible();
  await expect(page.locator('.socrates-source-card')).toHaveCount(3);
  await expect(page.getByRole('heading', { name: /Uma vida conhecida por fragmentos/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Quando investigar se torna um problema político/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Só sei que nada sei/ })).toBeVisible();
  await expect(page.getByRole('heading', { name: /Leia versões diferentes do mesmo problema/ })).toBeVisible();
  await expect(page.getByText('09 · Biblioteca socrática', { exact: true })).toBeVisible();
  await expect(page.locator('.socrates-evidence-grid article')).toHaveCount(4);
});

test('imagens históricas são locais e carregam sem rede externa', async ({ page }) => {
  await page.goto(route, { waitUntil: 'domcontentloaded' });
  const bust = page.locator('.socrates-portrait img');
  await expect(bust).toHaveAttribute('src', /src\/assets\/images\/socrates\/socrates-bust\.webp$/);
  expect(await bust.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);

  const painting = page.locator('.socrates-death-art img');
  await painting.scrollIntoViewIfNeeded();
  await expect(painting).toHaveAttribute('src', /src\/assets\/images\/socrates\/death-of-socrates-david-1787\.webp$/);
  await expect.poll(() => painting.evaluate((img) => img.naturalWidth)).toBeGreaterThan(0);
});

test('laboratório de justiça conduz afirmação até revisão sem persistência externa', async ({ page }) => {
  await page.goto(route, { waitUntil: 'domcontentloaded' });

  await page.getByRole('radio', { name: /^Sim/ }).check();
  await page.getByRole('button', { name: 'Começar', exact: true }).click();
  await page.getByLabel('Defina justiça em uma frase.').fill('Justiça é dar a cada pessoa aquilo que lhe pertence.');
  await page.getByRole('button', { name: 'Testar definição' }).click();
  await page.getByLabel('Por que essa definição deveria ser aceita?').fill('Porque respeita direitos e expectativas legítimas.');
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByLabel('Dê um caso concreto em que sua definição funciona.').fill('Devolver um livro emprestado ao dono depois do prazo combinado.');
  await page.getByRole('button', { name: 'Procurar um limite' }).click();
  await page.getByRole('radio', { name: /^Preciso revisá-la/ }).check();
  await page.getByRole('button', { name: 'Revisar a ideia' }).click();
  await page.getByLabel('Depois das perguntas, como você formularia sua ideia agora?').fill('Justiça exige respeitar direitos sem aplicar regras cegamente quando isso produz dano injustificado.');
  await page.getByRole('button', { name: 'Concluir investigação' }).click();

  await expect(page.getByText('Justiça é dar a cada pessoa aquilo que lhe pertence.')).toBeVisible();
  await expect(page.getByText('Justiça exige respeitar direitos sem aplicar regras cegamente quando isso produz dano injustificado.')).toBeVisible();
  await expect(page.getByText(/Nada é enviado ou armazenado/)).toBeVisible();
});

test('laboratório aberto examina uma crença e permite reiniciar', async ({ page }) => {
  await page.goto(`${route}#laboratorio-aberto`, { waitUntil: 'domcontentloaded' });

  await page.getByLabel('Qual crença você quer examinar?').fill('Dinheiro traz felicidade.');
  await page.getByRole('button', { name: 'Começar exame' }).click();
  await page.getByLabel(/O que você quer dizer com as palavras principais/).fill('Dinheiro significa recursos econômicos e felicidade significa bem-estar duradouro.');
  await page.getByRole('button', { name: 'Continuar', exact: true }).click();
  await page.getByLabel(/Que razão ou evidência sustenta essa afirmação/).fill('Recursos reduzem algumas formas de insegurança material.');
  await page.getByRole('button', { name: 'Procurar contraexemplo' }).click();
  await page.getByLabel(/imaginar um caso real ou possível/).fill('Uma pessoa pode ter muitos recursos e ainda sofrer isolamento ou doença.');
  await page.getByRole('button', { name: 'Reformular' }).click();
  await page.getByLabel(/Como você formularia sua crença depois do exame/).fill('Recursos financeiros podem favorecer algumas condições de bem-estar, mas não garantem felicidade.');
  await page.getByRole('button', { name: 'Concluir', exact: true }).click();

  await expect(page.getByText('Dinheiro traz felicidade.')).toBeVisible();
  await expect(page.getByText(/Recursos financeiros podem favorecer/)).toBeVisible();
  await expect(page.getByText(/Nada do que você escreve é enviado/)).toBeVisible();

  await page.getByRole('button', { name: 'Examinar outra crença' }).click();
  await expect(page.getByText('Etapa 1 de 5')).toBeVisible();
  await expect(page.getByLabel('Qual crença você quer examinar?')).toHaveValue('');
});

test('Sócrates não apresenta violações WCAG automaticamente detectáveis', async ({ page }) => {
  await page.goto(route, { waitUntil: 'domcontentloaded' });
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});
