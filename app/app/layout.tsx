import type { Metadata } from "next";
import { Archivo, Big_Shoulders_Stencil, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ variable: "--font-archivo", subsets: ["latin"], axes: ["wdth"] });
const stencil = Big_Shoulders_Stencil({ variable: "--font-stencil", subsets: ["latin"], weight: ["700", "900"] });
const mono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "GranumBox",
  description: "Um QR na embalagem liga quem bebe o café a quem plantou.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${archivo.variable} ${stencil.variable} ${mono.variable} font-sans antialiased`}>
        <div className="relative">{children}</div>
      </body>
    </html>
  );
}
