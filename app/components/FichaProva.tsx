import { ATRIBUTOS, type Perfil } from "@/lib/data";

/**
 * Escala de prova (1 a 5) por atributo, no formato de ficha de cupping.
 * Losango cheio: média de quem bebeu. Losango vazado: o que a ficha do produtor declara.
 */
export function FichaProva({ consumidor, ficha }: { consumidor: Partial<Perfil>; ficha?: Perfil }) {
  const pos = (v: number) => `${((v - 1) / 4) * 100}%`;
  return (
    <div>
      <ul className="space-y-5">
        {ATRIBUTOS.map((a) => {
          const c = consumidor[a.chave];
          const f = ficha?.[a.chave];
          return (
            <li key={a.chave}>
              <div className="flex items-baseline justify-between">
                <span className="font-medium">{a.nome}</span>
                <span className="font-mono text-xs text-tinta-2">{c ? c.toFixed(1).replace(".", ",") : "sem dados"}</span>
              </div>
              <div className="relative mt-2 h-6">
                <div className="absolute inset-x-0 top-1/2 flex justify-between">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="h-3 w-px -translate-y-1/2 bg-tinta/50" />
                  ))}
                </div>
                {f && (
                  <span
                    className="absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-tinta"
                    style={{ left: pos(f) }}
                    title={`Ficha do produtor: ${f}`}
                  />
                )}
                {c && (
                  <span
                    className="absolute top-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-marca"
                    style={{ left: pos(c) }}
                    title={`Média de quem bebeu: ${c.toFixed(1)}`}
                  />
                )}
              </div>
              <div className="flex justify-between font-mono text-[11px] text-tinta-2">
                <span>{a.min}</span>
                <span>{a.max}</span>
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-5 flex flex-wrap gap-x-5 gap-y-1 text-sm text-tinta-2">
        <span className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-marca" /> quem bebeu
        </span>
        {ficha && (
          <span className="flex items-center gap-2">
            <span className="size-2.5 rounded-full border-2 border-tinta" /> ficha do produtor
          </span>
        )}
      </p>
    </div>
  );
}
