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

// Fotos e recortes de clima (licença Unsplash). Não representam um lote ou produtor específico.
const foto = (id: string, w: number) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;

const botao = "apertar inline-flex items-center justify-center gap-2 rounded-[4px] px-7 py-3.5 text-sm font-semibold";

/** Grãos desfocados ao fundo das seções claras, como a marca-d'água da referência. */
function GraosFundo({ className }: { className: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute opacity-[0.13] blur-[6px] ${className}`}>
      <Image src="/recortes/graos-espalhados.png" alt="" width={433} height={700} className="h-auto w-full" />
    </div>
  );
}

export default async function Home() {
  const destaque = produtor.lotes[0];
  const url = await urlDoLote(destaque);
  const qr = await QRCode.toString(url, { type: "svg", margin: 0, color: { dark: "#3a1a07", light: "#0000" } });
  const doMes = produtor.lotes.filter((l) => edicao.lotes.includes(l.id));
  const fotosLote = [
    ["1606486544554-164d98da4889", "Grãos de café torrados"],
    ["1511920170033-f8396924c348", "Porta-filtros com café moído, grãos e latte"],
  ];
  const avaliacoes = (await listarAvaliacoes()).filter((a) => a.comentario).slice(0, 3);

  return (
    <main className="overflow-x-clip">
      {/* ===== Topo escuro com sobreposições ===== */}
      <section className="relative z-10 bg-escuro text-sobre-escuro">
        <nav className="mx-auto flex h-24 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo altura={52} sobreEscuro />
          <div className="hidden items-center gap-10 text-sm md:flex">
            <a href="#cafes" className="hover:text-marca-no-escuro">Cafés</a>
            <a href="#planos" className="hover:text-marca-no-escuro">Planos</a>
            <a href="#caminho" className="hover:text-marca-no-escuro">Como funciona</a>
            <a href="#cooperativas" className="hover:text-marca-no-escuro">Cooperativas</a>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/painel" className="hidden hover:text-marca-no-escuro sm:inline">Curadoria</Link>
            <Link href="/assinar" className={`${botao} bg-marca-no-escuro px-5 py-2.5 text-escuro hover:bg-sobre-escuro`}>
              Assinar
            </Link>
          </div>
        </nav>

        <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-60">
          <div className="grid gap-8 md:grid-cols-[13rem_1fr] lg:grid-cols-[15rem_1fr]">
            <div className="order-2 flex items-end md:order-1 md:pt-56">
              <Link href="/assinar" className={`${botao} bg-marca-no-escuro text-escuro hover:bg-sobre-escuro`}>
                Assinar agora
              </Link>
            </div>
            <div className="order-1 md:order-2 md:pt-6">
              <h1 className="text-[3.4rem] font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-[5.4rem] xl:text-[6.2rem]">
                Café com nome <br className="hidden md:inline" />e sobrenome.
              </h1>
              <p className="mt-8 max-w-[44ch] leading-relaxed text-sobre-escuro/80">
                Todo mês, cafés especiais do Norte Pioneiro na sua porta. Cada pacote traz um QR com a história de quem plantou.
              </p>
            </div>
          </div>

          {/* Destaque da caixa: fica inteiro na área escura, à direita da etiqueta */}
          <div className="relative z-20 mt-12 max-w-xs md:absolute md:bottom-16 md:left-[calc(13rem+2rem+1.5rem)] md:mt-0 lg:left-[calc(15rem+2rem+1.5rem)]">
            <span className="inline-block rounded-full border border-sobre-escuro/40 px-3 py-1 text-xs">Na caixa de outubro</span>
            <p className="mt-4 text-2xl font-bold">
              {destaque.variedade}, {destaque.processo.toLowerCase()}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-sobre-escuro/75">
              {destaque.notasSensoriais.join(", ")}. {destaque.pontuacaoSCA && `${sca(destaque.pontuacaoSCA)} pontos SCA, `}
              {destaque.altitude} de altitude.
            </p>
          </div>

          {/* Monte de grãos atravessando a divisa, atrás da etiqueta */}
          <div aria-hidden className="pointer-events-none absolute -bottom-12 left-[11rem] z-10 hidden w-[30rem] md:block">
            <Image src="/recortes/graos-monte.png" alt="" width={1000} height={174} className="h-auto w-full drop-shadow-[0_12px_14px_rgb(0_0_0/0.35)]" />
          </div>

          {/* Etiqueta do lote atravessando a divisa, com o botão redondo por cima */}
          <div className="relative z-30 mt-10 w-56 md:absolute md:-bottom-32 md:left-6 md:mt-0">
            <Link
              href={url}
              className="block -rotate-3 rounded-md bg-creme-fixo p-4 text-[#3a1a07] shadow-[0_24px_50px_-12px_rgb(0_0_0/0.6)] transition-transform hover:-rotate-1"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[#6e4a33]">
                {produtor.cidade}, {produtor.uf}
              </p>
              <p className="font-display text-2xl leading-tight text-[#773811]">{produtor.fazenda}</p>
              <div className="mt-3 flex items-end justify-between gap-3 border-t border-dashed border-[#773811]/40 pt-3">
                <dl className="text-[11px] leading-5">
                  <dt className="sr-only">Lote</dt>
                  <dd className="font-mono font-medium">{destaque.marcacao}</dd>
                  <dd>{destaque.variedade}</dd>
                  <dd>{destaque.processo}</dd>
                </dl>
                <div className="size-16 shrink-0" role="img" aria-label="QR do lote" dangerouslySetInnerHTML={{ __html: qr }} />
              </div>
              <p className="mt-3 text-[10px] text-[#6e4a33]">
                Selecionado por <span className="font-display text-xs text-[#773811]">granum</span>
                <span className="font-extrabold text-[#773811]">box</span>
              </p>
            </Link>
          </div>

          {/* Xícara recortada que invade a seção seguinte */}
          <div className="pointer-events-none relative z-20 mx-auto -mb-40 mt-6 w-full max-w-md md:mb-0 md:absolute md:-bottom-32 md:-right-8 md:mt-0 md:w-[48%] md:max-w-none lg:-right-16 xl:-right-36 2xl:-right-48">
            <Image
              src="/recortes/xicara-respingo.png"
              alt="Xícara de café com respingo"
              width={1100}
              height={766}
              priority
              sizes="(min-width: 768px) 52vw, 90vw"
              className="h-auto w-full drop-shadow-[0_30px_40px_rgb(0_0_0/0.45)]"
            />
          </div>
        </div>
      </section>

      {/* ===== Cafés da caixa ===== */}
      <section id="cafes" className="relative bg-caixa">
        <GraosFundo className="-right-20 top-24 w-[30rem]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-48 sm:px-6 md:pt-60">
          <CafesComAbas
            titulo={
              <h2 className="text-5xl font-extrabold leading-[1] tracking-[-0.035em] sm:text-6xl">
                Os cafés
                <br />
                desta caixa
              </h2>
            }
            cafes={doMes.map((l, i) => ({
              id: l.id,
              marcacao: l.marcacao,
              variedade: l.variedade,
              processo: l.processo,
              notas: l.notasSensoriais,
              pontos: l.pontuacaoSCA ? sca(l.pontuacaoSCA) : undefined,
              foto: foto(fotosLote[i % fotosLote.length][0], 700),
              fotoAlt: fotosLote[i % fotosLote.length][1],
            }))}
          />
        </div>
      </section>

      {/* ===== Manhã diferente: foto, título e etiqueta ===== */}
      <section className="relative bg-caixa">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pb-24 sm:px-6 md:grid-cols-[1fr_1.1fr_0.9fr]">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image src={foto("1610632380989-680fe40816c6", 700)} alt="Xícara com grãos de café caindo" fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover" />
          </div>
          <div>
            <h2 className="text-5xl font-extrabold leading-[1] tracking-[-0.035em]">
              Uma manhã
              <br />
              diferente
              <br />
              por mês.
            </h2>
            <Link href="/assinar" className={`${botao} mt-8 bg-marca text-sobre-marca hover:bg-marca-forte`}>
              Assinar agora
            </Link>
          </div>
          <div className="relative">
            <Image src="/recortes/graos-espalhados.png" alt="" width={433} height={700} className="mx-auto h-auto w-3/4 drop-shadow-[0_18px_20px_rgb(58_26_7/0.3)]" aria-hidden />
            <p className="mt-4 max-w-[30ch] text-sm leading-relaxed text-tinta-2">
              Lotes diferentes a cada edição, sempre do Norte Pioneiro, sempre com a história de quem plantou.
            </p>
          </div>
        </div>
      </section>

      {/* ===== Da lavoura à porta: texto + duas fotos ===== */}
      <section id="caminho" className="relative bg-caixa">
        <GraosFundo className="-left-24 bottom-0 w-[26rem]" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-28 sm:px-6 lg:grid-cols-[1fr_1.15fr]">
          <div>
            <h2 className="text-5xl font-extrabold leading-[1] tracking-[-0.035em]">
              Da lavoura
              <br />à sua porta.
            </h2>
            <ol className="mt-8 max-w-[44ch] space-y-3 text-sm leading-relaxed text-tinta-2">
              <li><strong className="text-tinta">Escolhemos na cooperativa.</strong> Provamos lotes de associações do Norte Pioneiro e compramos os melhores.</li>
              <li><strong className="text-tinta">Embalamos com a história.</strong> Cada pacote sai com um QR do lote: quem plantou, o talhão, o processo.</li>
              <li><strong className="text-tinta">Chega na sua porta.</strong> Você escaneia, prova e avalia.</li>
              <li><strong className="text-tinta">Sua nota volta ao sítio.</strong> A opinião chega ao produtor pela cooperativa.</li>
            </ol>
            <a href="#planos" className={`${botao} mt-8 bg-marca text-sobre-marca hover:bg-marca-forte`}>
              Ver planos
            </a>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src={foto("1586095516671-d085ff58cdd4", 600)} alt="Cerejas de café maduras no pé" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image src={foto("1497515114629-f71d768fd07c", 600)} alt="Xícara de café sobre grãos torrados" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Planos: faixa escura com cartões claros ===== */}
      <section id="planos" className="relative bg-faixa text-creme-fixo">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
          <h2 className="text-5xl font-extrabold tracking-[-0.035em]">Escolha sua caixa</h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-sm leading-relaxed text-creme-fixo/75">
            Frete incluso, pause ou cancele quando quiser. A primeira caixa sai em novembro.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {planos.map((p) => (
              <div key={p.id} className={`flex flex-col items-center bg-creme-fixo px-6 pb-8 pt-6 text-[#3a1a07] ${"destaque" in p ? "ring-4 ring-marca-no-escuro" : ""}`}>
                <div className="relative h-40 w-full">
                  <Image src="/recortes/graos-monte.png" alt="" width={1000} height={174} className="absolute bottom-0 h-auto w-full" aria-hidden />
                  <p className="relative pt-4 font-display text-6xl text-[#773811]">
                    {p.pacotes}
                    <span className="ml-2 font-sans text-sm font-semibold not-italic text-[#6e4a33]">{p.pacotes === 1 ? "pacote" : "pacotes"}</span>
                  </p>
                </div>
                <h3 className="mt-5 text-xl font-bold">{p.nome}</h3>
                <p className="mt-1 text-sm text-[#6e4a33]">{p.descricao}</p>
                <p className="mt-4 text-3xl font-extrabold tracking-tight">
                  {reais(p.preco)}
                  <span className="text-sm font-medium text-[#6e4a33]">/mês</span>
                </p>
                <Link href={`/assinar?plano=${p.id}`} className={`${botao} mt-5 bg-[#773811] py-2.5 text-white hover:bg-[#5a290b]`}>
                  Assinar {p.nome}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Ficha de prova ===== */}
      <section className="relative bg-caixa">
        <GraosFundo className="-right-16 top-10 w-[24rem]" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-24 sm:px-6 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <h2 className="text-5xl font-extrabold leading-[1] tracking-[-0.035em]">
              Você prova.
              <br />O produtor
              <br />
              fica sabendo.
            </h2>
            <p className="mt-6 max-w-[44ch] leading-relaxed text-tinta-2">
              Nota para doçura, acidez, corpo e finalização em dez segundos. A média dos assinantes vira o retrato do lote e vai para a família produtora.
            </p>
          </div>
          <div className="bg-fundo p-6 shadow-[0_20px_50px_-30px_rgb(58_26_7/0.5)] sm:p-8">
            <p className="mb-6 flex items-baseline justify-between font-mono text-xs text-tinta-2">
              <span>Lote {destaque.marcacao}</span>
              <span>dados de exemplo</span>
            </p>
            <FichaProva consumidor={{ docura: 4.4, acidez: 2.6, corpo: 4.1, finalizacao: 3.5 }} ficha={destaque.perfilFicha} />
          </div>
        </div>
      </section>

      {/* ===== Depoimentos (só avaliações reais) ===== */}
      <section className="relative bg-caixa">
        <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <h2 className="text-5xl font-extrabold tracking-[-0.035em]">Quem já provou</h2>
          {avaliacoes.length === 0 ? (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              <div className="bg-fundo p-6 shadow-[0_20px_50px_-30px_rgb(58_26_7/0.5)] md:col-span-2">
                <p className="leading-relaxed text-tinta-2">
                  As primeiras avaliações chegam com a caixa de novembro. Cada uma vem de alguém que escaneou um pacote de verdade, e nenhuma é apagada.
                </p>
              </div>
            </div>
          ) : (
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {avaliacoes.map((a) => (
                <figure key={a.id} className="bg-fundo p-6 shadow-[0_20px_50px_-30px_rgb(58_26_7/0.5)]">
                  <Nota valor={a.nota} />
                  <blockquote className="mt-4 line-clamp-3 text-sm leading-relaxed text-tinta-2">“{a.comentario}”</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3 text-sm font-semibold">
                    <span aria-hidden className="grid size-8 place-items-center rounded-full bg-marca text-xs text-sobre-marca">
                      {(a.nome || "A").slice(0, 1).toUpperCase()}
                    </span>
                    {[a.nome, a.cidade].filter(Boolean).join(", ") || "Assinante"}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ===== Cooperativas ===== */}
      <section id="cooperativas" className="bg-caixa">
        <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <div className="grid gap-8 border-t border-tinta/15 pt-14 md:grid-cols-[1.2fr_1fr] md:items-center">
            <h2 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.035em]">É de uma cooperativa ou associação?</h2>
            <div>
              <p className="leading-relaxed text-tinta-2">
                Compramos lotes especiais do Norte Pioneiro, região com Denominação de Origem desde 2025. Vocês não pagam nada: vendem o café e recebem a opinião de cada assinante, lote por lote.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Rodapé escuro ===== */}
      <footer className="bg-escuro text-sobre-escuro">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo altura={56} sobreEscuro />
            <p className="mt-5 max-w-[34ch] text-xs leading-relaxed text-sobre-escuro/65">
              Clube de assinatura de cafés especiais do Norte Pioneiro do Paraná, com a história de quem plantou em cada pacote.
            </p>
          </div>
          {[
            ["Assinatura", [["Planos", "#planos"], ["Assinar", "/assinar"]]],
            ["Origem", [["Caixa do mês", "#cafes"], ["Cooperativas", "#cooperativas"]]],
            ["Equipe", [["Curadoria", "/painel"], ["Modo apresentação", "/apresentar"]]],
          ].map(([titulo, links]) => (
            <div key={titulo as string}>
              <p className="text-sm font-semibold">{titulo as string}</p>
              <ul className="mt-4 space-y-2.5 text-xs text-sobre-escuro/65">
                {(links as string[][]).map(([t, h]) => (
                  <li key={t}>
                    <Link href={h} className="hover:text-sobre-escuro">{t}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mx-auto flex max-w-6xl flex-wrap justify-between gap-3 border-t border-sobre-escuro/15 px-4 py-6 text-xs text-sobre-escuro/55 sm:px-6">
          <span>Genius Agro Hackathon 2026, desafio Café com Valor</span>
          <span>Fotos de clima: Unsplash</span>
        </div>
      </footer>
    </main>
  );
}
