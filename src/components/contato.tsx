import { Entrada } from "@/components/entrada";
import Formulario from "@/components/formulario";
import { Marcador } from "@/components/marcador";
import { contato } from "@/lib/conteudo";

/** Contato (PRD, Spec 06): dados provisórios + formulário validado. */
export function Contato() {
  return (
    <section id="contato" className="scroll-mt-20 bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-2 md:gap-16">
        <Entrada>
          <p className="text-xs font-medium tracking-[0.28em] text-dourado uppercase">
            Contato
          </p>
          <h2 className="mt-3 text-titulo-secao">{contato.titulo}</h2>

          <dl className="mt-8 flex flex-col gap-5">
            {contato.dados.map((dado) => (
              <div key={dado.rotulo} className="border-l-2 border-caramelo/60 pl-4">
                <dt className="text-xs tracking-[0.2em] text-creme/55 uppercase">
                  {dado.rotulo}
                </dt>
                <dd className="mt-1 text-destaque">
                  <Marcador texto={dado.valor} />
                </dd>
              </div>
            ))}
          </dl>
        </Entrada>

        <Entrada atraso={0.08}>
          <Formulario />
        </Entrada>
      </div>
    </section>
  );
}
