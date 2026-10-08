/** Logo completo (caixa + "granumbox"), sem fundo. Troca para a versão clara no tema escuro. */
export function Logo({ altura = 44, className = "", sobreEscuro = false }: { altura?: number; className?: string; sobreEscuro?: boolean }) {
  const largura = Math.round(altura * (1065.59 / 772.5));
  // SVG pequeno e local: <img> simples, sem otimização do next/image.
  /* eslint-disable @next/next/no-img-element */
  if (sobreEscuro)
    return <img src="/logo-escuro.svg" alt="GranumBox" width={largura} height={altura} className={`block h-auto max-w-full ${className}`} />;
  return (
    <picture className={className}>
      <source srcSet="/logo-escuro.svg" media="(prefers-color-scheme: dark)" />
      <img src="/logo.svg" alt="GranumBox" width={largura} height={altura} className="block h-auto max-w-full" />
    </picture>
  );
}
