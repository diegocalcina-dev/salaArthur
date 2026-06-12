'use client'
import { useState } from 'react'
import { useStore } from '@/lib/store'

const CAP_OPTS = [30, 60, 90, 120]
const APP_BG: Record<string, string> = {
  'YouTube': 'linear-gradient(180deg,#ff4242,#cc0000)',
  'Brawl Stars': 'linear-gradient(150deg,#7b5cff,#3b2bd4)',
  'Roblox': 'linear-gradient(150deg,#3d4452,#1d2230)',
  'TikTok': 'linear-gradient(150deg,#010101,#222)',
  'Spotify': 'linear-gradient(150deg,#1ed760,#0f8a3d)',
}

export default function RecompensasPage() {
  const { state, dispatch } = useStore()
  const { apps, physicalRewards, child } = state
  const [cap, setCap] = useState(child.minutesDailyCap)
  const [appName, setAppName] = useState('')
  const [appIcon, setAppIcon] = useState('📱')
  const [showAddApp, setShowAddApp] = useState(false)
  const [approvalRequired] = useState(true)
  const [localCosts, setLocalCosts] = useState<Record<string, number>>({})

  function getAppCost(appId: string, defaultCost: number) {
    return localCosts[appId] ?? defaultCost
  }

  function step(appId: string, defaultCost: number, dir: 1 | -1) {
    const current = getAppCost(appId, defaultCost)
    setLocalCosts(prev => ({ ...prev, [appId]: Math.max(5, Math.min(120, current + dir * 5)) }))
  }

  function addApp(e: React.FormEvent) {
    e.preventDefault()
    if (!appName.trim()) return
    dispatch({ type: 'ADD_APP', app: { appName: appName.trim(), appIcon, costMinutes: 30, childId: child.id, isActive: true } })
    setAppName(''); setAppIcon('📱'); setShowAddApp(false)
  }

  return (
    <>
      {/* HEADER */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'linear-gradient(180deg, rgba(23,14,56,.97), rgba(18,11,46,.9))',
        backdropFilter: 'blur(8px)', borderBottom: '1.5px solid var(--border)',
        padding: '14px 16px',
      }}>
        <h1 className="display" style={{ fontSize: 21, color: '#fff' }}>Configurar Recompensas</h1>
      </header>

      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 20 }}>

        {/* TETO DIÁRIO */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--orange)', flexShrink: 0 }} />
            <span style={{ fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: .5 }}>Limite diário de tela</span>
          </div>
          <p style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-faint)', marginBottom: 12 }}>
            Mesmo que {child.name.split(' ')[0]} tenha mais minutos no banco, ele não pode usar mais que esse limite por dia.
          </p>
          <div style={{
            background: 'linear-gradient(180deg, var(--raised), var(--card))',
            border: '1.5px solid var(--border)', borderRadius: 'var(--r-lg)', padding: 16,
            boxShadow: 'var(--shadow-card)',
          }}>
            <div className="num" style={{ fontFamily: 'Anton, sans-serif', fontSize: 42, lineHeight: 1, textAlign: 'center', marginBottom: 16 }}>
              {cap}<small style={{ fontSize: 20, color: 'var(--orange-soft)' }}>min</small>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {CAP_OPTS.map(v => (
                <button
                  key={v} type="button"
                  onClick={() => setCap(v)}
                  style={{
                    flex: 1, minHeight: 40, borderRadius: 'var(--r-md)', cursor: 'pointer',
                    fontWeight: 900, fontSize: 12,
                    background: cap === v ? 'linear-gradient(180deg,var(--orange-soft),var(--orange))' : 'var(--raised)',
                    border: `1.5px solid ${cap === v ? 'var(--ink)' : 'var(--border)'}`,
                    color: cap === v ? '#fff' : 'var(--text-dim)',
                    boxShadow: cap === v ? 'var(--glow-orange)' : undefined,
                  }}
                >{v < 60 ? `${v}min` : `${v / 60}h`}</button>
              ))}
            </div>
          </div>
        </section>

        {/* APPS */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--orange)', flexShrink: 0 }} />
            <span style={{ fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: .5 }}>Apps que {child.name.split(' ')[0]} pode desbloquear</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {apps.map(app => (
              <div key={app.id} style={{
                background: 'linear-gradient(180deg, var(--raised), var(--card))',
                border: `1.5px solid ${app.isActive ? 'rgba(255,107,0,.35)' : 'var(--border)'}`,
                borderRadius: 'var(--r-lg)', padding: 14, boxShadow: 'var(--shadow-card)',
                opacity: app.isActive ? 1 : .65,
              }}>
                {/* Row 1: Icon + Name + Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: 13, border: '2.5px solid var(--ink)', flexShrink: 0,
                    background: APP_BG[app.appName] ?? 'var(--card)',
                    display: 'grid', placeItems: 'center', fontSize: 22, color: '#fff',
                  }}>{app.appIcon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 900, fontSize: 15 }}>{app.appName}</div>
                    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-faint)', marginTop: 2 }}>
                      {app.isActive ? 'Custo por uso' : '⏸️ Pausado'}
                    </div>
                  </div>
                  {/* Toggle */}
                  <button
                    onClick={() => dispatch({ type: 'TOGGLE_APP', appId: app.id })}
                    style={{
                      flexShrink: 0, width: 44, height: 26, borderRadius: 13, cursor: 'pointer',
                      border: '2px solid var(--ink)', padding: 0, position: 'relative', transition: 'background .2s',
                      background: app.isActive ? 'linear-gradient(180deg,var(--orange-soft),var(--orange))' : 'var(--raised)',
                    }}
                  >
                    <span style={{
                      position: 'absolute', top: 3, left: app.isActive ? 21 : 3,
                      width: 16, height: 16, borderRadius: '50%',
                      background: '#fff', border: '2px solid var(--ink)',
                      transition: 'left .2s',
                    }} />
                  </button>
                </div>

                {/* Row 2: Stepper + Delete */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    flex: 1, display: 'flex', alignItems: 'center', gap: 0,
                    background: 'var(--bg)', border: '2px solid var(--ink)', borderRadius: 'var(--r-pill)', overflow: 'hidden',
                  }}>
                    <button
                      onClick={() => step(app.id, app.costMinutes, -1)}
                      style={{
                        width: 40, height: 38, background: 'none', border: 'none', color: '#fff',
                        fontSize: 20, cursor: 'pointer', fontWeight: 900,
                      }}
                    >−</button>
                    <div className="num" style={{ flex: 1, textAlign: 'center', fontFamily: 'Anton, sans-serif', fontSize: 18, color: '#fff' }}>
                      {getAppCost(app.id, app.costMinutes)}<small style={{ fontSize: 11, color: 'var(--text-dim)' }}> min</small>
                    </div>
                    <button
                      onClick={() => step(app.id, app.costMinutes, 1)}
                      style={{
                        width: 40, height: 38, background: 'none', border: 'none', color: '#fff',
                        fontSize: 20, cursor: 'pointer', fontWeight: 900,
                      }}
                    >+</button>
                  </div>
                  <button style={{
                    width: 38, height: 38, borderRadius: 11, border: '1.5px solid rgba(231,76,60,.4)',
                    background: 'rgba(231,76,60,.1)', color: 'var(--danger)', fontSize: 16, cursor: 'pointer', display: 'grid', placeItems: 'center',
                  }}>🗑️</button>
                </div>
              </div>
            ))}

            {/* Add App button */}
            {!showAddApp ? (
              <button
                onClick={() => setShowAddApp(true)}
                style={{
                  width: '100%', minHeight: 48, borderRadius: 'var(--r-lg)',
                  border: '2px dashed var(--border)', background: 'rgba(255,107,0,.04)',
                  fontWeight: 900, fontSize: 13, color: 'var(--orange-soft)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                }}
              >➕ Adicionar app</button>
            ) : (
              <form onSubmit={addApp} style={{
                background: 'var(--raised)', border: '2px solid var(--orange)',
                borderRadius: 'var(--r-lg)', padding: 14, display: 'flex', flexDirection: 'column', gap: 11,
              }}>
                <input
                  type="text" value={appName} onChange={e => setAppName(e.target.value)}
                  placeholder="Nome do app..." className="inp" style={{ width: '100%' }}
                  autoFocus
                />
                <div style={{ display: 'flex', gap: 8 }}>
                  <button type="button" onClick={() => setShowAddApp(false)} style={{
                    flex: 1, height: 42, borderRadius: 'var(--r-pill)', border: '1.5px solid var(--border)',
                    background: 'var(--card)', fontWeight: 900, fontSize: 13, color: 'var(--text-dim)', cursor: 'pointer',
                  }}>Cancelar</button>
                  <button type="submit" className="btn-orange" style={{ flex: 1, height: 42, fontSize: 13 }}>Adicionar ✓</button>
                </div>
              </form>
            )}
          </div>
        </section>

        {/* PRÊMIOS FÍSICOS */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
            <span style={{ width: 3, height: 16, borderRadius: 2, background: 'var(--gold)', flexShrink: 0 }} />
            <span style={{ fontWeight: 900, fontSize: 14, textTransform: 'uppercase', letterSpacing: .5 }}>Prêmios especiais</span>
          </div>
          <p style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-faint)', marginBottom: 12 }}>
            {child.name.split(' ')[0]} pode trocar XP por esses prêmios.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {physicalRewards.map(reward => (
              <div key={reward.id} style={{
                background: 'linear-gradient(180deg, var(--raised), var(--card))',
                border: '1.5px solid var(--border)', borderRadius: 'var(--r-lg)',
                padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 13,
                boxShadow: 'var(--shadow-card)',
              }}>
                <div style={{
                  width: 46, height: 46, borderRadius: 13, border: '2px solid var(--ink)', flexShrink: 0,
                  background: 'rgba(247,201,72,.12)', display: 'grid', placeItems: 'center', fontSize: 24,
                }}>{reward.emoji}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 900, fontSize: 14 }}>{reward.name}</div>
                  <div style={{ fontSize: 12, fontWeight: 900, color: 'var(--gold)', marginTop: 2 }}>⭐ {reward.xpCost} XP</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{
                    width: 36, height: 22, borderRadius: 11, border: '2px solid var(--ink)',
                    background: 'linear-gradient(180deg,var(--orange-soft),var(--orange))', position: 'relative',
                  }}>
                    <span style={{
                      position: 'absolute', top: 2, left: 18,
                      width: 14, height: 14, borderRadius: '50%', background: '#fff', border: '2px solid var(--ink)',
                    }} />
                  </div>
                  <button style={{
                    width: 32, height: 32, borderRadius: 9, border: '1.5px solid var(--border)',
                    background: 'var(--raised)', fontSize: 14, cursor: 'pointer', display: 'grid', placeItems: 'center',
                  }}>✏️</button>
                </div>
              </div>
            ))}
            <button style={{
              width: '100%', minHeight: 48, borderRadius: 'var(--r-lg)',
              border: '2px dashed var(--border)', background: 'rgba(247,201,72,.04)',
              fontWeight: 900, fontSize: 13, color: 'var(--gold)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>➕ Adicionar prêmio</button>
          </div>
        </section>

        {/* APROVAÇÃO MANUAL */}
        <section style={{
          background: 'linear-gradient(180deg, var(--raised), var(--card))',
          border: '1.5px solid var(--border)', borderRadius: 'var(--r-lg)', padding: 14,
          boxShadow: 'var(--shadow-card)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 900, fontSize: 14 }}>Exigir minha aprovação para cada desbloqueio</div>
              <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--success)', marginTop: 3 }}>✓ Recomendado</div>
            </div>
            <div style={{
              flexShrink: 0, width: 44, height: 26, borderRadius: 13, border: '2px solid var(--ink)',
              background: approvalRequired ? 'linear-gradient(180deg,var(--orange-soft),var(--orange))' : 'var(--raised)',
              position: 'relative', cursor: 'pointer',
            }}>
              <span style={{
                position: 'absolute', top: 3, left: approvalRequired ? 21 : 3,
                width: 16, height: 16, borderRadius: '50%',
                background: '#fff', border: '2px solid var(--ink)',
                transition: 'left .2s',
              }} />
            </div>
          </div>
          <p style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-faint)', marginTop: 10, lineHeight: 1.5 }}>
            {child.name.split(' ')[0]} vai me enviar uma solicitação. Eu aprovarei pelo painel antes de qualquer tempo de tela ser liberado.
          </p>
        </section>

      </div>
    </>
  )
}
