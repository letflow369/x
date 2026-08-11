# Analytics e Search Console

## Estado entregue

Analytics está **desativado** em `src/data/site-config.json` porque o projeto não possui um ID de medição fornecido pelo responsável.

Nenhum ID, cookie, token ou chave foi inventado.

## Ativação futura do GA4

1. Criar a propriedade do Let Flow 369 no Google Analytics.
2. Obter o ID no formato `G-XXXXXXXXXX`.
3. Alterar em `src/data/site-config.json`:

```json
"analytics": {
  "enabled": true,
  "measurementId": "G-XXXXXXXXXX",
  "consentRequired": true
}
```

4. Executar `npm run build` e os testes.

Quando habilitado, `analytics.js` somente carrega o Google Analytics após consentimento explícito. A implementação registra eventos editoriais de profundidade de leitura, busca interna, abertura de referências e navegação para conteúdos relacionados.

## Search Console

A verificação de propriedade exige uma credencial ou método escolhido pelo responsável do site, portanto não é automatizada no repositório.

Após a configuração, acompanhar principalmente:

- consultas;
- páginas;
- países;
- CTR;
- indexação;
- rich results e dados estruturados.

Nunca adicionar códigos de verificação fictícios ao HTML.
