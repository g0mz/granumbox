import Image from "next/image";
import Link from "next/link";
import { avaliacoesDemo, edicao, produtores } from "@/lib/data";
import { listarAvaliacoes } from "@/lib/store";
import { AbasProdutor } from "./AbasProdutor";
import { Logo } from "@/components/Logo";

export const dynamic = "force-dynamic";

export const metadata = { title: "Produtores · GranumBox" };

// Fotos ilustrativas (licença Unsplash). Não são das famílias parceiras; trocar por fotos reais.
const foto = (id: string, w: number) => `https://images.unsplash.com/photo-${id}?w=${w}&q=75&auto=format&fit=crop`;

const botao = "apertar inline-flex items-center justify-center gap-2 rounded-[4px] px-7 py-3.5 text-sm font-semibold";

/** Do pé à xícara: cada etapa é um cuidado que aparece no sabor. */
const etapas = [
  {
    mes: "Set — Nov",
    titulo: "A florada",
    texto: "Depois das primeiras chuvas o cafezal floresce em dois ou três dias. Daí saem os frutos verdes que vão amadurecer devagar no clima ameno do Norte Pioneiro. Fruto que amadurece devagar acumula mais açúcar.",
    foto: { id: "1764322666888-56a0fdd7e2fd", alt: "Frutos de café ainda verdes no galho" },
  },
  {
    mes: "Mai — Ago",
    titulo: "Colheita à mão, fruto por fruto",
    texto: "Em vez de derriçar o galho inteiro, a família passa várias vezes pelo mesmo pé e tira só o que está maduro. Dá mais trabalho e rende menos por dia. É a diferença entre um café comum e um café especial.",
    foto: { id: "1762277142767-6e614520de15", alt: "Mãos colhendo cerejas maduras de café no galho" },
  },
  {
    mes: "No mesmo dia",
    titulo: "Só o cereja vai adiante",
    texto: "Verde, passa e cereja não se misturam. O fruto vermelho, no ponto, segue para a secagem. Os outros viram café de consumo da casa ou vão para outro lote.",
    foto: { id: "1670758611084-e216510c5433", alt: "Mão aberta segurando cerejas de café vermelhas" },
  },
  {
    mes: "15 a 30 dias",
    titulo: "Secagem no terreiro",
    texto: "O café é espalhado em camada fina e revirado várias vezes por dia com o rodo, para secar por igual sem fermentar demais. À noite é amontoado e coberto. Cada lote fica separado por talhão e por dia de colheita.",
    foto: { id: "1761318543563-f5c211a99195", alt: "Homem revirando café no terreiro de secagem" },
  },
  {
    mes: "Descanso",
    titulo: "Café verde, provado e pontuado",
    texto: "Seco e descascado, o grão verde descansa antes de ser provado pela cooperativa. Só entra na GranumBox o lote que passa de 80 pontos na escala SCA, a régua dos cafés especiais.",
    foto: { id: "1703646619157-eb553d16d402", alt: "Grãos de café verde" },
  },
  {
    mes: "Semana do envio",
    titulo: "Torra pensada para cada lote",
    texto: "Torramos perto do envio, com a curva escolhida para mostrar as notas daquele lote, e não para esconder defeito. O pacote sai com a data de torra, a cidade, a altitude e o nome de quem plantou.",
    foto: { id: "1607681034540-2c46cc71896d", alt: "Café recém-torrado sendo mexido no resfriador" },
  },
];

const pessoas = [
  { id: "1547364357-6998ce7d4c02", alt: "Produtora colhendo café no cafezal carregado de frutos vermelhos", legenda: "Quem planta é quem colhe. Nas propriedades familiares, avós, filhos e netos dividem a safra." },
  { id: "1597816760638-406d7271105c", alt: "Trabalhadora com lenço e chapéu entre os pés de café", legenda: "Meses de cuidado com o pé: poda, adubação, controle do mato e da broca." },
  { id: "1642613630414-1d9938f4fe02", alt: "Mãos colhendo café para um balaio", legenda: "Cada balaio de cereja colhido à mão leva horas. É esse trabalho que você prova." },
];

export default async function Produtores() {
  const doBanco = (await listarAvaliacoes()).filter((a) => a.comentario);
  const todas = [...doBanco, ...avaliacoesDemo];

  return (
    <main className="min-h-screen bg-fundo text-tinta">
      {/* ===== Abertura com foto ===== */}
      <section className="relative isolate overflow-hidden bg-escuro text-sobre-escuro">
        <Image src={foto("1786277195534-b2a6f928de25", 1800)} alt="Vale com neblina e cafezais ao amanhecer" fill priority sizes="100vw" className="-z-10 object-cover opacity-55" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-escuro via-escuro/40 to-transparent" />
        <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
          <Link href="/" aria-label="Voltar ao início"><Logo altura={40} sobreEscuro /></Link>
          <Link href="/assinar" className="apertar rounded-[4px] bg-marca px-5 py-2.5 text-sm font-semibold text-sobre-marca hover:bg-marca-forte">Assinar</Link>
        </header>
        <div className="mx-auto max-w-6xl px-4 pb-24 pt-32 sm:px-6 md:pt-48">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-sobre-escuro/75">Norte Pioneiro do Paraná</p>
          <h1 className="mt-4 max-w-[16ch] text-5xl font-extrabold leading-[1] tracking-[-0.035em] sm:text-7xl">
            Antes da sua xícara, <span className="font-display font-black italic">um ano inteiro de cuidado.</span>
          </h1>
          <p className="mt-6 max-w-[52ch] text-lg leading-relaxed text-sobre-escuro/80">
            Cada pacote da GranumBox tem nome, sobrenome e endereço. Conheça as famílias que plantam o seu café e tudo o que acontece entre a florada e a sua casa.
          </p>
        </div>
      </section>

      {/* ===== Do pé à xícara ===== */}
      <section className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-marca">Do pé à xícara</p>
        <h2 className="mt-3 max-w-[20ch] text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-5xl">Seis cuidados que você sente no sabor.</h2>
        <ol className="mt-16 space-y-20 md:space-y-28">
          {etapas.map((e, i) => (
            <li key={e.titulo} className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
              <div className={`relative aspect-[4/3] overflow-hidden shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] ${i % 2 ? "md:order-2" : ""}`}>
                <Image src={foto(e.foto.id, 1200)} alt={e.foto.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
              </div>
              <div>
                <p className="flex items-baseline gap-4 font-mono text-xs uppercase tracking-[0.14em] text-marca">
                  <span className="text-3xl font-medium">{String(i + 1).padStart(2, "0")}</span>
                  <span>{e.mes}</span>
                </p>
                <h3 className="mt-3 text-3xl font-extrabold tracking-[-0.03em]">{e.titulo}</h3>
                <p className="mt-4 max-w-[46ch] leading-relaxed text-tinta-2">{e.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ===== Quem faz ===== */}
      <section className="bg-escuro text-sobre-escuro">
        <div className="mx-auto max-w-6xl px-4 py-28 sm:px-6">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-sobre-escuro/70">Quem faz</p>
          <h2 className="mt-3 max-w-[22ch] text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] sm:text-5xl">
            Café especial é <span className="font-display font-black italic">trabalho de gente.</span>
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {pessoas.map((p, i) => (
              <figure key={p.id} className={i === 1 ? "md:mt-16" : ""}>
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image src={foto(p.id, 900)} alt={p.alt} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
                </div>
                <figcaption className="mt-4 max-w-[34ch] border-l-2 border-marca pl-3 text-sm leading-relaxed text-sobre-escuro/80">{p.legenda}</figcaption>
              </figure>
            ))}
          </div>
          <p className="mt-16 max-w-[60ch] text-lg leading-relaxed text-sobre-escuro/85">
            A GranumBox compra das cooperativas e associações da região, que repassam às famílias. E quando você avalia o café pelo QR code do pacote, sua opinião chega a quem plantou.
          </p>
        </div>
      </section>

      {/* ===== As famílias ===== */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-28 sm:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-marca">Quem planta</p>
        <h2 className="mt-3 text-4xl font-extrabold leading-[1] tracking-[-0.035em] sm:text-5xl">Conheça os produtores</h2>
        <p className="mt-6 max-w-[52ch] leading-relaxed text-tinta-2">
          Famílias do Norte Pioneiro do Paraná, região com Denominação de Origem desde 2025.
        </p>
      </section>

      <section className="mx-auto max-w-6xl space-y-10 px-4 pb-28 sm:px-6">
        {produtores.map((p) => {
          const naCaixa = p.lotes.some((l) => edicao.lotes.includes(l.id));
          return (
            <article key={p.fazenda} className="grid bg-caixa shadow-[0_30px_60px_-30px_rgb(0_0_0/0.5)] lg:grid-cols-[1.1fr_1fr]">
              {/* Fotos: principal grande e galeria embaixo */}
              <div className="flex flex-col gap-1">
                {p.imagem && (
                  <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-72 lg:flex-1">
                    <Image src={foto(p.imagem.id, 1200)} alt={p.imagem.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-1">
                {p.galeria?.map((g) => (
                  <div key={g.id} className="relative aspect-[4/3]">
                    <Image src={foto(g.id, 600)} alt={g.alt} fill sizes="(min-width: 1024px) 28vw, 50vw" className="object-cover" />
                  </div>
                ))}
                </div>
              </div>

              <div className="flex flex-col p-6 sm:p-10">
                <p className="flex justify-between font-mono text-[11px] uppercase tracking-[0.12em] text-marca">
                  <span>{p.cidade}, {p.uf}</span>
                  <span>desde {p.desde}</span>
                </p>
                <h3 className="mt-4 font-display text-4xl leading-tight">{p.fazenda}</h3>
                <p className="text-sm font-semibold text-tinta-2">{p.nome}</p>
                {p.historia.map((h) => (
                  <p key={h} className="mt-4 text-sm leading-relaxed text-tinta-2">{h}</p>
                ))}

                {p.pessoas && (
                  <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                    {p.pessoas.map((pe) => (
                      <li key={pe.nome} className="flex items-center gap-3">
                        <div className="relative size-16 shrink-0 overflow-hidden rounded-full">
                          <Image src={foto(pe.foto, 200)} alt={pe.alt} fill sizes="64px" className="object-cover" />
                        </div>
                        <div className="text-sm leading-snug">
                          <p className="font-semibold">{pe.nome}</p>
                          <p className="text-tinta-2">{pe.papel}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.praticas.map((pr) => (
                    <li key={pr} className="rounded-[4px] border border-tinta/15 px-2.5 py-1 text-xs">{pr}</li>
                  ))}
                </ul>

                <AbasProdutor
                  lotes={p.lotes}
                  avaliacoes={todas.filter((a) => p.lotes.some((l) => l.id === a.loteId)).map(({ loteId, nota, nome, cidade, comentario }) => ({ loteId, nota, nome, cidade, comentario }))}
                />
                {naCaixa && <p className="mt-3 font-mono text-xs uppercase tracking-[0.12em] text-marca">Na caixa de {edicao.nome}</p>}

                {p.contato && (
                  <dl className="mt-auto grid gap-1 pt-8 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-tinta-2">Telefone</dt>
                      <dd><a href={`tel:+55${p.contato.telefone.replace(/\D/g, "")}`} className="font-mono underline-offset-4 hover:underline">{p.contato.telefone}</a></dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[11px] uppercase tracking-[0.12em] text-tinta-2">E-mail</dt>
                      <dd><a href={`mailto:${p.contato.email}`} className="break-all underline-offset-4 hover:underline">{p.contato.email}</a></dd>
                    </div>
                  </dl>
                )}
              </div>
            </article>
          );
        })}
      </section>

      {/* ===== Chamada final ===== */}
      <section className="bg-caixa">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-4 py-20 sm:px-6 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-[24ch] text-3xl font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-4xl">
            Receba em casa o café dessas famílias, <span className="font-display font-black italic text-marca">todo mês.</span>
          </h2>
          <Link href="/assinar" className={`${botao} bg-marca text-sobre-marca hover:bg-marca-forte`}>Assinar</Link>
        </div>
        <p className="mx-auto max-w-6xl px-4 pb-8 text-xs text-tinta-2 sm:px-6">Fotos ilustrativas (Unsplash). Pessoas, telefones e e-mails dos produtores são fictícios, para demonstração.</p>
      </section>
    </main>
  );
}
