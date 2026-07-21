import { Reveal } from "@/components/common/Reveal";

const displayFont = "var(--font-cormorant), 'Cormorant Garamond', Georgia, serif";
const monoFont = "var(--font-jetbrains), 'JetBrains Mono', monospace";
const bodyFont = "var(--font-inter-tight), 'Inter Tight', system-ui, sans-serif";

const TRACKS = [
  { label: "Posicionamento de marca", category: "Estratégia", pct: 88, active: true },
  { label: "Copywriting médico", category: "Copy", pct: 64, active: false },
  { label: "Meta Ads & Métricas", category: "Performance", pct: 47, active: false },
  { label: "Receita previsível", category: "Negócio", pct: 31, active: false },
  { label: "Precificação premium", category: "Financeiro", pct: 12, active: false },
];

const ALFRED_BULLETS = [
  "Acompanha sua jornada semana a semana",
  "Explica o que cada número significa para o seu negócio",
  "Identifica oportunidades de melhoria no seu funil",
  "Sugere materiais da Biblioteca certos para o seu momento",
  "Orienta quais indicadores você precisa alcançar",
];

function Ring({ pct, active = false }: { pct: number; active?: boolean }) {
  const size = 52;
  const stroke = 4.5;
  const r = (size - stroke * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  const cx = size / 2;
  return (
    <div style={{ position: "relative", width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle
          cx={cx} cy={cx} r={r} fill="none"
          stroke={active
            ? "color-mix(in oklch, var(--gold) 22%, transparent)"
            : "color-mix(in oklch, var(--mute) 30%, transparent)"}
          strokeWidth={stroke}
        />
        <circle
          cx={cx} cy={cx} r={r} fill="none"
          stroke={active ? "var(--gold)" : "color-mix(in oklch, var(--mute) 55%, transparent)"}
          strokeWidth={stroke}
          strokeDasharray={`${circ}`}
          strokeDashoffset={`${offset}`}
          strokeLinecap="round"
        />
      </svg>
      <div
        style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: monoFont, fontSize: 9,
          color: active ? "var(--gold)" : "var(--mute)",
          letterSpacing: "0.04em",
        }}
      >
        {pct}%
      </div>
    </div>
  );
}

function SheepSilhouette() {
  return (
    <svg
      viewBox="0 0 200 210"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ width: "100%", maxWidth: 180, display: "block", margin: "0 auto" }}
    >
      {/* Wool cloud — overlapping circles form the fluffy top */}
      <circle cx="100" cy="50" r="34" fill="var(--ink)" />
      <circle cx="64" cy="66" r="27" fill="var(--ink)" />
      <circle cx="136" cy="66" r="27" fill="var(--ink)" />
      <circle cx="40" cy="96" r="21" fill="var(--ink)" />
      <circle cx="160" cy="96" r="21" fill="var(--ink)" />
      {/* Main head oval */}
      <ellipse cx="100" cy="128" rx="54" ry="52" fill="var(--ink)" />
      {/* Drooping ears */}
      <ellipse cx="36" cy="116" rx="13" ry="19" fill="var(--ink)" transform="rotate(-18 36 116)" />
      <ellipse cx="164" cy="116" rx="13" ry="19" fill="var(--ink)" transform="rotate(18 164 116)" />
      {/* Muzzle */}
      <ellipse cx="100" cy="162" rx="34" ry="27" fill="var(--ink)" />
      {/* Chifres — traçado único em espiral, preenchido por dentro (não mais
          oco), levemente menor, na lateral da cabeça. */}
      <g transform="translate(52,60) scale(0.8) translate(-52,-60)">
        <path
          d="M52,58 C22,54 2,74 6,100 C9,122 28,136 50,130 C36,126 28,112 34,98 C39,88 50,84 58,90"
          fill="var(--gold)" stroke="var(--gold)" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round"
        />
      </g>
      <g transform="translate(148,60) scale(0.8) translate(-148,-60)">
        <path
          d="M148,58 C178,54 198,74 194,100 C191,122 172,136 150,130 C164,126 172,112 166,98 C161,88 150,84 142,90"
          fill="var(--gold)" stroke="var(--gold)" strokeWidth="13" strokeLinecap="round" strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function DiferenciaisSection() {
  return (
    <section
      id="diferenciais"
      style={{ paddingTop: 120, paddingBottom: 120, borderTop: "1px solid var(--line)" }}
    >
      <div className="max-w-[1240px] mx-auto px-6 lg:px-10">
        {/* ── Header ── */}
        <Reveal>
          <span className="kicker">Diferenciais</span>
        </Reveal>
        <Reveal delay={1}>
          <h2
            style={{
              fontFamily: displayFont,
              fontSize: "clamp(34px, 4.5vw, 56px)",
              fontWeight: 400,
              lineHeight: 0.96,
              letterSpacing: "-0.04em",
              color: "var(--ink)",
              marginTop: 24,
              maxWidth: "22ch",
            }}
          >
            Além da produção.{" "}
            <span style={{ color: "var(--gold)", fontStyle: "italic" }}>
              Um ecossistema.
            </span>
          </h2>
        </Reveal>

        {/* ── BIBLIOTECA ── conteúdo esquerda → visual direita ── */}
        <div className="mt-24 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal>
            <div>
              <span
                style={{
                  fontFamily: monoFont,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                ◆ Biblioteca Kairós
              </span>
              <h3
                style={{
                  fontFamily: displayFont,
                  fontSize: "clamp(26px, 3vw, 40px)",
                  fontWeight: 400,
                  lineHeight: 1.0,
                  letterSpacing: "-0.03em",
                  color: "var(--ink)",
                  marginTop: 20,
                }}
              >
                Conhecimento que{" "}
                <span style={{ color: "var(--gold)", fontStyle: "italic" }}>gera resultado.</span>
              </h3>
              <p
                style={{
                  fontFamily: bodyFont,
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "var(--ink-soft)",
                  marginTop: 20,
                  maxWidth: "48ch",
                }}
              >
                Acreditamos que conhecimento gera resultados. Por isso, a Kairós vai além da
                produção de conteúdo: somos um ecossistema de crescimento. Tenha acesso a uma
                biblioteca exclusiva de materiais estratégicos para aprofundar seu conhecimento,
                fortalecer sua autoridade e acelerar seus resultados.
              </p>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div
              style={{
                border: "1px solid var(--line)",
                borderRadius: "var(--radius)",
                background: "var(--paper-surface)",
                overflow: "hidden",
              }}
            >
              {/* Card header */}
              <div
                style={{
                  padding: "18px 24px",
                  borderBottom: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <span
                  style={{
                    fontFamily: monoFont,
                    fontSize: 9,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "var(--mute)",
                  }}
                >
                  Biblioteca Kairós · 5 trilhas
                </span>
                <span
                  style={{
                    fontFamily: monoFont,
                    fontSize: 8,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    border: "1px solid color-mix(in oklch, var(--gold) 40%, transparent)",
                    padding: "2px 8px",
                    borderRadius: 99,
                  }}
                >
                  Em andamento
                </span>
              </div>

              {/* Track list */}
              <div style={{ padding: "4px 0" }}>
                {TRACKS.map((track) => (
                  <div
                    key={track.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "13px 24px",
                      background: track.active
                        ? "color-mix(in oklch, var(--gold) 5%, transparent)"
                        : "transparent",
                      borderLeft: track.active
                        ? "2px solid var(--gold)"
                        : "2px solid transparent",
                    }}
                  >
                    <Ring pct={track.pct} active={track.active} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontFamily: bodyFont,
                          fontSize: 13,
                          color: track.active ? "var(--ink)" : "var(--ink-soft)",
                          fontWeight: track.active ? 500 : 400,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {track.label}
                      </div>
                      <div
                        style={{
                          fontFamily: monoFont,
                          fontSize: 8,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "var(--mute)",
                          marginTop: 3,
                        }}
                      >
                        {track.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Separator */}
        <div
          style={{
            margin: "96px 0",
            height: 1,
            background:
              "linear-gradient(90deg, transparent, var(--line) 15%, var(--line) 85%, transparent)",
          }}
        />

        {/* ── ASSISTENTE PESSOAL ── visual esquerda ← conteúdo direita ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <Reveal>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "var(--paper-warm)",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius)",
                padding: "52px 24px",
                minHeight: 320,
              }}
            >
              <SheepSilhouette />
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div>
              <span
                style={{
                  fontFamily: monoFont,
                  fontSize: 10,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                ◆ Assistente Pessoal
              </span>
              <h3
                style={{
                  fontFamily: displayFont,
                  fontSize: "clamp(26px, 3vw, 40px)",
                  fontWeight: 400,
                  lineHeight: 1.0,
                  letterSpacing: "-0.03em",
                  color: "var(--ink)",
                  marginTop: 20,
                }}
              >
                Você não caminha{" "}
                <span style={{ color: "var(--gold)", fontStyle: "italic" }}>sozinha.</span>
              </h3>
              <p
                style={{
                  fontFamily: bodyFont,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: "var(--ink-soft)",
                  marginTop: 16,
                }}
              >
                Dentro da Kairós, você não caminha sozinha.
              </p>
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "20px 0 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                {ALFRED_BULLETS.map((b) => (
                  <li
                    key={b}
                    style={{
                      display: "flex",
                      alignItems: "baseline",
                      gap: 12,
                      fontFamily: bodyFont,
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: "var(--ink)",
                    }}
                  >
                    <span style={{ color: "var(--gold)", fontSize: 10, flexShrink: 0 }}>◆</span>
                    {b}
                  </li>
                ))}
              </ul>
              <blockquote
                style={{
                  fontFamily: displayFont,
                  fontSize: "clamp(18px, 2vw, 24px)",
                  fontStyle: "italic",
                  color: "var(--ink-soft)",
                  marginTop: 32,
                  marginLeft: 0,
                  lineHeight: 1.4,
                  maxWidth: "40ch",
                  letterSpacing: "-0.01em",
                  borderLeft: "2px solid var(--gold)",
                  paddingLeft: 20,
                }}
              >
                Como ter um estrategista ao seu lado, transformando dados em direcionamento.
              </blockquote>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
