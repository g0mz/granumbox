"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function FormAvaliacao({ loteId, codigo }: { loteId: string; codigo?: string }) {
  const router = useRouter();
  const [nota, setNota] = useState(0);
  const [estado, setEstado] = useState<"livre" | "enviando" | "ok">("livre");
  const [erro, setErro] = useState("");

  if (!codigo) {
    return (
      <p className="rounded-xl bg-areia p-4 text-sm">
        Para avaliar, escaneie o QR code impresso na embalagem. Assim só quem provou o café pode opinar.
      </p>
    );
  }

  if (estado === "ok") {
    return (
      <p className="rounded-xl bg-cafe p-4 text-center text-creme">
        Obrigado! Sua avaliação chegou direto na família produtora. ☕
      </p>
    );
  }

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!nota) return setErro("Escolha de 1 a 5 estrelas.");
    setEstado("enviando");
    setErro("");
    const f = new FormData(e.currentTarget);
    const res = await fetch("/api/avaliacoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loteId, codigo, nota, ...Object.fromEntries(f) }),
    });
    if (res.ok) {
      setEstado("ok");
      router.refresh();
    } else {
      setErro((await res.json()).erro ?? "Não foi possível enviar.");
      setEstado("livre");
    }
  }

  const campo = "w-full rounded-lg border border-cafe/20 bg-white px-3 py-2 outline-none focus:border-cafe";

  return (
    <form onSubmit={enviar} className="space-y-3 rounded-2xl border border-cafe/15 bg-white p-5">
      <p className="font-medium">O que você achou deste café?</p>
      <div className="flex gap-1 text-4xl">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            onClick={() => setNota(i)}
            className={`transition ${i <= nota ? "text-cafe" : "text-cafe/20"}`}
            aria-label={`${i} estrelas`}
          >
            ★
          </button>
        ))}
      </div>
      <textarea name="comentario" rows={3} placeholder="Conte como foi (opcional)" className={campo} />
      <div className="grid grid-cols-2 gap-2">
        <input name="nome" placeholder="Seu nome" className={campo} />
        <input name="cidade" placeholder="Cidade" className={campo} />
      </div>
      {erro && <p className="text-sm text-red-700">{erro}</p>}
      <button
        disabled={estado === "enviando"}
        className="w-full rounded-full bg-cafe py-3 font-medium text-creme transition hover:bg-cafe-escuro disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando…" : "Enviar avaliação"}
      </button>
    </form>
  );
}
