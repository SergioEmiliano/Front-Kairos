"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/app.store";

export function DnaProfileBanner() {
  const showDnaBanner = useAppStore((s) => s.showDnaBanner);
  const setShowDnaBanner = useAppStore((s) => s.setShowDnaBanner);
  const router = useRouter();

  return (
    <AnimatePresence>
      {showDnaBanner && (
        <motion.div
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -6, height: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          style={{ overflow: "hidden" }}
        >
          <div
            className="flex items-center justify-between px-6 py-2.5 shrink-0"
            style={{
              background: "color-mix(in oklch, var(--gold) 7%, var(--paper-warm))",
              borderBottom: "1px solid color-mix(in oklch, var(--gold) 25%, transparent)",
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="mono-label shrink-0"
                style={{ color: "var(--gold-dark)", fontSize: 9, letterSpacing: "0.22em" }}
              >
                ◆ DNA ESTRATÉGICO
              </span>
              <span
                className="text-[12px] font-medium"
                style={{ color: "var(--ink-soft)" }}
              >
                Sua IA ainda pode ficar mais precisa. Complete mais etapas para conteúdos ainda mais alinhados.
              </span>
            </div>

            <div className="flex items-center gap-4 shrink-0 ml-6">
              <button
                onClick={() => {
                  router.push("/dashboard/settings?tab=dna");
                  setShowDnaBanner(false);
                }}
                className="flex items-center gap-1.5 text-[12px] font-medium transition-colors"
                style={{ color: "var(--gold-dark)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--gold-dark)")}
              >
                Completar agora
                <ArrowRight className="h-3 w-3" />
              </button>

              <button
                onClick={() => setShowDnaBanner(false)}
                className="transition-colors"
                style={{ color: "var(--mute)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--mute)")}
                aria-label="Fechar"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
