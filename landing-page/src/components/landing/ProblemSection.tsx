import { Reveal } from "@/components/common/Reveal";

const PROBLEMS = [
  {
    n: "01",
    title: "Conteúdo sem estratégia",
    body: "Postagens diárias que não se conectam a nenhuma meta concreta de faturamento.",
  },
  {
    n: "02",
    title: "Engajamento sem conversão",
    body: "Views e curtidas que não se traduzem em pacientes na agenda.",
  },
  {
    n: "03",
    title: "Crescimento imprevisível",
    body: "Meses bons alternados com meses silenciosos sem saber o porquê.",
  },
];

const displayFont = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";
const monoFont = "var(--font-jetbrains), 'JetBrains Mono', monospace";

export function ProblemSection() {
  return (
    <section
      id="problema"
      style={{ paddingTop: 180, paddingBottom: 180, borderTop: "1px solid var(--line)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <Reveal>
          <span className="kicker">O Problema Real</span>
        </Reveal>

        <Reveal delay={1}>
          <h2
            style={{
              fontFamily: displayFont,
              fontSize: "clamp(48px, 7vw, 96px)",
              fontWeight: 400,
              lineHeight: 1.0,
              letterSpacing: "-0.04em",
              color: "var(--ink)",
              marginTop: 24,
              maxWidth: "22ch",
            }}
          >
            Você produz conteúdo,{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>
              mas não vê resultado
            </span>
          </h2>
        </Reveal>

        <div
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-0"
          style={{ borderTop: "1px solid var(--line)" }}
        >
          {PROBLEMS.map((p, i) => (
            <Reveal key={p.n} delay={(i % 3) as 0 | 1 | 2}>
              <div
                className="py-10 pr-10"
                style={{
                  borderRight: i < 2 ? "1px solid var(--line)" : "none",
                  paddingLeft: i === 0 ? 0 : 40,
                }}
              >
                <span
                  style={{
                    fontFamily: displayFont,
                    fontSize: 56,
                    fontWeight: 400,
                    color: "var(--gold)",
                    lineHeight: 1,
                    display: "block",
                    marginBottom: 20,
                  }}
                >
                  {p.n}
                </span>
                <h3
                  style={{
                    fontFamily: displayFont,
                    fontSize: 26,
                    fontWeight: 400,
                    color: "var(--ink)",
                    letterSpacing: "-0.02em",
                    marginBottom: 12,
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: 15,
                    lineHeight: 1.65,
                    color: "var(--ink-soft)",
                    maxWidth: "36ch",
                    fontFamily: "var(--font-inter-tight), system-ui, sans-serif",
                  }}
                >
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
