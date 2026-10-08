import { Redis } from "@upstash/redis";
import { ATRIBUTOS, type Perfil } from "./data";

export type Avaliacao = {
  id: string;
  loteId: string;
  nota: number; // 1 a 5
  perfil: Partial<Perfil>;
  comentario: string;
  nome: string;
  cidade: string;
  criadaEm: string;
};

// Usa Upstash Redis quando configurado (Vercel > Storage), senão memória local para dev.
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
  const perfil: Partial<Perfil> = {};
  for (const { chave } of ATRIBUTOS) {
    const vals = avaliacoes.map((a) => a.perfil?.[chave]).filter((v): v is number => !!v);
    if (vals.length) perfil[chave] = vals.reduce((s, v) => s + v, 0) / vals.length;
  }
  return { total, media, perfil };
}
