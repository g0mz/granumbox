"use client";

import Link from "next/link";
import { useState } from "react";
import { sca, type Lote } from "@/lib/data";
import { Nota } from "@/components/Nota";

export type AvaliacaoResumo = { loteId: string; nota: number; nome: string; cidade: string; comentario: string };

/** Dois botões no cartão do produtor: avaliações dos assinantes e cafés do sítio. */
export function AbasProdutor({ lotes, avaliacoes }: { lotes: Lote[]; avaliacoes: AvaliacaoResumo[] }) {
  const [aberta, setAberta] = useState<"avaliacoes" | "cafes" | null>(null);
  const media = avaliacoes.length ? avaliacoes.reduce((s, a) => s + a.nota, 0) / avaliacoes.length : 0;
  const nomeDoLote = (id: string) => lotes.find((l) => l.id === id)?.variedade ?? id;

  const aba = (id: "avaliacoes" | "cafes", rotulo: string) => (
    <button
      type="button"
      aria-expanded={aberta === id}
      onClick={() => setAberta(aberta === id ? null : id)}
      className={`apertar inline-flex items-center justify-center gap-2 rounded-[4px] px-5 py-2.5 text-sm font-semibold ${
        aberta === id ? "bg-marca text-sobre-marca" : "border border-marca text-marca hover:bg-marca hover:text-sobre-marca"
      }`}
    >
      {rotulo}
    </button>
  );

  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-3">
        {aba("avaliacoes", `Avaliações (${avaliacoes.length})`)}
        {aba("cafes", `Cafés do sítio (${lotes.length})`)}
      </div>

      {aberta === "avaliacoes" && (
        <div className="mt-5 border-t border-tinta/15 pt-4">
          {avaliacoes.length ? (
            <>
              <p className="flex items-center gap-3 text-sm">
                <span className="font-mono text-2xl">{media.toFixed(1)}</span>
                <Nota valor={media} />
                <span className="text-tinta-2">média de {avaliacoes.length} avaliações</span>
              </p>
              <ul className="mt-4 space-y-4">
                {avaliacoes.map((a, i) => (
                  <li key={i} className="border-l-2 border-marca pl-3 text-sm">
                    <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                      <Nota valor={a.nota} />
                      <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-tinta-2">{nomeDoLote(a.loteId)}</span>
                    </p>
                    <p className="mt-1 leading-relaxed">“{a.comentario}”</p>
                    <p className="mt-1 text-xs text-tinta-2">{a.nome}, {a.cidade}</p>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-sm text-tinta-2">Ainda sem avaliações.</p>
          )}
        </div>
      )}

      {aberta === "cafes" && (
        <ul className="mt-5 grid gap-3 border-t border-tinta/15 pt-4">
          {lotes.map((l) => (
            <li key={l.id} className="bg-fundo p-4 text-sm">
              <p className="flex justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.12em] text-marca">
                <span>Lote {l.marcacao}</span>
                {l.pontuacaoSCA && <span>SCA {sca(l.pontuacaoSCA)}</span>}
              </p>
              <p className="mt-2 text-base font-semibold">{l.variedade}, {l.processo.toLowerCase()}</p>
              <p className="mt-1 text-tinta-2">{l.notasSensoriais.join(" · ")}</p>
              <p className="mt-2 font-mono text-xs text-tinta-2">{l.altitude} · torra {l.torra.toLowerCase()} · {l.colheita}</p>
              <Link href={`/p/${l.id}`} className="mt-3 inline-block font-semibold text-marca underline-offset-4 hover:underline">Ver ficha do lote →</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
