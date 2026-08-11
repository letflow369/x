# Arquitetura de build — Let Flow 369

**Verificação técnica:** 2026-08-11.

O navegador continua recebendo apenas HTML, CSS e JavaScript nativos. O Node.js é utilizado exclusivamente durante desenvolvimento, QA e publicação.

## Fonte e artefato

```text
conteúdo estruturado + HTML legado + dados + componentes
                    ↓
          scripts/build-site.mjs
                    ↓
                  dist/
                    ↓
              GitHub Pages
```

`dist/` é descartável e não deve ser versionado.


## Conteúdo estruturado

O piloto começou por `DMT`:

```text
content/artigos/dmt.json
        ↓
src/templates/substance-article.html
        ↓
scripts/lib/structured-article.mjs
        ↓
HTML estático
```

O build descobre automaticamente `content/artigos/*.json` e usa esses arquivos como fonte de verdade para os artigos migrados. O HTML em `artigos/` continua existindo como artefato sincronizado para compatibilidade da árvore-fonte e auditorias locais.

Comandos:

```bash
npm run sync:structured
npm run audit:structured-content
```

Detalhes: `docs/conteudo-estruturado.md`.

## Componentes compartilhados

- `src/templates/header.html`: única fonte de verdade para marca e navegação principal.
- `src/templates/footer.html`: links institucionais e rodapé.
- `scripts/build-site.mjs`: substitui os componentes em todas as páginas geradas, injeta dados estruturados e gera o sitemap.

Isso elimina a necessidade de editar dezenas de HTML para mudar o menu global.


## Progressive enhancement dos diretórios

O build pré-renderiza o estado inicial de `busca.html`, `evidencias.html`, `tags.html` e `glossario.html` a partir dos JSON editoriais. Assim, o conteúdo principal já existe no HTML publicado; `src/scripts/directories.js` passa a atuar como aprimoramento para filtrar, pesquisar e atualizar a interface.

```text
src/data/*.json
      ↓
scripts/lib/directory-prerender.mjs
      ↓
HTML inicial completo
      ↓
JavaScript filtra/refina
```

A auditoria `npm run audit:ui` verifica contagens, landmarks, hierarquia de headings, piso de microtipografia e o contrato responsivo do header.

## Metadados sociais

`scripts/lib/social-metadata.mjs` normaliza Open Graph e Twitter/X durante o build. As 77 páginas indexáveis devem publicar exatamente um conjunto completo de:

```text
og:type
og:locale
og:site_name
og:title
og:description
og:url
og:image
og:image:width
og:image:height
og:image:alt
twitter:card
twitter:title
twitter:description
twitter:image
twitter:image:alt
```

Quando uma página não possui imagem social própria, o build usa `src/assets/images/og-let-flow-369.jpg`. A auditoria `npm run audit:social` valida cobertura, URLs HTTPS, dimensões declaradas e existência dos assets locais.

## Metadados

- `src/data/content-index.json`: categoria, tags, relações e datas editoriais extraídas dos schemas dos artigos.
- `src/data/evidence-index.json`: ledger de alegações com nível, base da evidência, artigo de contexto e data de verificação.
- `src/data/site-config.json`: configuração central do site, ciclo de revisão e analytics.

Antes de commit relevante em artigos:

```bash
npm run sync:data
npm run audit:editorial
```

## Comandos

```bash
npm run build
npm run audit
npm run audit:dist
npm run audit:editorial
npm run audit:structured
npm run audit:social
npm run audit:ui
npm run test:e2e
npm run lighthouse
```

Para pré-visualização local:

```bash
npm run build
npm run preview
```

Abra `http://127.0.0.1:4173/x/`.

## GitHub Pages

O workflow `.github/workflows/pages.yml` valida a fonte, gera `dist/`, roda testes de navegador/acessibilidade e Lighthouse e publica o artefato do Pages somente após o QA.

No GitHub, a fonte do Pages deve ser configurada uma única vez para **GitHub Actions** em `Settings → Pages → Build and deployment → Source`.
