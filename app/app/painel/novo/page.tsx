import Link from "next/link";
import { NovoLote } from "./NovoLote";

export default function Novo() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6">
      <Link href="/painel" className="text-sm font-medium text-marca underline underline-offset-4">
        Voltar ao painel
      </Link>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight">Cadastrar lote</h1>
      <p className="mt-2 text-tinta-2">
        Leva dois minutos. Ao salvar, o lote ganha um código, uma página própria e o QR para imprimir.
      </p>
      <NovoLote />
    </main>
  );
}
