# Sócrates — limpeza de redundâncias

Resultado: **PASS**

Commit testado: `80b34f280bf931561ec5432d3a5490c60468295a`

## Métricas

```text
  161 src/scripts/socrates-investigation.js
  754 src/styles/socrates.css
  624 src/styles/socrates-sections.css
   96 tests/socrates.spec.js
 1635 total
```

## Validação

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

Running 5 tests using 1 worker

[1/5] tests/socrates.spec.js:21:1 › Sócrates carrega a narrativa completa e os marcadores de evidência
[2/5] tests/socrates.spec.js:34:1 › imagens históricas são locais e carregam sem rede externa
[3/5] tests/socrates.spec.js:46:1 › laboratório de justiça conduz afirmação até revisão sem persistência externa
[4/5] tests/socrates.spec.js:67:1 › laboratório aberto examina uma crença e permite reiniciar
[5/5] tests/socrates.spec.js:90:1 › Sócrates não apresenta violações WCAG automaticamente detectáveis
  5 passed (11.3s)
```
