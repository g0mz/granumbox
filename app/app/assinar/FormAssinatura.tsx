"use client";

import { useState } from "react";
import { planos, reais, type PlanoId } from "@/lib/data";

export function FormAssinatura({ inicial }: { inicial: PlanoId }) {
  const [plano, setPlano] = useState<PlanoId>(inicial);
  const [estado, setEstado] = useState<"livre" | "enviando" | "feito">("livre");
  const [erro, setErro] = useState("");
  const escolhido = planos.find((p) => p.id === plano)!;

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    setErro("");
    const res = await fetch("/api/assinaturas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plano, ...Object.fromEntries(new FormData(e.currentTarget)) }),
    });
    if (res.ok) setEstado("feito");
    else {
      setErro((await res.json()).erro ?? "A assinatura não foi enviada. Tente de novo.");
      setEstado("livre");
    }
  }

  if (estado === "feito") {
    return (
      <div className="mt-10 rounded-2xl bg-caixa p-6" role="status">
        <p className="text-xl font-semibold">Vaga garantida no plano {escolhido.nome}.</p>
        <p className="mt-2 text-tinta-2">
          Mandamos um e-mail quando a primeira caixa estiver pronta para sair. Nada foi cobrado.
        </p>
      </div>
    );
  }

  const input =
    "mt-1.5 w-full rounded-xl border border-linha bg-fundo px-3 py-2.5 text-base outline-none placeholder:text-tinta-2/70 focus:border-marca";

  return (
    <form onSubmit={enviar} className="mt-10 space-y-8">
      <fieldset>
        <legend className="font-semibold">Plano</legend>
        <div role="radiogroup" aria-label="Plano" className="mt-3 grid gap-3">
          {planos.map((p) => (
            <button
              key={p.id}
              type="button"
              role="radio"
              aria-checked={plano === p.id}
              onClick={() => setPlano(p.id)}
              className={`apertar grid grid-cols-[1fr_auto] items-center gap-x-4 rounded-2xl border p-4 text-left ${
                plano === p.id ? "border-marca bg-caixa" : "border-linha hover:border-marca"
              }`}
            >
              <span className="font-semibold">
                {p.nome}
                <span className="font-normal text-tinta-2">
                  {" "}
                  · {p.pacotes} {p.pacotes === 1 ? "pacote" : "pacotes"}
                </span>
              </span>
              <span className="font-mono">{reais(p.preco)}/mês</span>
              <span className="col-span-2 mt-1 text-sm text-tinta-2">{p.descricao}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="font-medium">Nome</span>
          <input name="nome" required autoComplete="name" className={input} />
        </label>
        <label className="block">
          <span className="font-medium">E-mail</span>
          <input name="email" type="email" required autoComplete="email" className={input} />
        </label>
        <label className="block">
          <span className="font-medium">CEP de entrega</span>
          <input name="cep" required inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" className={input} />
        </label>
      </div>

      {erro && (
        <p role="alert" className="font-medium text-marca">
          {erro}
        </p>
      )}
      <button
        disabled={estado === "enviando"}
        className="apertar h-12 w-full rounded-full bg-marca font-medium text-sobre-marca hover:bg-marca-forte disabled:opacity-60"
      >
        {estado === "enviando" ? "Garantindo vaga" : `Garantir vaga no ${escolhido.nome}, ${reais(escolhido.preco)}/mês`}
      </button>
    </form>
  );
}
