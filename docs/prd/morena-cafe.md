# PRD — Morena Café e Gastronomia (refatoração completa)

> Tipo: PRD inicial · Data: 2026-10-25
> **Status:** Aguardando implementação
>
> <!-- Valores possíveis: "Aguardando implementação" | "Implementada". Atualize para "Implementada" quando todas as specs estiverem concluídas. -->

## 1. Visão geral

A Morena Café e Gastronomia precisa de uma landing page institucional publicada na
internet, com uma hero animada pela rolagem: um vídeo de espresso enchendo uma xícara
avança conforme o usuário desce a página, enquanto três frases entram e saem em cena.

Hoje esse site existe como um arquivo HTML único, sem build, sem repositório e sem
deploy. Esta entrega refaz o produto do zero técnica e visualmente: mesma estrutura de
seções e mesmo comportamento da hero, implementado com Next.js + TypeScript, com
identidade visual própria, repositório no GitHub, testes, ganchos de qualidade e
publicação automática na Vercel.

É um exercício de aprendizado completo — do planejamento ao deploy — mas o resultado
deve ser uma página pronta para publicação real.

## 2. Problema que resolve

O site atual não pode ser publicado nem mantido: não há repositório versionado, nem
pipeline de qualidade, nem deploy, e todo o conteúdo de valor (preços, endereço,
depoimentos, história) está preenchido com marcadores provisórios. Além disso, o visual
atual é genérico — fundo creme, serifa de sistema e acento terracota — e não traduz a
marca "acolhedora, calma e sofisticada sem ser formal".

Quem sofre: o dono do projeto, que não tem como publicar, evoluir ou confiar nas
mudanças do próprio site; e o visitante final, que chega a uma página sem dados de
contato utilizáveis e com um visual que não diferencia a Morena de qualquer outro café.

## 3. Público-alvo

- **Primário:** pessoa que descobre a Morena por indicação ou redes sociais e quer
  responder rápido três perguntas: _o que esse lugar é, o que servem e como falo com
  eles?_ Ela navega no celular, com pressa, e decide em poucos segundos se vale a visita.
- **Secundário:** o próprio aprendiz/dev dono do projeto, para quem o repositório, os
  testes e a documentação são parte do valor entregue.

Recorte explícito: **não** é público de programação que consome o código, **não** é
cliente fiel que já conhece o cardápio, **não** é público internacional (site em
português do Brasil).

## 4. Objetivo do recorte atual

Refazer o site da Morena como aplicação Next.js + TypeScript, preservando o produto
(seções e comportamento da hero), entregando: identidade visual própria, qualidade de
código verificável (lint, tipos estritos, testes, ganchos de commit), repositório
público `morena-cafe` no GitHub com `main` como branch padrão, e deploy automático de
produção na Vercel a cada push na `main` — tudo documentado em `README.md`, `docs/` e um
`AGENTS.md` reescrito.

## 5. Funcionalidades

**Essenciais:**

- Hero em tela cheia com vídeo sincronizado à rolagem e três frases sequenciais.
- As mesmas sete seções do site atual: cabeçalho fixo, hero, sobre, cardápio,
  depoimentos, faixa de CTA, contato + rodapé.
- Navegação por âncoras (Sobre, Cardápio, Contato).
- Identidade visual própria, com paleta em tons de café e tipografia de marca.
- Formulário de contato com validação visual (sem envio neste ciclo).
- Suporte completo a `prefers-reduced-motion`.
- Responsividade (mobile-first) e acessibilidade básica verificável.
- Testes automatizados de comportamento da hero e das seções críticas.
- Pre-commit com formatação, checagem de tipos e testes.
- Repositório público no GitHub e deploy automático na Vercel.
- Documentação: `README.md`, `docs/project-overview.md`, `docs/architecture.md`,
  `AGENTS.md` reescrito.

**Desejáveis:**

- Lighthouse (performance + acessibilidade + boas práticas + SEO) ≥ 90 nas quatro
  categorias, medido no deploy.
- Efeito de entrada discreto nas seções abaixo da hero, sem competir com ela.
- Layout de cardápio que continua legível quando os preços ainda são marcadores.

**Fora do escopo** (detalhado na seção 6).

## 6. Fora do escopo

- Envio real do formulário (serviço de e-mail, API, backend, spam protection).
- Preenchimento de conteúdo real: história, preços, prato da casa, depoimentos,
  endereço, horário, WhatsApp, Instagram — permanecem como marcadores `[...]`.
- Substituição do vídeo por frames em `<canvas>` (continua como problema conhecido,
  decidido apenas se a performance real exigir).
- Domínio próprio e configuração de DNS.
- Testes end-to-end com navegador (Playwright) — adiado para ciclo futuro.
- CMS, blog, cardápio em rota própria, reservas, sistema de pedidos, i18n, login,
  painel administrativo, analytics/cookies.
- Regeneração ou edição dos arquivos de vídeo/poster — são assets aprovados.

## 7. Regras de negócio

- **R1:** Nenhum dado real pode ser inventado. Enquanto o usuário não fornecer conteúdo
  (preços, endereço, horário, WhatsApp, Instagram, depoimentos, história, prato da casa),
  os textos permanecem como marcadores entre colchetes.
- **R2:** A hero é o elemento central: a rolagem controla o progresso do vídeo **e** a
  troca das três frases, na ordem fixa fase 0 → fase 1 → fase 2. Não pode ser removida,
  substituída por carrossel ou trocada por reprodução automática.
- **R3:** Com `prefers-reduced-motion: reduce` ativo, a página não anima nada: a hero
  mostra o pôster estático com apenas a primeira frase, e as demais seções aparecem sem
  movimento.
- **R4:** O site é integralmente em português do Brasil (`lang="pt-BR"`), com
  acentuação correta.
- **R5:** A paleta é sempre expressa em variáveis/tokens de design; valores de cor
  fixos espalhados no código são erro de implementação.
- **R6:** Cada commit precisa passar por formatação, checagem de tipos e testes antes de
  ser aceito. Commit que quebra o gate não entra na `main`.
- **R7:** Push na `main` dispara deploy automático de produção; o site no ar deve ser
  sempre reflexo do último commit da `main`.
- **R8:** Textos e contatos da marca não podem ser alterados implicitamente durante o
  redesign: copy funcional da hero e das seções só muda se o usuário pedir. O redesenho
  altera **aparência**, não mensagem.

## 8. Fluxos principais

### Fluxo 1 — Visitante descobre a Morena e busca contato

1. Visitante abre a página (celular ou desktop).
2. Vê a hero com o vídeo do espresso avançando conforme rola; a frase 1 ("Um momento
   para saborear") dá lugar à frase 2 e depois à frase 3.
3. Clica em "Ver cardápio" (na frase 1) ou rola até a seção de cardápio.
4. Navega por Sobre e Cardápio pelo cabeçalho fixo.
5. Chega em "Contato", lê endereço/horário/WhatsApp (marcadores no primeiro deploy).
6. Opcionalmente preenche o formulário e envia — recebe validação local; o envio
   de fato não ocorre neste ciclo e isso é esperado.

### Fluxo 2 — Visitante com movimento reduzido

1. Sistema operacional do visitante tem movimento reduzido ativo.
2. A página carrega sem rolagem animada: hero estática com pôster e a primeira frase.
3. Toda a navegação por âncoras e leitura do conteúdo funciona normalmente, sem
   transições.

### Fluxo 3 — Dev publica uma alteração

1. Edita o projeto localmente e roda os testes/tipos.
2. Faz commit: o gancho de pré-commit executa formatação, tipos e testes; se algo
   falha, o commit é bloqueado e nada vai para o repositório.
3. Push para a `main` no GitHub.
4. A Vercel detecta o push, builda e publica a nova versão em produção
   automaticamente.

## 9. Critérios de aceite

- O usuário consegue ver a hero com o vídeo sincronizado à rolagem e as três frases na
  ordem correta, em desktop e celular.
- O usuário consegue navegar por Sobre, Cardápio e Contato pelos âncoras do cabeçalho,
  com foco de teclado visível.
- O sistema deve exibir exatamente as seções listadas na seção 5, nenhuma a menos.
- O sistema deve manter os marcadores `[...]` de todo conteúdo ainda não fornecido.
- O sistema não deve inventar preços, endereço, horário, depoimento ou histórico da
  marca.
- Quando `prefers-reduced-motion` está ativo, o sistema não deve executar nenhuma
  animação de rolagem e deve mostrar a hero estática com a primeira frase.
- Quando um campo do formulário está vazio ou inválido, o sistema deve indicar o erro
  antes do envio, sem apagar o que o usuário digitou.
- Quando o formulário é enviado sem backend configurado, o sistema não deve fingir que
  a mensagem foi entregue.
- Quando o commit tem erro de tipo, teste ou formatação, o sistema deve bloquear o
  commit.
- Quando há um push na `main`, o sistema deve publicar a nova versão na Vercel sem
  ação manual.
- O site deve alcançar Lighthouse ≥ 90 nas quatro categorias no deploy.
- O site deve ter `lang="pt-BR"` e textos acentuados corretamente.

## 10. Stack

- **Framework:** Next.js (App Router) com React e TypeScript em modo estrito.
- **Estilo:** Tailwind CSS v4 + shadcn/ui como base de componentes.
- **Animação:** GSAP + ScrollTrigger **exclusivamente** para a hero (rolagem +
  scrub do vídeo); Framer Motion (Motion) para as animações das demais seções.
- **Qualidade:** ESLint (config oficial Next.js + TypeScript), Prettier, Vitest +
  Testing Library.
- **Ganchos:** Husky + lint-staged no pré-commit.
- **Repositório:** GitHub, repositório público `morena-cafe`, branch `main` padrão.
- **Deploy:** Vercel com integração Git (deploy de produção automático na `main`).
- **Documentação:** `README.md`, `docs/project-overview.md`, `docs/architecture.md`,
  `AGENTS.md` reescrito.

## 11. Justificativa da stack

Next.js + TypeScript + Tailwind + shadcn foi a stack pedida e é a combinação padrão
para landing pages profissionais hoje: renderização estática rápida, tipagem que
captura erros antes do deploy e componentes acessíveis prontos sem construir do zero.

GSAP permanece na hero porque é a ferramenta que já provou o efeito (scrub de vídeo
sincronizado à rolagem com suavização) — trocar a mecânica que funciona é o risco mais
alto do refactor. Framer Motion cobre o resto da página, onde o que se precisa é
entrada, hover e listas — casos simples, para os quais ele é mais idiomático em React.

Vitest + Testing Library porque o comportamento crítico (reduced motion, montagem da
hero, ordem das frases) é testável em jsdom sem navegador. A Vercel é a hospedagem
natural de projetos Next.js e o deploy por Git elimina passo manual entre commit e
produção.

## 12. Fases de construção

### Fase 1 — Fundação

Objetivo: projeto novo que builda, tipa e linta, com identidade visual definida.

Specs:

- Spec 01 — Identidade visual e tokens de design
- Spec 02 — Estrutura de páginas, seções e navegação

### Fase 2 — Experiência principal

Objetivo: a hero animada com a mesma mecânica de hoje, mais o apoio animado das demais
seções.

Specs:

- Spec 03 — Hero com vídeo sincronizado à rolagem
- Spec 04 — Animações de apoio nas seções

### Fase 3 — Conteúdo e conversão

Objetivo: todas as seções com conteúdo, marcadores preservados e contato utilizável.

Specs:

- Spec 05 — Seções de conteúdo (sobre, cardápio, depoimentos, CTA)
- Spec 06 — Contato: dados de localização e formulário validado

### Fase 4 — Qualidade, publicação e documentação

Objetivo: o projeto vira um repositório profissional publicado.

Specs:

- Spec 07 — Acessibilidade e responsividade
- Spec 08 — Performance
- Spec 09 — Testes automatizados
- Spec 10 — Pipeline de qualidade e ganchos de commit
- Spec 11 — Publicação (GitHub + Vercel)
- Spec 12 — Documentação e reescrita do AGENTS.md

## 13. Specs funcionais detalhadas

> Cada spec deve ser autossuficiente: um agente de codificação vai ler SÓ esta spec
> (mais as dependências) para montar o plano técnico e implementar.

### Spec 01 — Identidade visual e tokens de design

- **Fase:** Fase 1
- **Objetivo (o quê):** Estabelecer a direção visual da Morena como sistema de design
  aplicável: paleta em tons de café expressa em tokens, tipografia de marca (títulos e
  texto) e regras de composição que dão à página um caráter próprio e reconhecível.
- **Intenção (por quê):** O visual atual é o clichê "página gerada por IA" (creme quente,
  serifa de sistema, terracota) e não diferencia a marca. Como a entrega é um exercício
  de design também, o sistema visual é produto, não decoração — e é ele que garante
  consistência quando o código crescer.
- **Contexto:** Refatoração completa; a marca já tem tom definido (acolhedor, calmo,
  sofisticado sem ser formal) e paleta em tons de café que **não pode ser abandonada**.
  A referência de estilo é um site premium com líquido 3D em movimento, adaptado aqui
  para o mundo do café.
- **Atores:** Dev que implementa; visitante que percebe a identidade.
- **Descrição do comportamento:** O sistema define e aplica: (a) paleta de tokens
  derivada dos tons de café (fundo escuro, tom médio, creme, caramelo, dourado) usada em
  **todo** lugar — qualquer cor escrita literalmente fora dos tokens é erro; (b) par de
  tipografias com papéis claros — uma display para títulos e uma de texto para corpo,
  ambas distintas das fontes de sistema atuais (Georgia e system-ui saem); (c) escala
  tipográfica coerente com títulos em `clamp()` para não estourar em telas pequenas;
  (d) regras de composição: alinhamento intencional por seção, ritmo de espaçamento
  consistente e **um único elemento de destaque ousado** na página (a hero), com
  tudo ao redor disciplinado.
- **Entradas e saídas:** Entrada: tom da marca, paleta de café, conteúdo existente.
  Saída: sistema visual aplicado na página inteira — leitura consistente entre hero,
  seções claras, seções escuras, cards, botões e formulário.
- **Dados/entidades envolvidos (conceitual):** Token de cor (nome, valor, papel);
  papel tipográfico (display/texto, família, pesos); regra de escala (tamanho rem/clamp).
- **Estados e transições:** Não se aplica — é fundação estática.
- **Regras de negócio:** R1 (nada de dado real inventado não se aplica aqui — é visual),
  R4 (pt-BR), R5 (tokens obrigatórios), R8 (copy funcional não muda: o redesenho não
  reescreve a mensagem das frases e das seções).
- **Validações:** Todos os valores de cor passam pelos tokens; contraste texto/fundo
  precisa ser legível (ver Spec 07); nenhuma família de fonte de sistema pode ser usada
  como display.
- **Fluxo do usuário (passo a passo):**
  1. Visitante abre a página e lê títulos e corpo em tipografias distintas e
     consistentes.
  2. Ele identifica o tom "café" sem ler nenhuma palavra de marca — cor e tipografia
     já comunicam.
- **Casos de borda e erros:** Texto longo em tela pequena (a escala usa clamp e não
  estoura); seção clara e escura com o mesmo componente (os tokens resolvem o contraste,
  não há código duplicado); tokens ausentes para um novo elemento (criar token, nunca
  cor literal).
- **Impacto no existente:** Substitui integralmente o CSS visual atual; nenhuma
  funcionalidade é afetada.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que o código contém uma cor literal fora dos tokens Quando qualquer arquivo de
    estilo é revisado Então não há valores hexadecimais fora da definição dos tokens.
  - Dado que um título e um parágrafo são exibidos Quando comparados Então usam
    famílias tipográficas diferentes de Georgia/system-ui e a hierarquia é perceptível.
  - Dado que a janela é redimensionada de 320px a 1920px Quando os títulos são vistos
    Então nenhum texto transborda ou quebra linha de forma arbitrária.
  - Dado que a paleta é revisada Quando olhada Como conjunto Então ela permanece
    reconhecível como "tons de café".
- **Definição de pronto:** Página inteira estilizada só com tokens, tipografia de marca
  aplicada, e um documento de decisão visual registrado na arquitetura.
- **Dependências:** Nenhuma — primeira spec da Fase 1.
- **Fora do escopo desta spec:** Definir conteúdo de texto novo; animações (Spec 04);
  escolher imagens/fotografia além dos assets de vídeo já aprovados.

### Spec 02 — Estrutura de páginas, seções e navegação

- **Fase:** Fase 1
- **Objetivo (o quê):** Reproduzir a arquitetura de uma única view com as sete partes
  do site atual — cabeçalho fixo, hero, sobre, cardápio, depoimentos, faixa de CTA,
  contato e rodapé — com navegação por âncoras funcional.
- **Intenção (por quê):** O escopo fechado é "mesma estrutura de seções"; o visitante
  precisa continuar encontrando as coisas no mesmo lugar. É a espinha dorsal na qual as
  demais specs encaixam.
- **Contexto:** Site atual tem exatamente essa divisão. O cabeçalho fixo some no mobile
  hoje — nesta entrega ele precisa continuar acessível no celular (ver comportamento
  abaixo).
- **Atores:** Visitante (navega), leitor de tela.
- **Descrição do comportamento:** A página renderiza as sete partes na ordem: cabeçalho
  fixo no topo com logo e links Sobre/Cardápio/Contato; hero em tela cheia ocupando a
  primeira dobra; seção Sobre; seção Cardápio com grade de cards; seção de depoimentos;
  faixa de CTA com botão; seção Contato com dados de localização + formulário; rodapé
  com crédito e ano. Os links do cabeçalho levam às seções correspondentes com
  deslocamento suave, **inclusive no celular** — onde hoje a navegação é simplesmente
  escondida, o que impede o acesso por toque. O cabeçalho permanece visível durante a
  rolagem sem cobrir o conteúdo das seções.
- **Entradas e saídas:** Entrada: ação de clique/toque nos links. Saída: viewport
  posicionada na seção de destino; seção corrente refletida na navegação.
- **Dados/entidades envolvidos (conceitual):** Seção (âncora, título, ordem); item de
  navegação (rótulo, destino).
- **Estados e transições:** Estado padrão e estado com foco de teclado em cada link;
  cabeçalho em repouso sobre a hero e sobre o conteúdo.
- **Regras de negócio:** R4 (rótulos em pt-BR: Sobre, Cardápio, Contato); R8 (rótulos
  funcionais não mudam).
- **Validações:** Todo link de navegação aponta para uma seção que existe; nenhuma
  seção da lista da seção 5 pode faltar.
- **Fluxo do usuário (passo a passo):**
  1. Visitante toca em "Cardápio" no celular.
  2. A página desliza suavemente até o cardápio.
  3. Ele toca em "Contato" e chega ao formulário.
- **Casos de borda e erros:** Âncora alvo inexistente (não pode acontecer — validado
  pelos critérios); rolagem com movimento reduzido (deslocamento instantâneo, sem
  suavização — R3); cabeçalho fixo sobre texto (espaçamento compensado).
- **Impacto no existente:** Mantém a mesma ordem de seções do site atual; a mudança é
  a navegação mobile, que passa de inexistente para funcional.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que o site está aberto no celular Quando o visitante toca em "Contato" Então a
    página leva à seção de contato e o link continua visível para novo toque.
  - Dado que a lista de seções da especificação é conferida Quando a página é vista
    Então todas elas existem, na ordem.
  - Dado que o visitante navega por teclado Quando ele Tab até um link Então o foco é
    claramente visível.
  - Dado que movimento reduzido está ativo Quando um link é ativado Então a seção
    aparece sem animação de deslocamento.
- **Definição de pronto:** Todas as sete partes renderizam, âncoras funcionam em
  desktop e mobile, foco visível.
- **Dependências:** Spec 01 — usa os tokens e a tipografia.
- **Fora do escopo desta spec:** Menu hambúrguer animado com overlay (a solução de
  navegação mobile pode ser mais simples, contanto que seja funcional); conteúdo real
  das seções (Spec 05/06).

### Spec 03 — Hero com vídeo sincronizado à rolagem

- **Fase:** Fase 2
- **Objetivo (o quê):** Entregar a hero em tela cheia em que a rolagem do usuário
  controla simultaneamente o progresso do vídeo do espresso e a troca de três frases,
  com queda limpa para modo estático quando o usuário pede movimento reduzido.
- **Intenção (por quê):** É o efeito central e a razão de existir da página — a
  referência visual que motivou o projeto. Toda a primeira dobra existe para esse
  momento; se ele falhar, o produto falha.
- **Contexto:** Existem três assets aprovados que não podem ser regenerados nem
  renomeados: vídeo WebM, vídeo MP4 e pôster JPG, nomes fixos. Hoje o efeito é feito com
  GSAP + ScrollTrigger (fixação da seção + scrub do `currentTime`), e essa mecânica é a
  que funciona — a decisão confirmada é **manter GSAP/ScrollTrigger nesta spec**,
  isolado do restante da página, com Framer Motion fora daqui.
- **Atores:** Visitante (rola), visitante com movimento reduzido, navegador.
- **Descrição do comportamento:** Ao rolar sobre a hero, o vídeo avança do primeiro ao
  último frame em proporção direta à rolagem, com suavização (o progresso não "pula"
  entre frames). As três frases trocam em momentos fixos dessa progressão: a frase 1 sai
  e a frase 2 entra; depois a frase 2 sai e a frase 3 entra. A frase 1 carrega o título
  principal e o botão "Ver cardápio"; a frase 3 carrega o botão "Fale com a gente"; a
  frase 2 não tem botão. A hero é "fixada": enquanto a sequência não termina, a rolagem
  avança a animação em vez de empurrar a página; ao final, a página segue normalmente
  para a seção Sobre. O vídeo nunca toca sozinho: ele só avança com a rolagem. Se o
  metadado do vídeo não estiver disponível, a hero não quebra — exibe o pôster e monta a
  animação quando os dados chegarem. Com movimento reduzido: sem fixação, sem scrub,
  vídeo oculto, pôster estático, apenas a primeira frase visível e a página segue
  direto para o conteúdo.
- **Entradas e saídas:** Entrada: posição de rolagem do usuário; preferência de sistema
  por movimento reduzido; metadados do vídeo. Saída: `currentTime` do vídeo na tela;
  opacidade/posição das três frases; altura de rolagem consumida pela hero.
- **Dados/entidades envolvidos (conceitual):** Frase (ordem/fase 0–2, etiqueta,
  título, texto, ação opcional); vídeo (duração, formato, pôster); progresso de rolagem
  (0→1 ao longo da hero).
- **Estados e transições:** Estado inicial (frase 1 visível, vídeo no frame 0);
  transição frase 1→2; transição frase 2→3; estado final (frase 3 visível, vídeo no
  último frame); estado reduzido (estático); estado pré-carregamento (pôster).
- **Regras de negócio:** R2 (ordem fixa das frases, rolagem manda no vídeo, sem
  autoplay); R3 (reduced motion); R8 (textos das três frases são copy funcional e não
  mudam).
- **Validações:** Duração do vídeo é usada só quando conhecida; a montagem precisa
  liberar tudo o que registrou quando o componente desmonta (nenhum listener ou
  observador sobrevive); nenhuma dependência externa de CDN — tudo é dependência do
  projeto, versionada.
- **Fluxo do usuário (passo a passo):**
  1. Visitante abre a página: vê vídeo parado no frame inicial e a frase 1.
  2. Rola para baixo: o vídeo avança e a frase 1 desaparece para dar lugar à frase 2.
  3. Continua rolando: frase 2 sai, frase 3 entra, vídeo chega ao fim.
  4. Rola mais: a hero libera e a seção Sobre aparece.
  5. Volta ao topo: tudo retorna ao estado inicial na mesma ordem.
- **Casos de borda e erros:** Vídeo WebM não suportado pelo navegador (usa MP4); vídeo
  ainda sem metadados (pôster + montagem adiada); duração não numérica (a animação não
  pode propagar `NaN`); rolagem rápida para baixo e para cima (estados das frases
  sempre coerentes com a posição); componente desmontar no meio (limpeza total);
  redimensionar a janela durante a animação (a área de rolagem recalcula); movimento
  reduzido ligado **depois** do carregamento (não é obrigatório detectar em tempo real,
  mas não pode quebrar se o sistema mudar antes do carregamento); navegador sem
  JavaScript (a frase 1 e o pôster continuam legíveis).
- **Impacto no existente:** Substitui a implementação atual mantendo o mesmo contrato
  visual (três frases, mesma ordem, mesmos botões, mesmos assets).
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que o visitante rola dentro da hero Quando o progresso passa pelo primeiro
    terço Então a frase 1 dá lugar à frase 2 e o vídeo avança na mesma proporção.
  - Dado que o visitante rola até o fim da hero Quando chega ao limite Então o vídeo
    está no último frame, a frase 3 está visível e a página segue para o Sobre.
  - Dado que movimento reduzido está ativo Quando a página carrega Então não há
    fixação nem rolagem animada: pôster + frase 1 apenas.
  - Dado que o navegador não entende o formato WebM Quando o vídeo carrega Então o MP4
    é usado e o efeito funciona igual.
  - Dado que o visitante rola rápido para cima e para baixo Quando observa as frases
    Então nenhuma frase fica visível junto com outra.
  - Dado que a hero é montada e desmontada várias vezes Quando os listeners são
    conferidos Então nenhum observador órfão permanece.
- **Definição de pronto:** Efeito funcionando em desktop e celular, reduced motion
  funcional, testes automatizados cobrindo os casos acima, sem dependência de CDN.
- **Dependências:** Spec 01 (tokens/estilo da hero) e Spec 02 (posição da hero na
  página). Requer os três assets de vídeo aprovados, com os nomes atuais.
- **Fora do escopo desta spec:** Trocar vídeo por frames em canvas; novo conteúdo de
  texto; autoplay em backgrounds de outras seções.

### Spec 04 — Animações de apoio nas seções

- **Fase:** Fase 2
- **Objetivo (o quê):** Adicionar animação discreta às seções abaixo da hero — entradas
  quando a seção chega à tela, estados de hover em cards e botões — usando Framer
  Motion, sem competir com a hero.
- **Intenção (por quê):** A página precisa parecer viva depois do espetáculo da hero,
  mas motion espalhado é o clichê que a direção de design rejeita: uma entrada única e
  bem resolvida por bloco, e motion que responde à ação do usuário (hover, clique).
  Também é aqui que a `framer-motion-animator` entra, cumprindo a decisão de escopo da
  animação.
- **Contexto:** Spec 03 já cobre a hero com GSAP — esta spec é explicitamente o resto
  da página. Nenhuma animação pode rodar quando movimento reduzido está ativo.
- **Atores:** Visitante.
- **Descrição do comportamento:** Quando uma seção abaixo da hero entra na viewport,
  seu conteúdo faz uma entrada curta e única (deslocamento vertical curto + opacidade),
  uma vez por visita — elementos não re-animam a cada rolagem para cima e para baixo.
  Cards do cardápio e botões respondem a hover/foco com variação sutil de posição ou
  cor, usando as propriedades aceleradas pela GPU (opacidade e transformação — nunca
  animar largura, altura ou posições de layout, que causam reflow). Nada disso roda com
  movimento reduzido: nesse modo todos os elementos aparecem imediatamente no lugar.
- **Entradas e saídas:** Entrada: seção entrando na viewport; hover/foco/tap em
  card ou botão. Saída: estado animado ou repouso.
- **Dados/entidades envolvidos (conceitual):** Elemento animado (tipo: seção, card,
  botão; regra de entrada; regra de interação).
- **Estados e transições:** Oculto → visível (entrada única); repouso → hover/foco →
  repouso.
- **Regras de negócio:** R3 (nada anima com movimento reduzido); R5 (cores vindas dos
  tokens).
- **Validações:** Animações usam apenas propriedades compostas (transform/opacity);
  entrada dispara uma única vez por elemento; a hero não é reenvolvida por esta spec.
- **Fluxo do usuário (passo a passo):**
  1. Visitante rola até o cardápio.
  2. Os cards entram com uma curva curta, uma vez.
  3. Ele passa o dedo/ mouse sobre um card e ele responde sutilmente.
- **Casos de borda e erros:** Seção já visível no carregamento (aparece sem esperar
  rolagem infinita); movimento reduzido (sem entradas); navegador sem suporte a
  animação compositor (o conteúdo continua legível — animação é enfeite, nunca
  requisito de visibilidade).
- **Impacto no existente:** Adiciona motion onde hoje só existe hover em CSS; não
  altera layout nem conteúdo.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que o visitante rola até uma seção Quando ela entra na tela Então o conteúdo
    aparece com uma entrada curta, uma única vez.
  - Dado que movimento reduzido está ativo Quando qualquer seção é exibida Então nada
    anima: tudo já está no lugar.
  - Dado que um card é hoverizado Quando observa o elemento Então não há reflow (a
    caixa dos vizinhos não se move).
  - Dado que a hero é observada Quando as animações de seção rolam Então a hero mantém
    seu próprio controle de rolagem intacto.
- **Definição de pronto:** Entradas e interações ativas fora da hero, respeitando
  reduced motion, sem conflito com o ScrollTrigger.
- **Dependências:** Spec 01 (tokens), Spec 02 (seções), Spec 03 (não invadir a hero).
- **Fora do escopo desta spec:** Parallax, carrosséis, efeitos de texto letra a letra,
  animações de scroll dentro da hero.

### Spec 05 — Seções de conteúdo (sobre, cardápio, depoimentos, CTA)

- **Fase:** Fase 3
- **Objetivo (o quê):** Renderizar as seções Sobre, Cardápio, Depoimentos e a faixa de
  CTA com o conteúdo atual — texto real onde existe, marcadores `[...]` onde o dado real
  ainda não foi fornecido.
- **Intenção (por quê):** O site só é entregue quando toda a estrutura existe. O
  requisito central aqui é de **integridade de conteúdo**: a página deve estar pronta
  para receber dados reais sem tocar em código, e nunca pode apresentar dado inventado
  como se fosse verdade.
- **Contexto:** Dados reais (história, preços, prato, depoimentos) **não** existem e
  foram explicitamente mantidos como marcadores pela decisão de escopo. Isso é
  restrição de produto, não pendência de implementação.
- **Atores:** Visitante; dono do site (futuramente preenche os dados).
- **Descrição do comportamento:** Sobre exibe o título "Nossa história", o parágrafo
  com marcador da origem da marca e o parágrafo real sobre o espaço. Cardápio exibe
  grade com quatro cards: Espresso, Cappuccino e Café coado com descrições reais e preço
  `R$ [00,00]`, e um quarto card com título e descrição em marcador (futuro prato da
  casa). Depoimentos exibe três citações com autor em marcador. A faixa de CTA exibe
  título, texto e botão que leva ao contato. Cards são legíveis tanto na seção clara
  quanto no fundo escuro. A grade do cardápio se adapta de coluna única (celular) a
  várias colunas (desktop) sem quebrar cards.
- **Entradas e saídas:** Entrada: conteúdo estático definido na fonte. Saída: seções
  renderizadas com textos corretos e marcadores intactos.
- **Dados/entidades envolvidos (conceitual):** Item de cardápio (nome, descrição,
  preço); depoimento (citação, autor); bloco de texto de seção (título, parágrafos);
  marcador (texto entre colchetes indicando dado ausente).
- **Estados e transições:** Não se aplica (conteúdo estático); hover de card coberto
  pela Spec 04.
- **Regras de negócio:** R1 (nenhum dado inventado — marcadores permanecem intactos e
  verificáveis); R4 (pt-BR); R8 (copy funcional não é reescrita no redesign).
- **Validações:** Todo conteúdo ainda não fornecido aparece entre `[...]`; nenhum preço,
  nome de prato ou depoimento foi substituído por algo plausível-inventado.
- **Fluxo do usuário (passo a passo):**
  1. Visitante lê a história no Sobre (com marcador da origem).
  2. Vai ao Cardápio, vê quatro opções com preços provisórios.
  3. Vê três depoimentos com autores provisórios.
  4. Lê a faixa de CTA e clica, chegando ao Contato.
- **Casos de borda e erros:** Texto de marcador mais longo que o texto real (o layout
  comporta); quarto card ainda totalmente provisório (mesmo tratamento visual dos
  demais); grau de rolagem em celular (grade de uma coluna).
- **Impacto no existente:** Mantém textos atuais palavra por palavra; muda apenas a
  apresentação visual.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que a página é conferida Quando olhamos os preços Então todos são `R$ [00,00]`
    ou marcador equivalente.
  - Dado que os depoimentos são lidos Quando vemos os autores Então são marcadores.
  - Dado que o texto real existe (descrições de Espresso/Cappuccino/coado, parágrafo do
    espaço) Quando comparado com o original Então está preservado.
  - Dado que a grade do cardápio é vista em 320px Quando renderizada Então cards em
    coluna única, sem transbordo.
- **Definição de pronto:** Quatro seções no ar, marcadores verificados, copy original
  preservada.
- **Dependências:** Spec 01 (tokens), Spec 02 (estrutura), Spec 04 (entradas).
- **Fora do escopo desta spec:** Fornecer ou inventar conteúdo real; seção de contato
  (Spec 06).

### Spec 06 — Contato: dados de localização e formulário validado

- **Fase:** Fase 3
- **Objetivo (o quê):** Exibir os dados de localização da Morena (endereço, horário,
  WhatsApp, Instagram — ainda marcadores) e um formulário de contato com validação
  visual honesta, sabendo que o envio real não existe neste ciclo.
- **Intenção (por quê):** Contato é o ponto de conversão do site. O risco aqui é
  fingir funcionalidade: um formulário que diz "mensagem enviada" sem entregar nada
  quebra a confiança. A spec resolve o formulário de forma **veraz** — valida de
  verdade, e não promete o que não entrega.
- **Contexto:** Não há backend, serviço de e-mail nem chave de terceiros neste escopo
  (fora de escopo declarado). O dado real de contato também não existe.
- **Atores:** Visitante.
- **Descrição do comportamento:** A seção mostra título, endereço, horário, WhatsApp e
  Instagram, cada um com marcador provisório. O formulário tem nome, e-mail e mensagem,
  todos obrigatórios, com rótulos associados aos campos (leitores de tela enxergam o
  rótulo de cada campo). Ao tentar enviar com campo vazio ou e-mail malformado, o campo
  inválido é sinalizado visualmente (borda/mensagem) **sem apagar nada** do que foi
  digitado, e o foco vai para o primeiro campo com erro. Com tudo válido, o envio
  informa ao usuário, em linguagem clara, que o envio ainda não está ativo — nunca
  declara sucesso de entrega. O botão de envio é um botão de verdade (não um link
  disfarçado) e responde ao Enter do teclado.
- **Entradas e saídas:** Entrada: texto digitado nos três campos; ação de envio. Saída:
  estado de validação por campo; foco; mensagem de retorno honesta; nada é persistido
  em lugar nenhum.
- **Dados/entidades envolvidos (conceitual):** Mensagem de contato (nome, e-mail,
  texto); dado de localização (rótulo, valor provisório); estado de campo (válido,
  inválido, intocado).
- **Estados e transições:** Intocado → válido/inválido ao tentar enviar; envio
  disponível quando todos válidos; retorno exibido após tentativa.
- **Regras de negócio:** R1 (endereço/horário/WhatsApp/Instagram permanecem
  marcadores); R4 (pt-BR); nenhuma promessa falsa de entrega.
- **Validações:** E-mail precisa ter formato válido; vazio é erro em qualquer campo;
  erros somem quando o campo é corrigido; nada é apagado durante a validação; nenhum
  dado é enviado a terceiros nem armazenado.
- **Fluxo do usuário (passo a passo):**
  1. Visitante preenche nome, e-mail e mensagem.
  2. Envia com e-mail incompleto: campo de e-mail é sinalizado, texto preservado.
  3. Corrige: sinalização some.
  4. Envia válido: recebe retorno honesto de que o envio não está ativo.
- **Casos de borda e erros:** Espaços em branco contam como vazio; e-mail com formatos
  maliciosos (não precisa de segurança avançada, mas não pode quebrar o componente);
  envio repetido (não dispara nada, não duplica retorno); navegador sem JS (os campos
  são preenchíveis; o envio não tem para onde ir — comportamento do HTML puro é
  aceitável e honesto, pois `action` não finge serviço).
- **Impacto no existente:** Mantém a estrutura atual (três campos + botão); melhora a
  validação, que hoje não existe além do `required` nativo.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que o formulário está vazio Quando o visitante envia Então campos obrigatórios
    são sinalizados e nada digitado é apagado.
  - Dado que o e-mail tem formato inválido Quando enviado Então o campo é sinalizado e o
    foco vai até ele.
  - Dado que todos os campos são válidos Quando enviado Então o retorno informa que o
    envio ainda não está ativo — nunca diz "mensagem enviada".
  - Dado que a seção de contato é lida Quando vemos os dados Então continuam sendo
    marcadores `[...]`.
- **Definição de pronto:** Formulário com validação funcional e retorno honesto,
  marcadores de contato intactos, acessível por teclado e leitor de tela.
- **Dependências:** Spec 01 (tokens), Spec 02 (seção), Spec 04 (motion).
- **Fora do escopo desta spec:** Qualquer envio real (API, terceiro, backend, honeypot,
  CSRF); preencher endereço/horário/contatos reais.

### Spec 07 — Acessibilidade e responsividade

- **Fase:** Fase 4
- **Objetivo (o quê):** Garantir que a página inteira funcione e seja compreensível em
  telas de 320px a desktop largo, para teclado, leitor de tela e pessoas com preferência
  de movimento reduzido.
- **Intenção (por quê):** Acessibilidade não é item de lista: é o que separa "no ar" de
  "publicável". Além disso, o critério de aceite do projeto exige Lighthouse ≥ 90 em
  acessibilidade — essa spec é o que o garante de forma verificável.
- **Contexto:** Responsividade e reduced motion já têm comportamento definido nas Specs
  02/03/04 — esta spec é a **barreira de verificação** que pega o que faltar.
- **Atores:** Pessoa com deficiência ou restrição; usuário de teclado; usuário de
  celular pequeno.
- **Descrição do comportamento:** Hierarquia de títulos correta (um `h1` na página, na
  hero; seções com seus títulos em ordem sem saltos). Todo conteúdo informacional com
  contraste suficiente para leitura. Foco de teclado visível em links, botões e campos.
  Nenhum conteúdo depende exclusivamente de hover. A ordem de tabulação segue a ordem
  visual. Com movimento reduzido, **nenhuma** animação rola em nenhuma seção. Texto
  permanece legível com zoom do navegador a 200%. O vídeo da hero é decorativo (o
  conteúdo está nas frases) e não deve gerar ruído para leitores de tela — a primeira
  frase é o conteúdo textual da hero.
- **Entradas e saídas:** Entrada: navegação por teclado/leitor de tela/zoom/preferência
  de movimento. Saída: página inteiramente operável e legível.
- **Dados/entidades envolvidos (conceitual):** Contraste (par fundo/texto); foco
  (elemento, visibilidade); hierarquia (título, nível).
- **Estados e transições:** Foco visível/oculto; movimento reduzido ativo/inativo;
  largura de viewport mínima/máxima.
- **Regras de negócio:** R3 (reduced motion global); R4 (`lang="pt-BR"`).
- **Validações:** Sem erros de contraste detectados por ferramenta de auditoria; sem
  erros de axiomas básicos (landmarks, labels, headings) — ver Definição de pronto.
- **Fluxo do usuário (passo a passo):**
  1. Usuário só de teclado abre a página, Tab do cabeçalho ao rodapé.
  2. Cada parada mostra foco visível; Enter ativa links e botões.
  3. Usuário de leitor de tela percorre títulos na ordem e alcança os rótulos dos campos.
- **Casos de borda e erros:** Texto pequeno em telas de 320px (nada cortado, nada com
  scroll horizontal); foco sobre fundo escuro e claro (o anel de foco precisa ser
  visível nos dois); movimento reduzido ligado (nenhuma entrada da Spec 04 roda).
- **Impacto no existente:** Corrige o que a versão atual já tem de pendente (foco,
  contraste) e estende às seções novas.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que a página é auditada com ferramenta de acessibilidade Quando o relatório
    volta Então nenhum erro crítico/serio permanece.
  - Dado que a janela tem 320px Quando a página é rolada horizontalmente Então não há
    rolagem horizontal.
  - Dado que movimento reduzido está ativo Quando qualquer seção entra na tela Então
    não há animação.
  - Dado que o usuário Tab percorre a página Quando cada elemento recebe foco Então o
    foco é visível.
- **Definição de pronto:** Auditoria sem erros graves, todos os testes de reduced motion
  passando, sem transbordo em 320px.
- **Dependências:** Todas as anteriores (verifica o conjunto).
- **Fora do escopo desta spec:** Áudio descritivo, navegação por comandos de voz,
  localização de idiomas além de pt-BR.

### Spec 08 — Performance

- **Fase:** Fase 4
- **Objetivo (o quê):** Entregar a página carregando rápido — peso contido de vídeo e
  scripts, sem dependências de terceiros em tempo de carregamento — mantendo Lighthouse
  ≥ 90 nas quatro categorias no deploy.
- **Intenção (por quê):** O visitante decide em poucos segundos em celular móvel; a
  hero é pesada por natureza (vídeo), então o resto da página precisa ser enxuto o
  suficiente para o orçamento fechar. Também é critério de aceite explícito do projeto.
- **Contexto:** Problema conhecido do projeto: em aparelhos simples a rolagem fica
  pesada porque o vídeo é decodificado a cada movimento; a solução de frames em canvas
  está **fora do escopo** — esta spec entrega o que dá sem ela.
- **Atores:** Visitante em celular; auditoria Lighthouse.
- **Descrição do comportamento:** O servidor entrega a página pré-renderizada (nada de
  esperar JavaScript para mostrar o conteúdo textual). Os scripts de animação carregam
  sem bloquear a primeira pintura. Não há bibliotecas buscadas em CDN externa no
  carregamento — todas as dependências são do projeto, versionadas e cacheáveis. O
  arquivo de vídeo não é o gargalo da primeira dobra: o pôster renderiza imediatamente
  e o vídeo só precisa estar pronto quando a interação de rolagem começar. O formato
  WebM (mais leve) é oferecido primeiro, MP4 como compatibilidade. Fontes são carregadas
  com política que não pisca o texto.
- **Entradas e saídas:** Entrada: visita em conexão 4G simulada. Saída: conteúdo
  legível no menor tempo possível; Lighthouse ≥ 90.
- **Dados/entidades envolvidos (conceitual):** Recurso (vídeo, script, fonte, imagem);
  métrica (LCP, CLS, INP, tamanho de bundle).
- **Estados e transições:** Pré-carregamento (pôster) → interativo (vídeo pronto).
- **Regras de negócio:** R6/R7 indiretamente (build que não builda não publica).
- **Validações:** Nenhum `https://` de CDN externo em scripts/estilos/fontes; build
  passa; Lighthouse medido no deploy ≥ 90 nas quatro categorias.
- **Fluxo do usuário (passo a passo):**
  1. Visitante em 4G abre a URL.
  2. Texto e pôster aparecem antes de o vídeo terminar de carregar.
  3. Rola e a hero responde sem travar a leitura do resto da página.
- **Casos de borda e erros:** Vídeo ainda carregando quando a rolagem começa (a hero
  usa o que tem; o progresso não pode travar a página); conexão lenta (o conteúdo de
  texto nunca depende do vídeo); navegador sem WebM (MP4).
- **Impacto no existente:** Melhora o cenário atual (hoje há dois vídeos com
  `preload="auto"` e GSAP via CDN — dois gargalos removidos).
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que o deploy está no ar Quando Lighthouse roda Então as quatro categorias ≥ 90.
  - Dado que a página é servida Quando inspeciono recursos Then nenhum script ou fonte
    vem de CDN externo.
  - Dado que JavaScript desabilitado Quando abro a página Then o texto das seções é
    visível e legível.
- **Definição de pronto:** Auditoria registrada com números ≥ 90 e ausência de CDN
  verificada.
- **Dependências:** Specs 03 (vídeo), 04 (motion), 05/06 (conteúdo).
- **Fora do escopo desta spec:** Estratégia de frames em canvas; lazy-load de vídeo por
  tipo de conexão (só entra se a auditoria exigir); otimização de imagem além dos
  assets atuais.

### Spec 09 — Testes automatizados

- **Fase:** Fase 4
- **Objetivo (o quê):** Cobrir com testes os comportamentos que quebram em silêncio:
  gating de movimento reduzido, montagem da hero, ordem das frases, validação do
  formulário e presença das seções/marcadores.
- **Intenção (por quê):** Refactor da magnitude deste projeto falha invisivelmente (uma
  frase a menos, um listener órfão, reduced motion quebrado). O gate de commit só vale
  alguma coisa se os testes exercitam o que importa — não só a existência de componentes.
- **Contexto:** Ferramenta escolhida: Vitest + Testing Library, em jsdom, rodando em
  segundos para poder viver dentro do pré-commit (navegador e2e ficou de fora por
  decisão).
- **Atores:** Dev (local e no gancho de commit).
- **Descrição do comportamento:** A suíte cobre: (1) com movimento reduzido simulado, a
  hero renderiza estática — apenas a primeira frase, sem fixação; (2) sem movimento
  reduzido, a hero monta seu comportamento de rolagem e as três frases existem na ordem
  correta (fase 0, 1, 2) com seus textos funcionais; (3) a montagem e desmontagem não
  deixam observadores/listeners órfãos; (4) todas as sete seções existem com suas
  âncoras; (5) os marcadores de conteúdo não preenchido continuam presentes (regressão
  contra inventar dado); (6) o formulário sinaliza vazio/e-mail inválido sem apagar
  digitado e não anuncia entrega bem-sucedida; (7) os tokens de cor são a única fonte de
  valores hex no CSS. A suíte roda em um comando único e falha com mensagem legível.
- **Entradas e saídas:** Entrada: código alterado. Saída: relatório verde/vermelho com
  o que quebrou.
- **Dados/entidades envolvidos (conceitual):** Caso de teste (nome, pré-condição,
  asserção); componente sob teste (hero, seções, formulário).
- **Estados e transições:** Passou/falhou; limpo/sujo.
- **Regras de negócio:** R6 (nada entra sem passar); R1 (teste de marcadores protege
  a regra de não inventar).
- **Validações:** Suíte inteira roda sem rede; determinística (sem dependência de
  timing real de vídeo).
- **Fluxo do usuário (passo a passo):**
  1. Dev altera a hero.
  2. Roda o comando de testes.
  3. Um teste de ordem de frases falha com o nome do caso.
  4. Dev corrige antes de commitar.
- **Casos de borda e erros:** Elemento ausente (teste falha com seletor legível, não
  timeout mudo); ambiente sem `matchMedia` (o teste simula a preferência); teste
  assíncrono pendurado (timeout explícito).
- **Impacto no existente:** Primeira cobertura de testes do projeto — não há testes
  hoje.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que a suíte roda Quando termina Então todos os casos listados em (1)–(7) estão
    implementados e passando.
  - Dado que um comportamento protegido é quebrado intencionalmente Quando a suíte roda
    Então ela falha apontando o caso.
  - Dado que a suíte roda offline Quando completa Then nenhuma requisição de rede é
    feita.
- **Definição de pronto:** Cobertura dos sete grupos de casos, comando único,
  execução rápida o bastante para o pré-commit.
- **Dependências:** Specs 02–06 (precisam existir para serem testadas).
- **Fora do escopo desta spec:** Testes e2e com navegador; testes visuais (snapshot de
  imagem); testes de performance automatizados (Lighthouse é manual nesta fase).

### Spec 10 — Pipeline de qualidade e ganchos de commit

- **Fase:** Fase 4
- **Objetivo (o quê):** Automatizar a barreira que impede código quebrado de entrar no
  repositório: checagem de tipos estritos, lint, formatação e testes, com gancho de
  pré-commit que bloqueia o commit quando algo falha.
- **Intenção (por quê):** Regra R6. Sem isso, "main é padrão" vira "qualquer coisa vai
  para produção", já que a Vercel publica cada push da `main` automaticamente (R7) — o
  gancho é a única porta entre o dev e o deploy automático.
- **Contexto:** Ferramentas escolhidas: ESLint (config oficial Next.js + TypeScript),
  Prettier, TypeScript estrito, Vitest (Spec 09), Husky + lint-staged.
- **Atores:** Dev.
- **Descrição do comportamento:** Um comando roda tudo (tipos, lint, testes) e é o
  mesmo usado no gancho. O gancho de pré-commit: formata só os arquivos staged, roda a
  checagem de tipos e a suíte de testes; qualquer falha **aborta o commit** com a saída
  legível, e nada é enviado. Arquivos novos são detectados pelo formatação (não é
  preciso stage manual deles). A configuração de tipos é estrita (nada implícito de
  `any`). O lint tem regras que capturam erros reais sem gerar ruído constante que o dev
  aprende a ignorar.
- **Entradas e saídas:** Entrada: `git commit`. Saída: commit criado (tudo verde) ou
  rejeitado (algo vermelho).
- **Dados/entidades envolvidos (conceitual):** Comando de qualidade (nome, etapas);
  regra de lint; regra de tipo; estágio do gancho.
- **Estados e transições:** Verde → commita; vermelho → commita bloqueado.
- **Regras de negócio:** R6 (gate inviolável).
- **Validações:** O gancho roda de fato (testado com um commit propositalmente quebrado
  e um bom); o formatação não altera arquivos não staged.
- **Fluxo do usuário (passo a passo):**
  1. Dev faz commit.
  2. Prettier formata os arquivos staged, tipos e testes rodam.
  3. Falhou: commit rejeitado, dev corrige.
  4. Passou: commit criado.
- **Casos de borda e erros:** Commit com mensagem vazia (padrão do git já recusa);
  teste pendurado (timeout explícito, não trava o dev para sempre); gancho sendo
  pulado por `--no-verify` (permitido — é o escape hatch do git, fora do nosso controle
  e aceito); repositório clonado em outra máquina (o gancho precisa ser reinstalado
  automaticamente na instalação de dependências).
- **Impacto no existente:** Primeira automação de qualidade do projeto.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que há um erro de tipo no código Quando o dev tenta commitar Então o commit é
    bloqueado com a saída do erro.
  - Dado que um teste falha Quando o dev tenta commitar Então o commit é bloqueado e a
    mensagem aponta o teste.
  - Dado que tudo está verde Quando o dev commita Então o commit é criado e os arquivos
    staged estão formatados.
  - Dado que o repositório é clonado e as dependências instaladas Quando o dev commita
    Então o gancho roda (está reinstalado).
- **Definição de pronto:** Gate completo funcionando, verificado nos dois sentidos
  (bloqueia e libera), reinstalação automática do gancho.
- **Dependências:** Spec 09 (os testes que o gate roda); scaffold da Fase 1.
- **Fora do escopo desta spec:** CI em servidor (GitHub Actions) — o gate é local;
  branch protection no GitHub; versionamento automático de release.

### Spec 11 — Publicação (GitHub + Vercel)

- **Fase:** Fase 4
- **Objetivo (o quê):** Colocar o projeto em um repositório público `morena-cafe` no
  GitHub com `main` como branch padrão, e configurar a Vercel para publicar
  automaticamente a produção a cada push na `main`.
- **Intenção (por quê):** Sem isso não há "projeto publicado" — é o que transforma
  código local em produto acessível por URL. A integração Git foi escolhida justamente
  para eliminar o passo manual entre commit e produção.
- **Contexto:** `gh` e Vercel CLI já autenticados na máquina com a conta do dono do
  projeto. Repositório **público** (decisão fechada), criado **após** o scaffold, para
  que o primeiro commit já leve o projeto funcional com o gancho ativo.
- **Atores:** Dev (dono), Vercel, GitHub.
- **Descrição do comportamento:** O repositório é criado público com o nome
  `morena-cafe`, `main` como branch inicial, e recebe o projeto com o primeiro commit já
  atravessando o gancho da Spec 10. O projeto é vinculado a um projeto na Vercel com
  integração Git ativa: push na `main` dispara build e deploy de produção automático;
  o diretório de configuração local da Vercel fica fora do versionamento. O primeiro
  deploy conclui com sucesso e a URL pública responde 200 com a página renderizada.
  O site no ar é sempre reflexo do último commit da `main`.
- **Entradas e saídas:** Entrada: push na `main`. Saída: deploy concluído; URL pública
  no ar.
- **Dados/entidades envolvidos (conceitual):** Repositório (nome, visibilidade, branch
  padrão); projeto de deploy (vinculo repositório→projeto, URL); deploy (estado:
  buildando, sucesso, falha).
- **Estados e transições:** Local → no ar; build falho (fica no último deploy bom e o
  estado é visível).
- **Regras de negócio:** R7 (push na `main` = produção automática); repositório
  público com o nome exato `morena-cafe`.
- **Validações:** Nenhum arquivo de configuração de credencial entra no repositório;
  nenhum token/segredo é committado; a URL responde.
- **Fluxo do usuário (passo a passo):**
  1. Dev conclui a Fase 4 e faz push para a `main`.
  2. Vercel detecta, builda e publica.
  3. Dev abre a URL e vê o site no ar.
  4. Próximo push repete o ciclo sem ação manual.
- **Casos de borda e erros:** Build falha na Vercel (o deploy anterior permanece; o
  erro é legível; é preciso corrigir e reempurrar); repositório já existente com esse
  nome (perguntar antes de sobrescrever); credencial da Vercel em arquivo versionado
  (não pode acontecer — está no `.gitignore`); repositório criado com conteúdo vazio
  por engano (o conteúdo deve ser o projeto funcional, não um README stub).
- **Impacto no existente:** Primeira publicação do projeto — hoje não existe nenhuma.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que o scaffold está completo e testado Quando o repositório é criado Then ele
    é público, se chama `morena-cafe` e tem `main` como branch padrão com o projeto
    funcional.
  - Dado que há um push na `main` Quando o build da Vercel termina Then o deploy é
    publicado sem ação manual.
  - Dado que o deploy está concluído Quando acesso a URL pública Then a página carrega
    com hero e seções.
  - Dado que o repositório é inspecionado Quando busco arquivos de configuração da
    Vercel ou tokens Then não há nenhum versionado.
- **Definição de pronto:** Repo no ar, integração ativa, primeiro deploy verificado por
  requisição real, sem segredos versionados.
- **Dependências:** Specs 01–10 (só publica o que builda e passa no gate).
- **Fora do escopo desta spec:** Domínio próprio; preview por pull request; ambientes
  de staging; rollback automatizado.

### Spec 12 — Documentação e reescrita do AGENTS.md

- **Fase:** Fase 4
- **Objetivo (o quê):** Deixar o projeto autoexplicativo: `README.md` como entrada de
  onboarding (o que é, como rodar, como testar, como publicar, o que falta preencher),
  `docs/project-overview.md` (o que o produto faz, ≤ 90 linhas), `docs/architecture.md`
  (stack, camadas, decisões e trade-offs, ≤ 200 linhas) e um `AGENTS.md` reescrito do
  zero para refletir a nova realidade técnica.
- **Intenção (por quê):** O projeto é um exercício de aprendizado — documentação ruim
  apaga o valor do que foi aprendido. E o `AGENTS.md` antigo descreve um projeto que
  deixou de existir (HTML único, GSAP via CDN, regras de CSS inline); mantê-lo seria
  ativamente enganoso para qualquer agente ou pessoa que abrir o repo depois.
- **Contexto:** `documentation-writer` é a skill que executa a escrita, com protocolo
  próprio: relatório do que está desatualizado **antes** de escrever, confirmação do
  usuário, depois edição cirúrgica — e ela só escreve em `README.md` e `docs/`. O
  `AGENTS.md` é reescrito à parte, pois está fora do escopo daquela skill.
- **Atores:** Dev que chega ao projeto (humano ou agente).
- **Descrição do comportamento:** `README.md`: nome do projeto, o que é, pré-requisitos,
  como instalar, como rodar em dev, como rodar testes/lint/tipos, como fazer um commit
  (e o que o gancho faz), como publicar, estrutura de pastas, e uma lista explícita de
  **pendências de conteúdo** (o que precisa ser preenchido pelo dono, com os marcadores
  correspondentes). `docs/project-overview.md`: o produto em linguagem simples, sem
  jargão. `docs/architecture.md`: stack e versões, separação de responsabilidades entre
  GSAP (hero) e Framer Motion (demais seções) com a trade-off escrita, tokens de design,
  decisão de testes, pipeline de qualidade e fluxo de deploy — cada decisão registrada
  com o **porquê**, não só o quê. `AGENTS.md` reescrito: objetivo do produto, marca e
  regras de conteúdo que permanecem válidas (não inventar dados, pt-BR, não regenerar
  vídeos), e as regras técnicas novas (stack, comandos, gate de commit, o que não fazer
  — como remover a hero ou trocar lib de animação sem testar). Toda documentação é
  escrita em pt-BR e bate com o código real — nada de comportamento documentado que não
  existe.
- **Entradas e saídas:** Entrada: código pronto e decisions tomadas. Saída: quatro
  documentos que descrevem o projeto como ele é.
- **Dados/entidades envolvidos (conceitual):** Documento (tipo, caminho, limite de
  linhas); decisão técnica (escolha, alternativa descartada, motivo).
- **Estados e transições:** Desatualizado → relatório → confirmado → atualizado.
- **Regras de negócio:** R1/R4 valem também na documentação (marcadores documentados
  como pendência; textos em pt-BR).
- **Validações:** Nenhum comando documentado que não funcione; nenhum arquivo citado
  que não exista; limites de linhas respeitados; data de atualização presente.
- **Fluxo do usuário (passo a passo):**
  1. Dev novo clona o repositório.
  2. Lê o README e roda o projeto em um comando.
  3. Precisando entender uma decisão, abre `docs/architecture.md`.
  4. Agente de IA lê o `AGENTS.md` e já sabe as regras do projeto.
- **Casos de borda e erros:** Documento descrevendo comportamento removido (o protocolo
  de revisão antes de escrever pega isso); documento maior que o limite (recortar, não
  inflar); pendência de conteúdo virar "documentada como pronta" (é preciso manter a
  lista de pendências visível).
- **Impacto no existente:** Substitui o `AGENTS.md` antigo e cria a pasta `docs/` que
  hoje não existe.
- **Critérios de aceite (Dado/Quando/Então):**
  - Dado que o repositório é clonado Quando sigo o README Então consigo instalar,
    rodar, testar e buildar sem descoberta extra.
  - Dado que `docs/architecture.md` é lido Quando chego na decisão de animação Then a
    trade-off GSAP×Framer Motion está escrita com o motivo.
  - Dado que `AGENTS.md` é lido Quando busco as regras de conteúdo Then "não inventar
    dados" e "não regenerar vídeos" estão lá, e nenhuma regra de HTML/CSS inline antigo
    permanece.
  - Dado que a documentação é conferida Quando comparo com o código Then não há
    comando, arquivo ou comportamento inexistente citado.
- **Definição de pronto:** Quatro documentos atualizados, revisados contra o código,
  com pendências de conteúdo explicitamente listadas.
- **Dependências:** Todas as demais specs (documenta o que existe).
- **Fora do escopo desta spec:** Diagramas em imagem; documentação de API (não há
  backend); tradução; changelog histórico.

## 14. Ordem recomendada de implementação

1. **Spec 01** — Identidade visual e tokens (sem ela, todo o resto é retrabalho).
2. **Spec 02** — Estrutura de seções e navegação (espinha dorsal).
3. **Spec 03** — Hero com vídeo sincronizado (o coração, sobre a base já estilizada).
4. **Spec 04** — Animações de apoio (complementa sem invadir a hero).
5. **Spec 05** — Seções de conteúdo (preenche a estrutura).
6. **Spec 06** — Contato e formulário (fecha a conversão).
7. **Spec 07** — Acessibilidade e responsividade (barreira de verificação do que existe).
8. **Spec 08** — Performance (otimiza sobre código funcional).
9. **Segurança de ferramentas** — scaffold de ferramentas (TypeScript estrito, lint,
   formatação) entra logo após a Spec 02 na prática, pois o gate de commit da Spec 10
   precisa dos testes da Spec 09 para existir; montar a base de ferramentas antes da
   Spec 09 evita retrabalho.
10. **Spec 09** — Testes automatizados.
11. **Spec 10** — Pipeline de qualidade e gancho de commit.
12. **Spec 11** — Publicação (GitHub + Vercel).
13. **Spec 12** — Documentação e reescrita do AGENTS.md.

Seguir essa ordem evita implementar partes fora de contexto (testar algo que ainda não
existe, publicar algo que não builda, documentar algo que ainda vai mudar) e respeita
as dependências declaradas em cada spec.
