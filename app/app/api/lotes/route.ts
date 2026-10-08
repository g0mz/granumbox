import { NextResponse } from "next/server";
import { ATRIBUTOS, type Perfil } from "@/lib/data";
import { salvarLote } from "@/lib/store";

const texto = (v: unknown, max = 60) => String(v ?? "").trim().slice(0, max);

export async function POST(req: Request) {
  const b = await req.json().catch(() => null);
  if (!b || !texto(b.variedade) || !texto(b.processo)) {
    return NextResponse.json({ erro: "Preencha pelo menos variedade e processo." }, { status: 400 });
  }

  const perfilFicha = {} as Perfil;
  for (const { chave } of ATRIBUTOS) {
    const n = Math.round(Number(b.perfil?.[chave]));
    perfilFicha[chave] = n >= 1 && n <= 5 ? n : 3;
  }

  const safra = texto(b.safra, 4) || String(new Date().getFullYear());
  const sigla = texto(b.variedade).replace(/[^A-Za-zÀ-ú]/g, "").slice(0, 2).toUpperCase();
  const sufixo = Math.random().toString(36).slice(2, 6);
  const pontos = Number(String(b.pontuacaoSCA ?? "").replace(",", "."));

  const lote = {
    id: `lote-${safra}-${sufixo}`,
    codigo: Math.random().toString(36).slice(2, 6),
    marcacao: `${safra.slice(2)}-${sigla}-${String(Math.floor(Math.random() * 90) + 10)}`,
    variedade: texto(b.variedade),
    processo: texto(b.processo),
    altitude: texto(b.altitude) || "-",
    talhao: texto(b.talhao) || "-",
    torra: texto(b.torra) || "-",
    colheita: texto(b.colheita) || "-",
    safra,
    notasSensoriais: texto(b.notas, 120).split(",").map((s) => s.trim()).filter(Boolean).slice(0, 4),
    pontuacaoSCA: pontos >= 60 && pontos <= 100 ? pontos : undefined,
    perfilFicha,
  };

  await salvarLote(lote);
  return NextResponse.json({ id: lote.id });
}
