# Sócrates — limpeza de redundâncias

Resultado: **FAIL**

Commit testado: `ca8c2f7ce335f5b864a257d00ea6e4649a9334a2`

## Métricas

```text
  161 src/scripts/socrates-investigation.js
  753 src/styles/socrates.css
  624 src/styles/socrates-sections.css
   96 tests/socrates.spec.js
 1634 total
```

## Validação

```text
    +             },
    +             "id": "color-contrast",
    +             "impact": "serious",
    +             "message": "Element has insufficient color contrast of 1.08 (foreground color: #f1e7d5, background color: #f6f1e8, font size: 13.5pt (18px), font weight: normal). Expected contrast ratio of 4.5:1",
    +             "relatedNodes": Array [
    +               Object {
    +                 "html": "<section class=\"socrates-references\" id=\"referencias\" aria-labelledby=\"referencias-titulo\">",
    +                 "target": Array [
    +                   "#referencias",
    +                 ],
    +               },
    +             ],
    +           },
    +         ],
    +         "failureSummary": "Fix any of the following:
    +   Element has insufficient color contrast of 1.08 (foreground color: #f1e7d5, background color: #f6f1e8, font size: 13.5pt (18px), font weight: normal). Expected contrast ratio of 4.5:1",
    +         "html": "<li id=\"ref-6\"><strong>[imagem]</strong> S. Perquin. <a href=\"https://commons.wikimedia.org/wiki/File:Socrates_(transparent).png\" rel=\"noopener noreferrer\" target=\"_blank\">Socrates (transparent).png</a>. Wikimedia Commons, CC0 1.0. Cópia otimizada localmente para esta página.</li>",
    +         "impact": "serious",
    +         "none": Array [],
    +         "target": Array [
    +           "#ref-6",
    +         ],
    +       },
    +       Object {
    +         "all": Array [],
    +         "any": Array [
    +           Object {
    +             "data": Object {
    +               "bgColor": "#f6f1e8",
    +               "contrastRatio": 1.08,
    +               "expectedContrastRatio": "4.5:1",
    +               "fgColor": "#f1e7d5",
    +               "fontSize": "13.5pt (18px)",
    +               "fontWeight": "bold",
    +               "messageKey": null,
    +             },
    +             "id": "color-contrast",
    +             "impact": "serious",
    +             "message": "Element has insufficient color contrast of 1.08 (foreground color: #f1e7d5, background color: #f6f1e8, font size: 13.5pt (18px), font weight: bold). Expected contrast ratio of 4.5:1",
    +             "relatedNodes": Array [
    +               Object {
    +                 "html": "<section class=\"socrates-references\" id=\"referencias\" aria-labelledby=\"referencias-titulo\">",
    +                 "target": Array [
    +                   "#referencias",
    +                 ],
    +               },
    +             ],
    +           },
    +         ],
    +         "failureSummary": "Fix any of the following:
    +   Element has insufficient color contrast of 1.08 (foreground color: #f1e7d5, background color: #f6f1e8, font size: 13.5pt (18px), font weight: bold). Expected contrast ratio of 4.5:1",
    +         "html": "<strong>[imagem]</strong>",
    +         "impact": "serious",
    +         "none": Array [],
    +         "target": Array [
    +           "#ref-6 > strong",
    +         ],
    +       },
    +       Object {
    +         "all": Array [],
    +         "any": Array [
    +           Object {
    +             "data": Object {
    +               "bgColor": "#f6f1e8",
    +               "contrastRatio": 2.44,
    +               "expectedContrastRatio": "4.5:1",
    +               "fgColor": "#c8914f",
    +               "fontSize": "13.5pt (18px)",
    +               "fontWeight": "normal",
    +               "messageKey": null,
    +             },
    +             "id": "color-contrast",
    +             "impact": "serious",
    +             "message": "Element has insufficient color contrast of 2.44 (foreground color: #c8914f, background color: #f6f1e8, font size: 13.5pt (18px), font weight: normal). Expected contrast ratio of 4.5:1",
    +             "relatedNodes": Array [
    +               Object {
    +                 "html": "<section class=\"socrates-references\" id=\"referencias\" aria-labelledby=\"referencias-titulo\">",
    +                 "target": Array [
    +                   "#referencias",
    +                 ],
    +               },
    +             ],
    +           },
    +         ],
    +         "failureSummary": "Fix any of the following:
    +   Element has insufficient color contrast of 2.44 (foreground color: #c8914f, background color: #f6f1e8, font size: 13.5pt (18px), font weight: normal). Expected contrast ratio of 4.5:1",
    +         "html": "<a href=\"https://commons.wikimedia.org/wiki/File:Socrates_(transparent).png\" rel=\"noopener noreferrer\" target=\"_blank\">Socrates (transparent).png</a>",
    +         "impact": "serious",
    +         "none": Array [],
    +         "target": Array [
    +           "#ref-6 > a[rel=\"noopener noreferrer\"][target=\"_blank\"]",
    +         ],
    +       },
    +       Object {
    +         "all": Array [],
    +         "any": Array [
    +           Object {
    +             "data": Object {
    +               "bgColor": "#f6f1e8",
    +               "contrastRatio": 1.08,
    +               "expectedContrastRatio": "4.5:1",
    +               "fgColor": "#f1e7d5",
    +               "fontSize": "13.5pt (18px)",
    +               "fontWeight": "normal",
    +               "messageKey": null,
    +             },
    +             "id": "color-contrast",
    +             "impact": "serious",
    +             "message": "Element has insufficient color contrast of 1.08 (foreground color: #f1e7d5, background color: #f6f1e8, font size: 13.5pt (18px), font weight: normal). Expected contrast ratio of 4.5:1",
    +             "relatedNodes": Array [
    +               Object {
    +                 "html": "<section class=\"socrates-references\" id=\"referencias\" aria-labelledby=\"referencias-titulo\">",
    +                 "target": Array [
    +                   "#referencias",
    +                 ],
    +               },
    +             ],
    +           },
    +         ],
    +         "failureSummary": "Fix any of the following:
    +   Element has insufficient color contrast of 1.08 (foreground color: #f1e7d5, background color: #f6f1e8, font size: 13.5pt (18px), font weight: normal). Expected contrast ratio of 4.5:1",
    +         "html": "<li id=\"ref-7\">",
    +         "impact": "serious",
    +         "none": Array [],
    +         "target": Array [
    +           "#ref-7",
    +         ],
    +       },
    +       Object {
    +         "all": Array [],
    +         "any": Array [
    +           Object {
    +             "data": Object {
    +               "bgColor": "#f6f1e8",
    +               "contrastRatio": 1.08,
    +               "expectedContrastRatio": "4.5:1",
    +               "fgColor": "#f1e7d5",
    +               "fontSize": "13.5pt (18px)",
    +               "fontWeight": "bold",
    +               "messageKey": null,
    +             },
    +             "id": "color-contrast",
    +             "impact": "serious",
    +             "message": "Element has insufficient color contrast of 1.08 (foreground color: #f1e7d5, background color: #f6f1e8, font size: 13.5pt (18px), font weight: bold). Expected contrast ratio of 4.5:1",
    +             "relatedNodes": Array [
    +               Object {
    +                 "html": "<section class=\"socrates-references\" id=\"referencias\" aria-labelledby=\"referencias-titulo\">",
    +                 "target": Array [
    +                   "#referencias",
    +                 ],
    +               },
    +             ],
    +           },
    +         ],
    +         "failureSummary": "Fix any of the following:
    +   Element has insufficient color contrast of 1.08 (foreground color: #f1e7d5, background color: #f6f1e8, font size: 13.5pt (18px), font weight: bold). Expected contrast ratio of 4.5:1",
    +         "html": "<strong>[imagem]</strong>",
    +         "impact": "serious",
    +         "none": Array [],
    +         "target": Array [
    +           "#ref-7 > strong",
    +         ],
    +       },
    +       Object {
    +         "all": Array [],
    +         "any": Array [
    +           Object {
    +             "data": Object {
    +               "bgColor": "#f6f1e8",
    +               "contrastRatio": 2.44,
    +               "expectedContrastRatio": "4.5:1",
    +               "fgColor": "#c8914f",
    +               "fontSize": "13.5pt (18px)",
    +               "fontWeight": "normal",
    +               "messageKey": null,
    +             },
    +             "id": "color-contrast",
    +             "impact": "serious",
    +             "message": "Element has insufficient color contrast of 2.44 (foreground color: #c8914f, background color: #f6f1e8, font size: 13.5pt (18px), font weight: normal). Expected contrast ratio of 4.5:1",
    +             "relatedNodes": Array [
    +               Object {
    +                 "html": "<section class=\"socrates-references\" id=\"referencias\" aria-labelledby=\"referencias-titulo\">",
    +                 "target": Array [
    +                   "#referencias",
    +                 ],
    +               },
    +             ],
    +           },
    +         ],
    +         "failureSummary": "Fix any of the following:
    +   Element has insufficient color contrast of 2.44 (foreground color: #c8914f, background color: #f6f1e8, font size: 13.5pt (18px), font weight: normal). Expected contrast ratio of 4.5:1",
    +         "html": "<cite>The Death of Socrates</cite>",
    +         "impact": "serious",
    +         "none": Array [],
    +         "target": Array [
    +           "#ref-7 > a[rel=\"noopener noreferrer\"][target=\"_blank\"] > cite",
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


  1 failed
    tests/socrates.spec.js:90:1 › Sócrates não apresenta violações WCAG automaticamente detectáveis 
  4 passed (12.0s)
```
