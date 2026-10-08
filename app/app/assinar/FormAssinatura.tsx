"use client";

import { useState } from "react";
import { desconto, periodos, peso, planos, reais, type PeriodoId, type PlanoId } from "@/lib/data";

export function FormAssinatura({ inicial, periodoInicial }: { inicial: PlanoId; periodoInicial: PeriodoId }) {
  const [plano, setPlano] = useState<PlanoId>(inicial);
  const [periodo, setPeriodo] = useState<PeriodoId>(periodoInicial);
  const [estado, setEstado] = useState<"livre" | "enviando" | "feito">("livre");
  const [erro, setErro] = useState("");
  const escolhido = planos.find((p) => p.id === plano)!;
  const meses = periodos.find((p) => p.id === periodo)!.meses;
  const mes = escolhido.precos[periodo];

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setEstado("enviando");
    setErro("");
    const res = await fetch("/api/assinaturas", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plano, periodo, ...Object.fromEntries(new FormData(e.currentTarget)) }),
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
        <p className="text-xl font-semibold">Vaga garantida no plano {escolhido.nome}, {periodos.find((p) => p.id === periodo)!.nome.toLowerCase()}.</p>
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
                  · {peso(p.gramas)} por mês
                </span>
              </span>
              <span className="font-mono">{reais(p.precos[periodo])}/mês</span>
              <span className="col-span-2 mt-1 text-sm text-tinta-2">{p.descricao}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="font-semibold">Período</legend>
        <div role="radiogroup" aria-label="Período" className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {periodos.map((p) => {
            const off = desconto(escolhido, p.id);
            return (
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={periodo === p.id}
                onClick={() => setPeriodo(p.id)}
                className={`apertar rounded-2xl border p-3 text-left ${periodo === p.id ? "border-marca bg-caixa" : "border-linha hover:border-marca"}`}
              >
                <span className="block font-semibold">{p.nome}</span>
                <span className="block text-sm text-tinta-2">{off > 0 ? `${off}% de desconto` : "sem desconto"}</span>
              </button>
            );
          })}
        </div>
        <p className="mt-3 text-sm text-tinta-2">
          {meses > 1
            ? `${reais(mes * meses)} cobrados a cada ${meses} meses (${reais(mes)} por mês).`
            : "Cobrado todo mês. Pause ou cancele quando quiser."}
        </p>
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
        {estado === "enviando" ? "Garantindo vaga" : `Garantir vaga no ${escolhido.nome}, ${reais(mes)}/mês`}
      </button>
    </form>
  );
}
