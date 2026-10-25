import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Pagina from "@/app/page";
import { cardapio, contato, depoimentos, frases } from "@/lib/conteudo";
import { definirMovimento } from "./apoio";

function montar() {
  definirMovimento(true); // modo estático: sem GSAP para o teste de estrutura
  return render(<Pagina />);
}

describe("Spec 09 (4) — estrutura de seções", () => {
  it("renderiza todas as partes na ordem, com as âncoras navegáveis", () => {
    montar();

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();

    for (const id of ["hero", "sobre", "cardapio", "depoimentos", "contato"]) {
      expect(document.getElementById(id), `âncora #${id}`).not.toBeNull();
    }

    // Cabeçalho: navegação principal com os três destinos do Spec 02.
    const links = screen
      .getAllByRole("link")
      .map((a) => a.getAttribute("href"))
      .filter(Boolean);
    for (const href of ["#sobre", "#cardapio", "#contato"]) {
      expect(links).toContain(href);
    }

    // Faixa de CTA (sem id) e suas seções irmãs existem pelo título.
    expect(
      screen.getByRole("heading", { name: "Reserve seu momento" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: depoimentos.titulo }),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: contato.titulo })).toBeInTheDocument();
  });

  it("tem exatamente um h1, na hero", () => {
    montar();
    const h1s = screen.getAllByRole("heading", { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent(frases[0].titulo);
  });
});

describe("Spec 09 (5) — marcadores de conteúdo (R1)", () => {
  it("preserva todos os marcadores provisórios, sem dado inventado", () => {
    montar();

    const texto = document.body.textContent ?? "";

    // Preços: quatro itens, todos provisórios.
    expect(texto.match(/R\$ \[00,00\]/g)).toHaveLength(cardapio.itens.length);

    // Prato da casa e depoimentos.
    expect(texto).toContain("[Prato da casa]");
    depoimentos.itens.forEach((item) => {
      expect(texto).toContain(item.citacao);
      expect(texto).toContain(item.autor);
    });

    // História, endereço, horário e contatos.
    expect(texto).toContain("[Escreva aqui como a Morena começou.");
    contato.dados.forEach((dado) => expect(texto).toContain(dado.valor));

    // A copy funcional (frases da hero) permanece intacta (R8).
    frases.forEach((frase) => expect(texto).toContain(frase.titulo));
  });

  it("não referencia CDN externo em nenhum recurso", () => {
    montar();

    const externos = Array.from(document.querySelectorAll<HTMLElement>("[src], [href]"))
      .map((el) => el.getAttribute("src") ?? el.getAttribute("href"))
      .filter((url): url is string => Boolean(url))
      .filter((url) => /^https?:\/\//.test(url));

    expect(externos).toEqual([]);
  });
});

describe("Spec 09 (7) — movimento reduzido nas seções", () => {
  it("com movimento reduzido nada anima: entradas nem aparecem montadas", () => {
    const { container } = montar();
    expect(container.querySelectorAll(".entrada-el")).toHaveLength(0);
    expect(container.querySelector("#hero")).toHaveAttribute("data-estado", "estatico");
  });
});
