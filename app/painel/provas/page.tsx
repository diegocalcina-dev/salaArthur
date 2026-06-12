'use client'
import { useState } from 'react'
import { useStore } from '@/lib/store'
import { SUBJECT_EMOJIS } from '@/lib/mock-data'
import { getDaysUntil, cn } from '@/lib/utils'
import type { TaskSubject } from '@/lib/types'

const SUBJECTS: TaskSubject[] = ['Matemática', 'Português', 'Ciências', 'História', 'Geografia', 'Inglês', 'Educação Física', 'Artes']

export default function ProvasPage() {
  const { state, dispatch } = useStore()
  const { exams, child } = state
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    subject: 'Matemática' as TaskSubject,
    examDate: '',
  })

  function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!form.examDate) return
    dispatch({
      type: 'ADD_EXAM',
      exam: {
        ...form,
        classroomId: 'cls-1',
        createdBy: 'parent-1',
      },
    })
    setForm({ subject: 'Matemática', examDate: '' })
    setShowForm(false)
  }

  const sorted = [...exams].sort((a, b) => new Date(a.examDate).getTime() - new Date(b.examDate).getTime())

  return (
    <div className="px-4 py-4 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-white font-black text-xl">Provas</h1>
          <p className="text-white/40 text-xs">de {child.name}</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 rounded-xl gradient-brand font-bold text-white text-sm"
        >
          + Cadastrar
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="glass-card p-4 flex flex-col gap-3 animate-slide-up">
          <div className="text-white font-bold">Nova Prova</div>

          <div>
            <label className="text-white/40 text-xs block mb-1">Matéria</label>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm(f => ({ ...f, subject: s }))}
                  className={cn(
                    'px-2 py-1 rounded-lg text-xs font-bold transition-all',
                    form.subject === s ? 'gradient-brand text-white' : 'bg-white/5 text-white/50'
                  )}
                >
                  {SUBJECT_EMOJIS[s]} {s}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-white/40 text-xs block mb-1">Data da Prova</label>
            <input
              type="date"
              value={form.examDate}
              onChange={e => setForm(f => ({ ...f, examDate: e.target.value }))}
              min={new Date().toISOString().split('T')[0]}
              required
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-purple-500"
            />
          </div>

          <div className="glass p-3 rounded-xl">
            <div className="text-white/40 text-xs">Ao cadastrar, o TurmaXP vai:</div>
            <ul className="text-white/60 text-xs mt-1 space-y-0.5">
              <li>• Mostrar contagem regressiva para {child.name}</li>
              <li>• Criar missão de revisão 3 dias antes</li>
              <li>• Enviar notificação 1 dia antes</li>
            </ul>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="flex-1 py-2 rounded-xl bg-white/5 text-white/50 font-bold text-sm">
              Cancelar
            </button>
            <button type="submit" className="flex-1 py-2 rounded-xl gradient-brand text-white font-bold text-sm">
              Cadastrar ✓
            </button>
          </div>
        </form>
      )}

      {/* Exams list */}
      <div className="flex flex-col gap-2">
        {sorted.map(exam => {
          const daysLeft = getDaysUntil(exam.examDate)
          const isPast = daysLeft < 0
          return (
            <div
              key={exam.id}
              className={cn(
                'glass-card p-4 flex items-center gap-3',
                isPast && 'opacity-40',
                daysLeft === 0 && 'border-red-500/40 bg-red-900/20',
                daysLeft === 1 && 'border-orange-500/40 bg-orange-900/20',
              )}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex flex-col items-center justify-center shrink-0">
                <span className="text-xl">{SUBJECT_EMOJIS[exam.subject] || '📝'}</span>
              </div>
              <div className="flex-1">
                <div className="text-white font-bold">{exam.subject}</div>
                <div className="text-white/40 text-xs">
                  {new Date(exam.examDate + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className={cn(
                  'px-2 py-1 rounded-lg text-xs font-black',
                  isPast ? 'bg-white/5 text-white/30' :
                  daysLeft === 0 ? 'bg-red-500/20 text-red-400' :
                  daysLeft <= 3 ? 'bg-orange-500/20 text-orange-400' :
                  'bg-white/10 text-white/50'
                )}>
                  {isPast ? 'Passou' : daysLeft === 0 ? '⚠️ Hoje' : daysLeft === 1 ? 'Amanhã' : `${daysLeft} dias`}
                </div>
                <button
                  onClick={() => dispatch({ type: 'DELETE_EXAM', examId: exam.id })}
                  className="w-7 h-7 rounded-lg bg-red-500/20 text-red-400 text-xs flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {exams.length === 0 && (
        <div className="glass-card p-8 text-center">
          <div className="text-4xl mb-3">📅</div>
          <div className="text-white/50">Nenhuma prova cadastrada</div>
          <div className="text-white/30 text-sm mt-1">Adicione datas de provas para {child.name} ser lembrado automaticamente</div>
        </div>
      )}
    </div>
  )
}
