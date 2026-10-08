import Image from "next/image";
import Link from "next/link";
import { produtor } from "@/lib/data";
import { urlDoLote } from "@/lib/origem";
import { Etiqueta } from "@/components/Etiqueta";
import { FichaProva } from "@/components/FichaProva";

export const dynamic = "force-dynamic";

const caminho = [
  ["Colheita", "O produtor cadastra o lote: talhão, variedade, processo, altitude e a pontuação da classificação."],
  ["Embalagem", "Cada lote ganha um QR próprio, impresso no pacote junto com a marcação."],
  ["Xícara", "Quem compra escaneia, conhece a família e dá nota para doçura, acidez, corpo e finalização."],
  ["De volta ao sítio", "As notas chegam no painel do produtor, lote por lote, para negociar com dados."],
];

const planos = [
  { nome: "Grão", preco: "R$ 49", inclui: "Até 3 lotes ativos, QR ilimitado, página da família e avaliações verificadas." },
  { nome: "Safra", preco: "R$ 99", inclui: "Lotes ilimitados, ficha de prova comparada e relatório por lote para levar à torrefação." },
  { nome: "Cooperativa", preco: "Sob consulta", inclui: "Vários produtores numa conta, selo de origem regional e exportação dos dados." },
];

export default async function Home() {
  const demo = produtor.lotes[0];
  const url = await urlDoLote(demo);

  return (
    <main>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <span className="flex items-center gap-2 font-semibold text-marca">
          <Image src="/logo.svg" alt="" width={32} height={32} />
          GranumBox
        </span>
        <Link href="/painel" className="apertar rounded-full border border-marca text-marca px-4 py-2 text-sm font-medium hover:bg-marca hover:text-sobre-marca">
          Painel do produtor
        </Link>
      </nav>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-10 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pt-16">
        <div>
          <h1 className="text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.03em] sm:text-6xl">
            O café sai do sítio com nome e sobrenome.
          </h1>
          <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-tinta-2">
            Um QR no pacote mostra o lote e quem plantou. A nota de quem bebeu volta para o produtor.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={url} className="apertar rounded-full bg-marca px-6 py-3.5 font-medium text-sobre-marca hover:bg-marca-forte">
              Abrir o lote de exemplo
            </Link>
            <a href="#planos" className="apertar rounded-full border border-marca text-marca px-6 py-3.5 font-medium hover:bg-marca hover:text-sobre-marca">
              Ver planos
            </a>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md md:mr-0">
          <Etiqueta lote={demo} qrUrl={url} giro={2} />
          <p className="mt-6 text-center text-sm text-tinta-2 md:text-right">
            Aponte a câmera do celular para o QR.
          </p>
        </div>
      </section>

      <section className="border-y border-linha bg-caixa">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight">Do talhão à xícara, e de volta.</h2>
          <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
            <span aria-hidden className="absolute left-0 right-0 top-[7px] hidden h-px bg-tinta/40 md:block" />
            {caminho.map(([t, d], i) => (
              <li key={t} className="relative pl-7 md:pl-0 md:pt-8">
                <span
                  aria-hidden
                  className={`absolute left-0 top-1 size-3.5 rounded-full md:top-0 ${i === caminho.length - 1 ? "bg-marca" : "border-2 border-tinta bg-caixa"}`}
                />
                <h3 className="font-semibold">{t}</h3>
                <p className="mt-2 leading-relaxed text-tinta-2">{d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div className="order-2 bg-caixa p-6 sm:p-8 md:order-1">
          <p className="mb-6 flex items-baseline justify-between font-mono text-xs text-tinta-2">
            <span>Lote {demo.marcacao}</span>
            <span>dados de exemplo</span>
          </p>
          <FichaProva consumidor={{ docura: 4.4, acidez: 2.6, corpo: 4.1, finalizacao: 3.5 }} ficha={demo.perfilFicha} />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight">
            A ficha técnica diz uma coisa. Quem bebe confirma, ou não.
          </h2>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-tinta-2">
            Cada avaliação vira uma ficha de prova do consumidor. Se o lote sai mais doce do que a ficha promete, o
            produtor tem o argumento para pedir mais pela próxima safra.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid gap-10 rounded-3xl bg-marca p-8 text-sobre-marca sm:p-12 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight">
              O selo de origem diz de onde o café vem. O GranumBox mostra o que acharam dele.
            </h2>
            <p className="mt-5 max-w-[50ch] leading-relaxed text-sobre-marca/85">
              O Norte Pioneiro ganhou Denominação de Origem em 2025, e o selo da IG já rastreia a procedência. O
              GranumBox soma o que falta: a história da família e a opinião verificada de quem bebeu, lote por lote.
            </p>
          </div>
          <ul className="space-y-4 text-sobre-marca/90">
            {[
              ["Para o produtor", "Argumento com dados para vender melhor a próxima safra."],
              ["Para a cooperativa", "Uma página por associado e a visão da região inteira."],
              ["Para quem compra", "Saber quem plantou, sem baixar aplicativo."],
            ].map(([t, d]) => (
              <li key={t} className="border-t border-sobre-marca/25 pt-4">
                <p className="font-semibold text-sobre-marca">{t}</p>
                <p className="mt-1 text-sm leading-relaxed">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="planos" className="border-t border-linha bg-caixa">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight">Assinatura mensal para o produtor.</h2>
          <p className="mt-3 text-tinta-2">Quem bebe não paga e não instala nada: o QR abre direto no navegador.</p>
          <div className="mt-10 divide-y divide-linha border-y border-linha">
            {planos.map((p) => (
              <div key={p.nome} className="grid gap-2 py-6 md:grid-cols-[12rem_10rem_1fr] md:items-baseline md:gap-8">
                <h3 className="font-display text-3xl text-marca">{p.nome}</h3>
                <p className="font-mono">
                  {p.preco}
                  {p.preco.startsWith("R$") && <span className="text-tinta-2"> /mês</span>}
                </p>
                <p className="max-w-[60ch] leading-relaxed text-tinta-2">{p.inclui}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-8 text-sm text-tinta-2 sm:px-6">
        <span>GranumBox</span>
        <span>Genius Agro Hackathon 2026, desafio Café com Valor</span>
      </footer>
    </main>
  );
}
