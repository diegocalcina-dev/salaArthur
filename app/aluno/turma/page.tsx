'use client'
import { useState } from 'react'
import { useStore } from '@/lib/store'
import { CLASSROOM, MASCOT_LEVELS } from '@/lib/mock-data'
import { formatRelative } from '@/lib/utils'
import Link from 'next/link'

const BADGE_STYLE: Record<string, { color: string; bg: string; border: string }> = {
  rank_up:      { color: 'var(--gold)',        bg: 'rgba(247,201,72,.12)',  border: 'var(--gold)' },
  streak:       { color: 'var(--orange-soft)',  bg: 'rgba(255,107,0,.12)',   border: 'var(--orange)' },
  mascot_level: { color: 'var(--ink)',          bg: 'linear-gradient(180deg,#FFDC74,var(--gold))', border: 'var(--ink)' },
  perfect_week: { color: '#97E9AC',             bg: 'rgba(52,199,89,.12)',   border: 'var(--success)' },
  title:        { color: '#9DBBFF',             bg: 'rgba(61,123,255,.12)',  border: '#3D7BFF' },
}
const BADGE_LABEL: Record<string, string> = {
  rank_up: '🏆 Novo ranking', streak: '🔥 Streak', mascot_level: '🎉 Turma',
  perfect_week: '✅ Semana Perfeita', title: '⭐ Título',
}

const REACTION_EMOJIS = ['👏', '🔥', '⭐', '💪']

export default function TurmaPage() {
  const { state, dispatch } = useStore()
  const { child, feedEvents, classroom } = state
  const [reactingTo, setReactingTo] = useState<string | null>(null)

  const mascot = MASCOT_LEVELS[Math.min(classroom.mascotLevel - 1, MASCOT_LEVELS.length - 1)]
  const mascotPct = Math.round((classroom.mascotXp / classroom.mascotXpNeeded) * 100)

  function react(eventId: string, emoji: string) {
    dispatch({ type: 'REACT_TO_FEED', eventId, emoji })
    setReactingTo(null)
  }

  return (
    <>
      {/* HEADER */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'linear-gradient(180deg, rgba(23,14,56,.96), rgba(18,11,46,.85))',
        backdropFilter: 'blur(8px)', borderBottom: '1.5px solid var(--border)',
        padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      }}>
        <h1 className="display" style={{ fontSize: 21, color: '#fff' }}>{classroom.name}</h1>
        <div style={{
          flexShrink: 0, display: 'flex', alignItems: 'center', gap: 8,
          background: 'var(--raised)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-pill)',
          padding: '5px 12px 5px 6px',
        }}>
          <span style={{
            width: 30, height: 30, borderRadius: '50%', border: '2px solid var(--ink)',
            background: 'conic-gradient(from 0deg,var(--orange),var(--gold),var(--orange))',
            display: 'grid', placeItems: 'center', fontSize: 15,
          }}>{mascot.emoji}</span>
          <span style={{ fontSize: 10, fontWeight: 900, color: 'var(--orange-soft)' }}>Mascote NV {classroom.mascotLevel}</span>
        </div>
      </header>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* MASCOTE STATUS */}
        <section style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: 'var(--r-lg)', border: '2px solid var(--orange)',
          background: 'radial-gradient(120% 120% at 0% 0%, rgba(255,107,0,.20), rgba(30,18,64,0) 55%), linear-gradient(135deg, #2a1850, #160d36)',
          padding: 15, boxShadow: '0 0 0 1px rgba(255,107,0,.15), var(--shadow-card)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 13 }}>
            <div style={{
              flexShrink: 0, width: 58, height: 58, borderRadius: 16, position: 'relative',
              background: 'conic-gradient(from 0deg, var(--orange), var(--gold), var(--orange))',
              padding: 3, boxShadow: '0 0 16px -2px rgba(255,107,0,.6)',
            }}>
              <div style={{
                width: '100%', height: '100%', borderRadius: 13,
                background: 'repeating-linear-gradient(45deg, var(--raised) 0 7px, var(--card) 7px 14px)',
                border: '2px solid var(--ink)', display: 'grid', placeItems: 'center', fontSize: 30,
              }}>{mascot.emoji}</div>
              <span style={{
                position: 'absolute', bottom: -6, left: '50%', transform: 'translateX(-50%)',
                fontFamily: 'Anton, sans-serif', fontSize: 10, color: 'var(--ink)',
                background: 'linear-gradient(180deg,#FFDC74,var(--gold))', border: '2px solid var(--ink)',
                borderRadius: 'var(--r-pill)', padding: '2px 8px 1px', whiteSpace: 'nowrap',
              }}>NV {classroom.mascotLevel}/5</span>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 900, fontSize: 16 }}>
                {mascot.name} <span style={{ color: 'var(--gold)', fontSize: 12, fontWeight: 900, marginLeft: 5 }}>MASCOTE</span>
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-dim)', marginTop: 1 }}>
                Evoluindo para o Nível {Math.min(classroom.mascotLevel + 1, 5)}
              </div>
              <div style={{ height: 14, background: 'var(--bg)', border: '2px solid var(--ink)', borderRadius: 'var(--r-pill)', overflow: 'hidden', marginTop: 8, boxShadow: 'inset 0 2px 5px rgba(0,0,0,.6)' }}>
                <div style={{
                  display: 'block', height: '100%', width: `${mascotPct}%`, borderRadius: 'var(--r-pill)',
                  background: 'linear-gradient(180deg,var(--orange-soft),var(--orange))',
                  boxShadow: '0 0 10px 1px rgba(255,107,0,.7)', position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(115deg, rgba(255,255,255,.2) 0 5px, transparent 5px 13px)' }} />
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 9 }}>
            <span style={{ fontSize: 10.5, fontWeight: 900, color: 'var(--orange-soft)' }}>
              {mascotPct}% • faltam {Math.round((classroom.mascotXpNeeded - classroom.mascotXp) / 10)} tarefas
            </span>
            <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-dim)' }}>A turma está arrasando! 🔥</span>
          </div>
        </section>

        {/* FEED HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontFamily: 'Anton, sans-serif', textTransform: 'uppercase', fontSize: 15, letterSpacing: 1, color: 'var(--text-dim)', whiteSpace: 'nowrap' }}>Mural da turma</span>
          <span style={{ flex: 1, height: 3, borderRadius: 'var(--r-pill)', background: 'repeating-linear-gradient(115deg, var(--border) 0 6px, transparent 6px 11px)' }} />
          <span style={{ fontSize: 10, fontWeight: 900, color: 'var(--danger)', display: 'inline-flex', alignItems: 'center', gap: 5, textTransform: 'uppercase' }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--danger)', animation: 'liveDot 1.4s infinite' }} />
            Ao vivo
          </span>
        </div>

        {/* FEED EVENTS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {feedEvents.map(event => {
            const isMe = event.childId === child.id
            const isTeam = event.type === 'mascot_level'
            const badge = BADGE_STYLE[event.type] ?? BADGE_STYLE.title
            const label = BADGE_LABEL[event.type] ?? '📢 Notícia'
            return (
              <article key={event.id} style={{
                background: isTeam
                  ? 'radial-gradient(120% 120% at 50% 0%, rgba(247,201,72,.16), rgba(30,18,64,0) 55%), linear-gradient(135deg, #322411, #1b1140)'
                  : 'linear-gradient(180deg, var(--raised), var(--card))',
                border: `${isTeam ? 2 : 1.5}px solid ${isTeam ? 'var(--gold)' : 'var(--border)'}`,
                borderRadius: 'var(--r-lg)', padding: 14,
                boxShadow: isTeam
                  ? '0 0 0 1px rgba(247,201,72,.2), 0 12px 26px -14px rgba(247,201,72,.4)'
                  : 'var(--shadow-card)',
                cursor: 'pointer',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <span style={{
                    flexShrink: 0, width: 42, height: 42, borderRadius: '50%', border: '2.5px solid var(--ink)',
                    display: 'grid', placeItems: 'center', fontSize: 21,
                    background: isMe ? 'var(--orange)' : isTeam ? 'var(--gold)' : 'repeating-linear-gradient(45deg, var(--raised) 0 6px, var(--card) 6px 12px)',
                    boxShadow: isMe ? '0 0 0 2px var(--orange)' : undefined,
                  }}>{event.emoji}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 4,
                      fontSize: 9.5, fontWeight: 900, letterSpacing: '.4px', textTransform: 'uppercase',
                      padding: '3px 9px', borderRadius: 'var(--r-pill)', border: `1.5px solid ${badge.border}`,
                      color: badge.color, background: badge.bg,
                    }}>{label}</span>
                    <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--text-faint)', marginTop: 4 }}>
                      {formatRelative(event.createdAt)}
                    </div>
                  </div>
                </div>
                <p style={{ fontSize: 13.5, fontWeight: 700, color: '#fff', marginTop: 11, lineHeight: 1.45 }}>
                  {isTeam && <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 16, color: 'var(--gold)', display: 'block', marginBottom: 3, letterSpacing: '.5px' }}>
                    {event.message.split('!')[0]}!
                  </span>}
                  {isTeam ? event.message.split('!').slice(1).join('!').trim() : (
                    <span dangerouslySetInnerHTML={{ __html: event.message.replace(event.childName ?? '', `<b style="font-weight:900;color:var(--orange-soft)">${event.childName}</b>`) }} />
                  )}
                </p>

                {/* Carta button for own event */}
                {isMe && event.type === 'perfect_week' && (
                  <Link href="/aluno/carta" style={{ textDecoration: 'none', display: 'block', marginTop: 12 }}>
                    <button style={{
                      width: '100%', minHeight: 42, borderRadius: 'var(--r-pill)', cursor: 'pointer',
                      fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '.4px',
                      color: '#fff', textShadow: '0 2px 0 rgba(11,6,32,.4)',
                      background: 'linear-gradient(180deg, var(--orange-soft), var(--orange))',
                      border: '2.5px solid var(--ink)', boxShadow: 'var(--glow-orange)',
                    }}>Ver minha carta →</button>
                  </Link>
                )}

                {/* Reactions */}
                {event.reactions && event.reactions.length > 0 && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginTop: 13, flexWrap: 'wrap' }}>
                    {event.reactions.map(r => (
                      <button
                        key={r.emoji}
                        onClick={() => react(event.id, r.emoji)}
                        style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5,
                          fontSize: 12, fontWeight: 900, color: r.reacted ? 'var(--orange-soft)' : 'var(--text-dim)',
                          background: r.reacted ? 'rgba(255,107,0,.1)' : 'rgba(255,255,255,.04)',
                          border: `1.5px solid ${r.reacted ? 'var(--orange)' : 'var(--border)'}`,
                          borderRadius: 'var(--r-pill)', padding: '4px 10px', cursor: 'pointer',
                        }}
                      >
                        <span style={{ fontSize: 13 }}>{r.emoji}</span>{r.count}
                      </button>
                    ))}
                    <button
                      onClick={() => setReactingTo(reactingTo === event.id ? null : event.id)}
                      style={{
                        width: 30, height: 30, borderRadius: '50%', display: 'grid', placeItems: 'center',
                        background: 'rgba(255,107,0,.08)', border: '1.5px dashed var(--orange)', color: 'var(--orange-soft)',
                        fontSize: 14, cursor: 'pointer', marginLeft: 'auto',
                      }}
                    >＋</button>
                  </div>
                )}
              </article>
            )
          })}
        </div>

      </div>

      {/* FLOATING REACTION BAR */}
      {reactingTo && (
        <div style={{
          position: 'fixed', bottom: 88, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', gap: 6, zIndex: 45,
          background: 'var(--raised)', border: '2.5px solid var(--ink)', borderRadius: 'var(--r-pill)',
          padding: '8px 12px', boxShadow: '0 12px 30px -8px rgba(0,0,0,.8), 0 0 0 1px var(--border)',
          animation: 'popIn .3s cubic-bezier(.2,1.4,.4,1)',
        }}>
          {REACTION_EMOJIS.map(emoji => (
            <button
              key={emoji}
              onClick={() => react(reactingTo, emoji)}
              style={{
                width: 42, height: 42, borderRadius: '50%', display: 'grid', placeItems: 'center',
                fontSize: 22, cursor: 'pointer', background: 'var(--card)', border: '1.5px solid var(--border)',
                transition: 'transform .12s',
              }}
              onPointerEnter={e => (e.currentTarget.style.transform = 'scale(1.15) translateY(-3px)')}
              onPointerLeave={e => (e.currentTarget.style.transform = '')}
            >{emoji}</button>
          ))}
        </div>
      )}

      <style>{`
        @keyframes liveDot { 0%,100%{ box-shadow:0 0 0 0 rgba(231,76,60,.7);} 50%{ box-shadow:0 0 0 5px rgba(231,76,60,0);} }
        @keyframes popIn { from{ opacity:0;transform:translateX(-50%) translateY(10px) scale(.9);} to{ opacity:1;transform:translateX(-50%) translateY(0) scale(1);} }
      `}</style>
    </>
  )
}
