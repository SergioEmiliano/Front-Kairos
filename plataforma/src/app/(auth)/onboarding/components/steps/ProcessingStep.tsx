"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { KairosLogo } from "@/shared/components/KairosLogo";

const INSIGHTS: { text: string; delay: number }[] = [
  { text: "Analisando seus procedimentos e ticket médio...", delay: 0 },
  { text: "Calibrando tom de voz e posicionamento...", delay: 1300 },
  { text: "Mapeando seu público e suas objeções...", delay: 2500 },
  { text: "Calculando metas semanais e plano de conteúdo...", delay: 3600 },
  { text: "DNA da clínica calibrado.", delay: 4600 },
];

const SUMMARY_ITEMS: { label: string; value: string; italic: boolean }[] = [
  { label: "Procedimentos", value: "3 ativos", italic: false },
  { label: "Tom editorial", value: "Calibrado", italic: true },
  { label: "Público mapeado", value: "Sim", italic: false },
  { label: "Posts/semana", value: "07", italic: false },
];

interface Props {
  onFinish: () => void;
}

export function ProcessingStep({ onFinish }: Props) {
  const [activeInsight, setActiveInsight] = useState(0);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);
  const finishCalled = useRef(false);

  useEffect(() => {
    const TOTAL = 5400;
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(elapsed / TOTAL, 1);
      const eased = pct < 0.7 ? pct * (1 / 0.7) * 0.85 : 0.85 + (pct - 0.7) * (0.15 / 0.3);
      setProgress(eased);
      if (eased >= 0.999) clearInterval(progressInterval);
    }, 40);

    INSIGHTS.forEach(({ delay }, i) => {
      setTimeout(() => setActiveInsight(i), delay);
    });

    setTimeout(() => {
      setDone(true);
      clearInterval(progressInterval);
      setProgress(1);
    }, 5200);

    setTimeout(() => {
      if (!finishCalled.current) {
        finishCalled.current = true;
        onFinish();
      }
    }, 6800);

    return () => clearInterval(progressInterval);
  }, [onFinish]);

  return (
    /* bokeh-bg uses var(--paper) + gold gradients — adapts to both themes */
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden bokeh-bg">

      {/* Extra ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "15%",
          left: "50%",
          transform: "translateX(-50%)",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--gold) 9%, transparent), transparent 65%)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center gap-10 px-6 max-w-[680px] w-full">

        {/* Logo + animated rings */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
        >
          <motion.div
            className="absolute"
            style={{
              inset: -20,
              borderRadius: "50%",
              border: "1px solid color-mix(in oklch, var(--gold) 25%, transparent)",
              borderTopColor: "var(--gold)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute"
            style={{
              inset: -10,
              borderRadius: "50%",
              border: "1px solid color-mix(in oklch, var(--gold) 12%, transparent)",
            }}
            animate={{ rotate: -360 }}
            transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          />

          {/* Logo mark — sits on the theme-aware paper surface */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "var(--paper-surface)",
              border: "1px solid color-mix(in oklch, var(--gold) 28%, transparent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <KairosLogo size="sm" />
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
        >
          <p className="kicker mb-4">IA aprendendo</p>
          <h2
            className="font-serif-display"
            style={{
              fontSize: "clamp(28px, 4vw, 42px)",
              letterSpacing: "-0.025em",
              color: "var(--ink)",
              lineHeight: 1.15,
            }}
          >
            {done ? (
              <>
                DNA calibrado,{" "}
                <span className="italic-gold">pronta.</span>
              </>
            ) : (
              <>
                Sua IA está{" "}
                <span className="italic-gold">aprendendo</span>
                <br />
                sobre sua clínica…
              </>
            )}
          </h2>
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div
            className="relative overflow-hidden rounded-full"
            style={{ height: 2, background: "var(--line)", width: "100%" }}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{ background: "var(--gold)" }}
              animate={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.08, ease: "linear" }}
            />
            <div
              className="absolute inset-0 shimmer-bar rounded-full"
              style={{ opacity: done ? 0 : 1, transition: "opacity 0.5s" }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="mono-label">Processando</span>
            <span className="mono-label" style={{ color: "var(--gold-dark)" }}>
              {Math.round(progress * 100)}%
            </span>
          </div>
        </motion.div>

        {/* Sequential insights */}
        <div style={{ height: 28 }}>
          <AnimatePresence mode="wait">
            <motion.p
              key={activeInsight}
              className="mono-label text-center"
              style={{
                color:
                  activeInsight === INSIGHTS.length - 1
                    ? "var(--gold-dark)"
                    : "var(--mute)",
                fontSize: activeInsight === INSIGHTS.length - 1 ? 11 : 10,
                letterSpacing: activeInsight === INSIGHTS.length - 1 ? "0.22em" : "0.14em",
              }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
            >
              {activeInsight === INSIGHTS.length - 1 ? "◆ " : ""}
              {INSIGHTS[activeInsight].text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Summary cards */}
        <AnimatePresence>
          {done && (
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full"
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
            >
              {SUMMARY_ITEMS.map(({ label, value, italic }, i) => (
                <motion.div
                  key={label}
                  className="card-surface rounded-[var(--radius)]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  style={{ padding: "16px 14px" }}
                >
                  <div className="mono-label mb-2">{label}</div>
                  <div
                    className="font-serif-display"
                    style={{
                      fontSize: 22,
                      fontStyle: italic ? "italic" : "normal",
                      color: italic ? "var(--gold-dark)" : "var(--ink)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {value}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Manual CTA fallback */}
        <AnimatePresence>
          {done && (
            <motion.button
              onClick={onFinish}
              className="btn-gold flex items-center gap-2.5 text-[14px]"
              style={{ padding: "12px 28px" }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
            >
              Acessar o sistema
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
