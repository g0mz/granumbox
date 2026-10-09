"use client";

import Image from "next/image";
import Link from "next/link";
import { desconto, periodos, peso, planos, reais, type PeriodoId } from "@/lib/data";

const botao = "apertar inline-flex items-center justify-center gap-2 rounded-[4px] px-7 py-2.5 text-sm font-semibold";

/** Cartões dos planos (só mensal, preço fixo). */
export function PlanosVitrine() {
  const periodo: PeriodoId = "mensal";
  const meses = periodos.find((p) => p.id === periodo)!.meses;

  return (
    <>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {planos.map((p) => {
          const mes = p.precos[periodo];
          const off = desconto(p, periodo);
          return (
            <div key={p.id} className={`flex flex-col items-center bg-creme-fixo px-6 pb-8 pt-6 text-[#3a1a07] ${"destaque" in p ? "ring-4 ring-marca-no-escuro" : ""}`}>
              <div className="relative flex h-44 w-full items-end justify-center" aria-hidden>
                {Array.from({ length: p.pacotes }).map((_, i) => (
                  <Image
                    key={i}
                    src={p.imagem}
                    alt=""
                    width={1122}
                    height={1402}
                    sizes="140px"
                    className={`-mx-3 h-auto drop-shadow-[0_12px_12px_rgb(31_18_9/0.3)] first:ml-0 last:mr-0 ${p.gramas >= 1000 ? "w-32" : p.gramas >= 500 ? "w-28" : "w-24"}`}
                    style={{ transform: `rotate(${(i - (p.pacotes - 1) / 2) * 6}deg)`, zIndex: i }}
                  />
                ))}
              </div>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-[#6e4a33]">{peso(p.gramas)} por mês</p>
              <h3 className="mt-5 text-xl font-bold">{p.nome}</h3>
              <p className="mt-1 text-sm text-[#6e4a33]">{p.descricao}</p>
              <p className="mt-4 text-3xl font-extrabold tracking-tight">
                {reais(mes)}
                <span className="text-sm font-medium text-[#6e4a33]">/mês</span>
              </p>
              <p className="mt-1 min-h-10 text-xs text-[#6e4a33]">
                {meses > 1 ? (
                  <>
                    <span className="line-through">{reais(p.precos.mensal)}</span> · {off}% de desconto
                    <br />
                    {reais(mes * meses)} a cada {meses} meses
                  </>
                ) : (
                  "Cobrado todo mês"
                )}
              </p>
              <Link href={`/assinar?plano=${p.id}&periodo=${periodo}`} className={`${botao} mt-5 bg-[#773811] text-white hover:bg-[#5a290b]`}>
                Assinar {p.nome}
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
}
