'use client'
import { useState, useEffect } from 'react'
import { useStore, isTaskCompleted } from '@/lib/store'
import { getDaysUntil } from '@/lib/utils'
import Link from 'next/link'

const SUBJ: Record<string, { cls: string; ico: string }> = {
  'Matemática':      { cls: 's-mat',  ico: '÷'  },
  'Português':       { cls: 's-port', ico: 'A'  },
  'Ciências':        { cls: 's-cien', ico: '⚗'  },
  'História':        { cls: 's-hist', ico: '⌛'  },
  'Geografia':       { cls: 's-geo',  ico: '🌎' },
  'Inglês':          { cls: 's-ing',  ico: '🇺🇸' },
  'Educação Física': { cls: 's-ef',   ico: '⚽'  },
  'Artes':           { cls: 's-art',  ico: '🎨'  },
  'Socioemocional':  { cls: 's-soc',  ico: '🧠'  },
}
function getSubj(s: string) { return SUBJ[s] ?? { cls: 's-hist', ico: '📝' } }

const AV_EMOJI: Record<string, string> = {
  'c-1': '🦊', 'child-1': '🥷', 'c-3': '🐺', 'c-4': '🌸',
  'c-5': '🐢', 'c-6': '⚡', 'c-7': '🐲', 'c-8': '🌙',
  'c-9': '🦈', 'c-10': '🌺',
}
const AV_BG: Record<string, string> = {
  galaxy: 'var(--rare)', space: '#1a1550', forest: '#1a4a2e',
  ocean: '#1a3a5e', sunset: '#5e2a1a', neon: '#2a1a5e', fire: '#5e1a1a',
}

export default function AlunoHome() {
  const { state, dispatch } = useStore()
  const { child, tasks, completions, exams } = state

  const completedCount = tasks.filter(t => isTaskCompleted(t.id, completions)).length

  useEffect(() => {
    if (!state.xpAnimation) return
    const t = setTimeout(() => dispatch({ type: 'CLEAR_XP_ANIMATION' }), 1500)
    return () => clearTimeout(t)
  }, [state.xpAnimation, dispatch])

  const upcomingExams = exams
    .map(e => ({ ...e, daysLeft: getDaysUntil(e.examDate) }))
    .filter(e => e.daysLeft >= 0 && e.daysLeft <= 7)
    .sort((a, b) => a.daysLeft - b.daysLeft)

  const todayDow = new Date().getDay() as 0|1|2|3|4|5|6
  const todaysLessons = state.dailyLessons.filter(l => l.dayOfWeek === todayDow)
  const allLessonsRead = todaysLessons.length > 0 && todaysLessons.every(l => state.lessonReads.includes(l.id))

  const top3 = state.ranking.slice(0, 3)
  const myEntry = state.ranking.find(r => r.childId === child.id)

  return (
    <>
      {/* HEADER */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: 'linear-gradient(180deg, #241552, #1E1240)',
        borderBottom: '2px solid var(--border)',
        boxShadow: '0 8px 20px -12px rgba(0,0,0,.8)',
        padding: '12px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11, minWidth: 0 }}>
          <div className="avatar-ring">
            <div className="avatar-face">🥷</div>
            <span className="avatar-lvl">NV {child.level}</span>
          </div>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontWeight: 900, fontSize: 15, lineHeight: 1.1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {child.name}
            </div>
            <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--orange-soft)', marginTop: 3 }}>
              🔥 {child.currentTitle}
            </div>
          </div>
        </div>
        <div className="week-xp">
          <span style={{ fontSize: 18 }}>⭐</span>
          <span style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <span className="v num">{child.xpWeekly}</span>
            <span className="l">XP na semana</span>
          </span>
        </div>
      </header>

      {/* XP Float */}
      {state.xpAnimation && (
        <div className="anim-xp-float" style={{
          position: 'fixed', top: 88, right: 16, zIndex: 50, pointerEvents: 'none',
          fontFamily: 'Anton, sans-serif', fontSize: 22, color: 'var(--ink)',
          background: 'linear-gradient(180deg,#FFE680,var(--xp))',
          border: '2.5px solid var(--ink)', borderRadius: 'var(--r-pill)', padding: '8px 16px',
          boxShadow: '0 4px 0 var(--gold-deep)',
        }}>+{state.xpAnimation.xp} XP ⚡</div>
      )}

      {/* CONTENT */}
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* Banco de Tempo */}
        <Link href="/aluno/banco" style={{ textDecoration: 'none' }}>
          <div className="timebank">
            <div className="tb-clock">⏱️</div>
            <div className="tb-body">
              <div className="tb-label">Banco de tempo</div>
              <div className="tb-num num">{child.minutesBank}<small> min</small></div>
            </div>
            <div className="tb-use" style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              Usar<br />agora
            </div>
          </div>
        </Link>

        {/* Aulas de Hoje */}
        {todaysLessons.length > 0 && (
          <section>
            <div className="sec-head">
              <span className="sec-title display">Aulas de Hoje</span>
              <span className="sec-line" />
              <span className="sec-count">
                {todaysLessons.filter(l => state.lessonReads.includes(l.id)).length} / {todaysLessons.length}
              </span>
            </div>
            {allLessonsRead && (
              <div style={{
                marginTop: 10, marginBottom: 2,
                background: 'rgba(52,199,89,.10)', border: '1.5px solid var(--success)',
                borderRadius: 'var(--r-md)', padding: '9px 13px',
                fontSize: 12.5, fontWeight: 900, color: 'var(--success)',
              }}>✅ Você leu todas as aulas de hoje — bônus desbloqueado!</div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 12 }}>
              {todaysLessons.map(lesson => (
                <LessonCard key={lesson.id} lesson={lesson} isRead={state.lessonReads.includes(lesson.id)} dispatch={dispatch} />
              ))}
            </div>
          </section>
        )}

        {/* Missões do Dia */}
        <section>
          <div className="sec-head">
            <span className="sec-title display">Missões do Dia</span>
            <span className="sec-line"></span>
            <span className="sec-count">{completedCount} / {tasks.length}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
            {tasks.map(task => {
              const examForTask = upcomingExams.find(e => e.subject === task.subject)
              return (
                <TaskCard
                  key={task.id}
                  task={task}
                  completions={completions}
                  examDaysLeft={examForTask?.daysLeft}
                  dispatch={dispatch}
                />
              )
            })}
          </div>
        </section>

        {/* Mini Ranking */}
        <section style={{
          background: 'linear-gradient(180deg, var(--raised), var(--card))',
          border: '2.5px solid var(--border)', borderRadius: 'var(--r-lg)',
          padding: 14, boxShadow: 'var(--shadow-card)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ fontSize: 18 }}>🏆</span>
            <span style={{ fontFamily: 'Anton, sans-serif', textTransform: 'uppercase', fontSize: 14, color: '#fff' }}>
              Ranking da Turma — Semana
            </span>
          </div>
          {top3.map((entry, i) => (
            <div key={entry.childId} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '8px 0', borderBottom: '1px solid var(--border)',
            }}>
              <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 18, width: 26, textAlign: 'center', color: '#fff' }}>{i + 1}</span>
              <span style={{ fontSize: 18, width: 22, textAlign: 'center' }}>{['🥇', '🥈', '🥉'][i]}</span>
              <span style={{
                width: 34, height: 34, borderRadius: '50%', border: '2px solid var(--ink)',
                display: 'grid', placeItems: 'center', fontSize: 16, flexShrink: 0,
                background: AV_BG[entry.avatarConfig.background] ?? 'var(--raised)',
              }}>{AV_EMOJI[entry.childId] ?? '🥷'}</span>
              <span style={{ flex: 1, fontWeight: 900, fontSize: 13.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{entry.name}</span>
              <span style={{ fontWeight: 900, fontSize: 13, color: 'var(--xp)', whiteSpace: 'nowrap' }}>{entry.xpWeekly}</span>
            </div>
          ))}
          {myEntry && myEntry.rank > 3 && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: 'rgba(255,107,0,.10)', border: '2px solid var(--orange)',
              borderRadius: 'var(--r-md)', padding: '8px 11px', marginTop: 6,
            }}>
              <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 18, width: 26, textAlign: 'center', color: 'var(--orange)' }}>{myEntry.rank}</span>
              <span style={{ fontSize: 18, width: 22, textAlign: 'center' }}>🥷</span>
              <span style={{
                width: 34, height: 34, borderRadius: '50%', border: '2px solid var(--ink)',
                display: 'grid', placeItems: 'center', fontSize: 16, flexShrink: 0,
                background: 'var(--orange)',
              }}>🥷</span>
              <span style={{ flex: 1, fontWeight: 900, fontSize: 13.5 }}>Você · {child.name}</span>
              <span style={{ fontWeight: 900, fontSize: 13, color: 'var(--xp)', whiteSpace: 'nowrap' }}>{child.xpWeekly}</span>
            </div>
          )}
          <Link href="/aluno/ranking" style={{ textDecoration: 'none', display: 'block', marginTop: 12 }}>
            <button style={{
              width: '100%', fontWeight: 900, fontSize: 12.5, textTransform: 'uppercase', letterSpacing: '.5px',
              color: 'var(--orange-soft)', background: 'rgba(255,107,0,.06)',
              border: '2px solid var(--orange)', borderRadius: 'var(--r-pill)', minHeight: 44, cursor: 'pointer',
            }}>Ver ranking completo →</button>
          </Link>
        </section>

      </div>
    </>
  )
}

function LessonCard({
  lesson, isRead, dispatch,
}: {
  lesson: import('@/lib/types').DailyLesson
  isRead: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: (a: any) => void
}) {
  const [expanded, setExpanded] = useState(false)
  const sc = getSubj(lesson.subject)

  function handleExpand() {
    setExpanded(true)
    if (!isRead) dispatch({ type: 'READ_LESSON', lessonId: lesson.id })
  }

  return (
    <article style={{
      background: isRead
        ? 'linear-gradient(180deg, rgba(52,199,89,.08), rgba(18,11,46,.4))'
        : 'linear-gradient(180deg, var(--raised), var(--card))',
      border: `2px solid ${isRead ? 'var(--success)' : 'var(--border)'}`,
      borderRadius: 'var(--r-lg)', overflow: 'hidden',
      boxShadow: 'var(--shadow-card)',
      opacity: isRead && !expanded ? .8 : 1,
    }}>
      <button
        onClick={isRead ? () => setExpanded(e => !e) : handleExpand}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 11, textAlign: 'left',
        }}
      >
        <span className={`subj ${sc.cls}`} style={{ flexShrink: 0 }}><i>{sc.ico}</i>{lesson.subject}</span>
        <span style={{ flex: 1, fontWeight: 900, fontSize: 14, color: isRead ? 'var(--text-dim)' : '#fff' }}>
          {lesson.topic}
        </span>
        <span style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
          {isRead
            ? <span style={{ fontSize: 13, color: 'var(--success)', fontWeight: 900 }}>✅ +{lesson.xpReward} XP</span>
            : <span style={{ fontSize: 11, fontWeight: 900, color: 'var(--orange-soft)', background: 'rgba(255,107,0,.1)', border: '1.5px solid var(--orange)', borderRadius: 'var(--r-pill)', padding: '3px 9px' }}>+{lesson.xpReward} XP</span>
          }
          <span style={{ fontSize: 11, color: 'var(--text-faint)' }}>{expanded ? '▲' : '▼'}</span>
        </span>
      </button>

      {expanded && (
        <div style={{ padding: '0 14px 14px' }}>
          <div style={{
            background: 'rgba(255,255,255,.04)', border: '1px solid var(--border)',
            borderRadius: 'var(--r-md)', padding: '11px 13px',
            fontSize: 13.5, fontWeight: 700, color: '#fff', lineHeight: 1.6,
          }}>
            {lesson.kidSummary ?? (
              <span style={{ color: 'var(--text-faint)', fontStyle: 'italic' }}>
                Resumo ainda não gerado. Peça ao responsável para clicar em "✨ Gerar com IA" no painel.
              </span>
            )}
          </div>
          {!isRead && (
            <button
              onClick={handleExpand}
              style={{
                marginTop: 10, width: '100%', minHeight: 44,
                fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '.5px',
                color: '#fff', textShadow: '0 2px 0 rgba(11,6,32,.45)',
                background: 'linear-gradient(180deg,var(--orange-soft),var(--orange))',
                border: '2.5px solid var(--ink)', borderRadius: 'var(--r-pill)', cursor: 'pointer',
                boxShadow: 'var(--glow-orange)',
              }}
            >⚡ Marcar como lido · +{lesson.xpReward} XP</button>
          )}
        </div>
      )}
    </article>
  )
}

function TaskCard({
  task, completions, examDaysLeft, dispatch,
}: {
  task: import('@/lib/types').Task
  completions: import('@/lib/types').TaskCompletion[]
  examDaysLeft?: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  dispatch: (a: any) => void
}) {
  const isCompleted = isTaskCompleted(task.id, completions)
  const [pressing, setPressing] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const sc = getSubj(task.subject)
  const hasExam = examDaysLeft !== undefined
  const xpBonus = hasExam ? task.xpValue * 2 : task.xpValue
  const hasDesc = !!task.description
  const canComplete = !hasDesc || expanded

  return (
    <article className={`task ${isCompleted ? 'done' : hasExam ? 'exam' : 'pending'}`}>
      <div className="task-badges">
        <span className={`subj ${sc.cls}`}><i>{sc.ico}</i>{task.subject}</span>
        {hasExam && !isCompleted && (
          <span className="badge-warn">
            ⚠️ Prova em {examDaysLeft === 0 ? 'HOJE' : examDaysLeft === 1 ? 'amanhã' : `${examDaysLeft} dias`}
          </span>
        )}
        {isCompleted && <span className="check">✅</span>}
      </div>

      <h3 className="task-title">{task.title}</h3>

      {/* Descrição expansível */}
      {hasDesc && !isCompleted && (
        <div style={{ marginTop: 10 }}>
          <button
            onClick={() => setExpanded(e => !e)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7, width: '100%',
              background: expanded ? 'rgba(255,107,0,.10)' : 'rgba(255,255,255,.04)',
              border: `1.5px solid ${expanded ? 'var(--orange)' : 'var(--border)'}`,
              borderRadius: expanded ? '12px 12px 0 0' : 12,
              padding: '9px 13px', cursor: 'pointer',
              fontWeight: 900, fontSize: 12.5, color: expanded ? 'var(--orange-soft)' : 'var(--text-dim)',
              transition: 'background .15s, border-color .15s, color .15s',
            }}
          >
            <span style={{ fontSize: 15 }}>📖</span>
            <span style={{ flex: 1, textAlign: 'left' }}>O que fazer</span>
            <span style={{ fontSize: 11, opacity: .7 }}>{expanded ? '▲ fechar' : '▼ ver'}</span>
          </button>
          {expanded && (
            <div style={{
              background: 'rgba(255,107,0,.06)', border: '1.5px solid var(--orange)',
              borderTop: 'none', borderRadius: '0 0 12px 12px',
              padding: '12px 14px',
              fontSize: 13.5, fontWeight: 700, color: '#fff', lineHeight: 1.6,
            }}>
              {task.description}
            </div>
          )}
        </div>
      )}

      <div className={`task-foot${task.title.length > 28 ? ' full' : ''}`} style={{ marginTop: 12 }}>
        {isCompleted ? (
          <span className="xp-earned">✓ +{task.xpValue} XP ganhos</span>
        ) : (
          <>
            <span className={`xp-tag${hasExam ? ' bonus' : ''}`}>⭐ +{xpBonus} XP{hasExam ? ' · bônus' : ''}</span>
            {canComplete ? (
              <button
                onPointerDown={() => setPressing(true)}
                onPointerUp={() => { setPressing(false); dispatch({ type: 'COMPLETE_TASK', taskId: task.id }) }}
                onPointerLeave={() => setPressing(false)}
                style={{
                  flex: 1, fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: '.5px',
                  color: '#fff', textShadow: '0 2px 0 rgba(11,6,32,.45)',
                  background: 'linear-gradient(180deg,var(--orange-soft),var(--orange))',
                  border: '2.5px solid var(--ink)', borderRadius: 'var(--r-pill)', minHeight: 48, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  boxShadow: pressing ? '0 2px 0 var(--orange-deep)' : 'var(--glow-orange)',
                  transform: pressing ? 'translateY(3px)' : undefined,
                  transition: 'transform .08s, box-shadow .08s',
                }}
              >⚡ Concluir missão</button>
            ) : (
              <button
                onClick={() => setExpanded(true)}
                style={{
                  flex: 1, fontWeight: 900, fontSize: 13, textTransform: 'uppercase', letterSpacing: '.5px',
                  color: 'var(--text-dim)', background: 'var(--raised)',
                  border: '2px dashed var(--border)', borderRadius: 'var(--r-pill)', minHeight: 48, cursor: 'pointer',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >📖 Leia antes de concluir</button>
            )}
          </>
        )}
      </div>
    </article>
  )
}
