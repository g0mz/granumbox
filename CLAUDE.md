# GranumBox

Plataforma para o desafio #6 (Café com Valor) do Genius Agro Hackathon 2026. App Next.js em `app/`.

- **Toda mudança visual segue [DESIGN.md](DESIGN.md).** Cores e fontes só pelos tokens de `app/app/globals.css`. Fontes: Courgette (assinatura), Poppins (interface), IBM Plex Mono (dados).
- **Contexto e porquês em [DECISOES.md](DECISOES.md).** Leia antes de mudar escopo, modelo de negócio ou visual; registre decisões novas no topo.
- Rodar: `npm --prefix app run dev`. Avaliações e lotes usam Upstash Redis se `UPSTASH_REDIS_REST_URL`/`KV_REST_API_URL` existir; senão, memória.
- Dados de demonstração em `app/lib/data.ts`. Rotas: `/`, `/p/[lote]`, `/painel`, `/painel/novo`, `/painel/etiqueta/[lote]`, `/apresentar`.
