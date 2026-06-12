'use client'
import { createContext, useContext, useReducer, ReactNode } from 'react'
import type {
  ChildProfile, Task, TaskCompletion, UnlockableApp, UnlockRequest,
  Exam, FeedEvent, AvatarItem, RankingEntry, PhysicalReward,
  RewardRequest, Classroom, ParentProfile, DailyLesson
} from './types'
import {
  CHILD, PARENT, CLASSROOM, TASKS, TASK_COMPLETIONS, UNLOCKABLE_APPS,
  UNLOCK_REQUESTS, EXAMS, FEED_EVENTS, AVATAR_ITEMS, RANKING,
  PHYSICAL_REWARDS, REWARD_REQUESTS, DAILY_LESSONS
} from './mock-data'

interface AppState {
  role: 'child' | 'parent' | null
  child: ChildProfile
  parent: ParentProfile
  classroom: Classroom
  tasks: Task[]
  completions: TaskCompletion[]
  apps: UnlockableApp[]
  unlockRequests: UnlockRequest[]
  exams: Exam[]
  feedEvents: FeedEvent[]
  avatarItems: AvatarItem[]
  ranking: RankingEntry[]
  physicalRewards: PhysicalReward[]
  rewardRequests: RewardRequest[]
  dailyLessons: DailyLesson[]
  lessonReads: string[]
  xpAnimation: { taskId: string; xp: number } | null
}

type Action =
  | { type: 'SET_ROLE'; role: 'child' | 'parent' }
  | { type: 'COMPLETE_TASK'; taskId: string }
  | { type: 'CLEAR_XP_ANIMATION' }
  | { type: 'REQUEST_UNLOCK'; appId: string }
  | { type: 'APPROVE_UNLOCK'; requestId: string }
  | { type: 'REJECT_UNLOCK'; requestId: string }
  | { type: 'ADD_TASK'; task: Omit<Task, 'id' | 'createdAt'> }
  | { type: 'DELETE_TASK'; taskId: string }
  | { type: 'ADD_EXAM'; exam: Omit<Exam, 'id' | 'createdAt'> }
  | { type: 'DELETE_EXAM'; examId: string }
  | { type: 'TOGGLE_APP'; appId: string }
  | { type: 'ADD_APP'; app: Omit<UnlockableApp, 'id'> }
  | { type: 'UPDATE_AVATAR'; config: ChildProfile['avatarConfig'] }
  | { type: 'REACT_TO_FEED'; eventId: string; emoji: string }
  | { type: 'REQUEST_REWARD'; rewardId: string }
  | { type: 'APPROVE_REWARD'; requestId: string }
  | { type: 'REJECT_REWARD'; requestId: string }
  | { type: 'READ_LESSON'; lessonId: string }
  | { type: 'ADD_LESSON'; lesson: Omit<DailyLesson, 'id'> }
  | { type: 'DELETE_LESSON'; lessonId: string }
  | { type: 'UPDATE_LESSON_SUMMARY'; lessonId: string; kidSummary: string }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'SET_ROLE':
      return { ...state, role: action.role }

    case 'COMPLETE_TASK': {
      const task = state.tasks.find(t => t.id === action.taskId)
      if (!task) return state
      const completion: TaskCompletion = {
        id: `tc-${Date.now()}`,
        taskId: task.id,
        childId: state.child.id,
        completedAt: new Date().toISOString(),
        xpEarned: task.xpValue,
        minutesEarned: task.minutesReward,
      }
      const newXpWeekly = state.child.xpWeekly + task.xpValue
      const newRanking = state.ranking.map(r =>
        r.childId === state.child.id ? { ...r, xpWeekly: newXpWeekly } : r
      ).sort((a, b) => b.xpWeekly - a.xpWeekly).map((r, i) => ({ ...r, rank: i + 1 }))
      return {
        ...state,
        completions: [...state.completions, completion],
        child: {
          ...state.child,
          xpTotal: state.child.xpTotal + task.xpValue,
          xpWeekly: newXpWeekly,
          minutesBank: state.child.minutesBank + task.minutesReward,
        },
        ranking: newRanking,
        xpAnimation: { taskId: task.id, xp: task.xpValue },
      }
    }

    case 'CLEAR_XP_ANIMATION':
      return { ...state, xpAnimation: null }

    case 'REQUEST_UNLOCK': {
      const app = state.apps.find(a => a.id === action.appId)
      if (!app) return state
      const req: UnlockRequest = {
        id: `req-${Date.now()}`,
        childId: state.child.id,
        appId: app.id,
        appName: app.appName,
        minutesRequested: app.costMinutes,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }
      return { ...state, unlockRequests: [...state.unlockRequests, req] }
    }

    case 'APPROVE_UNLOCK': {
      const req = state.unlockRequests.find(r => r.id === action.requestId)
      if (!req) return state
      return {
        ...state,
        unlockRequests: state.unlockRequests.map(r =>
          r.id === action.requestId ? { ...r, status: 'approved' } : r
        ),
        child: {
          ...state.child,
          minutesBank: Math.max(0, state.child.minutesBank - req.minutesRequested),
          minutesUsedToday: state.child.minutesUsedToday + req.minutesRequested,
        },
      }
    }

    case 'REJECT_UNLOCK':
      return {
        ...state,
        unlockRequests: state.unlockRequests.map(r =>
          r.id === action.requestId ? { ...r, status: 'rejected' } : r
        ),
      }

    case 'ADD_TASK': {
      const newTask: Task = {
        ...action.task,
        id: `task-${Date.now()}`,
        createdAt: new Date().toISOString(),
      }
      return { ...state, tasks: [...state.tasks, newTask] }
    }

    case 'DELETE_TASK':
      return { ...state, tasks: state.tasks.filter(t => t.id !== action.taskId) }

    case 'ADD_EXAM': {
      const newExam: Exam = {
        ...action.exam,
        id: `exam-${Date.now()}`,
        createdAt: new Date().toISOString(),
      }
      return { ...state, exams: [...state.exams, newExam] }
    }

    case 'DELETE_EXAM':
      return { ...state, exams: state.exams.filter(e => e.id !== action.examId) }

    case 'TOGGLE_APP':
      return {
        ...state,
        apps: state.apps.map(a => a.id === action.appId ? { ...a, isActive: !a.isActive } : a),
      }

    case 'ADD_APP': {
      const newApp: UnlockableApp = { ...action.app, id: `app-${Date.now()}` }
      return { ...state, apps: [...state.apps, newApp] }
    }

    case 'UPDATE_AVATAR':
      return { ...state, child: { ...state.child, avatarConfig: action.config } }

    case 'REACT_TO_FEED':
      return {
        ...state,
        feedEvents: state.feedEvents.map(e => {
          if (e.id !== action.eventId) return e
          const hasReaction = e.reactions.find(r => r.emoji === action.emoji)
          if (hasReaction) {
            return {
              ...e,
              reactions: e.reactions.map(r =>
                r.emoji === action.emoji
                  ? { ...r, count: r.reacted ? r.count - 1 : r.count + 1, reacted: !r.reacted }
                  : r
              ),
            }
          }
          return { ...e, reactions: [...e.reactions, { emoji: action.emoji, count: 1, reacted: true }] }
        }),
      }

    case 'REQUEST_REWARD': {
      const reward = state.physicalRewards.find(r => r.id === action.rewardId)
      if (!reward) return state
      const req: RewardRequest = {
        id: `rr-${Date.now()}`,
        childId: state.child.id,
        rewardId: reward.id,
        rewardName: reward.name,
        xpCost: reward.xpCost,
        status: 'pending',
        createdAt: new Date().toISOString(),
      }
      return { ...state, rewardRequests: [...state.rewardRequests, req] }
    }

    case 'APPROVE_REWARD': {
      const req = state.rewardRequests.find(r => r.id === action.requestId)
      if (!req) return state
      return {
        ...state,
        rewardRequests: state.rewardRequests.map(r =>
          r.id === action.requestId ? { ...r, status: 'approved' } : r
        ),
        child: {
          ...state.child,
          xpTotal: Math.max(0, state.child.xpTotal - req.xpCost),
        },
      }
    }

    case 'REJECT_REWARD':
      return {
        ...state,
        rewardRequests: state.rewardRequests.map(r =>
          r.id === action.requestId ? { ...r, status: 'rejected' } : r
        ),
      }

    case 'READ_LESSON': {
      if (state.lessonReads.includes(action.lessonId)) return state
      const lesson = state.dailyLessons.find(l => l.id === action.lessonId)
      if (!lesson) return state
      const newXpWeekly = state.child.xpWeekly + lesson.xpReward
      const newRanking = state.ranking.map(r =>
        r.childId === state.child.id ? { ...r, xpWeekly: newXpWeekly } : r
      ).sort((a, b) => b.xpWeekly - a.xpWeekly).map((r, i) => ({ ...r, rank: i + 1 }))
      return {
        ...state,
        lessonReads: [...state.lessonReads, action.lessonId],
        child: {
          ...state.child,
          xpTotal: state.child.xpTotal + lesson.xpReward,
          xpWeekly: newXpWeekly,
          minutesBank: state.child.minutesBank + 2,
        },
        ranking: newRanking,
        xpAnimation: { taskId: action.lessonId, xp: lesson.xpReward },
      }
    }

    case 'ADD_LESSON':
      return {
        ...state,
        dailyLessons: [...state.dailyLessons, { ...action.lesson, id: `les-${Date.now()}` }],
      }

    case 'DELETE_LESSON':
      return { ...state, dailyLessons: state.dailyLessons.filter(l => l.id !== action.lessonId) }

    case 'UPDATE_LESSON_SUMMARY':
      return {
        ...state,
        dailyLessons: state.dailyLessons.map(l =>
          l.id === action.lessonId ? { ...l, kidSummary: action.kidSummary } : l
        ),
      }

    default:
      return state
  }
}

const initialState: AppState = {
  role: null,
  child: CHILD,
  parent: PARENT,
  classroom: CLASSROOM,
  tasks: TASKS,
  completions: TASK_COMPLETIONS,
  apps: UNLOCKABLE_APPS,
  unlockRequests: UNLOCK_REQUESTS,
  exams: EXAMS,
  feedEvents: FEED_EVENTS,
  avatarItems: AVATAR_ITEMS,
  ranking: RANKING,
  physicalRewards: PHYSICAL_REWARDS,
  rewardRequests: REWARD_REQUESTS,
  dailyLessons: DAILY_LESSONS,
  lessonReads: [],
  xpAnimation: null,
}

const StoreContext = createContext<{
  state: AppState
  dispatch: React.Dispatch<Action>
} | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}

export function isTaskCompleted(taskId: string, completions: TaskCompletion[]) {
  const today = new Date().toISOString().split('T')[0]
  return completions.some(
    c => c.taskId === taskId && c.completedAt.startsWith(today)
  )
}
