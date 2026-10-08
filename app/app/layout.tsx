import type { Metadata } from "next";
import { Playfair_Display, Montserrat, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], weight: ["400", "500", "600", "700", "800"] });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: "900", style: "italic" });
const mono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "GranumBox",
  description: "Um QR code na embalagem liga quem bebe o café a quem plantou.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${montserrat.variable} ${playfair.variable} ${mono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
