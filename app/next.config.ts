import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fotos de clima (licença Unsplash). Nunca usar como foto de um lote ou produtor específico.
  images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }] },
};

export default nextConfig;
