import { Reveal } from "@/components/common/Reveal";

const displayFont = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";
const bodyFont = "var(--font-inter-tight), 'Inter Tight', system-ui, sans-serif";

export function AutonomiaSection() {
  return (
    <section
      id="autonomia"
      style={{ paddingTop: 180, paddingBottom: 180, borderTop: "1px solid var(--line)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <span className="kicker">Autonomia da Doutora</span>
            </Reveal>

            <Reveal delay={1}>
              <h2
                style={{
                  fontFamily: displayFont,
                  fontSize: "clamp(44px, 7vw, 104px)",
                  fontWeight: 400,
                  lineHeight: 0.94,
                  letterSpacing: "-0.04em",
                  color: "var(--ink)",
                  marginTop: 24,
                }}
              >
                Você ajusta.
                <br />
                <span style={{ color: "var(--gold)", fontStyle: "italic" }}>
                  A IA se adapta.
                </span>
                <br />
                O sistema recalcula.
              </h2>
            </Reveal>
          </div>

          <Reveal delay={2}>
            <p
              style={{
                fontFamily: bodyFont,
                fontSize: 18,
                lineHeight: 1.65,
                color: "var(--ink-soft)",
                maxWidth: "52ch",
              }}
            >
              Você permanece como autora da sua marca. Kairós opera por baixo
              — aprendendo seu tom, ajustando direção e protegendo o tempo
              da sua agenda clínica.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
