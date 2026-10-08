import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { notFound } from "next/navigation";
import { avaliacoesDemo, produtorDoLote, sca } from "@/lib/data";
import { acharLote, contarObrigados, listarAvaliacoes, resumo } from "@/lib/store";
import { Agradecer } from "./Agradecer";
import { Etiqueta } from "@/components/Etiqueta";
import { FichaProva } from "@/components/FichaProva";
import { Nota } from "@/components/Nota";
import { FormAvaliacao } from "./FormAvaliacao";

export const dynamic = "force-dynamic";

// Fotos ilustrativas (licença Unsplash), as mesmas da página de produtores.
const foto = (id: string, w: number) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;

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

  const produtor = produtorDoLote(lote.id);
  const outros = produtor.lotes.filter((l) => l.id !== lote.id);
  const reais = await listarAvaliacoes(lote.id);
  // Avaliações de exemplo (fictícias) contam na nota média; sem perfil, não mexem no gráfico.
  const exemplos = avaliacoesDemo
    .filter((a) => a.loteId === lote.id)
    .map((a, i) => ({ ...a, id: `demo-${i}`, perfil: {}, criadaEm: "" }));
  const avaliacoes = [...reais, ...exemplos];
  const { total, media, perfil } = resumo(avaliacoes);
  const obrigados = await contarObrigados(lote.id);
  const [lat, lon] = produtor.coordenadas;
  const bbox = [lon - 0.06, lat - 0.035, lon + 0.06, lat + 0.035].join(",");

  return (
    <main className="mx-auto max-w-xl pb-20">
      <div className="flex items-center gap-2 px-4 pt-5 text-sm">
        <Logo altura={36} />
      </div>

      <div className="px-4 pt-5">
        {c === lote.codigo ? (
          <p className="flex items-start gap-3 rounded-2xl bg-marca px-4 py-3 text-sobre-marca">
            <span aria-hidden className="mt-1.5 size-2.5 shrink-0 rounded-full bg-sobre-marca" />
            <span>
              <span className="font-semibold">Pacote original verificado.</span> Este QR code corresponde ao lote{" "}
              <span className="font-mono">{lote.marcacao}</span> selecionado pelo GranumBox no {produtor.fazenda}.
            </span>
          </p>
        ) : c ? (
          <p className="rounded-2xl border border-marca px-4 py-3">
            <span className="font-semibold text-marca">Este QR code não confere com o lote.</span> Você pode ver a origem, mas
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
            {produtor.fazenda}, {produtor.cidade} ({produtor.uf}). Comprado da {produtor.parceiro}.
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
          {produtor.imagem && (
            <div className="-mx-5 -mt-7 mb-6 grid grid-cols-2 gap-1">
              <div className="relative col-span-2 aspect-[16/10]">
                <Image src={foto(produtor.imagem.id, 1000)} alt={produtor.imagem.alt} fill sizes="(min-width: 640px) 576px, 100vw" className="object-cover" />
              </div>
              {produtor.galeria?.map((g) => (
                <div key={g.id} className="relative aspect-[4/3]">
                  <Image src={foto(g.id, 500)} alt={g.alt} fill sizes="(min-width: 640px) 288px, 50vw" className="object-cover" />
                </div>
              ))}
            </div>
          )}
          <h2 className="text-lg font-semibold">
            {produtor.nome}, desde {produtor.desde}
          </h2>
          {produtor.historia.map((p, i) => (
            <p key={i} className="mt-3 max-w-[60ch] leading-relaxed">
              {p}
            </p>
          ))}
          <p className="mt-5 text-sm text-tinta-2">{produtor.praticas.join(", ")}.</p>
          {produtor.pessoas && (
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {produtor.pessoas.map((pe) => (
                <li key={pe.nome} className="flex items-center gap-3">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
                    <Image src={foto(pe.foto, 200)} alt={pe.alt} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="text-sm leading-snug">
                    <p className="font-semibold">{pe.nome}</p>
                    <p className="text-tinta-2">{pe.papel}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {produtor.contato && (
            <p className="mt-6 flex flex-wrap gap-x-6 gap-y-1 text-sm">
              <a href={`tel:+55${produtor.contato.telefone.replace(/\D/g, "")}`} className="font-mono underline-offset-4 hover:underline">{produtor.contato.telefone}</a>
              <a href={`mailto:${produtor.contato.email}`} className="break-all underline-offset-4 hover:underline">{produtor.contato.email}</a>
            </p>
          )}
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
                    {a.criadaEm && (
                      <span className="font-mono text-xs text-tinta-2">
                        {new Date(a.criadaEm).toLocaleDateString("pt-BR")}
                      </span>
                    )}
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

        {outros.length > 0 && (
          <section className="bg-caixa px-5 py-7">
            <h2 className="text-lg font-semibold">Outros cafés do {produtor.fazenda}</h2>
            <ul className="mt-5 grid gap-3">
              {outros.map((l) => (
                <li key={l.id}>
                  <Link href={`/p/${l.id}`} className="block bg-fundo p-4 text-sm hover:ring-1 hover:ring-marca">
                    <p className="flex justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.12em] text-marca">
                      <span>Lote {l.marcacao}</span>
                      {l.pontuacaoSCA && <span>SCA {sca(l.pontuacaoSCA)}</span>}
                    </p>
                    <p className="mt-2 text-base font-semibold">{l.variedade}, {l.processo.toLowerCase()}</p>
                    <p className="mt-1 text-tinta-2">{l.notasSensoriais.join(" · ")}</p>
                    <p className="mt-2 font-semibold text-marca">Ver ficha →</p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="px-5 pt-6 text-center text-sm">
          <Link href="/produtores" className="font-semibold text-marca underline-offset-4 hover:underline">Conheça todos os produtores →</Link>
        </p>
      </div>
    </main>
  );
}
