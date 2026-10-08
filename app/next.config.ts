import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No Cloudflare Workers não há otimizador de imagem do Next; os PNGs já vão no tamanho de uso.
  // Fotos de clima (licença Unsplash). Nunca usar como foto de um lote ou produtor específico.
  images: { unoptimized: true, remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }] },
};

export default nextConfig;

// Expõe os bindings da Cloudflare no `next dev`.
import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
