"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAppStore } from "@/store/app.store";

/**
 * Guard de rota client-side para a área autenticada (plataforma).
 *
 * O auth vive no localStorage/Zustand (não em cookie), então um middleware de
 * edge do Next.js não enxerga o estado — por isso o guard roda no cliente.
 *
 * Regras:
 * - não autenticada            → /login
 * - autenticada, primeiro acesso (firstAccessCompleted === false) → /onboarding
 * - autenticada e onboarding concluído → renderiza o app
 *
 * Aguarda a hidratação do store persistido antes de decidir, evitando
 * redirecionamento indevido no primeiro render.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const firstAccessCompleted = useAppStore((s) => s.firstAccessCompleted);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      router.replace("/login");
    } else if (!firstAccessCompleted) {
      router.replace("/onboarding");
    }
  }, [hydrated, isAuthenticated, firstAccessCompleted, router]);

  const allowed = hydrated && isAuthenticated && firstAccessCompleted;

  if (!allowed) {
    return (
      <div className="h-screen grid place-items-center bg-kairos-paper">
        <Loader2 className="h-5 w-5 animate-spin text-kairos-stone" />
      </div>
    );
  }

  return <>{children}</>;
}
