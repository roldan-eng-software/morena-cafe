import { rodape } from "@/lib/conteudo";

export function Rodape() {
  return (
    <footer className="border-t border-border/40 bg-cafe-tinta py-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 text-sm text-creme/65 sm:flex-row sm:items-center sm:justify-between">
        <p>{rodape.copyright}</p>
        <p>{rodape.direitos}</p>
      </div>
    </footer>
  );
}
