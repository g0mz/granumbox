// Dados de demonstração — trocar pelo produtor real antes do pitch.

export type Lote = {
  id: string;
  codigo: string; // segredo impresso só no QR: prova que a pessoa teve o produto em mãos
  nome: string;
  safra: string;
  variedade: string;
  processo: string;
  altitude: string;
  talhao: string;
  torra: string;
  notasSensoriais: string[];
  pontuacaoSCA?: number;
  colheita: string;
};

export type Produtor = {
  slug: string;
  nome: string;
  fazenda: string;
  cidade: string;
  desde: number;
  historia: string[];
  praticas: string[];
  lotes: Lote[];
};

export const produtor: Produtor = {
  slug: "sitio-boa-vista",
  nome: "Família Moreira",
  fazenda: "Sítio Boa Vista",
  cidade: "Pinhalão, Norte Pioneiro do Paraná",
  desde: 1978,
  historia: [
    "O Sítio Boa Vista começou com o seu Antônio Moreira, que plantou os primeiros pés de café em 1978, depois da grande geada que arrasou a região. Hoje são os netos que cuidam dos talhões, com o mesmo cuidado na colheita.",
    "A colheita é seletiva: só o fruto maduro, cereja, vai para o terreiro suspenso. Cada lote é separado por talhão e por dia de colheita — por isso cada pacote tem sua própria história.",
  ],
  praticas: ["Colheita seletiva", "Secagem em terreiro suspenso", "Rastreado por talhão", "Agricultura familiar"],
  lotes: [
    {
      id: "bv-2026-amarelo",
      codigo: "k7q2",
      nome: "Catuaí Amarelo — Talhão da Mina",
      safra: "2026",
      variedade: "Catuaí Amarelo",
      processo: "Natural",
      altitude: "780 m",
      talhao: "Talhão da Mina",
      torra: "Média",
      notasSensoriais: ["Chocolate ao leite", "Caramelo", "Frutas amarelas"],
      pontuacaoSCA: 84.5,
      colheita: "Junho de 2026",
    },
    {
      id: "bv-2026-cereja",
      codigo: "p9x4",
      nome: "Mundo Novo — Cereja Descascado",
      safra: "2026",
      variedade: "Mundo Novo",
      processo: "Cereja descascado",
      altitude: "740 m",
      talhao: "Talhão do Ipê",
      torra: "Média-clara",
      notasSensoriais: ["Mel", "Castanhas", "Acidez cítrica"],
      pontuacaoSCA: 83,
      colheita: "Julho de 2026",
    },
  ],
};

export function acharLote(id: string) {
  return produtor.lotes.find((l) => l.id === id);
}
