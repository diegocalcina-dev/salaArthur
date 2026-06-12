'use client'
import { useState } from 'react'
import { useStore, isTaskCompleted } from '@/lib/store'
import type { TaskRecurrence, TaskSubject } from '@/lib/types'

const SUBJECTS: TaskSubject[] = ['Matemática', 'Português', 'Ciências', 'História', 'Geografia', 'Inglês', 'Educação Física', 'Artes', 'Socioemocional']
const SUBJ_SHORT: Record<string, string> = { Matemática: '÷', Português: 'A', Ciências: '⚗', História: '⌛', Geografia: '🌎', Inglês: '🇺🇸', 'Educação Física': '⚽', Artes: '🎨', Socioemocional: '🧠' }
const SUBJ_COLOR: Record<string, string> = { Matemática: '#3D7BFF', Português: '#34C759', Ciências: '#9B59B6', História: '#F7A93B', Geografia: '#10B981', Inglês: '#7C3AED', 'Educação Física': '#EF4444', Artes: '#EC4899', Socioemocional: '#06B6D4' }
const FREQ_LABELS: Record<string, string> = { daily: '🔁 Diária', weekly: '🗓️ Semanal', once: '📌 Única' }
const FREQ_COLOR: Record<string, string> = { daily: 'var(--success)', weekly: 'var(--gold)', once: '#9DBBFF' }

const XP_OPTS = [5, 10, 15, 20, 25, 30]
const MIN_OPTS = [5, 10, 15, 20]
const RECURRENCES: { v: TaskRecurrence; l: string }[] = [
  { v: 'once', l: 'Uma vez' }, { v: 'daily', l: 'Todo dia' }, { v: 'weekly', l: 'Semanal' },
]
const CHIPS = ['Todas', 'Diárias', 'Semanais', 'Únicas']
const CHIP_REC: Record<string, TaskRecurrence | null> = { Todas: null, Diárias: 'daily', Semanais: 'weekly', Únicas: 'once' }

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb']
const DAYS_FULL = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const WEEKDAYS = [1, 2, 3, 4, 5] as const

const DEFAULT_FORM = {
  title: '', subject: 'Matemática' as TaskSubject,
  description: '',
  xpValue: 10, minutesReward: 5, recurrence: 'once' as TaskRecurrence,
  dueDate: new Date().toISOString().split('T')[0],
}

export default function TarefasPage() {
  const { state, dispatch } = useStore()
  const { tasks, completions, child } = state
  const [tab, setTab] = useState<'missoes' | 'cronograma'>('missoes')
  const [chip, setChip] = useState('Todas')
  const [showSheet, setShowSheet] = useState(false)
  const [form, setForm] = useState({ ...DEFAULT_FORM })
  const [selectedDay, setSelectedDay] = useState<1|2|3|4|5>(new Date().getDay() === 0 || new Date().getDay() === 6 ? 1 : new Date().getDay() as 1|2|3|4|5)
  const [showLessonForm, setShowLessonForm] = useState(false)
  const [lessonForm, setLessonForm] = useState({ subject: 'Matemática' as import('@/lib/types').TaskSubject, topic: '' })
  const [aiStatus, setAiStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')

  const { dailyLessons } = state
  const dayLessons = dailyLessons.filter(l => l.dayOfWeek === selectedDay)

  function addLesson(e: React.FormEvent) {
    e.preventDefault()
    if (!lessonForm.topic.trim()) return
    dispatch({ type: 'ADD_LESSON', lesson: { classroomId: 'cls-1', dayOfWeek: selectedDay, subject: lessonForm.subject, topic: lessonForm.topic, xpReward: 5 } })
    setLessonForm({ subject: 'Matemática', topic: '' })
    setShowLessonForm(false)
  }

  async function exportForAI() {
    const tasksWithDesc = tasks.filter(t => t.description)
    const lessonsWithTopic = dailyLessons.filter(l => l.topic)
    if (!tasksWithDesc.length && !lessonsWithTopic.length) return
    setAiStatus('sending')
    try {
      const res = await fetch('/api/export-tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tasks: tasksWithDesc.map(t => ({ id: t.id, title: t.title, subject: t.subject, description: t.description })),
          lessons: lessonsWithTopic.map(l => ({ id: l.id, subject: l.subject, topic: l.topic, day: DAYS_FULL[l.dayOfWeek] })),
        }),
      })
      if (!res.ok) throw new Error()
      setAiStatus('done')
    } catch {
      setAiStatus('error')
    }
  }

  const filtered = tasks.filter(t => {
    const rec = CHIP_REC[chip]
    return !rec || t.recurrence === rec
  })

  function addTask(e: React.FormEvent) {
    e.preventDefault()
    if (!form.title.trim()) return
    dispatch({ type: 'ADD_TASK', task: { ...form, classroomId: 'cls-1', createdBy: 'parent-1' } })
    setForm({ ...DEFAULT_FORM })
    setShowSheet(false)
  }

  return (
    <>
      {/* HEADER */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'linear-gradient(180deg, rgba(23,14,56,.97), rgba(18,11,46,.9))',
        backdropFilter: 'blur(8px)', borderBottom: '1.5px solid var(--border)',
        padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
      }}>
        <div>
          <h1 className="display" style={{ fontSize: 21, color: '#fff' }}>Missões de {child.name.split(' ')[0]}</h1>
        </div>
        <div style={{ display: 'flex', gap: 8, flexShrink: 0 }}>
          {tasks.some(t => t.description) && (
            <button
              onClick={exportForAI}
              disabled={aiStatus === 'sending'}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                fontWeight: 900, fontSize: 12, padding: '9px 13px',
                borderRadius: 'var(--r-pill)', cursor: aiStatus === 'sending' ? 'wait' : 'pointer',
                border: `2px solid ${aiStatus === 'done' ? 'var(--success)' : 'var(--border)'}`,
                background: aiStatus === 'done' ? 'rgba(52,199,89,.12)' : 'var(--raised)',
                color: aiStatus === 'done' ? 'var(--success)' : aiStatus === 'error' ? 'var(--danger)' : 'var(--text-dim)',
              }}
            >
              {aiStatus === 'sending' ? '⏳' : aiStatus === 'done' ? '✅' : aiStatus === 'error' ? '❌' : '✨'}{' '}
              {aiStatus === 'done' ? 'Pronto! Fale "gera"' : aiStatus === 'error' ? 'Erro' : 'Gerar com IA'}
            </button>
          )}
          <button
            onClick={() => setShowSheet(true)}
            style={{
              flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 6,
              fontWeight: 900, fontSize: 12.5, color: '#fff', textShadow: '0 2px 0 rgba(11,6,32,.4)',
              background: 'linear-gradient(180deg, var(--orange-soft), var(--orange))',
              border: '2px solid var(--ink)', borderRadius: 'var(--r-pill)', padding: '9px 16px',
              boxShadow: 'var(--glow-orange)', cursor: 'pointer',
            }}
          >➕ Nova</button>
        </div>
      </header>

      {/* TABS */}
      <div style={{ display: 'flex', borderBottom: '1.5px solid var(--border)', padding: '0 16px' }}>
        {(['missoes', 'cronograma'] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: '11px 0', fontWeight: 900, fontSize: 13, cursor: 'pointer',
            background: 'none', border: 'none', borderBottom: `3px solid ${tab === t ? 'var(--orange)' : 'transparent'}`,
            color: tab === t ? 'var(--orange-soft)' : 'var(--text-dim)',
            marginBottom: -1.5,
          }}>
            {t === 'missoes' ? '📋 Missões' : '📅 Cronograma'}
          </button>
        ))}
      </div>

      {/* FILTER CHIPS — só na aba missões */}
      {tab === 'missoes' && (
        <div style={{ display: 'flex', gap: 8, padding: '12px 16px 4px', overflowX: 'auto' }}>
          {CHIPS.map(c => (
            <button
              key={c}
              onClick={() => setChip(c)}
              style={{
                flexShrink: 0, fontWeight: 900, fontSize: 12, padding: '7px 14px',
                borderRadius: 'var(--r-pill)', cursor: 'pointer', whiteSpace: 'nowrap',
                background: chip === c ? 'linear-gradient(180deg, var(--orange-soft), var(--orange))' : 'var(--raised)',
                border: `1.5px solid ${chip === c ? 'var(--ink)' : 'var(--border)'}`,
                color: chip === c ? '#fff' : 'var(--text-dim)',
                boxShadow: chip === c ? 'var(--glow-orange)' : undefined,
              }}
            >{c}</button>
          ))}
        </div>
      )}

      {/* ABA CRONOGRAMA */}
      {tab === 'cronograma' && (
        <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 14 }}>
          {/* Seletor de dia */}
          <div style={{ display: 'flex', gap: 6 }}>
            {WEEKDAYS.map(d => (
              <button key={d} onClick={() => setSelectedDay(d)} style={{
                flex: 1, height: 44, borderRadius: 'var(--r-md)', fontWeight: 900, fontSize: 12, cursor: 'pointer',
                background: selectedDay === d ? 'linear-gradient(180deg,var(--orange-soft),var(--orange))' : 'var(--raised)',
                border: `1.5px solid ${selectedDay === d ? 'var(--ink)' : 'var(--border)'}`,
                color: selectedDay === d ? '#fff' : 'var(--text-dim)',
                boxShadow: selectedDay === d ? 'var(--glow-orange)' : undefined,
              }}>{DAYS[d]}</button>
            ))}
          </div>

          <div style={{ fontWeight: 900, fontSize: 13, color: 'var(--text-dim)' }}>
            {DAYS_FULL[selectedDay]} — {dayLessons.length} aula{dayLessons.length !== 1 ? 's' : ''}
          </div>

          {dayLessons.map(lesson => (
            <div key={lesson.id} style={{
              background: 'linear-gradient(180deg, var(--raised), var(--card))',
              border: '1.5px solid var(--border)', borderRadius: 'var(--r-lg)',
              padding: 13, boxShadow: 'var(--shadow-card)',
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{
                    fontSize: 9.5, fontWeight: 900, letterSpacing: .5, textTransform: 'uppercase',
                    padding: '3px 10px', borderRadius: 'var(--r-pill)',
                    color: 'var(--text-dim)', border: '1.5px solid var(--border)', background: 'rgba(255,255,255,.04)',
                  }}>{lesson.subject}</span>
                  <div style={{ fontWeight: 900, fontSize: 14, color: '#fff', marginTop: 7 }}>{lesson.topic}</div>
                  {lesson.kidSummary && (
                    <div style={{
                      marginTop: 8, fontSize: 12, fontWeight: 700, color: 'var(--text-dim)',
                      background: 'rgba(255,255,255,.04)', border: '1px solid var(--border)',
                      borderRadius: 'var(--r-md)', padding: '8px 10px', lineHeight: 1.5,
                    }}>✨ {lesson.kidSummary}</div>
                  )}
                </div>
                <button
                  onClick={() => dispatch({ type: 'DELETE_LESSON', lessonId: lesson.id })}
                  style={{
                    flexShrink: 0, width: 32, height: 32, borderRadius: 9,
                    border: '1.5px solid rgba(231,76,60,.4)', background: 'rgba(231,76,60,.1)',
                    color: 'var(--danger)', fontSize: 14, cursor: 'pointer', display: 'grid', placeItems: 'center',
                  }}
                >🗑️</button>
              </div>
            </div>
          ))}

          {!showLessonForm ? (
            <button onClick={() => setShowLessonForm(true)} style={{
              width: '100%', minHeight: 48, borderRadius: 'var(--r-lg)',
              border: '2px dashed var(--border)', background: 'rgba(255,107,0,.04)',
              fontWeight: 900, fontSize: 13, color: 'var(--orange-soft)', cursor: 'pointer',
            }}>➕ Adicionar aula</button>
          ) : (
            <form onSubmit={addLesson} style={{
              background: 'var(--raised)', border: '2px solid var(--orange)',
              borderRadius: 'var(--r-lg)', padding: 14, display: 'flex', flexDirection: 'column', gap: 11,
            }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {SUBJECTS.map(s => (
                  <button key={s} type="button" onClick={() => setLessonForm(f => ({ ...f, subject: s }))} style={{
                    fontSize: 11, fontWeight: 900, padding: '6px 12px', borderRadius: 'var(--r-pill)', cursor: 'pointer',
                    background: lessonForm.subject === s ? 'linear-gradient(180deg,var(--orange-soft),var(--orange))' : 'var(--raised)',
                    border: `1.5px solid ${lessonForm.subject === s ? 'var(--ink)' : 'var(--border)'}`,
                    color: lessonForm.subject === s ? '#fff' : 'var(--text-dim)',
                  }}>{s}</button>
                ))}
              </div>
              <input
                type="text" value={lessonForm.topic}
                onChange={e => setLessonForm(f => ({ ...f, topic: e.target.value }))}
                placeholder="Tópico da aula (ex: Frações)"
                className="inp" autoFocus
              />
              <div style={{ display: 'flex', gap: 8 }}>
                <button type="button" onClick={() => setShowLessonForm(false)} style={{
                  flex: 1, height: 42, borderRadius: 'var(--r-pill)', border: '1.5px solid var(--border)',
                  background: 'var(--card)', fontWeight: 900, fontSize: 13, color: 'var(--text-dim)', cursor: 'pointer',
                }}>Cancelar</button>
                <button type="submit" className="btn-orange" style={{ flex: 1, height: 42, fontSize: 13 }}>Adicionar ✓</button>
              </div>
            </form>
          )}
        </div>
      )}

      {/* ABA MISSÕES */}
      {tab === 'missoes' && (
      <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {filtered.length === 0 && (
          <div style={{
            background: 'var(--card)', border: '1.5px dashed var(--border)', borderRadius: 'var(--r-lg)',
            padding: 32, textAlign: 'center',
          }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>📋</div>
            <div style={{ fontWeight: 900, fontSize: 14, color: 'var(--text-dim)' }}>Nenhuma missão aqui</div>
            <div style={{ fontSize: 11.5, color: 'var(--text-faint)', marginTop: 4 }}>Crie a primeira missão para {child.name.split(' ')[0]}</div>
          </div>
        )}

        {filtered.map(task => {
          const done = isTaskCompleted(task.id, completions)
          const col = SUBJ_COLOR[task.subject] ?? 'var(--text-dim)'
          const freqCol = FREQ_COLOR[task.recurrence] ?? 'var(--text-dim)'
          return (
            <article key={task.id} style={{
              background: 'linear-gradient(180deg, var(--raised), var(--card))',
              border: '1.5px solid var(--border)', borderRadius: 'var(--r-lg)',
              padding: 14, boxShadow: 'var(--shadow-card)',
            }}>
              {/* Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 9 }}>
                <span style={{
                  fontSize: 9.5, fontWeight: 900, letterSpacing: .5, textTransform: 'uppercase', whiteSpace: 'nowrap',
                  padding: '3px 10px', borderRadius: 'var(--r-pill)',
                  color: freqCol, background: `rgba(${freqCol === 'var(--success)' ? '52,199,89' : freqCol === 'var(--gold)' ? '247,201,72' : '157,187,255'},.12)`,
                  border: `1.5px solid ${freqCol}`,
                }}>{FREQ_LABELS[task.recurrence]}</span>
                <span style={{
                  fontSize: 9.5, fontWeight: 900, letterSpacing: .5, textTransform: 'uppercase',
                  padding: '3px 10px', borderRadius: 'var(--r-pill)', whiteSpace: 'nowrap',
                  color: col, border: `1.5px solid ${col}`,
                  background: `rgba(255,255,255,.04)`,
                }}>
                  <i style={{ fontStyle: 'normal' }}>{SUBJ_SHORT[task.subject] ?? '📝'}</i> {task.subject}
                </span>
                {done && (
                  <span style={{
                    fontSize: 9.5, fontWeight: 900, color: 'var(--success)',
                    background: 'rgba(52,199,89,.12)', border: '1.5px solid var(--success)',
                    borderRadius: 'var(--r-pill)', padding: '3px 10px',
                  }}>✅ Feita hoje</span>
                )}
              </div>

              <h3 style={{ fontWeight: 900, fontSize: 15, color: done ? 'var(--text-dim)' : '#fff', marginBottom: 6, textDecoration: done ? 'line-through' : undefined }}>
                {task.title}
              </h3>

              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-faint)', marginBottom: task.description ? 8 : 10 }}>
                {task.recurrence === 'daily' ? '🔁 Repete todo dia útil' :
                 task.recurrence === 'weekly' ? '🔁 Toda semana' :
                 task.dueDate ? `📅 Até ${new Date(task.dueDate).toLocaleDateString('pt-BR')}` : '📌 Uma vez'}
              </div>

              {task.description && (
                <div style={{
                  fontSize: 12.5, fontWeight: 700, color: 'var(--text-dim)', lineHeight: 1.55,
                  background: 'rgba(255,255,255,.04)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-md)', padding: '10px 12px', marginBottom: 10,
                }}>
                  📖 {task.description}
                </div>
              )}

              <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--gold)', marginBottom: 12 }}>
                ⭐ {task.xpValue} XP <span style={{ color: 'var(--text-dim)', marginLeft: 6 }}>🕐 +{task.minutesReward} min</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontSize: 11, fontWeight: 900, color: done ? 'var(--success)' : 'var(--text-faint)',
                  background: done ? 'rgba(52,199,89,.1)' : 'rgba(255,255,255,.04)',
                  border: `1.5px solid ${done ? 'var(--success)' : 'var(--border)'}`,
                  borderRadius: 'var(--r-pill)', padding: '4px 11px',
                }}>{done ? '✅ Feita' : '⏳ Pendente'}</span>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button style={{
                    width: 36, height: 36, borderRadius: 10, border: '1.5px solid var(--border)',
                    background: 'var(--raised)', color: '#fff', fontSize: 15, cursor: 'pointer', display: 'grid', placeItems: 'center',
                  }}>✏️</button>
                  <button
                    onClick={() => dispatch({ type: 'DELETE_TASK', taskId: task.id })}
                    style={{
                      width: 36, height: 36, borderRadius: 10, border: '1.5px solid rgba(231,76,60,.5)',
                      background: 'rgba(231,76,60,.12)', color: 'var(--danger)', fontSize: 15, cursor: 'pointer', display: 'grid', placeItems: 'center',
                    }}
                  >🗑️</button>
                </div>
              </div>
            </article>
          )
        })}

      </div>

      )} {/* fim aba missões */}

      {/* BOTTOM SHEET: Nova missão */}
      {showSheet && (
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 50,
            background: 'rgba(0,0,0,.7)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'flex-end',
          }}
          onClick={e => { if (e.target === e.currentTarget) setShowSheet(false) }}
        >
          <form
            onSubmit={addTask}
            style={{
              width: '100%', maxWidth: 390, margin: '0 auto',
              background: '#1e1340', border: '2px solid var(--border)', borderBottom: 'none',
              borderRadius: '24px 24px 0 0', padding: '0 18px 32px',
              maxHeight: '88dvh', overflowY: 'auto',
              animation: 'slideUp .3s cubic-bezier(.2,1,.4,1)',
            }}
          >
            {/* Grab handle */}
            <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0 4px' }}>
              <div style={{ width: 40, height: 4, borderRadius: 2, background: 'var(--border)' }} />
            </div>

            <h2 className="display" style={{ fontSize: 20, marginBottom: 4 }}>Nova missão</h2>
            <p style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-dim)', marginBottom: 18 }}>
              Crie uma tarefa para {child.name.split(' ')[0]} ganhar XP e tempo.
            </p>

            {/* Title */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: .8, marginBottom: 7 }}>
                Nome da missão
              </label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder="Ex: Lição de Matemática"
                className="inp"
                style={{ width: '100%', fontSize: 15 }}
              />
            </div>

            {/* Description */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: .8, marginBottom: 7 }}>
                O que fazer <span style={{ color: 'var(--text-faint)', fontWeight: 700, textTransform: 'none', letterSpacing: 0 }}>(opcional)</span>
              </label>
              <textarea
                value={form.description}
                onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Ex: Livro azul, pág. 45, exercícios 1 ao 8. Mostrar as contas no caderno."
                rows={3}
                className="inp"
                style={{ width: '100%', resize: 'none', lineHeight: 1.5, fontSize: 14 }}
              />
              <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-faint)', marginTop: 5 }}>
                📖 O filho precisa ler isso antes de poder concluir a missão.
              </div>
            </div>

            {/* Subject */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: .8, marginBottom: 8 }}>Matéria</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {SUBJECTS.map(s => (
                  <button
                    key={s} type="button"
                    onClick={() => setForm(f => ({ ...f, subject: s }))}
                    style={{
                      fontSize: 12, fontWeight: 900, padding: '7px 13px', borderRadius: 'var(--r-pill)', cursor: 'pointer',
                      background: form.subject === s ? 'linear-gradient(180deg,var(--orange-soft),var(--orange))' : 'var(--raised)',
                      border: `1.5px solid ${form.subject === s ? 'var(--ink)' : 'var(--border)'}`,
                      color: form.subject === s ? '#fff' : 'var(--text-dim)',
                    }}
                  >{s}</button>
                ))}
              </div>
            </div>

            {/* XP */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: .8, marginBottom: 8 }}>XP da missão</label>
              <div style={{ display: 'flex', gap: 7 }}>
                {XP_OPTS.map(v => (
                  <button key={v} type="button" onClick={() => setForm(f => ({ ...f, xpValue: v }))} style={{
                    flex: 1, height: 38, borderRadius: 'var(--r-md)', fontSize: 13, fontWeight: 900, cursor: 'pointer',
                    background: form.xpValue === v ? 'var(--gold)' : 'var(--raised)',
                    border: `1.5px solid ${form.xpValue === v ? 'var(--ink)' : 'var(--border)'}`,
                    color: form.xpValue === v ? 'var(--ink)' : 'var(--text-dim)',
                  }}>{v}</button>
                ))}
              </div>
            </div>

            {/* Minutes */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: .8, marginBottom: 8 }}>Minutos de recompensa</label>
              <div style={{ display: 'flex', gap: 7 }}>
                {MIN_OPTS.map(v => (
                  <button key={v} type="button" onClick={() => setForm(f => ({ ...f, minutesReward: v }))} style={{
                    flex: 1, height: 38, borderRadius: 'var(--r-md)', fontSize: 13, fontWeight: 900, cursor: 'pointer',
                    background: form.minutesReward === v ? 'var(--orange)' : 'var(--raised)',
                    border: `1.5px solid ${form.minutesReward === v ? 'var(--ink)' : 'var(--border)'}`,
                    color: form.minutesReward === v ? '#fff' : 'var(--text-dim)',
                  }}>{v}</button>
                ))}
              </div>
            </div>

            {/* Recurrence */}
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontSize: 11, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: .8, marginBottom: 8 }}>Frequência</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {RECURRENCES.map(r => (
                  <button key={r.v} type="button" onClick={() => setForm(f => ({ ...f, recurrence: r.v }))} style={{
                    flex: 1, height: 44, borderRadius: 'var(--r-md)', fontSize: 12, fontWeight: 900, cursor: 'pointer',
                    background: form.recurrence === r.v ? 'linear-gradient(180deg,var(--orange-soft),var(--orange))' : 'var(--raised)',
                    border: `1.5px solid ${form.recurrence === r.v ? 'var(--ink)' : 'var(--border)'}`,
                    color: form.recurrence === r.v ? '#fff' : 'var(--text-dim)',
                  }}>{r.l}</button>
                ))}
              </div>
            </div>

            {/* Due date (only for 'once') */}
            {form.recurrence === 'once' && (
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 11, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: .8, marginBottom: 7 }}>Data (entrega)</label>
                <input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} className="inp" style={{ width: '100%' }} />
              </div>
            )}

            <button
              type="submit"
              className="btn-orange wide"
              style={{ marginTop: 8, opacity: form.title.trim() ? 1 : .5, cursor: form.title.trim() ? 'pointer' : 'not-allowed', fontSize: 15 }}
            >
              Criar missão
            </button>
          </form>
        </div>
      )}

      <style>{`@keyframes slideUp { from{ transform:translateY(60px);opacity:0;} to{ transform:translateY(0);opacity:1;} }`}</style>
    </>
  )
}
