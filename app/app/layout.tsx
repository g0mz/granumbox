import type { Metadata } from "next";
import { Courgette, Poppins, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ variable: "--font-poppins", subsets: ["latin"], weight: ["400", "500", "600", "700"] });
const courgette = Courgette({ variable: "--font-courgette", subsets: ["latin"], weight: "400" });
const mono = IBM_Plex_Mono({ variable: "--font-plex-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  title: "GranumBox",
  description: "Um QR na embalagem liga quem bebe o café a quem plantou.",
  icons: { icon: "/logo.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} ${courgette.variable} ${mono.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
