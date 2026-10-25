import { describe, expect, it } from "vitest";
import { render, waitFor } from "@testing-library/react";
import Pagina from "@/app/page";
import { definirMovimento, intencaoDeRolagem } from "./apoio";

// Arquivo separado de propósito: o Vitest isola os módulos por arquivo, e a
// hero guarda a preferência de movimento no estado externo do matchMedia —
// testar os dois modos no mesmo arquivo deixa o segundo com estado velho.
describe("Spec 09 (4)/(7) — página com movimento normal", () => {
  it("as seções usam as entradas em CSS e a hero monta animada", async () => {
    definirMovimento(false);
    const { container } = render(<Pagina />);

    expect(container.querySelectorAll(".entrada-el").length).toBeGreaterThan(0);
    expect(container.querySelector("#hero")).toHaveAttribute("data-estado", "animado");

    // A hero monta o GSAP sob intenção de rolagem (import() dinâmico): a
    // fixação só aparece depois do disparo + chunk avaliado.
    intencaoDeRolagem();
    await waitFor(() => expect(container.querySelector(".pin-spacer")).not.toBeNull());
  });
});
