// Dados de demonstração. Produtor e associação fictícios; trocar pelos parceiros reais.

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
  codigo: string; // segredo impresso só no QR code: prova que a pessoa teve o pacote em mãos
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
  coordenadas: [number, number];
  origem: string;
  imagem?: { id: string; alt: string }; // foto Unsplash ilustrativa, não é da família
  pessoas?: { nome: string; papel: string; foto: string; alt: string }[]; // fotos Unsplash ilustrativas
  galeria?: { id: string; alt: string }[];
  contato?: { telefone: string; email: string }; // fictícios
  parceiro: string; // cooperativa ou associação de quem o GranumBox compra
  historia: string[];
  praticas: string[];
  lotes: Lote[];
};

export const produtor: Produtor = {
  nome: "Família Moreira",
  imagem: { id: "1586095516671-d085ff58cdd4", alt: "Cerejas de café maduras no pé" },
  pessoas: [
    { nome: "Antônio Moreira", papel: "Fundador, plantou os primeiros pés em 1978", foto: "1617490439585-b855defbe904", alt: "Retrato de um senhor de barba branca" },
    { nome: "Diego Moreira", papel: "Neto, cuida da colheita seletiva", foto: "1654727317205-c0efb54ceb7e", alt: "Homem de chapéu colhendo café no pé" },
  ],
  galeria: [
    { id: "1772228616071-aa344913b93e", alt: "Balde cheio de cerejas de café maduras" },
    { id: "1761318543563-f5c211a99195", alt: "Café secando no terreiro" },
  ],
  contato: { telefone: "(43) 99000-0101", email: "contato@sitioboavista.example" },
  fazenda: "Sítio Boa Vista",
  marca: "Boa Vista",
  cidade: "Pinhalão",
  uf: "PR",
  desde: 1978,
  coordenadas: [-23.7906, -50.0558],
  origem: "Norte Pioneiro do Paraná",
  parceiro: "Associação de produtores do Norte Pioneiro",
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

/** Todas as famílias parceiras. */
export const produtores: Produtor[] = [
  produtor,
  {
    nome: "Família Bortolato",
  imagem: { id: "1524350876685-274059332603", alt: "Saca de juta com grãos de café torrados" },
  pessoas: [
    { nome: "Lurdes Bortolato", papel: "Toca o sítio desde 1991", foto: "1746623691157-c4c7a3bad0c4", alt: "Mulher de chapéu colhendo cerejas de café" },
    { nome: "Rafael Bortolato", papel: "Filho, responsável pela secagem", foto: "1670758566316-13ea9d10580d", alt: "Homem ao lado do café secando sob cobertura" },
  ],
  galeria: [
    { id: "1629008642899-178df6fc5f2f", alt: "Cerejas de café caindo no balde durante a colheita" },
    { id: "1515694590185-73647ba02c10", alt: "Frutos de café verdes e vermelhos no galho" },
  ],
  contato: { telefone: "(43) 99000-0202", email: "sitiosaojudas@bortolato.example" },
    fazenda: "Sítio São Judas",
    marca: "São Judas",
    cidade: "Carlópolis",
    uf: "PR",
    desde: 1991,
    coordenadas: [-23.4256, -49.7214],
    origem: "Norte Pioneiro do Paraná",
    parceiro: "Associação de produtores do Norte Pioneiro",
    historia: ["Dona Lurdes e os filhos cuidam de quatro hectares na beira da represa de Chavantes. Secam o café no terreiro de cimento ao lado da casa."],
    praticas: ["Colheita seletiva", "Secagem em terreiro", "Agricultura familiar"],
    lotes: [
      {
        id: "sj-2026-vermelho", codigo: "m3t8", marcacao: "26-CV-02", variedade: "Catuaí Vermelho", processo: "Natural", altitude: "690 m", talhao: "Talhão da Represa",
        torra: "Média", colheita: "Junho de 2026", safra: "2026", notasSensoriais: ["Chocolate amargo", "Rapadura", "Nozes"], pontuacaoSCA: 82.5, perfilFicha: { docura: 3, acidez: 2, corpo: 5, finalizacao: 4 },
      },
    ],
  },
  {
    nome: "Família Tanaka",
  imagem: { id: "1500382017468-9049fed747ef", alt: "Lavoura ao pôr do sol" },
  pessoas: [
    { nome: "Jorge Tanaka", papel: "Segunda geração, cuida dos talhões altos", foto: "1662815020802-2bd475c72d93", alt: "Retrato de um senhor de boné" },
    { nome: "Mariana Tanaka", papel: "Neta, cuida da fermentação e da prova", foto: "1547364357-6998ce7d4c02", alt: "Mulher colhendo café no cafezal" },
  ],
  galeria: [
    { id: "1677123617592-5c30e34f40e9", alt: "Cacho de frutos de café maduros no pé" },
    { id: "1642613630414-1d9938f4fe02", alt: "Mãos colhendo café para um balaio" },
  ],
  contato: { telefone: "(43) 99000-0303", email: "altodaserra@tanaka.example" },
    fazenda: "Sítio Alto da Serra",
    marca: "Alto da Serra",
    cidade: "Tomazina",
    uf: "PR",
    desde: 1964,
    coordenadas: [-23.7769, -49.9497],
    origem: "Norte Pioneiro do Paraná",
    parceiro: "Associação de produtores do Norte Pioneiro",
    historia: ["Terceira geração de uma família japonesa que chegou ao Norte Pioneiro nos anos 1950. O talhão mais alto passa dos 900 metros."],
    praticas: ["Fermentação controlada", "Terreiro suspenso", "Separado por talhão"],
    lotes: [
      {
        id: "as-2026-bourbon", codigo: "w5r1", marcacao: "26-BA-01", variedade: "Bourbon Amarelo", processo: "Fermentação controlada", altitude: "920 m", talhao: "Talhão do Alto",
        torra: "Média clara", colheita: "Julho de 2026", safra: "2026", notasSensoriais: ["Frutas vermelhas", "Mel", "Floral"], pontuacaoSCA: 86, perfilFicha: { docura: 5, acidez: 4, corpo: 3, finalizacao: 4 },
      },
      {
        id: "as-2026-topazio", codigo: "h2n6", marcacao: "26-TP-04", variedade: "Topázio", processo: "Natural", altitude: "880 m", talhao: "Talhão da Cerca",
        torra: "Média", colheita: "Agosto de 2026", safra: "2026", notasSensoriais: ["Caramelo", "Laranja", "Amêndoas"], pontuacaoSCA: 84, perfilFicha: { docura: 4, acidez: 3, corpo: 4, finalizacao: 3 },
      },
    ],
  },
];

/** A família de um lote. Lotes cadastrados pelo painel caem no produtor principal. */
export const produtorDoLote = (loteId: string) => produtores.find((p) => p.lotes.some((l) => l.id === loteId)) ?? produtor;

export const sca = (n: number) => n.toLocaleString("pt-BR", { minimumFractionDigits: 1 });

/* Assinatura: quem paga é o consumidor. Preços são proposta para o pitch. */
export const planos = [
  { id: "grao", nome: "Grão", preco: 59, pacotes: 1, descricao: "Um pacote de 250 g por mês, de um produtor diferente a cada edição." },
  { id: "box", nome: "Box", preco: 109, pacotes: 2, destaque: true, descricao: "Dois pacotes de 250 g de produtores diferentes, para comparar na xícara." },
  { id: "familia", nome: "Família", preco: 189, pacotes: 4, descricao: "Quatro pacotes de 250 g por mês, para quem toma café todo dia em casa." },
] as const;

export type PlanoId = (typeof planos)[number]["id"];

/** A caixa do mês: quais lotes vão para a casa de quem assina. */
export const edicao = { nome: "Outubro de 2026", lotes: ["bv-2026-amarelo", "bv-2026-cereja"] };

export const reais = (n: number) => n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

/** Avaliações de exemplo para a página de produtores (fictícias). Somam-se às reais do banco. */
export const avaliacoesDemo: { loteId: string; nota: number; nome: string; cidade: string; comentario: string }[] = [
  { loteId: "bv-2026-amarelo", nota: 5, nome: "Camila", cidade: "Curitiba, PR", comentario: "Doce, com gosto de chocolate ao leite. Foi a primeira vez que tomei café sem açúcar." },
  { loteId: "bv-2026-cereja", nota: 4, nome: "Rodrigo", cidade: "Londrina, PR", comentario: "A acidez cítrica aparece bem no coado. Muito bom gelado também." },
  { loteId: "sj-2026-vermelho", nota: 5, nome: "Helena", cidade: "São Paulo, SP", comentario: "Encorpado, perfeito para o espresso da manhã. Parabéns, Dona Lurdes!" },
  { loteId: "sj-2026-vermelho", nota: 4, nome: "Paulo", cidade: "Maringá, PR", comentario: "Lembra rapadura mesmo. Café de vó, no melhor sentido." },
  { loteId: "as-2026-bourbon", nota: 5, nome: "Juliana", cidade: "Florianópolis, SC", comentario: "Floral e com mel no final. O melhor da caixa até agora." },
  { loteId: "as-2026-topazio", nota: 4, nome: "Marcos", cidade: "Ponta Grossa, PR", comentario: "Equilibrado, caramelo e um toque de laranja." },
];
