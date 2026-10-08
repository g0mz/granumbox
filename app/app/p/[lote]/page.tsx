import Image from "next/image";
import { notFound } from "next/navigation";
import { acharLote, produtor } from "@/lib/data";
import { listarAvaliacoes, resumo } from "@/lib/store";
import { Estrelas } from "@/components/Estrelas";
import { FormAvaliacao } from "./FormAvaliacao";

export const dynamic = "force-dynamic";

export default async function PaginaLote({
  params,
  searchParams,
}: {
  params: Promise<{ lote: string }>;
  searchParams: Promise<{ c?: string }>;
}) {
  const { lote: id } = await params;
  const { c } = await searchParams;
  const lote = acharLote(id);
  if (!lote) notFound();

  const avaliacoes = await listarAvaliacoes(lote.id);
  const { total, media } = resumo(avaliacoes);
  const codigoValido = c === lote.codigo ? c : undefined;

  const ficha = [
    ["Variedade", lote.variedade],
    ["Processo", lote.processo],
    ["Altitude", lote.altitude],
    ["Talhão", lote.talhao],
    ["Colheita", lote.colheita],
    ["Torra", lote.torra],
  ];

  return (
    <main className="mx-auto max-w-lg pb-16">
      <header className="bg-cafe px-6 pb-10 pt-6 text-creme">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest opacity-80">
          <Image src="/logo.svg" alt="" width={28} height={28} className="rounded-md" />
          GranumBox · origem verificada
        </div>
        <p className="mt-8 text-sm opacity-80">{produtor.fazenda} · {produtor.cidade}</p>
        <h1 className="mt-1 font-serif text-3xl leading-tight">{lote.nome}</h1>
        <div className="mt-4 flex items-center gap-3">
          <span className="rounded-full bg-creme/15 px-3 py-1 text-sm">
            {total ? <>{media.toFixed(1)} ★ · {total} {total === 1 ? "avaliação" : "avaliações"}</> : "Seja o primeiro a avaliar"}
          </span>
          {lote.pontuacaoSCA && (
            <span className="rounded-full bg-creme px-3 py-1 text-sm font-medium text-cafe">
              {lote.pontuacaoSCA} pts SCA
            </span>
          )}
        </div>
      </header>

      <section className="-mt-5 rounded-t-3xl bg-creme px-6 pt-8">
        <h2 className="font-serif text-xl">Notas na xícara</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {lote.notasSensoriais.map((n) => (
            <span key={n} className="rounded-full border border-cafe/25 px-3 py-1 text-sm">
              {n}
            </span>
          ))}
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-cafe/10">
          {ficha.map(([k, v]) => (
            <div key={k} className="bg-white p-4">
              <dt className="text-xs uppercase tracking-wide text-cafe/70">{k}</dt>
              <dd className="mt-1 font-medium">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="px-6 pt-10">
        <h2 className="font-serif text-xl">Quem produziu</h2>
        <p className="mt-1 text-sm text-cafe">
          {produtor.nome} · desde {produtor.desde}
        </p>
        {produtor.historia.map((p, i) => (
          <p key={i} className="mt-3 leading-relaxed">
            {p}
          </p>
        ))}
        <ul className="mt-4 flex flex-wrap gap-2">
          {produtor.praticas.map((p) => (
            <li key={p} className="rounded-full bg-areia px-3 py-1 text-sm">
              ✓ {p}
            </li>
          ))}
        </ul>
      </section>

      <section className="px-6 pt-10">
        <h2 className="mb-4 font-serif text-xl">Avalie este lote</h2>
        <FormAvaliacao loteId={lote.id} codigo={codigoValido} />
      </section>

      <section className="px-6 pt-10">
        <h2 className="font-serif text-xl">O que diz quem provou</h2>
        <p className="mt-1 text-xs text-cafe/70">Só avalia quem escaneou a embalagem. Nenhuma avaliação é apagada.</p>
        {avaliacoes.length === 0 && <p className="mt-4 text-sm opacity-70">Ainda sem avaliações.</p>}
        <ul className="mt-4 space-y-3">
          {avaliacoes.map((a) => (
            <li key={a.id} className="rounded-2xl bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <Estrelas nota={a.nota} />
                <span className="text-xs opacity-60">{new Date(a.criadaEm).toLocaleDateString("pt-BR")}</span>
              </div>
              {a.comentario && <p className="mt-2">{a.comentario}</p>}
              <p className="mt-2 text-sm opacity-70">
                {a.nome}
                {a.cidade && ` · ${a.cidade}`}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
