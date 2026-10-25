import { Entrada } from "@/components/entrada";
import { Marcador } from "@/components/marcador";
import { Card, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { cardapio } from "@/lib/conteudo";

/**
 * Seção Cardápio (PRD, Spec 05). É a única seção clara: a classe `.tema-claro`
 * redefinir os tokens no escopo troca a paleta inteira sem código duplicado.
 */
export function Cardapio() {
  return (
    <section
      id="cardapio"
      className="tema-claro scroll-mt-20 bg-background py-20 sm:py-28"
    >
      <div className="mx-auto max-w-6xl px-6">
        <Entrada>
          <p className="text-xs font-medium tracking-[0.28em] text-cafe-medio uppercase">
            Do balcão
          </p>
          <h2 className="mt-3 text-titulo-secao">{cardapio.titulo}</h2>
          <p className="mt-4 max-w-2xl text-destaque text-cafe-medio">
            {cardapio.introducao}
          </p>
        </Entrada>

        <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cardapio.itens.map((item, i) => (
            <li key={item.nome}>
              <Entrada atraso={i * 0.06} className="h-full">
                <Card className="h-full transition-transform duration-300 ease-out hover:-translate-y-1">
                  <CardHeader>
                    <h3 className="text-lg">{item.nome}</h3>
                    <CardDescription className="text-sm leading-relaxed">
                      <Marcador texto={item.descricao} />
                    </CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <span className="font-heading text-base font-semibold">
                      <Marcador texto={item.preco} />
                    </span>
                  </CardFooter>
                </Card>
              </Entrada>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
