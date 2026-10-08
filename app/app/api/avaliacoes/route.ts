import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { acharLote } from "@/lib/data";
import { salvarAvaliacao } from "@/lib/store";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const lote = body && acharLote(String(body.loteId));
  const nota = Number(body?.nota);

  // Só avalia quem escaneou o QR físico: o código do lote só existe impresso na embalagem.
  if (!lote || body.codigo !== lote.codigo) {
    return NextResponse.json({ erro: "Escaneie o QR da embalagem para avaliar." }, { status: 403 });
  }
  if (!(nota >= 1 && nota <= 5)) {
    return NextResponse.json({ erro: "Escolha de 1 a 5 estrelas." }, { status: 400 });
  }

  const jar = await cookies();
  const chave = `avaliou-${lote.id}`;
  if (jar.get(chave)) {
    return NextResponse.json({ erro: "Você já avaliou este lote. Obrigado!" }, { status: 409 });
  }

  await salvarAvaliacao({
    id: crypto.randomUUID(),
    loteId: lote.id,
    nota: Math.round(nota),
    comentario: String(body.comentario ?? "").slice(0, 500).trim(),
    nome: String(body.nome ?? "").slice(0, 40).trim() || "Anônimo",
    cidade: String(body.cidade ?? "").slice(0, 40).trim(),
    criadaEm: new Date().toISOString(),
  });

  jar.set(chave, "1", { maxAge: 60 * 60 * 24 * 365, httpOnly: true, sameSite: "lax" });
  return NextResponse.json({ ok: true });
}
