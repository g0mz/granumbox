/** Nota de 1 a 5 como losangos, no mesmo vocabulário da ficha de prova. */
export function Nota({ valor }: { valor: number }) {
  return (
    <span className="inline-flex items-center gap-1" role="img" aria-label={`Nota ${valor.toFixed(1)} de 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={`size-2.5 rotate-45 ${i <= Math.round(valor) ? "bg-cereja" : "border border-tinta/40"}`} />
      ))}
    </span>
  );
}
