import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { edicao, planos, produtor, reais, sca } from "@/lib/data";
import { urlDoLote } from "@/lib/origem";
import { listarAvaliacoes } from "@/lib/store";
import { Logo } from "@/components/Logo";
import { Nota } from "@/components/Nota";
import { FichaProva } from "@/components/FichaProva";
import { CafesComAbas } from "@/components/CafesComAbas";

export const dynamic = "force-dynamic";

// Fotos de clima, licença Unsplash. Não representam um lote ou produtor específico.
const foto = (id: string, w: number) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;

const caminho = [
  ["Escolhemos na cooperativa", "Provamos lotes de associações do Norte Pioneiro e compramos os melhores, pagando o justo."],
  ["Embalamos com a história", "Cada pacote sai com a marca GranumBox e um QR do lote: quem plantou, o talhão, o processo."],
  ["Chega na sua porta", "Todo mês, cafés de produtores diferentes. Você escaneia e conhece cada família."],
  ["Sua nota volta ao sítio", "Você avalia na xícara e a opinião chega ao produtor pela cooperativa."],
];

export default async function Home() {
  const destaque = produtor.lotes[0];
  const url = await urlDoLote(destaque);
  const qr = await QRCode.toString(url, { type: "svg", margin: 0, color: { dark: "#1f1209", light: "#0000" } });
  const doMes = produtor.lotes.filter((l) => edicao.lotes.includes(l.id));
  const avaliacoes = (await listarAvaliacoes()).filter((a) => a.comentario).slice(0, 3);

  return (
    <main>
      {/* Topo escuro: manchete, chamada e destaque da caixa */}
      <section className="relative overflow-hidden bg-escuro text-sobre-escuro">
        <nav className="relative z-10 mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo altura={48} sobreEscuro />
          <div className="flex items-center gap-6 text-sm">
            <a href="#cafes" className="hidden hover:text-marca-no-escuro sm:inline">Cafés</a>
            <a href="#planos" className="hidden hover:text-marca-no-escuro sm:inline">Planos</a>
            <a href="#cooperativas" className="hidden hover:text-marca-no-escuro md:inline">Cooperativas</a>
            <Link href="/assinar" className="apertar rounded-full bg-marca-no-escuro px-5 py-2 font-semibold text-escuro hover:bg-sobre-escuro">
              Assinar
            </Link>
          </div>
        </nav>

        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-8 sm:px-6 md:grid-cols-[1.15fr_1fr] md:pb-24 md:pt-12">
          <div className="relative z-10">
            <h1 className="text-5xl font-extrabold leading-[0.98] tracking-[-0.035em] sm:text-6xl lg:text-7xl">
              Seu café, com nome e sobrenome.
            </h1>
            <p className="mt-6 max-w-[38ch] text-lg leading-relaxed text-sobre-escuro/80">
              Todo mês, cafés especiais do Norte Pioneiro na sua porta. Cada pacote traz um QR com a história de quem plantou.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/assinar" className="apertar rounded-full bg-marca-no-escuro px-7 py-3.5 font-semibold text-escuro hover:bg-sobre-escuro">
                Assinar a partir de {reais(planos[0].preco)}
              </Link>
              <a href="#cafes" className="apertar rounded-full border border-sobre-escuro/40 px-7 py-3.5 font-semibold hover:border-sobre-escuro">
                Ver a caixa do mês
              </a>
            </div>

            <Link
              href={url}
              className="apertar group mt-14 flex max-w-md items-center gap-5 rounded-2xl border border-sobre-escuro/15 bg-sobre-escuro/5 p-4 hover:bg-sobre-escuro/10"
            >
              <div className="size-20 shrink-0 rounded-xl bg-sobre-escuro p-2" role="img" aria-label="QR do lote em destaque" dangerouslySetInnerHTML={{ __html: qr }} />
              <div>
                <span className="inline-block rounded-full border border-sobre-escuro/30 px-2.5 py-0.5 text-xs">Na caixa de {edicao.nome.split(" ")[0].toLowerCase()}</span>
                <p className="mt-2 font-bold">
                  {destaque.variedade}, {destaque.processo.toLowerCase()}
                  {destaque.pontuacaoSCA && <span className="font-normal text-sobre-escuro/70">, {sca(destaque.pontuacaoSCA)} pts</span>}
                </p>
                <p className="text-sm text-sobre-escuro/70 group-hover:text-sobre-escuro">Escaneie ou toque para abrir a história</p>
              </div>
            </Link>
          </div>

          <div className="relative min-h-[320px] md:min-h-0">
            <Image
              src={foto("1610632380989-680fe40816c6", 900)}
              alt="Xícara de café com grãos caindo sobre fundo escuro"
              fill
              priority
              sizes="(min-width: 768px) 45vw, 100vw"
              className="rounded-3xl object-cover"
            />
            <div aria-hidden className="absolute inset-0 rounded-3xl bg-gradient-to-t from-escuro/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* Cafés da caixa, com abas */}
      <section id="cafes" className="bg-caixa">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <h2 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">Os cafés desta caixa</h2>
          <p className="mb-10 mt-4 max-w-[52ch] text-tinta-2">
            {edicao.nome}: dois lotes do {produtor.fazenda}, em {produtor.cidade} ({produtor.uf}). Mesma família, processos diferentes.
          </p>
          <CafesComAbas
            cafes={doMes.map((l) => ({
              id: l.id,
              marcacao: l.marcacao,
              variedade: l.variedade,
              processo: l.processo,
              altitude: l.altitude,
              notas: l.notasSensoriais,
              pontos: l.pontuacaoSCA ? sca(l.pontuacaoSCA) : undefined,
            }))}
          />
        </div>
      </section>

      {/* Da lavoura à porta: texto + duas fotos */}
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div>
          <h2 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">Da lavoura à sua porta, e de volta.</h2>
          <ol className="mt-10 space-y-6">
            {caminho.map(([t, d], i) => (
              <li key={t} className="grid grid-cols-[auto_1fr] gap-4">
                <span
                  aria-hidden
                  className={`mt-1.5 size-3.5 rounded-full ${i === caminho.length - 1 ? "bg-marca" : "border-2 border-tinta"}`}
                />
                <div>
                  <h3 className="font-bold">{t}</h3>
                  <p className="mt-1 leading-relaxed text-tinta-2">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
            <Image src={foto("1586095516671-d085ff58cdd4", 600)} alt="Cerejas de café maduras no pé" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
          </div>
          <div className="relative mt-12 aspect-[3/4] overflow-hidden rounded-3xl">
            <Image src={foto("1497515114629-f71d768fd07c", 600)} alt="Xícara de café sobre grãos torrados" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
          </div>
        </div>
      </section>

      {/* Diferencial: ficha de prova */}
      <section className="border-t border-linha">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 md:grid-cols-[1.1fr_1fr] md:items-center">
          <div>
            <h2 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] sm:text-5xl">Você prova. O produtor fica sabendo.</h2>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-tinta-2">
              Nota para doçura, acidez, corpo e finalização em dez segundos. A média dos assinantes vira o retrato do lote e vai para a família produtora.
            </p>
          </div>
          <div className="rounded-3xl bg-caixa p-6 sm:p-8">
            <p className="mb-6 flex items-baseline justify-between font-mono text-xs text-tinta-2">
              <span>Lote {destaque.marcacao}</span>
              <span>dados de exemplo</span>
            </p>
            <FichaProva consumidor={{ docura: 4.4, acidez: 2.6, corpo: 4.1, finalizacao: 3.5 }} ficha={destaque.perfilFicha} />
          </div>
        </div>
      </section>

      {/* Planos em faixa escura, como a vitrine de produtos da referência */}
      <section id="planos" className="bg-escuro text-sobre-escuro">
        <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:px-6">
          <h2 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">Escolha sua caixa</h2>
          <p className="mx-auto mt-4 max-w-[46ch] text-sobre-escuro/75">Frete incluso. Pause ou cancele quando quiser. A primeira caixa sai em novembro.</p>
          <div className="mt-12 grid gap-5 text-left md:grid-cols-3">
            {planos.map((p) => {
              const destaquePlano = "destaque" in p;
              return (
                <div
                  key={p.id}
                  className={`flex flex-col rounded-3xl p-7 ${destaquePlano ? "bg-marca-no-escuro text-escuro" : "bg-sobre-escuro/8 ring-1 ring-sobre-escuro/15"}`}
                >
                  <h3 className="font-display text-4xl">{p.nome}</h3>
                  <p className={`mt-1 text-sm ${destaquePlano ? "text-escuro/75" : "text-sobre-escuro/70"}`}>
                    {p.pacotes} {p.pacotes === 1 ? "pacote" : "pacotes"} de 250 g por mês
                  </p>
                  <p className="mt-6 text-4xl font-extrabold tracking-tight">
                    {reais(p.preco)}
                    <span className="text-base font-medium opacity-70">/mês</span>
                  </p>
                  <p className={`mt-4 flex-1 text-sm leading-relaxed ${destaquePlano ? "text-escuro/80" : "text-sobre-escuro/75"}`}>{p.descricao}</p>
                  <Link
                    href={`/assinar?plano=${p.id}`}
                    className={`apertar mt-7 rounded-full py-3 text-center font-semibold ${
                      destaquePlano ? "bg-escuro text-sobre-escuro hover:bg-tinta" : "bg-marca-no-escuro text-escuro hover:bg-sobre-escuro"
                    }`}
                  >
                    Assinar {p.nome}
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Depoimentos: só avaliações reais, nunca inventadas */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <h2 className="text-4xl font-extrabold tracking-[-0.03em] sm:text-5xl">Quem já provou</h2>
        {avaliacoes.length === 0 ? (
          <p className="mt-5 max-w-[50ch] text-lg text-tinta-2">
            As primeiras avaliações chegam com a caixa de novembro. Cada uma vem de alguém que escaneou um pacote de verdade.
          </p>
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {avaliacoes.map((a) => (
              <figure key={a.id} className="rounded-3xl bg-caixa p-6">
                <Nota valor={a.nota} />
                <blockquote className="mt-4 line-clamp-3 leading-relaxed">“{a.comentario}”</blockquote>
                <figcaption className="mt-4 text-sm text-tinta-2">
                  {[a.nome, a.cidade].filter(Boolean).join(", ") || "Assinante"}, lote {produtor.lotes.find((l) => l.id === a.loteId)?.marcacao}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </section>

      {/* Cooperativas */}
      <section id="cooperativas" className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid gap-8 rounded-3xl bg-caixa p-8 sm:p-12 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div>
            <h2 className="text-3xl font-extrabold tracking-[-0.03em]">É de uma cooperativa ou associação?</h2>
            <p className="mt-4 max-w-[50ch] leading-relaxed text-tinta-2">
              Compramos lotes especiais do Norte Pioneiro, região com Denominação de Origem desde 2025. Vocês não pagam nada: vendem o café e recebem a opinião de cada assinante.
            </p>
          </div>
          <ul className="space-y-3 text-sm">
            {["Comprador fixo para lotes especiais", "Ficha de prova dos assinantes, lote por lote", "Nome da família no pacote, não commodity"].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span aria-hidden className="mt-1.5 size-2.5 shrink-0 rounded-full bg-marca" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="bg-escuro text-sobre-escuro">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo altura={56} sobreEscuro />
            <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-sobre-escuro/70">
              Clube de assinatura de cafés especiais do Norte Pioneiro do Paraná, com a história de quem plantou em cada pacote.
            </p>
          </div>
          {[
            ["Assinatura", [["Planos", "#planos"], ["Assinar", "/assinar"]]],
            ["Origem", [["Caixa do mês", "#cafes"], ["Cooperativas", "#cooperativas"]]],
            ["Equipe", [["Curadoria", "/painel"], ["Modo apresentação", "/apresentar"]]],
          ].map(([titulo, links]) => (
            <div key={titulo as string}>
              <p className="text-sm font-bold">{titulo as string}</p>
              <ul className="mt-3 space-y-2 text-sm text-sobre-escuro/70">
                {(links as string[][]).map(([t, h]) => (
                  <li key={t}>
                    <Link href={h} className="hover:text-sobre-escuro">
                      {t}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-6xl border-t border-sobre-escuro/15 px-4 py-6 text-xs text-sobre-escuro/60 sm:px-6">
          Genius Agro Hackathon 2026, desafio Café com Valor. Fotos de clima: Unsplash.
        </div>
      </footer>
    </main>
  );
}
