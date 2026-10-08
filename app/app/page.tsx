import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { avaliacoesDemo, edicao, planos, produtor, reais, sca } from "@/lib/data";
import { urlDoLote } from "@/lib/origem";
import { listarAvaliacoes } from "@/lib/store";
import { Logo } from "@/components/Logo";
import { Nota } from "@/components/Nota";
import { DemoProva } from "@/components/DemoProva";
import { CafesPrateleira } from "@/components/CafesPrateleira";

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

/** Legenda de um item da caixa: dado em mono, frase curta. */
function Legenda({ dado, children, className = "" }: { dado: string; children: React.ReactNode; className?: string }) {
  return (
    <figcaption className={`mt-4 max-w-[30ch] border-l-2 border-marca pl-3 text-sm leading-relaxed text-tinta-2 md:mt-0 ${className}`}>
      <span className="block font-mono text-xs uppercase tracking-[0.12em] text-marca">{dado}</span>
      {children}
    </figcaption>
  );
}

// Municípios do Norte Pioneiro no muro da seção de origem (conferir com a equipe).
const cidadesNortePioneiro = ["Pinhalão", "Carlópolis", "Tomazina", "Jacarezinho", "Ribeirão Claro", "Santo Antônio da Platina", "Joaquim Távora", "Siqueira Campos", "Ibaiti", "Japira", "Wenceslau Braz"];

const sombra ="drop-shadow-[0_18px_16px_rgb(0_0_0/0.4)]";
/** Etapas do ciclo; `pos` coloca cada objeto num ponto do círculo no desktop. */
const etapas = [
  {
    pos: "left-[50%] top-[12%]",
    dado: "Norte Pioneiro, PR",
    titulo: "Escolhemos na cooperativa",
    texto: "Provamos lotes das associações e compramos os melhores.",
    objeto: (
      <div className="relative size-24 overflow-hidden rounded-full ring-4 ring-caixa lg:size-28">
        <Image src={foto("1586095516671-d085ff58cdd4", 300)} alt="Cerejas de café maduras no pé" fill sizes="112px" className="object-cover" />
      </div>
    ),
  },
  {
    pos: "left-[88%] top-[50%]",
    dado: "Lote 26-AM-07",
    titulo: "Embalamos com a história",
    texto: "Rótulo com sítio, altitude e notas, e um QR code do lote.",
    objeto: <Image src="/produto/pacote.webp" alt="Pacote GranumBox" width={1122} height={1402} sizes="120px" className={`h-auto w-full lg:h-36 lg:w-auto ${sombra}`} />,
  },
  {
    pos: "left-[50%] top-[88%]",
    dado: "Frete incluso",
    titulo: "Chega na sua porta",
    texto: "Uma caixa por mês. Pause ou cancele quando quiser.",
    objeto: <Image src="/produto/caixa.webp" alt="Caixa GranumBox" width={1412} height={1114} sizes="200px" className={`h-auto w-full lg:w-44 ${sombra}`} />,
  },
  {
    pos: "left-[12%] top-[50%]",
    dado: "QR code do lote",
    titulo: "Sua nota volta ao sítio",
    texto: "Você escaneia, prova e avalia. A opinião chega ao produtor.",
    objeto: <Image src="/produto/cartao.webp" alt="Cartão do lote com QR code" width={1024} height={1536} sizes="100px" className={`h-auto w-full -rotate-3 lg:h-32 lg:w-auto ${sombra}`} />,
  },
];

export default async function Home() {
  const destaque = produtor.lotes[0];
  const url = await urlDoLote(destaque);
  const qr = await QRCode.toString(url, { type: "svg", margin: 0, color: { dark: "#3a1a07", light: "#0000" } });
  const doMes = produtor.lotes.filter((l) => edicao.lotes.includes(l.id));
  // Uma avaliação de exemplo (fictícia, para a demo) entra depois das reais.
  const exemplo = { ...avaliacoesDemo[0], id: "demo-0" };
  const avaliacoes = [...(await listarAvaliacoes()).filter((a) => a.comentario), exemplo].slice(0, 4);

  return (
    <main className="overflow-x-clip">
      {/* ===== Topo escuro com sobreposições ===== */}
      <section className="relative z-10 bg-escuro text-sobre-escuro">
        <nav className="mx-auto flex h-24 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Logo altura={52} sobreEscuro />
          <div className="hidden items-center gap-10 text-sm md:flex">
            <a href="#cafes" className="hover:text-marca-no-escuro">Cafés</a>
            <a href="#planos" className="hover:text-marca-no-escuro">Planos</a>
            <a href="#caixa" className="hover:text-marca-no-escuro">A caixa</a>
            <a href="#caminho" className="hover:text-marca-no-escuro">Como funciona</a>
            <a href="#origem" className="hover:text-marca-no-escuro">Origem</a>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/assinar" className={`${botao} bg-marca-no-escuro px-5 py-2.5 text-escuro hover:bg-sobre-escuro`}>
              Assinar
            </Link>
          </div>
        </nav>

        <div className="relative mx-auto max-w-6xl px-4 pb-16 sm:px-6 md:pb-52">
          <div className="relative z-20 md:w-[60%] md:pt-8">
            <h1 className="text-[3.2rem] font-extrabold leading-[0.95] tracking-[-0.04em] sm:text-7xl lg:text-[5.2rem] xl:text-[5.8rem]">
              Direto das mãos de quem planta.
            </h1>
            <p className="mt-8 max-w-[46ch] text-lg leading-relaxed text-sobre-escuro/80">
              Todo mês, cafés especiais de famílias do Norte Pioneiro do Paraná na sua porta. Cada pacote traz um QR code com a história de quem plantou.
            </p>
          </div>

          {/* Destaque da caixa com a etiqueta do lote logo abaixo */}
          <div className="relative z-20 mt-12 max-w-xs md:absolute md:-bottom-36 md:left-[18.5rem] md:mt-0 lg:left-[calc(44%+18rem)] lg:max-w-[19rem]">
            <span className="inline-block rounded-full border border-sobre-escuro/40 px-3 py-1 text-xs">Na caixa de outubro</span>
            <p className="mt-4 text-2xl font-bold">
              {destaque.variedade}, {destaque.processo.toLowerCase()}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-sobre-escuro/75">
              {destaque.notasSensoriais.join(", ")}. {destaque.pontuacaoSCA && `${sca(destaque.pontuacaoSCA)} pontos SCA, `}
              {destaque.altitude} de altitude.
            </p>
            {/* Etiqueta do lote logo abaixo do destaque, atravessando a divisa */}
            <div className="relative z-30 mt-8 w-56">
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
                  <div className="size-16 shrink-0" role="img" aria-label="QR code do lote" dangerouslySetInnerHTML={{ __html: qr }} />
                </div>
                <p className="mt-3 text-[10px] text-[#6e4a33]">
                  Selecionado por <span className="font-display text-xs text-[#773811]">granum</span>
                  <span className="font-extrabold text-[#773811]">box</span>
                </p>
              </Link>
            </div>
          </div>


          {/* Mãos com grãos à direita; o filete de grãos atravessa a divisa */}
          <div className="pointer-events-none relative z-20 mx-auto mt-8 w-full max-w-sm md:absolute md:top-2 md:right-0 md:mb-0 md:mt-0 md:w-[45%] md:max-w-none lg:-right-4 xl:-right-12">
            <Image
              src="/recortes/maos.png"
              alt="Mãos segurando grãos de café torrado"
              width={824}
              height={541}
              priority
              sizes="(min-width: 768px) 38vw, 90vw"
              className="h-auto w-full"
            />
          </div>
        </div>
      </section>

      {/* ===== Cafés da caixa ===== */}
      <section id="cafes" className="relative bg-caixa">
        <GraosFundo className="-right-20 top-24 w-[30rem]" />
        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-48 sm:px-6 md:pt-60">
          <CafesPrateleira
            titulo={
              <h2 className="text-5xl font-extrabold leading-[1] tracking-[-0.035em] sm:text-6xl">Cafés de cada mês</h2>
            }
            cafes={doMes.map((l) => ({
              id: l.id,
              marcacao: l.marcacao,
              variedade: l.variedade,
              processo: l.processo,
              notas: l.notasSensoriais,
              pontos: l.pontuacaoSCA ? sca(l.pontuacaoSCA) : undefined,
              fazenda: produtor.fazenda,
              cidade: produtor.cidade,
              altitude: l.altitude,
            }))}
          />
        </div>
      </section>

      {/* ===== O que chega: caixa, pacote e cartão com legendas ===== */}
      <section id="caixa" className="relative bg-caixa">
        <div className="mx-auto max-w-6xl px-4 pb-28 sm:px-6">
          <div className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <h2 className="text-5xl font-extrabold leading-[1] tracking-[-0.035em] sm:text-6xl">
              Abra a caixa.
              <br />
              Conheça o sítio.
            </h2>
            <p className="max-w-[46ch] leading-relaxed text-tinta-2">
              Todo mês chega uma caixa GranumBox com cafés de um só lugar: o Norte Pioneiro do Paraná. Cada pacote vem de uma família diferente, e o cartão conta quem plantou.
            </p>
          </div>

          <div className="relative mt-14 md:mt-6 md:h-[40rem]">
            {/* Caixa ao fundo */}
            <figure className="relative md:absolute md:left-0 md:top-10 md:w-[58%]">
              <Image src="/produto/caixa.webp" alt="Caixa preta GranumBox com o logo em cobre e a frase clube de cafés especiais" width={1412} height={1114} sizes="(min-width: 768px) 58vw, 100vw" className="h-auto w-full drop-shadow-[0_40px_40px_rgb(31_18_9/0.35)]" />
              <Legenda className="md:absolute md:-top-6 md:left-[8%]" dado="A caixa">
                Chega pelo correio, frete incluso. Vira porta-pacote na bancada.
              </Legenda>
            </figure>

            {/* Pacote na frente, encostado na caixa */}
            <figure className="relative mt-12 md:absolute md:bottom-0 md:left-[44%] md:mt-0 md:w-[27%]">
              <Image src="/produto/pacote.webp" alt="Pacote kraft GranumBox, Reserva da Serra, Carlópolis, Norte Pioneiro do Paraná, 250 g" width={1122} height={1402} sizes="(min-width: 768px) 27vw, 70vw" className="mx-auto h-auto w-2/3 drop-shadow-[0_30px_30px_rgb(31_18_9/0.4)] md:w-full" />
              <Legenda className="md:absolute md:bottom-4 md:left-[-78%] md:w-[13rem]" dado="250 g · 100% arábica">
                Um pacote por produtor, com cidade, altitude, torra e notas no rótulo.
              </Legenda>
            </figure>

            {/* Cartão do lote à direita */}
            <figure className="relative mt-12 md:absolute md:right-0 md:top-0 md:mt-0 md:w-[24%]">
              <Image src="/produto/cartao.webp" alt="Cartão do lote com a história da família produtora e um QR code para avaliar o café" width={1024} height={1536} sizes="(min-width: 768px) 24vw, 70vw" className="mx-auto h-auto w-2/3 rotate-2 drop-shadow-[0_24px_24px_rgb(31_18_9/0.3)] md:w-full" />
              <Legenda className="md:absolute md:-bottom-24 md:right-0 md:w-[15rem]" dado="QR code do lote">
                O cartão conta a história do sítio. O QR code abre a ficha para você avaliar.
              </Legenda>
            </figure>
          </div>
        </div>
      </section>

      {/* ===== Da lavoura à porta e de volta: ciclo com os objetos de cada etapa ===== */}
      <section id="caminho" className="relative bg-caixa">
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-28 sm:px-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-marca">Como funciona</p>
            <h2 className="mt-3 text-5xl font-extrabold leading-[1] tracking-[-0.035em]">
              Da lavoura
              <br />à sua porta.
              <br />E de volta.
            </h2>
            <p className="mt-6 max-w-[40ch] leading-relaxed text-tinta-2">
              O caminho não termina na sua xícara: sua avaliação volta para a família do Norte Pioneiro que plantou o café.
            </p>
            <a href="#planos" className={`${botao} mt-8 bg-marca text-sobre-marca hover:bg-marca-forte`}>
              Ver planos
            </a>
          </div>

          <div className="relative lg:aspect-square">
            {/* Trilha pontilhada com setas no sentido horário (só no desktop) */}
            <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 hidden size-full lg:block">
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--color-marca)" strokeWidth="0.35" strokeDasharray="0.35 1.8" strokeLinecap="round" />
              {[45, 135, 225, 315].map((g) => (
                <path key={g} d="M -1.4 -1.2 L 1.4 0 L -1.4 1.2 Z" fill="var(--color-marca)" transform={`translate(${50 + 38 * Math.cos((g * Math.PI) / 180)} ${50 + 38 * Math.sin((g * Math.PI) / 180)}) rotate(${g + 90})`} />
              ))}
            </svg>
            {/* Objetos sobre o círculo */}
            {etapas.map((e, i) => (
              <div key={e.titulo} aria-hidden className={`absolute hidden -translate-x-1/2 -translate-y-1/2 lg:block ${e.pos}`}>
                {e.objeto}
                <span className="absolute -right-3 -top-3 grid size-7 place-items-center rounded-full bg-marca font-mono text-xs text-sobre-marca">{i + 1}</span>
              </div>
            ))}
            {/* Texto das etapas no miolo do círculo; no celular vira lista com os objetos */}
            <ol className="relative grid gap-8 sm:grid-cols-2 lg:absolute lg:inset-[26%] lg:grid-cols-1 lg:content-center lg:gap-4">
              {etapas.map((e, i) => (
                <li key={e.titulo} className="flex gap-4 lg:gap-3">
                  <div className="w-24 shrink-0 lg:hidden">{e.objeto}</div>
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-marca">
                      <span className="lg:inline">{i + 1} · </span>
                      {e.dado}
                    </p>
                    <h3 className="font-bold leading-snug">{e.titulo}</h3>
                    <p className="text-sm leading-snug text-tinta-2">{e.texto}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ===== Planos: faixa escura com cartões claros ===== */}
      <section id="planos" className="relative bg-faixa text-creme-fixo">
        <div className="mx-auto max-w-6xl px-4 py-24 text-center sm:px-6">
          <h2 className="text-5xl font-extrabold tracking-[-0.035em]">Escolha sua caixa</h2>
          <p className="mx-auto mt-4 max-w-[52ch] text-sm leading-relaxed text-creme-fixo/75">
            Todos os cafés vêm do Norte Pioneiro do Paraná. Frete incluso, pause ou cancele quando quiser. A primeira caixa sai em novembro.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {planos.map((p) => (
              <div key={p.id} className={`flex flex-col items-center bg-creme-fixo px-6 pb-8 pt-6 text-[#3a1a07] ${"destaque" in p ? "ring-4 ring-marca-no-escuro" : ""}`}>
                <div className="relative flex h-44 w-full items-end justify-center" aria-hidden>
                  {Array.from({ length: p.pacotes }).map((_, i) => (
                    <Image
                      key={i}
                      src="/produto/pacote.webp"
                      alt=""
                      width={1122}
                      height={1402}
                      sizes="120px"
                      className="-mx-3 h-auto w-24 drop-shadow-[0_12px_12px_rgb(31_18_9/0.3)] first:ml-0 last:mr-0"
                      style={{ transform: `rotate(${(i - (p.pacotes - 1) / 2) * 6}deg)`, zIndex: i }}
                    />
                  ))}
                </div>
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.12em] text-[#6e4a33]">
                  {p.pacotes} {p.pacotes === 1 ? "pacote" : "pacotes"} de 250 g
                </p>
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

      {/* ===== Avaliação: demo no celular que vira ficha em papel ===== */}
      <section className="relative bg-caixa">
        <div className="relative mx-auto grid max-w-6xl gap-14 px-4 py-24 sm:px-6 md:grid-cols-[1fr_1fr] md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-marca">Sua avaliação</p>
            <h2 className="mt-3 text-5xl font-extrabold leading-[1] tracking-[-0.035em]">
              Você prova.
              <br />O produtor
              <br />
              fica sabendo.
            </h2>
            <p className="mt-6 max-w-[44ch] leading-relaxed text-tinta-2">
              O QR code do cartão abre esta ficha. Dez segundos para dizer se o café é doce, se lembra fruta, se é leve ou encorpado e se o sabor continua na boca, e um recado se quiser. A cooperativa entrega para a família.
            </p>
            <p className="mt-4 font-mono text-xs text-marca">Experimente: arraste os controles e envie.</p>
          </div>
          <DemoProva marcacao={destaque.marcacao} fazenda={produtor.fazenda} cidade={produtor.cidade} />
        </div>
      </section>

      {/* ===== Quem já provou: mural com lugares reservados até chegarem avaliações reais ===== */}
      <section className="relative bg-caixa">
        <div className="mx-auto max-w-6xl px-4 pb-24 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-marca">Quem já provou</p>
          <h2 className="mt-3 max-w-[18ch] text-5xl font-extrabold leading-[1] tracking-[-0.035em]">
            {avaliacoes.length ? "O que os assinantes disseram." : "Estes lugares são das primeiras avaliações."}
          </h2>
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => {
              const a = avaliacoes[i];
              const giro = i % 2 ? "rotate-[1.2deg]" : "-rotate-[1.5deg]";
              if (a)
                return (
                  <li key={a.id} className={`flex min-h-44 flex-col justify-between bg-creme-fixo p-5 text-[#3a1a07] shadow-[0_20px_40px_-20px_rgb(0_0_0/0.6)] ${giro}`}>
                    <Nota valor={a.nota} />
                    <blockquote className="mt-3 line-clamp-4 text-sm leading-relaxed">“{a.comentario}”</blockquote>
                    <p className="mt-4 font-mono text-[11px] text-[#6e4a33]">{[a.nome, a.cidade].filter(Boolean).join(", ") || "Assinante"}</p>
                  </li>
                );
              const primeiro = i === avaliacoes.length;
              return (
                <li
                  key={i}
                  className={`flex min-h-44 flex-col justify-between p-5 font-mono text-[11px] ${giro} ${
                    primeiro ? "bg-creme-fixo text-[#773811]" : "border-2 border-dashed border-tinta/25 text-tinta-2"
                  }`}
                >
                  <span className="uppercase tracking-[0.12em]">{primeiro ? "Nov · 2026" : `Lote ${doMes[i % doMes.length]?.marcacao ?? ""}`}</span>
                  {primeiro ? (
                    <span className="font-display text-2xl leading-tight">{i === 0 ? "a sua pode ser a primeira" : "a próxima pode ser a sua"}</span>
                  ) : (
                    <span>{i === 3 ? "Só quem escaneou um pacote avalia. Nenhuma nota é apagada." : "Aguardando a caixa de novembro."}</span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ===== Origem: muro de cidades do Norte Pioneiro com a ficha de origem do lote ===== */}
      <section id="origem" className="relative overflow-hidden bg-caixa">
        <p aria-hidden className="pointer-events-none absolute inset-x-0 top-6 select-none px-4 text-5xl font-extrabold leading-[1.1] tracking-[-0.03em] text-tinta/[0.05] sm:text-7xl">
          {cidadesNortePioneiro.map((c) => (
            <span key={c} className={c === produtor.cidade ? "text-marca/25" : ""}>
              {c} ·{" "}
            </span>
          ))}
        </p>
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-28 sm:px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-marca">De onde vem</p>
            <h2 className="mt-3 text-5xl font-extrabold leading-[1] tracking-[-0.035em]">Um só lugar: o Norte Pioneiro.</h2>
            <p className="mt-6 max-w-[42ch] leading-relaxed text-tinta-2">
              Todo café da GranumBox vem de famílias do Norte Pioneiro do Paraná, região com Denominação de Origem desde 2025. Você sabe a cidade, o sítio e a altitude de cada pacote.
            </p>
            <Link href="/produtores" className={`${botao} mt-8 bg-marca text-sobre-marca hover:bg-marca-forte`}>
              Conheça os produtores
            </Link>
          </div>
          <div className="bg-fundo p-6 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.7)] sm:p-8">
            <p className="flex justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-marca">
              <span>Ficha de origem</span>
              <span>Lote {destaque.marcacao}</span>
            </p>
            <dl className="mt-4 text-sm [&>div]:flex [&>div]:justify-between [&>div]:gap-6 [&>div]:border-t [&>div]:border-tinta/15 [&>div]:py-3 [&_dt]:text-tinta-2 [&_dd]:text-right [&_dd]:font-medium">
              <div><dt>Sítio</dt><dd>{produtor.fazenda}</dd></div>
              <div><dt>Cidade</dt><dd>{produtor.cidade}, {produtor.uf}</dd></div>
              <div><dt>Talhão</dt><dd>{destaque.talhao}</dd></div>
              <div><dt>Altitude</dt><dd className="font-mono">{destaque.altitude}</dd></div>
              <div><dt>Variedade e processo</dt><dd>{destaque.variedade}, {destaque.processo.toLowerCase()}</dd></div>
              {destaque.pontuacaoSCA && <div><dt>Pontuação SCA</dt><dd className="font-mono">{sca(destaque.pontuacaoSCA)}</dd></div>}
            </dl>
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
            ["Origem", [["Caixa do mês", "#cafes"], ["Norte Pioneiro", "#origem"]]],
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
