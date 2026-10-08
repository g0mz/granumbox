export function Estrelas({ nota, tamanho = "text-base" }: { nota: number; tamanho?: string }) {
  return (
    <span className={`${tamanho} tracking-tight text-cafe`} aria-label={`${nota.toFixed(1)} de 5 estrelas`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= Math.round(nota) ? "" : "opacity-20"}>
          ★
        </span>
      ))}
    </span>
  );
}
