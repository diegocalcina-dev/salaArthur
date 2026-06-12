export type Role = 'child' | 'parent'

export interface Classroom {
  id: string
  name: string
  inviteCode: string
  mascotLevel: 1 | 2 | 3 | 4 | 5
  mascotXp: number
  mascotXpNeeded: number
}

export interface ChildProfile {
  id: string
  name: string
  role: 'child'
  classroomId: string
  parentId: string
  avatarConfig: AvatarConfig
  xpTotal: number
  xpWeekly: number
  streakDays: number
  level: number
  currentTitle: string
  minutesBank: number
  minutesUsedToday: number
  minutesDailyCap: number
  rankPosition: number
}

export interface ParentProfile {
  id: string
  name: string
  role: 'parent'
  classroomId: string
  childId: string
  email: string
}

export interface AvatarConfig {
  skin: string
  hair: string
  accessory?: string
  background: string
  frame?: string
  effect?: string
}

export type TaskRecurrence = 'once' | 'daily' | 'weekly'
export type TaskSubject =
  | 'Matemática'
  | 'Português'
  | 'Ciências'
  | 'História'
  | 'Geografia'
  | 'Inglês'
  | 'Educação Física'
  | 'Artes'
  | 'Socioemocional'
  | string

export interface Task {
  id: string
  classroomId: string
  createdBy: string
  title: string
  subject: TaskSubject
  description?: string
  xpValue: number
  minutesReward: number
  recurrence: TaskRecurrence
  dueDate?: string
  createdAt: string
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface DailyLesson {
  id: string
  classroomId: string
  dayOfWeek: DayOfWeek
  subject: TaskSubject
  topic: string
  kidSummary?: string
  xpReward: number
}

export interface TaskCompletion {
  id: string
  taskId: string
  childId: string
  completedAt: string
  xpEarned: number
  minutesEarned: number
}

export interface UnlockableApp {
  id: string
  childId: string
  appName: string
  appIcon: string
  costMinutes: number
  isActive: boolean
}

export interface UnlockRequest {
  id: string
  childId: string
  appId: string
  appName: string
  minutesRequested: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}

export interface Exam {
  id: string
  classroomId: string
  createdBy: string
  subject: TaskSubject
  examDate: string
  createdAt: string
}

export interface WeeklyCard {
  id: string
  childId: string
  weekStart: string
  xpEarned: number
  rankPosition: number
  rankChange: number
  streak: number
  title: string
  topSubject: string
  message: string
}

export interface FeedEvent {
  id: string
  classroomId: string
  type: 'rank_up' | 'streak' | 'mascot_level' | 'perfect_week' | 'weekly_card' | 'title'
  childId?: string
  childName?: string
  message: string
  emoji: string
  createdAt: string
  reactions: { emoji: string; count: number; reacted: boolean }[]
}

export interface AvatarItem {
  id: string
  name: string
  type: 'hair' | 'accessory' | 'frame' | 'effect' | 'background'
  rarity: 'base' | 'common' | 'rare' | 'exclusive'
  unlockCondition: string
  locked: boolean
  emoji: string
}

export interface RankingEntry {
  childId: string
  name: string
  avatarConfig: AvatarConfig
  xpWeekly: number
  streakDays: number
  currentTitle: string
  rank: number
  rankChange: number
}

export interface PhysicalReward {
  id: string
  childId: string
  name: string
  xpCost: number
  emoji: string
  isActive: boolean
}

export interface RewardRequest {
  id: string
  childId: string
  rewardId: string
  rewardName: string
  xpCost: number
  status: 'pending' | 'approved' | 'rejected'
  createdAt: string
}
