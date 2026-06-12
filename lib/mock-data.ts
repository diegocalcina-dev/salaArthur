import type {
  Classroom, ChildProfile, ParentProfile, Task, TaskCompletion,
  UnlockableApp, Exam, WeeklyCard, FeedEvent, AvatarItem,
  RankingEntry, UnlockRequest, PhysicalReward, RewardRequest, DailyLesson
} from './types'

export const CLASSROOM: Classroom = {
  id: 'cls-1',
  name: '5º A — Escola Criar-te',
  inviteCode: 'TURMA2025',
  mascotLevel: 2,
  mascotXp: 340,
  mascotXpNeeded: 500,
}

export const CHILD: ChildProfile = {
  id: 'child-1',
  name: 'Soldan',
  role: 'child',
  classroomId: 'cls-1',
  parentId: 'parent-1',
  avatarConfig: {
    skin: 'light',
    hair: 'black',
    accessory: 'headphone',
    background: 'space',
    frame: 'silver',
  },
  xpTotal: 1240,
  xpWeekly: 285,
  streakDays: 5,
  level: 8,
  currentTitle: 'Rei da Sequência',
  minutesBank: 75,
  minutesUsedToday: 30,
  minutesDailyCap: 120,
  rankPosition: 2,
}

export const PARENT: ParentProfile = {
  id: 'parent-1',
  name: 'Diego',
  role: 'parent',
  classroomId: 'cls-1',
  childId: 'child-1',
  email: 'carlos@email.com',
}

const today = new Date().toISOString().split('T')[0]
const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

export const TASKS: Task[] = [
  {
    id: 'task-1',
    classroomId: 'cls-1',
    createdBy: 'parent-1',
    title: 'Lição de Matemática pág. 45',
    subject: 'Matemática',
    description: 'Livro azul de Matemática, página 45. Fazer os exercícios 1 ao 8 (todos). Mostre as contas no caderno, não só o resultado.',
    xpValue: 15,
    minutesReward: 10,
    recurrence: 'once',
    dueDate: today,
    createdAt: yesterday,
  },
  {
    id: 'task-2',
    classroomId: 'cls-1',
    createdBy: 'parent-1',
    title: 'Ler capítulo 3 de Português',
    subject: 'Português',
    description: 'Livro de Português (capa verde), capítulo 3: "O Sítio do Picapau Amarelo". Ler as páginas 28 a 35 e responder as 3 perguntas do final do capítulo no caderno.',
    xpValue: 10,
    minutesReward: 8,
    recurrence: 'once',
    dueDate: today,
    createdAt: yesterday,
  },
  {
    id: 'task-3',
    classroomId: 'cls-1',
    createdBy: 'parent-1',
    title: 'Estudar para prova de Ciências',
    subject: 'Ciências',
    description: 'Prova na quinta-feira! Revisar os capítulos 4 e 5 do livro: Sistema Solar e Fases da Lua. Prestar atenção nos nomes dos planetas em ordem e nas fases da lua (nova, crescente, cheia, minguante).',
    xpValue: 30,
    minutesReward: 20,
    recurrence: 'once',
    dueDate: today,
    createdAt: yesterday,
  },
  {
    id: 'task-4',
    classroomId: 'cls-1',
    createdBy: 'parent-1',
    title: 'Exercícios de Inglês (Unit 5)',
    subject: 'Inglês',
    description: 'Workbook de Inglês, Unit 5 "My Daily Routine". Completar as atividades A, B e C nas páginas 42 e 43. A atividade D é opcional (vale bônus!).',
    xpValue: 12,
    minutesReward: 8,
    recurrence: 'weekly',
    dueDate: today,
    createdAt: yesterday,
  },
  {
    id: 'task-5',
    classroomId: 'cls-1',
    createdBy: 'parent-1',
    title: 'Resumo de História — Era Vargas',
    subject: 'História',
    description: 'Fazer um resumo de meia página sobre a Era Vargas (1930-1945). Incluir: quando foi, quem era Vargas, e 2 coisas importantes que aconteceram. Pode usar o livro (págs. 67-72) ou as anotações do caderno.',
    xpValue: 20,
    minutesReward: 15,
    recurrence: 'once',
    dueDate: today,
    createdAt: yesterday,
  },
]

export const TASK_COMPLETIONS: TaskCompletion[] = [
  {
    id: 'tc-1',
    taskId: 'task-2',
    childId: 'child-1',
    completedAt: new Date().toISOString(),
    xpEarned: 10,
    minutesEarned: 8,
  },
]

export const UNLOCKABLE_APPS: UnlockableApp[] = [
  { id: 'app-1', childId: 'child-1', appName: 'YouTube', appIcon: '▶️', costMinutes: 20, isActive: true },
  { id: 'app-2', childId: 'child-1', appName: 'Brawl Stars', appIcon: '⚔️', costMinutes: 30, isActive: true },
  { id: 'app-3', childId: 'child-1', appName: 'Roblox', appIcon: '🎮', costMinutes: 25, isActive: true },
  { id: 'app-4', childId: 'child-1', appName: 'TikTok', appIcon: '🎵', costMinutes: 15, isActive: false },
]

export const UNLOCK_REQUESTS: UnlockRequest[] = [
  {
    id: 'req-1',
    childId: 'child-1',
    appId: 'app-2',
    appName: 'Brawl Stars',
    minutesRequested: 30,
    status: 'pending',
    createdAt: new Date().toISOString(),
  },
]

export const PHYSICAL_REWARDS: PhysicalReward[] = [
  { id: 'pr-1', childId: 'child-1', name: 'Sorvete 🍦', xpCost: 50, emoji: '🍦', isActive: true },
  { id: 'pr-2', childId: 'child-1', name: 'Pizza no jantar 🍕', xpCost: 100, emoji: '🍕', isActive: true },
  { id: 'pr-3', childId: 'child-1', name: 'Cinema 🎬', xpCost: 200, emoji: '🎬', isActive: true },
  { id: 'pr-4', childId: 'child-1', name: 'Passeio no shopping 🛍️', xpCost: 150, emoji: '🛍️', isActive: true },
]

export const REWARD_REQUESTS: RewardRequest[] = []

const nextWeek = new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0]
const nextWeek2 = new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0]
const nextWeek3 = new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0]

export const EXAMS: Exam[] = [
  {
    id: 'exam-1',
    classroomId: 'cls-1',
    createdBy: 'parent-1',
    subject: 'Ciências',
    examDate: nextWeek,
    createdAt: yesterday,
  },
  {
    id: 'exam-2',
    classroomId: 'cls-1',
    createdBy: 'parent-1',
    subject: 'Matemática',
    examDate: nextWeek2,
    createdAt: yesterday,
  },
  {
    id: 'exam-3',
    classroomId: 'cls-1',
    createdBy: 'parent-1',
    subject: 'História',
    examDate: nextWeek3,
    createdAt: yesterday,
  },
]

export const RANKING: RankingEntry[] = [
  { childId: 'c-1', name: 'Ana Paula', avatarConfig: { skin: 'medium', hair: 'brown', background: 'galaxy', frame: 'gold', effect: 'stars' }, xpWeekly: 420, streakDays: 7, currentTitle: 'Semana Perfeita', rank: 1, rankChange: 0 },
  { childId: 'child-1', name: 'Soldan', avatarConfig: { skin: 'light', hair: 'black', accessory: 'headphone', background: 'space', frame: 'silver' }, xpWeekly: 285, streakDays: 5, currentTitle: 'Rei da Sequência', rank: 2, rankChange: 2 },
  { childId: 'c-3', name: 'Lucas', avatarConfig: { skin: 'dark', hair: 'curly', background: 'forest' }, xpWeekly: 240, streakDays: 3, currentTitle: 'Em Missão', rank: 3, rankChange: -1 },
  { childId: 'c-4', name: 'Mariana', avatarConfig: { skin: 'light', hair: 'blonde', background: 'sunset' }, xpWeekly: 190, streakDays: 4, currentTitle: 'Mestre de Português', rank: 4, rankChange: 1 },
  { childId: 'c-5', name: 'Gabriel', avatarConfig: { skin: 'medium', hair: 'red', background: 'ocean' }, xpWeekly: 160, streakDays: 2, currentTitle: 'Voltou por Cima', rank: 5, rankChange: 3 },
  { childId: 'c-6', name: 'Sofia', avatarConfig: { skin: 'light', hair: 'black', background: 'neon' }, xpWeekly: 145, streakDays: 1, currentTitle: 'Em Missão', rank: 6, rankChange: -2 },
  { childId: 'c-7', name: 'Matheus', avatarConfig: { skin: 'dark', hair: 'short', background: 'fire' }, xpWeekly: 120, streakDays: 3, currentTitle: 'Em Missão', rank: 7, rankChange: 0 },
  { childId: 'c-8', name: 'Isabela', avatarConfig: { skin: 'medium', hair: 'long', background: 'galaxy' }, xpWeekly: 95, streakDays: 0, currentTitle: 'Em Missão', rank: 8, rankChange: -3 },
  { childId: 'c-9', name: 'Rafael', avatarConfig: { skin: 'light', hair: 'brown', background: 'space' }, xpWeekly: 80, streakDays: 1, currentTitle: 'Em Missão', rank: 9, rankChange: 1 },
  { childId: 'c-10', name: 'Camila', avatarConfig: { skin: 'medium', hair: 'black', background: 'forest' }, xpWeekly: 60, streakDays: 0, currentTitle: 'Em Missão', rank: 10, rankChange: -1 },
]

export const WEEKLY_CARD: WeeklyCard = {
  id: 'card-1',
  childId: 'child-1',
  weekStart: '2025-06-02',
  xpEarned: 285,
  rankPosition: 2,
  rankChange: 2,
  streak: 5,
  title: 'Rei da Sequência',
  topSubject: 'Matemática',
  message: 'Soldan foi incrível essa semana! Subiu 2 posições no ranking e manteve uma sequência de 5 dias seguidos. Continue assim! 🔥',
}

export const FEED_EVENTS: FeedEvent[] = [
  {
    id: 'feed-1',
    classroomId: 'cls-1',
    type: 'rank_up',
    childId: 'c-5',
    childName: 'Gabriel',
    message: 'Gabriel subiu 3 posições no ranking! 🚀',
    emoji: '🚀',
    createdAt: new Date(Date.now() - 600000).toISOString(),
    reactions: [
      { emoji: '👏', count: 8, reacted: false },
      { emoji: '🔥', count: 5, reacted: true },
      { emoji: '⭐', count: 3, reacted: false },
    ],
  },
  {
    id: 'feed-2',
    classroomId: 'cls-1',
    type: 'streak',
    childId: 'c-1',
    childName: 'Ana Paula',
    message: 'Ana Paula completou 7 dias seguidos! 🔥',
    emoji: '🔥',
    createdAt: new Date(Date.now() - 1800000).toISOString(),
    reactions: [
      { emoji: '👏', count: 15, reacted: true },
      { emoji: '🔥', count: 12, reacted: false },
      { emoji: '💪', count: 7, reacted: false },
    ],
  },
  {
    id: 'feed-3',
    classroomId: 'cls-1',
    type: 'mascot_level',
    message: 'O mascote da turma evoluiu para o Nível 2! 🎉',
    emoji: '🎉',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
    reactions: [
      { emoji: '🎉', count: 22, reacted: false },
      { emoji: '⭐', count: 18, reacted: true },
      { emoji: '👏', count: 20, reacted: false },
    ],
  },
  {
    id: 'feed-4',
    classroomId: 'cls-1',
    type: 'title',
    childId: 'c-1',
    childName: 'Ana Paula',
    message: 'Ana Paula ganhou o título "Semana Perfeita" 🏆',
    emoji: '🏆',
    createdAt: new Date(Date.now() - 7200000).toISOString(),
    reactions: [
      { emoji: '👏', count: 19, reacted: false },
      { emoji: '⭐', count: 14, reacted: false },
      { emoji: '💪', count: 9, reacted: false },
    ],
  },
  {
    id: 'feed-5',
    classroomId: 'cls-1',
    type: 'perfect_week',
    childId: 'child-1',
    childName: 'Soldan',
    message: 'Soldan está em fogo — 5 dias seguidos de tarefas! 💪',
    emoji: '💪',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    reactions: [
      { emoji: '🔥', count: 11, reacted: false },
      { emoji: '💪', count: 8, reacted: false },
      { emoji: '⭐', count: 6, reacted: true },
    ],
  },
]

export const AVATAR_ITEMS: AvatarItem[] = [
  // Base items
  { id: 'bg-space', name: 'Espaço', type: 'background', rarity: 'base', unlockCondition: '', locked: false, emoji: '🌌' },
  { id: 'bg-forest', name: 'Floresta', type: 'background', rarity: 'base', unlockCondition: '', locked: false, emoji: '🌲' },
  { id: 'bg-ocean', name: 'Oceano', type: 'background', rarity: 'base', unlockCondition: '', locked: false, emoji: '🌊' },
  { id: 'bg-sunset', name: 'Pôr do Sol', type: 'background', rarity: 'common', unlockCondition: '100 XP total', locked: false, emoji: '🌅' },
  { id: 'bg-galaxy', name: 'Galáxia', type: 'background', rarity: 'rare', unlockCondition: 'Top 3 do ranking', locked: true, emoji: '🔮' },
  { id: 'bg-neon', name: 'Neon', type: 'background', rarity: 'rare', unlockCondition: 'Streak de 7 dias', locked: true, emoji: '⚡' },
  { id: 'bg-fire', name: 'Fogo', type: 'background', rarity: 'exclusive', unlockCondition: 'Semana perfeita', locked: true, emoji: '🔥' },
  // Frames
  { id: 'fr-silver', name: 'Moldura Prata', type: 'frame', rarity: 'common', unlockCondition: '200 XP total', locked: false, emoji: '🥈' },
  { id: 'fr-gold', name: 'Moldura Ouro', type: 'frame', rarity: 'rare', unlockCondition: 'Top 3 do ranking', locked: true, emoji: '🥇' },
  { id: 'fr-diamond', name: 'Moldura Diamante', type: 'frame', rarity: 'exclusive', unlockCondition: '1º lugar no ranking', locked: true, emoji: '💎' },
  // Effects
  { id: 'ef-stars', name: 'Estrelas', type: 'effect', rarity: 'rare', unlockCondition: 'Streak de 7 dias', locked: true, emoji: '✨' },
  { id: 'ef-fire', name: 'Chamas', type: 'effect', rarity: 'exclusive', unlockCondition: 'Semana Perfeita', locked: true, emoji: '🔥' },
  // Accessories
  { id: 'ac-headphone', name: 'Fone de Ouvido', type: 'accessory', rarity: 'base', unlockCondition: '', locked: false, emoji: '🎧' },
  { id: 'ac-glasses', name: 'Óculos', type: 'accessory', rarity: 'common', unlockCondition: '50 XP em Inglês', locked: false, emoji: '👓' },
  { id: 'ac-crown', name: 'Coroa', type: 'accessory', rarity: 'exclusive', unlockCondition: '1º lugar 3 semanas', locked: true, emoji: '👑' },
]

export const DAILY_LESSONS: DailyLesson[] = [
  // Segunda (1)
  {
    id: 'les-1', classroomId: 'cls-1', dayOfWeek: 1,
    subject: 'Ciências', topic: 'Erosão fluvial, marinha e glacial',
    kidSummary: 'A erosão é quando a água, o mar ou o gelo vão desgastando a terra pouquinho a pouquinho. Um rio que corre no mesmo lugar por anos vai cavando fundo — é assim que surgem cânions e cachoeiras! Hoje você vai aprender como cada tipo de erosão acontece na natureza. 🌊',
    xpReward: 5,
  },
  {
    id: 'les-2', classroomId: 'cls-1', dayOfWeek: 1,
    subject: 'Educação Física', topic: 'Jogos coletivos',
    kidSummary: 'Hoje é dia de jogar! Na aula de Ed. Física você vai participar de jogos em grupo que envolvem movimento, trabalho em equipe e muita diversão. Vista o tênis e prepare-se para correr! ⚽',
    xpReward: 5,
  },
  {
    id: 'les-3', classroomId: 'cls-1', dayOfWeek: 1,
    subject: 'Português', topic: 'Os jogos em textos de notícias e cartum',
    kidSummary: 'Sabia que os jogos aparecem em textos também? Você vai aprender a ler notícias esportivas (que contam o que aconteceu em campeonatos) e cartuns (desenhos engraçados com uma mensagem). Dois tipos de texto bem diferentes, mas os dois super interessantes! 📰',
    xpReward: 5,
  },
  // Terça (2)
  {
    id: 'les-4', classroomId: 'cls-1', dayOfWeek: 2,
    subject: 'Ciências', topic: 'Sistema Solar: planetas e órbitas',
    kidSummary: 'O Sol fica no centro e 8 planetas giram ao redor dele — esse caminho que eles fazem se chama órbita! Em ordem do mais perto ao mais longe: Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno, Urano e Netuno. Dica de memorização: "Minha Vó Tem Muita Jóia, Sabe? Uma Novidade!" 🪐',
    xpReward: 5,
  },
  {
    id: 'les-5', classroomId: 'cls-1', dayOfWeek: 2,
    subject: 'Matemática', topic: 'Operações com frações de mesmo denominador',
    kidSummary: 'Quando duas frações têm o mesmo número embaixo (denominador igual), somar e subtrair é fácil demais! Exemplo: 1/4 + 2/4 = 3/4. Você só soma os números de cima e deixa o de baixo igual. É como juntar fatias da mesma pizza! 🍕',
    xpReward: 5,
  },
  {
    id: 'les-6', classroomId: 'cls-1', dayOfWeek: 2,
    subject: 'Inglês', topic: 'Rotina diária: verbos de ação',
    kidSummary: 'Em inglês, a gente usa verbos de ação para falar o que fazemos todo dia: wake up (acordar), brush teeth (escovar os dentes), eat breakfast (tomar café), go to school (ir à escola). Hoje você vai aprender a contar sua rotina em inglês! 🇬🇧',
    xpReward: 5,
  },
  // Quarta (3)
  {
    id: 'les-7', classroomId: 'cls-1', dayOfWeek: 3,
    subject: 'História', topic: 'Era Vargas: o Estado Novo',
    kidSummary: 'Getúlio Vargas governou o Brasil de 1930 a 1945. O "Estado Novo" foi o período mais rígido do governo dele — ele controlava jornais e rádios e não havia eleições. Hoje você vai entender como foi esse tempo importante da história do Brasil! 🏛️',
    xpReward: 5,
  },
  {
    id: 'les-8', classroomId: 'cls-1', dayOfWeek: 3,
    subject: 'Português', topic: 'Pontuação: vírgula e ponto e vírgula',
    kidSummary: 'A vírgula (,) faz uma pausa rápida, como numa lista: "Comprei maçã, banana e uva." O ponto e vírgula (;) faz uma pausa um pouco maior, separando ideias relacionadas. Hoje você vai aprender a usar os dois do jeito certo! ✍️',
    xpReward: 5,
  },
  {
    id: 'les-9', classroomId: 'cls-1', dayOfWeek: 3,
    subject: 'Artes', topic: 'Arte moderna brasileira: Tarsila do Amaral',
    kidSummary: 'Tarsila do Amaral foi uma pintora brasileira famosa dos anos 1920. Ela pintou obras incríveis com cores vivas e formas que parecem de sonho. O "Abaporu" — que ela pintou de presente de aniversário para o marido — é um dos quadros mais famosos do Brasil! 🎨',
    xpReward: 5,
  },
  // Quinta (4)
  {
    id: 'les-10', classroomId: 'cls-1', dayOfWeek: 4,
    subject: 'História', topic: 'Povos indígenas atualmente',
    kidSummary: 'Hoje existem mais de 300 povos indígenas no Brasil, cada um com sua língua, cultura e tradições únicas. Muitos lutam para preservar suas terras e costumes. Você vai aprender como vivem esses povos no Brasil de hoje e quais são seus direitos! 🌿',
    xpReward: 5,
  },
  {
    id: 'les-11', classroomId: 'cls-1', dayOfWeek: 4,
    subject: 'Inglês', topic: 'Seasons and weather',
    kidSummary: 'Seasons = estações do ano: Spring (primavera), Summer (verão), Autumn (outono), Winter (inverno). Weather = o tempo: sunny (ensolarado), rainy (chuvoso), cold (frio), hot (quente). Você vai aprender a perguntar e responder: "What\'s the weather like today?" ☀️',
    xpReward: 5,
  },
  {
    id: 'les-12', classroomId: 'cls-1', dayOfWeek: 4,
    subject: 'Matemática', topic: 'Adição e subtração de frações com denominadores diferentes',
    kidSummary: 'Quando as frações têm números diferentes embaixo, precisamos "igualar" antes de somar. Exemplo: 1/2 + 1/3 → o denominador comum é 6 → fica 3/6 + 2/6 = 5/6. Parece difícil agora, mas com prática você pega o jeito rapidinho! ➗',
    xpReward: 5,
  },
  {
    id: 'les-13', classroomId: 'cls-1', dayOfWeek: 4,
    subject: 'História', topic: 'Direito à terra dos povos indígenas',
    kidSummary: 'Uma das questões mais importantes para os povos indígenas é o direito de ficar nas terras onde vivem há milhares de anos. A Constituição brasileira de 1988 garantiu esse direito. Hoje você vai entender por que a terra é tão sagrada para esses povos! 🏕️',
    xpReward: 5,
  },
  // Sexta (5)
  {
    id: 'les-14', classroomId: 'cls-1', dayOfWeek: 5,
    subject: 'Matemática', topic: 'Multiplicação de fração por número inteiro e divisão',
    kidSummary: 'Para multiplicar uma fração por um número inteiro, é simples: multiplica só o número de cima e deixa o de baixo igual. Exemplo: 2/3 × 4 = 8/3. Para dividir, inverte o número inteiro e multiplica! Hoje você vai praticar os dois e ver como é fácil. ✖️',
    xpReward: 5,
  },
]

export const SUBJECT_COLORS: Record<string, string> = {
  'Matemática':     'from-blue-500 to-blue-700',
  'Português':      'from-green-500 to-green-700',
  'Ciências':       'from-teal-500 to-teal-700',
  'História':       'from-yellow-500 to-orange-500',
  'Geografia':      'from-emerald-500 to-emerald-700',
  'Inglês':         'from-purple-500 to-purple-700',
  'Educação Física':'from-red-500 to-red-700',
  'Artes':          'from-pink-500 to-pink-700',
  'Socioemocional': 'from-cyan-500 to-cyan-700',
}

export const SUBJECT_EMOJIS: Record<string, string> = {
  'Matemática':     '🔢',
  'Português':      '📖',
  'Ciências':       '🔬',
  'História':       '🏛️',
  'Geografia':      '🌍',
  'Inglês':         '🇬🇧',
  'Educação Física':'⚽',
  'Artes':          '🎨',
  'Socioemocional': '🧠',
}

export const MASCOT_LEVELS = [
  { level: 1, name: 'Filhote', emoji: '🐣', description: 'Acabou de nascer!' },
  { level: 2, name: 'Crescendo', emoji: '🐥', description: '50% das tarefas concluídas em uma semana' },
  { level: 3, name: 'Forte', emoji: '🦅', description: '70% das tarefas em 2 semanas seguidas' },
  { level: 4, name: 'Poderoso', emoji: '🦁', description: '85% das tarefas em 3 semanas seguidas' },
  { level: 5, name: 'Lendário', emoji: '🐉', description: 'Semana 100% completa pela turma!' },
]
