import Image from "next/image";
import Link from "next/link";

type Cafe = {
  id: string;
  marcacao: string;
  variedade: string;
  processo: string;
  notas: string[];
  pontos?: string;
  fazenda: string;
  cidade: string;
  altitude: string;
};

/** Rótulo do pacote trocado pelo do lote, por cima da arte do PNG. Medidas em % da imagem. */
function Pacote({ c }: { c: Cafe }) {
  return (
    <div className="relative w-full [container-type:inline-size]">
      <Image
        src="/produto/pacote.webp"
        alt={`Pacote GranumBox de ${c.variedade}, ${c.fazenda}, ${c.cidade}`}
        width={1122}
        height={1402}
        sizes="(min-width: 768px) 220px, 45vw"
        className="h-auto w-full drop-shadow-[0_26px_22px_rgb(0_0_0/0.45)]"
      />
      <div aria-hidden className="absolute left-[35%] top-[45%] flex h-[11.2%] w-[44%] flex-col justify-center overflow-hidden bg-[#f6e6d6] text-center text-[#3a1a07]">
        <span className="whitespace-nowrap font-[Georgia,serif] text-[4.8cqw] font-bold leading-tight">{c.fazenda}</span>
        <span className="whitespace-nowrap font-[Georgia,serif] text-[3.2cqw] text-[#6e4a33]">{c.cidade} · Norte Pioneiro</span>
        <span className="whitespace-nowrap font-[Georgia,serif] text-[3.2cqw] text-[#6e4a33]">
          {c.altitude} · {c.processo.split(" ")[0]}
        </span>
      </div>
    </div>
  );
}

/** Pacotes em pé numa prateleira de madeira, cada um com a etiqueta do lote pendurada na borda. */
export function CafesPrateleira({ titulo, cafes }: { titulo: React.ReactNode; cafes: Cafe[] }) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-marca">Caixa de outubro · só Norte Pioneiro do Paraná</p>
      <div className="mt-3">{titulo}</div>

      <ul className="mt-14 grid grid-cols-2 gap-x-6 sm:gap-x-14 md:grid-cols-[repeat(3,220px)] md:justify-start md:px-10">
        {cafes.map((c, i) => (
          <li key={c.id} className="relative">
            <Link href={`/p/${c.id}`} className="group flex flex-col">
              <div className="transition-transform duration-300 ease-out group-hover:-translate-y-3 group-hover:-rotate-2 motion-reduce:transform-none">
                <Pacote c={c} />
              </div>
              <div aria-hidden className="relative z-0 -mx-3 h-3.5 bg-[#6b4426] shadow-[0_10px_0_-3px_#3d2412,0_24px_30px_rgb(0_0_0/0.45)] sm:-mx-7" />
              {/* Etiqueta pendurada na borda da prateleira (a prateleira é o fundo da lista) */}
              <div
                className="relative z-10 mx-auto mt-3 w-[88%] origin-top bg-creme-fixo px-4 pb-4 pt-5 font-mono text-[11px] leading-relaxed text-[#3a1a07] shadow-[0_14px_22px_-6px_rgb(0_0_0/0.55)] transition-transform duration-300 group-hover:rotate-0"
                style={{ transform: `rotate(${i % 2 ? 2.5 : -2}deg)` }}
              >
                <span aria-hidden className="absolute -top-3 left-1/2 h-4 w-px bg-[#c9ae95]" />
                <span aria-hidden className="absolute left-1/2 top-1.5 size-1.5 -translate-x-1/2 rounded-full bg-escuro" />
                <span className="block text-[#773811]">{c.marcacao}</span>
                <span className="mt-1 block font-sans text-sm font-bold">{c.variedade}</span>
                {c.pontos && <span className="block">{c.pontos} pts SCA</span>}
                <span className="mt-1 block text-[#6e4a33]">{c.notas.join(" · ").toLowerCase()}</span>
              </div>
            </Link>
          </li>
        ))}
        <li className="col-span-2 mt-10 hidden md:flex flex-col md:col-span-1 md:mt-0">
          <div className="flex">
            <div className="grid aspect-[1122/1402] w-full place-items-center border-2 border-dashed border-tinta/25 p-4 text-center font-mono text-xs text-tinta-2 md:w-full">
              próximo lote
              <br />
              em curadoria
            </div>
          </div>
          <div aria-hidden className="relative z-0 -mx-3 h-3.5 bg-[#6b4426] shadow-[0_10px_0_-3px_#3d2412,0_24px_30px_rgb(0_0_0/0.45)] sm:-mx-7" />
          <div className="mx-auto mt-3 w-[88%] pt-5 text-sm">
            <p className="font-semibold">Caixa de novembro</p>
            <p className="mt-1 text-tinta-2">Assinantes recebem primeiro.</p>
          </div>
        </li>
      </ul>
    </div>
  );
}
