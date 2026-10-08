"use client";

import { useState } from "react";

export function Agradecer({ loteId, nome, inicial }: { loteId: string; nome: string; inicial: number }) {
  const [total, setTotal] = useState(inicial);
  const [feito, setFeito] = useState(false);
  const [aviso, setAviso] = useState("");

  async function enviar() {
    const res = await fetch("/api/obrigado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loteId }),
    });
    const dados = await res.json();
    if (res.ok) setTotal(dados.total);
    else setAviso(dados.erro);
    setFeito(true);
  }

  return (
    <div className="mt-6 flex flex-wrap items-center gap-4">
      <button
        onClick={enviar}
        disabled={feito}
        aria-live="polite"
        className="apertar rounded-full border border-marca px-5 py-2.5 font-medium text-marca hover:bg-marca hover:text-white disabled:border-linha disabled:bg-transparent disabled:text-tinta-2"
      >
        {feito && !aviso ? "Obrigado enviado" : "Agradecer ao produtor"}
      </button>
      <p className="text-sm text-tinta-2" aria-live="polite">
        {aviso ||
          (total > 0
            ? `${total} ${total === 1 ? "pessoa agradeceu" : "pessoas agradeceram"} à ${nome}.`
            : `Seja a primeira pessoa a agradecer à ${nome}.`)}
      </p>
    </div>
  );
}
