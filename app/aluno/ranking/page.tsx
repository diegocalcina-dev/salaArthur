'use client'
import { useStore } from '@/lib/store'
import { RANKING, CLASSROOM } from '@/lib/mock-data'

const AV_EMOJI: Record<string, string> = {
  'c-1': '🦊', 'child-1': '🥷', 'c-3': '🐺', 'c-4': '🌸',
  'c-5': '🐢', 'c-6': '⚡', 'c-7': '🐲', 'c-8': '🌙',
  'c-9': '🦈', 'c-10': '🌺',
}

const DELTA_COLOR = { up: '#4CAF50', down: '#E74C3C', same: 'var(--text-faint)' }

export default function RankingPage() {
  const { state } = useStore()
  const { child } = state

  const top3 = RANKING.slice(0, 3)
  const rest = RANKING.slice(3)
  const myEntry = RANKING.find(r => r.childId === child.id)
  const above = myEntry ? RANKING.find(r => r.rank === myEntry.rank - 1) : null
  const xpToNext = above ? above.xpWeekly - child.xpWeekly : 0
  const progress = above ? (child.xpWeekly / above.xpWeekly) * 100 : 100

  const podiumOrder = [top3[1], top3[0], top3[2]]
  const podiumStyle = [
    { avSize: 62, faceSize: 28, badgeSize: 26, badgeFontSize: 14, platformH: 54, platformFontSize: 24, platformColor: 'linear-gradient(180deg, #5f6b82, #313850)', glowColor: 'rgba(201,210,224,.6)', ring: 'conic-gradient(from 0deg, #8893A6, #C9D2E0, #8893A6)' },
    { avSize: 82, faceSize: 40, badgeSize: 30, badgeFontSize: 16, platformH: 78, platformFontSize: 34, platformColor: 'linear-gradient(180deg, var(--orange), #7a3500)', glowColor: 'rgba(247,201,72,.85)', ring: 'conic-gradient(from 0deg, var(--gold), #fff, var(--orange), var(--gold))', crown: true, nameFontSize: 17, xpFontSize: 20 },
    { avSize: 56, faceSize: 25, badgeSize: 26, badgeFontSize: 14, platformH: 40, platformFontSize: 20, platformColor: 'linear-gradient(180deg, #D08B4E, #5e3818)', glowColor: 'rgba(208,139,78,.6)', ring: 'conic-gradient(from 0deg, #9A5F2E, #D08B4E, #9A5F2E)' },
  ]
  const podiumRanks = [2, 1, 3]
  const podiumBadgeBg = [
    'linear-gradient(180deg,#fff,#C9D2E0)',
    'linear-gradient(180deg,#FFDC74,var(--gold))',
    'linear-gradient(180deg,#E8B587,#D08B4E)',
  ]
  const podiumNumLabel = [top3[1]?.rank ?? 2, top3[0]?.rank ?? 1, top3[2]?.rank ?? 3]

  return (
    <>
      {/* HEADER */}
      <header style={{
        position: 'relative', zIndex: 5,
        padding: '16px 16px 12px',
        display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12,
      }}>
        <div>
          <h1 className="display" style={{ fontSize: 25, color: '#fff' }}>
            Arena da Turma
          </h1>
          <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-dim)', marginTop: 5 }}>
            {CLASSROOM.name}
          </div>
        </div>
        <span style={{
          flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 11, fontWeight: 900, letterSpacing: '.5px', textTransform: 'uppercase', color: '#fff',
          background: 'rgba(231,76,60,.14)', border: '2px solid var(--danger)',
          borderRadius: 'var(--r-pill)', padding: '5px 11px 5px 9px',
        }}>
          <span style={{
            width: 9, height: 9, borderRadius: '50%', background: 'var(--danger)',
            boxShadow: '0 0 0 0 rgba(231,76,60,.7)', animation: 'liveBlink 1.4s ease-in-out infinite',
          }} />
          Ao vivo
        </span>
      </header>

      {/* PODIUM */}
      <section style={{
        position: 'relative', margin: '6px 12px 0', padding: '14px 6px 0',
        borderRadius: 'var(--r-lg) var(--r-lg) 0 0', overflow: 'hidden',
      }}>
        {/* Speed lines bg */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'repeating-linear-gradient(115deg, rgba(255,107,0,.06) 0 10px, transparent 10px 22px)',
          WebkitMaskImage: 'linear-gradient(180deg, #000 0%, transparent 75%)',
          maskImage: 'linear-gradient(180deg, #000 0%, transparent 75%)',
        }} />

        <div style={{ position: 'relative', zIndex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 8 }}>
          {[0, 1, 2].map((pi) => {
            const entry = podiumOrder[pi]
            const pst = podiumStyle[pi]
            const rank = podiumRanks[pi]
            if (!entry) return null
            const isCenter = pi === 1
            return (
              <div key={pi} style={{ flex: isCenter ? 1.15 : 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Avatar */}
                <div style={{
                  position: 'relative', borderRadius: '50%', padding: 3,
                  width: pst.avSize, height: pst.avSize,
                  background: pst.ring,
                  boxShadow: `0 0 12px -2px ${pst.glowColor}`,
                  ...(isCenter ? { animation: 'champGlow 2.4s ease-in-out infinite' } : {}),
                }}>
                  {isCenter && (
                    <span style={{
                      position: 'absolute', top: -26, left: '50%', transform: 'translateX(-50%)',
                      fontSize: 30, filter: 'drop-shadow(0 3px 6px rgba(247,201,72,.7))',
                      animation: 'bob 2.4s ease-in-out infinite',
                    }}>👑</span>
                  )}
                  <div style={{
                    width: '100%', height: '100%', borderRadius: '50%',
                    background: 'repeating-linear-gradient(45deg, var(--raised) 0 7px, var(--card) 7px 14px)',
                    border: '2.5px solid var(--ink)', display: 'grid', placeItems: 'center',
                    fontSize: pst.faceSize,
                  }}>{AV_EMOJI[entry.childId] ?? '🥷'}</div>
                </div>

                {/* Rank badge */}
                <div style={{
                  marginTop: -12, position: 'relative', zIndex: 2,
                  fontFamily: 'Anton, sans-serif', fontSize: pst.badgeFontSize, color: 'var(--ink)',
                  border: '2.5px solid var(--ink)', borderRadius: 'var(--r-pill)',
                  width: pst.badgeSize, height: pst.badgeSize, display: 'grid', placeItems: 'center',
                  background: podiumBadgeBg[pi],
                }}>{podiumNumLabel[pi]}</div>

                <div style={{ fontWeight: 900, fontSize: isCenter ? 17 : 14, color: '#fff', marginTop: 6, textAlign: 'center' }}>{entry.name.split(' ')[0]}</div>
                <div className="num" style={{ fontFamily: 'Anton, sans-serif', fontSize: isCenter ? 20 : 15, color: 'var(--xp)', marginTop: 1 }}>{entry.xpWeekly}</div>
                <div style={{ fontSize: 9.5, fontWeight: 900, color: isCenter ? 'var(--orange-soft)' : 'var(--text-dim)', marginTop: 4, textAlign: 'center' }}>
                  {entry.currentTitle}
                </div>

                {/* Platform */}
                <div style={{
                  width: '100%', marginTop: 9,
                  border: '2.5px solid var(--ink)', borderBottom: 'none',
                  borderRadius: '10px 10px 0 0',
                  display: 'grid', placeItems: 'center',
                  fontFamily: 'Anton, sans-serif', color: 'rgba(255,255,255,.85)',
                  textShadow: '0 2px 0 rgba(0,0,0,.35)',
                  height: pst.platformH, fontSize: pst.platformFontSize,
                  background: pst.platformColor,
                  ...(isCenter ? { boxShadow: 'inset 0 3px 0 rgba(255,255,255,.25)' } : {}),
                }}>{rank}</div>
              </div>
            )
          })}
        </div>
      </section>
      <div style={{
        height: 8, margin: '0 12px',
        background: 'linear-gradient(180deg, var(--ink), #0a0620)',
        border: '2.5px solid var(--ink)', borderTop: 'none',
        borderRadius: '0 0 12px 12px', boxShadow: '0 10px 20px -10px rgba(0,0,0,.8)',
      }} />

      {/* REST OF LIST */}
      <section style={{ padding: '18px 16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
          <span style={{ fontFamily: 'Anton, sans-serif', textTransform: 'uppercase', fontSize: 13, letterSpacing: 1, color: 'var(--text-dim)' }}>Resto da Arena</span>
          <span style={{ flex: 1, height: 3, borderRadius: 'var(--r-pill)', background: 'repeating-linear-gradient(115deg, var(--border) 0 6px, transparent 6px 11px)' }} />
        </div>

        {rest.map(entry => {
          const isMe = entry.childId === child.id
          const delta = entry.rankChange
          return (
            <div key={entry.childId} style={{
              display: 'flex', alignItems: 'center', gap: 11,
              background: isMe
                ? 'radial-gradient(120% 140% at 0% 0%, rgba(255,107,0,.18), rgba(30,18,64,.95))'
                : 'linear-gradient(180deg, var(--raised), var(--card))',
              border: isMe ? '2.5px solid var(--orange)' : '2px solid var(--border)',
              borderRadius: 'var(--r-md)', padding: '9px 13px', marginBottom: 9,
              ...(isMe ? { boxShadow: '0 0 0 1px rgba(255,107,0,.25), 0 10px 22px -12px rgba(255,107,0,.5)' } : {}),
            }}>
              <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 19, width: 28, textAlign: 'center', color: isMe ? 'var(--orange)' : 'var(--text-faint)' }}>{entry.rank}</span>
              <span style={{
                width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                border: `2.5px solid var(--ink)`, display: 'grid', placeItems: 'center', fontSize: 19,
                background: 'repeating-linear-gradient(45deg, var(--raised) 0 6px, var(--card) 6px 12px)',
                ...(isMe ? { boxShadow: '0 0 0 2px var(--orange)' } : {}),
              }}>{AV_EMOJI[entry.childId] ?? '🥷'}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 900, fontSize: 14.5, color: '#fff', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {entry.name}{isMe && <span style={{ color: 'var(--orange-soft)', fontSize: 11, marginLeft: 5 }}>VOCÊ</span>}
                </div>
                <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--text-dim)', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {entry.currentTitle}
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2, flexShrink: 0 }}>
                <span className="num" style={{ fontFamily: 'Anton, sans-serif', fontSize: 16, color: 'var(--xp)' }}>{entry.xpWeekly}</span>
                <span style={{ fontSize: 11, fontWeight: 900, display: 'inline-flex', alignItems: 'center', gap: 2, color: delta > 0 ? DELTA_COLOR.up : delta < 0 ? DELTA_COLOR.down : DELTA_COLOR.same }}>
                  {delta > 0 ? `▲ ${delta}` : delta < 0 ? `▼ ${Math.abs(delta)}` : '—'}
                </span>
              </div>
            </div>
          )
        })}
      </section>

      {/* SEU DESEMPENHO (fixed above navbar) */}
      {myEntry && (
        <div style={{
          position: 'fixed', bottom: 72, left: '50%', transform: 'translateX(-50%)',
          width: '100%', maxWidth: 'var(--maxw)', zIndex: 35, padding: '0 12px',
        }}>
          <div style={{
            background: 'linear-gradient(180deg, #34205e, #211448)',
            border: '2.5px solid var(--orange)', borderRadius: 'var(--r-lg)',
            padding: '13px 15px',
            boxShadow: '0 0 0 1px rgba(255,107,0,.2), 0 -6px 28px -10px rgba(0,0,0,.8), 0 0 22px -8px rgba(255,107,0,.4)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10 }}>
              <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 20, color: '#fff' }}>
                Sua posição: <span style={{ color: 'var(--orange)' }}>#{myEntry.rank}</span>
              </span>
              <span style={{ fontWeight: 900, fontSize: 12, color: 'var(--text-dim)', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                {child.xpWeekly} XP • <span style={{ color: 'var(--orange-soft)' }}>🔥 Streak {child.streakDays} dias</span>
              </span>
            </div>
            {above && xpToNext > 0 && (
              <>
                <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-dim)', margin: '9px 0 7px' }}>
                  Faltam <span style={{ color: 'var(--gold)' }}>{xpToNext} XP</span> para o <span style={{ color: 'var(--gold)' }}>#{above.rank}º lugar</span>
                </div>
                <div style={{
                  height: 14, background: 'var(--bg)', border: '2px solid var(--ink)', borderRadius: 'var(--r-pill)',
                  overflow: 'hidden', position: 'relative', boxShadow: 'inset 0 2px 5px rgba(0,0,0,.6)',
                }}>
                  <div style={{
                    height: '100%', width: `${Math.min(progress, 100)}%`, borderRadius: 'var(--r-pill)',
                    background: 'linear-gradient(180deg, var(--orange-soft), var(--orange))',
                    boxShadow: '0 0 12px 1px rgba(255,107,0,.7)', position: 'relative', overflow: 'hidden',
                  }}>
                    <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(115deg, rgba(255,255,255,.22) 0 5px, transparent 5px 13px)' }} />
                  </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5, fontSize: 9.5, fontWeight: 900 }}>
                  <span style={{ color: 'var(--orange-soft)' }}>Você · {child.xpWeekly} XP</span>
                  <span style={{ color: 'var(--text-faint)' }}>{above.name.split(' ')[0]} · {above.xpWeekly} XP</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`
        @keyframes champGlow { 0%,100%{ filter:brightness(1);} 50%{ filter:brightness(1.18);} }
        @keyframes bob { 0%,100%{ transform:translateX(-50%) translateY(0);} 50%{ transform:translateX(-50%) translateY(-4px);} }
        @keyframes liveBlink { 0%,100%{ box-shadow:0 0 0 0 rgba(231,76,60,.7);} 50%{ box-shadow:0 0 0 6px rgba(231,76,60,0);} }
      `}</style>
    </>
  )
}
