"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/common/Reveal";

export function DarkSection() {
  const [email, setEmail] = useState("");
  const [specialty, setSpecialty] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <section
      id="compromisso"
      className="relative overflow-hidden py-[160px] theme-dark"
      style={{
        background: "var(--ink)",
        color: "var(--paper)",
      }}
    >
      {/* parallax orbs */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 720px 460px at 22% 18%, color-mix(in oklch, var(--gold) 22%, transparent), transparent 60%), radial-gradient(ellipse 600px 420px at 82% 78%, color-mix(in oklch, var(--gold) 14%, transparent), transparent 65%)",
        }}
      />

      <div className="relative max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="grid-12 items-end">
          <div className="col-span-12 md:col-span-7">
            <Reveal>
              <span className="kicker">Compromisso editorial</span>
            </Reveal>
            <Reveal delay={1} as="h2" className="mt-7 editorial-display text-[clamp(44px,6vw,84px)] max-w-[18ch]">
              Não vendemos exposição.{" "}
              <span className="italic-gold">Vendemos previsibilidade.</span>
            </Reveal>
            <Reveal delay={2} as="p" className="mt-7 text-[16px] leading-[1.65] max-w-[56ch]" style={{ color: "color-mix(in oklch, var(--paper) 78%, transparent)" }}>
              Cada doutora que entra passa por curadoria. Operamos em ciclos
              fechados, com vagas limitadas, para garantir calibragem dedicada.
              Quando não há fit, devolvemos direção — não silêncio.
            </Reveal>

            <Reveal delay={3} className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
              {[
                { v: "412", l: "Doutoras avaliadas · 2025" },
                { v: "42", l: "Vagas · ciclo maio 2026" },
                { v: "30", l: "Dias de curadoria aberta" },
              ].map((s) => (
                <div key={s.l} className="flex flex-col gap-1.5">
                  <span
                    className="font-medium italic-gold not-italic"
                    style={{ fontSize: 44, letterSpacing: "-0.03em", lineHeight: 1 }}
                  >
                    {s.v}
                  </span>
                  <span className="mono-label" style={{ color: "color-mix(in oklch, var(--paper) 60%, transparent)" }}>
                    {s.l}
                  </span>
                </div>
              ))}
            </Reveal>
          </div>

          <div className="col-span-12 md:col-span-5 md:pl-6">
            <Reveal delay={3}>
              <div
                className="rounded-[var(--radius)] p-8 md:p-9 backdrop-blur-md"
                style={{
                  background: "color-mix(in oklch, var(--paper) 7%, transparent)",
                  border: "1px solid color-mix(in oklch, var(--paper) 18%, transparent)",
                }}
              >
                {submitted ? (
                  <div className="flex flex-col gap-3">
                    <span className="kicker">Recebido</span>
                    <p className="text-[18px] leading-[1.45] tracking-[-0.015em]" style={{ color: "var(--paper)" }}>
                      Sua candidatura está na fila de leitura. Em até 72 horas
                      você receberá um e-mail da curadora dedicada com o link
                      da entrevista.
                    </p>
                    <p
                      className="mono-label mt-3"
                      style={{ color: "color-mix(in oklch, var(--paper) 60%, transparent)" }}
                    >
                      ◆ Vaga reservada · 7 dias
                    </p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="dark-email" className="mono-label" style={{ color: "color-mix(in oklch, var(--paper) 65%, transparent)" }}>
                        E-mail profissional
                      </label>
                      <input
                        id="dark-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="dra.nome@suaclinica.com.br"
                        className="h-11 px-4 rounded-full text-[14px] transition-colors"
                        style={{
                          background: "color-mix(in oklch, var(--paper) 5%, transparent)",
                          border: "1px solid color-mix(in oklch, var(--paper) 22%, transparent)",
                          color: "var(--paper)",
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label htmlFor="dark-specialty" className="mono-label" style={{ color: "color-mix(in oklch, var(--paper) 65%, transparent)" }}>
                        Especialidade
                      </label>
                      <input
                        id="dark-specialty"
                        type="text"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        placeholder="Harmonização · Dermato · Íntima"
                        className="h-11 px-4 rounded-full text-[14px] transition-colors"
                        style={{
                          background: "color-mix(in oklch, var(--paper) 5%, transparent)",
                          border: "1px solid color-mix(in oklch, var(--paper) 22%, transparent)",
                          color: "var(--paper)",
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="mt-2 inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full text-[14px] font-medium transition-colors"
                      style={{
                        background: "var(--gold)",
                        color: "var(--ink)",
                        border: "1px solid var(--gold)",
                      }}
                    >
                      Solicitar entrada por curadoria
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>

                    <div
                      className="dotted-rule my-1"
                      style={{ color: "color-mix(in oklch, var(--paper) 22%, transparent)" }}
                    />
                    <span
                      className="mono-label text-center"
                      style={{ color: "color-mix(in oklch, var(--paper) 60%, transparent)" }}
                    >
                      ◆ 412 doutoras avaliadas · 42 vagas restantes
                    </span>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
