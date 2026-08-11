# Conteúdo estruturado — pilotos DMT, LSD e CBD

**Estado:** três pilotos ativos desde 2026-08-11; DMT é o primeiro piloto com blocos editoriais tipados.

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

A migração agora possui dois níveis. LSD e CBD continuam preservando o conteúdo interno das seções em `innerHtml` para garantir fidelidade durante a transição. DMT avançou para o primeiro piloto de **blocos editoriais tipados**: 10 de suas 15 seções já não armazenam um grande fragmento HTML e são compostas pelo renderer a partir de dados estruturados.

Os tipos atualmente exercitados pelo DMT são:

```text
section-heading
summary-grid
evidence-key
card-grid
timeline
flow
callout
table
clinical-study
details-list
filter-bar
study-grid
review-date
```

O HTML inline ainda é aceito apenas dentro de campos ricos pequenos — por exemplo, uma referência `<sup>` dentro de um parágrafo ou um `<em>` dentro de uma citação bibliográfica. O objetivo é remover progressivamente também esse HTML quando o modelo de rich text do CMS for definido.

Essa etapa prioriza **editabilidade e contrato de componentes**, não redução do tamanho do JSON. Dados tipados são naturalmente mais verbosos que um fragmento HTML compacto, mas permitem validação, formulários de CMS, reuso e evolução segura do Design System.

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

Auditar especificamente os blocos editoriais tipados:

```bash
npm run audit:typed-blocks
```

Gerar o site publicado:

```bash
npm run build
```

O build descobre automaticamente todos os arquivos `content/artigos/*.json`. Novos artigos estruturados podem entrar no fluxo sem alteração manual da lista no build.

## Validação da migração

Na migração dos três pilotos, o DOM final publicado foi comparado com a versão anterior. DMT, LSD e CBD permaneceram semanticamente idênticos: mesmos textos, headings, IDs, links, referências, classes e estrutura publicada. A conversão das 10 seções tipadas do DMT foi novamente comparada com o HTML anterior e também manteve DOM equivalente.

## Regra editorial

Para artigos migrados, **o JSON é a fonte de verdade**. Mudanças editoriais não devem ser feitas apenas no HTML derivado, pois `npm run sync:structured` o sobrescreverá.
