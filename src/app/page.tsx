import Topo from "@/components/topo";
import Hero from "@/components/hero";
import { Sobre } from "@/components/sobre";
import { Cardapio } from "@/components/cardapio";
import { Depoimentos } from "@/components/depoimentos";
import { FaixaCta } from "@/components/faixa-cta";
import { Contato } from "@/components/contato";
import { Rodape } from "@/components/rodape";

/**
 * Landing page da Morena Café e Gastronomia (PRD, Spec 02).
 * Ordem das seções: cabeçalho fixo → hero → sobre → cardápio → depoimentos
 * → faixa de CTA → contato → rodapé.
 */
export default function Pagina() {
  return (
    <>
      <Topo />
      <main>
        <Hero />
        <Sobre />
        <Cardapio />
        <Depoimentos />
        <FaixaCta />
        <Contato />
      </main>
      <Rodape />
    </>
  );
}
