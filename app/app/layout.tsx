import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";

const sans = Inter({ variable: "--font-sans-app", subsets: ["latin"] });
const serif = Fraunces({ variable: "--font-serif-app", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GranumBox — a história por trás de cada café",
  description: "Escaneie o QR da embalagem e conheça quem produziu o seu café.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${sans.variable} ${serif.variable} font-sans antialiased`}>{children}</body>
    </html>
  );
}
