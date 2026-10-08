import { Redis } from "@upstash/redis";

export type Avaliacao = {
  id: string;
  loteId: string;
  nota: number; // 1–5
  comentario: string;
  nome: string;
  cidade: string;
  criadaEm: string;
};

// Usa Upstash Redis quando configurado (Vercel → Storage), senão memória local para dev.
const url = process.env.UPSTASH_REDIS_REST_URL ?? process.env.KV_REST_API_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

const g = globalThis as unknown as { __avaliacoes?: Avaliacao[] };
const memoria = (g.__avaliacoes ??= []);

export async function listarAvaliacoes(loteId?: string): Promise<Avaliacao[]> {
  const todas = redis ? ((await redis.lrange<Avaliacao>("avaliacoes", 0, -1)) ?? []) : memoria;
  return (loteId ? todas.filter((a) => a.loteId === loteId) : todas).sort((a, b) =>
    b.criadaEm.localeCompare(a.criadaEm),
  );
}

export async function salvarAvaliacao(a: Avaliacao) {
  if (redis) await redis.lpush("avaliacoes", a);
  else memoria.unshift(a);
}

export function resumo(avaliacoes: Avaliacao[]) {
  const total = avaliacoes.length;
  const media = total ? avaliacoes.reduce((s, a) => s + a.nota, 0) / total : 0;
  return { total, media };
}
