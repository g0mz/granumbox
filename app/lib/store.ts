import { Redis } from "@upstash/redis";
import { ATRIBUTOS, produtores, type Lote, type Perfil } from "./data";

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

type Memoria = { avaliacoes: Avaliacao[]; lotes: Lote[]; obrigados: Record<string, number> };
const g = globalThis as unknown as { __granum?: Memoria };
const mem = (g.__granum ??= { avaliacoes: [], lotes: [], obrigados: {} });

/* Avaliações */

export async function listarAvaliacoes(loteId?: string): Promise<Avaliacao[]> {
  const todas = redis ? ((await redis.lrange<Avaliacao>("avaliacoes", 0, -1)) ?? []) : mem.avaliacoes;
  return (loteId ? todas.filter((a) => a.loteId === loteId) : todas).sort((a, b) =>
    b.criadaEm.localeCompare(a.criadaEm),
  );
}

export async function salvarAvaliacao(a: Avaliacao) {
  if (redis) await redis.lpush("avaliacoes", a);
  else mem.avaliacoes.unshift(a);
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

/* Lotes: os de demonstração + os cadastrados pelo painel */

export async function listarLotes(): Promise<Lote[]> {
  const novos = redis ? ((await redis.lrange<Lote>("lotes", 0, -1)) ?? []) : mem.lotes;
  return [...novos, ...produtores.flatMap((p) => p.lotes)];
}

export async function acharLote(id: string) {
  return (await listarLotes()).find((l) => l.id === id);
}

export async function salvarLote(l: Lote) {
  if (redis) await redis.lpush("lotes", l);
  else mem.lotes.unshift(l);
}

/* Agradecimentos ao produtor */

export async function agradecer(loteId: string) {
  if (redis) return redis.hincrby("obrigados", loteId, 1);
  return (mem.obrigados[loteId] = (mem.obrigados[loteId] ?? 0) + 1);
}

export async function contarObrigados(loteId?: string): Promise<number> {
  const todos: Record<string, number> = redis
    ? ((await redis.hgetall<Record<string, number>>("obrigados")) ?? {})
    : mem.obrigados;
  if (loteId) return Number(todos[loteId] ?? 0);
  return Object.values(todos).reduce((s, v) => s + Number(v), 0);
}

/* Assinaturas (lista de espera do MVP: sem cobrança) */

export type Assinatura = { id: string; plano: string; periodo?: string; nome: string; email: string; cep: string; criadaEm: string };

const g2 = globalThis as unknown as { __assinaturas?: Assinatura[] };
const assinaturasMem = (g2.__assinaturas ??= []);

export async function salvarAssinatura(a: Assinatura) {
  if (redis) await redis.lpush("assinaturas", a);
  else assinaturasMem.unshift(a);
}

export async function listarAssinaturas(): Promise<Assinatura[]> {
  return redis ? ((await redis.lrange<Assinatura>("assinaturas", 0, -1)) ?? []) : assinaturasMem;
}
