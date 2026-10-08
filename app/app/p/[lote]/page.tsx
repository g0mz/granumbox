import Image from "next/image";
import { notFound } from "next/navigation";
import { produtor } from "@/lib/data";
import { acharLote, contarObrigados, listarAvaliacoes, resumo } from "@/lib/store";
import { Agradecer } from "./Agradecer";
import { Etiqueta } from "@/components/Etiqueta";
import { FichaProva } from "@/components/FichaProva";
import { Nota } from "@/components/Nota";
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
  const lote = await acharLote(id);
  if (!lote) notFound();

  const avaliacoes = await listarAvaliacoes(lote.id);
  const { total, media, perfil } = resumo(avaliacoes);
  const obrigados = await contarObrigados(lote.id);
  const [lat, lon] = produtor.coordenadas;
  const bbox = [lon - 0.06, lat - 0.035, lon + 0.06, lat + 0.035].join(",");

  return (
    <main className="mx-auto max-w-xl pb-20">
      <div className="flex items-center gap-2 px-4 pt-5 text-sm">
        <Image src="/logo.svg" alt="" width={26} height={26} />
        <span className="font-medium">GranumBox</span>
      </div>

      <div className="px-4 pt-5">
        {c === lote.codigo ? (
          <p className="flex items-start gap-3 rounded-2xl bg-marca px-4 py-3 text-sobre-marca">
            <span aria-hidden className="mt-1.5 size-2.5 shrink-0 rounded-full bg-sobre-marca" />
            <span>
              <span className="font-semibold">Pacote original verificado.</span> Este QR corresponde ao lote{" "}
              <span className="font-mono">{lote.marcacao}</span> cadastrado pela {produtor.nome}.
            </span>
          </p>
        ) : c ? (
          <p className="rounded-2xl border border-marca px-4 py-3">
            <span className="font-semibold text-marca">Este QR não confere com o lote.</span> Você pode ver a origem, mas
            não pode avaliar. Se o código estiver no pacote, avise quem vendeu.
          </p>
        ) : null}
      </div>

      <div className="px-4 pt-6">
        <Etiqueta lote={lote} />
      </div>

      <div className="mt-8 space-y-px">
        <section className="bg-caixa px-5 py-7">
          <h1 className="text-2xl font-semibold tracking-tight">
            {lote.variedade} do {lote.talhao}
          </h1>
          <p className="mt-1 text-tinta-2">
            {produtor.fazenda}, {produtor.cidade} ({produtor.uf})
          </p>
          <ul className="mt-5 flex flex-wrap gap-2">
            {lote.notasSensoriais.map((n) => (
              <li key={n} className="rounded-full bg-fundo px-3 py-1.5 text-sm">
                {n}
              </li>
            ))}
          </ul>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-linha pt-5 text-sm">
            {[
              ["Colheita", lote.colheita],
              ["Torra", lote.torra],
              ["Talhão", lote.talhao],
              ["Altitude", lote.altitude],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-tinta-2">{k}</dt>
                <dd className="font-medium">{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="bg-caixa px-5 py-7">
          <h2 className="text-lg font-semibold">
            {produtor.nome}, desde {produtor.desde}
          </h2>
          {produtor.historia.map((p, i) => (
            <p key={i} className="mt-3 max-w-[60ch] leading-relaxed">
              {p}
            </p>
          ))}
          <p className="mt-5 text-sm text-tinta-2">{produtor.praticas.join(", ")}.</p>
          <figure className="mt-6 overflow-hidden rounded-2xl border border-linha">
            <iframe
              title={`Mapa de ${produtor.cidade}, ${produtor.uf}`}
              src={`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`}
              className="block h-48 w-full grayscale-[35%] sepia-[25%]"
              loading="lazy"
            />
            <figcaption className="bg-fundo px-4 py-2.5 text-sm text-tinta-2">
              {produtor.cidade}, {produtor.origem}
            </figcaption>
          </figure>
          <Agradecer loteId={lote.id} nome={produtor.nome} inicial={obrigados} />
        </section>

        <section className="bg-caixa px-5 py-7">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-semibold">Como este lote está na xícara</h2>
            {total > 0 && (
              <span className="shrink-0 font-mono text-sm">
                {media.toFixed(1).replace(".", ",")} / 5
              </span>
            )}
          </div>
          <p className="mt-1 text-sm text-tinta-2">
            {total === 0
              ? "Ainda ninguém avaliou. A primeira nota pode ser a sua."
              : `Média de ${total} ${total === 1 ? "pessoa que provou" : "pessoas que provaram"}, comparada com a ficha do produtor.`}
          </p>
          <div className="mt-6">
            <FichaProva consumidor={perfil} ficha={lote.perfilFicha} />
          </div>
        </section>

        <section id="avaliar" className="bg-caixa px-5 py-7">
          <h2 className="mb-5 text-lg font-semibold">Avaliar este lote</h2>
          <FormAvaliacao loteId={lote.id} codigo={c === lote.codigo ? c : undefined} />
        </section>

        {avaliacoes.length > 0 && (
          <section className="bg-caixa px-5 py-7">
            <h2 className="text-lg font-semibold">O que disseram</h2>
            <p className="mt-1 text-sm text-tinta-2">
              Só avalia quem escaneou o pacote, e o produtor não consegue apagar nenhuma avaliação.
            </p>
            <ul className="mt-5 divide-y divide-linha">
              {avaliacoes.map((a) => (
                <li key={a.id} className="py-4">
                  <div className="flex items-center justify-between">
                    <Nota valor={a.nota} />
                    <span className="font-mono text-xs text-tinta-2">
                      {new Date(a.criadaEm).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  {a.comentario && <p className="mt-2 leading-relaxed">{a.comentario}</p>}
                  {(a.nome || a.cidade) && (
                    <p className="mt-1 text-sm text-tinta-2">{[a.nome, a.cidade].filter(Boolean).join(", ")}</p>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
