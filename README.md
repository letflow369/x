# Let Flow 369

Site estático publicado com GitHub Pages.

## Conteúdo atual

O site organiza os artigos em seis categorias principais. Cada artigo possui uma categoria-base única; relações transversais podem aparecer dentro do conteúdo sem duplicar a página entre coleções.

```text
Desenvolvimento, aprendizagem e neurodiversidade ... 8 páginas
Psicologia e saúde mental .......................... 14 páginas
Saúde, terapias e reabilitação ..................... 12 páginas
Substâncias, farmacologia e consciência ............ 8 páginas
Filosofias, esoterismo e sistemas simbólicos ....... 11 páginas
Religiões e espiritualidade ........................ 16 páginas
Total ............................................... 69 artigos
```

A coleção `assuntos/substancias-farmacologia-consciencia.html` reúne Ayahuasca, Psilocibina, Cannabis sativa, Cannabis indica, CBD, DMT, Changa e LSD. Práticas terapêuticas e integrativas ficam em `assuntos/saude-reabilitacao.html`, enquanto filosofias e sistemas simbólicos permanecem em `assuntos/filosofias-esoterismo.html`.

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
como linhas do tempo, acordeões, cópia de referências e navegação contextual.
Nenhum dado é enviado para servidor. O projeto não implementa controles
específicos de acessibilidade de leitura.

## Design System v1

A família de dossiês de substâncias usa componentes editoriais compartilhados em **DMT, LSD, CBD, Changa, Ayahuasca, Psilocibina, Cannabis sativa e Cannabis indica**.

Arquivos centrais:

```text
src/styles/components/substance-dossier.css
src/styles/components/cannabis-botanical.css
src/styles/tokens.css
docs/design-system-v1.md
scripts/audit-design-system.mjs
```

O componente compartilhado concentra shell, hero, seções, grids, cards, estados epistemológicos, fluxo e footer. Os CSS temáticos ficam responsáveis principalmente por paleta, arte e componentes exclusivos do assunto.

Auditoria específica:

```bash
npm run audit:design
```

O CMS ainda não foi introduzido. A separação entre apresentação e conteúdo já possui três pilotos ativos: **DMT, LSD e CBD**. Suas fontes de verdade são `content/artigos/dmt.json`, `content/artigos/lsd.json` e `content/artigos/cbd.json`; o build gera os HTML a partir desses conteúdos estruturados e do Design System.

Arquivos do piloto:

```text
content/artigos/dmt.json
content/schema/substance-dossier-v1.schema.json
src/templates/substance-article.html
scripts/lib/structured-article.mjs
scripts/sync-structured-content.mjs
scripts/audit-structured-content.mjs
docs/conteudo-estruturado.md
```

Comandos:

```bash
npm run sync:structured
npm run audit:structured-content
```

## QA de interface e compartilhamento

O build agora pré-renderiza **Busca, Evidências, Tags e Glossário** antes de executar JavaScript. Isso mantém conteúdo navegável mesmo se os scripts falharem e transforma o JavaScript em progressive enhancement.

O mesmo build normaliza Open Graph e Twitter/X para todas as páginas indexáveis, com fallback institucional de imagem social.

Comandos:

```bash
npm run build
npm run audit:header
npm run audit:ui
npm run audit:social
```

`audit:ui` também impede saltos de headings, `<nav>` sem nome acessível, retorno do scroll horizontal oculto no menu mobile e microtipografia abaixo do piso definido pelo projeto.

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
religioso, interpretação e aplicação histórica. Não inclui recursos específicos
de acessibilidade de leitura.


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
contribuições, contradições, glossário e referências verificáveis. Não inclui
recursos específicos de acessibilidade de leitura.



## Página de Burnout

Arquivos adicionados:

```text
artigos/burnout.html
src/styles/burnout.css
src/scripts/burnout.js
src/assets/images/burnout-demandas-recursos.svg
src/assets/images/og-burnout.jpg
```

Arquivos integrados ou atualizados:

```text
index.html
assuntos/psicologia.html
sitemap.xml
README.md
IMAGE-CREDITS.md
```

A página apresenta burnout como fenômeno ocupacional segundo a CID-11, com
leitura progressiva, linha do tempo, comparador com estresse, depressão e
ansiedade, modelo demandas–recursos, sinais, avaliação, instrumentos,
intervenções individuais e organizacionais, evidências recentes, prevenção,
glossário e aviso de saúde. Mantém botão “Voltar ao topo” e não inclui recursos específicos de acessibilidade de leitura.


## Página de Transtorno de Personalidade Borderline

Arquivos adicionados:

```text
artigos/borderline.html
src/styles/borderline.css
src/scripts/borderline.js
src/assets/images/borderline-regulacao-identidade.svg
src/assets/images/og-borderline.jpg
```

A página apresenta o TPB em leitura progressiva, com resumo essencial, história do diagnóstico, modelo biopsicossocial, sintomas, fases da vida, prognóstico, comorbidades, diagnóstico diferencial, segurança, psicoterapias, medicamentos, evidências recentes, mitos, apoio, fronteiras da evidência e referências verificáveis. Mantém botão “Voltar ao topo” e não inclui recursos específicos de acessibilidade de leitura.


## Página de Terapia Cognitivo-Comportamental

Arquivos adicionados:

```text
artigos/terapia-cognitivo-comportamental.html
src/styles/tcc.css
src/scripts/tcc.js
src/assets/images/tcc-ciclo-aprendizagem.svg
src/assets/images/og-tcc.jpg
```

A página apresenta a TCC como família de psicoterapias, corrige a confusão entre terapia e diagnóstico, organiza sua história em linha do tempo, inclui diagrama cognitivo-comportamental interativo, conceitos e técnicas expansíveis, etapas de tratamento, tabela filtrável de aplicações clínicas, comorbidades, painel da meta-análise de 2025, TCC digital, limitações e referências verificáveis. Mantém botão “Voltar ao topo” e não inclui recursos específicos de acessibilidade de leitura.


## Página de Judaísmo

Arquivos adicionados:

```text
artigos/judaismo.html
src/styles/judaismo.css
src/scripts/judaismo.js
src/assets/images/judaismo-biblia-hebraica.jpg
src/assets/images/judaismo-biblia-hebraica.webp
src/assets/images/og-judaismo.jpg
```

A página apresenta o Judaísmo em leitura progressiva, distinguindo tradição religiosa e reconstrução histórica. Inclui formação israelita e judaíta, exílio, Segundo Templo, Judaísmo rabínico, correntes contemporâneas, valores, Torá, Tanakh, Mishná, Talmude, Midrash, filosofia, diversidade cultural, antissemitismo, mitos, FAQ e referências próximas às afirmações. Não inclui recursos específicos de acessibilidade de leitura.


## Revisão editorial global — agosto de 2026

- cabeçalho global atualizado para refletir o escopo atual do projeto;
- breadcrumbs adicionados aos artigos e coleções;
- página inicial passou a mostrar páginas em destaque, mantendo os catálogos completos nas coleções;
- coleções reorganizadas em grupos editoriais;
- títulos longos usam tipografia mais legível;
- referências inline e etiquetas editoriais receberam tamanho maior;
- recurso de leitura em voz alta removido integralmente das páginas e scripts;
- permanecem recursos estruturais de acessibilidade como navegação por teclado, foco visível, texto alternativo e redução de movimento.

**Regra do projeto:** nunca implementar recursos específicos de acessibilidade de leitura em nenhuma página. A acessibilidade estrutural do site permanece obrigatória.


## Página de Dislexia

Arquivos adicionados:

```text
artigos/dislexia.html
src/styles/dyslexia.css
src/scripts/dyslexia.js
src/assets/images/dislexia-linguagem-leitura.svg
src/assets/images/og-dislexia.jpg
```

A página apresenta dislexia em leitura progressiva, com definição atualizada, resumo em quatro cartões, fluxo da linguagem à leitura, características, mitos, história, modelo multifatorial, fases da vida, condições associadas, avaliação integrada, intervenções educacionais, mapa de evidências, estudos recentes, limites do conhecimento, Lei nº 14.254/2021, FAQ e referências. A página não possui síntese de voz/leitura automática.


## Página de Discalculia

Arquivos adicionados:

```text
artigos/discalculia.html
src/styles/dyscalculia.css
src/scripts/dyscalculia.js
src/assets/images/discalculia-quantidade-relacoes.svg
src/assets/images/og-discalculia.jpg
```

A página segue estruturalmente a referência de Dislexia e apresenta discalculia em leitura progressiva: resumo inicial, diferença entre dificuldade matemática e transtorno do desenvolvimento da aprendizagem, manifestações, curso ao longo da vida, neurociência, modelo multifatorial, inteligência, condições associadas, avaliação integrada, intervenções educacionais, adaptações, mapa de evidências, estudos de 2023–2026, incertezas, história e contexto brasileiro. Não possui síntese de voz/leitura automática.


## Página de Dispraxia / Transtorno do Desenvolvimento da Coordenação

Arquivos adicionados:

```text
artigos/dispraxia.html
src/styles/dyspraxia.css
src/scripts/dyspraxia.js
src/assets/images/dispraxia-trajetorias-coordenacao.svg
src/assets/images/og-dispraxia.jpg
```

A página segue a arquitetura progressiva de Dislexia e Discalculia: resumo imediato, distinção terminológica entre dispraxia/TDC/apraxia, execução motora, manifestações funcionais, curso ao longo da vida, neurociência, modelo multifatorial, condições coexistentes, avaliação, intervenções orientadas a tarefas, adaptações, evidências de 2024–2026, história do conceito e referências. Não possui síntese de voz/leitura automática.


## Página de Síndrome de Tourette

Arquivos adicionados:

```text
artigos/tourette.html
src/styles/tourette.css
src/scripts/tourette.js
src/assets/images/tourette-circuitos-desenvolvimento.svg
src/assets/images/og-tourette.jpg
```

A página apresenta Tourette como condição do neurodesenvolvimento em leitura progressiva: resumo imediato, tipos de tiques, sensação premonitória e supressão, curso ao longo da vida, redes cerebrais e genética, condições coexistentes, diagnóstico, CBIT/HRT/ERP, medicamentos, escola, mitos, pesquisas de 2025–2026, história e limites atuais da ciência. O status regulatório do ecopipam é apresentado separadamente da evidência clínica. Não possui síntese de voz/leitura automática.


## Síndrome de Down

Página `artigos/sindrome-de-down.html` adicionada em agosto de 2026, com leitura progressiva, genética, diagnóstico, desenvolvimento, condições associadas, acompanhamento ao longo da vida, Alzheimer, intervenções, pesquisa 2024–2026, bioética e referências verificáveis.


## Rede de conhecimento (2026-08-10)

A navegação editorial possui duas camadas:

1. cada artigo tem exatamente uma categoria principal;
2. tags, relações e trilhas conectam conteúdos transversalmente sem duplicar categorias.

Fonte central de metadados:

```text
src/data/content-index.json
```

Ferramentas derivadas desses dados:

```text
busca.html       pesquisa por texto, categoria e tipo
tags.html        navegação transversal por tags
trilhas.html     percursos editoriais ordenados
evidencias.html  explorador de alegações por nível de evidência
glossario.html   conceitos recorrentes de leitura científica
```

Dados complementares:

```text
src/data/evidence-index.json
src/data/glossary.json
```

Os componentes opcionais de rede nos artigos são carregados por `src/scripts/content-network.js`. O conteúdo principal e a navegação por categorias permanecem funcionais sem JavaScript.

## Padrão editorial para substâncias e psicodélicos (2026-08-10)

O modelo oficial para DMT, LSD, psilocibina, ayahuasca, CBD, Cannabis, Changa e temas relacionados está documentado em `docs/modelo-substancias-psicodelicos.md`. A estrutura-base é: definição → história → funcionamento → evidências → riscos → controvérsias → importância → fontes, com separação explícita entre evidência direta, evidência indireta, hipótese, relato subjetivo e alegação sem comprovação.


## Página de Vodou

Arquivos adicionados:

```text
artigos/vodou.html
src/styles/vodou.css
src/assets/images/vodou-jacmel-cerimonia.jpg
src/assets/images/vodou-jacmel-cerimonia.webp
src/assets/images/vodou-hispaniola-1723.jpg
src/assets/images/vodou-hispaniola-1723.webp
src/assets/images/og-vodou.jpg
```

Arquivos integrados ou atualizados:

```text
assuntos/religioes-espiritualidade.html
sitemap.xml
IMAGE-CREDITS.md
README.md
```

A página integra a coleção Religiões e espiritualidade em um agrupamento afro-diaspórico do Caribe. O conteúdo diferencia documentação histórica, tradição religiosa, interpretação antropológica, debate acadêmico e afirmações sobrenaturais. O sumário e os blocos sobre vèvè usam `<details>` nativo; a página não adiciona JavaScript nem controles próprios de leitura ou text-to-speech.

## Página de Hoodoo

Arquivos adicionados:

```text
artigos/hoodoo.html
src/styles/hoodoo.css
src/assets/images/hoodoo-conjure-bottles.jpg
src/assets/images/hoodoo-conjure-bottles.webp
src/assets/images/hoodoo-william-wells-brown.jpg
src/assets/images/hoodoo-william-wells-brown.webp
src/assets/images/og-hoodoo.jpg
```

A página integra a coleção Religiões e espiritualidade em “Tradições afro-diaspóricas dos Estados Unidos”. O artigo separa registro histórico, interpretação acadêmica, tradição espiritual e alegações sobrenaturais; usa apenas HTML/CSS e não cria controles de leitura ou TTS.

## Página de Povos Ciganos

Arquivos adicionados:

```text
artigos/povos-ciganos.html
src/styles/povos-ciganos.css
src/scripts/povos-ciganos.js
src/assets/images/povos-ciganos-sinti-roma-1941.jpg
src/assets/images/povos-ciganos-sinti-roma-1941.webp
```

A página é uma reportagem histórico-cultural baseada em evidências sobre origem, diáspora, diversidade Roma/Sinti/Calon, anticiganismo, genocídio, Brasil, oralidade e literatura. Por limitação da taxonomia principal atual, está indexada em `Religiões e espiritualidade` dentro do agrupamento “Povos e identidades culturais”, com nota explícita de que identidade Roma não é tratada como religião. A navegação lateral recebe aprimoramento progressivo por JavaScript para indicar a seção visível; referências expansíveis e todo o conteúdo principal funcionam sem JavaScript. Nenhum controle de leitura, narração ou TTS é criado.


## Página de Religião Tradicional Iorubá

Arquivos adicionados:

```text
artigos/religiao-tradicional-ioruba.html
src/styles/religiao-tradicional-ioruba.css
src/assets/images/religiao-tradicional-ioruba-osun-osogbo.jpg
src/assets/images/religiao-tradicional-ioruba-osun-osogbo.webp
src/assets/images/religiao-tradicional-ioruba-ifa-porta.jpg
src/assets/images/religiao-tradicional-ioruba-ifa-porta.webp
src/assets/images/og-religiao-tradicional-ioruba.jpg
```

A página integra a coleção Religiões e espiritualidade em “Tradições religiosas africanas”. O conteúdo diferencia história documentada, tradição religiosa, cosmologia, filosofia e interpretação; apresenta Yorubaland, Òrìṣà, Ifá, ética, transformação histórica, diáspora e Brasil. A interação editorial usa apenas HTML nativo (`<details>`) e CSS; não adiciona JavaScript específico nem controles próprios de leitura, narração ou TTS.


## Página de Paganismo

Atualização editorial adicionada em agosto de 2026.

- `artigos/paganismo.html` — página longa que separa religiões antigas, história da categoria “paganismo” e movimentos pagãos modernos.
- `src/styles/paganismo.css` — identidade visual documental em pedra, musgo, cobre e papel envelhecido, responsiva e compatível com `prefers-reduced-motion`.
- `src/scripts/paganismo.js` — aprimoramento progressivo da navegação lateral e dos filtros de referências; o conteúdo permanece acessível sem JavaScript.
- `assuntos/religioes-espiritualidade.html` — integração na coleção em “Movimentos e tradições modernas”.
- `sitemap.xml` — inclusão da URL canônica da página.
- `IMAGE-CREDITS.md` — créditos e licenças dos materiais documentais.
- Não há `speechSynthesis`, TTS, narração automática ou recurso próprio de leitura.
