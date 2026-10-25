import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";
import Pagina from "@/app/page";
import { definirMovimento } from "./apoio";

// Arquivo separado de propósito: o Vitest isola os módulos por arquivo, e o
// Framer Motion guarda a preferência de movimento no estado do módulo —
// testar os dois modos no mesmo arquivo deixa o segundo com estado velho.
describe("Spec 09 (4)/(7) — página com movimento normal", () => {
  it("as seções usam as entradas do Framer Motion e a hero monta animada", () => {
    definirMovimento(false);
    const { container } = render(<Pagina />);

    expect(container.querySelectorAll(".entrada-el").length).toBeGreaterThan(0);
    expect(container.querySelector("#hero")).toHaveAttribute("data-estado", "animado");
    expect(container.querySelector(".pin-spacer")).not.toBeNull();
  });
});
