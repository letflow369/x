# Sócrates — validação do padrão visual global

Resultado: **FAIL**

Commit testado: `4d22b9d43c1205fb3f83660e503d5ffd51dd35e3`

Matriz: contrato visual, build, design system, dados estruturados, padrão visual renderizado, geometria e testes dedicados de Sócrates.

```text
    +       },
    +       Object {
    +         "all": Array [],
    +         "any": Array [
    +           Object {
    +             "data": Object {
    +               "bgColor": "#f5eee3",
    +               "contrastRatio": 1.06,
    +               "expectedContrastRatio": "4.5:1",
    +               "fgColor": "#f1e7d5",
    +               "fontSize": "13.8pt (18.4px)",
    +               "fontWeight": "normal",
    +               "messageKey": null,
    +             },
    +             "id": "color-contrast",
    +             "impact": "serious",
    +             "message": "Element has insufficient color contrast of 1.06 (foreground color: #f1e7d5, background color: #f5eee3, font size: 13.8pt (18.4px), font weight: normal). Expected contrast ratio of 4.5:1",
    +             "relatedNodes": Array [
    +               Object {
    +                 "html": "<section class=\"socrates-library\" id=\"biblioteca\" aria-labelledby=\"biblioteca-titulo\">",
    +                 "target": Array [
    +                   "#biblioteca",
    +                 ],
    +               },
    +             ],
    +           },
    +         ],
    +         "failureSummary": "Fix any of the following:
    +   Element has insufficient color contrast of 1.06 (foreground color: #f1e7d5, background color: #f5eee3, font size: 13.8pt (18.4px), font weight: normal). Expected contrast ratio of 4.5:1",
    +         "html": "<p>As obras abaixo não devem ser lidas como uma coleção de transcrições. Elas permitem comparar gêneros, autores e modos diferentes de construir Sócrates.</p>",
    +         "impact": "serious",
    +         "none": Array [],
    +         "target": Array [
    +           "#biblioteca > .socrates-section-boundary > .socrates-section-heading > p:nth-child(3)",
    +         ],
    +       },
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
    +       Object {
    +         "all": Array [],
    +         "any": Array [
    +           Object {
    +             "data": Object {
    +               "bgColor": "#f7f1e7",
    +               "contrastRatio": 1.09,
    +               "expectedContrastRatio": "4.5:1",
    +               "fgColor": "#f1e7d5",
    +               "fontSize": "13.5pt (18px)",
    +               "fontWeight": "normal",
    +               "messageKey": null,
    +             },
    +             "id": "color-contrast",
    +             "impact": "serious",
    +             "message": "Element has insufficient color contrast of 1.09 (foreground color: #f1e7d5, background color: #f7f1e7, font size: 13.5pt (18px), font weight: normal). Expected contrast ratio of 4.5:1",
    +             "relatedNodes": Array [
    +               Object {
    +                 "html": "<p class=\"socrates-evidence__rule\"><strong>Regra editorial:</strong> quando a evidência não permite certeza, a página deve mostrar a incerteza em vez de preenchê-la com uma narrativa conveniente.</p>",
    +                 "target": Array [
    +                   ".socrates-evidence__rule",
    +                 ],
    +               },
    +             ],
    +           },
    +         ],
    +         "failureSummary": "Fix any of the following:
    +   Element has insufficient color contrast of 1.09 (foreground color: #f1e7d5, background color: #f7f1e7, font size: 13.5pt (18px), font weight: normal). Expected contrast ratio of 4.5:1",
    +         "html": "<p class=\"socrates-evidence__rule\"><strong>Regra editorial:</strong> quando a evidência não permite certeza, a página deve mostrar a incerteza em vez de preenchê-la com uma narrativa conveniente.</p>",
    +         "impact": "serious",
    +         "none": Array [],
    +         "target": Array [
    +           ".socrates-evidence__rule",
    +         ],
    +       },
    +       Object {
    +         "all": Array [],
    +         "any": Array [
    +           Object {
    +             "data": Object {
    +               "bgColor": "#f7f1e7",
    +               "contrastRatio": 1.09,
    +               "expectedContrastRatio": "4.5:1",
    +               "fgColor": "#f1e7d5",
    +               "fontSize": "13.5pt (18px)",
    +               "fontWeight": "bold",
    +               "messageKey": null,
    +             },
    +             "id": "color-contrast",
    +             "impact": "serious",
    +             "message": "Element has insufficient color contrast of 1.09 (foreground color: #f1e7d5, background color: #f7f1e7, font size: 13.5pt (18px), font weight: bold). Expected contrast ratio of 4.5:1",
    +             "relatedNodes": Array [
    +               Object {
    +                 "html": "<p class=\"socrates-evidence__rule\"><strong>Regra editorial:</strong> quando a evidência não permite certeza, a página deve mostrar a incerteza em vez de preenchê-la com uma narrativa conveniente.</p>",
    +                 "target": Array [
    +                   ".socrates-evidence__rule",
    +                 ],
    +               },
    +             ],
    +           },
    +         ],
    +         "failureSummary": "Fix any of the following:
    +   Element has insufficient color contrast of 1.09 (foreground color: #f1e7d5, background color: #f7f1e7, font size: 13.5pt (18px), font weight: bold). Expected contrast ratio of 4.5:1",
    +         "html": "<strong>Regra editorial:</strong>",
    +         "impact": "serious",
    +         "none": Array [],
    +         "target": Array [
    +           ".socrates-evidence__rule > strong",
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
  5 passed (14.0s)
```
