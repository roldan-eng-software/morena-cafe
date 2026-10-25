# Arquitetura e decisões técnicas

> Última atualização: 2026-10-25 · Limite: 200 linhas

## Stack (versões do `package.json`)

| Camada    | Tecnologia                                         |
| --------- | -------------------------------------------------- |
| Framework | Next.js 16.4.3 (App Router, Turbopack, RSC)        |
| Linguagem | TypeScript 5 (modo estrito, `strict: true`)        |
| UI        | React 19.3 + Tailwind CSS v4 + shadcn/ui (base-ui) |
| Animação  | GSAP 3 + ScrollTrigger (só a hero)                 |
|           | Framer Motion (demais seções)                      |
| Testes    | Vitest 5 + Testing Library (jsdom)                 |
| Qualidade | ESLint 9 flat (`next/core-web-vitals`) + Prettier  |
| Ganchos   | Husky + lint-staged                                |
| Fontes    | Fraunces (display) + Karla (corpo), `next/font`    |
| Deploy    | Vercel com integração Git                          |

## Estrutura

```
src/
├── app/
│   ├── layout.tsx        # fontes, lang="pt-BR", metadata
│   ├── page.tsx          # monta as sete partes na ordem
│   └── globals.css       # tokens de design (única fonte de cores)
├── components/
│   ├── topo.tsx          # cabeçalho fixo (âncoras, sem JS)
│   ├── hero.tsx          # GSAP/ScrollTrigger — o ÚNICO arquivo com GSAP
│   ├── entrada.tsx       # wrapper de entrada (Framer Motion)
│   ├── sobre/cardapio/depoimentos/faixa-cta/contato/rodape.tsx
│   ├── formulario.tsx    # validação honesta (sem backend)
│   ├── marcador.tsx      # realça os [...] provisórios
│   └── ui/               # componentes shadcn gerados (button, card, ...)
└── lib/conteudo.ts       # TODO o conteúdo do site, tipado, com marcadores
```

**Regra de dependência:** componentes de seção são Server Components; só entram
`"use client"` o que precisa de interatividade/animação (hero, entrada,
formulário). Conteúdo nunca fica em componente — sempre em `lib/conteudo.ts`.

## Decisões e trade-offs

### GSAP só na hero, Framer Motion no resto

A hero precisa de **pin + scrub**: a rolagem fixa a seção por 300% de altura e
controla o `currentTime` do vídeo com suavização. Essa é a mecânica que já
existia no site legado e funciona — trocar a ferramenta do efeito central era
o risco mais alto do refactor. GSAP/ScrollTrigger ficam **encapsulados em
`hero.tsx`**, com `gsap.context()` + `ctx.revert()` no cleanup: nenhum
ScrollTrigger sobrevive à desmontagem (garantido pelo teste de desmontagem).

O resto da página precisa de menos: entrada única quando a seção chega à tela
(`whileInView`, `once: true`). Para isso, Framer Motion é mais idiomático em
React — e ele **não** é importado pela hero.

Detalhe de implementation: o elemento fixado é um interno (`.hero-alvo`), nunca
o `<section>` que o React é dono. Assim o `pin` não reorganiza o DOM sob os
pés do React na desmontagem (o `pin-spacer` fica dentro da seção).

### Um único arquivo de conteúdo

`src/lib/conteudo.ts` exporta tudo (frases, seções, cardápio, contatos) com
tipos readonly. Preencher dados reais = editar um arquivo; nenhum componente
muda. Os marcadores `[...]` são verificados por teste — é a garantia
automática da regra "nunca inventar dado" (R1 do PRD).

### Cores só em tokens

Todos os valores hex existem em **um bloco** (`:root` de `globals.css`, tokens
`--cafe-*`, `--creme*`, `--caramelo`, `--dourado`, `--erro`). Todo o resto do
código usa tokens semânticos (`bg-background`, `text-foreground`) ou
`color-mix()`. Um teste falha se aparecer hex fora do bloco. A seção clara do
cardápio usa a classe `.tema-claro`, que redefinir os tokens no escopo — mesma
paleta trocada sem duplicar CSS.

### Movimento reduzido (uma preferência, dois mecanismos)

- **Hero:** `useSyncExternalStore` sobre `matchMedia` (valor do servidor é
  `false` e corrigido após a hidratação sem mismatch). Com redução ativa o
  GSAP **não é montado** — sem pin, sem scrub, só o pôster e a frase 1.
- **Demais seções:** `Entrada` devolve `<div>` puro quando `useReducedMotion()`
  é true; além disso o CSS global zera transições/animações.
- Sem JavaScript: `<noscript>` devolve a visibilidade que o estilo inline do
  Framer Motion esconderia, e a frase 1 nasce visível por CSS.

### Formulário sem backend

Fora de escopo enviar mensagem (sem API, e-mail ou terceiro). A opção
honesta: validação real por campo (erro some quando corrigido, foco vai ao
primeiro inválido, nada é apagado) e, com tudo válido, um retorno que diz
**"o envio ainda não está ativo"** — nunca "mensagem enviada".

### Vídeo, não canvas

A hero usa os três assets aprovados (`hero-cafe.webm` + `.mp4` + pôster) com
`preload="metadata"`: o pôster pinta na primeira dobra e o vídeo só precisa
estar pronto quando a rolagem começar. Frames em `<canvas>` ficaram fora do
escopo — só entra se a performance real exigir. Nenhuma biblioteca vem de CDN:
tudo é dependência do projeto, versionada.

## Pipeline de qualidade (regra R6)

`git commit` → `.husky/pre-commit` roda, nesta ordem:

1. `lint-staged` → Prettier formata só os arquivos staged;
2. `npm run typecheck` → `tsc --noEmit`;
3. `npm run test` → suíte inteira.

Qualquer falha **aborta o commit**. `--no-verify` é o escape hatch do git
(fora do nosso controle, aceito).

## Testes (Spec 09 — 17 casos)

| Arquivo               | Cobre                                           |
| --------------------- | ----------------------------------------------- |
| `hero.test.tsx`       | hero estática (reduced), frases 0→1→2 na ordem, |
|                       | pin montado, desmontagem sem órfãos             |
| `secoes.test.tsx`     | sete partes + âncoras, marcadores intactos,     |
|                       | um único h1, zero CDN externo                   |
| `entradas.test.tsx`   | modo normal usa Framer Motion (arquivo isolado: |
|                       | o Framer guarda estado no módulo)               |
| `formulario.test.tsx` | vazio/inválido, foco, texto preservado, retorno |
|                       | honesto, envio por Enter                        |
| `tokens.test.tsx`     | nove tokens existem, zero hex fora do bloco     |

Truque de ambiente: o jsdom não tem `matchMedia`/`IntersectionObserver` —
`src/__tests__/apoio.ts` expõe um `MediaQueryList` **singleton** (instâncias
novas por chamada deixavam GSAP/Framer com estado velho).

## Deploy (regra R7)

Repositório público `morena-cafe` (GitHub) → projeto Vercel vinculado com
production branch `main`. Push na `main` = deploy de produção automático;
falha de build mantém o último deploy bom no ar. `.vercel/` está no
`.gitignore` (nenhuma credencial versionada). Sem domínio próprio neste ciclo.
