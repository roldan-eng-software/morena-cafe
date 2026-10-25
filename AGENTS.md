<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Morena Café e Gastronomia

> Atualizado em 2026-10-25. Descreve o projeto **como ele é hoje** (Next.js).
> O site anterior (HTML único, GSAP via CDN) está arquivado em `legacy/index.html`.

## O que é este projeto

Landing page institucional de um café, em português do Brasil. Uma única página
(`src/app/page.tsx`) monta oito partes: cabeçalho fixo, hero animada com vídeo
sincronizado à rolagem, sobre, cardápio, depoimentos, faixa de CTA, contato e
rodapé. PRD completo em `docs/prd/morena-cafe.md`.

Produção: <https://morena-cafe.vercel.app> · Repo: `roldan-eng-software/morena-cafe`

## Regras invioláveis

1. **Nunca inventar conteúdo real (R1).** Preços, endereço, horário, WhatsApp,
   Instagram, depoimentos, história e prato da casa são marcadores `[...]`.
   Preenchimento acontece **só** em `src/lib/conteudo.ts`, fornecido pelo dono.
   O teste `src/__tests__/secoes.test.tsx` falha se um marcador sumir.
2. **Não regenerar, renomear nem editar os assets de vídeo** —
   `public/hero-cafe.webm`, `public/hero-cafe.mp4`, `public/hero-cafe-poster.jpg`
   são aprovados. Nomes fixos.
3. **A hero é GSAP; o resto é Framer Motion.** GSAP/ScrollTrigger só em
   `src/components/hero.tsx`, sempre com `gsap.context()` + `ctx.revert()` no
   cleanup. Trocar a lib da hero ou mexer na mecânica (pin `+=300%`, scrub,
   trocas em 2.2/5.2) exige rodar a suíte e revisar os testes da hero.
4. **Cores só em tokens.** Hex vive exclusivamente no bloco `:root` de
   `src/app/globals.css`. Fora dali é `bg-background`, `text-foreground`,
   utilitários da marca (`text-dourado`…) ou `color-mix()`. O teste
   `tokens.test.ts` bloqueia hex órfão.
5. **Nada entra na `main` sem o gate verde:** o `pre-commit` roda Prettier,
   `npm run typecheck` e `npm run test`. Push na `main` publica produção na
   Vercel automaticamente — o gancho é a porta única para o ar.
6. **`lang="pt-BR"` e textos acentuados.** Copy funcional (frases da hero,
   títulos de seção) não se reescreve sem pedido explícito.
7. **Movimento reduzido funciona em toda a página** — a hero nem monta o GSAP
   nesse modo. Se você adicionar animação, respeite `useReducedMotion`/CSS
   `prefers-reduced-motion` e cubra com teste.

## Comandos

```bash
npm run dev          # desenvolvimento (lê node_modules/next/dist/docs antes de codar)
npm run test         # 17 testes — Vitest + Testing Library (jsdom)
npm run lint         # ESLint flat (next/core-web-vitals + typescript)
npm run typecheck    # tsc --noEmit
npm run format       # Prettier
npm run build        # build de produção
```

Ambiente de teste: `vitest.setup.ts` + `src/__tests__/apoio.ts` (singleton de
`matchMedia` — jsdom não tem; instâncias novas quebram GSAP/Framer). Testes que
dependem de estado de módulo do Framer ficam em arquivo próprio
(`entradas.test.tsx`).

## Onde mexer

| Quer alterar...                    | Arquivo                                 |
| ---------------------------------- | --------------------------------------- |
| Texto, preço, contato, depoimento  | `src/lib/conteudo.ts` (única fonte)     |
| Visual/tokens de cor/tipografia    | `src/app/globals.css` + `layout.tsx`    |
| Hero (vídeo, frases, rolagem)      | `src/components/hero.tsx`               |
| Entradas/animação das seções       | `src/components/entrada.tsx`            |
| Seções (estrutura/conteúdo visual) | `src/components/{sobre,cardapio,…}.tsx` |
| Formulário e validação             | `src/components/formulario.tsx`         |
| Componentes de base (botão, card…) | `src/components/ui/` (shadcn — revisar) |

## Documentos

- `README.md` — onboarding: rodar, testar, publicar, pendências de conteúdo
- `docs/project-overview.md` — o produto em linguagem simples
- `docs/architecture.md` — stack e decisões **com motivo**
- `docs/prd/morena-cafe.md` — requisitos e 12 especificações
- `legacy/index.html` — site original (referência histórica, não usar)

## Fora de escopo (não "conserte" sem pedir)

Envio real do formulário · frames em `<canvas>` · domínio próprio ·
Playwright/e2e · CMS · dados reais de conteúdo · regenerar vídeos.
