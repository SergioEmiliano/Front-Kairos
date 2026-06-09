import { KairosLogo } from "@/components/common/KairosLogo";

const displayFont = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";
const monoFont = "var(--font-jetbrains), 'JetBrains Mono', monospace";
const bodyFont = "var(--font-inter-tight), 'Inter Tight', system-ui, sans-serif";

const NAV_LINKS = [
  { label: "Calendário IA", href: "#produto" },
  { label: "Gerador", href: "#produto" },
  { label: "Dashboard", href: "#produto" },
  { label: "Painel financeiro", href: "#produto" },
  { label: "DNA Estratégico", href: "#metodo" },
  { label: "Recalibração", href: "#metodo" },
];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        background: "var(--paper)",
        paddingTop: 80,
        paddingBottom: 40,
      }}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          {/* Left: brand */}
          <div>
            <KairosLogo size="md" />
            <p
              style={{
                fontFamily: displayFont,
                fontSize: "clamp(20px, 2.5vw, 28px)",
                fontWeight: 400,
                lineHeight: 1.2,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
                marginTop: 20,
                maxWidth: "28ch",
              }}
            >
              O crescimento acontece no{" "}
              <span style={{ color: "var(--gold)", fontStyle: "italic" }}>
                momento certo.
              </span>
            </p>
          </div>

          {/* Right: nav links */}
          <div className="grid grid-cols-2 gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                style={{
                  fontFamily: bodyFont,
                  fontSize: 13,
                  color: "color-mix(in oklch, var(--ink) 70%, transparent)",
                  transition: "color 0.2s",
                }}
                className="hover:text-[var(--ink)]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{ borderTop: "1px solid var(--line)", paddingTop: 24 }}
          className="flex flex-wrap items-center justify-between gap-4"
        >
          <span
            style={{
              fontFamily: monoFont,
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mute)",
            }}
          >
            © Kairós · MMXXVI
          </span>
          <span
            style={{
              fontFamily: monoFont,
              fontSize: 10,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--mute)",
            }}
          >
            Curadoria · Precisão · SP
          </span>
        </div>
      </div>
    </footer>
  );
}
