// Dados de demonstração. Trocar pelo produtor real antes do pitch.

export const ATRIBUTOS = [
  { chave: "docura", nome: "Doçura", min: "pouca", max: "muita" },
  { chave: "acidez", nome: "Acidez", min: "suave", max: "vibrante" },
  { chave: "corpo", nome: "Corpo", min: "leve", max: "encorpado" },
  { chave: "finalizacao", nome: "Finalização", min: "curta", max: "longa" },
] as const;

export type Atributo = (typeof ATRIBUTOS)[number]["chave"];
export type Perfil = Record<Atributo, number>; // 1 a 5

export type Lote = {
  id: string;
  codigo: string; // segredo impresso só no QR: prova que a pessoa teve o pacote em mãos
  marcacao: string; // como aparece no estêncil da saca
  variedade: string;
  processo: string;
  altitude: string;
  talhao: string;
  torra: string;
  colheita: string;
  safra: string;
  notasSensoriais: string[];
  pontuacaoSCA?: number;
  perfilFicha: Perfil; // o que o produtor declara; o consumidor confirma ou não
};

export type Produtor = {
  nome: string;
  fazenda: string;
  marca: string; // nome curto para o estêncil
  cidade: string;
  uf: string;
  desde: number;
  historia: string[];
  praticas: string[];
  lotes: Lote[];
};

export const produtor: Produtor = {
  nome: "Família Moreira",
  fazenda: "Sítio Boa Vista",
  marca: "Boa Vista",
  cidade: "Pinhalão",
  uf: "PR",
  desde: 1978,
  historia: [
    "Seu Antônio Moreira plantou os primeiros pés em 1978, três anos depois da geada que acabou com o café do Norte Pioneiro. Hoje os netos cuidam dos talhões.",
    "A colheita é seletiva: só o fruto cereja vai para o terreiro suspenso. Cada lote é separado por talhão e por dia de colheita, por isso cada pacote tem o seu próprio código.",
  ],
  praticas: ["Colheita seletiva", "Terreiro suspenso", "Separado por talhão", "Agricultura familiar"],
  lotes: [
    {
      id: "bv-2026-amarelo",
      codigo: "k7q2",
      marcacao: "26-AM-07",
      variedade: "Catuaí Amarelo",
      processo: "Natural",
      altitude: "780 m",
      talhao: "Talhão da Mina",
      torra: "Média",
      colheita: "Junho de 2026",
      safra: "2026",
      notasSensoriais: ["Chocolate ao leite", "Caramelo", "Frutas amarelas"],
      pontuacaoSCA: 84.5,
      perfilFicha: { docura: 4, acidez: 3, corpo: 4, finalizacao: 3 },
    },
    {
      id: "bv-2026-cereja",
      codigo: "p9x4",
      marcacao: "26-MN-03",
      variedade: "Mundo Novo",
      processo: "Cereja descascado",
      altitude: "740 m",
      talhao: "Talhão do Ipê",
      torra: "Média clara",
      colheita: "Julho de 2026",
      safra: "2026",
      notasSensoriais: ["Mel", "Castanhas", "Acidez cítrica"],
      pontuacaoSCA: 83,
      perfilFicha: { docura: 3, acidez: 4, corpo: 3, finalizacao: 3 },
    },
  ],
};

export function acharLote(id: string) {
  return produtor.lotes.find((l) => l.id === id);
}

export const sca = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: 1 });
