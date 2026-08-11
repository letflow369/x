# Conteúdo estruturado — pilotos DMT, LSD e CBD

**Estado:** três pilotos ativos desde 2026-08-11.

Os artigos `DMT`, `LSD` e `CBD` são os primeiros conteúdos do Let Flow 369 cuja fonte editorial deixa de ser o HTML final. As fontes de verdade passam a ser:

```text
content/artigos/dmt.json
content/artigos/lsd.json
content/artigos/cbd.json
```

O fluxo é:

```text
content/artigos/*.json
        ↓
scripts/lib/structured-article.mjs
        +
src/templates/substance-article.html
        +
Design System v1
        ↓
artigos/*.html (artefatos sincronizados)
        ↓
scripts/build-site.mjs
        ↓
dist/artigos/*.html
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
- variações de layout necessárias para dossiês já existentes;
- footer do artigo;
- scripts específicos.

DMT e LSD usam o layout editorial padrão. CBD testa uma variação mais complexa, com resumo antes do shell principal e índice em `<details>`. O renderer suporta ambos sem hardcode por slug.

Nesta fase, o conteúdo interno de cada seção ainda é preservado em `innerHtml`. Essa escolha mantém fidelidade visual e editorial durante a transição. A próxima etapa transformará padrões recorrentes em blocos tipados como `text`, `timeline`, `evidence-grid`, `comparison`, `risk`, `faq` e `references` antes da integração do CMS.

O contrato documental está em:

```text
content/schema/substance-dossier-v1.schema.json
```

## Comandos

Sincronizar todos os HTML derivados:

```bash
npm run sync:structured
```

Sincronizar apenas um ou mais artigos:

```bash
node scripts/sync-structured-content.mjs dmt lsd cbd
```

Auditar se os HTML derivados correspondem às fontes estruturadas:

```bash
npm run audit:structured-content
```

Gerar o site publicado:

```bash
npm run build
```

O build descobre automaticamente todos os arquivos `content/artigos/*.json`. Novos artigos estruturados podem entrar no fluxo sem alteração manual da lista no build.

## Validação da migração

Na migração dos três pilotos, o DOM final publicado foi comparado com a versão anterior. DMT, LSD e CBD permaneceram semanticamente idênticos: mesmos textos, headings, IDs, links, referências, classes e estrutura publicada.

## Regra editorial

Para artigos migrados, **o JSON é a fonte de verdade**. Mudanças editoriais não devem ser feitas apenas no HTML derivado, pois `npm run sync:structured` o sobrescreverá.
