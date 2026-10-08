# GranumBox

Plataforma para o desafio #6 (Café com Valor) do Genius Agro Hackathon 2026. App Next.js em `app/`.

- **Toda mudança visual segue [DESIGN.md](DESIGN.md).** Cores e fontes só pelos tokens de `app/app/globals.css`. Fontes: Courgette (assinatura), Poppins (interface), IBM Plex Mono (dados).
- Rodar: `npm --prefix app run dev`. Avaliações usam Upstash Redis se `UPSTASH_REDIS_REST_URL`/`KV_REST_API_URL` existir; senão, memória.
- Dados de demonstração em `app/lib/data.ts`.
