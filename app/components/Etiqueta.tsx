import QRCode from "qrcode";
import { produtor, sca, type Lote } from "@/lib/data";

/** Etiqueta do lote, colada na caixa. Assinatura visual do GranumBox (ver DESIGN.md). */
export async function Etiqueta({ lote, qrUrl, giro = -1.5 }: { lote: Lote; qrUrl?: string; giro?: number }) {
  const qr = qrUrl
    ? await QRCode.toString(qrUrl, { type: "svg", margin: 0, color: { dark: "#773811", light: "#0000" } })
    : null;

  return (
    <div
      className="colar @container relative rounded-2xl bg-white p-5 text-[#3a1a07] shadow-[0_1px_0_rgb(119_56_17/0.12),0_20px_40px_-20px_rgb(119_56_17/0.5)] sm:p-7"
      style={{ ["--giro" as string]: `${giro}deg`, transform: `rotate(${giro}deg)` }}
    >
      <div className="flex items-start justify-between gap-4 border-b border-dashed border-[#773811]/40 pb-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-[#6e4a33]">
            {produtor.cidade}, {produtor.uf}
          </p>
          <p className="mt-1 font-display text-[clamp(1.75rem,7cqi,3rem)] leading-[1.1] text-[#773811]">{produtor.fazenda}</p>
        </div>
        {lote.pontuacaoSCA && (
          <div className="shrink-0 rounded-xl bg-[#773811] px-3 py-2 text-center text-white">
            <p className="text-2xl font-bold leading-none">{sca(lote.pontuacaoSCA)}</p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-wide">pts SCA</p>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[13px]">
          <dt className="text-[#6e4a33]">Lote</dt>
          <dd className="font-mono font-medium">{lote.marcacao}</dd>
          <dt className="text-[#6e4a33]">Café</dt>
          <dd className="font-medium">{lote.variedade}</dd>
          <dt className="text-[#6e4a33]">Processo</dt>
          <dd className="font-medium">{lote.processo}</dd>
          <dt className="text-[#6e4a33]">Altitude</dt>
          <dd className="font-medium">{lote.altitude}</dd>
          <dt className="text-[#6e4a33]">Safra</dt>
          <dd className="font-medium">{lote.safra}</dd>
        </dl>
        {qr && (
          <div className="size-24 shrink-0 sm:size-28" role="img" aria-label="QR code do lote" dangerouslySetInnerHTML={{ __html: qr }} />
        )}
      </div>
    </div>
  );
}
