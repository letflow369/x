# Let Flow 369 — Design System v1

**Início da migração:** 2026-08-11  
**Escopo atual:** DMT, LSD, CBD, Changa, Ayahuasca, Psilocibina, Cannabis sativa e Cannabis indica  
**Objetivo:** separar estrutura visual compartilhada de identidade temática, mantendo HTML/CSS/JavaScript nativos e preparando o projeto para conteúdo estruturado e CMS.

## 1. Princípio

Uma página temática não deve precisar recriar hero, grids, cartões, estados de evidência e espaçamento básico em um CSS exclusivo.

A separação passa a ser:

```text
Tokens globais
      ↓
Componentes editoriais compartilhados
      ↓
Tema da página
      ↓
Componentes realmente específicos do assunto
```

## 2. Arquivos centrais

```text
src/styles/tokens.css
src/styles/components/substance-dossier.css
src/styles/components/cannabis-botanical.css
scripts/audit-design-system.mjs
```

Os temas continuam em arquivos próprios, mas concentram identidade visual e componentes exclusivos:

```text
src/styles/dmt.css
src/styles/lsd.css
src/styles/cbd.css
src/styles/changa.css
src/styles/ayahuasca.css
src/styles/psilocibina.css
src/styles/cannabis-sativa.css
src/styles/cannabis-indica.css
```

Esses arquivos devem concentrar principalmente paleta, arte do hero e componentes exclusivos.

## 3. Tokens tipográficos

Os aliases abaixo passam a existir globalmente:

```css
--font-display: var(--font-subtitle);
--font-reading: var(--font-body);
```

Isso elimina referências a custom properties tipográficas não definidas em páginas temáticas anteriores.

## 4. Contrato visual para dossiês de substâncias

Toda página migrada utiliza `.substance-dossier` e pode definir:

```text
--substance-bg
--substance-surface
--substance-surface-soft
--substance-line
--substance-accent
--substance-accent-secondary
--substance-highlight
--substance-positive
--substance-risk
--substance-muted
--substance-content-width
--substance-content-gutter
--substance-hero-gutter
--substance-hero-columns
--substance-hero-gap
--substance-hero-padding-block
--substance-title-size
--substance-title-max
--substance-title-letter-spacing
--substance-subtitle-color
--substance-soft-background
--substance-risk-background
--substance-card-background
```

## 5. Componentes disponíveis

### Estrutura

```text
.substance-dossier
.substance-hero
.substance-hero__inner
.substance-hero__subtitle
.substance-hero__intro
.substance-hero__notice
.substance-hero__visual
.substance-quick
.substance-section
.substance-section--soft
.substance-section--risk
.substance-section__inner
.substance-article-footer
```

### Conteúdo

```text
.substance-status
.substance-summary-grid
.substance-grid
.substance-grid--2
.substance-grid--3
.substance-grid--4
.substance-card
.substance-label
.substance-evidence-key
.substance-flow
.substance-flow__node
.substance-flow__arrow
.substance-table-wrap
.substance-review-date
```

### Estados epistemológicos

```text
.substance-mark--strong
.substance-mark--established
.substance-mark--promising
.substance-mark--preliminary
.substance-mark--hypothesis
.substance-mark--unsupported
```

A informação nunca depende somente da cor; o texto do nível continua obrigatório no HTML.

## 6. Ordem dos estilos em páginas migradas

```html
<link href="../src/styles/tokens.css" rel="stylesheet">
<link href="../src/styles/base.css" rel="stylesheet">
...
<link href="../src/styles/integrative-practice.css" rel="stylesheet">
<link href="../src/styles/components/substance-dossier.css" rel="stylesheet">
<link href="../src/styles/<tema>.css" rel="stylesheet">
```

O tema é carregado depois do componente para permitir ajustes específicos sem duplicar a fundação.

## 7. Dossiês migrados

### DMT

Migração ampla do shell, hero, status, grids, semáforo epistemológico, fluxo, seções e footer. O CSS próprio mantém a composição molecular e o estudo clínico em destaque.

### LSD

Migração ampla do shell, hero, status, grids, evidência, fluxo, seções e footer. O CSS próprio mantém a rede neural, timeline, espectro e comparação de contextos.

### CBD

Migração do shell, hero, resumo, seções e footer. O CSS foi também limpo de regras herdadas de páginas de Cannabis que não eram usadas pelo HTML atual. Componentes farmacológicos específicos permanecem no tema.

### Changa

Migração ampla do shell, hero, status, resumo, grades, semáforo epistemológico, fluxo, seções e footer. O CSS próprio mantém o diagrama central e detalhes culturais.

### Ayahuasca

Migração do núcleo compartilhado de hero, status, aviso e leitura rápida. A estrutura interna permanece especializada porque combina tradição, contexto religioso, estudo clínico e blocos antropológicos próprios.

### Psilocibina

Migração do núcleo do dossiê e das principais grades editoriais. O tema mantém órbita farmacológica, estudo clínico, set/setting e visualizações específicas.

### Cannabis sativa e Cannabis indica

Além do núcleo `substance-dossier`, compartilham `cannabis-botanical.css` para elementos botânicos recorrentes — lista de domínios, prancha científica e legenda — sem transformar as duas páginas em cópias visuais.

## 8. Regra para novas páginas de substâncias

Antes de criar CSS exclusivo, verificar se a necessidade já é atendida por um componente compartilhado.

Criar seletor temático somente quando houver diferença real de:

- arte/diagrama;
- estrutura científica específica;
- visualização de estudo;
- comparação exclusiva;
- necessidade responsiva que não seja comum à família.

## 9. Auditoria

Executar:

```bash
npm run audit:design
```

A auditoria confirma que os oito dossiês usam o stylesheet compartilhado, as classes estruturais mínimas e o contrato de custom properties. Para Cannabis sativa/indica também valida o componente botânico compartilhado.

## 10. Próxima etapa

A família de substâncias está consolidada. O próximo passo é transformar **DMT, LSD e CBD** em conteúdo estruturado piloto (Markdown/JSON + front matter), mantendo os mesmos componentes e HTML final. Essa separação conteúdo/apresentação será a base segura para integrar o CMS.

Esta etapa ainda não introduz TinaCMS nem dependência de serviço externo.
