"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { frases, indicadorHero } from "@/lib/conteudo";

type Estado = "animado" | "estatico";

const DURACAO_LINHA = 10; // duração fixa da timeline (mesma do site legado)
const TROCA_UM = 2.2; // frase 0 → frase 1
const TROCA_DOIS = 5.2; // frase 1 → frase 2
const TRANSICAO = 0.6;
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
 * Hero com vídeo sincronizado à rolagem (PRD, Spec 03).
 *
 * A rolagem fixa a seção (pin) e, com scrub, avança o `currentTime` do vídeo
 * de 0 à duração total enquanto as três frases trocam nas posições fixas da
 * timeline. Com `prefers-reduced-motion` nada disso é montado: fica o pôster
 * estático com a primeira frase.
 *
 * GSAP fica isolado neste componente e todo o contexto é revertido no
 * cleanup — nenhum ScrollTrigger sobrevive à desmontagem (Spec 09, caso 3).
 */
export default function Hero() {
  const raiz = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduzido = useReducaoMovimento();
  const estado: Estado = reduzido ? "estatico" : "animado";

  useEffect(() => {
    // Preferência lida direto da plataforma: quem pediu calma não monta GSAP.
    if (window.matchMedia(CONSULTA_MOVIMENTO).matches) return;

    const raizEl = raiz.current;
    if (!raizEl) return;

    // O elemento fixado é o interno (.hero-alvo), nunca o <section> que o
    // React é dono: assim o ScrollTrigger não reorganiza o DOM sob os pés do
    // React na desmontagem (o pin envolve o alvo com o pin-spacer dentro).
    const alvo = raizEl.querySelector<HTMLElement>(".hero-alvo") ?? raizEl;

    const video = videoRef.current;
    let duracao = 0;

    // Metadados podem chegar depois: a timeline já nasce e o scrub do vídeo
    // passa a valer assim que a duração for conhecida. Sem NaN, sem travar.
    const aoCarregarMetadados = () => {
      const d = video?.duration;
      duracao = typeof d === "number" && Number.isFinite(d) && d > 0 ? d : 0;
    };
    if (video) {
      aoCarregarMetadados();
      video.addEventListener("loadedmetadata", aoCarregarMetadados);
    }

    // GSAP entra por import() dinâmico: o bundle inicial não paga o custo da
    // biblioteca (~110KB) — o chunk só é buscado depois da primeira pintura,
    // quando o visitante ainda está na hero. A rolagem só começa a ser
    // manipulada de qualquer forma depois que a página está de pé.
    let cancelado = false;
    let reverter: (() => void) | undefined;

    void (async () => {
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelado) return; // desmontou antes do chunk chegar: não monta nada

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const [f0, f1, f2] = gsap.utils.toArray<HTMLElement>(".frase", raizEl);

        const progresso = { t: 0 };
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: raizEl,
            start: "top top",
            end: "+=300%",
            pin: alvo,
            scrub: 1,
            anticipatePin: 1,
          },
        });

        // Vídeo: 0 → último frame ao longo da timeline inteira (duração 10).
        tl.to(
          progresso,
          {
            t: DURACAO_LINHA,
            duration: DURACAO_LINHA,
            ease: "none",
            onUpdate: () => {
              if (!video || duracao === 0) return;
              const alvo = (progresso.t / DURACAO_LINHA) * duracao;
              if (Number.isFinite(alvo)) video.currentTime = alvo;
            },
          },
          0,
        );

        // Frases: trocas fixas, sempre uma visível por vez.
        if (f0 && f1) {
          tl.to(
            f0,
            { opacity: 0, y: -28, duration: TRANSICAO, ease: "none" },
            TROCA_UM,
          );
          tl.fromTo(
            f1,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: TRANSICAO, ease: "none" },
            TROCA_UM,
          );
        }
        if (f1 && f2) {
          tl.to(
            f1,
            { opacity: 0, y: -28, duration: TRANSICAO, ease: "none" },
            TROCA_DOIS,
          );
          tl.fromTo(
            f2,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, duration: TRANSICAO, ease: "none" },
            TROCA_DOIS,
          );
        }
      }, raizEl);

      reverter = () => ctx.revert();
    })();

    return () => {
      cancelado = true;
      video?.removeEventListener("loadedmetadata", aoCarregarMetadados);
      reverter?.();
    };
  }, []);

  return (
    <section
      ref={raiz}
      id="hero"
      data-estado={estado}
      className="hero-fixa relative w-full"
    >
      <div className="hero-alvo relative flex h-[100svh] min-h-[36rem] w-full items-center overflow-hidden">
        <div className="hero-camada" aria-hidden="true">
          <video
            ref={videoRef}
            poster="/hero-cafe-poster.jpg"
            preload="metadata"
            muted
            playsInline
          >
            <source src="/hero-cafe.webm" type="video/webm" />
            <source src="/hero-cafe.mp4" type="video/mp4" />
          </video>
          <div className="veu" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-10 sm:px-8">
          <div className="relative min-h-[22rem]">
            {frases.map((frase) => (
              <div
                key={frase.fase}
                className="frase"
                data-fase={frase.fase}
                hidden={reduzido && frase.fase !== 0}
              >
                <span className="text-xs font-medium tracking-[0.28em] text-dourado uppercase">
                  {frase.etiqueta}
                </span>
                {frase.fase === 0 ? (
                  <h1 className="text-titulo text-creme">{frase.titulo}</h1>
                ) : (
                  <h2 className="text-titulo text-creme">{frase.titulo}</h2>
                )}
                <p className="max-w-xl text-destaque text-creme/85">{frase.texto}</p>
                {frase.acao ? (
                  <div className="mt-2">
                    <Button nativeButton={false} render={<a href={frase.acao.href} />}>
                      {frase.acao.rotulo}
                    </Button>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>

        {estado === "animado" ? (
          <div className="absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-2">
            <span className="traco" aria-hidden="true" />
            <span className="text-[0.68rem] tracking-[0.24em] text-creme/70 uppercase">
              {indicadorHero}
            </span>
          </div>
        ) : null}
      </div>
    </section>
  );
}
