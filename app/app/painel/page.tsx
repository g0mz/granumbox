import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { produtor, sca } from "@/lib/data";
import { urlDoLote } from "@/lib/origem";
import { listarAvaliacoes, listarLotes, resumo } from "@/lib/store";
import { FichaProva } from "@/components/FichaProva";
import { Nota } from "@/components/Nota";

export const dynamic = "force-dynamic";

export default async function Painel() {
  const todas = await listarAvaliacoes();
  const geral = resumo(todas);

  const lotes = await Promise.all(
    (await listarLotes()).map(async (l) => {
      const url = await urlDoLote(l);
      const png = await QRCode.toDataURL(url, { width: 900, margin: 2, color: { dark: "#2e1606" } });
      return { ...l, url, png, ...resumo(todas.filter((a) => a.loteId === l.id)) };
    }),
  );

  return (
    <main className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <nav className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold text-marca">
          <Image src="/logo.svg" alt="" width={32} height={32} />
          GranumBox
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/apresentar" className="apertar hidden rounded-full border border-marca px-4 py-2 text-sm font-medium text-marca hover:bg-marca hover:text-white sm:inline-block">
            Modo apresentação
          </Link>
          <Link href="/painel/novo" className="apertar rounded-full bg-marca px-4 py-2 text-sm font-medium text-white hover:bg-marca-forte">
            Cadastrar lote
          </Link>
        </div>
      </nav>

      <header className="mt-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <h1 className="font-display text-5xl text-marca leading-none sm:text-6xl">{produtor.fazenda}</h1>
          <p className="mt-2 text-tinta-2">
            {produtor.nome}, {produtor.cidade} ({produtor.uf})
          </p>
        </div>
        <dl className="flex gap-10 font-mono">
          <div>
            <dt className="text-xs text-tinta-2">Nota média</dt>
            <dd className="text-3xl">{geral.total ? geral.media.toFixed(1).replace(".", ",") : "-"}</dd>
          </div>
          <div>
            <dt className="text-xs text-tinta-2">Avaliações</dt>
            <dd className="text-3xl">{geral.total}</dd>
          </div>
        </dl>
      </header>

      <div className="mt-10 space-y-px">
        {lotes.map((l) => (
          <article key={l.id} className="grid gap-8 bg-caixa p-6 md:grid-cols-[auto_1fr_1.2fr] md:p-8">
            <div className="flex flex-col items-start gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={l.png} alt={`QR do lote ${l.marcacao}`} className="size-36 bg-white" />
              <a href={l.png} download={`granumbox-${l.marcacao}.png`} className="apertar rounded-full bg-marca px-4 py-2 text-sm font-medium text-white hover:bg-marca-forte">
                Baixar QR
              </a>
            </div>
            <div>
              <p className="font-mono text-sm text-tinta-2">Lote {l.marcacao}</p>
              <h2 className="mt-1 text-xl font-semibold">
                {l.variedade}, {l.processo.toLowerCase()}
              </h2>
              <p className="mt-1 text-tinta-2">
                {l.talhao}, safra {l.safra}
                {l.pontuacaoSCA && `, ${sca(l.pontuacaoSCA)} pts`}
              </p>
              <p className="mt-4 flex items-center gap-3">
                {l.total ? (
                  <>
                    <Nota valor={l.media} />
                    <span className="font-mono text-sm">
                      {l.media.toFixed(1).replace(".", ",")} em {l.total} {l.total === 1 ? "avaliação" : "avaliações"}
                    </span>
                  </>
                ) : (
                  <span className="text-sm text-tinta-2">Nenhuma avaliação ainda. Imprima o QR e coloque nos pacotes.</span>
                )}
              </p>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-marca">
                <Link href={`/painel/etiqueta/${l.id}`} className="underline underline-offset-4">
                  Imprimir etiquetas
                </Link>
                <Link href={l.url} target="_blank" className="underline underline-offset-4">
                  Abrir a página do lote
                </Link>
              </div>
            </div>
            <FichaProva consumidor={l.perfil} ficha={l.perfilFicha} />
          </article>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">Últimas avaliações</h2>
        {todas.length === 0 ? (
          <p className="mt-3 text-tinta-2">Quando alguém escanear um pacote e avaliar, a nota aparece aqui.</p>
        ) : (
          <ul className="mt-5 divide-y divide-linha border-y border-linha">
            {todas.slice(0, 20).map((a) => (
              <li key={a.id} className="grid gap-1 py-4 md:grid-cols-[8rem_7rem_1fr_auto] md:items-baseline md:gap-6">
                <span className="font-mono text-sm">{lotes.find((l) => l.id === a.loteId)?.marcacao}</span>
                <Nota valor={a.nota} />
                <span>
                  {a.comentario || <span className="text-tinta-2">Sem comentário</span>}
                  {(a.nome || a.cidade) && (
                    <span className="text-tinta-2"> ({[a.nome, a.cidade].filter(Boolean).join(", ")})</span>
                  )}
                </span>
                <span className="font-mono text-xs text-tinta-2">{new Date(a.criadaEm).toLocaleString("pt-BR")}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
