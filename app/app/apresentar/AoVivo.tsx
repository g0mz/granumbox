"use client";

import { useEffect, useState } from "react";
import type { Perfil } from "@/lib/data";
import type { Avaliacao } from "@/lib/store";
import { FichaProva } from "@/components/FichaProva";
import { Nota } from "@/components/Nota";

type Dados = { total: number; media: number; perfil: Partial<Perfil>; recentes: Avaliacao[] };

export function AoVivo({ loteId, ficha }: { loteId: string; ficha: Perfil }) {
  const [dados, setDados] = useState<Dados>();

  useEffect(() => {
    let vivo = true;
    const buscar = async () => {
      const res = await fetch(`/api/avaliacoes?lote=${loteId}`, { cache: "no-store" }).catch(() => null);
      if (res?.ok && vivo) setDados(await res.json());
    };
    buscar();
    const id = setInterval(buscar, 2500);
    return () => {
      vivo = false;
      clearInterval(id);
    };
  }, [loteId]);

  const total = dados?.total ?? 0;

  return (
    <section aria-live="polite" className="w-full">
      <div className="flex flex-wrap items-end gap-x-12 gap-y-4">
        <div>
          <p className="text-tinta-2">Nota média</p>
          <p className="font-mono text-7xl tracking-tight text-marca">
            {total ? dados!.media.toFixed(1).replace(".", ",") : "-"}
          </p>
        </div>
        <div>
          <p className="text-tinta-2">Avaliações verificadas</p>
          <p className="font-mono text-7xl tracking-tight">{total}</p>
        </div>
      </div>

      <div className="mt-10 grid gap-10 xl:grid-cols-2">
        <div className="rounded-3xl bg-caixa p-6">
          <p className="mb-5 font-semibold">Ficha de prova: quem bebeu x produtor</p>
          <FichaProva consumidor={dados?.perfil ?? {}} ficha={ficha} />
        </div>
        <div>
          <p className="font-semibold">Chegando agora</p>
          {total === 0 ? (
            <p className="mt-4 text-tinta-2">Assim que alguém avaliar, a nota aparece aqui em poucos segundos.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {dados!.recentes.map((a) => (
                <li key={a.id} className="aovivo-item rounded-2xl border border-linha bg-fundo p-4">
                  <div className="flex items-center justify-between gap-4">
                    <Nota valor={a.nota} />
                    <span className="text-sm text-tinta-2">{[a.nome, a.cidade].filter(Boolean).join(", ")}</span>
                  </div>
                  {a.comentario && <p className="mt-2 line-clamp-2">{a.comentario}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
