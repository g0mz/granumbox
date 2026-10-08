# GranumBox

Clube de assinatura de café para o desafio #6 (Café com Valor) do Genius Agro Hackathon 2026. **Só o consumidor paga**; o GranumBox compra de cooperativas, embala com a marca e envia com QR da história do lote. App Next.js em `app/`.

- **Toda mudança visual segue [DESIGN.md](DESIGN.md).** Cores e fontes só pelos tokens de `app/app/globals.css`. Fontes: Playfair Display Black Italic (assinatura), Montserrat (interface; ExtraBold = "box" do logo), IBM Plex Mono (dados).
- **Contexto e porquês em [DECISOES.md](DECISOES.md).** Leia antes de mudar escopo, modelo de negócio ou visual; registre decisões novas no topo.
- Rodar: `npm --prefix app run dev`. Deploy na Cloudflare Workers (OpenNext): `npm --prefix app run deploy`; testar no runtime da Cloudflare com `npm --prefix app run preview`. Avaliações e lotes usam Upstash Redis se `UPSTASH_REDIS_REST_URL`/`KV_REST_API_URL` existir; senão, memória.
- Dados de demonstração em `app/lib/data.ts`. Rotas: `/`, `/assinar`, `/p/[lote]`, `/painel` (curadoria interna), `/painel/novo`, `/painel/etiqueta/[lote]`, `/apresentar`.
