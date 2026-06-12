'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.includes('@')) return
    setLoading(true)
    setTimeout(() => {
      setSent(true)
      setLoading(false)
    }, 900)
  }

  return (
    <div className="phone" style={{ display: 'flex', flexDirection: 'column', minHeight: '100dvh', justifyContent: 'space-between' }}>

      {/* TOPO */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
        paddingTop: 60, paddingBottom: 8,
        background: 'radial-gradient(120% 100% at 50% 0%, rgba(255,107,0,.18), rgba(18,11,46,0) 55%)',
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: 22, border: '3px solid var(--ink)',
          background: 'linear-gradient(180deg, #3a2a7e, #1e1240)',
          display: 'grid', placeItems: 'center', fontSize: 36,
          boxShadow: '0 6px 0 var(--ink)',
        }}>🛡️</div>
        <div className="display" style={{ fontSize: 30, letterSpacing: 1, textAlign: 'center' }}>
          <span style={{ color: 'var(--orange-soft)' }}>Turma</span>
          <span style={{ color: 'var(--gold)' }}>XP</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1 }}>
          Painel dos Responsáveis
        </div>
      </div>

      {/* BODY */}
      <div style={{ flex: 1, padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {!sent ? (
          <>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 900, color: 'var(--text-dim)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: .8 }}>
                  Seu e-mail
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="voce@email.com"
                  className="inp"
                  style={{ width: '100%', fontSize: 16 }}
                />
                <p style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--text-faint)', marginTop: 8 }}>
                  Vamos enviar um link mágico. Sem senha para lembrar.
                </p>
              </div>

              <button
                type="submit"
                disabled={loading || !email.includes('@')}
                className="btn-orange wide"
                style={{
                  opacity: loading || !email.includes('@') ? .55 : 1,
                  cursor: loading || !email.includes('@') ? 'not-allowed' : 'pointer',
                  fontSize: 15,
                }}
              >
                {loading ? '⏳ Enviando...' : 'Enviar link de acesso'}
              </button>
            </form>

            {/* Divisor */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
              <span style={{ fontSize: 10.5, fontWeight: 900, color: 'var(--text-faint)', letterSpacing: 1, textTransform: 'uppercase' }}>aguardando</span>
              <span style={{ flex: 1, height: 1, background: 'var(--border)' }} />
            </div>

            {/* Demo */}
            <div style={{
              background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-md)', padding: '14px 16px',
              display: 'flex', flexDirection: 'column', gap: 10,
            }}>
              <p style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--text-faint)', textAlign: 'center' }}>
                Demonstração — entrar sem e-mail
              </p>
              <button
                onClick={() => router.push('/painel')}
                style={{
                  width: '100%', minHeight: 46, borderRadius: 'var(--r-pill)', cursor: 'pointer',
                  fontWeight: 900, fontSize: 13, color: 'var(--orange-soft)',
                  background: 'rgba(255,107,0,.08)', border: '1.5px solid var(--orange)',
                }}
              >
                Entrar como Carlos (Pai demo) 🚀
              </button>
            </div>
          </>
        ) : (
          /* SENT STATE */
          <div style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center', padding: '24px 0',
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%', border: '3px solid var(--ink)',
              background: 'linear-gradient(180deg, rgba(52,199,89,.2), rgba(52,199,89,.06))',
              display: 'grid', placeItems: 'center', fontSize: 38,
              boxShadow: '0 0 20px -4px rgba(52,199,89,.5)',
            }}>✉️</div>
            <div>
              <div style={{ fontFamily: 'Anton, sans-serif', fontSize: 22, letterSpacing: .5 }}>Link enviado!</div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-dim)', marginTop: 8, lineHeight: 1.5 }}>
                Verifique seu e-mail em <strong style={{ color: '#fff' }}>{email}</strong>.<br />
                Clique no link para acessar o painel.
              </p>
            </div>
            <button
              style={{
                width: '100%', minHeight: 46, borderRadius: 'var(--r-pill)', cursor: 'pointer',
                fontWeight: 900, fontSize: 13, color: 'var(--text-dim)',
                background: 'var(--raised)', border: '1.5px solid var(--border)',
              }}
              onClick={() => setSent(false)}
            >↻ Reenviar link</button>
            <button className="btn-orange wide" onClick={() => router.push('/painel')} style={{ fontSize: 14 }}>
              Simular acesso (demo) →
            </button>
          </div>
        )}

      </div>

      {/* RODAPÉ */}
      <div style={{ padding: '16px 24px 32px', display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 20 }}>
          <button style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-faint)', background: 'none', border: 'none', cursor: 'pointer' }}>
            Primeira vez? <b style={{ color: 'var(--text-dim)' }}>Criar conta</b>
          </button>
        </div>
        <Link href="/convite" style={{ textDecoration: 'none', fontSize: 12, fontWeight: 800, color: 'var(--text-dim)' }}>
          Sou criança <b style={{ color: 'var(--orange-soft)' }}>→</b>
        </Link>
        <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--text-faint)', display: 'flex', alignItems: 'center', gap: 5 }}>
          🔒 Seus dados são privados e protegidos
        </div>
      </div>

    </div>
  )
}
