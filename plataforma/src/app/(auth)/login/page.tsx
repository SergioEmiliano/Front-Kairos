"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2, ArrowRight, ArrowLeft, AlertCircle } from "lucide-react";
import { HourglassMark } from "@/shared/components/HourglassMark";
import { LoginBackdrop } from "@/app/(auth)/login/components/LoginBackdrop";
import { GoldButton } from "@/shared/components/GoldButton";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { cn } from "@/shared/lib/utils";
import { authService } from "@/services/auth.service";
import { useAppStore } from "@/store/app.store";

// A assinatura acontece na landing page (fora deste app). O cadastro self-service
// foi removido; aqui só apontamos para onde a médica pode assinar/reativar.
const LANDING_URL =
  process.env.NEXT_PUBLIC_LANDING_URL ?? "https://kairos.com.br";

const LOGO_SHADOW =
  "drop-shadow(0 10px 14px color-mix(in oklch, var(--ink) 40%, transparent))";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(4, "Senha deve ter pelo menos 4 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

// Estado de erro exibido no login: mensagem + (opcional) link para a landing.
interface LoginError {
  message: string;
  showLandingLink?: boolean;
}

// Helper para declarar a custom property --d (delay do stagger) com tipagem.
const delay = (d: string) => ({ "--d": d } as React.CSSProperties);

// Erro de campo no estilo da página: tom terracota (--error) + ícone, em vez
// do vermelho puro que destoa da paleta.
function FieldError({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-xs flex items-center gap-1.5 mt-0.5"
      style={{ color: "var(--error)" }}
    >
      <AlertCircle className="h-3.5 w-3.5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const setFirstAccessCompleted = useAppStore((s) => s.setFirstAccessCompleted);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<LoginError | null>(null);
  const [remember, setRemember] = useState(true);

  // ─── Animação de entrada: marca gira no centro e voa até o medalhão ────────
  const [intro, setIntro] = useState(true);
  const [reveal, setReveal] = useState(false);
  const flyerRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const flyer = flyerRef.current;
    const target = markRef.current;

    if (reduce || !flyer || !target) {
      setReveal(true);
      setIntro(false);
      return;
    }

    // Mede o deslocamento do centro (flyer) até o medalhão (alvo).
    const fr = flyer.getBoundingClientRect();
    const tr = target.getBoundingClientRect();
    const dx = tr.left + tr.width / 2 - (fr.left + fr.width / 2);
    const dy = tr.top + tr.height / 2 - (fr.top + fr.height / 2);
    const scale = tr.width / fr.width;

    // Segura no centro enquanto a marca "acende" (preenche, via CSS), depois
    // voa até o medalhão — continuando a transição vinda da landing.
    const anim = flyer.animate(
      [
        { transform: "translate(0px,0px) scale(1)" },
        { transform: "translate(0px,0px) scale(1)", offset: 0.42 },
        {
          transform: `translate(${dx}px,${dy}px) scale(${scale})`,
          offset: 1,
        },
      ],
      { duration: 1150, easing: "cubic-bezier(0.25,0.4,0.25,1)", fill: "forwards" }
    );

    // Revela o card enquanto a marca inicia o voo.
    const revealT = setTimeout(() => setReveal(true), 600);
    anim.onfinish = () => setIntro(false);

    return () => {
      clearTimeout(revealT);
      anim.cancel();
    };
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginForm) {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.login(data);

      if (result.success) {
        const firstAccess = result.firstAccessCompleted ?? true;
        authService.setAuth(result.token!);
        setAuthenticated(true);
        setFirstAccessCompleted(firstAccess);
        // Primeiro acesso → onboarding obrigatório; caso contrário, dashboard.
        router.push(firstAccess ? "/dashboard" : "/onboarding");
        return;
      }

      switch (result.reason) {
        case "pending_approval":
          setError({
            message:
              "Seu acesso está sendo preparado. Em breve você receberá um e-mail com as credenciais de primeiro acesso.",
          });
          break;
        case "subscription_inactive":
          setError({
            message:
              "Sua assinatura está inativa. Reative na nossa página para voltar a acessar a Kairós.",
            showLandingLink: true,
          });
          break;
        default:
          setError({ message: "Credenciais inválidas. Tente novamente." });
      }
    } catch {
      setError({ message: "Erro ao conectar. Tente novamente." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="theme-dark absolute inset-0 flex flex-col overflow-hidden bg-kairos-paper">
      <LoginBackdrop />

      <a
        href={LANDING_URL}
        className="absolute left-6 top-6 z-20 inline-flex items-center gap-1.5 text-xs text-kairos-stone hover:text-kairos-charcoal transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" /> Voltar ao site
      </a>

      {/* Marca da animação de entrada — gira no centro e voa até o medalhão. */}
      {intro && (
        <div className="fixed inset-0 z-40 grid place-items-center pointer-events-none">
          <div ref={flyerRef} style={{ filter: LOGO_SHADOW, color: "var(--ink)" }}>
            <HourglassMark ignite style={{ width: 96, height: "auto", display: "block" }} />
          </div>
        </div>
      )}

      {/* Center card */}
      <div className="relative z-10 flex-1 min-h-0 grid place-items-center p-6">
        <div
          className={cn(
            "login-card card-surface relative w-full max-w-[560px] px-10 pt-14 pb-10",
            reveal && "revealed"
          )}
          style={{
            background: "color-mix(in oklch, var(--paper-warm) 86%, #000)",
            boxShadow:
              "0 1px 2px color-mix(in oklch, var(--ink) 4%, transparent), 0 14px 36px -26px color-mix(in oklch, var(--ink) 22%, transparent)",
          }}
        >
          {/* Medalhão real — centralizado por flex (sem transform que conflite).
              Fica invisível durante a intro; a marca voadora pousa exatamente
              aqui e então este assume. */}
          <div className="absolute left-0 right-0 -top-8 flex justify-center">
            <div
              ref={markRef}
              className="transition-opacity duration-200"
              style={{ opacity: intro ? 0 : 1, filter: LOGO_SHADOW, color: "var(--ink)" }}
            >
              <HourglassMark style={{ width: 64, height: "auto", display: "block" }} />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h1
              className="stg text-[30px] text-kairos-charcoal leading-[1.05] font-medium"
              style={{ ...delay("0.05s"), letterSpacing: "-0.025em" }}
            >
              Bem-vindo(a) <span className="italic-gold font-medium">de volta</span>.
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4 mt-2">
              <div className="stg flex flex-col gap-2" style={delay("0.12s")}>
                <Label htmlFor="email" className="mono-label">
                  E-mail profissional
                </Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="dra.marina@clinicavasconcellos.com.br"
                  {...register("email")}
                />
                {errors.email && <FieldError>{errors.email.message}</FieldError>}
              </div>

              <div className="stg flex flex-col gap-2" style={delay("0.18s")}>
                <Label htmlFor="password" className="mono-label">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="••••••••••"
                    className="pr-10"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-kairos-stone hover:text-kairos-charcoal transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && <FieldError>{errors.password.message}</FieldError>}
              </div>

              <div className="stg flex items-center justify-between mt-1" style={delay("0.24s")}>
                <button
                  type="button"
                  onClick={() => setRemember(!remember)}
                  className="inline-flex items-center gap-2 text-xs text-white"
                >
                  <span
                    className="inline-flex items-center justify-center"
                    style={{
                      width: 14,
                      height: 14,
                      border: "1px solid var(--line)",
                      borderRadius: 3,
                      background: "var(--paper-warm)",
                    }}
                  >
                    {remember && (
                      <span className="text-[9px]" style={{ color: "var(--gold-dark)" }}>◆</span>
                    )}
                  </span>
                  Manter conectado
                </button>
                <button
                  type="button"
                  className="text-xs text-kairos-stone border-b border-kairos-line hover:text-kairos-charcoal hover:border-kairos-charcoal transition-colors"
                >
                  Esqueci a senha
                </button>
              </div>

              {error && (
                <div
                  className="text-xs text-center rounded-lg p-3 flex flex-col gap-1.5"
                  style={{
                    color: "var(--error)",
                    background: "color-mix(in oklch, var(--error) 8%, transparent)",
                    border: "1px solid color-mix(in oklch, var(--error) 28%, transparent)",
                  }}
                >
                  <span className="inline-flex items-center justify-center gap-1.5 leading-snug">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                    {error.message}
                  </span>
                  {error.showLandingLink && (
                    <a
                      href={LANDING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-kairos-charcoal underline decoration-kairos-gold underline-offset-2 hover:text-kairos-gold-dark transition-colors"
                    >
                      Reativar assinatura →
                    </a>
                  )}
                </div>
              )}

              <div className="stg" style={delay("0.30s")}>
                <GoldButton type="submit" fullWidth disabled={loading} className="btn-glow mt-3">
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Entrando…
                    </span>
                  ) : (
                    <>
                      Entrar na Kairós <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </GoldButton>
              </div>

              <div className="stg dotted-rule my-2 text-kairos-line" style={delay("0.36s")} />

              <div className="stg flex flex-col items-center gap-1.5 text-center" style={delay("0.42s")}>
                <span className="mono-label">Ainda não é Kairós?</span>
                <button
                  type="button"
                  onClick={() => router.push("/planos")}
                  className="cursor-pointer font-serif-display italic text-[18px] text-kairos-charcoal hover:underline decoration-kairos-gold underline-offset-4"
                >
                  <span className="italic-gold">Conhecer planos e assinar</span> →
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer band */}
      <div className="relative z-10 px-8 py-4 flex items-center justify-center shrink-0">
        <span className="mono-label">◆ KAIRÓS · 2026</span>
      </div>
    </div>
  );
}
