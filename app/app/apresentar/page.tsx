import Image from "next/image";
import QRCode from "qrcode";
import { produtor, sca } from "@/lib/data";
import { urlDoLote } from "@/lib/origem";
import { AoVivo } from "./AoVivo";

export const dynamic = "force-dynamic";

/** Tela para o telão do pitch: a banca escaneia e vê as próprias avaliações chegando. */
export default async function Apresentar() {
  const lote = produtor.lotes[0];
  const url = await urlDoLote(lote);
  const qr = await QRCode.toString(url, { type: "svg", margin: 0, color: { dark: "#773811", light: "#0000" } });

  return (
    <main className="mx-auto grid min-h-[100dvh] max-w-7xl items-center gap-12 px-6 py-10 lg:grid-cols-[auto_1fr] lg:gap-20">
      <div className="mx-auto w-full max-w-md text-center">
        <Image src="/logo.svg" alt="GranumBox" width={120} height={120} className="mx-auto" priority />
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-[0_24px_60px_-28px_rgb(119_56_17/0.55)]">
          <div className="aspect-square w-full" role="img" aria-label="QR code do lote de demonstração" dangerouslySetInnerHTML={{ __html: qr }} />
        </div>
        <p className="mt-6 text-2xl font-semibold">Aponte a câmera e avalie</p>
        <p className="mt-1 text-tinta-2">
          {lote.variedade}, {lote.processo.toLowerCase()}
          {lote.pontuacaoSCA && `, ${sca(lote.pontuacaoSCA)} pts`}. <span className="font-display text-marca">{produtor.fazenda}</span>
        </p>
      </div>
      <AoVivo loteId={lote.id} ficha={lote.perfilFicha} />
    </main>
  );
}
