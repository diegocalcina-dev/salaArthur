# Handoff: TurmaXP — App Gamificado de Tarefas Escolares

## Overview
**TurmaXP** é um app mobile (390px, mobile-first) que gamifica tarefas escolares para crianças de ~10 anos no Brasil. Tema visual: fusão **Naruto × Brawl Stars** — energia laranja ninja, contornos pretos grossos, fundo espacial roxo, tipografia condensada bold. O app tem duas áreas: a **área da criança** (vibrante, gamer) e o **painel dos pais** (mesma paleta, tom mais sóbrio e informacional).

Sistema central: a criança completa **missões** (tarefas) → ganha **XP** e **minutos de tempo de tela** (banco de tempo/"chakra") → sobe no **ranking da turma** → recebe uma **carta semanal** compartilhável. Os pais criam missões, configuram recompensas e aprovam desbloqueios.

## About the Design Files
Os arquivos `.html` deste pacote são **referências de design criadas em HTML/CSS** — protótipos que mostram a aparência e o comportamento pretendidos, **não código de produção para copiar diretamente**. A tarefa é **recriar estes designs no ambiente do codebase alvo** (React Native, Flutter, React web, SwiftUI, etc.), usando os padrões, componentes e bibliotecas já estabelecidos nele. Se ainda não houver ambiente definido, escolha o framework mais apropriado (para um app mobile infantil, **React Native / Expo** ou **Flutter** são recomendados) e implemente lá.

Cada tela é um arquivo independente e autossuficiente (HTML + CSS inline, fontes via Google Fonts, sem build).

## Fidelity
**Alta fidelidade (hifi).** Cores, tipografia, espaçamentos, raios, sombras e estados estão finalizados e devem ser reproduzidos fielmente. Os valores exatos estão na seção **Design Tokens**. Animações são indicativas — replicar o espírito, ajustando à plataforma.

---

## Design Tokens

### Cores — Marca
| Token | Hex | Uso |
|---|---|---|
| `orange` | `#FF6B00` | Primária (Naruto orange) — ações, destaques |
| `orange-deep` | `#E15400` | Sombra/borda inferior dos botões laranja |
| `orange-soft` | `#FF8A3D` | Topo de gradientes, texto de destaque |
| `gold` | `#F7C948` | Secundária (Brawl gold) — recompensas |
| `gold-deep` | `#D9A516` | Sombra do dourado |

### Cores — Fundos
| Token | Hex | Uso |
|---|---|---|
| `bg` | `#120B2E` | Fundo principal (roxo espacial profundo) |
| `bg-2` | `#170E38` | Variação de fundo (headers) |
| `card` | `#1E1240` | Superfície de card |
| `raised` | `#2A1B50` | Superfície elevada |
| `border` | `#3D2A70` | Borda padrão de card |
| `ink` | `#0B0620` | Preto-tinta para CONTORNOS (estilo Brawl) |

### Cores — Texto
| Token | Hex |
|---|---|
| `text` | `#FFFFFF` |
| `text-dim` | `#B8A9D9` (secundário) |
| `text-faint` | `#6E5E9B` (terciário/labels) |

### Cores — Semânticas
| Token | Hex | Uso |
|---|---|---|
| `success` | `#4CAF50` | Tarefa feita |
| `xp` | `#FFD700` | XP / moedas |
| `rare` | `#9B59B6` | Itens raros |
| `danger` | `#E74C3C` | Urgência / prova / excluir |
| `amber` | `#F7A93B` | Alertas / solicitações pendentes |

### Cores — Matérias (badges)
| Matéria | Hex |
|---|---|
| Matemática | `#3D7BFF` (azul) |
| Português | `#34C759` (verde) |
| Ciências | `#9B59B6` (roxo) |
| História | `#F7A93B` (amber) |

### Raridades (avatares / itens)
- **Comum**: prata/cinza `#8893A6`→`#C9D2E0`
- **Raro**: roxo `#9B59B6`
- **Épico**: laranja→dourado
- **Lendário/Exclusivo**: dourado→branco→laranja (conic-gradient)

### Tipografia
- **Display / Títulos**: `Anton` (Google Fonts) — condensada, sempre UPPERCASE, `letter-spacing: .5px`, `line-height: ~1`. Usada em títulos de tela, nomes de missão, números grandes.
- **Corpo / UI**: `Nunito` (Google Fonts), pesos 400/600/700/800/900. Alta legibilidade no escuro.
- **Números (XP, ranking)**: Nunito `font-weight: 900`, `font-variant-numeric: tabular-nums`. Números "heróicos" (saldo, contadores) usam Anton.
- Escala: títulos de tela ~21px Anton; números gigantes 46–84px; corpo 13–15px; labels 10–11px uppercase.

### Raios de borda
`sm: 10px` · `md: 16px` · `lg: 20px` · `pill: 999px`

### Contorno (assinatura visual Brawl)
Elementos de destaque (botões, chips, avatares, barras) têm **contorno sólido `2–3px` na cor `ink` (#0B0620)**. Ex.: `border: 2.5px solid #0B0620`.

### Sombras (coloridas, NUNCA cinza)
- **Glow laranja** (botão primário): `0 5px 0 #E15400, 0 12px 22px -8px rgba(255,107,0,.6)` — note a sombra dura inferior (efeito "botão 3D" que afunda no `:active`).
- **Glow ouro**: `0 6px 0 #D9A516, 0 14px 26px -8px rgba(247,201,72,.55)`
- **Profundidade de card**: `0 10px 26px -14px rgba(0,0,0,.7)`
- Padrão de botão: ao `:active`, `transform: translateY(3–4px)` e reduz a sombra dura (parece pressionado).

### Efeitos de assinatura
- **Speed lines ninja**: `repeating-linear-gradient(115deg, rgba(255,107,0,.06) 0 10px, transparent 10px 22px)` como textura sutil em fundos de destaque.
- **Barra de progresso estilo Brawl**: trilho escuro com contorno ink, preenchimento laranja com `box-shadow` glow + listras diagonais animadas por dentro.
- **Estrelas/partículas** flutuando em fundos de splash.

---

## Layout Geral
- **Largura de design fixa: 390px** (mobile). Centralizar com `max-width: 390px; margin: 0 auto`.
- **Navbar inferior** (área da criança) fixa: 4 itens — 🏠 Home, 🏆 Ranking, 👤 Perfil, 💬 Turma. Item ativo em laranja com indicador (barra) embaixo. Altura ~72px + safe-area.
- **Painel dos pais**: SEM navbar inferior — usa header com botão voltar (←) ou hamburger.
- Headers geralmente `position: sticky; top: 0` com blur.
- Espaçamento de conteúdo: padding lateral 16px, gap vertical entre seções 14–20px.

---

## Screens / Views

> Cada tela abaixo corresponde a um arquivo HTML na pasta `screens/`. Atributos `data-screen-label` no HTML marcam as seções.

### 1. Design System (`TurmaXP Design System.html`)
Página de referência com TODOS os tokens e componentes renderizados: paleta, tipografia, raios, sombras, e os 9 componentes base (card de missão, botões, chips XP, badges de matéria, barra de progresso, avatares por raridade, ranking/troféu, animação de XP ganho). **Use como fonte de verdade visual.**

### 2. Home — Criança (`TurmaXP Home.html`)
- **Header (sticky)**: avatar com anel laranja + selo "NV 7"; nome "Naruto Uzumaki" + título "🔥 Rei da Sequência"; chip dourado "⭐ 340 XP na semana".
- **Banco de tempo**: card laranja/dourado em destaque, borda dourada **pulsando** (animação), relógio, "47 min", botão "Usar agora".
- **Missões do Dia**: título com underline diagonal ninja + contador "2/4". 4 cards de tarefa empilhados:
  - Pendente (borda laranja): badge matéria, título, chip "+XP", botão "Concluir missão".
  - Pendente + prova (borda vermelha): badge extra vermelho "⚠️ Prova em 2 dias", XP bônus.
  - Concluído (×2): card dimmed (opacity .62), borda tracejada, título riscado, check ✅, "+XP ganhos", sem botão.
- **Mini ranking**: top 3 + linha do usuário destacada (8º, borda laranja) + botão "Ver ranking completo →".
- **Navbar** (Home ativo).

### 3. Ranking / Arena (`TurmaXP Ranking.html`)
- **Header**: "ARENA DA TURMA 5ºB" (5ºB em laranja), subtítulo "Semana 23 • Reinicia em 3 dias", badge "AO VIVO 🔴" (ponto pulsando).
- **Pódio Top 3**: plataformas em alturas escalonadas (1º central/laranja/mais alta com coroa flutuante + glow pulsante e anel dourado; 2º prata; 3º bronze). Cada um: avatar, badge de posição, nome, XP, título. Fundo com speed lines + "chão da arena".
- **Lista (4º+)**: linhas com posição, avatar, nome + título, XP, indicador de variação (▲ verde / ▼ vermelho / —). **Usuário (4º) destacado em laranja com tag "VOCÊ".** Lista até 10º.
- **Card "Sua posição" (fixo acima da navbar)**: borda laranja, "#4", "340 XP • Streak 🔥 12 dias", "Faltam 380 XP para o 3º lugar", mini barra de progresso (você → próximo).
- **Navbar** (Ranking ativo).

### 4. Banco de Chakra (`TurmaXP Banco de Chakra.html`)
Conceito "loja de jutsu": gasta minutos para desbloquear apps.
- **Header**: ← + "BANCO DE CHAKRA" + subtítulo.
- **Saldo principal**: card borda laranja, número gigante "47 min" com contorno ink + drop-shadow, "disponíveis agora"; barra de uso do dia ("23 de 60 min").
- **Apps (grid 2 col)**: "Escolha seu poder". Cards YouTube / Brawl Stars / Roblox / Spotify com ícone placeholder, nome, custo "🕐 X min", botão "Solicitar". Estados: **ativo** (laranja) vs **desabilitado** (cinza, ex. "🔒 Faltam 2 min" quando saldo insuficiente).
- **Solicitação pendente**: card âmbar, ampulheta, "Solicitação enviada para mamãe", "YouTube — 30 min", "Aguardando aprovação…" (3 dots animados).
- **Histórico de hoje** (colapsável): linhas app + minutos usados + horário.
- **Navbar**.

### 5. Perfil / Meu Ninja (`TurmaXP Perfil.html`)
- **Header**: "MEU NINJA" + botão "✏️ Editar".
- **Avatar + dados**: avatar 120px com halo dourado pulsante + selo "NV 7"; nome grande; título em badge laranja; "Nível 7 • 🔥 Streak 12 dias"; barra de XP para o próximo nível ("1.840 / 2.000 XP").
- **Estatísticas (grid 2×2)**: XP Total 12.480; Tarefas feitas 147; Melhor ranking #1 (semana 18); Maior streak 18 dias.
- **Equipamentos (grid 3 col)**: itens com estados por raridade — Equipado (borda laranja + badge), Raro (roxo), Bloqueado (opaco + condição "Alcance nível 10"), desbloqueado-não-equipado (botão "Equipar"), Exclusivo (dourado + condição), base.
- **Conquistas (lista)**: desbloqueadas (✅ + quando) e bloqueada (opaca, tracejada, 🔒 + condição).
- **Navbar** (Perfil ativo).

### 6. Carta Semanal (`TurmaXP Carta Semanal.html`)
Card épico gerado todo domingo, pensado para virar imagem de compartilhamento (WhatsApp).
- **Header**: "CARTA DA SEMANA" + "Semana 23 • 2 a 8 de junho".
- **A Carta** (elemento principal, autossuficiente): borda dourada 3px, fundo gradiente escuro com decoração ninja sutil; topo com logo TurmaXP + "5ºB • Semana 23"; avatar central com borda de raridade; nome; título em badge laranja grande; **grid de stats 2×2** (XP Semanal 340; Posição #4 ▲1 em verde; Streak 12 dias; Matéria top Matemática); mensagem personalizada; rodapé "turma-xp.app".
- **Ações**: botão verde WhatsApp "📤 Compartilhar no WhatsApp"; botão outline "⬇️ Salvar imagem".
- **Semanas anteriores**: carrossel horizontal scrollável de cartas menores (semana, raridade, XP, posição).
- **Navbar**.

### 7. Feed da Turma (`TurmaXP Feed da Turma.html`)
"Jornal da sala" — conquistas automáticas dos colegas, sem posts manuais.
- **Header**: "TURMA 5ºB" + mini mascote (NV 3).
- **Status do mascote**: card laranja, mascote "Kurama Jr." (NV 3/5), barra de progresso (68%, faltam 25 tarefas), texto motivacional.
- **Feed (cronológico)**: cards de evento com avatar, badge de tipo (🏆 Novo #1 / 🔥 Streak / 🎉 Turma / ✅ Semana Perfeita / ⭐ Carta), timestamp, texto, **reações** (👏 🔥 ⭐ 💪 com contagem + botão "＋"). Evento coletivo (mascote evoluiu) tem **destaque dourado**. Card do usuário tem borda laranja e CTA inline "Ver minha carta →".
- **Barra de reação flutuante** (demo): pílula com 👏 🔥 ⭐ 💪 que aparece ao tocar num card.
- **Navbar** (Turma ativo).

### 8. Gerenciar Missões — Pais (`TurmaXP Gerenciar Tarefas.html`)
- **Header**: ← + "MISSÕES DO NARUTO" + botão "➕ Nova".
- **Filtros (chips scrolláveis)**: Todas (ativo) / Hoje / Esta semana / Recorrentes.
- **Lista de tarefas**: cards com badges de tipo (Diária azul / Única amber / Semanal roxo) + badge matéria (+ badge vermelho "Prova em 2 dias" quando urgente); título; linha de frequência/data; recompensas (⭐ XP + 🕐 min, com "bônus" quando aplicável); rodapé com status (✅ Feita verde / ⏳ Pendente amarelo) + ações (✏️ editar, ⏸️ pausar, 🗑️ excluir).
- **Bottom sheet "Nova Missão"** (mostrado aberto sobre a lista, com overlay escuro): handle de arraste; campos — Nome (input), Matéria (chips selecionáveis), XP (stepper 5/10/15/20/25/30), Minutos de recompensa (stepper 5/10/15/20), Frequência (radios: Uma vez / Todo dia útil / Toda semana), Data (input, se "Uma vez"); botão "Criar missão" (laranja, largo).

### 9. Configurar Recompensas — Pais (`TurmaXP Configurar Recompensas.html`)
- **Header**: ← + "CONFIGURAR RECOMPENSAS".
- **Teto diário**: card, valor grande "60 min", controle segmentado 30/60/90/120 (60 ativo) + texto explicativo.
- **Apps que pode desbloquear**: cards com ícone, nome, "Custo por uso" com stepper (− valor +), **toggle Ativo/Pausado** (verde/cinza), ação excluir. Roblox mostra estado pausado ("⏸️ Pausado até sexta"). Botão tracejado "➕ Adicionar app".
- **Prêmios especiais (físicos)**: cards "🍦 Sorvete — 500 XP", "🎮 Jogar 1h com o pai — 300 XP", "🍕 Pizza — 800 XP", cada um com toggle + editar. Botão "➕ Adicionar prêmio".
- **Aprovação manual**: card destaque laranja, "Exigir minha aprovação para cada desbloqueio", toggle ligado (badge "✓ Recomendado"), texto explicativo.

### 10. Entrada por Código — Onboarding Criança (`TurmaXP Entrada Codigo.html`)
Primeira tela da criança — épica, "entrar na vila ninja". SEM navbar.
- **Splash (topo ~300px)**: portal de chakra — raios conic-gradient laranja e azul girando, anéis pulsantes, núcleo "🍥" flutuante com glow, partículas flutuando. (Decorativo; sem personagens reais.)
- **Texto**: logo "TurmaXP" grande com contorno; tagline "A arena ninja da sua turma"; badge "5ºB • Colégio Konoha".
- **OTP**: label "CÓDIGO DA MISSÃO"; 6 caixas individuais (preenchidas mostram caractere dourado; ativa tem borda laranja + caret piscando; vazias neutras); hint "🔑 Peça o código para seus pais".
- **Botão "ENTRAR NA ARENA"**: laranja, largo, Anton, com borda pulsando.
- Link inferior "Sou pai ou mãe →".

### 11. Login dos Pais (`TurmaXP Login Pais.html`)
Tom sóbrio/confiável. SEM navbar. Fluxo magic link.
- **Topo**: escudo 🛡️ laranja; logo TurmaXP (menor); "Painel dos Responsáveis".
- **Formulário**: label "SEU E-MAIL"; input email; texto "Vamos enviar um link mágico. Sem senha para lembrar."; botão "ENVIAR LINK DE ACESSO" (laranja, largo).
- **Estado pós-envio** (mostrado como card secundário): envelope ✉️ laranja; "Link enviado para ana@email.com"; instrução; botão outline "↻ Reenviar link".
- **Rodapé**: "Primeira vez? Criar conta"; "Sou criança →"; nota de privacidade "🔒".

---

## Interactions & Behavior
- **Botões**: efeito 3D — sombra dura inferior; ao `:active` afundam (`translateY(3–4px)` + sombra reduzida). Transição ~0.08–0.12s.
- **Concluir missão** (Home): deve disparar animação de XP ganho (ver Design System "animação de XP" — burst + speed lines + número subindo). Atualizar barra de XP/nível.
- **Banco de Chakra**: "Solicitar" envia solicitação ao painel dos pais → estado "pendente"; pai aprova/recusa no Dashboard.
- **Toggles** (pais): on = verde com knob à direita; off = cinza com knob à esquerda. Transição do knob ~0.2s.
- **Bottom sheet**: entra deslizando de baixo (`translateY(100%)→0`, ~0.35s, easing suave); overlay escurece o fundo; arrastável pelo handle; scroll interno se exceder a altura.
- **Filtros / chips / steppers / radios**: estado selecionado destaca com cor de marca + borda ink.
- **Barra de reação** (Feed): aparece com pop (scale + fade) ao tocar num card; emojis ampliam no toque.
- **Carrosséis** (cartas anteriores): scroll horizontal com snap.
- **OTP**: caixa ativa pisca caret; preencher avança para a próxima.
- **Animações decorativas** (pulsos, halos, partículas, speed lines): respeitar `prefers-reduced-motion` — desativar/atenuar.

## State Management
Estados/variáveis sugeridos (adaptar ao framework):
- **Usuário/criança**: nome, nível, xpAtual, xpProxNivel, streakDias, avatarId, tituloAtual, itensEquipados[].
- **Missões**: lista com {id, titulo, materia, tipo(diária/única/semanal), xp, minutos, bônus?, frequência, data?, status(pendente/feita), horárioConclusão?}.
- **Banco de tempo**: saldoMin, tetoDiarioMin, usadoHojeMin, histórico[].
- **Apps**: lista {id, nome, custoMin, ativo, motivoPausa?}.
- **Solicitações**: {appId, minutos, status(pendente/aprovada/recusada)} → conecta criança ↔ painel dos pais.
- **Ranking**: lista da turma {posição, nome, xpSemana, variação, avatar, título}; posição do usuário.
- **Carta semanal**: gerada por semana {semana, xpSemana, posição, variação, streak, materiaTop, mensagem, raridade}.
- **Feed**: eventos automáticos {tipo, ator, texto, timestamp, reações{emoji:count}}.
- **Mascote da turma**: nível, progresso%, tarefasParaEvoluir.
- **Prêmios físicos**: {id, nome, custoXP, ativo}.
- **Config pais**: tetoDiario, aprovaçãoManual(bool).
- **Auth**: emailPai (magic link), códigoConvite (criança).

## Responsive Behavior
Design é mobile 390px. Para web, manter coluna central `max-width: 390–430px`. Para nativo, usar a largura do device e escalar tipografia/spacing proporcionalmente. Garantir alvos de toque ≥ 44px (crianças).

## Assets
- **Fontes**: Anton + Nunito (Google Fonts). No app nativo, empacotar as fontes equivalentes.
- **Ícones de app** (YouTube, Brawl Stars, Roblox, Spotify): nos protótipos são **placeholders CSS** (retângulos coloridos). Substituir pelos logos/ícones oficiais conforme licenciamento, ou ícones próprios.
- **Emojis** (🥷🦊🏆⭐🔥 etc.): usados como elementos visuais e avatares mock. Em produção, considerar um set de ilustrações/avatares próprios do TurmaXP (a identidade é original, inspirada na vibe — não usar personagens de Naruto/Brawl Stars por direitos autorais).
- **Avatares**: placeholders com gradiente listrado + emoji. Substituir por sistema de avatares customizáveis.

## Files
Pasta `screens/` contém os 11 arquivos HTML listados acima. Cada um é autossuficiente (abrir no navegador para ver a referência viva). Atributos `data-screen-label` demarcam seções dentro de cada tela. O arquivo `TurmaXP Design System.html` é a referência canônica de tokens e componentes.

## Notas finais
- A identidade visual é **original**, inspirada na *energia/vibe* de Naruto e Brawl Stars — **não** reproduzir logos, personagens ou UI proprietária dessas marcas.
- Priorizar acessibilidade: contraste alto (já garantido na paleta escura), alvos de toque generosos, `prefers-reduced-motion`.
- A "assinatura" do visual está em 3 coisas: **contorno ink grosso**, **sombras coloridas duras (botão 3D)** e **speed lines/glow laranja**. Manter esses três = manter a marca.
