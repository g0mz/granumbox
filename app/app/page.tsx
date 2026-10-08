import Image from "next/image";
import Link from "next/link";
import { produtor } from "@/lib/data";

const planos = [
  { nome: "Grão", preco: "R$ 49", desc: "Para começar", itens: ["Página do produtor", "Até 3 lotes ativos", "QR codes ilimitados", "Avaliações verificadas"] },
  { nome: "Safra", preco: "R$ 99", desc: "Mais escolhido", destaque: true, itens: ["Tudo do Grão", "Lotes ilimitados", "Painel de avaliações", "Relatório por lote e região"] },
  { nome: "Cooperativa", preco: "Sob consulta", desc: "Associações e coops", itens: ["Vários produtores", "Selo de origem regional", "Exportação de dados", "Suporte dedicado"] },
];

export default function Home() {
  const demo = produtor.lotes[0];
  return (
    <main>
      <section className="bg-cafe text-creme">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <nav className="flex items-center justify-between">
            <span className="flex items-center gap-2 font-serif text-xl">
              <Image src="/logo.svg" alt="" width={36} height={36} className="rounded-lg" />
              GranumBox
            </span>
            <Link href="/painel" className="rounded-full border border-creme/40 px-4 py-2 text-sm hover:bg-creme/10">
              Sou produtor
            </Link>
          </nav>
          <div className="py-20 sm:py-28">
            <p className="text-sm uppercase tracking-widest opacity-70">Café do Norte Pioneiro</p>
            <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-6xl">
              Cada pacote de café tem uma história. Agora ela cabe num QR code.
            </h1>
            <p className="mt-6 max-w-xl text-lg opacity-85">
              O consumidor escaneia a embalagem e conhece quem plantou, o talhão, o processo e o que outros
              consumidores reais acharam daquele lote. O produtor ganha valor, confiança e retorno direto.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href={`/p/${demo.id}?c=${demo.codigo}`} className="rounded-full bg-creme px-6 py-3 font-medium text-cafe">
                Ver um café de exemplo
              </Link>
              <a href="#planos" className="rounded-full border border-creme/40 px-6 py-3">
                Planos
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-8 px-6 py-20 sm:grid-cols-3">
        {[
          ["1. O produtor cadastra", "História da família, fotos e cada lote: variedade, processo, altitude, talhão e pontuação."],
          ["2. O QR vai na embalagem", "Um QR único por lote. Quem escaneia vê a origem real daquele café."],
          ["3. Avaliação verificada", "Só avalia quem teve o produto em mãos. Nenhuma avaliação é apagada — confiança de verdade."],
        ].map(([t, d]) => (
          <div key={t}>
            <h3 className="font-serif text-xl text-cafe">{t}</h3>
            <p className="mt-2 leading-relaxed opacity-80">{d}</p>
          </div>
        ))}
      </section>

      <section id="planos" className="bg-areia py-20">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="font-serif text-3xl">Assinatura para o produtor</h2>
          <p className="mt-2 opacity-75">O consumidor nunca paga nem instala nada.</p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {planos.map((p) => (
              <div key={p.nome} className={`rounded-3xl p-6 ${p.destaque ? "bg-cafe text-creme" : "bg-white"}`}>
                <p className="text-sm opacity-75">{p.desc}</p>
                <h3 className="mt-1 font-serif text-2xl">{p.nome}</h3>
                <p className="mt-4 text-3xl font-semibold">
                  {p.preco}
                  {p.preco.startsWith("R$") && <span className="text-base font-normal opacity-70">/mês</span>}
                </p>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.itens.map((i) => (
                    <li key={i}>✓ {i}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 text-center text-sm opacity-60">GranumBox · Genius Agro Hackathon 2026</footer>
    </main>
  );
}
