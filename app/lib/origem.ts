import { headers } from "next/headers";
import type { Lote } from "./data";

export async function urlDoLote(lote: Lote) {
  const h = await headers();
  return `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host")}/p/${lote.id}?c=${lote.codigo}`;
}
