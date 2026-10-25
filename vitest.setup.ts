import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach, vi } from "vitest";
import { definirMovimento } from "./src/__tests__/apoio";

// jsdom não implementa scrollTo (o gsap/framer podem pedir) — silencia o erro
// sem alterar comportamento dos testes.
window.scrollTo = vi.fn();

// jsdom não tem IntersectionObserver: o Framer Motion o usa no whileInView.
// Sem observador, os elementos continuam existindo no DOM (só não "entram"
// em cena — o que nenhum teste desta suíte depende).
class IntersectionObserverSimulado implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds: readonly number[] = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}
window.IntersectionObserver =
  IntersectionObserverSimulado as unknown as typeof IntersectionObserver;

afterEach(() => {
  cleanup();
});

// Padrão de todos os testes: movimento normal. Quem precisa simular movimento
// reduzido chama definirMovimento(true) antes do render.
beforeEach(() => {
  definirMovimento(false);
});
