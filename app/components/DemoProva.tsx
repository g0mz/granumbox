"use client";

import { useState } from "react";
import Image from "next/image";
import { ATRIBUTOS, type Perfil } from "@/lib/data";

/**
 * Demonstração da avaliação: o visitante dá notas no "celular" e, ao enviar,
 * vê a ficha de prova em papel que seguiria para o sítio. Nada é gravado.
 */
export function DemoProva({ marcacao, fazenda, cidade }: { marcacao: string; fazenda: string; cidade: string }) {
  const [notas, setNotas] = useState<Perfil>({ docura: 4, acidez: 3, corpo: 4, finalizacao: 3 } as Perfil);
  const [recado, setRecado] = useState("");
  const [enviado, setEnviado] = useState(false);

  return (
    <div className="relative mx-auto h-[31rem] w-full max-w-[30rem]">
      {/* Cartão do lote com o QR code, de onde a avaliação começa */}
      <Image
        src="/produto/cartao.webp"
        alt="Cartão do lote com QR code"
        width={1024}
        height={1536}
        sizes="180px"
        className="absolute left-8 top-16 hidden w-44 -rotate-6 drop-shadow-[0_20px_20px_rgb(0_0_0/0.5)] sm:block"
      />

      {/* Celular */}
      <div
        className={`absolute right-0 top-0 h-[31rem] w-[17rem] rounded-[2.2rem] bg-[#111] p-2.5 shadow-[0_30px_60px_rgb(0_0_0/0.6)] transition-all duration-500 sm:right-4 ${
          enviado ? "pointer-events-none translate-x-6 opacity-0" : ""
        }`}
        aria-hidden={enviado}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setEnviado(true);
          }}
          className="flex h-full flex-col rounded-[1.7rem] bg-creme-fixo px-5 py-6 text-[#3a1a07]"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-[#6e4a33]">Lote {marcacao}</p>
          <p className="font-display text-xl text-[#773811]">{fazenda}</p>
          <div className="mt-4 space-y-3">
            {ATRIBUTOS.map((a) => (
              <label key={a.chave} className="block text-xs font-medium">
                <span className="flex justify-between">
                  {a.nome}
                  <span className="font-mono">{notas[a.chave]}</span>
                </span>
                <input
                  type="range"
                  min={1}
                  max={5}
                  step={1}
                  value={notas[a.chave]}
                  onChange={(e) => setNotas({ ...notas, [a.chave]: Number(e.target.value) })}
                  className="mt-1 w-full accent-[#773811]"
                />
              </label>
            ))}
          </div>
          <label className="mt-3 block text-xs font-medium">
            Recado para o produtor
            <textarea
              value={recado}
              onChange={(e) => setRecado(e.target.value)}
              maxLength={90}
              rows={2}
              placeholder="Opcional"
              className="mt-1 w-full resize-none rounded border border-[#773811]/30 bg-white/60 p-2 text-xs"
            />
          </label>
          <button type="submit" className="apertar mt-auto rounded-[4px] bg-[#773811] py-2.5 text-sm font-semibold text-white hover:bg-[#5a290b]">
            Enviar ao produtor
          </button>
        </form>
      </div>

      {/* Ficha em papel que "vai" para o sítio */}
      <div
        className={`absolute inset-x-0 top-10 rotate-[-1.5deg] bg-[#f6ecdf] px-6 py-6 font-mono text-xs text-[#3a1a07] shadow-[0_30px_50px_rgb(0_0_0/0.55)] transition-all duration-500 sm:px-8 ${
          enviado ? "opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
        aria-hidden={!enviado}
        aria-live="polite"
      >
        <div className="flex items-baseline justify-between gap-4">
          <p className="font-display text-2xl text-[#773811]">{fazenda}</p>
          <p>Lote {marcacao}</p>
        </div>
        <table className="mt-3 w-full">
          <thead>
            <tr className="text-[#6e4a33]">
              <th className="sr-only">Atributo</th>
              {[1, 2, 3, 4, 5].map((n) => (
                <th key={n} className="py-1 font-normal">{n}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ATRIBUTOS.map((a) => (
              <tr key={a.chave} className="border-t border-[#3a1a07]/15">
                <th className="py-2 text-left font-normal">{a.nome}</th>
                {[1, 2, 3, 4, 5].map((n) => (
                  <td key={n} className="text-center">
                    {notas[a.chave] === n ? (
                      <span className="inline-grid size-6 -rotate-6 place-items-center rounded-full border-2 border-[#773811] font-bold text-[#773811]">{n}</span>
                    ) : (
                      "·"
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {recado && <p className="mt-4 font-sans text-base italic leading-snug text-[#773811]">“{recado}”</p>}
        <p className="mt-5 border-t border-dashed border-[#773811]/40 pt-3 text-[#6e4a33]">
          → segue pela cooperativa até <span className="font-display text-base text-[#773811]">{cidade}, PR</span>
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-[10px] text-[#6e4a33]">Demonstração: nada foi enviado.</span>
          <button onClick={() => setEnviado(false)} className="font-sans text-sm font-semibold text-[#773811] underline underline-offset-4">
            Avaliar de novo
          </button>
        </div>
      </div>
    </div>
  );
}
