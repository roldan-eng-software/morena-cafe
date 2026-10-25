# Morena Café e Gastronomia — visão do produto

> Última atualização: 2026-10-25

## O que é

Landing page institucional de um café: uma página única que apresenta a marca,
mostra o cardápio, exibe depoimentos e convida o visitante a fazer contato.
O público é quem descobre a Morena pelo celular e quer saber rápido **o que é
esse lugar, o que servem e como falar com eles**.

Produção: <https://morena-cafe.vercel.app>
Código: <https://github.com/roldan-eng-software/morena-cafe>

## O que a página oferece

1. **Hero animada** — um vídeo de espresso enchendo a xícara avança conforme o
   visitante rola a página, enquanto três frases entram e saem em cena. No fim
   da sequência, a página segue normalmente para o conteúdo.
2. **Navegação fixa** — links Sobre, Cardápio e Contato, funcionais também no
   celular, que antes não tinha navegação nenhuma.
3. **Sobre** — a história da marca e a descrição do espaço.
4. **Cardápio** — grade com quatro itens (Espresso, Cappuccino, Café coado e o
   futuro prato da casa) em uma seção clara, legível de celular a desktop.
5. **Depoimentos** — três citações de clientes.
6. **Faixa de convite** — chamada que leva ao contato.
7. **Contato** — endereço, horário, WhatsApp e Instagram + formulário com
   nome, e-mail e mensagem.
8. **Rodapé** — crédito e ano.

## O que o visitante pode (e não pode) fazer

- Navegar por âncoras, ler tudo e preencher o formulário.
- O formulário **valida de verdade** (vazio e e-mail inválido são sinalizados,
  sem apagar o que foi digitado), mas **não envia mensagem**: ainda não há
  backend neste ciclo, e o site diz isso com todas as letras em vez de fingir
  que a mensagem saiu.

## Conteúdo provisório (o que falta preencher)

**Nenhum dado real foi inventado.** Tudo que o dono ainda não forneceu está
entre `[colchetes]`, pronto para troca sem tocar em código:

| O que falta           | Onde está marcado         |
| --------------------- | ------------------------- |
| Origem da Morena      | `sobre.paragrafos[0]`     |
| Preços (4 itens)      | `cardapio.itens[*].preco` |
| Prato da casa         | `cardapio.itens[3]`       |
| Depoimentos e autores | `depoimentos.itens[*]`    |
| Endereço, horário     | `contato.dados[*]`        |
| WhatsApp, Instagram   | `contato.dados[*]`        |

**Todos os textos do site vivem em um único arquivo:**
[`src/lib/conteudo.ts`](../src/lib/conteudo.ts) — é lá que se preenche.

## Como rodar

```bash
npm install     # instala dependências
npm run dev     # servidor de desenvolvimento em http://localhost:3000
```

Comandos de qualidade (rodam automaticamente no `git commit`):

```bash
npm run test         # 17 testes (Vitest + Testing Library)
npm run lint         # ESLint (regras oficiais Next.js + TypeScript)
npm run typecheck    # TypeScript em modo estrito
npm run format       # formata com Prettier
npm run build        # build de produção
```

## Publicação

Push na `main` do GitHub dispara build e deploy de produção na Vercel — sem
passo manual. O site no ar é sempre o reflexo do último commit da `main`.

## Acessibilidade e idioma

- Site inteiro em português do Brasil (`lang="pt-BR"`).
- Com **movimento reduzido** ligado no sistema, nada anima: a hero mostra o
  pôster estático com a primeira frase e o resto aparece no lugar.
- Funciona sem JavaScript: o texto e a primeira frase continuam legíveis.

## Documentos

- [Visão do produto](project-overview.md) — este arquivo
- [Arquitetura e decisões](architecture.md) — stack, trade-offs, pipeline
- [PRD completo](prd/morena-cafe.md) — requisitos e 12 especificações
- [`AGENTS.md`](../AGENTS.md) — regras para agentes de IA
- [`legacy/index.html`](../legacy/index.html) — site original pré-refatoração
