import { KairosLogo } from "@/shared/components/KairosLogo";

/**
 * Fallback de carregamento da rota /login (App Router `loading.tsx`).
 * Mostra a marca girando no centro sobre o fundo quente do app — o mesmo ponto
 * de partida da animação de entrada da página, garantindo continuidade visual.
 */
export default function LoginLoading() {
  return (
    <div className="absolute inset-0 grid place-items-center bokeh-bg">
      <KairosLogo
        markOnly
        className="!h-24 !w-24 motion-safe:[animation:kairos-spin_1.1s_linear_infinite]"
      />
    </div>
  );
}
