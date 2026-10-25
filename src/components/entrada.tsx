"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Entrada única de uma seção (PRD, Spec 04): deslocamento curto + opacidade,
 * disparada uma vez quando o bloco entra na viewport. Com movimento reduzido
 * o conteúdo aparece no lugar, sem nenhum estilo de animação.
 *
 * A classe `entrada-el` existe para o <noscript> do layout: sem JS o inline
 * style do motion seria permanente e esconderia o conteúdo.
 */
export function Entrada({
  children,
  className,
  atraso = 0,
}: {
  children: ReactNode;
  className?: string;
  atraso?: number;
}) {
  const reduzido = useReducedMotion();

  if (reduzido) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={`entrada-el ${className ?? ""}`.trim()}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay: atraso }}
    >
      {children}
    </motion.div>
  );
}
