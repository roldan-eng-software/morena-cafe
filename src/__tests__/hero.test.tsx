import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hero from "@/components/hero";
import { frases } from "@/lib/conteudo";
import { definirMovimento } from "./apoio";

describe("Spec 09 (1) — hero estática com movimento reduzido", () => {
  it("não monta fixação e mostra apenas a primeira frase", () => {
    definirMovimento(true);
    const { container } = render(<Hero />);

    const secao = container.querySelector("#hero");
    expect(secao).toHaveAttribute("data-estado", "estatico");
    expect(container.querySelector(".pin-spacer")).toBeNull();
    expect(ScrollTrigger.getAll()).toHaveLength(0);

    const frasesEl = secao!.querySelectorAll<HTMLElement>(".frase");
    expect(frasesEl).toHaveLength(3);
    expect(frasesEl[0]).toBeVisible();
    expect(frasesEl[1]).not.toBeVisible();
    expect(frasesEl[2]).not.toBeVisible();

    // O pôster estático é a base visual do modo reduzido (R3).
    const video = secao!.querySelector("video");
    expect(video).toHaveAttribute("poster", "/hero-cafe-poster.jpg");
  });
});

describe("Spec 09 (2) — hero animada", () => {
  it("monta o comportamento de rolagem e mantém as três frases na ordem", () => {
    definirMovimento(false);
    const { container } = render(<Hero />);

    const secao = container.querySelector("#hero");
    expect(secao).toHaveAttribute("data-estado", "animado");
    expect(container.querySelector(".pin-spacer")).not.toBeNull();

    const frasesEl = Array.from(secao!.querySelectorAll<HTMLElement>(".frase"));
    expect(frasesEl).toHaveLength(3);
    expect(frasesEl.map((el) => el.dataset.fase)).toEqual(["0", "1", "2"]);

    frasesEl.forEach((el, i) => {
      const titulo = el.querySelector("h1, h2");
      expect(titulo).toHaveTextContent(frases[i].titulo);
    });

    // Nenhuma frase é removida em modo animado: todas ficam para a troca.
    frasesEl.forEach((el) => expect(el).not.toHaveAttribute("hidden"));

    // Formatos: WebM primeiro, MP4 como compatibilidade (Spec 08).
    const fontes = Array.from(secao!.querySelectorAll("source")).map((s) =>
      s.getAttribute("src"),
    );
    expect(fontes).toEqual(["/hero-cafe.webm", "/hero-cafe.mp4"]);
  });

  it("é a única seção com h1 da página", () => {
    definirMovimento(false);
    const { container } = render(<Hero />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
  });
});

describe("Spec 09 (3) — montagem e desmontagem limpas", () => {
  it("não deixa ScrollTrigger ou marca órfãos após desmontar", () => {
    definirMovimento(false);
    const { unmount } = render(<Hero />);
    expect(ScrollTrigger.getAll().length).toBeGreaterThan(0);

    unmount();

    expect(ScrollTrigger.getAll()).toHaveLength(0);
    expect(document.querySelector(".pin-spacer")).toBeNull();
    expect(document.querySelector("#hero")).toBeNull();
    expect(document.querySelector(".frase")).toBeNull();
  });
});
