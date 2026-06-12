export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ')
}

export function getDaysUntil(dateStr: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateStr)
  target.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - today.getTime()) / 86400000)
}

export function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes}min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h${m}min` : `${h}h`
}

export function formatRelative(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'agora'
  if (mins < 60) return `${mins}min atrás`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h atrás`
  return `${Math.floor(hours / 24)}d atrás`
}

export function getStreakEmoji(streak: number): string {
  if (streak === 0) return '😴'
  if (streak < 3) return '🌱'
  if (streak < 7) return '🔥'
  return '⚡'
}

export function getRankEmoji(rank: number): string {
  if (rank === 1) return '🥇'
  if (rank === 2) return '🥈'
  if (rank === 3) return '🥉'
  return `#${rank}`
}

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'base': return 'text-gray-400'
    case 'common': return 'text-blue-400'
    case 'rare': return 'text-purple-400'
    case 'exclusive': return 'text-yellow-400'
    default: return 'text-gray-400'
  }
}

export function getAvatarBg(background: string): string {
  const bgs: Record<string, string> = {
    space: 'from-indigo-900 to-purple-900',
    forest: 'from-green-800 to-emerald-900',
    ocean: 'from-blue-800 to-cyan-900',
    sunset: 'from-orange-700 to-red-900',
    galaxy: 'from-purple-900 to-pink-900',
    neon: 'from-cyan-800 to-blue-900',
    fire: 'from-red-800 to-orange-900',
  }
  return bgs[background] || bgs.space
}

export function levelFromXP(xp: number): number {
  return Math.floor(Math.sqrt(xp / 50)) + 1
}

export function xpForNextLevel(level: number): number {
  return Math.pow(level, 2) * 50
}
