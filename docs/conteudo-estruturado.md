# Conteúdo estruturado — piloto DMT

**Estado:** piloto ativo desde 2026-08-11.

O artigo `DMT` é o primeiro conteúdo do Let Flow 369 cuja fonte editorial deixa de ser o HTML final. A fonte de verdade passa a ser:

```text
content/artigos/dmt.json
```

O fluxo é:

```text
content/artigos/dmt.json
        ↓
scripts/lib/structured-article.mjs
        +
src/templates/substance-article.html
        +
Design System v1
        ↓
artigos/dmt.html (artefato sincronizado)
        ↓
scripts/build-site.mjs
        ↓
dist/artigos/dmt.html
```

## Objetivo

Separar progressivamente:

- conteúdo editorial;
- metadados e datas;
- estrutura de navegação;
- layout e componentes;
- HTML final de publicação.

Isso prepara o projeto para um CMS sem permitir que o editor de conteúdo altere diretamente header, footer, CSS ou a arquitetura global.

## Modelo `substance-dossier-v1`

O arquivo JSON organiza:

- metadados SEO/Open Graph/Twitter;
- dados estruturados `Article`;
- breadcrumbs;
- hero;
- índice interno;
- seções na ordem editorial;
- footer do artigo;
- scripts específicos.

Nesta primeira migração, o conteúdo interno de cada seção ainda é preservado em `innerHtml`. Essa escolha mantém fidelidade visual e editorial durante a transição. A etapa seguinte transformará os padrões recorrentes em blocos tipados como `timeline`, `evidence-grid`, `risk`, `faq` e `references` antes da integração do CMS.

O contrato documental está em:

```text
content/schema/substance-dossier-v1.schema.json
```

## Comandos

Sincronizar os HTML derivados:

```bash
npm run sync:structured
```

Auditar se o HTML derivado corresponde ao JSON:

```bash
npm run audit:structured-content
```

Gerar o site publicado:

```bash
npm run build
```

O build descobre automaticamente todos os arquivos `content/artigos/*.json`. Portanto, LSD e CBD podem ser adicionados ao mesmo fluxo sem alteração manual da lista de artigos no build.

## Regra editorial

Para artigos migrados, **o JSON é a fonte de verdade**. Mudanças editoriais não devem ser feitas apenas no HTML derivado, pois `npm run sync:structured` o sobrescreverá.
