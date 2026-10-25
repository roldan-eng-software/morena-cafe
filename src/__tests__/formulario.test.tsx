import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Formulario from "@/components/formulario";
import { retornoFormulario } from "@/lib/conteudo";

async function enviarVazio() {
  const usuario = userEvent.setup();
  render(<Formulario />);
  await usuario.click(screen.getByRole("button", { name: "Enviar mensagem" }));
  return usuario;
}

describe("Spec 09 (6) — formulário honesto", () => {
  it("sinaliza campos vazios sem apagar o digitado e foca o primeiro erro", async () => {
    const usuario = await enviarVazio();

    const nome = screen.getByLabelText("Nome");
    expect(nome).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText("Informe seu e-mail.")).toBeInTheDocument();
    expect(screen.getByText("Escreva uma mensagem.")).toBeInTheDocument();

    // O foco vai ao primeiro campo inválido — o nome, que veio vazio.
    expect(nome).toHaveFocus();

    // Nada digitado é perdido e o erro some quando o campo é corrigido.
    await usuario.type(nome, "Maria");
    expect(nome).toHaveValue("Maria");
    expect(nome).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByText("Informe seu nome.")).toBeNull();
  });

  it("marca e-mail inválido e some com o erro quando corrigido", async () => {
    const usuario = await enviarVazio();

    const email = screen.getByLabelText("E-mail");
    await usuario.type(email, "nao-e-email");
    expect(screen.getByText("Informe um e-mail válido.")).toBeInTheDocument();
    expect(email).toHaveAttribute("aria-invalid", "true");
    expect(email).toHaveFocus();

    await usuario.type(email, "@exemplo.com");
    expect(screen.queryByText("Informe um e-mail válido.")).toBeNull();
    expect(email).not.toHaveAttribute("aria-invalid");
  });

  it("com tudo válido, informa que o envio não está ativo — nunca sucesso", async () => {
    const usuario = await enviarVazio();

    await usuario.type(screen.getByLabelText("Nome"), "Maria Silva");
    await usuario.type(screen.getByLabelText("E-mail"), "maria@exemplo.com");
    await usuario.type(
      screen.getByLabelText("Mensagem"),
      "Gostaria de saber sobre o café do dia.",
    );
    await usuario.click(screen.getByRole("button", { name: "Enviar mensagem" }));

    const status = screen.getByRole("status");
    expect(status).toHaveTextContent(retornoFormulario);
    expect(status).toHaveTextContent(/não está ativo/i);
    expect(status.textContent).not.toMatch(/mensagem enviada|enviado com sucesso/i);

    // Os campos continuam preenchidos após o envio.
    expect(screen.getByLabelText("Nome")).toHaveValue("Maria Silva");
  });

  it("dispara pelo botão de verdade, aceitando Enter do teclado", async () => {
    const usuario = await enviarVazio();
    const nome = screen.getByLabelText("Nome");
    await usuario.type(nome, "Maria{Enter}");

    // Enter em campo de texto dentro do form submete: erros aparecem.
    expect(screen.getByText("Informe seu e-mail.")).toBeInTheDocument();
  });
});
