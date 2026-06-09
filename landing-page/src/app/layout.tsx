import type { Metadata } from "next";
import { Inter_Tight, Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["300", "400", "500", "600"],
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
  metadataBase: new URL("https://kairos.med"),
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
