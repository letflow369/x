# Sócrates — validação do padrão visual global

Resultado: **FAIL**

Commit testado: `4ce9854998e0e2ea27b0698a290e949bc5b5d133`

Matriz: contrato visual, build, design system, dados estruturados, padrão visual renderizado, geometria e testes dedicados de Sócrates.

```text

### npm run audit:visual

> let-flow-369@1.0.0 audit:visual
> node scripts/audit-home-visual-standard.mjs

LET FLOW 369 — CONTRATO VISUAL DA HOME
Páginas públicas ............ 100
Falhas ...................... 0
Resultado ................... APROVADO

### npm run build

> let-flow-369@1.0.0 build
> node scripts/build-site.mjs

Pré-render: busca.html (83 item(ns))
Pré-render: evidencias.html (29 item(ns))
Pré-render: tags.html (83 item(ns))
Pré-render: glossario.html (15 item(ns))
Build concluído: 100 páginas em dist/.

### npm run audit:design

> let-flow-369@1.0.0 audit:design
> node scripts/audit-design-system.mjs

LET FLOW 369 — AUDITORIA DO DESIGN SYSTEM
Dossiês de substâncias ....... 8
Componente compartilhado .... OK
Componente botânico ......... OK
Contrato de tema ............ OK
Tokens tipográficos ......... OK
Resultado ................... APROVADO

### npm run audit:structured

> let-flow-369@1.0.0 audit:structured
> node scripts/audit-structured-data.mjs

LET FLOW 369 — AUDITORIA DE DADOS ESTRUTURADOS
HTML públicos ................. 100
BreadcrumbList encontrados .... 93
Artigos com datas estruturadas  84
Erros .......................... 0

### npx playwright test tests/visual-standard.spec.js --workers=1 --retries=0

Running 1 test using 1 worker

[1/1] tests/visual-standard.spec.js:158:5 › padrão visual da página inicial — todas as rotas › artigos/socrates.html usa tipografia, paleta, blocos e imagens do contrato global
  1 passed (1.9s)

### npx playwright test tests/site.spec.js --grep artigos/socrates.html --workers=1 --retries=0

Running 2 tests using 1 worker

[1/2] tests/site.spec.js:94:5 › páginas públicas › artigos/socrates.html carrega com estrutura principal
[2/2] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/socrates.html respeita viewport e eixos globais
  2 passed (3.5s)

### npx playwright test tests/socrates.spec.js --workers=1 --retries=0

Running 6 tests using 1 worker

[1/6] tests/socrates.spec.js:21:1 › Sócrates carrega a narrativa completa e os marcadores de evidência
[2/6] tests/socrates.spec.js:34:1 › imagens históricas são locais e carregam sem rede externa
[3/6] tests/socrates.spec.js:46:1 › laboratório de justiça conduz afirmação até revisão sem persistência externa
[4/6] tests/socrates.spec.js:67:1 › laboratório aberto examina uma crença e permite reiniciar
[5/6] tests/socrates.spec.js:90:1 › Sócrates não apresenta violações WCAG automaticamente detectáveis
  1) tests/socrates.spec.js:90:1 › Sócrates não apresenta violações WCAG automaticamente detectáveis 

    Error: expect(received).toEqual(expected) // deep equality

    - Expected  -  1
    + Received  + 93

    - Array []
    + Array [
    +   Object {
    +     "description": "Ensure the contrast between foreground and background colors meets WCAG 2 AA minimum contrast ratio thresholds",
    +     "help": "Elements must meet minimum color contrast ratio thresholds",
    +     "helpUrl": "https://dequeuniversity.com/rules/axe/4.12/color-contrast?application=playwright",
    +     "id": "color-contrast",
    +     "impact": "serious",
    +     "nodes": Array [
    +       Object {
    +         "all": Array [],
    +         "any": Array [
    +           Object {
    +             "data": Object {
    +               "bgColor": "#eae1d5",
    +               "contrastRatio": 2.13,
    +               "expectedContrastRatio": "4.5:1",
    +               "fgColor": "#c8914f",
    +               "fontSize": "9.1pt (12.16px)",
    +               "fontWeight": "bold",
    +               "messageKey": null,
    +             },
    +             "id": "color-contrast",
    +             "impact": "serious",
    +             "message": "Element has insufficient color contrast of 2.13 (foreground color: #c8914f, background color: #eae1d5, font size: 9.1pt (12.16px), font weight: bold). Expected contrast ratio of 4.5:1",
    +             "relatedNodes": Array [
    +               Object {
    +                 "html": "<section class=\"socrates-evidence\" id=\"evidencias\" aria-labelledby=\"evidencias-titulo\">",
    +                 "target": Array [
    +                   "#evidencias",
    +                 ],
    +               },
    +             ],
    +           },
    +         ],
    +         "failureSummary": "Fix any of the following:
    +   Element has insufficient color contrast of 2.13 (foreground color: #c8914f, background color: #eae1d5, font size: 9.1pt (12.16px), font weight: bold). Expected contrast ratio of 4.5:1",
    +         "html": "<p class=\"socrates-eyebrow\">11 · Como construímos esta página</p>",
    +         "impact": "serious",
    +         "none": Array [],
    +         "target": Array [
    +           "#evidencias > .socrates-section-boundary > .socrates-section-heading > .socrates-eyebrow",
    +         ],
    +       },
    +       Object {
    +         "all": Array [],
    +         "any": Array [
    +           Object {
    +             "data": Object {
    +               "bgColor": "#eae1d5",
    +               "contrastRatio": 1.05,
    +               "expectedContrastRatio": "3:1",
    +               "fgColor": "#f1e7d5",
    +               "fontSize": "48.0pt (64px)",
    +               "fontWeight": "normal",
    +               "messageKey": null,
    +             },
    +             "id": "color-contrast",
    +             "impact": "serious",
    +             "message": "Element has insufficient color contrast of 1.05 (foreground color: #f1e7d5, background color: #eae1d5, font size: 48.0pt (64px), font weight: normal). Expected contrast ratio of 3:1",
    +             "relatedNodes": Array [
    +               Object {
    +                 "html": "<section class=\"socrates-evidence\" id=\"evidencias\" aria-labelledby=\"evidencias-titulo\">",
    +                 "target": Array [
    +                   "#evidencias",
    +                 ],
    +               },
    +             ],
    +           },
    +         ],
    +         "failureSummary": "Fix any of the following:
    +   Element has insufficient color contrast of 1.05 (foreground color: #f1e7d5, background color: #eae1d5, font size: 48.0pt (64px), font weight: normal). Expected contrast ratio of 3:1",
    +         "html": "<h2 id=\"evidencias-titulo\">Fonte, evidência e incerteza não são a mesma coisa</h2>",
    +         "impact": "serious",
    +         "none": Array [],
    +         "target": Array [
    +           "#evidencias-titulo",
    +         ],
    +       },
    +     ],
    +     "tags": Array [
    +       "cat.color",
    +       "wcag2aa",
    +       "wcag143",
    +       "TTv5",
    +       "TT13.c",
    +       "EN-301-549",
    +       "EN-9.1.4.3",
    +       "ACT",
    +       "RGAAv4",
    +       "RGAA-3.2.1",
    +     ],
    +   },
    + ]

      93 |     .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      94 |     .analyze();
    > 95 |   expect(results.violations).toEqual([]);
         |                              ^
      96 | });
      97 |
      98 | test('Sócrates permanece contido no viewport', async ({ page }) => {
        at /home/runner/work/x/x/tests/socrates.spec.js:95:30

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/socrates-Sócrates-não-apre-03c76-automaticamente-detectáveis/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/socrates-Sócrates-não-apre-03c76-automaticamente-detectáveis/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/socrates-Sócrates-não-apre-03c76-automaticamente-detectáveis/trace.zip
    Usage:

        npx playwright show-trace test-results/socrates-Sócrates-não-apre-03c76-automaticamente-detectáveis/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────


[6/6] tests/socrates.spec.js:98:1 › Sócrates permanece contido no viewport
  1 failed
    tests/socrates.spec.js:90:1 › Sócrates não apresenta violações WCAG automaticamente detectáveis 
  5 passed (10.5s)
```
