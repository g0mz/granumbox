"use client";

import { useState } from "react";
import Link from "next/link";

type Cafe = {
  id: string;
  marcacao: string;
  variedade: string;
  processo: string;
  altitude: string;
  notas: string[];
  pontos?: string;
};

/** Filtro por processo, como as abas do layout de referência. */
export function CafesComAbas({ cafes }: { cafes: Cafe[] }) {
  const processos = ["Todos", ...Array.from(new Set(cafes.map((c) => c.processo)))];
  const [aba, setAba] = useState("Todos");
  const visiveis = aba === "Todos" ? cafes : cafes.filter((c) => c.processo === aba);

  return (
    <div>
      <div role="tablist" aria-label="Filtrar por processo" className="flex flex-wrap gap-x-7 gap-y-2 border-b border-linha">
        {processos.map((p) => (
          <button
            key={p}
            role="tab"
            aria-selected={aba === p}
            onClick={() => setAba(p)}
            className={`-mb-px border-b-2 pb-3 text-sm font-medium transition-colors ${
              aba === p ? "border-marca text-tinta" : "border-transparent text-tinta-2 hover:text-tinta"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visiveis.map((c) => (
          <Link key={c.id} href={`/p/${c.id}`} className="apertar group block">
            <div className="relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl bg-escuro p-5 text-sobre-escuro">
              <span className="font-mono text-xs opacity-70">Lote {c.marcacao}</span>
              <div>
                <p className="font-display text-4xl text-marca-no-escuro">{c.pontos ?? c.altitude}</p>
                <p className="text-xs uppercase tracking-wide opacity-70">{c.pontos ? "pontos SCA" : "altitude"}</p>
              </div>
              <span aria-hidden className="absolute -bottom-10 -right-10 size-40 rounded-full border border-sobre-escuro/15" />
              <span aria-hidden className="absolute -bottom-4 -right-4 size-24 rounded-full border border-sobre-escuro/15" />
            </div>
            <h3 className="mt-4 text-lg font-bold">
              {c.variedade}, {c.processo.toLowerCase()}
            </h3>
            <p className="mt-1 text-sm text-tinta-2">{c.notas.join(", ")}</p>
            <p className="mt-3 text-sm font-semibold text-marca underline-offset-4 group-hover:underline">Conhecer quem plantou</p>
          </Link>
        ))}
        <div className="flex aspect-[4/3] flex-col justify-end rounded-2xl border border-dashed border-linha p-5 sm:aspect-auto">
          <p className="font-bold">Caixa de novembro</p>
          <p className="mt-1 text-sm text-tinta-2">Em curadoria com a associação parceira. Assinantes recebem primeiro.</p>
        </div>
      </div>
    </div>
  );
}
