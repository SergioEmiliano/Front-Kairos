/**
 * Camada de fundo decorativa do login: o fundo quente do app (`.bokeh-bg`:
 * papel com um brilho dourado suave) com um grão fino e bem transparente por
 * cima. Puramente visual — não recebe eventos.
 */
export function LoginBackdrop() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden bokeh-bg"
      aria-hidden="true"
    >
      {/* grão de textura */}
      <div className="absolute inset-0 bg-grain" />
    </div>
  );
}
