"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ATRIBUTOS, type Atributo } from "@/lib/data";

const campos: { nome: string; rotulo: string; dica?: string; obrigatorio?: boolean; modo?: "numeric" | "decimal" }[] = [
  { nome: "variedade", rotulo: "Variedade", dica: "Ex.: Catuaí Vermelho", obrigatorio: true },
  { nome: "processo", rotulo: "Processo", dica: "Ex.: Natural, cereja descascado", obrigatorio: true },
  { nome: "talhao", rotulo: "Talhão" },
  { nome: "altitude", rotulo: "Altitude", dica: "Ex.: 760 m" },
  { nome: "colheita", rotulo: "Colheita", dica: "Ex.: Junho de 2026" },
  { nome: "safra", rotulo: "Safra", dica: "Ex.: 2026", modo: "numeric" },
  { nome: "torra", rotulo: "Torra", dica: "Ex.: Média" },
  { nome: "pontuacaoSCA", rotulo: "Pontuação SCA", dica: "Se classificado. Ex.: 84,5", modo: "decimal" },
];

export function NovoLote() {
  const router = useRouter();
  const [perfil, setPerfil] = useState<Record<Atributo, number>>({ docura: 3, acidez: 3, corpo: 3, finalizacao: 3 });
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState("");

  async function salvar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSalvando(true);
    setErro("");
    const res = await fetch("/api/lotes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...Object.fromEntries(new FormData(e.currentTarget)), perfil }),
    });
    const dados = await res.json();
    if (res.ok) router.push(`/painel/etiqueta/${dados.id}`);
    else {
      setErro(dados.erro);
      setSalvando(false);
    }
  }

  const input =
    "mt-1.5 w-full rounded-xl border border-linha bg-fundo px-3 py-2.5 text-base outline-none placeholder:text-tinta-2/70 focus:border-marca";

  return (
    <form onSubmit={salvar} className="mt-8 space-y-8">
      <div className="grid gap-5 rounded-2xl bg-caixa p-5 sm:grid-cols-2 sm:p-6">
        {campos.map((c) => (
          <label key={c.nome} className="block">
            <span className="font-medium">
              {c.rotulo}
              {c.obrigatorio && <span className="text-marca"> *</span>}
            </span>
            <input name={c.nome} required={c.obrigatorio} inputMode={c.modo} placeholder={c.dica} className={input} />
          </label>
        ))}
        <label className="block sm:col-span-2">
          <span className="font-medium">Notas sensoriais</span>
          <input name="notas" placeholder="Separe por vírgula. Ex.: chocolate, caramelo, laranja" className={input} />
        </label>
      </div>

      <fieldset className="rounded-2xl bg-caixa p-5 sm:p-6">
        <legend className="sr-only">Ficha do produtor</legend>
        <p className="font-semibold">Ficha do produtor</p>
        <p className="mt-1 text-sm text-tinta-2">
          Como você descreve este lote. Quem beber vai confirmar ou não, e a comparação aparece no seu painel.
        </p>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          {ATRIBUTOS.map((a) => (
            <div key={a.chave}>
              <p className="font-medium">{a.nome}</p>
              <div className="mt-2 grid grid-cols-5 gap-1.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <button
                    key={i}
                    type="button"
                    aria-pressed={perfil[a.chave] === i}
                    aria-label={`${a.nome}: ${i} de 5`}
                    onClick={() => setPerfil((p) => ({ ...p, [a.chave]: i }))}
                    className={`apertar h-10 rounded-xl border font-mono text-sm ${
                      perfil[a.chave] === i ? "border-marca bg-marca text-sobre-marca" : "border-linha bg-fundo hover:border-marca"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
              <div className="mt-1 flex justify-between font-mono text-[11px] text-tinta-2">
                <span>{a.min}</span>
                <span>{a.max}</span>
              </div>
            </div>
          ))}
        </div>
      </fieldset>

      {erro && (
        <p role="alert" className="font-medium text-marca">
          {erro}
        </p>
      )}
      <button
        disabled={salvando}
        className="apertar h-12 w-full rounded-full bg-marca font-medium text-sobre-marca hover:bg-marca-forte disabled:opacity-60 sm:w-auto sm:px-10"
      >
        {salvando ? "Salvando lote" : "Salvar lote e gerar QR"}
      </button>
    </form>
  );
}
