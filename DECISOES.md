# Decisões do GranumBox

Registro curto do que foi decidido e por quê. Adicione no topo, com data.

## 2026-10-08

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
