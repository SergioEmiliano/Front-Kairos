import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import "../app/globals.css";

// Unified typeface: Inter Tight is used everywhere — body, display, and labels.
// Three CSS variables are kept for back-compat so existing CSS still resolves.
const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kairós — Sistema de crescimento previsível",
  description: "Infraestrutura de crescimento clínico para medicina estética — conteúdo conectado a faturamento.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Alias --font-cormorant / --font-work-sans / --font-mono onto the same typeface
  // so that component-level CSS continues to work without rewrites.
  const aliasClass = `${interTight.variable}`;
  return (
    <html
      lang="pt-BR"
      className={aliasClass}
      style={
        {
          // re-alias the historical CSS vars onto the single font variable
          ["--font-cormorant" as never]: "var(--font-inter-tight)",
          ["--font-work-sans" as never]: "var(--font-inter-tight)",
          ["--font-mono" as never]: "var(--font-inter-tight)",
        } as React.CSSProperties
      }
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
