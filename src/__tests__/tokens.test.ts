import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const caminho = resolve(process.cwd(), "src/app/globals.css");
const css = readFileSync(caminho, "utf8");

const TOKENS_MARCA = [
  "--cafe-fundo",
  "--cafe-tinta",
  "--cafe-medio",
  "--creme",
  "--creme-fundo",
  "--creme-card",
  "--caramelo",
  "--dourado",
  "--erro",
] as const;

describe("Spec 09 (7) / R5 — tokens de design", () => {
  it("os nove tokens da marca existem no :root", () => {
    const root = css.match(/:root\s*{[^}]*}/);
    expect(root).not.toBeNull();
    for (const token of TOKENS_MARCA) {
      expect(root![0], token).toContain(`${token}:`);
    }
  });

  it("nenhum hex existe fora do bloco de tokens da marca", () => {
    // Comentários saem primeiro: os hex só podem viver no :root.
    const semComentarios = css.replace(/\/\*[\s\S]*?\*\//g, "");
    const root = semComentarios.match(/:root\s*{[^}]*}/);
    expect(root).not.toBeNull();

    const foraDoRoot = semComentarios.replace(root![0], "");
    const hexs = foraDoRoot.match(/#[0-9a-fA-F]{3,8}\b/g) ?? [];
    expect(hexs, `hexes fora dos tokens: ${hexs.join(", ")}`).toEqual([]);
  });

  it("nenhuma família de fonte de sistema vira display", () => {
    expect(css).not.toMatch(/font-family:\s*(Georgia|system-ui|serif)/i);
  });
});
