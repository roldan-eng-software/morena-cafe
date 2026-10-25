/**
 * Conteúdo do site da Morena Café e Gastronomia.
 *
 * REGRA DE OURO (PRD, R1): nada de dado real inventado. Enquanto o dono do site
 * não fornecer preços, endereço, horário, contatos, depoimentos, história ou o
 * prato da casa, tudo permanece entre `[colchetes]`. Preencher o site depois é
 * editar apenas este arquivo — nenhum componente precisa mudar.
 */

export type AcaoHero = {
  readonly rotulo: string;
  readonly href: string;
};

export type FraseHero = {
  readonly fase: 0 | 1 | 2;
  readonly etiqueta: string;
  readonly titulo: string;
  readonly texto: string;
  readonly acao?: AcaoHero;
};

export type ItemCardapio = {
  readonly nome: string;
  readonly descricao: string;
  readonly preco: string;
};

export type Depoimento = {
  readonly citacao: string;
  readonly autor: string;
};

export type DadoContato = {
  readonly rotulo: string;
  readonly valor: string;
};

export type ItemNavegacao = {
  readonly rotulo: string;
  readonly href: string;
};

export const navegacao: readonly ItemNavegacao[] = [
  { rotulo: "Sobre", href: "#sobre" },
  { rotulo: "Cardápio", href: "#cardapio" },
  { rotulo: "Contato", href: "#contato" },
] as const;

export const frases: readonly FraseHero[] = [
  {
    fase: 0,
    etiqueta: "Morena Café e Gastronomia",
    titulo: "Um momento para saborear",
    texto:
      "Cada xícara é preparada com calma, para você desacelerar e aproveitar o que está na sua frente.",
    acao: { rotulo: "Ver cardápio", href: "#cardapio" },
  },
  {
    fase: 1,
    etiqueta: "Nossa origem",
    titulo: "O grão certo, torrado com cuidado",
    texto:
      "Escolhemos cafés de produtores parceiros e torramos em pequenos lotes para preservar o aroma e o sabor.",
  },
  {
    fase: 2,
    etiqueta: "Na xícara",
    titulo: "Um espresso que se sente",
    texto:
      "Corpo encorpado, crema dourada e um final doce, servido do jeito que o café merece.",
    acao: { rotulo: "Fale com a gente", href: "#contato" },
  },
] as const;

export const sobre = {
  titulo: "Nossa história",
  paragrafos: [
    "[Escreva aqui como a Morena começou. Uma ou duas frases sobre a origem, o nome e o que motivou a abertura.]",
    "Nosso espaço foi pensado para quem gosta de café com calma: mesas confortáveis, luz suave e uma cozinha que acompanha cada xícara.",
  ],
} as const;

export const cardapio = {
  titulo: "Cardápio",
  introducao:
    "Preparamos cada bebida com grãos selecionados e torra em pequenos lotes.",
  itens: [
    {
      nome: "Espresso",
      descricao: "Corpo encorpado, crema dourada e final doce. A base de tudo.",
      preco: "R$ [00,00]",
    },
    {
      nome: "Cappuccino",
      descricao: "Espresso com leite vaporizado e uma camada de espuma cremosa.",
      preco: "R$ [00,00]",
    },
    {
      nome: "Café coado",
      descricao:
        "Preparo lento, sabor limpo e aromático. Pergunte sobre o grão do dia.",
      preco: "R$ [00,00]",
    },
    {
      nome: "[Prato da casa]",
      descricao: "[Descreva o prato, os ingredientes e o que ele combina com o café.]",
      preco: "R$ [00,00]",
    },
  ] satisfies readonly ItemCardapio[],
} as const;

export const depoimentos = {
  titulo: "O que dizem sobre a Morena",
  itens: [
    { citacao: "[Depoimento real de cliente aqui.]", autor: "[Nome do cliente]" },
    { citacao: "[Outro depoimento real.]", autor: "[Nome do cliente]" },
    { citacao: "[Terceiro depoimento real.]", autor: "[Nome do cliente]" },
  ] satisfies readonly Depoimento[],
} as const;

export const faixaCta = {
  titulo: "Reserve seu momento",
  texto:
    "Venha tomar um café com a gente. Se preferir, faça um pedido para retirada ou entrega.",
  acao: { rotulo: "Quero ir até a Morena", href: "#contato" },
} as const;

export const contato = {
  titulo: "Venha nos visitar",
  dados: [
    { rotulo: "Endereço", valor: "[Rua, número, bairro, cidade]" },
    { rotulo: "Horário", valor: "[Seg a sex, 00h às 00h · Sáb e dom, 00h às 00h]" },
    { rotulo: "WhatsApp", valor: "[(00) 00000-0000]" },
    { rotulo: "Instagram", valor: "[@seuperfil]" },
  ] satisfies readonly DadoContato[],
} as const;

export const rodape = {
  copyright: "© 2026 Morena Café e Gastronomia",
  direitos: "Todos os direitos reservados",
} as const;

export const indicadorHero = "Role para descobrir";

/** Mensagem honesta do formulário: o envio real não existe neste ciclo (PRD, Spec 06). */
export const retornoFormulario =
  "O envio de mensagens ainda não está ativo nesta versão do site. Enquanto isso, fale com a gente pelos contatos ao lado — eles estão logo acima.";
