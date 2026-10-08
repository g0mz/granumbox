"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ATRIBUTOS, type Atributo } from "@/lib/data";

function Escala({
  valor,
  onChange,
  rotulo,
  min,
  max,
}: {
  valor?: number;
  onChange: (v: number) => void;
  rotulo: string;
  min: string;
  max: string;
}) {
  return (
    <fieldset>
      <legend className="font-medium">{rotulo}</legend>
      <div className="mt-2 grid grid-cols-5 gap-1.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <button
            key={i}
            type="button"
            aria-pressed={valor === i}
            aria-label={`${rotulo}: ${i} de 5`}
            onClick={() => onChange(i)}
            className={`apertar h-11 rounded-xl border font-mono text-sm ${
              valor === i ? "border-marca bg-marca text-white" : "border-linha hover:border-tinta"
            }`}
          >
            {i}
          </button>
        ))}
      </div>
      <div className="mt-1 flex justify-between font-mono text-[11px] text-tinta-2">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </fieldset>
  );
}

export function FormAvaliacao({ loteId, codigo }: { loteId: string; codigo?: string }) {
  const router = useRouter();
  const [nota, setNota] = useState<number>();
  const [perfil, setPerfil] = useState<Partial<Record<Atributo, number>>>({});
  const [estado, setEstado] = useState<"livre" | "enviando" | "enviada">("livre");
  const [erro, setErro] = useState("");

  if (!codigo) {
    return (
      <p className="border-l-2 border-marca pl-4 text-tinta-2">
        Para avaliar, escaneie o QR impresso no pacote. Só quem tem o café em mãos pode dar nota.
      </p>
    );
  }

  if (estado === "enviada") {
    return (
      <p className="border-l-2 border-marca pl-4">
        Avaliação enviada. A Família Moreira recebe sua nota junto com as de todo mundo que provou este lote.
      </p>
    );
  }

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!nota) return setErro("Escolha uma nota geral de 1 a 5.");
    setEstado("enviando");
    setErro("");
    const f = Object.fromEntries(new FormData(e.currentTarget));
    const res = await fetch("/api/avaliacoes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ loteId, codigo, nota, perfil, ...f }),
    });
    if (res.ok) {
      setEstado("enviada");
      router.refresh();
    } else {
      setErro((await res.json()).erro ?? "A avaliação não foi enviada. Tente de novo.");
      setEstado("livre");
    }
  }

  const campo =
    "mt-1.5 w-full rounded-xl border border-linha bg-fundo px-3 py-2.5 text-base outline-none placeholder:text-tinta-2/70 focus:border-tinta";

  return (
    <form onSubmit={enviar} className="space-y-6">
      <Escala rotulo="Nota geral" min="não gostei" max="excelente" valor={nota} onChange={setNota} />

      <div className="space-y-5 border-t border-linha pt-5">
        <p className="text-sm text-tinta-2">Opcional: como você sentiu o café na xícara?</p>
        {ATRIBUTOS.map((a) => (
          <Escala
            key={a.chave}
            rotulo={a.nome}
            min={a.min}
            max={a.max}
            valor={perfil[a.chave]}
            onChange={(v) => setPerfil((p) => ({ ...p, [a.chave]: v }))}
          />
        ))}
      </div>

      <div className="space-y-4 border-t border-linha pt-5">
        <label className="block">
          <span className="font-medium">Comentário</span>
          <textarea name="comentario" rows={3} className={campo} placeholder="Como você preparou, o que achou" />
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="block">
            <span className="font-medium">Nome</span>
            <input name="nome" className={campo} autoComplete="given-name" />
          </label>
          <label className="block">
            <span className="font-medium">Cidade</span>
            <input name="cidade" className={campo} autoComplete="address-level2" />
          </label>
        </div>
      </div>

      {erro && (
        <p role="alert" className="text-sm font-medium text-marca">
          {erro}
        </p>
      )}
      <button
        disabled={estado === "enviando"}
        className="apertar h-12 w-full rounded-full bg-marca font-medium text-white hover:bg-marca-forte disabled:opacity-60"
      >
        {estado === "enviando" ? "Enviando avaliação" : "Enviar avaliação"}
      </button>
    </form>
  );
}
