/** Logo completo (caixa + "granumbox"), sem fundo. Troca para a versão clara no tema escuro. */
export function Logo({ altura = 44, className = "" }: { altura?: number; className?: string }) {
  const largura = Math.round(altura * (1065.59 / 772.5));
  return (
    <picture className={className}>
      <source srcSet="/logo-escuro.svg" media="(prefers-color-scheme: dark)" />
      <img src="/logo.svg" alt="GranumBox" width={largura} height={altura} className="block h-auto max-w-full" />
    </picture>
  );
}
