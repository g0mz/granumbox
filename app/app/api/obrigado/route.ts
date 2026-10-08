import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { acharLote, agradecer } from "@/lib/store";

export async function POST(req: Request) {
  const { loteId } = await req.json().catch(() => ({}));
  if (!(await acharLote(String(loteId)))) return NextResponse.json({ erro: "Lote não encontrado." }, { status: 404 });

  const jar = await cookies();
  const chave = `agradeceu-${loteId}`;
  if (jar.get(chave)) return NextResponse.json({ erro: "Você já agradeceu por este lote." }, { status: 409 });

  const total = await agradecer(String(loteId));
  jar.set(chave, "1", { maxAge: 60 * 60 * 24 * 365, httpOnly: true, sameSite: "lax" });
  return NextResponse.json({ total });
}
