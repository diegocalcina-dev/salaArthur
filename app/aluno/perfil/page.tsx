'use client'
import { useStore } from '@/lib/store'
import { AVATAR_ITEMS } from '@/lib/mock-data'
import { levelFromXP, xpForNextLevel } from '@/lib/utils'

const RARITY_STYLE: Record<string, { borderColor: string; tagBg: string; tagColor: string; tagBorderColor: string; glow: string }> = {
  equipped: { borderColor: 'var(--orange)', tagBg: 'var(--orange)', tagColor: '#fff', tagBorderColor: 'var(--ink)', glow: '0 0 0 1px rgba(255,107,0,.2), 0 0 16px -6px rgba(255,107,0,.5)' },
  rare:     { borderColor: 'var(--rare)', tagBg: 'var(--rare)', tagColor: '#fff', tagBorderColor: 'var(--ink)', glow: '0 0 12px -2px rgba(155,89,182,.6)' },
  exclusive:{ borderColor: 'var(--gold)', tagBg: 'linear-gradient(180deg,#FFDC74,var(--gold))', tagColor: 'var(--ink)', tagBorderColor: 'var(--ink)', glow: '0 0 14px -2px rgba(247,201,72,.7)' },
  locked:   { borderColor: 'var(--border)', tagBg: 'rgba(110,94,155,.18)', tagColor: 'var(--text-dim)', tagBorderColor: 'var(--text-faint)', glow: 'none' },
  base:     { borderColor: 'var(--border)', tagBg: 'transparent', tagColor: 'var(--text-dim)', tagBorderColor: 'var(--border)', glow: 'none' },
}

export default function PerfilPage() {
  const { state, dispatch } = useStore()
  const { child, avatarItems } = state

  const currentLevel = levelFromXP(child.xpTotal)
  const xpForNext = xpForNextLevel(currentLevel)
  const xpProgress = child.xpTotal - xpForNextLevel(currentLevel - 1)
  const xpNeeded = xpForNext - xpForNextLevel(currentLevel - 1)
  const progressPct = Math.min((xpProgress / xpNeeded) * 100, 100)

  const equippedIds = [child.avatarConfig.background, child.avatarConfig.frame, child.avatarConfig.effect, child.avatarConfig.accessory].filter(Boolean)
  const displayItems = AVATAR_ITEMS.slice(0, 6)

  const achievements = [
    { ico: '🔥', name: 'Streak de 5 dias', meta: `Desbloqueado hoje`, done: child.streakDays >= 5 },
    { ico: '⭐', name: 'Primeira semana perfeita', meta: 'Desbloqueado na semana 20', done: child.xpTotal >= 500 },
    { ico: '🏆', name: 'Top 3 da turma', meta: 'Desbloqueado na semana 18', done: child.rankPosition <= 3 },
    { ico: '👑', name: 'Hokage da Turma', meta: 'Seja #1 por 3 semanas seguidas', done: false },
  ]

  return (
    <>
      {/* HEADER */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'linear-gradient(180deg, rgba(23,14,56,.96), rgba(18,11,46,.85))',
        backdropFilter: 'blur(8px)', borderBottom: '1.5px solid var(--border)',
        padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      }}>
        <h1 className="display" style={{ fontSize: 21, color: '#fff' }}>Meu Ninja</h1>
        <button style={{
          fontWeight: 900, fontSize: 12.5, color: 'var(--orange-soft)',
          background: 'rgba(255,107,0,.08)', border: '1.5px solid var(--orange)',
          padding: '8px 15px', borderRadius: 'var(--r-pill)', cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>✏️ Editar</button>
      </header>

      <div style={{ padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* HERO */}
        <section style={{ textAlign: 'center' }}>
          <div style={{
            width: 120, height: 120, margin: '0 auto', borderRadius: '50%', padding: 4, position: 'relative',
            background: 'conic-gradient(from 0deg, var(--gold), #fff, var(--orange), var(--gold))',
            boxShadow: '0 0 26px 1px rgba(247,201,72,.7), 0 0 54px 4px rgba(255,107,0,.35)',
            animation: 'halo 3s ease-in-out infinite',
          }}>
            <div style={{
              width: '100%', height: '100%', borderRadius: '50%',
              background: 'repeating-linear-gradient(45deg, var(--raised) 0 8px, var(--card) 8px 16px)',
              border: '3px solid var(--ink)', display: 'grid', placeItems: 'center', fontSize: 58,
            }}>🥷</div>
            <span style={{
              position: 'absolute', bottom: -2, right: -2,
              fontFamily: 'Anton, sans-serif', fontSize: 13, color: 'var(--ink)',
              background: 'linear-gradient(180deg,#FFDC74,var(--gold))', border: '3px solid var(--ink)',
              borderRadius: 'var(--r-pill)', padding: '4px 10px 3px', lineHeight: 1,
            }}>NV {child.level}</span>
          </div>

          <div style={{ fontWeight: 900, fontSize: 25, marginTop: 16 }}>{child.name}</div>
          <div style={{ marginTop: 8 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '.5px',
              color: '#fff', textShadow: '0 2px 0 rgba(11,6,32,.4)',
              background: 'linear-gradient(180deg, var(--orange-soft), var(--orange))',
              border: '2.5px solid var(--ink)', borderRadius: 'var(--r-pill)', padding: '7px 16px',
              boxShadow: 'var(--glow-orange)',
            }}>🔥 {child.currentTitle}</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-dim)', marginTop: 13 }}>
            Nível <span style={{ color: 'var(--orange-soft)' }}>{child.level}</span> • 🔥 Streak <span style={{ color: 'var(--orange-soft)' }}>{child.streakDays} dias</span>
          </div>

          {/* XP bar */}
          <div style={{ marginTop: 16, textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
              <span style={{ fontSize: 11, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '.5px' }}>Para o Nível {child.level + 1}</span>
              <span style={{ fontSize: 11.5, fontWeight: 900, color: 'var(--gold)' }}>{child.xpTotal} / {xpForNext} XP</span>
            </div>
            <div style={{ height: 18, background: 'var(--bg)', border: '2.5px solid var(--ink)', borderRadius: 'var(--r-pill)', overflow: 'hidden', boxShadow: 'inset 0 2px 6px rgba(0,0,0,.6)' }}>
              <div style={{
                display: 'block', height: '100%', width: `${progressPct}%`, borderRadius: 'var(--r-pill)',
                background: 'linear-gradient(180deg, var(--orange-soft), var(--orange))',
                boxShadow: '0 0 12px 1px rgba(255,107,0,.7)', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(115deg, rgba(255,255,255,.22) 0 5px, transparent 5px 13px)' }} />
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
            <span className="display" style={{ fontSize: 17, color: '#fff', whiteSpace: 'nowrap' }}>Estatísticas</span>
            <span style={{ flex: 1, height: 3, borderRadius: 'var(--r-pill)', background: 'repeating-linear-gradient(115deg, rgba(255,107,0,.5) 0 7px, transparent 7px 13px)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
            {[
              { k: '⭐ XP Total', v: child.xpTotal.toLocaleString('pt-BR'), color: 'var(--xp)' },
              { k: '✅ Missões feitas', v: String(child.xpTotal > 0 ? Math.floor(child.xpTotal / 15) : 0), color: 'var(--success)' },
              { k: '🏆 Melhor ranking', v: `#${child.rankPosition}`, color: 'var(--gold)' },
              { k: '🔥 Maior streak', v: `${child.streakDays} dias`, color: 'var(--orange-soft)' },
            ].map(stat => (
              <div key={stat.k} style={{
                background: 'linear-gradient(180deg, var(--raised), var(--card))',
                border: '1.5px solid var(--border)', borderRadius: 'var(--r-md)',
                padding: 13, boxShadow: 'var(--shadow-card)',
              }}>
                <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 6 }}>{stat.k}</div>
                <div className="num" style={{ fontFamily: 'Anton, sans-serif', fontSize: 24, marginTop: 7, lineHeight: 1, color: stat.color }}>{stat.v}</div>
              </div>
            ))}
          </div>
        </section>

        {/* EQUIPAMENTOS */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
            <span className="display" style={{ fontSize: 17, color: '#fff', whiteSpace: 'nowrap' }}>Equipamentos</span>
            <span style={{ flex: 1, height: 3, borderRadius: 'var(--r-pill)', background: 'repeating-linear-gradient(115deg, rgba(255,107,0,.5) 0 7px, transparent 7px 13px)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 11 }}>
            {displayItems.map(item => {
              const isEquipped = equippedIds.includes(item.id.replace('bg-', '').replace('fr-', '').replace('ef-', '').replace('ac-', ''))
              const rarityKey = isEquipped ? 'equipped' : item.locked ? 'locked' : item.rarity === 'rare' ? 'rare' : item.rarity === 'exclusive' ? 'exclusive' : 'base'
              const rs = RARITY_STYLE[rarityKey]
              return (
                <div key={item.id} style={{
                  background: 'linear-gradient(180deg, var(--raised), var(--card))',
                  border: `2px solid ${rs.borderColor}`,
                  borderRadius: 'var(--r-md)', padding: '11px 8px', textAlign: 'center',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 7,
                  position: 'relative', minHeight: 128, justifyContent: 'space-between',
                  opacity: item.locked ? .55 : 1,
                  boxShadow: rs.glow !== 'none' ? rs.glow : undefined,
                }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 13, border: '2.5px solid var(--ink)',
                    display: 'grid', placeItems: 'center', fontSize: 24,
                    background: 'repeating-linear-gradient(45deg, var(--raised) 0 6px, var(--card) 6px 12px)',
                  }}>{item.emoji}</div>
                  <div style={{ fontWeight: 900, fontSize: 11, lineHeight: 1.15 }}>{item.name}</div>
                  <span style={{
                    fontSize: 8.5, fontWeight: 900, letterSpacing: '.5px', textTransform: 'uppercase',
                    padding: '3px 8px', borderRadius: 'var(--r-pill)', border: `1.5px solid ${rs.tagBorderColor}`,
                    background: rs.tagBg, color: rs.tagColor,
                  }}>
                    {isEquipped ? 'Equipado' : item.locked ? 'Bloqueado' : item.rarity === 'rare' ? 'Raro' : item.rarity === 'exclusive' ? 'Exclusivo' : 'Comum'}
                  </span>
                  {item.locked && item.unlockCondition && (
                    <span style={{ fontSize: 8.5, fontWeight: 800, color: 'var(--text-faint)', lineHeight: 1.2 }}>{item.unlockCondition}</span>
                  )}
                  {!isEquipped && !item.locked && (
                    <button
                      onClick={() => dispatch({ type: 'UPDATE_AVATAR', config: { ...child.avatarConfig, [item.type]: item.id } })}
                      style={{
                        fontSize: 10, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.3px',
                        color: 'var(--orange-soft)', background: 'rgba(255,107,0,.08)', border: '1.5px solid var(--orange)',
                        borderRadius: 'var(--r-pill)', padding: '5px 12px', cursor: 'pointer', width: '100%',
                      }}
                    >Equipar</button>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* CONQUISTAS */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
            <span className="display" style={{ fontSize: 17, color: '#fff', whiteSpace: 'nowrap' }}>Conquistas</span>
            <span style={{ flex: 1, height: 3, borderRadius: 'var(--r-pill)', background: 'repeating-linear-gradient(115deg, rgba(255,107,0,.5) 0 7px, transparent 7px 13px)' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {achievements.map(ach => (
              <div key={ach.name} style={{
                display: 'flex', alignItems: 'center', gap: 12,
                background: 'var(--card)', border: `1.5px solid ${ach.done ? 'var(--border)' : 'var(--border)'}`,
                borderStyle: ach.done ? 'solid' : 'dashed',
                borderRadius: 'var(--r-md)', padding: '12px 13px',
                opacity: ach.done ? 1 : .5,
              }}>
                <div style={{
                  flexShrink: 0, width: 40, height: 40, borderRadius: 11, border: '2px solid var(--ink)',
                  display: 'grid', placeItems: 'center', fontSize: 20,
                  background: ach.done ? 'rgba(255,107,0,.12)' : 'rgba(110,94,155,.14)',
                }}>{ach.ico}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 900, fontSize: 14 }}>{ach.name}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-faint)', marginTop: 2 }}>{ach.meta}</div>
                </div>
                <span style={{ flexShrink: 0, fontSize: 18 }}>{ach.done ? '✅' : '🔒'}</span>
              </div>
            ))}
          </div>
        </section>

      </div>

      <style>{`
        @keyframes halo { 0%,100%{ filter:brightness(1);} 50%{ filter:brightness(1.15);} }
      `}</style>
    </>
  )
}
