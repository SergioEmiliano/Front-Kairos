"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { KairosLogo } from "@/components/common/KairosLogo";

interface Props {
  onNext: () => void;
}

type E4 = [number, number, number, number];
const ease: E4 = [0.25, 0.4, 0.25, 1];

export function WelcomeStep({ onNext }: Props) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bokeh-bg">
      {/* ── Ambient light orbs — use CSS vars so they adapt to the theme ── */}

      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, ease }}
        style={{
          top: "-10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at top, color-mix(in oklch, var(--gold) 14%, transparent) 0%, transparent 65%)",
        }}
      />

      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.4, ease }}
        style={{
          bottom: "0%",
          left: "-5%",
          width: 480,
          height: 480,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--gold-soft) 10%, transparent), transparent 70%)",
        }}
      />

      <motion.div
        className="absolute pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, delay: 0.7, ease }}
        style={{
          top: "30%",
          right: "-8%",
          width: 360,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--steel) 12%, transparent), transparent 70%)",
        }}
      />

      {/* Subtle horizontal accent line */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "50%",
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(to right, transparent, color-mix(in oklch, var(--gold) 12%, transparent) 30%, color-mix(in oklch, var(--gold) 18%, transparent) 50%, color-mix(in oklch, var(--gold) 12%, transparent) 70%, transparent)",
          transform: "translateY(-50%)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-[700px]">

        <motion.div
          initial={{ opacity: 0, y: -14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease }}
          className="mb-10"
        >
          <KairosLogo size="md" />
        </motion.div>

        {/* Kicker */}
        <motion.div
          className="flex items-center gap-3 mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div style={{ width: 32, height: 1, background: "color-mix(in oklch, var(--gold) 45%, transparent)" }} />
          <span className="kicker" style={{ letterSpacing: "0.3em" }}>
            Plataforma de IA
          </span>
          <div style={{ width: 32, height: 1, background: "color-mix(in oklch, var(--gold) 45%, transparent)" }} />
        </motion.div>

        {/* Headline — var(--ink) adapts: dark in light mode, light in dark mode */}
        <motion.h1
          style={{
            fontSize: "clamp(44px, 7vw, 80px)",
            fontWeight: 500,
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
            color: "var(--ink)",
            marginBottom: 24,
          }}
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease }}
        >
          Bem-vinda à{" "}
          <span className="italic-gold">Kairós.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          style={{
            fontSize: 17,
            lineHeight: 1.65,
            color: "var(--ink-soft)",
            opacity: 0.7,
            maxWidth: 480,
            marginBottom: 48,
          }}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 0.7, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8, ease }}
        >
          Sua IA especializada em estética médica está pronta para aprender sobre sua clínica e criar sua estratégia de conteúdo.
        </motion.p>

        {/* CTA */}
        <motion.button
          onClick={onNext}
          className="btn-gold flex items-center gap-3"
          style={{ padding: "15px 36px", fontSize: 15 }}
          initial={{ opacity: 0, y: 22, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.7, ease }}
          whileHover={{ scale: 1.04, y: -2 }}
          whileTap={{ scale: 0.97 }}
        >
          Personalizar minha IA
          <ArrowRight className="h-4 w-4" />
        </motion.button>

        {/* Fine print */}
        <motion.p
          className="mono-label mt-7"
          style={{ color: "var(--mute)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.15, duration: 0.7 }}
        >
          5 perguntas · menos de 2 minutos
        </motion.p>
      </div>
    </div>
  );
}
