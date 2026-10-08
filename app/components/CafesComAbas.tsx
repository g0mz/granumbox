"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Cafe = {
  id: string;
  marcacao: string;
  variedade: string;
  processo: string;
  notas: string[];
  pontos?: string;
  foto: string;
  fotoAlt: string;
};

/** Cabeçalho com abas à direita e cartões com foto quadrada, como no layout de referência. */
export function CafesComAbas({ titulo, cafes }: { titulo: React.ReactNode; cafes: Cafe[] }) {
  const processos = ["Todos", ...Array.from(new Set(cafes.map((c) => c.processo)))];
  const [aba, setAba] = useState("Todos");
  const visiveis = aba === "Todos" ? cafes : cafes.filter((c) => c.processo === aba);

  return (
    <div>
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        {titulo}
        <div role="tablist" aria-label="Filtrar por processo" className="flex flex-wrap gap-x-8 gap-y-2">
          {processos.map((p) => (
            <button
              key={p}
              role="tab"
              aria-selected={aba === p}
              onClick={() => setAba(p)}
              className={`relative pb-2 text-sm transition-colors ${
                aba === p ? "font-semibold text-tinta" : "text-tinta-2 hover:text-tinta"
              }`}
            >
              {p}
              {aba === p && <span aria-hidden className="absolute bottom-0 left-1/2 h-0.5 w-5 -translate-x-1/2 bg-tinta" />}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {visiveis.map((c) => (
          <Link key={c.id} href={`/p/${c.id}`} className="group block">
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={c.foto}
                alt={c.fotoAlt}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <h3 className="mt-5 text-xl font-semibold">
              {c.variedade}, {c.processo.toLowerCase()}
            </h3>
            <p className="mt-1.5 text-sm leading-relaxed text-tinta-2">
              {c.notas.join(", ")}. Lote {c.marcacao}
              {c.pontos && `, ${c.pontos} pts SCA`}.
            </p>
          </Link>
        ))}
        <div className="flex aspect-square flex-col justify-end border border-dashed border-tinta/30 p-6">
          <p className="text-xl font-semibold">Caixa de novembro</p>
          <p className="mt-1.5 text-sm leading-relaxed text-tinta-2">Em curadoria com a associação parceira. Assinantes recebem primeiro.</p>
        </div>
      </div>
    </div>
  );
}
