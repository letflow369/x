# Home visual standard — targeted diagnostics

Result: **FAIL**

Commit tested: `5574cd549e1a7463301cfeece6c3515a0aed9422`

Routes: borderline, CBD, deficiência intelectual, DMT, LSD, síndrome de Down, TCC, TOC e vibrações/estados vibracionais.

```text

Running 9 tests using 1 worker

[1/9] tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/borderline.html usa tipografia, paleta, blocos e imagens do contrato global
[2/9] (retries) tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/borderline.html usa tipografia, paleta, blocos e imagens do contrato global (retry #1)
  1) tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/borderline.html usa tipografia, paleta, blocos e imagens do contrato global 

    Error: artigos/borderline.html @ 390px
    {
      "violations": [
        {
          "type": "h1-font",
          "actual": "Marcellus, Georgia, serif"
        }
      ],
      "contract": {
        "bodyBackground": "rgb(11, 12, 16)",
        "bodyFont": "Spectral, Georgia, serif",
        "h1Font": "Marcellus, Georgia, serif",
        "h2Font": "Marcellus, Georgia, serif",
        "h3Font": "Marcellus, Georgia, serif",
        "h1Color": "rgb(241, 231, 213)",
        "paragraphColor": "rgb(200, 145, 79)",
        "lastStylesheet": "../src/styles/site-standard.css?v=20260818-1",
        "readingWidth": 736,
        "imageMaxHeight": 416,
        "heroImageWidth": 288,
        "figures": [
          {
            "className": "borderline-hero__visual",
            "ancestorClassName": "borderline-hero",
            "width": 288,
            "imageHeight": 304,
            "heroLike": true
          }
        ],
        "blockViolations": []
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 6

    - Array []
    + Array [
    +   Object {
    +     "actual": "Marcellus, Georgia, serif",
    +     "type": "h1-font",
    +   },
    + ]

      162 |           violations,
      163 |           `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
    > 164 |         ).toEqual([]);
          |           ^
      165 |       }
      166 |     });
      167 |   }
        at /home/runner/work/x/x/tests/visual-standard.spec.js:164:11

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-bac78--imagens-do-contrato-global/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-bac78--imagens-do-contrato-global/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-bac78--imagens-do-contrato-global/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-bac78--imagens-do-contrato-global/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

    Retry #1 ───────────────────────────────────────────────────────────────────────────────────────

    Error: artigos/borderline.html @ 390px
    {
      "violations": [
        {
          "type": "h1-font",
          "actual": "Marcellus, Georgia, serif"
        }
      ],
      "contract": {
        "bodyBackground": "rgb(11, 12, 16)",
        "bodyFont": "Spectral, Georgia, serif",
        "h1Font": "Marcellus, Georgia, serif",
        "h2Font": "Marcellus, Georgia, serif",
        "h3Font": "Marcellus, Georgia, serif",
        "h1Color": "rgb(241, 231, 213)",
        "paragraphColor": "rgb(200, 145, 79)",
        "lastStylesheet": "../src/styles/site-standard.css?v=20260818-1",
        "readingWidth": 736,
        "imageMaxHeight": 416,
        "heroImageWidth": 288,
        "figures": [
          {
            "className": "borderline-hero__visual",
            "ancestorClassName": "borderline-hero",
            "width": 288,
            "imageHeight": 304,
            "heroLike": true
          }
        ],
        "blockViolations": []
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 6

    - Array []
    + Array [
    +   Object {
    +     "actual": "Marcellus, Georgia, serif",
    +     "type": "h1-font",
    +   },
    + ]

      162 |           violations,
      163 |           `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
    > 164 |         ).toEqual([]);
          |           ^
      165 |       }
      166 |     });
      167 |   }
        at /home/runner/work/x/x/tests/visual-standard.spec.js:164:11

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-bac78--imagens-do-contrato-global-retry1/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-bac78--imagens-do-contrato-global-retry1/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-bac78--imagens-do-contrato-global-retry1/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-bac78--imagens-do-contrato-global-retry1/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────


[3/9] tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/cbd.html usa tipografia, paleta, blocos e imagens do contrato global
[4/9] (retries) tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/cbd.html usa tipografia, paleta, blocos e imagens do contrato global (retry #1)
  2) tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/cbd.html usa tipografia, paleta, blocos e imagens do contrato global 

    Error: artigos/cbd.html @ 390px
    {
      "violations": [
        {
          "type": "h1-font",
          "actual": "Marcellus, Georgia, serif"
        },
        {
          "type": "block",
          "selector": "aside.cbd-hero__notice.substance-hero__notice",
          "radius": 0,
          "borderStyle": "none",
          "borderWidth": 0,
          "background": "rgba(18, 23, 19, 0.78)"
        },
        {
          "type": "block",
          "selector": "div.cbd-final-summary",
          "radius": 8,
          "borderStyle": "solid",
          "borderWidth": 1,
          "background": "linear-gradient(135deg, rgba(57, 102, 76, 0.17), rgba(194, 154, 109, 0.07))"
        }
      ],
      "contract": {
        "bodyBackground": "rgb(11, 12, 16)",
        "bodyFont": "Spectral, Georgia, serif",
        "h1Font": "Marcellus, Georgia, serif",
        "h2Font": "Marcellus, Georgia, serif",
        "h3Font": "Marcellus, Georgia, serif",
        "h1Color": "rgb(241, 231, 213)",
        "paragraphColor": "rgb(200, 145, 79)",
        "lastStylesheet": "../styles/site-standard.css?v=20260818-1",
        "readingWidth": 736,
        "imageMaxHeight": null,
        "heroImageWidth": null,
        "figures": [],
        "blockViolations": [
          {
            "selector": "aside.cbd-hero__notice.substance-hero__notice",
            "radius": 0,
            "borderStyle": "none",
            "borderWidth": 0,
            "background": "rgba(18, 23, 19, 0.78)"
          },
          {
            "selector": "div.cbd-final-summary",
            "radius": 8,
            "borderStyle": "solid",
            "borderWidth": 1,
            "background": "linear-gradient(135deg, rgba(57, 102, 76, 0.17), rgba(194, 154, 109, 0.07))"
          }
        ]
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  -  1
    + Received  + 22

    - Array []
    + Array [
    +   Object {
    +     "actual": "Marcellus, Georgia, serif",
    +     "type": "h1-font",
    +   },
    +   Object {
    +     "background": "rgba(18, 23, 19, 0.78)",
    +     "borderStyle": "none",
    +     "borderWidth": 0,
    +     "radius": 0,
    +     "selector": "aside.cbd-hero__notice.substance-hero__notice",
    +     "type": "block",
    +   },
    +   Object {
    +     "background": "linear-gradient(135deg, rgba(57, 102, 76, 0.17), rgba(194, 154, 109, 0.07))",
    +     "borderStyle": "solid",
    +     "borderWidth": 1,
    +     "radius": 8,
    +     "selector": "div.cbd-final-summary",
    +     "type": "block",
    +   },
    + ]

      162 |           violations,
      163 |           `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
    > 164 |         ).toEqual([]);
          |           ^
      165 |       }
      166 |     });
      167 |   }
        at /home/runner/work/x/x/tests/visual-standard.spec.js:164:11

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-9e464--imagens-do-contrato-global/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-9e464--imagens-do-contrato-global/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-9e464--imagens-do-contrato-global/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-9e464--imagens-do-contrato-global/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

    Retry #1 ───────────────────────────────────────────────────────────────────────────────────────

    Error: artigos/cbd.html @ 390px
    {
      "violations": [
        {
          "type": "h1-font",
          "actual": "Marcellus, Georgia, serif"
        },
        {
          "type": "block",
          "selector": "aside.cbd-hero__notice.substance-hero__notice",
          "radius": 0,
          "borderStyle": "none",
          "borderWidth": 0,
          "background": "rgba(18, 23, 19, 0.78)"
        },
        {
          "type": "block",
          "selector": "div.cbd-final-summary",
          "radius": 8,
          "borderStyle": "solid",
          "borderWidth": 1,
          "background": "linear-gradient(135deg, rgba(57, 102, 76, 0.17), rgba(194, 154, 109, 0.07))"
        }
      ],
      "contract": {
        "bodyBackground": "rgb(11, 12, 16)",
        "bodyFont": "Spectral, Georgia, serif",
        "h1Font": "Marcellus, Georgia, serif",
        "h2Font": "Marcellus, Georgia, serif",
        "h3Font": "Marcellus, Georgia, serif",
        "h1Color": "rgb(241, 231, 213)",
        "paragraphColor": "rgb(200, 145, 79)",
        "lastStylesheet": "../styles/site-standard.css?v=20260818-1",
        "readingWidth": 736,
        "imageMaxHeight": null,
        "heroImageWidth": null,
        "figures": [],
        "blockViolations": [
          {
            "selector": "aside.cbd-hero__notice.substance-hero__notice",
            "radius": 0,
            "borderStyle": "none",
            "borderWidth": 0,
            "background": "rgba(18, 23, 19, 0.78)"
          },
          {
            "selector": "div.cbd-final-summary",
            "radius": 8,
            "borderStyle": "solid",
            "borderWidth": 1,
            "background": "linear-gradient(135deg, rgba(57, 102, 76, 0.17), rgba(194, 154, 109, 0.07))"
          }
        ]
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  -  1
    + Received  + 22

    - Array []
    + Array [
    +   Object {
    +     "actual": "Marcellus, Georgia, serif",
    +     "type": "h1-font",
    +   },
    +   Object {
    +     "background": "rgba(18, 23, 19, 0.78)",
    +     "borderStyle": "none",
    +     "borderWidth": 0,
    +     "radius": 0,
    +     "selector": "aside.cbd-hero__notice.substance-hero__notice",
    +     "type": "block",
    +   },
    +   Object {
    +     "background": "linear-gradient(135deg, rgba(57, 102, 76, 0.17), rgba(194, 154, 109, 0.07))",
    +     "borderStyle": "solid",
    +     "borderWidth": 1,
    +     "radius": 8,
    +     "selector": "div.cbd-final-summary",
    +     "type": "block",
    +   },
    + ]

      162 |           violations,
      163 |           `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
    > 164 |         ).toEqual([]);
          |           ^
      165 |       }
      166 |     });
      167 |   }
        at /home/runner/work/x/x/tests/visual-standard.spec.js:164:11

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-9e464--imagens-do-contrato-global-retry1/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-9e464--imagens-do-contrato-global-retry1/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-9e464--imagens-do-contrato-global-retry1/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-9e464--imagens-do-contrato-global-retry1/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────


[5/9] tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/deficiencia-intelectual.html usa tipografia, paleta, blocos e imagens do contrato global
[6/9] (retries) tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/deficiencia-intelectual.html usa tipografia, paleta, blocos e imagens do contrato global (retry #1)
  3) tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/deficiencia-intelectual.html usa tipografia, paleta, blocos e imagens do contrato global 

    Error: artigos/deficiencia-intelectual.html @ 390px
    {
      "violations": [
        {
          "type": "h1-font",
          "actual": "Marcellus, Georgia, serif"
        }
      ],
      "contract": {
        "bodyBackground": "rgb(11, 12, 16)",
        "bodyFont": "Spectral, Georgia, serif",
        "h1Font": "Marcellus, Georgia, serif",
        "h2Font": "Marcellus, Georgia, serif",
        "h3Font": "Marcellus, Georgia, serif",
        "h1Color": "rgb(241, 231, 213)",
        "paragraphColor": "rgb(200, 145, 79)",
        "lastStylesheet": "../src/styles/site-standard.css?v=20260818-1",
        "readingWidth": 736,
        "imageMaxHeight": 416,
        "heroImageWidth": 288,
        "figures": [],
        "blockViolations": []
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 6

    - Array []
    + Array [
    +   Object {
    +     "actual": "Marcellus, Georgia, serif",
    +     "type": "h1-font",
    +   },
    + ]

      162 |           violations,
      163 |           `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
    > 164 |         ).toEqual([]);
          |           ^
      165 |       }
      166 |     });
      167 |   }
        at /home/runner/work/x/x/tests/visual-standard.spec.js:164:11

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-5823b--imagens-do-contrato-global/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-5823b--imagens-do-contrato-global/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-5823b--imagens-do-contrato-global/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-5823b--imagens-do-contrato-global/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

    Retry #1 ───────────────────────────────────────────────────────────────────────────────────────

    Error: artigos/deficiencia-intelectual.html @ 390px
    {
      "violations": [
        {
          "type": "h1-font",
          "actual": "Marcellus, Georgia, serif"
        }
      ],
      "contract": {
        "bodyBackground": "rgb(11, 12, 16)",
        "bodyFont": "Spectral, Georgia, serif",
        "h1Font": "Marcellus, Georgia, serif",
        "h2Font": "Marcellus, Georgia, serif",
        "h3Font": "Marcellus, Georgia, serif",
        "h1Color": "rgb(241, 231, 213)",
        "paragraphColor": "rgb(200, 145, 79)",
        "lastStylesheet": "../src/styles/site-standard.css?v=20260818-1",
        "readingWidth": 736,
        "imageMaxHeight": 416,
        "heroImageWidth": 288,
        "figures": [],
        "blockViolations": []
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 6

    - Array []
    + Array [
    +   Object {
    +     "actual": "Marcellus, Georgia, serif",
    +     "type": "h1-font",
    +   },
    + ]

      162 |           violations,
      163 |           `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
    > 164 |         ).toEqual([]);
          |           ^
      165 |       }
      166 |     });
      167 |   }
        at /home/runner/work/x/x/tests/visual-standard.spec.js:164:11

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-5823b--imagens-do-contrato-global-retry1/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-5823b--imagens-do-contrato-global-retry1/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-5823b--imagens-do-contrato-global-retry1/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-5823b--imagens-do-contrato-global-retry1/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────


[7/9] tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/dmt.html usa tipografia, paleta, blocos e imagens do contrato global
[8/9] (retries) tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/dmt.html usa tipografia, paleta, blocos e imagens do contrato global (retry #1)
  4) tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/dmt.html usa tipografia, paleta, blocos e imagens do contrato global 

    Error: artigos/dmt.html @ 390px
    {
      "violations": [
        {
          "type": "block",
          "selector": "aside.dmt-hero__notice.substance-hero__notice",
          "radius": 0,
          "borderStyle": "none",
          "borderWidth": 0,
          "background": "color(srgb 0.839216 0.666667 0.411765 / 0.08)"
        }
      ],
      "contract": {
        "bodyBackground": "rgb(11, 12, 16)",
        "bodyFont": "Spectral, Georgia, serif",
        "h1Font": "\"Cinzel Decorative\", Georgia, serif",
        "h2Font": "Marcellus, Georgia, serif",
        "h3Font": "Marcellus, Georgia, serif",
        "h1Color": "rgb(241, 231, 213)",
        "paragraphColor": "rgb(200, 145, 79)",
        "lastStylesheet": "../styles/site-standard.css?v=20260818-1",
        "readingWidth": 736,
        "imageMaxHeight": null,
        "heroImageWidth": null,
        "figures": [],
        "blockViolations": [
          {
            "selector": "aside.dmt-hero__notice.substance-hero__notice",
            "radius": 0,
            "borderStyle": "none",
            "borderWidth": 0,
            "background": "color(srgb 0.839216 0.666667 0.411765 / 0.08)"
          }
        ]
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  -  1
    + Received  + 10

    - Array []
    + Array [
    +   Object {
    +     "background": "color(srgb 0.839216 0.666667 0.411765 / 0.08)",
    +     "borderStyle": "none",
    +     "borderWidth": 0,
    +     "radius": 0,
    +     "selector": "aside.dmt-hero__notice.substance-hero__notice",
    +     "type": "block",
    +   },
    + ]

      162 |           violations,
      163 |           `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
    > 164 |         ).toEqual([]);
          |           ^
      165 |       }
      166 |     });
      167 |   }
        at /home/runner/work/x/x/tests/visual-standard.spec.js:164:11

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-ecdf4--imagens-do-contrato-global/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-ecdf4--imagens-do-contrato-global/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-ecdf4--imagens-do-contrato-global/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-ecdf4--imagens-do-contrato-global/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

    Retry #1 ───────────────────────────────────────────────────────────────────────────────────────

    Error: artigos/dmt.html @ 390px
    {
      "violations": [
        {
          "type": "block",
          "selector": "aside.dmt-hero__notice.substance-hero__notice",
          "radius": 0,
          "borderStyle": "none",
          "borderWidth": 0,
          "background": "color(srgb 0.839216 0.666667 0.411765 / 0.08)"
        }
      ],
      "contract": {
        "bodyBackground": "rgb(11, 12, 16)",
        "bodyFont": "Spectral, Georgia, serif",
        "h1Font": "\"Cinzel Decorative\", Georgia, serif",
        "h2Font": "Marcellus, Georgia, serif",
        "h3Font": "Marcellus, Georgia, serif",
        "h1Color": "rgb(241, 231, 213)",
        "paragraphColor": "rgb(200, 145, 79)",
        "lastStylesheet": "../styles/site-standard.css?v=20260818-1",
        "readingWidth": 736,
        "imageMaxHeight": null,
        "heroImageWidth": null,
        "figures": [],
        "blockViolations": [
          {
            "selector": "aside.dmt-hero__notice.substance-hero__notice",
            "radius": 0,
            "borderStyle": "none",
            "borderWidth": 0,
            "background": "color(srgb 0.839216 0.666667 0.411765 / 0.08)"
          }
        ]
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  -  1
    + Received  + 10

    - Array []
    + Array [
    +   Object {
    +     "background": "color(srgb 0.839216 0.666667 0.411765 / 0.08)",
    +     "borderStyle": "none",
    +     "borderWidth": 0,
    +     "radius": 0,
    +     "selector": "aside.dmt-hero__notice.substance-hero__notice",
    +     "type": "block",
    +   },
    + ]

      162 |           violations,
      163 |           `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
    > 164 |         ).toEqual([]);
          |           ^
      165 |       }
      166 |     });
      167 |   }
        at /home/runner/work/x/x/tests/visual-standard.spec.js:164:11

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-ecdf4--imagens-do-contrato-global-retry1/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-ecdf4--imagens-do-contrato-global-retry1/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-ecdf4--imagens-do-contrato-global-retry1/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-ecdf4--imagens-do-contrato-global-retry1/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────


[9/9] tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/lsd.html usa tipografia, paleta, blocos e imagens do contrato global
[10/9] (retries) tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/lsd.html usa tipografia, paleta, blocos e imagens do contrato global (retry #1)
  5) tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/lsd.html usa tipografia, paleta, blocos e imagens do contrato global 

    Error: artigos/lsd.html @ 390px
    {
      "violations": [
        {
          "type": "block",
          "selector": "aside.lsd-hero__notice.substance-hero__notice",
          "radius": 0,
          "borderStyle": "none",
          "borderWidth": 0,
          "background": "rgba(207, 179, 119, 0.07)"
        }
      ],
      "contract": {
        "bodyBackground": "rgb(11, 12, 16)",
        "bodyFont": "Spectral, Georgia, serif",
        "h1Font": "\"Cinzel Decorative\", Georgia, serif",
        "h2Font": "Marcellus, Georgia, serif",
        "h3Font": "Marcellus, Georgia, serif",
        "h1Color": "rgb(241, 231, 213)",
        "paragraphColor": "rgb(200, 145, 79)",
        "lastStylesheet": "../styles/site-standard.css?v=20260818-1",
        "readingWidth": 736,
        "imageMaxHeight": null,
        "heroImageWidth": null,
        "figures": [],
        "blockViolations": [
          {
            "selector": "aside.lsd-hero__notice.substance-hero__notice",
            "radius": 0,
            "borderStyle": "none",
            "borderWidth": 0,
            "background": "rgba(207, 179, 119, 0.07)"
          }
        ]
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  -  1
    + Received  + 10

    - Array []
    + Array [
    +   Object {
    +     "background": "rgba(207, 179, 119, 0.07)",
    +     "borderStyle": "none",
    +     "borderWidth": 0,
    +     "radius": 0,
    +     "selector": "aside.lsd-hero__notice.substance-hero__notice",
    +     "type": "block",
    +   },
    + ]

      162 |           violations,
      163 |           `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
    > 164 |         ).toEqual([]);
          |           ^
      165 |       }
      166 |     });
      167 |   }
        at /home/runner/work/x/x/tests/visual-standard.spec.js:164:11

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-21614--imagens-do-contrato-global/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-21614--imagens-do-contrato-global/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-21614--imagens-do-contrato-global/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-21614--imagens-do-contrato-global/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

    Retry #1 ───────────────────────────────────────────────────────────────────────────────────────

    Error: artigos/lsd.html @ 390px
    {
      "violations": [
        {
          "type": "block",
          "selector": "aside.lsd-hero__notice.substance-hero__notice",
          "radius": 0,
          "borderStyle": "none",
          "borderWidth": 0,
          "background": "rgba(207, 179, 119, 0.07)"
        }
      ],
      "contract": {
        "bodyBackground": "rgb(11, 12, 16)",
        "bodyFont": "Spectral, Georgia, serif",
        "h1Font": "\"Cinzel Decorative\", Georgia, serif",
        "h2Font": "Marcellus, Georgia, serif",
        "h3Font": "Marcellus, Georgia, serif",
        "h1Color": "rgb(241, 231, 213)",
        "paragraphColor": "rgb(200, 145, 79)",
        "lastStylesheet": "../styles/site-standard.css?v=20260818-1",
        "readingWidth": 736,
        "imageMaxHeight": null,
        "heroImageWidth": null,
        "figures": [],
        "blockViolations": [
          {
            "selector": "aside.lsd-hero__notice.substance-hero__notice",
            "radius": 0,
            "borderStyle": "none",
            "borderWidth": 0,
            "background": "rgba(207, 179, 119, 0.07)"
          }
        ]
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  -  1
    + Received  + 10

    - Array []
    + Array [
    +   Object {
    +     "background": "rgba(207, 179, 119, 0.07)",
    +     "borderStyle": "none",
    +     "borderWidth": 0,
    +     "radius": 0,
    +     "selector": "aside.lsd-hero__notice.substance-hero__notice",
    +     "type": "block",
    +   },
    + ]

      162 |           violations,
      163 |           `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
    > 164 |         ).toEqual([]);
          |           ^
      165 |       }
      166 |     });
      167 |   }
        at /home/runner/work/x/x/tests/visual-standard.spec.js:164:11

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-21614--imagens-do-contrato-global-retry1/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-21614--imagens-do-contrato-global-retry1/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-21614--imagens-do-contrato-global-retry1/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-21614--imagens-do-contrato-global-retry1/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────


[11/9] tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/sindrome-de-down.html usa tipografia, paleta, blocos e imagens do contrato global
[12/9] (retries) tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/sindrome-de-down.html usa tipografia, paleta, blocos e imagens do contrato global (retry #1)
  6) tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/sindrome-de-down.html usa tipografia, paleta, blocos e imagens do contrato global 

    Error: artigos/sindrome-de-down.html @ 390px
    {
      "violations": [
        {
          "type": "h1-font",
          "actual": "Marcellus, Georgia, serif"
        }
      ],
      "contract": {
        "bodyBackground": "rgb(11, 12, 16)",
        "bodyFont": "Spectral, Georgia, serif",
        "h1Font": "Marcellus, Georgia, serif",
        "h2Font": "Marcellus, Georgia, serif",
        "h3Font": "Marcellus, Georgia, serif",
        "h1Color": "rgb(241, 231, 213)",
        "paragraphColor": "rgb(200, 145, 79)",
        "lastStylesheet": "../src/styles/site-standard.css?v=20260818-1",
        "readingWidth": 736,
        "imageMaxHeight": 416,
        "heroImageWidth": 288,
        "figures": [
          {
            "className": "down-hero__visual",
            "ancestorClassName": "down-hero",
            "width": 288,
            "imageHeight": 348.6,
            "heroLike": true
          }
        ],
        "blockViolations": []
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 6

    - Array []
    + Array [
    +   Object {
    +     "actual": "Marcellus, Georgia, serif",
    +     "type": "h1-font",
    +   },
    + ]

      162 |           violations,
      163 |           `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
    > 164 |         ).toEqual([]);
          |           ^
      165 |       }
      166 |     });
      167 |   }
        at /home/runner/work/x/x/tests/visual-standard.spec.js:164:11

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-80e6b--imagens-do-contrato-global/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-80e6b--imagens-do-contrato-global/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-80e6b--imagens-do-contrato-global/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-80e6b--imagens-do-contrato-global/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

    Retry #1 ───────────────────────────────────────────────────────────────────────────────────────

    Error: artigos/sindrome-de-down.html @ 390px
    {
      "violations": [
        {
          "type": "h1-font",
          "actual": "Marcellus, Georgia, serif"
        }
      ],
      "contract": {
        "bodyBackground": "rgb(11, 12, 16)",
        "bodyFont": "Spectral, Georgia, serif",
        "h1Font": "Marcellus, Georgia, serif",
        "h2Font": "Marcellus, Georgia, serif",
        "h3Font": "Marcellus, Georgia, serif",
        "h1Color": "rgb(241, 231, 213)",
        "paragraphColor": "rgb(200, 145, 79)",
        "lastStylesheet": "../src/styles/site-standard.css?v=20260818-1",
        "readingWidth": 736,
        "imageMaxHeight": 416,
        "heroImageWidth": 288,
        "figures": [
          {
            "className": "down-hero__visual",
            "ancestorClassName": "down-hero",
            "width": 288,
            "imageHeight": 348.6,
            "heroLike": true
          }
        ],
        "blockViolations": []
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 6

    - Array []
    + Array [
    +   Object {
    +     "actual": "Marcellus, Georgia, serif",
    +     "type": "h1-font",
    +   },
    + ]

      162 |           violations,
      163 |           `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
    > 164 |         ).toEqual([]);
          |           ^
      165 |       }
      166 |     });
      167 |   }
        at /home/runner/work/x/x/tests/visual-standard.spec.js:164:11

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-80e6b--imagens-do-contrato-global-retry1/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-80e6b--imagens-do-contrato-global-retry1/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-80e6b--imagens-do-contrato-global-retry1/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-80e6b--imagens-do-contrato-global-retry1/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────


[13/9] tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/terapia-cognitivo-comportamental.html usa tipografia, paleta, blocos e imagens do contrato global
[14/9] (retries) tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/terapia-cognitivo-comportamental.html usa tipografia, paleta, blocos e imagens do contrato global (retry #1)
  7) tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/terapia-cognitivo-comportamental.html usa tipografia, paleta, blocos e imagens do contrato global 

    Error: artigos/terapia-cognitivo-comportamental.html @ 390px
    {
      "violations": [
        {
          "type": "h1-font",
          "actual": "Marcellus, Georgia, serif"
        }
      ],
      "contract": {
        "bodyBackground": "rgb(11, 12, 16)",
        "bodyFont": "Spectral, Georgia, serif",
        "h1Font": "Marcellus, Georgia, serif",
        "h2Font": "Marcellus, Georgia, serif",
        "h3Font": "Marcellus, Georgia, serif",
        "h1Color": "rgb(241, 231, 213)",
        "paragraphColor": "rgb(200, 145, 79)",
        "lastStylesheet": "../src/styles/site-standard.css?v=20260818-1",
        "readingWidth": 736,
        "imageMaxHeight": 416,
        "heroImageWidth": 288,
        "figures": [
          {
            "className": "tcc-hero__visual",
            "ancestorClassName": "tcc-hero",
            "width": 288,
            "imageHeight": 341,
            "heroLike": true
          }
        ],
        "blockViolations": []
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 6

    - Array []
    + Array [
    +   Object {
    +     "actual": "Marcellus, Georgia, serif",
    +     "type": "h1-font",
    +   },
    + ]

      162 |           violations,
      163 |           `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
    > 164 |         ).toEqual([]);
          |           ^
      165 |       }
      166 |     });
      167 |   }
        at /home/runner/work/x/x/tests/visual-standard.spec.js:164:11

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-a00e8--imagens-do-contrato-global/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-a00e8--imagens-do-contrato-global/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-a00e8--imagens-do-contrato-global/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-a00e8--imagens-do-contrato-global/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

    Retry #1 ───────────────────────────────────────────────────────────────────────────────────────

    Error: artigos/terapia-cognitivo-comportamental.html @ 390px
    {
      "violations": [
        {
          "type": "h1-font",
          "actual": "Marcellus, Georgia, serif"
        }
      ],
      "contract": {
        "bodyBackground": "rgb(11, 12, 16)",
        "bodyFont": "Spectral, Georgia, serif",
        "h1Font": "Marcellus, Georgia, serif",
        "h2Font": "Marcellus, Georgia, serif",
        "h3Font": "Marcellus, Georgia, serif",
        "h1Color": "rgb(241, 231, 213)",
        "paragraphColor": "rgb(200, 145, 79)",
        "lastStylesheet": "../src/styles/site-standard.css?v=20260818-1",
        "readingWidth": 736,
        "imageMaxHeight": 416,
        "heroImageWidth": 288,
        "figures": [
          {
            "className": "tcc-hero__visual",
            "ancestorClassName": "tcc-hero",
            "width": 288,
            "imageHeight": 341,
            "heroLike": true
          }
        ],
        "blockViolations": []
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 6

    - Array []
    + Array [
    +   Object {
    +     "actual": "Marcellus, Georgia, serif",
    +     "type": "h1-font",
    +   },
    + ]

      162 |           violations,
      163 |           `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
    > 164 |         ).toEqual([]);
          |           ^
      165 |       }
      166 |     });
      167 |   }
        at /home/runner/work/x/x/tests/visual-standard.spec.js:164:11

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-a00e8--imagens-do-contrato-global-retry1/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-a00e8--imagens-do-contrato-global-retry1/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-a00e8--imagens-do-contrato-global-retry1/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-a00e8--imagens-do-contrato-global-retry1/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────


[15/9] tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/toc.html usa tipografia, paleta, blocos e imagens do contrato global
[16/9] (retries) tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/toc.html usa tipografia, paleta, blocos e imagens do contrato global (retry #1)
  8) tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/toc.html usa tipografia, paleta, blocos e imagens do contrato global 

    Error: artigos/toc.html @ 390px
    {
      "violations": [
        {
          "type": "h1-font",
          "actual": "Marcellus, Georgia, serif"
        }
      ],
      "contract": {
        "bodyBackground": "rgb(11, 12, 16)",
        "bodyFont": "Spectral, Georgia, serif",
        "h1Font": "Marcellus, Georgia, serif",
        "h2Font": "Marcellus, Georgia, serif",
        "h3Font": "Marcellus, Georgia, serif",
        "h1Color": "rgb(241, 231, 213)",
        "paragraphColor": "rgb(200, 145, 79)",
        "lastStylesheet": "../src/styles/site-standard.css?v=20260818-1",
        "readingWidth": 736,
        "imageMaxHeight": 416,
        "heroImageWidth": 288,
        "figures": [
          {
            "className": "ocd-hero__visual",
            "ancestorClassName": "ocd-hero",
            "width": 288,
            "imageHeight": 363.8,
            "heroLike": true
          }
        ],
        "blockViolations": []
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 6

    - Array []
    + Array [
    +   Object {
    +     "actual": "Marcellus, Georgia, serif",
    +     "type": "h1-font",
    +   },
    + ]

      162 |           violations,
      163 |           `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
    > 164 |         ).toEqual([]);
          |           ^
      165 |       }
      166 |     });
      167 |   }
        at /home/runner/work/x/x/tests/visual-standard.spec.js:164:11

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-a951a--imagens-do-contrato-global/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-a951a--imagens-do-contrato-global/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-a951a--imagens-do-contrato-global/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-a951a--imagens-do-contrato-global/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

    Retry #1 ───────────────────────────────────────────────────────────────────────────────────────

    Error: artigos/toc.html @ 390px
    {
      "violations": [
        {
          "type": "h1-font",
          "actual": "Marcellus, Georgia, serif"
        }
      ],
      "contract": {
        "bodyBackground": "rgb(11, 12, 16)",
        "bodyFont": "Spectral, Georgia, serif",
        "h1Font": "Marcellus, Georgia, serif",
        "h2Font": "Marcellus, Georgia, serif",
        "h3Font": "Marcellus, Georgia, serif",
        "h1Color": "rgb(241, 231, 213)",
        "paragraphColor": "rgb(200, 145, 79)",
        "lastStylesheet": "../src/styles/site-standard.css?v=20260818-1",
        "readingWidth": 736,
        "imageMaxHeight": 416,
        "heroImageWidth": 288,
        "figures": [
          {
            "className": "ocd-hero__visual",
            "ancestorClassName": "ocd-hero",
            "width": 288,
            "imageHeight": 363.8,
            "heroLike": true
          }
        ],
        "blockViolations": []
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 6

    - Array []
    + Array [
    +   Object {
    +     "actual": "Marcellus, Georgia, serif",
    +     "type": "h1-font",
    +   },
    + ]

      162 |           violations,
      163 |           `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
    > 164 |         ).toEqual([]);
          |           ^
      165 |       }
      166 |     });
      167 |   }
        at /home/runner/work/x/x/tests/visual-standard.spec.js:164:11

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-a951a--imagens-do-contrato-global-retry1/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-a951a--imagens-do-contrato-global-retry1/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-a951a--imagens-do-contrato-global-retry1/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-a951a--imagens-do-contrato-global-retry1/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────


[17/9] tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/vibracoes-estados-vibracionais.html usa tipografia, paleta, blocos e imagens do contrato global
[18/9] (retries) tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/vibracoes-estados-vibracionais.html usa tipografia, paleta, blocos e imagens do contrato global (retry #1)
  9) tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/vibracoes-estados-vibracionais.html usa tipografia, paleta, blocos e imagens do contrato global 

    Error: artigos/vibracoes-estados-vibracionais.html @ 390px
    {
      "violations": [
        {
          "type": "h1-font",
          "actual": "Marcellus, Georgia, serif"
        }
      ],
      "contract": {
        "bodyBackground": "rgb(11, 12, 16)",
        "bodyFont": "Spectral, Georgia, serif",
        "h1Font": "Marcellus, Georgia, serif",
        "h2Font": "Marcellus, Georgia, serif",
        "h3Font": "Marcellus, Georgia, serif",
        "h1Color": "rgb(241, 231, 213)",
        "paragraphColor": "rgb(200, 145, 79)",
        "lastStylesheet": "../src/styles/site-standard.css?v=20260818-1",
        "readingWidth": 736,
        "imageMaxHeight": 416,
        "heroImageWidth": 288,
        "figures": [],
        "blockViolations": []
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 6

    - Array []
    + Array [
    +   Object {
    +     "actual": "Marcellus, Georgia, serif",
    +     "type": "h1-font",
    +   },
    + ]

      162 |           violations,
      163 |           `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
    > 164 |         ).toEqual([]);
          |           ^
      165 |       }
      166 |     });
      167 |   }
        at /home/runner/work/x/x/tests/visual-standard.spec.js:164:11

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-1b3ea--imagens-do-contrato-global/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-1b3ea--imagens-do-contrato-global/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-1b3ea--imagens-do-contrato-global/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-1b3ea--imagens-do-contrato-global/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────

    Retry #1 ───────────────────────────────────────────────────────────────────────────────────────

    Error: artigos/vibracoes-estados-vibracionais.html @ 390px
    {
      "violations": [
        {
          "type": "h1-font",
          "actual": "Marcellus, Georgia, serif"
        }
      ],
      "contract": {
        "bodyBackground": "rgb(11, 12, 16)",
        "bodyFont": "Spectral, Georgia, serif",
        "h1Font": "Marcellus, Georgia, serif",
        "h2Font": "Marcellus, Georgia, serif",
        "h3Font": "Marcellus, Georgia, serif",
        "h1Color": "rgb(241, 231, 213)",
        "paragraphColor": "rgb(200, 145, 79)",
        "lastStylesheet": "../src/styles/site-standard.css?v=20260818-1",
        "readingWidth": 736,
        "imageMaxHeight": 416,
        "heroImageWidth": 288,
        "figures": [],
        "blockViolations": []
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  - 1
    + Received  + 6

    - Array []
    + Array [
    +   Object {
    +     "actual": "Marcellus, Georgia, serif",
    +     "type": "h1-font",
    +   },
    + ]

      162 |           violations,
      163 |           `${route} @ ${width}px\n${JSON.stringify({ violations, contract }, null, 2)}`,
    > 164 |         ).toEqual([]);
          |           ^
      165 |       }
      166 |     });
      167 |   }
        at /home/runner/work/x/x/tests/visual-standard.spec.js:164:11

    attachment #1: screenshot (image/png) ──────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-1b3ea--imagens-do-contrato-global-retry1/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-1b3ea--imagens-do-contrato-global-retry1/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-1b3ea--imagens-do-contrato-global-retry1/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-1b3ea--imagens-do-contrato-global-retry1/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────


  9 failed
    tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/borderline.html usa tipografia, paleta, blocos e imagens do contrato global 
    tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/cbd.html usa tipografia, paleta, blocos e imagens do contrato global 
    tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/deficiencia-intelectual.html usa tipografia, paleta, blocos e imagens do contrato global 
    tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/dmt.html usa tipografia, paleta, blocos e imagens do contrato global 
    tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/lsd.html usa tipografia, paleta, blocos e imagens do contrato global 
    tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/sindrome-de-down.html usa tipografia, paleta, blocos e imagens do contrato global 
    tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/terapia-cognitivo-comportamental.html usa tipografia, paleta, blocos e imagens do contrato global 
    tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/toc.html usa tipografia, paleta, blocos e imagens do contrato global 
    tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › artigos/vibracoes-estados-vibracionais.html usa tipografia, paleta, blocos e imagens do contrato global 
```
