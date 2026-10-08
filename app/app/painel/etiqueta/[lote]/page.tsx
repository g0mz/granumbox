import Link from "next/link";
import { notFound } from "next/navigation";
import { acharLote } from "@/lib/store";
import { urlDoLote } from "@/lib/origem";
import { Etiqueta } from "@/components/Etiqueta";
import { Imprimir } from "./Imprimir";

export const dynamic = "force-dynamic";

export default async function Etiquetas({ params }: { params: Promise<{ lote: string }> }) {
  const lote = await acharLote((await params).lote);
  if (!lote) notFound();
  const url = await urlDoLote(lote);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <div className="sem-impressao mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link href="/painel" className="text-sm font-medium text-marca underline underline-offset-4">
            Voltar ao painel
          </Link>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">Etiquetas do lote {lote.marcacao}</h1>
          <p className="mt-1 text-tinta-2">Quatro por folha A4. Recorte na linha tracejada e cole no pacote.</p>
        </div>
        <Imprimir />
      </div>
      <div className="grid gap-6 sm:grid-cols-2 print:grid-cols-2 print:gap-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="break-inside-avoid">
            <Etiqueta lote={lote} qrUrl={url} giro={0} />
          </div>
        ))}
      </div>
    </main>
  );
}
