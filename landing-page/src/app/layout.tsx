import type { Metadata } from "next";
import { Inter_Tight, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { SmoothAnchorScroll } from "@/components/common/SmoothAnchorScroll";
import "./globals.css";

// Pesos enxutos para o que o site realmente usa (400/500/600) — evita baixar
// famílias de fonte não utilizadas (300/700 do Inter, 300/600 do Cormorant).
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kairós — Sistema de crescimento previsível",
  description:
    "Infraestrutura de crescimento clínico para medicina estética. Curadoria, calibragem e operação contínua. Ciclo maio 2026 — 42 vagas.",
  metadataBase: new URL("https://kairos.com.br"),
  openGraph: {
    title: "Kairós — Sistema de crescimento previsível",
    description:
      "Infraestrutura de crescimento clínico para medicina estética. Conteúdo conectado a faturamento.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={[interTight.variable, cormorant.variable, jetbrainsMono.variable].join(" ")}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <SmoothAnchorScroll />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
