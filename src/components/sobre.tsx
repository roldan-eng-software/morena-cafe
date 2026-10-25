import { Entrada } from "@/components/entrada";
import { Marcador } from "@/components/marcador";
import { sobre } from "@/lib/conteudo";

/** Seção Sobre (PRD, Spec 05): copy original preservada, marcador intacto. */
export function Sobre() {
  return (
    <section
      id="sobre"
      className="scroll-mt-20 border-t border-border/40 bg-background py-20 sm:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-8 px-6 md:grid-cols-[1fr_1.4fr] md:gap-14">
        <Entrada>
          <p className="text-xs font-medium tracking-[0.28em] text-dourado uppercase">
            Sobre
          </p>
          <h2 className="mt-3 text-titulo-secao">{sobre.titulo}</h2>
        </Entrada>
        <Entrada atraso={0.08}>
          <div className="space-y-5 text-destaque text-creme/80">
            {sobre.paragrafos.map((paragrafo) => (
              <p key={paragrafo}>
                <Marcador texto={paragrafo} />
              </p>
            ))}
          </div>
        </Entrada>
      </div>
    </section>
  );
}
