# Modelo reutilizável — Práticas integrativas

Este arquivo documenta a camada compartilhada usada pelas páginas temáticas de práticas integrativas do Let Flow 369.

## Arquivos compartilhados

- `src/styles/integrative-practice.css`
- `src/scripts/integrative-practice.js`

## Princípio editorial

A ordem preferencial é:

1. resposta rápida;
2. contexto histórico/tradicional;
3. mecanismos ou hipóteses;
4. evidência clínica por indicação;
5. segurança e riscos;
6. contexto brasileiro/regulatório;
7. controvérsias e limitações;
8. estudos e referências.

## Níveis de informação

Use os selos compartilhados:

- `.integrative-level--history`
- `.integrative-level--traditional`
- `.integrative-level--hypothesis`
- `.integrative-level--clinical`
- `.integrative-level--limited`
- `.integrative-level--uncertain`
- `.integrative-level--risk`
- `.integrative-level--institutional`

A cor nunca deve ser a única forma de indicar o nível.

## Componentes

- `.integrative-quick-grid` + `.integrative-quick-card`
- `.integrative-card-grid` + `.integrative-card`
- `.integrative-evidence-scale` + `.integrative-evidence-row`
- `.integrative-study-grid` + `.integrative-study-card`
- `.integrative-filter-bar`
- `.integrative-flow`
- `.integrative-timeline`
- `.integrative-table`
- `.integrative-callout`
- `.integrative-reference-grid`

## JavaScript compartilhado

O script é progressivo e não é necessário para leitura do conteúdo. Ele pode fornecer:

- indicador visual de progresso;
- scrollspy quando o índice usa `data-integrative-toc`;
- filtros de evidência com `data-integrative-filters`;
- botão de voltar ao topo com `data-integrative-back-to-top`.

A página deve continuar compreensível e navegável sem JavaScript.

## Acessibilidade

Manter:

- HTML semântico;
- skip link;
- foco visível;
- navegação por teclado;
- headings coerentes;
- informações independentes de cor;
- `prefers-reduced-motion`;
- descrições textuais para diagramas.

Não implementar recurso próprio de leitura, narração ou text-to-speech.
