import { NextResponse } from "next/server";
import { periodos, planos } from "@/lib/data";
import { salvarAssinatura } from "@/lib/store";

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  const plano = planos.find((p) => p.id === b?.plano);
  const periodo = periodos.find((x) => x.id === b?.periodo)?.id ?? "mensal";
  const nome = String(b?.nome ?? "").trim().slice(0, 60);
  const email = String(b?.email ?? "").trim().toLowerCase().slice(0, 120);
  const cep = String(b?.cep ?? "").replace(/\D/g, "").slice(0, 8);

  if (!plano) return NextResponse.json({ erro: "Escolha um plano." }, { status: 400 });
  if (!nome) return NextResponse.json({ erro: "Informe seu nome." }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ erro: "Confira o e-mail: falta o @ ou o domínio." }, { status: 400 });
  if (cep.length !== 8) return NextResponse.json({ erro: "O CEP precisa ter 8 números." }, { status: 400 });

  await salvarAssinatura({ id: crypto.randomUUID(), plano: plano.id, periodo, nome, email, cep, criadaEm: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
