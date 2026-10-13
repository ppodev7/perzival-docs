# Perzival — sistema de interface

## Direção
Sala escura: quase preto com um fio de violeta, minimalista. Quem usa está no meio de outro trabalho;
o Perzival fica quieto e só "acende" onde a IA age.

## Assinatura
- **Aura** (gradiente roxo `#7c3aed → #9d4edd → #c026d3`): só em ações e estados da IA — Iniciar sessão,
  Documentar, selo "Gerado pela IA", avatar. Botões comuns usam o violeta sólido `--primary`.
- **Rastro**: a fita de evidências na ordem em que foram tiradas, com horário em mono.
  Compacta na biblioteca (`RastroMini`), em quadros na mini janela e na revisão (`RastroFrame`).

## Superfícies (um matiz, só muda a luz)
`--background` 0.145 → `--card` 0.175 → `--popover` 0.205 (oklch, matiz 295).
Tela compartilhada/fundo de diálogo: 0.11.

## Profundidade
Anéis de 1px em `rgba(255,255,255,0.07–0.10)` no lugar de bordas sólidas; sombra só em elementos flutuantes
(mini janela, diálogo).

## Tipografia
Onest (interface) + JetBrains Mono (horários, domínios, atalhos). Base 14px; títulos de página 28px/600 com
tracking negativo; rótulo de seção 12px maiúsculo `--faint-foreground`.

## Texto (4 níveis)
`foreground` · `muted-foreground` · `faint-foreground` · desabilitado (opacity 50%).

## Espaçamento
Base 4px. Páginas `px-10 py-10`, grupos `gap-8`, controles `h-9` (lg `h-11`). Raio: 10px base, 16px no diálogo
e na mini janela.

## Componentes
- Button `aura` — gradiente + anel + brilho violeta; só para IA.
- Mini janela — 300px, raio 16px, `--popover`, arrastável pela alça, timer em mono com ponto pulsando.
