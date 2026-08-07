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
glossário e aviso de saúde. Inclui controle de tamanho de texto e botão “Voltar ao topo”.


## Página de Transtorno de Personalidade Borderline

Arquivos adicionados:

```text
artigos/borderline.html
src/styles/borderline.css
src/scripts/borderline.js
src/assets/images/borderline-regulacao-identidade.svg
src/assets/images/og-borderline.jpg
```

A página apresenta o TPB em leitura progressiva, com resumo essencial, história do diagnóstico, modelo biopsicossocial, sintomas, fases da vida, prognóstico, comorbidades, diagnóstico diferencial, segurança, psicoterapias, medicamentos, evidências recentes, mitos, apoio, fronteiras da evidência e referências verificáveis. Inclui ajuste de fonte, alto contraste e botão “Voltar ao topo”.


## Página de Terapia Cognitivo-Comportamental

Arquivos adicionados:

```text
artigos/terapia-cognitivo-comportamental.html
src/styles/tcc.css
src/scripts/tcc.js
src/assets/images/tcc-ciclo-aprendizagem.svg
src/assets/images/og-tcc.jpg
```

A página apresenta a TCC como família de psicoterapias, corrige a confusão entre terapia e diagnóstico, organiza sua história em linha do tempo, inclui diagrama cognitivo-comportamental interativo, conceitos e técnicas expansíveis, etapas de tratamento, tabela filtrável de aplicações clínicas, comorbidades, painel da meta-análise de 2025, TCC digital, limitações e referências verificáveis. Inclui ajuste de fonte e botão “Voltar ao topo”.


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

A página apresenta o Judaísmo em leitura progressiva, distinguindo tradição religiosa e reconstrução histórica. Inclui formação israelita e judaíta, exílio, Segundo Templo, Judaísmo rabínico, correntes contemporâneas, valores, Torá, Tanakh, Mishná, Talmude, Midrash, filosofia, diversidade cultural, antissemitismo, mitos, FAQ e referências próximas às afirmações. Inclui ajuste de fonte.


## Revisão editorial global — agosto de 2026

- cabeçalho global atualizado para refletir o escopo atual do projeto;
- breadcrumbs adicionados aos artigos e coleções;
- página inicial passou a mostrar páginas em destaque, mantendo os catálogos completos nas coleções;
- coleções reorganizadas em grupos editoriais;
- títulos longos usam tipografia mais legível;
- referências inline e etiquetas editoriais receberam tamanho maior;
- recurso de leitura em voz alta removido integralmente das páginas e scripts;
- permanecem recursos estruturais de acessibilidade como navegação por teclado, foco visível, texto alternativo e redução de movimento.

**Regra do projeto:** não incluir síntese de voz/leitura automática das páginas, salvo nova solicitação explícita.


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
