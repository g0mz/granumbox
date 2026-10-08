import QRCode from "qrcode";
import { produtor, sca, type Lote } from "@/lib/data";

/** A marcação de estêncil da saca, como etiqueta de papel colada no kraft. Assinatura visual do GranumBox. */
export async function Etiqueta({ lote, qrUrl, giro = -1.5 }: { lote: Lote; qrUrl?: string; giro?: number }) {
  const qr = qrUrl
    ? await QRCode.toString(qrUrl, { type: "svg", margin: 0, color: { dark: "#2e1606", light: "#0000" } })
    : null;

  return (
    <div
      className="carimbo relative bg-[#f7f6f2] p-5 text-[#2e1606] shadow-[0_1px_0_rgb(46_22_6/0.15),0_18px_40px_-18px_rgb(46_22_6/0.55)] sm:p-7"
      style={{ ["--giro" as string]: `${giro}deg`, transform: `rotate(${giro}deg)` }}
    >
      <div className="flex items-start justify-between gap-4 border-b-2 border-[#2e1606] pb-3">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em]">
            {produtor.cidade} / {produtor.uf} / Brasil
          </p>
          <p className="font-stencil text-5xl font-black uppercase leading-[0.9] sm:text-6xl">{produtor.marca}</p>
        </div>
        {lote.pontuacaoSCA && (
          <div className="shrink-0 border-2 border-[#b3261e] px-2 py-1 text-center text-[#b3261e]">
            <p className="font-stencil text-3xl font-black leading-none">{sca(lote.pontuacaoSCA)}</p>
            <p className="font-mono text-[10px] uppercase">pts SCA</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 font-mono text-[13px]">
          <dt className="opacity-60">Lote</dt>
          <dd className="font-medium">{lote.marcacao}</dd>
          <dt className="opacity-60">Café</dt>
          <dd>{lote.variedade}</dd>
          <dt className="opacity-60">Processo</dt>
          <dd>{lote.processo}</dd>
          <dt className="opacity-60">Altitude</dt>
          <dd>{lote.altitude}</dd>
          <dt className="opacity-60">Safra</dt>
          <dd>{lote.safra}</dd>
        </dl>
        {qr && (
          <div
            className="size-24 shrink-0 sm:size-28"
            role="img"
            aria-label="QR code do lote"
            dangerouslySetInnerHTML={{ __html: qr }}
          />
        )}
      </div>
    </div>
  );
}
