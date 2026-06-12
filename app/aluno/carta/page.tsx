'use client'
import { useState } from 'react'
import { useStore } from '@/lib/store'
import { WEEKLY_CARD, CLASSROOM } from '@/lib/mock-data'
import Link from 'next/link'

const AV_EMOJI: Record<string, string> = {
  'c-1': '🦊', 'child-1': '🥷', 'c-3': '🐺', 'c-4': '🌸',
}

const PREV_WEEKS = [
  { week: 'Semana 22', xp: 290, rank: 5, rankChange: -1, title: '⚡ Vento Veloz', rarity: 'silver' },
  { week: 'Semana 21', xp: 410, rank: 2, rankChange: 2, title: '🔥 Imparável', rarity: 'gold' },
  { week: 'Semana 20', xp: 375, rank: 3, rankChange: 0, title: '⭐ Semana Perfeita', rarity: 'gold' },
  { week: 'Semana 19', xp: 230, rank: 7, rankChange: 3, title: '💪 Recomeço', rarity: 'silver' },
]
const RARITY_RING: Record<string, string> = {
  gold:   'conic-gradient(from 0deg, var(--gold), #fff, var(--orange), var(--gold))',
  silver: 'conic-gradient(from 0deg, #9ea3af, #fff, #6e7a8a, #9ea3af)',
  bronze: 'conic-gradient(from 0deg, #b87333, #f5c98a, #b87333)',
}

export default function CartaPage() {
  const { state } = useStore()
  const { child } = state
  const card = WEEKLY_CARD
  const [shared, setShared] = useState(false)

  const rankUp = card.rankChange > 0
  const rankDown = card.rankChange < 0
  const rankLabel = rankUp ? `▲${card.rankChange}` : rankDown ? `▼${Math.abs(card.rankChange)}` : '—'
  const rankColor = rankUp ? 'var(--success)' : rankDown ? 'var(--danger)' : 'var(--text-dim)'

  function share() {
    const text = `${child.name} fez ${card.xpEarned} XP essa semana no TurmaXP e está em #${card.rankPosition} lugar! ${card.rankChange > 0 ? '🚀' : '🔥'}`
    if (navigator.share) {
      navigator.share({ title: `Carta da Semana — ${child.name}`, text }).catch(() => {})
    } else {
      navigator.clipboard?.writeText(text).catch(() => {})
    }
    setShared(true)
    setTimeout(() => setShared(false), 2000)
  }

  return (
    <>
      {/* HEADER */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'linear-gradient(180deg, rgba(23,14,56,.96), rgba(18,11,46,.85))',
        backdropFilter: 'blur(8px)', borderBottom: '1.5px solid var(--border)',
        padding: '14px 16px',
      }}>
        <h1 className="display" style={{ fontSize: 21, color: '#fff' }}>Carta da Semana</h1>
        <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-dim)', marginTop: 3 }}>
          Semana 23 • {new Date(card.weekStart).toLocaleDateString('pt-BR', { day: 'numeric', month: 'long' })}
        </div>
      </header>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* A CARTA */}
        <section style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: 'var(--r-lg)', border: '2.5px solid var(--gold)',
          background: 'radial-gradient(140% 130% at 50% -10%, rgba(247,201,72,.22), rgba(18,11,46,0) 55%), linear-gradient(160deg, #241650, #160d36)',
          padding: 18, boxShadow: '0 0 0 1px rgba(247,201,72,.2), 0 16px 36px -18px rgba(247,201,72,.5)',
        }}>
          {/* Leaf decorations */}
          <span style={{ position: 'absolute', top: 14, left: 18, fontSize: 22, opacity: .55, transform: 'rotate(-15deg)' }}>🍃</span>
          <span style={{ position: 'absolute', top: 12, right: 20, fontSize: 20, opacity: .45, transform: 'rotate(25deg)' }}>🌀</span>

          {/* Top bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14, paddingTop: 4 }}>
            <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 18, letterSpacing: 1 }}>
              <span style={{ color: 'var(--orange-soft)' }}>Turma</span>
              <span style={{ color: 'var(--gold)' }}>XP</span>
            </span>
            <span style={{ fontSize: 11, fontWeight: 900, color: 'var(--text-dim)' }}>{CLASSROOM.name} • Semana 23</span>
          </div>

          {/* Hero */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%', padding: 3,
              background: 'conic-gradient(from 0deg, var(--gold), #fff, var(--orange), var(--gold))',
              boxShadow: '0 0 20px -2px rgba(247,201,72,.6)',
            }}>
              <div style={{
                width: '100%', height: '100%', borderRadius: '50%',
                background: 'repeating-linear-gradient(45deg, var(--raised) 0 8px, var(--card) 8px 16px)',
                border: '2px solid var(--ink)', display: 'grid', placeItems: 'center', fontSize: 36,
              }}>{AV_EMOJI[child.id] ?? '🥷'}</div>
            </div>
            <div style={{ fontFamily: 'Anton, sans-serif', fontSize: 22, letterSpacing: .5 }}>{child.name}</div>
            <span style={{
              fontWeight: 900, fontSize: 12.5, textTransform: 'uppercase', letterSpacing: .5,
              color: '#fff', textShadow: '0 2px 0 rgba(11,6,32,.4)',
              background: 'linear-gradient(180deg, var(--orange-soft), var(--orange))',
              border: '2px solid var(--ink)', borderRadius: 'var(--r-pill)', padding: '5px 14px',
              boxShadow: 'var(--glow-orange)',
            }}>🔥 {card.title}</span>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            {/* XP semanal */}
            <div style={{
              background: 'rgba(247,201,72,.10)', border: '1.5px solid rgba(247,201,72,.35)',
              borderRadius: 'var(--r-md)', padding: 12,
            }}>
              <div style={{ fontSize: 10.5, fontWeight: 900, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 4 }}>⭐ XP Semanal</div>
              <div className="num" style={{ fontFamily: 'Anton, sans-serif', fontSize: 26, lineHeight: 1, color: '#fff' }}>
                {card.xpEarned}<small style={{ fontSize: 14, color: 'var(--gold)', marginLeft: 3 }}>XP</small>
              </div>
            </div>
            {/* Posição */}
            <div style={{
              background: 'rgba(255,107,0,.10)', border: '1.5px solid rgba(255,107,0,.3)',
              borderRadius: 'var(--r-md)', padding: 12,
            }}>
              <div style={{ fontSize: 10.5, fontWeight: 900, color: 'var(--orange-soft)', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 4 }}>🏆 Posição</div>
              <div className="num" style={{ fontFamily: 'Anton, sans-serif', fontSize: 26, lineHeight: 1, color: '#fff', display: 'flex', alignItems: 'baseline', gap: 6 }}>
                #{card.rankPosition}
                <span style={{ fontSize: 12, color: rankColor, fontFamily: 'Nunito, sans-serif', fontWeight: 900 }}>{rankLabel}</span>
              </div>
            </div>
            {/* Streak */}
            <div style={{
              background: 'rgba(255,107,0,.08)', border: '1.5px solid rgba(255,107,0,.2)',
              borderRadius: 'var(--r-md)', padding: 12,
            }}>
              <div style={{ fontSize: 10.5, fontWeight: 900, color: 'var(--orange-soft)', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 4 }}>🔥 Streak</div>
              <div className="num" style={{ fontFamily: 'Anton, sans-serif', fontSize: 26, lineHeight: 1, color: '#fff' }}>
                {card.streak}<small style={{ fontSize: 14, color: 'var(--orange-soft)', marginLeft: 3 }}>dias</small>
              </div>
            </div>
            {/* Matéria top */}
            <div style={{
              background: 'rgba(61,123,255,.10)', border: '1.5px solid rgba(61,123,255,.25)',
              borderRadius: 'var(--r-md)', padding: 12,
            }}>
              <div style={{ fontSize: 10.5, fontWeight: 900, color: '#9DBBFF', textTransform: 'uppercase', letterSpacing: .5, marginBottom: 4 }}>📚 Matéria top</div>
              <div style={{ fontWeight: 900, fontSize: 14, lineHeight: 1.2, color: '#fff' }}>{card.topSubject}</div>
            </div>
          </div>

          {/* Message */}
          <div style={{
            background: 'rgba(0,0,0,.25)', borderRadius: 'var(--r-md)', border: '1px solid rgba(255,255,255,.08)',
            padding: '12px 14px',
          }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,.88)', lineHeight: 1.5, fontStyle: 'italic', margin: 0 }}>
              &ldquo;{card.message}&rdquo;
            </p>
          </div>

          <div style={{ textAlign: 'center', marginTop: 12, fontSize: 10, fontWeight: 800, color: 'rgba(255,255,255,.2)', letterSpacing: 1 }}>
            turma-xp.app
          </div>
        </section>

        {/* BOTÕES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button
            onClick={share}
            style={{
              width: '100%', minHeight: 52, borderRadius: 'var(--r-pill)', cursor: 'pointer',
              fontWeight: 900, fontSize: 16, letterSpacing: .3,
              border: '2.5px solid var(--ink)', color: '#fff', textShadow: '0 2px 0 rgba(0,0,0,.4)',
              background: 'linear-gradient(180deg, #34d26c, #1ea750)',
              boxShadow: '0 4px 0 #0e6432, 0 6px 20px -6px rgba(52,210,108,.5)',
              transition: 'transform .08s, box-shadow .08s',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
            }}
          >{shared ? '✅ Copiado!' : '📤 Compartilhar no WhatsApp'}</button>
          <button style={{
            width: '100%', minHeight: 44, borderRadius: 'var(--r-pill)', cursor: 'pointer',
            fontWeight: 900, fontSize: 13, letterSpacing: .3,
            border: '2px solid var(--border)', color: 'var(--text-dim)',
            background: 'var(--raised)',
          }}>⬇️ Salvar imagem</button>
        </div>

        {/* SEMANAS ANTERIORES */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 15, color: 'var(--text-dim)', whiteSpace: 'nowrap', textTransform: 'uppercase', letterSpacing: .5 }}>Semanas anteriores</span>
            <span style={{ flex: 1, height: 3, borderRadius: 'var(--r-pill)', background: 'repeating-linear-gradient(115deg, var(--border) 0 6px, transparent 6px 11px)' }} />
          </div>
          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 8, scrollSnapType: 'x mandatory' }}>
            {PREV_WEEKS.map(w => {
              const rc = w.rankChange > 0 ? `▲${w.rankChange}` : w.rankChange < 0 ? `▼${Math.abs(w.rankChange)}` : '—'
              const rcColor = w.rankChange > 0 ? 'var(--success)' : w.rankChange < 0 ? 'var(--danger)' : 'var(--text-dim)'
              return (
                <div key={w.week} style={{
                  flexShrink: 0, width: 130, scrollSnapAlign: 'start',
                  background: 'linear-gradient(180deg, var(--raised), var(--card))',
                  border: '1.5px solid var(--border)', borderRadius: 'var(--r-lg)',
                  padding: 13, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 9,
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 10.5, fontWeight: 900, color: 'var(--text-dim)', letterSpacing: .5 }}>{w.week}</div>
                  <div style={{
                    width: 46, height: 46, borderRadius: '50%', padding: 3,
                    background: RARITY_RING[w.rarity] ?? RARITY_RING.silver,
                  }}>
                    <div style={{
                      width: '100%', height: '100%', borderRadius: '50%',
                      background: 'var(--card)', border: '2px solid var(--ink)',
                      display: 'grid', placeItems: 'center', fontSize: 20,
                    }}>{AV_EMOJI[child.id] ?? '🥷'}</div>
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 900, color: '#fff', lineHeight: 1.3 }}>{w.title}</div>
                  <div className="num" style={{ fontFamily: 'Anton, sans-serif', fontSize: 20, color: 'var(--xp)' }}>{w.xp}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11.5, fontWeight: 900, color: 'var(--text-dim)' }}>
                    <span>#{w.rank}</span>
                    <span style={{ color: rcColor, fontSize: 10.5 }}>{rc}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

      </div>
    </>
  )
}
