import type { Metadata } from "next";
import { Fraunces, Karla } from "next/font/google";
import "./globals.css";

/*
  Tipografia de marca (PRD, Spec 01):
  - Fraunces (display): serifa variável de caráter — títulos, marca e citações.
  - Karla (corpo): grotesca legível e com personalidade — texto corrido.
  Ambas são auto-hospedadas pelo next/font: nenhuma requisição externa a terceiros
  no carregamento (PRD, Spec 08).
*/
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-displayo",
  display: "swap",
});

const karla = Karla({
  subsets: ["latin"],
  variable: "--font-corpo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Morena Café e Gastronomia",
  description: "Morena Café e Gastronomia: um momento para saborear.",
  applicationName: "Morena Café e Gastronomia",
  openGraph: {
    title: "Morena Café e Gastronomia",
    description: "Morena Café e Gastronomia: um momento para saborear.",
    locale: "pt_BR",
    type: "website",
    siteName: "Morena Café e Gastronomia",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${karla.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        {/*
          Sem JavaScript o estilo inline do Framer Motion nas entradas ficaria
          permanente e esconderia o conteúdo (Spec 08: a página precisa ser
          legível com JS desabilitado). Este <noscript> devolve a visibilidade.
        */}
        <noscript>
          <style>{`.entrada-el { opacity: 1 !important; transform: none !important; }`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
