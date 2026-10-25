import { navegacao } from "@/lib/conteudo";

/**
 * Cabeçalho fixo (PRD, Spec 02). Os links são âncoras simples: funcionam
 * inclusive sem JavaScript e em qualquer largura de tela — no celular a
 * navegação continua visível, ao contrário do site anterior.
 */
export default function Topo() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/50 bg-background/95">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a
          href="#hero"
          className="font-heading text-base tracking-tight text-creme outline-offset-4 sm:text-lg"
        >
          Morena <span className="text-dourado">Café</span>
        </a>
        <nav aria-label="Navegação principal">
          <ul className="flex items-center gap-4 sm:gap-7">
            {navegacao.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-sm text-sm text-creme/80 transition-colors hover:text-dourado focus-visible:text-dourado"
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
