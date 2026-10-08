import { Logo } from "@/components/Logo";
import Link from "next/link";
import { planos } from "@/lib/data";
import { FormAssinatura } from "./FormAssinatura";

export default async function Assinar({ searchParams }: { searchParams: Promise<{ plano?: string }> }) {
  const { plano } = await searchParams;
  const inicial = planos.find((p) => p.id === plano)?.id ?? "box";

  return (
    <main className="mx-auto max-w-2xl px-4 pb-20 sm:px-6">
      <nav className="flex h-16 items-center">
        <Link href="/" className="flex items-center gap-2 font-semibold text-marca">
          <Logo altura={44} />
        </Link>
      </nav>
      <h1 className="mt-6 text-4xl font-semibold tracking-tight">Assinar o GranumBox</h1>
      <p className="mt-3 text-lg text-tinta-2">
        A primeira caixa sai em novembro. Garanta sua vaga agora; a cobrança só começa no envio.
      </p>
      <FormAssinatura inicial={inicial} />
    </main>
  );
}
