import { Entrada } from "@/components/entrada";
import { Marcador } from "@/components/marcador";
import { depoimentos } from "@/lib/conteudo";

/** Depoimentos (PRD, Spec 05): três citações, autores ainda provisórios. */
export function Depoimentos() {
  return (
    <section id="depoimentos" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Entrada>
          <p className="text-xs font-medium tracking-[0.28em] text-dourado uppercase">
            Depoimentos
          </p>
          <h2 className="mt-3 text-titulo-secao">{depoimentos.titulo}</h2>
        </Entrada>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {depoimentos.itens.map((item, i) => (
            <li key={item.citacao}>
              <Entrada atraso={i * 0.07} className="h-full">
                <figure className="flex h-full flex-col gap-4 rounded-xl border border-border/60 bg-card p-6">
                  <span
                    aria-hidden="true"
                    className="font-heading text-4xl text-dourado/70"
                  >
                    “
                  </span>
                  <blockquote className="text-base leading-relaxed text-creme/85">
                    <Marcador texto={item.citacao} />
                  </blockquote>
                  <figcaption className="mt-auto text-sm text-creme/60">
                    <Marcador texto={item.autor} />
                  </figcaption>
                </figure>
              </Entrada>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
