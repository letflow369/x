# Let Flow 369 — Layout Contract

## Objetivo

Manter todas as páginas alinhadas à geometria da página principal sem eliminar direção artística própria de cada tema.

A padronização é geométrica e comportamental, não composicional.

## Fonte única de verdade

Os limites globais vivem em `src/styles/tokens.css`:

```css
--content-width: 72rem;
--reading-width: 46rem;
--content-gutter: 2rem;
--content-gutter-compact: 1.35rem;
--article-sidebar-width: 15rem;
```

Não criar novos limites máximos de página como `1180px`, `1200px`, `1220px`, `1280px` ou `1380px` em CSS temático.

## Primitivas

`src/styles/base.css` fornece:

- `.layout-boundary`: conteúdo geral alinhado ao grid principal;
- `.reading-boundary`: conteúdo de leitura longa;
- `.editorial-layout`: artigo com coluna lateral e conteúdo flexível.

Componentes internos de grid devem preferir `minmax(0, 1fr)` e descendentes de grids complexos devem permitir encolhimento com `min-width: 0` quando necessário.

## Full-bleed

Fundos, imagens e tratamentos visuais podem ocupar toda a largura do viewport. O conteúdo textual/interativo interno deve continuar alinhado ao `--content-width`, salvo componente deliberadamente documentado como exceção.

Não usar `overflow: clip`, `overflow-x: hidden` ou regras equivalentes no root do artigo para esconder problemas de dimensionamento. Corrigir o elemento causador.

Overflow horizontal local é aceitável para componentes que realmente precisam de rolagem, como tabelas extensas, desde que o wrapper declare `overflow-x: auto` ou `scroll`.

## Auditoria automática

`tests/site.spec.js` verifica todas as rotas publicadas no sitemap nos viewports:

- 320 px
- 360 px
- 390 px
- 768 px
- 1024 px
- 1440 px

Para cada combinação rota × viewport, o teste valida:

1. status HTTP 200;
2. ausência de overflow horizontal no documento;
3. diagnóstico dos elementos que ultrapassam o viewport;
4. header, breadcrumbs e footer limitados pelo contrato global.

Wrappers que possuem overflow horizontal local intencional (`overflow-x: auto`/`scroll`) são ignorados como causadores de overflow do documento.

## Regra para páginas autorais

A página pode variar em:

- hero;
- paleta;
- imagens;
- diagramas;
- ritmo de seções;
- componentes específicos;
- tratamentos full-bleed.

A página não deve variar arbitrariamente em:

- largura máxima estrutural;
- gutter principal;
- alinhamento de header/conteúdo/footer;
- regras básicas de encolhimento de grid;
- tratamento de overflow do documento.
