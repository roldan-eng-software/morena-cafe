"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const CONSULTA_MOVIMENTO = "(prefers-reduced-motion: reduce)";

/**
 * Preferência de movimento reduzido como store externo: o valor do servidor
 * (false) é usado na hidratação e corrigido logo em seguida sem mismatch.
 */
function useReducaoMovimento(): boolean {
  return useSyncExternalStore(
    (aoMudar) => {
      const mq = window.matchMedia(CONSULTA_MOVIMENTO);
      mq.addEventListener("change", aoMudar);
      return () => mq.removeEventListener("change", aoMudar);
    },
    () => window.matchMedia(CONSULTA_MOVIMENTO).matches,
    () => false,
  );
}

/**
 * Entrada única de uma seção (PRD, Spec 04): deslocamento curto + opacidade,
 * disparada uma vez quando o bloco entra na viewport.
 *
 * Implementado com IntersectionObserver + transição CSS em vez de uma lib de
 * animação: o comportamento é o mesmo (uma vez, só na entrada), o JS que sai
 * no bundle é uma dezena de linhas em vez de dezenas de KB — e foi o que
 * derrubou o TBT da página na auditoria de performance.
 *
 * Com movimento reduzido o wrapper nem ganha a classe `entrada-el`: o conteúdo
 * aparece no lugar, sem nenhum estilo de animação. Sem JavaScript a regra
 * `.entrada-el` do `<noscript>` do layout devolve a visibilidade que o estado
 * inicial (data-visivel="false") esconderia.
 */
export function Entrada({
  children,
  className,
  atraso = 0,
}: {
  children: React.ReactNode;
  className?: string;
  atraso?: number;
}) {
  const raiz = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);
  const reduzido = useReducaoMovimento();

  useEffect(() => {
    if (reduzido) return; // sem movimento não há o que observar

    const el = raiz.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entradas) => {
        if (entradas.some((e) => e.isIntersecting)) {
          setVisivel(true);
          io.disconnect(); // uma vez só: a entrada nunca se repete
        }
      },
      { threshold: 0.25 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduzido]);

  if (reduzido) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={raiz}
      className={`entrada-el ${className ?? ""}`.trim()}
      data-visivel={visivel ? "true" : "false"}
      style={atraso > 0 ? { transitionDelay: `${atraso}s` } : undefined}
    >
      {children}
    </div>
  );
}
