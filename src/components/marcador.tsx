import type { ReactNode } from "react";

/**
 * Realca visualmente os marcadores de conteúdo provisório `[...]` (regra R1).
 * Só muda aparência — o texto entregue permanece byte a byte o mesmo.
 */
export function Marcador({ texto }: { texto: string }): ReactNode {
  const partes = texto.split(/(\[[^\]]*\])/g);

  return (
    <>
      {partes.map((parte, i) =>
        parte.startsWith("[") && parte.endsWith("]") ? (
          <span key={i} className="marcador">
            {parte}
          </span>
        ) : (
          parte
        ),
      )}
    </>
  );
}
