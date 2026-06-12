# TurmaXP — Gamificação Escolar

App mobile de gamificação para crianças em idade escolar. O aluno ganha XP, sobe no ranking da turma e acumula minutos de tempo de tela ao completar missões (lições de casa), ler sobre as aulas do dia e manter uma sequência de dias. Os pais configuram as missões, o cronograma semanal de aulas e aprovam os desbloqueios de apps.

**Piloto ativo:** Escola Criar-te · 5º A — Soldan (aluno) / Diego (pai)

---

## Stack

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js 15.3.3 (App Router) |
| UI | React 19 |
| Estilo | Tailwind CSS v4 (`@import "tailwindcss"`) |
| Estado | React Context + useReducer (sem backend) |
| Linguagem | TypeScript 5 |

> **Sem backend por enquanto.** Todo o estado é em memória (React Context), inicializado com dados mock em `lib/mock-data.ts`. A próxima fase adicionará Supabase.

---

## Design

**Tema:** Naruto × Brawl Stars  
**Paleta principal:**

```
Background:  #120B2E  (roxo profundo)
Card:        #1A1040
Orange:      #FF6B00
Gold:        #F7C948
Ink:         #0B0620  (bordas e sombras duras)
```

Mobile-first, largura fixa de 390px via classe `.phone`. Fonte de display: **Anton** (Google Fonts). Botões com sombra dura estilo ink, glow effects em orange/gold.

---

## Como rodar

```bash
npm install
npm run dev
# acesse http://localhost:3000
```

> **Se aparecer tela em branco:** o servidor travou após muitos hot-reloads.
> Fix: `pkill -f "next dev" && rm -rf .next && npm run dev`

**Credenciais de acesso (demo):**

| Papel | Caminho | Entrada |
|-------|---------|---------|
| Aluno | `/convite` | código `TURMA2025` |
| Pais  | `/login`   | botão "Entrar como Demo" |

---

## Estrutura de pastas

```
turma-xp/
├── app/
│   ├── page.tsx                  # Landing (escolha de papel: aluno / pais)
│   ├── convite/page.tsx          # Entrada por código de convite
│   ├── login/page.tsx            # Login dos pais (magic link + demo)
│   │
│   ├── aluno/                    # Área do aluno
│   │   ├── layout.tsx            # Navbar: Home · Ranking · Perfil · Turma
│   │   ├── page.tsx              # Home: aulas de hoje + checklist de missões
│   │   ├── ranking/page.tsx      # Ranking semanal da turma
│   │   ├── banco/page.tsx        # Banco de chakra (minutos de tela)
│   │   ├── perfil/page.tsx       # Avatar, stats, equipamentos, conquistas
│   │   ├── carta/page.tsx        # Carta semanal com resumo da semana
│   │   └── turma/page.tsx        # Feed da turma com mascote e reações
│   │
│   ├── painel/                   # Área dos pais
│   │   ├── layout.tsx            # Navbar: Início · Missões · Rewards · Aprovações
│   │   ├── page.tsx              # Dashboard: visão geral do dia
│   │   ├── tarefas/page.tsx      # Missões (add/delete) + Cronograma de aulas
│   │   ├── provas/page.tsx       # Gerenciar provas e datas
│   │   ├── recompensas/page.tsx  # Apps desbloqueáveis + prêmios físicos
│   │   └── aprovacoes/page.tsx   # Aprovar/recusar solicitações
│   │
│   ├── api/
│   │   └── export-tasks/route.ts # POST → grava tasks-pending-ai.json (batch AI)
│   │
│   ├── globals.css               # Design tokens, CSS variables, classes globais
│   └── layout.tsx                # Root layout (fontes, meta)
│
├── lib/
│   ├── types.ts                  # Todos os tipos TypeScript
│   ├── mock-data.ts              # Dados demo (CLASSROOM, CHILD, TASKS, DAILY_LESSONS…)
│   ├── store.tsx                 # Context + useReducer — estado global
│   └── utils.ts                  # Helpers: levelFromXP, formatRelative, cn…
│
├── design/
│   └── design_handoff_turmaxp/   # HTMLs do design handoff (referência visual)
│
└── tasks-pending-ai.json         # Arquivo temporário para batch AI (ver fluxo abaixo)
```

---

## Funcionalidades

### Para o Aluno

#### Aulas de Hoje
Cada dia da semana tem um cronograma de aulas definido pelo pai. Para cada aula o aluno vê:
- Matéria e tópico da aula
- Resumo em linguagem de criança (gerado por IA)
- **+5 XP** ao expandir e ler o resumo — não dá pra pular

#### Missões (Lições de Casa)
Lista de tarefas criadas pelo pai. Cada missão tem:
- Título, matéria e descrição do que fazer
- Quando há descrição, o aluno precisa expandir e ler antes de concluir (gating)
- Recompensa em XP + minutos de tempo de tela

#### Banco de Chakra
Minutos acumulados pelas missões concluídas. O aluno solicita desbloqueio de apps (YouTube, Brawl Stars, Roblox…). O pai aprova ou recusa pelo painel.

#### Ranking Semanal
Top 10 da turma por XP semanal. Atualiza em tempo real conforme missões são concluídas.

#### Perfil & Equipamentos
Avatar customizável com backgrounds, molduras e acessórios desbloqueáveis por conquistas (streak, XP total, ranking).

#### Carta Semanal
Resumo gamificado da semana: XP ganho, posição no ranking, streak, título conquistado e histórico das semanas anteriores.

#### Feed da Turma
Mural com eventos da turma (subiu no ranking, streak novo, mascote evoluiu). Alunos podem reagir com emojis.

---

### Para os Pais

#### Dashboard
Visão geral do dia: missões concluídas vs. pendentes, solicitações de desbloqueio esperando aprovação, gráfico semanal de XP do filho.

#### Gerenciar Missões
- Criar tarefas com matéria, título, descrição, XP, minutos e recorrência (uma vez / diária / semanal)
- Deletar tarefas existentes
- Filtrar por matéria

#### Cronograma Semanal
Aba dentro de Missões. Define quais aulas o aluno terá em cada dia da semana (Seg–Sex). O pai informa a matéria e o tópico de cada aula.

#### Batch AI — Resumos de Aulas
Fluxo para gerar resumos em linguagem de criança **sem custo de API**:

```
1. Pai preenche as aulas no Cronograma
2. Pai clica "✨ Gerar com IA" no painel de tarefas
   → chama POST /api/export-tasks
   → salva tasks-pending-ai.json na raiz do projeto
3. Pai diz "gera" no Claude Code
4. Claude lê tasks-pending-ai.json, gera kidSummary para cada aula
5. Claude atualiza lib/mock-data.ts → Next.js hot-reload
6. Aluno já vê os resumos na tela
```

Usa os tokens da assinatura do Claude Code — sem chamar a API diretamente.

#### Gerenciar Provas
Cadastrar provas com matéria e data. Aparece como alerta na home do aluno.

#### Recompensas
- Configurar apps desbloqueáveis e custo em minutos
- Definir prêmios físicos (sorvete, cinema…) com custo em XP

#### Aprovações
Central de solicitações pendentes: desbloqueios de app e recompensas físicas. Aprovar ou recusar em um toque.

---

## Estado Global

```typescript
// lib/store.tsx — shape do estado
{
  role: 'child' | 'parent' | null
  child: ChildProfile
  parent: ParentProfile
  classroom: Classroom
  tasks: Task[]
  completions: TaskCompletion[]
  exams: Exam[]
  apps: UnlockableApp[]
  unlockRequests: UnlockRequest[]
  physicalRewards: PhysicalReward[]
  rewardRequests: RewardRequest[]
  ranking: RankingEntry[]
  feedEvents: FeedEvent[]
  avatarItems: AvatarItem[]
  dailyLessons: DailyLesson[]
  lessonReads: string[]   // IDs de aulas já lidas (evita XP duplo)
  xpAnimation: boolean
}
```

**Actions principais:**

| Action | Payload | Efeito |
|--------|---------|--------|
| `COMPLETE_TASK` | `{ taskId }` | +XP, +minutos banco, atualiza ranking |
| `READ_LESSON` | `{ lessonId }` | +5 XP, +2 min banco |
| `ADD_TASK` | `{ task }` | Cria nova missão |
| `DELETE_TASK` | `{ taskId }` | Remove missão |
| `ADD_LESSON` | `{ lesson }` | Adiciona aula ao cronograma |
| `DELETE_LESSON` | `{ lessonId }` | Remove aula |
| `REQUEST_UNLOCK` | `{ appId }` | Cria solicitação de desbloqueio |
| `APPROVE_UNLOCK` | `{ requestId }` | Pai aprova desbloqueio |
| `REJECT_UNLOCK` | `{ requestId }` | Pai recusa desbloqueio |
| `APPROVE_REWARD` | `{ requestId }` | Pai aprova prêmio físico |
| `REJECT_REWARD` | `{ requestId }` | Pai recusa prêmio físico |
| `UPDATE_AVATAR` | `{ config: AvatarConfig }` | Salva customização do avatar |
| `REACT_TO_FEED` | `{ eventId, emoji }` | Reação no feed da turma |

---

## Matérias

```
Matemática · Português · Ciências · História · Geografia
Inglês · Educação Física · Artes · Socioemocional
```

Cada matéria tem cor e emoji próprios em `globals.css` (classes `.s-mat`, `.s-por`, `.s-cie`, `.s-his`, `.s-geo`, `.s-ing`, `.s-ef`, `.s-art`, `.s-soc`) e em `mock-data.ts` (`SUBJECT_COLORS`, `SUBJECT_EMOJIS`).

---

## Padrões de código

- Componentes dentro de `/aluno` e `/painel` retornam `<>...</>` — o layout pai cuida do `.phone` wrapper
- Páginas standalone (`/convite`, `/login`) rendem o próprio `.phone`
- Animações de tela: `<style>{...}</style>` inline no componente
- Classes compartilhadas: `globals.css` (`.btn-orange`, `.card`, `.navbar`, `.nav-item`, etc.)
- Estilos únicos de elemento: `style={{...}}` inline

---

## Próximas fases

- [ ] Backend real com Supabase (auth, banco de dados, realtime)
- [ ] Múltiplos alunos por turma (hoje é 1:1 pai-filho)
- [ ] Push notifications para aprovações pendentes
- [ ] Upload de foto do cronograma da professora com OCR automático
- [ ] PWA / app nativo (Expo ou Capacitor)

---

## Licença

Privado — projeto piloto em desenvolvimento ativo.
