# Home visual standard — full validation

Result: **PASS**

Commit tested: `05fbea5f766fdbe13835373e5443228c1ab5858b`

Validation: source visual contract, build, design system, structured data, full site regression and full visual-standard matrix.

```text
            "borderStyle": "none",
            "borderWidth": 0,
            "background": "rgba(0, 0, 0, 0)"
          },
          {
            "selector": "section.definition-card",
            "radius": 0,
            "borderStyle": "none",
            "borderWidth": 0,
            "background": "rgba(0, 0, 0, 0)"
          },
          {
            "selector": "section.definition-card",
            "radius": 0,
            "borderStyle": "none",
            "borderWidth": 0,
            "background": "rgba(0, 0, 0, 0)"
          },
          {
            "selector": "article.definition-card",
            "radius": 0,
            "borderStyle": "none",
            "borderWidth": 0,
            "background": "rgba(0, 0, 0, 0)"
          },
          {
            "selector": "article.definition-card",
            "radius": 0,
            "borderStyle": "none",
            "borderWidth": 0,
            "background": "rgba(0, 0, 0, 0)"
          }
        ]
      }
    }

    expect(received).toEqual(expected) // deep equality

    - Expected  -  1
    + Received  + 58

    - Array []
    + Array [
    +   Object {
    +     "background": "rgba(0, 0, 0, 0)",
    +     "borderStyle": "none",
    +     "borderWidth": 0,
    +     "radius": 0,
    +     "selector": "section.definition-card",
    +     "type": "block",
    +   },
    +   Object {
    +     "background": "rgba(0, 0, 0, 0)",
    +     "borderStyle": "none",
    +     "borderWidth": 0,
    +     "radius": 0,
    +     "selector": "section.definition-card",
    +     "type": "block",
    +   },
    +   Object {
    +     "background": "rgba(0, 0, 0, 0)",
    +     "borderStyle": "none",
    +     "borderWidth": 0,
    +     "radius": 0,
    +     "selector": "section.definition-card",
    +     "type": "block",
    +   },
    +   Object {
    +     "background": "rgba(0, 0, 0, 0)",
    +     "borderStyle": "none",
    +     "borderWidth": 0,
    +     "radius": 0,
    +     "selector": "section.definition-card",
    +     "type": "block",
    +   },
    +   Object {
    +     "background": "rgba(0, 0, 0, 0)",
    +     "borderStyle": "none",
    +     "borderWidth": 0,
    +     "radius": 0,
    +     "selector": "section.definition-card",
    +     "type": "block",
    +   },
    +   Object {
    +     "background": "rgba(0, 0, 0, 0)",
    +     "borderStyle": "none",
    +     "borderWidth": 0,
    +     "radius": 0,
    +     "selector": "article.definition-card",
    +     "type": "block",
    +   },
    +   Object {
    +     "background": "rgba(0, 0, 0, 0)",
    +     "borderStyle": "none",
    +     "borderWidth": 0,
    +     "radius": 0,
    +     "selector": "article.definition-card",
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
    test-results/visual-standard-padrão-vis-6d162--imagens-do-contrato-global/test-failed-1.png
    ────────────────────────────────────────────────────────────────────────────────────────────────

    Error Context: test-results/visual-standard-padrão-vis-6d162--imagens-do-contrato-global/error-context.md

    attachment #3: trace (application/zip) ─────────────────────────────────────────────────────────
    test-results/visual-standard-padrão-vis-6d162--imagens-do-contrato-global/trace.zip
    Usage:

        npx playwright show-trace test-results/visual-standard-padrão-vis-6d162--imagens-do-contrato-global/trace.zip

    ────────────────────────────────────────────────────────────────────────────────────────────────


[213/301] tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › privacidade.html usa tipografia, paleta, blocos e imagens do contrato global
[214/301] tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › tags.html usa tipografia, paleta, blocos e imagens do contrato global
[215/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/borderline.html respeita viewport e eixos globais
[216/301] tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › trilhas.html usa tipografia, paleta, blocos e imagens do contrato global
[217/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/budismo.html respeita viewport e eixos globais
[218/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/burnout.html respeita viewport e eixos globais
[219/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/candomble.html respeita viewport e eixos globais
[220/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/cannabis-indica.html respeita viewport e eixos globais
[221/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/cannabis-sativa.html respeita viewport e eixos globais
[222/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/carl-gustav-jung.html respeita viewport e eixos globais
[223/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/cbd.html respeita viewport e eixos globais
[224/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/chakras.html respeita viewport e eixos globais
[225/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/changa.html respeita viewport e eixos globais
[226/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/cristianismo.html respeita viewport e eixos globais
[227/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/deficiencia-intelectual.html respeita viewport e eixos globais
[228/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/depressao.html respeita viewport e eixos globais
[229/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/discalculia.html respeita viewport e eixos globais
[230/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/dislexia.html respeita viewport e eixos globais
[231/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/dispraxia.html respeita viewport e eixos globais
[232/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/dmt.html respeita viewport e eixos globais
[233/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/espiritismo.html respeita viewport e eixos globais
[234/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/espiritualidade-andina.html respeita viewport e eixos globais
[235/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/espiritualidade-maia.html respeita viewport e eixos globais
[236/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/esquizofrenia.html respeita viewport e eixos globais
[237/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/estoicismo.html respeita viewport e eixos globais
[238/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/feng-shui.html respeita viewport e eixos globais
[239/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/fitoterapia.html respeita viewport e eixos globais
[240/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/fobia-social.html respeita viewport e eixos globais
[241/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/gnosticismo.html respeita viewport e eixos globais
[242/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/hermetismo.html respeita viewport e eixos globais
[243/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/hidroterapia.html respeita viewport e eixos globais
[244/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/hinduismo.html respeita viewport e eixos globais
[245/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/homeopatia.html respeita viewport e eixos globais
[246/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/hoodoo.html respeita viewport e eixos globais
[247/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/isla.html respeita viewport e eixos globais
[248/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/judaismo.html respeita viewport e eixos globais
[249/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/litoterapia.html respeita viewport e eixos globais
[250/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/lsd.html respeita viewport e eixos globais
[251/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/massagem-pedras-quentes.html respeita viewport e eixos globais
[252/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/mitologia-yanomami.html respeita viewport e eixos globais
[253/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/mitologias-tupi-guarani.html respeita viewport e eixos globais
[254/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/moxaterapia.html respeita viewport e eixos globais
[255/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/nikola-tesla.html respeita viewport e eixos globais
[256/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/numerologia.html respeita viewport e eixos globais
[257/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/paganismo-celta-druidismo.html respeita viewport e eixos globais
[258/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/paganismo-eslavo.html respeita viewport e eixos globais
[259/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/paganismo-germanico.html respeita viewport e eixos globais
[260/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/paganismo-nordico.html respeita viewport e eixos globais
[261/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/paganismo.html respeita viewport e eixos globais
[262/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/platao.html respeita viewport e eixos globais
[263/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/povos-ciganos.html respeita viewport e eixos globais
[264/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/psicopatia.html respeita viewport e eixos globais
[265/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/psicose.html respeita viewport e eixos globais
[266/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/psilocibina.html respeita viewport e eixos globais
[267/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/quimbanda.html respeita viewport e eixos globais
[268/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/quiropraxia.html respeita viewport e eixos globais
[269/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/reiki.html respeita viewport e eixos globais
[270/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/religiao-greco-romana.html respeita viewport e eixos globais
[271/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/religiao-tradicional-ioruba.html respeita viewport e eixos globais
[272/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/santa-muerte.html respeita viewport e eixos globais
[273/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/santeria.html respeita viewport e eixos globais
[274/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/sigmund-freud.html respeita viewport e eixos globais
[275/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/sindrome-de-down.html respeita viewport e eixos globais
[276/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/tdah.html respeita viewport e eixos globais
[277/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/teosofia.html respeita viewport e eixos globais
[278/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/terapia-cognitivo-comportamental.html respeita viewport e eixos globais
[279/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/thelema.html respeita viewport e eixos globais
[280/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/toc.html respeita viewport e eixos globais
[281/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/tourette.html respeita viewport e eixos globais
[282/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/transtorno-bipolar.html respeita viewport e eixos globais
[283/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/transtorno-opositivo-desafiador.html respeita viewport e eixos globais
[284/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/umbanda.html respeita viewport e eixos globais
[285/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/vibracoes-estados-vibracionais.html respeita viewport e eixos globais
[286/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/vodou.html respeita viewport e eixos globais
[287/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/wicca.html respeita viewport e eixos globais
[288/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/xamanismo.html respeita viewport e eixos globais
[289/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/yoga.html respeita viewport e eixos globais
[290/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › assuntos/ciencia-tecnologia-sociedade.html respeita viewport e eixos globais
[291/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › assuntos/filosofias-esoterismo.html respeita viewport e eixos globais
[292/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › assuntos/neurodiversidade.html respeita viewport e eixos globais
[293/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › assuntos/psicologia.html respeita viewport e eixos globais
[294/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › assuntos/religioes-espiritualidade.html respeita viewport e eixos globais
[295/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › assuntos/saude-reabilitacao.html respeita viewport e eixos globais
[296/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › assuntos/substancias-farmacologia-consciencia.html respeita viewport e eixos globais
[297/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › busca.html respeita viewport e eixos globais
[298/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › evidencias.html respeita viewport e eixos globais
[299/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › glossario.html respeita viewport e eixos globais
[300/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › metodologia.html respeita viewport e eixos globais
[301/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › privacidade.html respeita viewport e eixos globais
[302/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › tags.html respeita viewport e eixos globais
[303/301] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › trilhas.html respeita viewport e eixos globais
  2 flaky
    tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › assuntos/ciencia-tecnologia-sociedade.html usa tipografia, paleta, blocos e imagens do contrato global 
    tests/visual-standard.spec.js:150:5 › padrão visual da página inicial — todas as rotas › metodologia.html usa tipografia, paleta, blocos e imagens do contrato global 
  299 passed (4.1m)
```
