# GranumBox Design System

Fonte da verdade visual do GranumBox. Toda tela nova segue este documento. Os tokens vivem em [app/app/globals.css](app/app/globals.css); nenhum componente usa cor ou fonte fora deles.

## Ideia central

O logo é uma **caixa de papelão aberta com um grão de café**. O sistema inteiro sai daí: superfícies de papelão claro sobre fundo branco, o marrom do logo como única cor de ação, e a **etiqueta do lote** (uma etiqueta colada na caixa, com o QR) como assinatura visual.

## Cor

| Token | Claro | Escuro | Uso |
|---|---|---|---|
| `fundo` | `#FCFCFC` | `#1C120B` | Fundo da página (o mesmo do logo) |
| `caixa` | `#F4ECE3` | `#2A1B11` | Seções, cartões, áreas agrupadas (papelão claro) |
| `tinta` | `#3A1A07` | `#F3E6D8` | Texto principal |
| `tinta-2` | `#6E4A33` | `#C9AE95` | Texto secundário, legendas |
| `marca` | `#773811` | `#D9925A` | Cor do logo. Botões, links, notas, destaques |
| `marca-forte` | `#5A290B` | `#E8A873` | Hover e pressionado de `marca` |
| `sobre-marca` | `#FFFFFF` | `#1C120B` | Texto e ícones sobre fundo `marca` (nunca `text-white`) |
| `linha` | marca 18% | tinta 16% | Divisórias e bordas |

Regras:
- **Uma cor de ação só: `marca`.** Não existe segundo destaque (nada de verde, dourado, vermelho).
- Erro também usa `marca`, com texto explicando o que fazer. Sem ícone de alerta vermelho.
- A etiqueta do lote é sempre branca com marrom, nos dois temas: ela representa um objeto físico.
- Contraste mínimo WCAG AA (4,5:1 no texto). `marca` sobre `fundo` dá 8,3:1.

## Tipografia

Derivada das duas partes do logo.

| Papel | Fonte | Uso |
|---|---|---|
| Assinatura | **Playfair Display Black Italic** (o "granum" do logo, fonte confirmada pela equipe) | Nome da fazenda na etiqueta, título do painel. No máximo **um** uso por tela, fora a assinatura "granumbox" no rodapé da etiqueta, que reproduz o logo. Nunca em parágrafo, botão ou rótulo. |
| Interface | **Montserrat** (o "box" do logo é Montserrat ExtraBold, confirmado pela equipe) | Títulos (600/700), texto (400), botões (500/600) |
| Dados de rastreio | **IBM Plex Mono** | Código do lote, datas, números de nota. Só dados, nunca frases. |

Escala: título de página `text-4xl` a `text-6xl` com `tracking-[-0.03em]` e `leading-[1.02]`; seção `text-3xl`; corpo `text-base` ou `text-lg` com `leading-relaxed` e no máximo `60ch` de largura.

## Forma

Arredondada como o grão do logo e a geometria da Montserrat e o grão do logo. Regra fixa:
- Botões e chips: `rounded-full`
- Cartões e etiqueta: `rounded-2xl`
- Campos e botões de escala: `rounded-xl`
- Marcadores de nota: círculos (`rounded-full`). Cheio = média de quem bebeu, vazado = ficha do produtor.

Sombra só na etiqueta (é o único objeto "colado"), sempre tingida de marrom. O resto se separa por `caixa` vs `fundo` e por `linha`.

## Componentes base

- **Etiqueta** ([components/Etiqueta.tsx](app/components/Etiqueta.tsx)): assinatura. Levemente girada (-2° a 2°), entra com a animação `colar`.
- **FichaProva** ([components/FichaProva.tsx](app/components/FichaProva.tsx)): escala 1 a 5 por atributo (doçura, acidez, corpo, finalização), comparando o consumidor com a ficha do produtor. É a resposta ao desafio Café com Valor e aparece na landing, no lote e no painel.
- **Nota** ([components/Nota.tsx](app/components/Nota.tsx)): 5 círculos. Nunca estrelas.
- **Botão primário**: `rounded-full bg-marca text-sobre-marca hover:bg-marca-forte apertar`. Secundário: `rounded-full border border-marca text-marca hover:bg-marca hover:text-sobre-marca apertar`.

## Movimento

- Só três animações existem: `colar` (etiqueta, no carregamento), `apertar` (escala 0,97 ao tocar em botões) e `chegar` (nova avaliação entrando no telão de `/apresentar`).
- Curva `--ease-out` (`cubic-bezier(0.23, 1, 0.32, 1)`), até 300 ms.
- Tudo desliga em `prefers-reduced-motion`.
- Nada de animação em scroll, marquee ou loop infinito.

## Impressão

- `/painel/etiqueta/[lote]` imprime 4 etiquetas por A4. Use `sem-impressao` para esconder controles; no papel a etiqueta perde sombra e ganha borda tracejada de recorte.

## Texto

- Português do Brasil, frases curtas, voz ativa, do ponto de vista de quem usa ("Baixar QR", "Enviar avaliação").
- **Sem travessão (—)**. Use ponto, vírgula ou dois-pontos.
- Sem emoji na interface.
- Botão e confirmação usam o mesmo verbo: "Enviar avaliação" leva a "Avaliação enviada".
- Estado vazio diz o que fazer a seguir, e erro diz como resolver.

## Proibido

Fundo creme com serifa e terracota, gradientes, roxo, glassmorphism, três cartões iguais lado a lado, estrelas douradas, eyebrows em caixa alta acima de toda seção, Inter, Fraunces, Poppins, Courgette e qualquer fonte fora das três acima.
