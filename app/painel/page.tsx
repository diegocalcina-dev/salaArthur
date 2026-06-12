'use client'
import { useStore, isTaskCompleted } from '@/lib/store'
import { getDaysUntil } from '@/lib/utils'
import Link from 'next/link'

const SUBJ_EMOJI: Record<string, string> = {
  'Matemática': '÷', 'Português': 'A', 'Ciências': '⚗', 'História': '⌛',
}

const DAYS = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB']
const todayIdx = new Date().getDay()

const WEEK_BARS = [
  { d: 'SEG', n: 3, h: 55 }, { d: 'TER', n: 4, h: 75 }, { d: 'QUA', n: 2, h: 40 },
  { d: 'QUI', n: 2, h: 50, today: true }, { d: 'SEX', n: 0, h: 14, empty: true },
]

export default function PainelDashboard() {
  const { state, dispatch } = useStore()
  const { child, parent, tasks, completions, exams, ranking, unlockRequests, rewardRequests } = state

  const allTasks = tasks
  const completedCount = allTasks.filter(t => isTaskCompleted(t.id, completions)).length
  const donePct = allTasks.length > 0 ? Math.round((completedCount / allTasks.length) * 100) : 0

  const pendingUnlocks = unlockRequests.filter(r => r.status === 'pending')
  const pendingApprovals = pendingUnlocks.length + rewardRequests.filter(r => r.status === 'pending').length

  const childRank = ranking.find(r => r.childId === child.id)
  const rankChange = childRank?.rankChange ?? 0

  const upcomingExam = exams
    .map(e => ({ ...e, daysLeft: getDaysUntil(e.examDate) }))
    .filter(e => e.daysLeft >= 0 && e.daysLeft <= 7)
    .sort((a, b) => a.daysLeft - b.daysLeft)[0]

  const pendingReq = pendingUnlocks[0]
  const pendingApp = pendingReq ? state.apps.find(a => a.id === pendingReq.appId) : null

  return (
    <>
      {/* HEADER */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'linear-gradient(180deg, rgba(23,14,56,.97), rgba(18,11,46,.9))',
        backdropFilter: 'blur(8px)', borderBottom: '1.5px solid var(--border)',
        padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
      }}>
        {/* Burger */}
        <button style={{
          flexShrink: 0, width: 40, height: 40, borderRadius: 11,
          background: 'var(--raised)', border: '1.5px solid var(--border)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4,
          cursor: 'pointer',
        }}>
          {[0, 1, 2].map(i => (
            <span key={i} style={{ width: 18, height: 2, background: '#fff', borderRadius: 2 }} />
          ))}
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <h1 style={{ fontWeight: 900, fontSize: 17, lineHeight: 1.1 }}>
            Oi, {parent.name.split(' ')[0]} 👋
          </h1>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-dim)', marginTop: 2 }}>
            Painel de <b style={{ color: 'var(--orange-soft)' }}>{child.name}</b> · hoje, {DAYS[todayIdx]}
          </div>
        </div>

        {/* Notifications bell */}
        <button style={{
          flexShrink: 0, position: 'relative', width: 40, height: 40, borderRadius: 11,
          background: 'var(--raised)', border: '1.5px solid var(--border)',
          display: 'grid', placeItems: 'center', fontSize: 19, cursor: 'pointer',
        }}>
          🔔
          {pendingApprovals > 0 && (
            <span style={{
              position: 'absolute', top: -4, right: -4,
              width: 18, height: 18, borderRadius: '50%', border: '2.5px solid var(--bg)',
              background: 'var(--danger)', fontSize: 9, fontWeight: 900, color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>{pendingApprovals}</span>
          )}
        </button>
      </header>

      <div style={{ padding: '14px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>

        {/* STATUS DO DIA */}
        <section style={{
          borderRadius: 'var(--r-lg)', border: '2px solid var(--orange)',
          background: 'radial-gradient(140% 130% at 0% 0%, rgba(255,107,0,.20), rgba(18,11,46,0) 55%), linear-gradient(135deg, #2a1850, #160d36)',
          padding: 14,
          boxShadow: '0 0 0 1px rgba(255,107,0,.12), var(--shadow-card)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 13 }}>
            <span className="display" style={{ fontSize: 17 }}>Hoje</span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: 11.5, fontWeight: 900, color: 'var(--orange-soft)',
              background: 'rgba(255,107,0,.1)', border: '1.5px solid rgba(255,107,0,.25)',
              borderRadius: 'var(--r-pill)', padding: '4px 11px',
            }}>🔥 Streak: {child.streakDays} dias</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{
              background: 'rgba(0,0,0,.25)', border: '1px solid rgba(52,199,89,.25)',
              borderRadius: 'var(--r-md)', padding: '11px 12px',
            }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>✅</div>
              <div className="num" style={{ fontFamily: 'Anton, sans-serif', fontSize: 22, lineHeight: 1 }}>
                {completedCount} / {allTasks.length}
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-dim)', marginTop: 5 }}>missões feitas</div>
              <div style={{ marginTop: 8, height: 6, background: 'rgba(0,0,0,.4)', borderRadius: 'var(--r-pill)', overflow: 'hidden', border: '1px solid rgba(52,199,89,.2)' }}>
                <div style={{
                  height: '100%', width: `${donePct}%`, borderRadius: 'var(--r-pill)',
                  background: 'linear-gradient(90deg, #34c759, #1ea750)',
                }} />
              </div>
            </div>
            <div style={{
              background: 'rgba(0,0,0,.25)', border: '1px solid rgba(255,107,0,.2)',
              borderRadius: 'var(--r-md)', padding: '11px 12px',
            }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>🕐</div>
              <div className="num" style={{ fontFamily: 'Anton, sans-serif', fontSize: 22, lineHeight: 1 }}>
                {child.minutesBank}<small style={{ fontSize: 13, fontWeight: 900, color: 'var(--orange-soft)', marginLeft: 3 }}>min</small>
              </div>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-dim)', marginTop: 5 }}>no banco de tempo</div>
              <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-faint)', marginTop: 3 }}>↳ disponível para resgate</div>
            </div>
          </div>
        </section>

        {/* SOLICITAÇÃO PENDENTE */}
        {pendingReq && (
          <section style={{
            borderRadius: 'var(--r-lg)', border: '2px solid var(--amber)',
            background: 'radial-gradient(130% 120% at 0% 0%, rgba(247,169,59,.20), rgba(18,11,46,0) 55%), linear-gradient(135deg, #3a2a12, #1e1442)',
            padding: 14,
            boxShadow: '0 0 0 1px rgba(247,169,59,.12), var(--shadow-card)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 13 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 13, border: '2px solid var(--ink)',
                background: 'rgba(247,169,59,.18)', display: 'grid', placeItems: 'center', fontSize: 21,
              }}>⏳</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, fontWeight: 900, letterSpacing: .6, textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 3 }}>Solicitação pendente</div>
                <div style={{ fontWeight: 900, fontSize: 14, color: '#fff' }}>
                  {child.name.split(' ')[0]} quer usar {pendingReq.minutesRequested} min de {pendingApp?.appName ?? pendingReq.appName}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 9 }}>
              <button
                onClick={() => dispatch({ type: 'APPROVE_UNLOCK', requestId: pendingReq.id })}
                style={{
                  flex: 1, minHeight: 44, borderRadius: 'var(--r-pill)', cursor: 'pointer',
                  fontWeight: 900, fontSize: 14, border: '2px solid var(--ink)',
                  color: '#fff', textShadow: '0 2px 0 rgba(11,6,32,.4)',
                  background: 'linear-gradient(180deg, #34c759, #1ea750)',
                  boxShadow: '0 4px 0 #0e6432',
                }}
              >✅ Aprovar</button>
              <button
                onClick={() => dispatch({ type: 'REJECT_UNLOCK', requestId: pendingReq.id })}
                style={{
                  flex: 1, minHeight: 44, borderRadius: 'var(--r-pill)', cursor: 'pointer',
                  fontWeight: 900, fontSize: 14, border: '2px solid var(--ink)',
                  color: '#fff', textShadow: '0 2px 0 rgba(11,6,32,.4)',
                  background: 'linear-gradient(180deg, #e74c3c, #c0392b)',
                  boxShadow: '0 4px 0 #7e1a12',
                }}
              >❌ Recusar</button>
            </div>
          </section>
        )}

        {/* MISSÕES DO DIA */}
        <section style={{
          background: 'linear-gradient(180deg, var(--raised), var(--card))',
          border: '1.5px solid var(--border)', borderRadius: 'var(--r-lg)', padding: 14,
          boxShadow: 'var(--shadow-card)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 13 }}>
            <span style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--orange)', flexShrink: 0 }} />
            <span style={{ fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: .5 }}>Missões do dia</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {allTasks.map((task, i) => {
              const done = isTaskCompleted(task.id, completions)
              return (
                <div key={task.id} style={{
                  display: 'flex', alignItems: 'center', gap: 11, padding: '10px 0',
                  borderBottom: i < allTasks.length - 1 ? '1px solid var(--border)' : undefined,
                }}>
                  <span style={{
                    width: 28, height: 28, borderRadius: 9, border: `2px solid ${done ? 'var(--success)' : 'var(--border)'}`,
                    background: done ? 'rgba(52,199,89,.14)' : 'var(--raised)',
                    display: 'grid', placeItems: 'center', fontSize: 12, flexShrink: 0,
                  }}>{done ? '✅' : '⏳'}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontWeight: 900, fontSize: 13, color: done ? 'var(--text-dim)' : '#fff',
                      textDecoration: done ? 'line-through' : undefined,
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>{task.title}</div>
                    <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--text-faint)', marginTop: 1 }}>
                      {done ? 'Feita' : 'Pendente'}
                    </div>
                  </div>
                  <span style={{
                    fontWeight: 900, fontSize: 12, color: done ? 'var(--success)' : 'var(--xp)',
                    whiteSpace: 'nowrap',
                  }}>{done ? '+' : ''}{task.xpValue} XP</span>
                </div>
              )
            })}
          </div>
          <Link href="/painel/tarefas" style={{ textDecoration: 'none', display: 'block', marginTop: 12 }}>
            <button style={{
              width: '100%', minHeight: 40, borderRadius: 'var(--r-pill)', cursor: 'pointer',
              fontWeight: 900, fontSize: 12, color: 'var(--orange-soft)',
              background: 'rgba(255,107,0,.06)', border: '1.5px solid var(--orange)',
            }}>Gerenciar missões →</button>
          </Link>
        </section>

        {/* PRÓXIMA PROVA */}
        {upcomingExam && (
          <section style={{
            borderRadius: 'var(--r-md)', border: '2px solid var(--danger)',
            background: 'rgba(231,76,60,.1)', padding: '12px 14px',
            display: 'flex', flexDirection: 'column', gap: 5,
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 10.5, fontWeight: 900, textTransform: 'uppercase', letterSpacing: .6,
              color: 'var(--danger)', background: 'rgba(231,76,60,.12)', border: '1.5px solid rgba(231,76,60,.4)',
              borderRadius: 'var(--r-pill)', padding: '3px 10px', alignSelf: 'flex-start',
            }}>📅 Prova em {upcomingExam.daysLeft === 0 ? 'HOJE' : upcomingExam.daysLeft === 1 ? '1 dia' : `${upcomingExam.daysLeft} dias`}</span>
            <div style={{ fontWeight: 900, fontSize: 14 }}>
              {upcomingExam.subject} — {new Date(upcomingExam.examDate).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
            </div>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--amber)', display: 'flex', alignItems: 'center', gap: 5 }}>
              <span>⚠️</span> {child.name.split(' ')[0]} ainda não fez a revisão
            </div>
          </section>
        )}

        {/* SEMANA - CHART */}
        <section style={{
          background: 'linear-gradient(180deg, var(--raised), var(--card))',
          border: '1.5px solid var(--border)', borderRadius: 'var(--r-lg)', padding: 14,
          boxShadow: 'var(--shadow-card)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--orange)', flexShrink: 0 }} />
              <span style={{ fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: .5 }}>Semana atual</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 900, color: 'var(--text-dim)', display: 'flex', alignItems: 'center', gap: 5 }}>
              Ranking <b style={{ color: '#fff' }}>#{childRank?.rank ?? '-'}</b>
              {rankChange !== 0 && (
                <span style={{ color: rankChange > 0 ? 'var(--success)' : 'var(--danger)', fontSize: 11 }}>
                  {rankChange > 0 ? `▲${rankChange}` : `▼${Math.abs(rankChange)}`}
                </span>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 80, marginBottom: 8 }}>
            {WEEK_BARS.map(bar => (
              <div key={bar.d} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, height: '100%', justifyContent: 'flex-end' }}>
                <span style={{ fontSize: 10.5, fontWeight: 900, color: bar.empty ? 'var(--text-faint)' : 'var(--text-dim)' }}>
                  {bar.empty ? '' : bar.n}
                </span>
                <div style={{
                  width: '100%', borderRadius: '4px 4px 0 0',
                  height: `${bar.h}%`, minHeight: 4,
                  background: bar.today
                    ? 'linear-gradient(180deg, var(--orange-soft), var(--orange))'
                    : bar.empty ? 'rgba(255,255,255,.06)' : 'rgba(255,107,0,.4)',
                  border: bar.today ? '2px solid var(--ink)' : '1.5px solid var(--border)',
                  boxShadow: bar.today ? 'var(--glow-orange)' : undefined,
                }} />
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, borderTop: '1px solid var(--border)', paddingTop: 6 }}>
            {WEEK_BARS.map(bar => (
              <div key={bar.d} style={{ flex: 1, textAlign: 'center', fontSize: 9.5, fontWeight: 900, color: bar.today ? 'var(--orange-soft)' : 'var(--text-faint)' }}>
                {bar.d}
              </div>
            ))}
          </div>
        </section>

        {/* AÇÕES RÁPIDAS */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--orange)', flexShrink: 0 }} />
            <span style={{ fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: .5 }}>Ações rápidas</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 9 }}>
            {[
              { ico: '➕', label: 'Nova\nmissão', href: '/painel/tarefas' },
              { ico: '📅', label: 'Add\nprova', href: '/painel/tarefas' },
              { ico: '🎮', label: 'Config.\napps', href: '/painel/recompensas' },
              { ico: '📊', label: 'Relatório', href: '/painel' },
            ].map(a => (
              <Link key={a.label} href={a.href} style={{ textDecoration: 'none' }}>
                <button style={{
                  width: '100%', minHeight: 72, borderRadius: 'var(--r-md)', cursor: 'pointer',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 6,
                  background: 'linear-gradient(180deg, var(--raised), var(--card))',
                  border: '1.5px solid var(--border)', boxShadow: 'var(--shadow-card)',
                }}>
                  <span style={{ fontSize: 22 }}>{a.ico}</span>
                  <span style={{ fontSize: 10, fontWeight: 900, color: 'var(--text-dim)', textAlign: 'center', whiteSpace: 'pre-line', lineHeight: 1.2 }}>{a.label}</span>
                </button>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <div style={{ textAlign: 'center', padding: '8px 0 4px', fontSize: 11, fontWeight: 800, color: 'var(--text-faint)' }}>
          <b style={{ color: 'var(--orange-soft)' }}>TurmaXP</b> · Painel dos Pais
        </div>

      </div>
    </>
  )
}
