# Sócrates — validação do padrão visual global

Resultado: **PASS**

Commit testado: `049596380665b7fad72de24204f1cfd9690417d1`

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
  1 passed (3.7s)

### npx playwright test tests/site.spec.js --grep artigos/socrates.html --workers=1 --retries=0

Running 2 tests using 1 worker

[1/2] tests/site.spec.js:94:5 › páginas públicas › artigos/socrates.html carrega com estrutura principal
[2/2] tests/site.spec.js:128:5 › contrato geométrico — todas as rotas › artigos/socrates.html respeita viewport e eixos globais
  2 passed (3.4s)

### npx playwright test tests/socrates.spec.js --workers=1 --retries=0

Running 6 tests using 1 worker

[1/6] tests/socrates.spec.js:21:1 › Sócrates carrega a narrativa completa e os marcadores de evidência
[2/6] tests/socrates.spec.js:34:1 › imagens históricas são locais e carregam sem rede externa
[3/6] tests/socrates.spec.js:46:1 › laboratório de justiça conduz afirmação até revisão sem persistência externa
[4/6] tests/socrates.spec.js:67:1 › laboratório aberto examina uma crença e permite reiniciar
[5/6] tests/socrates.spec.js:90:1 › Sócrates não apresenta violações WCAG automaticamente detectáveis
[6/6] tests/socrates.spec.js:98:1 › Sócrates permanece contido no viewport
  6 passed (12.4s)
```
