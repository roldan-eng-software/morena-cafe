import { Entrada } from "@/components/entrada";
import { buttonVariants } from "@/components/ui/button";
import { faixaCta } from "@/lib/conteudo";

/** Faixa de CTA (PRD, Spec 05): faixa estreita que leva ao contato. */
export function FaixaCta() {
  return (
    <section className="border-y border-caramelo/30 bg-cafe-tinta py-14">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 md:flex-row md:items-center md:justify-between">
        <Entrada>
          <h2 className="text-titulo-secao">{faixaCta.titulo}</h2>
          <p className="mt-3 max-w-xl text-destaque text-creme/75">{faixaCta.texto}</p>
        </Entrada>
        <Entrada atraso={0.08}>
          <a href={faixaCta.acao.href} className={buttonVariants()}>
            {faixaCta.acao.rotulo}
          </a>
        </Entrada>
      </div>
    </section>
  );
}
