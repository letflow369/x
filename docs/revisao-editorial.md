# Revisão editorial e científica

O projeto separa três datas que não devem ser tratadas como sinônimas:

- **datePublished**: publicação original do artigo;
- **dateModified**: alteração editorial do documento;
- **scientificReviewIso**: revisão científica declarada explicitamente no próprio artigo.

O script `scripts/sync-content-metadata.mjs` lê `datePublished` e `dateModified` dos dados estruturados já existentes. Ele não inventa datas de revisão científica.

O script `scripts/audit-editorial.mjs` sinaliza inconsistências e permite identificar páginas sem revisão científica declarada. A ausência dessa data não é convertida automaticamente em uma revisão fictícia.

## Ledger de evidências

Cada item do `evidence-index.json` registra:

- alegação;
- nível atual de evidência;
- base: direta, indireta, mecanismo ou alegação avaliada;
- artigo que contém o contexto completo;
- data em que o contexto foi verificado.

A classificação descreve a **alegação**, não o artigo inteiro.
