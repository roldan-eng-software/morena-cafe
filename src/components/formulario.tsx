"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { retornoFormulario } from "@/lib/conteudo";

type Campos = "nome" | "email" | "mensagem";
type Erros = Partial<Record<Campos, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validar(campo: Campos, valor: string): string | undefined {
  const limpo = valor.trim();
  if (campo === "email") {
    if (!limpo) return "Informe seu e-mail.";
    if (!EMAIL.test(limpo)) return "Informe um e-mail válido.";
    return undefined;
  }
  if (!limpo) {
    return campo === "nome" ? "Informe seu nome." : "Escreva uma mensagem.";
  }
  return undefined;
}

/**
 * Formulário de contato com validação honesta (PRD, Spec 06).
 *
 * - Erros são sinalizados por campo sem apagar nada do digitado;
 * - o foco vai ao primeiro campo inválido;
 * - com tudo válido o retorno diz claramente que o envio ainda não está
 *   ativo — nunca anuncia entrega que não existe.
 */
export default function Formulario() {
  const [erros, setErros] = useState<Erros>({});
  const [retorno, setRetorno] = useState<string | null>(null);

  const nomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const mensagemRef = useRef<HTMLTextAreaElement>(null);

  function focarPrimeiro(campos: Campos[]) {
    if (campos.includes("nome")) nomeRef.current?.focus();
    else if (campos.includes("email")) emailRef.current?.focus();
    else if (campos.includes("mensagem")) mensagemRef.current?.focus();
  }

  function aoAlterar(campo: Campos, valor: string) {
    // Corrigir o campo some com o erro na hora, sem tocar nos demais.
    setErros((antes) => {
      if (!antes[campo]) return antes;
      const erro = validar(campo, valor);
      const resto = { ...antes };
      if (erro) resto[campo] = erro;
      else delete resto[campo];
      return resto;
    });
    if (retorno) setRetorno(null);
  }

  function aoEnviar(evento: React.FormEvent<HTMLFormElement>) {
    evento.preventDefault();
    const dados = new FormData(evento.currentTarget);

    const novos: Erros = {};
    (["nome", "email", "mensagem"] as const).forEach((campo) => {
      const erro = validar(campo, String(dados.get(campo) ?? ""));
      if (erro) novos[campo] = erro;
    });

    setErros(novos);
    setRetorno(null);

    const invalidos = (["nome", "email", "mensagem"] as const).filter((c) => novos[c]);
    if (invalidos.length > 0) {
      focarPrimeiro(invalidos);
      return;
    }

    setRetorno(retornoFormulario);
  }

  return (
    <form
      noValidate
      onSubmit={aoEnviar}
      className="flex flex-col gap-5 rounded-xl border border-border/60 bg-card p-5 sm:p-7"
    >
      <div className="flex flex-col gap-2">
        <Label htmlFor="nome">Nome</Label>
        <Input
          id="nome"
          name="nome"
          ref={nomeRef}
          autoComplete="name"
          aria-invalid={erros.nome ? true : undefined}
          aria-describedby={erros.nome ? "erro-nome" : undefined}
          onChange={(e) => aoAlterar("nome", e.target.value)}
        />
        {erros.nome ? (
          <p id="erro-nome" className="text-sm text-erro">
            {erros.nome}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">E-mail</Label>
        <Input
          id="email"
          name="email"
          type="email"
          ref={emailRef}
          autoComplete="email"
          aria-invalid={erros.email ? true : undefined}
          aria-describedby={erros.email ? "erro-email" : undefined}
          onChange={(e) => aoAlterar("email", e.target.value)}
        />
        {erros.email ? (
          <p id="erro-email" className="text-sm text-erro">
            {erros.email}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="mensagem">Mensagem</Label>
        <Textarea
          id="mensagem"
          name="mensagem"
          ref={mensagemRef}
          rows={5}
          aria-invalid={erros.mensagem ? true : undefined}
          aria-describedby={erros.mensagem ? "erro-mensagem" : undefined}
          onChange={(e) => aoAlterar("mensagem", e.target.value)}
        />
        {erros.mensagem ? (
          <p id="erro-mensagem" className="text-sm text-erro">
            {erros.mensagem}
          </p>
        ) : null}
      </div>

      <Button type="submit" className="self-start">
        Enviar mensagem
      </Button>

      <div role="status" aria-live="polite">
        {retorno ? (
          <p className="rounded-md border border-dourado/40 bg-dourado/10 p-3 text-sm text-creme">
            {retorno}
          </p>
        ) : null}
      </div>
    </form>
  );
}
