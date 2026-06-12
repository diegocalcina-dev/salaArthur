'use client'
import { useState } from 'react'
import { useStore } from '@/lib/store'
import { AVATAR_ITEMS } from '@/lib/mock-data'
import { getAvatarBg, getRarityColor, cn, formatTime } from '@/lib/utils'

type Tab = 'background' | 'frame' | 'accessory' | 'effect'
const TABS: { key: Tab; label: string; emoji: string }[] = [
  { key: 'background', label: 'Fundo', emoji: '🌌' },
  { key: 'frame', label: 'Moldura', emoji: '🖼️' },
  { key: 'accessory', label: 'Item', emoji: '🎧' },
  { key: 'effect', label: 'Efeito', emoji: '✨' },
]

export default function AvatarPage() {
  const { state, dispatch } = useStore()
  const { child, apps, unlockRequests } = state
  const [tab, setTab] = useState<Tab>('background')
  const [selectedAvatar, setSelectedAvatar] = useState(child.avatarConfig)

  const tabItems = AVATAR_ITEMS.filter(i => i.type === tab)

  function saveAvatar() {
    dispatch({ type: 'UPDATE_AVATAR', config: selectedAvatar })
  }

  return (
    <div className="px-4 py-2 flex flex-col gap-4">
      {/* Preview do avatar */}
      <div className={`glass-card p-6 flex flex-col items-center gap-3 bg-gradient-to-br ${getAvatarBg(selectedAvatar.background)}`}>
        {/* Frame */}
        <div className={`relative w-24 h-24 rounded-full bg-gradient-to-br ${getAvatarBg(selectedAvatar.background)} border-4 ${
          selectedAvatar.frame === 'gold' ? 'border-yellow-400 shadow-lg shadow-yellow-400/30' :
          selectedAvatar.frame === 'diamond' ? 'border-cyan-400 shadow-lg shadow-cyan-400/30' :
          selectedAvatar.frame === 'silver' ? 'border-gray-300' : 'border-white/20'
        } flex items-center justify-center`}>
          <span className="text-4xl font-black text-white">{child.name.charAt(0)}</span>
          {/* Effect */}
          {selectedAvatar.effect === 'stars' && (
            <div className="absolute inset-0 rounded-full overflow-hidden">
              {['✨', '⭐', '✨'].map((s, i) => (
                <span key={i} className="absolute text-sm animate-pulse" style={{
                  top: `${20 + i * 30}%`, left: `${10 + i * 40}%`
                }}>{s}</span>
              ))}
            </div>
          )}
          {/* Accessory */}
          {selectedAvatar.accessory === 'headphone' && (
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-lg">🎧</div>
          )}
          {selectedAvatar.accessory === 'glasses' && (
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 text-base">👓</div>
          )}
          {selectedAvatar.accessory === 'crown' && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg">👑</div>
          )}
        </div>
        <div className="text-center">
          <div className="text-white font-black text-xl">{child.name}</div>
          <div className="text-white/60 text-sm">{child.currentTitle}</div>
          <div className="text-yellow-400 text-xs font-bold mt-1">⚡ {child.xpTotal} XP total</div>
        </div>
      </div>

      {/* Salvar */}
      <button
        onClick={saveAvatar}
        className="w-full py-3 rounded-2xl gradient-brand font-bold text-white"
      >
        Salvar Avatar ✓
      </button>

      {/* Apps desbloqueáveis */}
      <div>
        <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2 px-1">
          ⏱️ Solicitar tempo de tela
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {apps.filter(a => a.isActive).map(app => {
            const hasPending = unlockRequests.some(r => r.appId === app.id && r.status === 'pending')
            const canAfford = child.minutesBank >= app.costMinutes
            return (
              <div key={app.id} className="shrink-0 glass-card p-3 flex flex-col items-center gap-2 min-w-[80px]">
                <span className="text-3xl">{app.appIcon}</span>
                <span className="text-white text-xs font-bold">{app.appName}</span>
                <span className="text-teal-400 text-xs">{formatTime(app.costMinutes)}</span>
                <button
                  disabled={!canAfford || hasPending}
                  onClick={() => dispatch({ type: 'REQUEST_UNLOCK', appId: app.id })}
                  className={cn(
                    'px-2 py-1 rounded-lg text-xs font-bold transition-all',
                    hasPending ? 'bg-yellow-500/20 text-yellow-400' :
                    canAfford ? 'gradient-time text-white' :
                    'bg-white/5 text-white/30'
                  )}
                >
                  {hasPending ? 'Aguardando' : canAfford ? 'Pedir' : 'Sem saldo'}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Tabs de customização */}
      <div>
        <div className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-2 px-1">
          🎭 Personalizar avatar
        </div>
        <div className="flex gap-2 mb-3">
          {TABS.map(t => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                'flex-1 py-2 rounded-xl text-xs font-bold transition-all',
                tab === t.key ? 'gradient-brand text-white' : 'glass text-white/50'
              )}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2">
          {tabItems.map(item => {
            const isSelected = (
              (item.type === 'background' && selectedAvatar.background === item.id.replace('bg-', '')) ||
              (item.type === 'frame' && selectedAvatar.frame === item.id.replace('fr-', '')) ||
              (item.type === 'accessory' && selectedAvatar.accessory === item.id.replace('ac-', '')) ||
              (item.type === 'effect' && selectedAvatar.effect === item.id.replace('ef-', ''))
            )
            return (
              <button
                key={item.id}
                disabled={item.locked}
                onClick={() => {
                  const slug = item.id.replace(/^(bg|fr|ac|ef)-/, '')
                  setSelectedAvatar(prev => ({
                    ...prev,
                    ...(item.type === 'background' ? { background: slug } : {}),
                    ...(item.type === 'frame' ? { frame: slug } : {}),
                    ...(item.type === 'accessory' ? { accessory: slug } : {}),
                    ...(item.type === 'effect' ? { effect: slug } : {}),
                  }))
                }}
                className={cn(
                  'glass-card p-3 flex flex-col items-center gap-1 transition-all',
                  isSelected && 'border-purple-400/60 bg-purple-900/30',
                  item.locked && 'opacity-50'
                )}
              >
                <span className="text-2xl">{item.emoji}</span>
                <span className="text-white text-xs font-bold truncate w-full text-center">{item.name}</span>
                <span className={`text-xs ${getRarityColor(item.rarity)}`}>
                  {item.locked ? '🔒' : item.rarity}
                </span>
                {item.locked && (
                  <span className="text-white/30 text-[10px] text-center leading-tight">{item.unlockCondition}</span>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
