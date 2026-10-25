# Morena Café e Gastronomia

Landing page da Morena Café e Gastronomia — hero com vídeo de espresso
sincronizado à rolagem, cardápio, depoimentos e contato. Refatorada do zero em
Next.js + TypeScript, com testes, gancho de commit e deploy automático.

**Em produção:** <https://morena-cafe.vercel.app>
**Repositório:** <https://github.com/roldan-eng-software/morena-cafe>

> **Conteúdo provisório:** o site vai ao ar com marcadores `[...]` (preços,
> endereço, horário, contatos, depoimentos, história) porque nenhum dado real
> foi fornecido — e nenhum foi inventado. Veja [Pendências de conteúdo](#pendências-de-conteúdo).

## Pré-requisitos

- Node.js 24+ (o projeto foi construído e testado na v24)
- npm 11+
- `git` + [`gh`](https://cli.github.com/) autenticado (para publicar)
- Vercel CLI autenticado (opcional; a integração Git já está configurada)

## Instalar e rodar

```bash
npm install     # dependências
npm run dev     # http://localhost:3000
```

## Comandos

| Comando                | O que faz                                      |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`          | servidor de desenvolvimento                    |
| `npm run build`        | build de produção (Turbopack)                  |
| `npm run start`        | serve o build de produção                      |
| `npm run lint`         | ESLint (flat, `next/core-web-vitals` + TS)     |
| `npm run typecheck`    | TypeScript estrito sem emitir (`tsc --noEmit`) |
| `npm run test`         | suíte inteira (Vitest, 17 testes)              |
| `npm run test:watch`   | suíte em modo watch                            |
| `npm run format`       | formata tudo com Prettier                      |
| `npm run format:check` | verifica formatação sem escrever               |

## O que o gancho de commit faz

O projeto tem **Husky + lint-staged**. Toda vez que você roda `git commit`:

1. Prettier formata **apenas os arquivos staged**;
2. roda a checagem de tipos (`npm run typecheck`);
3. roda a suíte completa (`npm run test`).

Se qualquer etapa falhar, **o commit é bloqueado** e nada vai para o
repositório. Não existe commit verde falso — e push na `main` publica na
Vercel, então o gancho é a única porta entre o seu teclado e a produção.

`git commit --no-verify` pula o gancho (escape hatch do git; use por sua conta
e risco).

## Publicação

A integração Git já está configurada: **push na `main` → build e deploy de
produção na Vercel**, sem ação manual.

```bash
git add -A
git commit -m "descreva a mudança"
git push origin main
# a Vercel builda e publica: https://morena-cafe.vercel.app
```

Se o build falhar na Vercel, o site continua no último deploy bom; corrija e
empurre de novo.

## Estrutura de pastas

```
docs/
├── prd/morena-cafe.md        # PRD completo (14 seções, 12 specs)
├── project-overview.md       # o produto em linguagem simples
└── architecture.md           # stack, trade-offs e pipeline
legacy/index.html             # site original pré-refatoração
public/                       # vídeos e pôster da hero (assets aprovados)
src/
├── app/
│   ├── layout.tsx            # fontes Fraunces/Karla, lang="pt-BR"
│   ├── page.tsx              # monta as sete partes da página
│   └── globals.css           # tokens de design (única fonte de cores)
├── components/
│   ├── hero.tsx              # GSAP/ScrollTrigger — o único arquivo com GSAP
│   ├── entrada.tsx           # entradas das seções (Framer Motion)
│   ├── formulario.tsx        # formulário validado (sem envio real)
│   ├── topo/sobre/cardapio/… # seções e cabeçalho
│   └── ui/                   # componentes shadcn (button, card, input…)
├── lib/conteudo.ts           # TODO o conteúdo do site ← edite aqui
└── __tests__/                # 17 testes (Vitest + Testing Library)
```

## Pendências de conteúdo

Enquanto estes itens não forem fornecidos, os marcadores `[...]` permanecem —
**preencha em [`src/lib/conteudo.ts`](src/lib/conteudo.ts)**, nenhum componente
precisa mudar:

- [ ] **História da Morena** — `sobre.paragrafos[0]`
- [ ] **Preços** dos 4 itens do cardápio — `cardapio.itens[*].preco` (`R$ [00,00]`)
- [ ] **Prato da casa** (nome e descrição) — `cardapio.itens[3]`
- [ ] **Depoimentos** (3 citações + autores) — `depoimentos.itens[*]`
- [ ] **Endereço** — `contato.dados` (Endereço)
- [ ] **Horário de funcionamento** — `contato.dados` (Horário)
- [ ] **WhatsApp** — `contato.dados`
- [ ] **Instagram** — `contato.dados`
- [ ] **Envio do formulário** — hoje valida e avisa que o envio não está
      ativo; requer API/serviço de e-mail (fora do escopo atual)

## Decisões e documentação

- [Visão do produto](docs/project-overview.md) — o que a página oferece
- [Arquitetura](docs/architecture.md) — por que GSAP na hero e Framer Motion
  no resto, tokens de cor, testes e deploy
- [PRD](docs/prd/morena-cafe.md) — requisitos completos e critérios de aceite
- [`AGENTS.md`](AGENTS.md) — regras do projeto para agentes de IA

## Licença

Projeto privado de aprendizado. Sem licença definida.
