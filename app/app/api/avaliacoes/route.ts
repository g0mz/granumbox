import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ATRIBUTOS, type Perfil } from "@/lib/data";
import { acharLote, listarAvaliacoes, resumo, salvarAvaliacao } from "@/lib/store";

const escala = (v: unknown) => {
  const n = Math.round(Number(v));
  return n >= 1 && n <= 5 ? n : undefined;
};

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const lote = body && (await acharLote(String(body.loteId)));

  // Só avalia quem escaneou o QR do pacote: o código do lote só existe impresso na embalagem.
  if (!lote || body.codigo !== lote.codigo) {
    return NextResponse.json({ erro: "Escaneie o QR do pacote para avaliar." }, { status: 403 });
  }
  const nota = escala(body.nota);
  if (!nota) return NextResponse.json({ erro: "Dê uma nota de 1 a 5." }, { status: 400 });

  const jar = await cookies();
  const chave = `avaliou-${lote.id}`;
  if (jar.get(chave)) {
    return NextResponse.json({ erro: "Este aparelho já avaliou este lote." }, { status: 409 });
  }

  const perfil: Partial<Perfil> = {};
  for (const { chave: k } of ATRIBUTOS) {
    const v = escala(body.perfil?.[k]);
    if (v) perfil[k] = v;
  }

  await salvarAvaliacao({
    id: crypto.randomUUID(),
    loteId: lote.id,
    nota,
    perfil,
    comentario: String(body.comentario ?? "").slice(0, 400).trim(),
    nome: String(body.nome ?? "").slice(0, 40).trim(),
    cidade: String(body.cidade ?? "").slice(0, 40).trim(),
    criadaEm: new Date().toISOString(),
  });

  jar.set(chave, "1", { maxAge: 60 * 60 * 24 * 365, httpOnly: true, sameSite: "lax" });
  return NextResponse.json({ ok: true });
}

// Alimenta a tela /apresentar ao vivo.
export async function GET(req: Request) {
  const loteId = new URL(req.url).searchParams.get("lote") ?? undefined;
  const avaliacoes = await listarAvaliacoes(loteId);
  return NextResponse.json({ ...resumo(avaliacoes), recentes: avaliacoes.slice(0, 8) }, { headers: { "Cache-Control": "no-store" } });
}
