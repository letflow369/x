# Let Flow 369

Site estático publicado com GitHub Pages.

## Conteúdo atual

```text
Psicologia
├── Carl Gustav Jung
└── Sigmund Freud

Religião e espiritualidade
├── Cristianismo
├── Islã
├── Espiritismo
├── Hinduísmo
├── Budismo
├── Wicca
├── Umbanda
├── Candomblé
├── Nação e Batuque
└── Kimbanda e Quimbanda

Filosofias e esoterismo
├── Estoicismo
├── Hermetismo
├── Gnosticismo
└── Thelema

Neurodiversidade
└── coleção geral
```

## Estrutura

```text
.
├── index.html
├── 404.html
├── metodologia.html
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── assuntos/
├── artigos/
└── src/
    ├── assets/images/
    ├── scripts/stoicism.js
    └── styles/
```

## Padrão das páginas

As páginas usam HTML semântico, navegação por teclado, foco visível, textos
alternativos, hierarquia de títulos, movimento reduzido e rótulos associados
aos controles de formulário.

Controles opcionais aparecem apenas quando fazem parte do escopo editorial da
página. Eles dependem de ação explícita do usuário, não iniciam automaticamente
e não enviam dados para servidores. O projeto não utiliza medidores de avanço
de leitura.

## JavaScript

Os scripts são modulares e específicos de cada página. Eles controlam recursos
como linhas do tempo, acordeões, cópia de referências e, quando previsto no
artigo, leitura em voz alta ou preferência local de tamanho de texto. Nenhum
dado é enviado para servidor.

## Publicação

```bash
git add -A
git commit -m "Corrige auditoria estrutural do site"
git push
```

Versão dos recursos locais: `20260806-20`.


## Página de Espiritismo

Arquivos adicionados:

```text
artigos/espiritismo.html
src/styles/spiritism.css
src/assets/images/allan-kardec.avif
src/assets/images/allan-kardec.webp
src/assets/images/le-livre-des-esprits-1860.avif
src/assets/images/le-livre-des-esprits-1860.webp
src/assets/images/og-espiritismo.jpg
```

A página integra a coleção Religiões e espiritualidade e também aparece em
História e tradição e nos conteúdos em destaque.


## Playlist para acompanhar a leitura

Todos os artigos carregam o componente:

```text
src/styles/components/spotify-playlist.css
```

Playlist:

```text
https://open.spotify.com/playlist/0RuESiylxOUfZtcIT8WClT
```

O player usa carregamento tardio, não inicia automaticamente e inclui um link
externo como alternativa.

## Tratamento das imagens

- retratos dos heróis limitados a 21 rem no desktop;
- retratos reduzidos para 17 rem em telas menores;
- texto do hero permanece em camada superior;
- manuscritos e capas usam `object-fit: contain`;
- figuras documentais foram reduzidas e centralizadas no celular;
- a largura das colunas de imagem foi limitada para preservar o texto.

Versão dos recursos locais: `20260806-20`.


## Página de Hinduísmo

Arquivos adicionados:

```text
artigos/hinduismo.html
src/styles/hinduism.css
src/assets/images/hindu-temple-kumbakonam.avif
src/assets/images/hindu-temple-kumbakonam.webp
src/assets/images/bhagavad-gita-manuscript-19c.avif
src/assets/images/bhagavad-gita-manuscript-19c.webp
src/assets/images/og-hinduismo.jpg
```

A página foi integrada à página inicial, à coleção História e tradição e à
subcoleção Religiões e espiritualidade. Ela utiliza o componente existente da
playlist e não adiciona controles extras de leitura.


## Página de Budismo

Arquivos adicionados:

```text
artigos/budismo.html
src/styles/buddhism.css
src/assets/images/sanchi-great-stupa.avif
src/assets/images/sanchi-great-stupa.webp
src/assets/images/buddhist-palm-leaf-manuscript.avif
src/assets/images/buddhist-palm-leaf-manuscript.webp
src/assets/images/og-budismo.jpg
```

A página integra a página inicial, História e tradição e Religiões e
espiritualidade. O artigo mantém a playlist existente e não cria controles
adicionais de leitura.


## Página de Wicca

Arquivos adicionados:

```text
artigos/wicca.html
src/styles/wicca.css
src/assets/images/wicca-new-forest.avif
src/assets/images/wicca-new-forest.webp
src/assets/images/gardner-book-of-shadows.avif
src/assets/images/gardner-book-of-shadows.webp
src/assets/images/og-wicca.jpg
```

A página foi integrada à página inicial, à coleção História e tradição e à
subcoleção Religiões e espiritualidade. O artigo preserva a playlist existente
e não adiciona controles especiais de leitura.


## Reorganização das áreas

- removido o bloco público “História e tradição”;
- criada a coleção `assuntos/psicologia.html`;
- promovida “Religião e espiritualidade” a área principal;
- removido “Misticismo” enquanto não possui página publicada;
- removida a antiga página de transição `assuntos/historia-tradicao.html`.


## Página de Vibrações e estados vibracionais

Arquivos adicionados:

```text
artigos/vibracoes-estados-vibracionais.html
src/styles/vibrations.css
src/scripts/vibrations.js
```

A página separa vibração física, ritmos biológicos, experiência subjetiva e
interpretação espiritual. O seletor funciona com botões nativos, `aria-pressed`
e atualização de status em `aria-live`; sem JavaScript, todos os cartões
permanecem visíveis.


## Página de Feng Shui

Arquivos adicionados:

```text
artigos/feng-shui.html
src/styles/feng-shui.css
src/assets/images/feng-shui-hongcun.avif
src/assets/images/feng-shui-hongcun.webp
src/assets/images/feng-shui-luopan.avif
src/assets/images/feng-shui-luopan.webp
src/assets/images/og-feng-shui.jpg
```

A página foi integrada à página inicial e à coleção Filosofias e esoterismo.
O artigo preserva a playlist existente e separa documentação histórica,
benefícios ambientais plausíveis e alegações metafísicas não demonstradas.


## Página de Chakras

Arquivos adicionados:

```text
artigos/chakras.html
src/styles/chakras.css
src/scripts/chakras.js
src/assets/images/chakras-modern-diagram.svg
src/assets/images/og-chakras.jpg
```

A página foi integrada à página inicial e à coleção Filosofias e esoterismo.
O explorador interativo separa associação tradicional, interpretação moderna e
alertas críticos. O artigo não adiciona controles especiais de leitura.


## Página inicial editorial

A página inicial foi reorganizada como resumo do projeto. Ela apresenta:

- os temas cobertos pelo site;
- formas responsáveis de apoio ao estudo e à reflexão;
- limites de uso e aviso de que o conteúdo não substitui atendimento profissional;
- separação entre evidência científica e empírica, registro histórico, tradição, interpretação e experiência relatada;
- áreas de conhecimento e caminhos de leitura orientados por perguntas.


## Página de TDAH

Arquivos adicionados:

```text
artigos/tdah.html
src/styles/adhd.css
src/scripts/adhd.js
src/assets/images/tdah-organizacao-abstrata.svg
src/assets/images/og-tdah.jpg
```

A página foi integrada à página inicial, à coleção Neurodiversidade e ao sitemap.
Inclui abas acessíveis para fases da vida, acordeões, cartões de tratamento e
separação entre evidência estabelecida, associação observacional e lacunas.


## Página de Autismo

Arquivos adicionados:

```text
artigos/autismo.html
src/styles/autism.css
src/scripts/autism.js
src/assets/images/autismo-espectro-abstrato.svg
src/assets/images/og-autismo.jpg
```

A página foi integrada à página inicial e à coleção Neurodiversidade. Inclui
abas para fases da vida, acordeões, indicadores de evidência e botões para
copiar referências. Controles especiais de leitura não foram reintroduzidos.


## Página de Numerologia

Arquivos adicionados:

```text
artigos/numerologia.html
src/styles/numerology.css
src/scripts/numerology.js
src/assets/images/numerologia-simbolos-abstratos.svg
src/assets/images/og-numerologia.jpg
```

A página foi integrada à página inicial, à coleção Filosofias e esoterismo e ao sitemap. Diferencia história, crença, simbolismo e evidência científica.


## Página de TOC

Arquivos adicionados:

```text
artigos/toc.html
src/styles/ocd.css
src/scripts/ocd.js
src/assets/images/toc-ciclo-abstrato.svg
src/assets/images/og-toc.jpg
```

A página foi integrada à página inicial e à coleção Psicologia. Inclui
linha do tempo, abas do ciclo de vida, níveis de evidência, acordeões,
glossário, referências copiáveis e respeito a `prefers-reduced-motion`.
Controles especiais de leitura não foram reintroduzidos.


## Página de Astrologia

Arquivos adicionados:

```text
artigos/astrologia.html
src/styles/astrology.css
src/scripts/astrology.js
src/assets/images/astrologia-mapa-celeste.svg
src/assets/images/og-astrologia.jpg
```

A página foi integrada à página inicial e à coleção Filosofias e esoterismo.
Ela separa história, interpretação cultural e evidência científica, inclui
linha do tempo navegável, acordeões e referências copiáveis.


## Página de Ansiedade — versão funcional inicial

Arquivos adicionados:

```text
artigos/ansiedade.html
src/styles/anxiety.css
src/scripts/anxiety.js
src/assets/images/ansiedade-resposta-abstrata.svg
src/assets/images/og-ansiedade.jpg
```

Esta primeira etapa implementa hero, aviso editorial, quatro cartões-resumo, navegação interna responsiva e blocos concisos de tratamento e procura de ajuda. As seções aprofundadas permanecem explicitamente marcadas para o próximo ciclo.


## Página de Teosofia

Arquivos adicionados:

```text
artigos/teosofia.html
src/styles/theosophy.css
src/styles/components/evidence-tags.css
src/scripts/theosophy.js
src/assets/images/teosofia-manuscrito-cosmico.svg
src/assets/images/og-teosofia.jpg
```

A página separa fatos documentados, visão institucional, interpretação acadêmica, crenças teosóficas, alegações não comprovadas e controvérsias. O componente `evidence-tags.css` foi criado para reutilização nas demais páginas.


## Página de Umbanda

Arquivos adicionados:

```text
artigos/umbanda.html
src/styles/umbanda.css
src/scripts/umbanda.js
src/assets/images/umbanda-terreiro-memoria.svg
src/assets/images/og-umbanda.jpg
```

A página foi integrada à página inicial e à coleção Religião e espiritualidade.
O conteúdo distingue tradição religiosa, historiografia, crenças, dados oficiais,
controvérsias e direitos, sem apresentar uma vertente como universal.


## Página de Kimbanda e Quimbanda

Arquivos adicionados:

```text
artigos/quimbanda.html
src/styles/quimbanda.css
src/scripts/quimbanda.js
src/assets/images/quimbanda-encruzilhadas-memoria.svg
src/assets/images/og-quimbanda.jpg
```

Arquivos integrados ou atualizados:

```text
index.html
assuntos/religioes-espiritualidade.html
artigos/umbanda.html
sitemap.xml
src/styles/components/evidence-tags.css
IMAGE-CREDITS.md
```

A página distingue o uso histórico de `kimbanda` em contextos centro-africanos
das formações plurais chamadas Quimbanda no Brasil. Também separa fatos
documentados, interpretações acadêmicas, perspectivas religiosas e limites de
generalização, sem estética de terror e sem revelar fundamentos reservados.


## Página de Candomblé

Arquivos adicionados:

```text
artigos/candomble.html
src/styles/candomble.css
src/scripts/candomble.js
src/assets/images/candomble-casa-branca.jpg
src/assets/images/candomble-casa-branca.webp
src/assets/images/og-candomble.jpg
```

Arquivos integrados ou atualizados:

```text
index.html
assuntos/religioes-espiritualidade.html
sitemap.xml
IMAGE-CREDITS.md
```

A página apresenta o Candomblé como tradição afro-brasileira plural, formada
na diáspora, e diferencia fatos históricos, conceitos religiosos, interpretações
acadêmicas, direitos, variações entre nações e limites dos conhecimentos
reservados. Mantém as etiquetas compartilhadas de evidência e não adiciona
leitura em voz alta, controles de fonte, alto contraste ou progresso de leitura.


## Página de Nação e Batuque

Arquivos adicionados:

```text
artigos/batuque-nacao.html
src/styles/batuque-nacao.css
src/scripts/batuque-nacao.js
src/assets/images/batuque-casa-comunidade.svg
src/assets/images/og-batuque-nacao.jpg
```

Arquivos integrados ou atualizados:

```text
index.html
assuntos/religioes-espiritualidade.html
sitemap.xml
README.md
IMAGE-CREDITS.md
```

A página apresenta o Batuque ou Nação como tradição afro-brasileira formada no
Rio Grande do Sul e diferencia seus usos de “nação” daqueles encontrados em
outras religiões. O conteúdo separa fatos históricos, conceitos religiosos,
interpretações acadêmicas, relatos internos, pluralidade entre casas e limites
dos conhecimentos reservados.


## Página de Islã

Arquivos adicionados:

```text
artigos/isla.html
src/styles/isla.css
src/scripts/isla.js
src/assets/images/isla-alcorao-folio.jpg
src/assets/images/isla-alcorao-folio.webp
src/assets/images/og-isla.jpg
```

A página apresenta uma leitura progressiva sobre origem histórica, Maomé,
Alcorão, Sunnah, hadith, crenças, Cinco Pilares, diversidade interna, valores,
produção intelectual, presença no Brasil e equívocos comuns. Diferencia texto
religioso, interpretação e aplicação histórica e inclui leitura em voz alta
acionada somente pelo usuário.


## Página de Cristianismo

Arquivos adicionados:

```text
artigos/cristianismo.html
src/styles/cristianismo.css
src/scripts/cristianismo.js
src/assets/images/cristianismo-evangeliario-etiope.jpg
src/assets/images/cristianismo-evangeliario-etiope.webp
src/assets/images/og-cristianismo.jpg
```

Arquivos integrados ou atualizados:

```text
index.html
assuntos/religioes-espiritualidade.html
sitemap.xml
README.md
IMAGE-CREDITS.md
```

A página organiza o tema em leitura rápida, intermediária e aprofundada. O
conteúdo distingue fatos históricos, crenças religiosas e interpretações
acadêmicas; apresenta origem judaica, linha do tempo, Bíblia, diversidade
católica, ortodoxa, protestante e pentecostal, cristianismo no Brasil,
contribuições, contradições, glossário e referências verificáveis. Inclui
leitura em voz alta e ajuste de tamanho do texto, ambos dependentes de ação
explícita do usuário, sem modo de alto contraste ou progresso de leitura.

