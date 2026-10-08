import { Logo } from "@/components/Logo";
import Link from "next/link";
import { edicao, planos, produtor, reais } from "@/lib/data";
import { urlDoLote } from "@/lib/origem";
import { Etiqueta } from "@/components/Etiqueta";
import { FichaProva } from "@/components/FichaProva";

export const dynamic = "force-dynamic";

const caminho = [
  ["Compramos da cooperativa", "Provamos lotes de associações e cooperativas do Norte Pioneiro e compramos os melhores, pagando o justo."],
  ["Embalamos com a história", "Cada pacote sai com a marca GranumBox e um QR do lote: quem plantou, o talhão, o processo."],
  ["Chega na sua casa", "Todo mês, a caixa vem com cafés de produtores diferentes. Você escaneia e conhece cada um."],
  ["Sua nota volta ao sítio", "Você avalia na xícara, e a opinião chega à família produtora pela cooperativa."],
];

export default async function Home() {
  const demo = produtor.lotes[0];
  const url = await urlDoLote(demo);
  const doMes = produtor.lotes.filter((l) => edicao.lotes.includes(l.id));

  return (
    <main>
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <span className="flex items-center gap-2 font-semibold text-marca">
          <Logo altura={44} />
        </span>
        <Link
          href="/assinar"
          className="apertar rounded-full bg-marca px-5 py-2 text-sm font-medium text-sobre-marca hover:bg-marca-forte"
        >
          Assinar
        </Link>
      </nav>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-10 sm:px-6 md:grid-cols-[1.1fr_1fr] md:pt-16">
        <div>
          <h1 className="text-[2.4rem] font-semibold leading-[1.04] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
            Todo mês, um café com nome e sobrenome na sua porta.
          </h1>
          <p className="mt-6 max-w-[36ch] text-lg leading-relaxed text-tinta-2">
            Cafés especiais do Norte Pioneiro, comprados de cooperativas. Cada pacote traz um QR com a história de quem
            plantou.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/assinar" className="apertar rounded-full bg-marca px-6 py-3.5 font-medium text-sobre-marca hover:bg-marca-forte">
              Assinar a partir de {reais(planos[0].preco)}
            </Link>
            <Link href={url} className="apertar rounded-full border border-marca px-6 py-3.5 font-medium text-marca hover:bg-marca hover:text-sobre-marca">
              Ver um pacote por dentro
            </Link>
          </div>
        </div>
        <div className="mx-auto w-full max-w-md md:mr-0">
          <Etiqueta lote={demo} qrUrl={url} giro={2} />
          <p className="mt-6 text-center text-sm text-tinta-2 md:text-right">
            A etiqueta de verdade. Aponte a câmera do celular para o QR.
          </p>
        </div>
      </section>

      <section className="border-y border-linha bg-caixa">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight">Da cooperativa à sua xícara, e de volta.</h2>
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

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-3xl font-semibold tracking-tight">Na caixa de {edicao.nome.toLowerCase()}</h2>
        <p className="mt-3 max-w-[56ch] text-tinta-2">
          Dois lotes do {produtor.fazenda}, em {produtor.cidade} ({produtor.uf}). Mesma família, processos diferentes:
          prove lado a lado e veja a diferença.
        </p>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {doMes.map((l) => (
            <Link
              key={l.id}
              href={`/p/${l.id}`}
              className="apertar group block rounded-2xl bg-caixa p-6 hover:bg-linha"
            >
              <p className="font-mono text-sm text-tinta-2">Lote {l.marcacao}</p>
              <h3 className="mt-2 text-xl font-semibold">
                {l.variedade}, {l.processo.toLowerCase()}
              </h3>
              <p className="mt-1 text-tinta-2">{l.notasSensoriais.join(", ")}</p>
              <p className="mt-5 text-sm font-medium text-marca underline-offset-4 group-hover:underline">
                Conhecer quem plantou
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 sm:px-6 md:grid-cols-[1fr_1.1fr] md:items-center">
        <div className="order-2 rounded-2xl bg-caixa p-6 sm:p-8 md:order-1">
          <p className="mb-6 flex items-baseline justify-between font-mono text-xs text-tinta-2">
            <span>Lote {demo.marcacao}</span>
            <span>dados de exemplo</span>
          </p>
          <FichaProva consumidor={{ docura: 4.4, acidez: 2.6, corpo: 4.1, finalizacao: 3.5 }} ficha={demo.perfilFicha} />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-3xl font-semibold leading-tight tracking-tight">
            Você prova, avalia e compara com o que o produtor descreveu.
          </h2>
          <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-tinta-2">
            Nota para doçura, acidez, corpo e finalização, em dez segundos. A média de todos os assinantes vira um
            retrato do lote, e a família produtora recebe esse retrato.
          </p>
        </div>
      </section>

      <section id="planos" className="border-t border-linha bg-caixa">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <h2 className="text-3xl font-semibold tracking-tight">Escolha sua caixa.</h2>
          <p className="mt-3 text-tinta-2">Frete incluso. Pause ou cancele quando quiser.</p>
          <div className="mt-10 divide-y divide-linha border-y border-linha">
            {planos.map((p) => (
              <div key={p.id} className="grid gap-3 py-6 md:grid-cols-[12rem_9rem_1fr_auto] md:items-center md:gap-8">
                <h3 className="font-display text-3xl text-marca">{p.nome}</h3>
                <p className="font-mono">
                  {reais(p.preco)}
                  <span className="text-tinta-2"> /mês</span>
                </p>
                <p className="max-w-[56ch] leading-relaxed text-tinta-2">{p.descricao}</p>
                <Link
                  href={`/assinar?plano=${p.id}`}
                  className={`apertar justify-self-start rounded-full px-5 py-2.5 text-sm font-medium ${
                    "destaque" in p ? "bg-marca text-sobre-marca hover:bg-marca-forte" : "border border-marca text-marca hover:bg-marca hover:text-sobre-marca"
                  }`}
                >
                  Assinar {p.nome}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-10 rounded-3xl bg-marca p-8 text-sobre-marca sm:p-12 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight">É de uma cooperativa ou associação?</h2>
            <p className="mt-5 max-w-[50ch] leading-relaxed text-sobre-marca/85">
              Compramos lotes especiais do Norte Pioneiro, região com Denominação de Origem desde 2025. Vocês não pagam
              nada: vendem o café e recebem de volta a opinião de cada assinante, lote por lote.
            </p>
          </div>
          <ul className="space-y-4">
            {[
              ["Venda direta", "Um comprador fixo para lotes especiais, todo mês."],
              ["Opinião de quem bebeu", "A ficha de prova dos assinantes, para melhorar a próxima safra."],
              ["Nome do produtor no pacote", "A história da família vai junto, em vez de virar commodity."],
            ].map(([t, d]) => (
              <li key={t} className="border-t border-sobre-marca/25 pt-4">
                <p className="font-semibold">{t}</p>
                <p className="mt-1 text-sm leading-relaxed text-sobre-marca/85">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="mx-auto flex max-w-6xl flex-wrap justify-between gap-2 px-4 py-8 text-sm text-tinta-2 sm:px-6">
        <span>GranumBox</span>
        <Link href="/painel" className="underline underline-offset-4">
          Curadoria
        </Link>
        <span>Genius Agro Hackathon 2026, desafio Café com Valor</span>
      </footer>
    </main>
  );
}
