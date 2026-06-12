'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CLASSROOM } from '@/lib/mock-data'

export default function ConvitePage() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function submit(currentCode?: string) {
    const val = (currentCode ?? code).trim().toUpperCase()
    if (val.length < 4) return
    setError('')
    setLoading(true)
    if (val === CLASSROOM.inviteCode.toUpperCase()) {
      router.push('/aluno')
    } else {
      setError('Código inválido. Peça o código para seus pais.')
      setLoading(false)
    }
  }

  function useDemo() {
    router.push('/aluno')
  }

  return (
    <div className="phone" style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh' }}>
      {/* SPLASH */}
      <div style={{
        flexShrink: 0, position: 'relative', height: 280, overflow: 'hidden',
        background: 'radial-gradient(ellipse 90% 140% at 50% 60%, rgba(255,107,0,.28) 0%, rgba(61,123,255,.14) 40%, transparent 70%), var(--bg)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {/* Spinning conic rays */}
        <div style={{
          position: 'absolute', inset: 0, opacity: .4,
          background: 'conic-gradient(from 0deg, transparent 5deg, rgba(255,107,0,.4) 10deg, transparent 15deg, transparent 20deg, rgba(61,123,255,.3) 25deg, transparent 30deg)',
          animation: 'spinRays 12s linear infinite',
        }} />
        <div style={{
          position: 'absolute', inset: 0, opacity: .3,
          background: 'conic-gradient(from 180deg, transparent 5deg, rgba(247,201,72,.5) 10deg, transparent 15deg)',
          animation: 'spinRays 8s linear infinite reverse',
        }} />

        {/* Pulse rings */}
        {[140, 100, 68].map((sz, i) => (
          <div key={sz} style={{
            position: 'absolute', width: sz, height: sz, borderRadius: '50%',
            border: `${2 - i * 0.3}px solid rgba(255,107,0,${0.5 - i * 0.12})`,
            animation: `ringPulse ${2 + i * 0.5}s ease-in-out ${i * 0.4}s infinite`,
          }} />
        ))}

        {/* Leaf core */}
        <div style={{
          position: 'relative', zIndex: 2,
          width: 72, height: 72, borderRadius: '50%', border: '3px solid var(--ink)',
          background: 'conic-gradient(from 0deg, var(--orange), var(--gold), var(--orange))',
          display: 'grid', placeItems: 'center', fontSize: 34,
          boxShadow: '0 0 28px -4px rgba(255,107,0,.8), 0 0 0 6px rgba(255,107,0,.15)',
        }}>🍥</div>

        {/* Particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: 3 + (i % 3), height: 3 + (i % 3), borderRadius: '50%',
            background: ['var(--orange)', 'var(--gold)', '#3D9BFF', '#fff'][i % 4],
            left: `${10 + (i * 7) % 80}%`, top: `${15 + (i * 11) % 70}%`,
            opacity: 0.4 + (i % 3) * 0.2,
            animation: `floaty ${3 + (i % 3)}s ease-in-out ${-(i % 4)}s infinite`,
          }} />
        ))}
      </div>

      {/* BODY */}
      <div style={{
        flex: 1, padding: '0 24px 32px', display: 'flex', flexDirection: 'column', gap: 20,
        position: 'relative', zIndex: 1,
        background: 'linear-gradient(180deg, rgba(18,11,46,0) 0%, var(--bg) 60px)',
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginTop: 4 }}>
          <div className="display" style={{ fontSize: 36, letterSpacing: 1 }}>
            <span style={{ color: 'var(--orange-soft)' }}>Turma</span>
            <span style={{ color: 'var(--gold)' }}>XP</span>
          </div>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-dim)', marginTop: 4 }}>
            A arena ninja da sua turma
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 10,
            background: 'var(--raised)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-pill)',
            padding: '6px 16px', fontSize: 12, fontWeight: 900, color: 'var(--text-dim)',
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--success)' }} />
            {CLASSROOM.name}
          </div>
        </div>

        {/* CÓDIGO */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 12, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center' }}>
            Código da missão
          </div>
          <input
            type="text"
            value={code}
            onChange={e => { setCode(e.target.value.toUpperCase()); setError('') }}
            onKeyDown={e => e.key === 'Enter' && submit(e.currentTarget.value)}
            placeholder="Ex: TURMA2025"
            maxLength={16}
            autoCapitalize="characters"
            autoComplete="off"
            spellCheck={false}
            style={{
              width: '100%', height: 58, textAlign: 'center', textTransform: 'uppercase',
              fontFamily: 'Anton, sans-serif', fontSize: 24, letterSpacing: 4, color: '#fff',
              background: code ? 'rgba(255,107,0,.10)' : 'var(--raised)',
              border: `2.5px solid ${code ? 'var(--orange)' : 'var(--border)'}`,
              borderRadius: 16, outline: 'none', boxSizing: 'border-box',
              transition: 'border-color .15s, background .15s',
              boxShadow: code ? '0 0 0 1px rgba(255,107,0,.2), inset 0 2px 6px rgba(0,0,0,.3)' : 'inset 0 2px 6px rgba(0,0,0,.3)',
            }}
          />
          {error && (
            <div style={{
              background: 'rgba(231,76,60,.12)', border: '1.5px solid rgba(231,76,60,.4)',
              borderRadius: 'var(--r-md)', padding: '9px 12px',
              fontSize: 12, fontWeight: 800, color: '#ff6b6b', textAlign: 'center',
            }}>{error}</div>
          )}
          <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--text-faint)', textAlign: 'center' }}>
            🔑 Peça o código para seus pais
          </div>
        </div>

        {/* Enter button */}
        <button
          onClick={() => submit()}
          disabled={loading || code.trim().length < 4}
          style={{
            width: '100%', minHeight: 56, borderRadius: 'var(--r-pill)', cursor: code.trim().length >= 4 && !loading ? 'pointer' : 'not-allowed',
            fontFamily: 'Anton, sans-serif', fontSize: 18, textTransform: 'uppercase', letterSpacing: 1,
            color: '#fff', textShadow: '0 2px 0 rgba(11,6,32,.4)',
            background: code.trim().length >= 4 && !loading
              ? 'linear-gradient(180deg, var(--orange-soft), var(--orange))'
              : 'var(--raised)',
            border: `2.5px solid ${code.trim().length >= 4 && !loading ? 'var(--ink)' : 'var(--border)'}`,
            boxShadow: code.trim().length >= 4 && !loading ? 'var(--glow-orange)' : undefined,
            opacity: loading ? .7 : 1,
            transition: 'background .2s, border-color .2s, box-shadow .2s',
          }}
        >
          {loading ? '⏳ Verificando...' : 'Entrar na Arena'}
        </button>

        {/* Demo fill */}
        <button onClick={useDemo} style={{
          fontSize: 11, fontWeight: 800, color: 'var(--text-faint)', background: 'none', border: 'none',
          cursor: 'pointer', textDecoration: 'underline',
        }}>Usar código demo</button>

        {/* Parent link */}
        <Link href="/login" style={{ textDecoration: 'none', textAlign: 'center' }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--text-dim)' }}>
            Sou pai ou mãe <b style={{ color: 'var(--orange-soft)' }}>→</b>
          </span>
        </Link>
      </div>

      <style>{`
        @keyframes spinRays { to { transform: rotate(360deg); } }
        @keyframes floaty { 0%,100%{ transform:translateY(0) scale(1);} 50%{ transform:translateY(-14px) scale(1.3);} }
      `}</style>
    </div>
  )
}
