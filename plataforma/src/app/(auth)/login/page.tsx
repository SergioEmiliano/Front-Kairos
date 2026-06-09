"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, Loader2, ArrowRight } from "lucide-react";
import { KairosLogo } from "@/components/common/KairosLogo";
import { GoldButton } from "@/components/common/GoldButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authService } from "@/services/auth.service";
import { useAppStore } from "@/store/app.store";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(4, "Senha deve ter pelo menos 4 caracteres"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const setAuthenticated = useAppStore((s) => s.setAuthenticated);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [remember, setRemember] = useState(true);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginForm) {
    setLoading(true);
    setError("");
    try {
      const result = await authService.login(data);
      if (result.success) {
        authService.setAuth(result.token!);
        setAuthenticated(true);
        router.push("/dashboard");
      } else {
        setError("Credenciais inválidas. Tente novamente.");
      }
    } catch {
      setError("Erro ao conectar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden">
      {/* Top chrome */}
      <div className="px-8 py-5 flex items-center justify-between shrink-0">
        <KairosLogo size="sm" />
        <span className="mono-label mono-label-wide inline-flex items-center gap-2" style={{ color: "var(--gold-dark)" }}>
          ◆ ENTRADA · CURADORIA
        </span>
      </div>
      <div className="hairline shrink-0" />

      {/* Center card */}
      <div className="flex-1 min-h-0 grid place-items-center p-6">
        <div className="card-surface w-full max-w-[460px] p-8 animate-fade-in">
          <div className="flex flex-col gap-4">
            <span className="kicker">Entrada</span>
            <h1
              className="text-[30px] text-kairos-charcoal leading-[1.05] font-medium"
              style={{ letterSpacing: "-0.025em" }}
            >
              Bem-vinda <span className="italic-gold font-medium">de volta</span>.
            </h1>
            <p className="text-[15px] text-kairos-charcoal/80 leading-[1.55]">
              Seu sistema seguiu calibrando enquanto você esteve fora. Entre para retomar o mês.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 mt-2">
              <div className="flex flex-col gap-2">
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
                {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
              </div>

              <div className="flex flex-col gap-2">
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
                {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
              </div>

              <div className="flex items-center justify-between mt-1">
                <button
                  type="button"
                  onClick={() => setRemember(!remember)}
                  className="inline-flex items-center gap-2 text-xs text-kairos-charcoal/80"
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
                  Manter conectada
                </button>
                <button
                  type="button"
                  className="text-xs text-kairos-stone border-b border-kairos-line hover:text-kairos-charcoal hover:border-kairos-charcoal transition-colors"
                >
                  Esqueci a senha
                </button>
              </div>

              {error && (
                <p className="text-xs text-red-600 text-center border border-red-200 rounded-lg p-2.5">
                  {error}
                </p>
              )}

              <GoldButton type="submit" fullWidth disabled={loading} className="mt-3">
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

              <div className="dotted-rule my-2 text-kairos-line" />

              <div className="flex flex-col items-center gap-1.5 text-center">
                <span className="mono-label">Ainda não é Kairós?</span>
                <button
                  type="button"
                  onClick={() => router.push("/cadastro")}
                  className="font-serif-display italic text-[18px] text-kairos-charcoal hover:underline decoration-kairos-gold underline-offset-4"
                >
                  <span className="italic-gold">Assinar</span> →
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer band */}
      <div className="hairline shrink-0" />
      <div className="px-8 py-4 flex items-center justify-between shrink-0">
        <span className="mono-label">◆ KAIRÓS · 2026</span>
        <span className="mono-label">412 DOUTORAS · 42 VAGAS · CICLO MAIO 2026</span>
      </div>
    </div>
  );
}
