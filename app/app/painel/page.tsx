import Image from "next/image";
import Link from "next/link";
import { headers } from "next/headers";
import QRCode from "qrcode";
import { produtor } from "@/lib/data";
import { listarAvaliacoes, resumo } from "@/lib/store";
import { Estrelas } from "@/components/Estrelas";

export const dynamic = "force-dynamic";

export default async function Painel() {
  const h = await headers();
  const origem = `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}`;
  const todas = await listarAvaliacoes();
  const geral = resumo(todas);

  const lotes = await Promise.all(
    produtor.lotes.map(async (l) => {
      const url = `${origem}/p/${l.id}?c=${l.codigo}`;
      const qr = await QRCode.toDataURL(url, { width: 600, margin: 2, color: { dark: "#4a220a" } });
      const avs = todas.filter((a) => a.loteId === l.id);
      return { ...l, url, qr, ...resumo(avs) };
    }),
  );

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <header className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-serif text-lg text-cafe">
          <Image src="/logo.svg" alt="" width={32} height={32} className="rounded-md" />
          GranumBox
        </Link>
        <span className="rounded-full bg-areia px-3 py-1 text-sm">Plano Safra · ativo</span>
      </header>

      <h1 className="mt-10 font-serif text-3xl">{produtor.fazenda}</h1>
      <p className="text-cafe">{produtor.nome} · {produtor.cidade}</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <Stat rotulo="Nota média" valor={geral.total ? geral.media.toFixed(1) : "—"} />
        <Stat rotulo="Avaliações verificadas" valor={String(geral.total)} />
        <Stat rotulo="Lotes rastreados" valor={String(produtor.lotes.length)} />
      </div>

      <h2 className="mt-12 font-serif text-2xl">Seus lotes</h2>
      <div className="mt-4 grid gap-6 md:grid-cols-2">
        {lotes.map((l) => (
          <article key={l.id} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={l.qr} alt={`QR do lote ${l.nome}`} className="size-32 shrink-0 rounded-lg" />
            <div className="min-w-0">
              <h3 className="font-medium">{l.nome}</h3>
              <p className="text-sm opacity-70">Safra {l.safra} · {l.processo}</p>
              <p className="mt-2 text-sm">
                {l.total ? <><Estrelas nota={l.media} /> {l.media.toFixed(1)} ({l.total})</> : "Sem avaliações ainda"}
              </p>
              <div className="mt-3 flex flex-wrap gap-3 text-sm">
                <a href={l.qr} download={`granumbox-${l.id}.png`} className="font-medium text-cafe underline">
                  Baixar QR
                </a>
                <a href={l.url} target="_blank" className="text-cafe underline">
                  Ver página
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <h2 className="mt-12 font-serif text-2xl">Últimas avaliações</h2>
      {todas.length === 0 && <p className="mt-4 opacity-70">Assim que alguém escanear e avaliar, aparece aqui.</p>}
      <ul className="mt-4 divide-y divide-cafe/10 rounded-2xl bg-white shadow-sm">
        {todas.slice(0, 20).map((a) => (
          <li key={a.id} className="p-4">
            <div className="flex items-center justify-between gap-4">
              <Estrelas nota={a.nota} />
              <span className="text-xs opacity-60">
                {produtor.lotes.find((l) => l.id === a.loteId)?.nome} · {new Date(a.criadaEm).toLocaleString("pt-BR")}
              </span>
            </div>
            {a.comentario && <p className="mt-1">{a.comentario}</p>}
            <p className="text-sm opacity-70">{a.nome}{a.cidade && ` · ${a.cidade}`}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}

function Stat({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <p className="text-sm text-cafe/70">{rotulo}</p>
      <p className="mt-1 font-serif text-4xl text-cafe">{valor}</p>
    </div>
  );
}
