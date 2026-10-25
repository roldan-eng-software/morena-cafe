import { vi } from "vitest";

type Ouvinte = () => void;

/**
 * Um único MediaQueryList para toda a suíte: o jsdom não tem matchMedia, o
 * GSAP consulta na importação dos módulos e o Framer Motion guarda a
 * instância. Instâncias novas por chamada deixavam bibliotecas com estado
 * velho — por isso o objeto é singleton, o `matches` é mutado no lugar e os
 * ouvintes são avisados (é como o navegador real se comporta).
 */
const ouvintes = new Set<Ouvinte>();

const mq = {
  matches: false,
  media: "(prefers-reduced-motion: reduce)",
  onchange: null,
  addEventListener: (_tipo: string, cb: Ouvinte) => {
    ouvintes.add(cb);
  },
  removeEventListener: (_tipo: string, cb: Ouvinte) => {
    ouvintes.delete(cb);
  },
  addListener: (cb: Ouvinte) => {
    ouvintes.add(cb);
  },
  removeListener: (cb: Ouvinte) => {
    ouvintes.delete(cb);
  },
  dispatchEvent: () => true,
} as unknown as MediaQueryList & { matches: boolean };

/** Simula a preferência de sistema por movimento reduzido antes do render. */
export function definirMovimento(reduzido: boolean): void {
  const mudou = mq.matches !== reduzido;
  mq.matches = reduzido;
  window.matchMedia = vi.fn(() => mq);
  if (mudou) {
    for (const cb of [...ouvintes]) cb();
  }
}

// Padrão já na carga do arquivo (antes de qualquer import de componente).
definirMovimento(false);
