# Decisões do GranumBox

Registro curto do que foi decidido e por quê. Adicione no topo, com data.

## 2026-10-08

**Planos por peso e por período** (pedido da equipe). Individual 250 g R$ 49,90, Box 500 g R$ 89,90, Família 1 kg R$ 169,90 por mês, frete à parte (revisado com o grupo; antes 94,90 e 179,90 com frete incluso). Trimestral, semestral e anual com ~5%, ~10% e ~15% de desconto, pagos à vista no início do período (preços terminando em ,90, tabela em `planos` em `lib/data.ts`). O Box é um pacote só de 500 g; sem foto dele ainda, usa a do de 250 g um pouco maior.

**Avaliação em palavras do dia a dia** (pedido da equipe). O cliente não sabe o que é "corpo" ou "finalização". No formulário e nos gráficos: Doce, Sabor de fruta, Leve ou encorpado e Sabor depois de beber, cada um com uma pergunta direta ("O café lembra alguma fruta?"). Sem gíria nem comparação (a primeira versão, com "docinho" e "leite integral", foi recusada pela equipe). As chaves dos dados não mudaram. O termo técnico da prova SCA (`tecnico` em `ATRIBUTOS`) aparece só no painel de curadoria.

**Página `/produtores` com storytelling** (pedido da equipe: "é o nosso diferencial"). Seis etapas do pé à xícara, seção "Quem faz" e cartões por família com fotos, pessoas, contato, avaliações e cafés do sítio. A ficha `/p/[lote]` funciona para os lotes de todas as famílias e mostra fotos, pessoas e outros cafés do sítio. Duas famílias (Bortolato, Tanaka), pessoas, telefones (`(43) 99000-0x0x`), e-mails (`.example`) e fotos (Unsplash) são fictícios para a demo. Também há avaliações de exemplo (`avaliacoesDemo`), o que contraria a regra "nunca depoimento inventado" do mural da home; a equipe precisa decidir se elas ficam.

**Deploy na Cloudflare via OpenNext (Workers, não Pages).** O site renderiza no servidor (home dinâmica, rotas de API, Redis), e o Pages só serve arquivos estáticos. Adicionados `@opennextjs/cloudflare`, `wrangler.jsonc` (worker `granumbox`) e os scripts `preview`/`deploy`; Next subiu para 15.5.27 (exigência do adaptador). Sem otimizador de imagem no Workers: `images.unoptimized` e os PNGs do produto viraram WebP de ~100 KB. Substitui "deploy adiado".

**A página inicial é só para o cliente** (correção da equipe). Saiu a seção "Para cooperativas" e o link "Curadoria" do menu (continua no rodapé, em "Equipe", para a demo). No lugar: "Um só lugar: o Norte Pioneiro.", com o muro de cidades ao fundo e a ficha de origem do lote (sítio, cidade, talhão, altitude, variedade, SCA). A conversa com cooperativas fica fora do site do consumidor.

**"Quem já provou" virou mural e "Cooperativas" virou muro de cidades + tabela** (escolhas da equipe). Mural: 4 cartões; avaliações reais ocupam os primeiros, o resto fica pontilhado ("a sua pode ser a primeira"), nunca depoimento inventado. Cooperativas: nomes de municípios do Norte Pioneiro ao fundo (Pinhalão, onde já há parceiro, em destaque) e por cima a tabela "Vocês entregam × Vocês recebem". A lista de municípios ainda precisa ser conferida pela equipe.

**"Você prova" virou demonstração interativa** (escolha da equipe: celular + ficha em papel). O visitante arrasta as notas num celular e escreve um recado; ao enviar, vira a ficha de prova em papel com as notas circuladas e "segue pela cooperativa até Pinhalão". Nada é gravado e a ficha diz isso. Sem fonte manuscrita: o recado usa Montserrat itálico para não sair do design system. Componente `DemoProva`.

**"Da lavoura à sua porta. E de volta." virou ciclo** (escolha da equipe: rota em círculo + objetos). Círculo pontilhado com setas no sentido horário e os objetos de cada etapa nos pontos (lavoura, pacote, caixa, cartão com QR), numerados; o texto das 4 etapas fica no miolo. Mostra o diferencial: a nota volta ao sítio. No celular vira lista com os objetos.

**"Os cafés desta caixa" virou prateleira** (escolha da equipe entre 3 amostras: mistura de prateleira + etiqueta pendurada). Pacote PNG real com o rótulo trocado pelo do lote (sítio, cidade, altitude, processo), etiqueta de papel em mono pendurada na borda com lote, SCA e notas. Saem as fotos de banco e as abas por processo (só 2 cafés, filtro não ajudava). Componente `CafesPrateleira`.

**Embalagem real na página inicial** (pedido da equipe). Os PNGs da caixa preta, do pacote kraft e do cartão do lote (`app/public/produto/`) entram numa seção nova, "Abra a caixa. Conheça o sítio.", com legendas curtas por item; ela substitui a seção "Uma manhã diferente" (foto de banco). Nos planos, o monte de grãos virou a quantidade real de pacotes (1, 2, 4). Segue o que Moka Clube e Atlas fazem: a embalagem fotografada é o elemento principal. Todo texto reforça que os cafés são só do Norte Pioneiro do Paraná.

**Recortes sempre em PNG de boa qualidade** (pedido da equipe). `scripts/recortar.py` gera os PNGs a partir das fotos Unsplash. Removido o botão redondo de sacola do topo e o ícone de sacola do menu; xícara deslocada para a direita.

**Página inicial refeita com sobreposições, copiando o estilo da referência** a pedido da equipe ("copie EXATAMENTE o estilo"): recortes sem fundo invadindo a divisa, etiqueta com botão redondo por cima, filete de grãos até o botão, cartões com foto quadrada, faixa de planos com cartões claros, botões retangulares. Cores e fontes continuam as do GranumBox.

**Página inicial recriada a partir de um layout de referência da equipe** (cafeteria fictícia "Cofshop"): mantida a estrutura (topo escuro com manchete e foto, cafés com abas, seção com fotos, vitrine de planos em faixa escura, depoimentos, rodapé em colunas), trocando cores e fontes pelo design system. As fotos do layout não foram copiadas; usamos 3 fotos de clima do Unsplash, verificadas, sem associá-las a um lote. Depoimentos só aparecem com avaliações reais; sem elas, a seção explica quando chegam.

**Logo novo sem fundo** (`granumboxsemfundo.svg`, retangular 1065x772, já inclui a palavra "granumbox"). Vira `app/public/logo.svg`; `logo-escuro.svg` é a mesma arte com o marrom clareado para #D9925A, usada no tema escuro pelo componente `Logo`. Como o logo já traz o nome, a navegação não repete o texto "GranumBox" ao lado.

**Fontes reais do logo confirmadas pela equipe:** "granum" é Playfair Display Black Italic e "box" é Montserrat ExtraBold. Substituem Courgette e Poppins, que tinham sido escolhidas a olho. Interface em Montserrat, assinatura em Playfair Display Black Italic.

**Origem Controlada Café inspecionado (origemcontrolada.agtrace.ag, 08/10/2026).** Site institucional: carrossel no topo com degradê escuro, título em caixa alta, quatro cartões iguais com ícone (Autenticidade, Rastreabilidade, Produtores, Excelência), fundo com padrão de grãos e navegação pelas 15 IGs. O foco é a região e o selo, com texto genérico ("paixão", "excelência"). Comparado a ele, o GranumBox fala da família e do lote específico, tem uma ação para quem bebe (avaliar) e devolve essa opinião ao produtor. Evitamos de propósito os padrões vistos ali: quatro cartões iguais e texto promocional vago. O selo da IG continua sendo complementar, não concorrente.

**Deploy adiado por decisão da equipe** ("sem deploy ainda"). A demo roda local com `npm --prefix app run dev`.

**Referências visuais do modelo de assinatura (inspecionadas no navegador em 08/10/2026).**
- **Moka Clube** (primeiro clube de café especial do Brasil, 2012): marca amarela forte, foto real da embalagem como herói, grade de produtos com nome, notas sensoriais e preço, cupom de primeira compra no topo e frete grátis acima de um valor.
- **Atlas Coffee Club** (EUA): cada pacote tem arte própria do país de origem, foto do produto em cena, "How it works" em três passos e oferta "primeiro pacote grátis" capturando e-mail.
- **O que o GranumBox já faz igual:** caminho em passos, planos com preço por mês, frete incluso, notas sensoriais por lote.
- **Onde vai além:** QR por lote com a história e ficha de prova comparada, e a opinião do assinante voltando ao produtor. Nenhum dos dois mostra isso na home.
- **O que falta e só a equipe resolve:** foto real da caixa e do pacote GranumBox. Nas duas referências, a embalagem fotografada é o elemento visual principal. Não usar foto de banco nem ilustração falsa; fotografar a caixa montada com a etiqueta impressa.
- **Ideia para decidir:** oferta de entrada (primeira caixa com desconto) como as duas fazem. Não implementado: é decisão comercial da equipe.

**MODELO DE NEGÓCIO CORRIGIDO: clube de assinatura pago pelo consumidor (D2C).** Decisão da equipe, substitui o modelo anterior em que o produtor pagava. O GranumBox compra lotes especiais de cooperativas e associações do Norte Pioneiro, embala com a marca GranumBox (o nome é literal: a caixa do grão) e envia todo mês para o assinante, com um QR por lote contando a história de quem plantou. **Só o consumidor paga.** Produtores e cooperativas não pagam nada: vendem o café e recebem de volta a ficha de prova dos assinantes.
- Planos (proposta, preços não validados): Grão R$ 59 (1 pacote 250 g), Box R$ 109 (2 pacotes de produtores diferentes, destaque), Família R$ 189 (4 pacotes). Frete incluso.
- `/assinar` é lista de espera: plano, nome, e-mail e CEP; nada é cobrado. Pagamento recorrente real fica fora do MVP.
- `/painel` virou "Curadoria", uso interno da equipe: lotes comprados, etiquetas, assinantes, avaliações.
- A etiqueta ganhou "Selecionado e embalado por granumbox".
- Entradas abaixo que falam em "assinatura paga pelo produtor" e "plano Cooperativa" estão superadas por esta.

**Lição da Farmer Connect: o app de consumidor virou conformidade B2B.** Em 08/10/2026, farmerconnect.com redireciona para a Agridence, que vende rastreabilidade para cumprir o EUDR (lei europeia antidesmatamento; vale para grandes operadores a partir de 30/12/2026 e para pequenos em 30/06/2027). Isso reforça que a receita está no B2B (produtor e cooperativa pagam) e sugere um argumento de pitch: os dados de lote do GranumBox (talhão, coordenadas, safra) são a base do que o EUDR exige de quem exporta café para a Europa. Não implementado no MVP; fica como evolução do plano Cooperativa.

**Turbopack no desenvolvimento.** `npm run dev` usa `next dev --turbopack` (Next 15.5); o build de produção continua com o compilador padrão. Testado: fontes e tokens carregam normalmente.

**Comparação com referências de mercado (visual e produto).**

| Referência | O que fazem bem | O que o GranumBox adotou | Onde o GranumBox vai além |
|---|---|---|---|
| Thank My Farmer (Farmer Connect) | QR no pacote, mapa da origem, gesto de apoio ao produtor | Mapa da origem e botão "Agradecer ao produtor" | Não exige app: abre no navegador. Devolve a opinião ao produtor |
| Origem Controlada Café (Sebrae/IGs) | Selo oficial, procedência, pontuação e dados sensoriais | Pontuação SCA e notas sensoriais na etiqueta | Avaliação verificada do consumidor e ficha comparada |
| Algrano | Perfil do produtor separado da ficha técnica do lote, "mostre as pessoas" | Etiqueta técnica no topo, história da família abaixo | Foco no consumidor final, não só no comprador B2B |
| Passaportes digitais de produto (UE) | Veredito de autenticidade antes dos dados | "Pacote original verificado" ou "QR não confere" | Mesmo padrão aplicado a um produto agrícola pequeno |
| shadcn/ui dashboard-01 | Faixa de indicadores no topo, lista abaixo | Faixa de 4 indicadores no painel | Ficha de prova visual por lote no lugar de gráfico genérico |
| 21st.dev / guias de rating acessível | Rating com teclado, alvos de 44px, valor escrito | Escala 1 a 5 como radiogroup, 44px, "4 de 5" | Círculos da marca no lugar de estrelas, iguais em todo o produto |

Visual inspecionado do Algrano (home): verde-petróleo com laranja nos botões, títulos misturando serifa e sans, e um mosaico de fotos reais de produtores logo no topo. O Origem Controlada foi inspecionado depois (ver entrada acima). O site da Farmer Connect hoje é da Agridence (ver acima), com visual corporativo B2B: título grande, botão Book a Demo, contagem regressiva do EUDR e selos ISO/GS1. A lição principal é que **fotos reais da família produtora fazem falta no GranumBox**; é a melhoria de maior impacto se a equipe conseguir as fotos. O GranumBox se diferencia pela identidade do próprio logo: a caixa de papelão vira superfície, a etiqueta colada vira assinatura, e o marrom é a única cor de ação.

**Referências de componentes (21st.dev, shadcn/ui blocks, guias de acessibilidade de rating).** A escala de nota virou `radiogroup` com `role="radio"`, alvos de 44px e o valor escrito ao lado ("4 de 5"); a nota exibida é um único `role="img"` com rótulo, como recomenda a documentação de acessibilidade do eBay Evo. Do dashboard-01 do shadcn veio a faixa de indicadores no topo do painel (nota média, avaliações, agradecimentos, lotes).

**Deploy pendente.** Não há sessão da Vercel na máquina; precisa de `npx vercel login` da equipe ou importação do repositório pelo site.

**Veredito no topo da página do lote (referência: passaportes digitais de produto).** Ao escanear, a primeira coisa é "Pacote original verificado" ou "Este QR não confere com o lote". Inspirado no padrão dos Digital Product Passports da UE e em plataformas de autenticidade, que mostram o veredito antes dos dados. Do Algrano (marketplace de café verde) veio a separação entre dados técnicos do lote e história das pessoas.

**Token `sobre-marca` para contraste.** No modo escuro a marca clareia para #D9925A e texto branco ficava em ~2,4:1. Todo texto sobre `marca` usa `sobre-marca` (branco no claro, marrom-escuro no escuro).

**Desafio escolhido: #6 Café com Valor.** O manual exige vínculo a um dos 8 gargalos oficiais. O GranumBox responde à pergunta do desafio ("usar tecnologia e informação para analisar, valorizar e diferenciar o café do Norte Pioneiro") transformando a opinião de quem bebe em dado de qualidade por lote. Pitch em 09/10 às 9h.

**Modelo de negócio: assinatura mensal paga pelo produtor (B2B).** O consumidor nunca paga nem instala app: o QR abre no navegador. Planos: Grão R$ 49, Safra R$ 99, Cooperativa sob consulta. Preços são proposta, não validados.

**Posicionamento: complementar ao selo da IG, não concorrente.** Pesquisa mostrou que o Origem Controlada Café (Sebrae, ABDI, Instituto CNA) já rastreia mais de 1 milhão de pacotes via QR nas IGs, e o Norte Pioneiro tem Denominação de Origem (INPI, 2025), com ACENPP (associação) e COCENPP (cooperativa). Referência internacional: Thank My Farmer (Farmer Connect), QR com mapa e doação ao produtor. O espaço livre é o caminho de volta: avaliação verificada do consumidor chegando ao produtor como dado para negociar. Por isso o plano Cooperativa mira a COCENPP.

**Diferencial central: ficha de prova do consumidor.** O consumidor dá nota geral e, opcionalmente, doçura, acidez, corpo e finalização (1 a 5). A tela compara a média com a ficha declarada pelo produtor. Aparece na landing, no lote, no painel e no telão.

**Anti-fraude simples e explicável.** O QR leva um código secreto do lote (`?c=`); sem ele a API recusa. Um cookie limita uma avaliação (e um agradecimento) por aparelho por lote. O produtor não tem como apagar avaliação. Não é à prova de ataque, é suficiente para o MVP e fácil de explicar à banca.

**Identidade visual derivada do logo.** Duas tentativas foram rejeitadas: uma genérica (creme, serifa, "cara de IA") e uma kraft/estêncil (fugiu da marca). A atual usa Courgette (o "granum" do logo) com moderação, Poppins (o "box") na interface, IBM Plex Mono em dados, marrom #773811 sobre #FCFCFC e papelão claro nas superfícies. Regras em [DESIGN.md](DESIGN.md). As fontes foram identificadas a olho, pois o SVG tem o texto em curvas; trocar se a equipe souber as fontes reais.

**Funcionalidades para a demo.**
- `/apresentar`: telão com QR gigante; a banca escaneia, avalia e vê a nota chegar ao vivo (atualiza a cada 2,5 s).
- `/painel/etiqueta/[lote]`: 4 etiquetas por A4 para imprimir e colar num pacote de café real.
- `/painel/novo`: cadastro de lote com ficha do produtor; gera código, página e QR.
- Página do lote com mapa (OpenStreetMap, sem chave de API) e botão "Agradecer ao produtor" (ideia do Thank My Farmer, sem pagamento).

**Stack: Next.js 15 + Tailwind 4 + Upstash Redis.** Sem Redis configurado, os dados ficam em memória (somem ao reiniciar o servidor). Em produção, conectar Upstash pelo Storage da Vercel. Não há login: o painel é aberto, aceitável para demo.

**Dados de demonstração fictícios.** Família Moreira, Sítio Boa Vista, Pinhalão (PR). Trocar por produtor real em `app/lib/data.ts` se a equipe conseguir.

## Pendências

- Deploy na Vercel + Upstash (precisa da conta da equipe).
- Fotos reais do produtor (hoje não há imagem de produtor).
- Login do produtor e cobrança real ficam fora do MVP.
