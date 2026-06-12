'use client'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'

const APP_ICONS: Record<string, React.ReactNode> = {
  'YouTube': <span style={{ width: 0, height: 0, borderStyle: 'solid', borderWidth: '9px 0 9px 16px', borderColor: 'transparent transparent transparent #fff', marginLeft: 3, display: 'inline-block' }} />,
  'Brawl Stars': <span>🎮</span>,
  'Roblox': <span>🟦</span>,
  'TikTok': <span>♪</span>,
  'Spotify': <span>♪</span>,
}
const APP_BG: Record<string, string> = {
  'YouTube': 'linear-gradient(180deg,#ff4242,#cc0000)',
  'Brawl Stars': 'linear-gradient(150deg,#7b5cff,#3b2bd4)',
  'Roblox': 'linear-gradient(150deg,#3d4452,#1d2230)',
  'TikTok': 'linear-gradient(150deg,#010101,#222)',
  'Spotify': 'linear-gradient(150deg,#1ed760,#0f8a3d)',
}

export default function BancoPage() {
  const { state, dispatch } = useStore()
  const router = useRouter()
  const { child, apps, unlockRequests } = state

  const pendingReq = unlockRequests.find(r => r.status === 'pending')
  const usedToday = child.minutesUsedToday ?? 0
  const cap = child.minutesDailyCap ?? 60
  const usedPct = Math.min((usedToday / cap) * 100, 100)

  function requestUnlock(appId: string) {
    dispatch({ type: 'REQUEST_UNLOCK', appId })
  }

  return (
    <>
      {/* HEADER */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'linear-gradient(180deg, rgba(23,14,56,.96), rgba(18,11,46,.85))',
        backdropFilter: 'blur(8px)', borderBottom: '1.5px solid var(--border)',
        padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <button onClick={() => router.back()} style={{
          flexShrink: 0, width: 40, height: 40, borderRadius: 11,
          background: 'var(--raised)', border: '1.5px solid var(--border)',
          display: 'grid', placeItems: 'center', fontSize: 20, color: '#fff', cursor: 'pointer',
        }}>←</button>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="display" style={{ fontSize: 21, color: '#fff' }}>Banco de Chakra</div>
          <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--text-dim)', marginTop: 2 }}>Conclua missões para acumular tempo</div>
        </div>
      </header>

      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 18 }}>

        {/* SALDO */}
        <section style={{
          position: 'relative', overflow: 'hidden',
          borderRadius: 'var(--r-lg)', border: '2.5px solid var(--orange)',
          background: 'radial-gradient(120% 130% at 50% 0%, rgba(255,107,0,.28), rgba(20,12,46,0) 60%), linear-gradient(160deg, #2a1850, #160d36)',
          padding: '22px 18px 18px', textAlign: 'center',
          boxShadow: '0 0 0 1px rgba(255,107,0,.2), 0 14px 30px -14px rgba(255,107,0,.45)',
        }}>
          <div style={{
            position: 'absolute', inset: 0, zIndex: 0,
            background: 'repeating-linear-gradient(115deg, rgba(255,107,0,.07) 0 10px, transparent 10px 22px)',
            WebkitMaskImage: 'radial-gradient(70% 80% at 50% 0%, #000, transparent 75%)',
            maskImage: 'radial-gradient(70% 80% at 50% 0%, #000, transparent 75%)',
          }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              fontSize: 10.5, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase',
              color: 'var(--gold)', background: 'rgba(247,201,72,.12)', border: '1px solid rgba(247,201,72,.3)',
              padding: '4px 12px', borderRadius: 'var(--r-pill)',
            }}>⚡ Chakra acumulado</span>
            <div className="num" style={{
              fontFamily: 'Anton, sans-serif', fontSize: 84, lineHeight: .86, color: '#fff',
              margin: '12px 0 2px', letterSpacing: 1,
              WebkitTextStroke: '2.5px var(--ink)', paintOrder: 'stroke fill',
              filter: 'drop-shadow(0 4px 0 var(--orange-deep)) drop-shadow(0 8px 16px rgba(255,107,0,.5))',
            }}>{child.minutesBank}<small style={{ fontSize: 26, WebkitTextStroke: '1.5px var(--ink)', color: 'var(--orange-soft)' }}>min</small></div>
            <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: 1 }}>
              disponíveis agora
            </div>
            <div style={{ marginTop: 18, textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 7 }}>
                <span style={{ fontSize: 11, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: '.5px' }}>Uso de hoje</span>
                <span style={{ fontSize: 11.5, fontWeight: 900, color: 'var(--orange-soft)' }}>{usedToday} de {cap} min usados</span>
              </div>
              <div style={{ height: 18, background: 'var(--bg)', border: '2.5px solid var(--ink)', borderRadius: 'var(--r-pill)', overflow: 'hidden', boxShadow: 'inset 0 2px 6px rgba(0,0,0,.6)' }}>
                <div style={{
                  display: 'block', height: '100%', width: `${usedPct}%`, borderRadius: 'var(--r-pill)',
                  background: 'linear-gradient(180deg, var(--orange-soft), var(--orange))',
                  boxShadow: '0 0 12px 1px rgba(255,107,0,.7)', position: 'relative', overflow: 'hidden',
                }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(115deg, rgba(255,255,255,.22) 0 5px, transparent 5px 13px)' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* APPS */}
        <section>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 13 }}>
            <span className="display" style={{ fontSize: 18, color: '#fff', whiteSpace: 'nowrap' }}>Escolha seu poder</span>
            <span style={{ flex: 1, height: 3, borderRadius: 'var(--r-pill)', background: 'repeating-linear-gradient(115deg, rgba(255,107,0,.5) 0 7px, transparent 7px 13px)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {apps.filter(a => a.isActive).map(app => {
              const canAfford = child.minutesBank >= app.costMinutes
              const isPending = pendingReq?.appId === app.id
              return (
                <div key={app.id} style={{
                  background: 'linear-gradient(180deg, var(--raised), var(--card))',
                  border: `2px solid ${canAfford ? 'rgba(255,107,0,.5)' : 'var(--border)'}`,
                  borderRadius: 'var(--r-lg)', padding: 14,
                  boxShadow: 'var(--shadow-card)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 9,
                  opacity: canAfford ? 1 : .92,
                }}>
                  <div style={{
                    width: 54, height: 54, borderRadius: 14, border: '2.5px solid var(--ink)',
                    display: 'grid', placeItems: 'center', fontSize: 24, color: '#fff', flexShrink: 0,
                    background: APP_BG[app.appName] ?? 'var(--card)', boxShadow: '0 4px 0 rgba(0,0,0,.35)',
                  }}>{APP_ICONS[app.appName] ?? app.appIcon}</div>
                  <div style={{ fontWeight: 900, fontSize: 15 }}>{app.appName}</div>
                  <div style={{
                    fontWeight: 900, fontSize: 12.5, color: 'var(--gold)',
                    display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap',
                    background: 'rgba(247,201,72,.10)', border: '1px solid rgba(247,201,72,.25)',
                    padding: '4px 11px', borderRadius: 'var(--r-pill)',
                  }}>🕐 {app.costMinutes} min</div>
                  <button
                    onClick={() => canAfford && !isPending && requestUnlock(app.id)}
                    style={{
                      width: '100%', minHeight: 44, borderRadius: 'var(--r-pill)', cursor: canAfford && !isPending ? 'pointer' : 'not-allowed',
                      fontWeight: 900, fontSize: canAfford ? 13 : 11.5, textTransform: 'uppercase', letterSpacing: '.4px',
                      border: '2.5px solid var(--ink)', marginTop: 2,
                      ...(canAfford && !isPending ? {
                        color: '#fff', textShadow: '0 2px 0 rgba(11,6,32,.4)',
                        background: 'linear-gradient(180deg, var(--orange-soft), var(--orange))',
                        boxShadow: 'var(--glow-orange)',
                      } : {
                        background: 'var(--raised)', borderColor: 'var(--border)', color: 'var(--text-faint)',
                      }),
                    }}
                  >
                    {isPending ? '⏳ Aguardando...' : canAfford ? 'Solicitar' : `🔒 Faltam ${app.costMinutes - child.minutesBank} min`}
                  </button>
                </div>
              )
            })}
          </div>
        </section>

        {/* PENDING REQUEST */}
        {pendingReq && (
          <section style={{
            position: 'relative', overflow: 'hidden',
            borderRadius: 'var(--r-lg)', border: '2px solid var(--amber)',
            background: 'radial-gradient(130% 120% at 0% 0%, rgba(247,169,59,.22), rgba(30,18,64,0) 55%), linear-gradient(135deg, #3a2a12, #1e1442)',
            padding: 15, display: 'flex', alignItems: 'center', gap: 13,
            boxShadow: '0 0 0 1px rgba(247,169,59,.15), var(--shadow-card)',
          }}>
            <div style={{
              flexShrink: 0, width: 46, height: 46, borderRadius: 13,
              background: 'rgba(247,169,59,.18)', border: '2px solid var(--amber)',
              display: 'grid', placeItems: 'center', fontSize: 23,
              animation: 'wobble 2.4s ease-in-out infinite',
            }}>⏳</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 10.5, fontWeight: 900, letterSpacing: '.6px', textTransform: 'uppercase', color: 'var(--amber)' }}>Solicitação enviada</div>
              <div style={{ fontWeight: 900, fontSize: 15, color: '#fff', margin: '2px 0' }}>{pendingReq.appName} — {pendingReq.minutesRequested} min</div>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: 'var(--text-dim)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Aguardando aprovação
                <span className="dots-anim"><i /><i /><i /></span>
              </div>
            </div>
          </section>
        )}

        {/* HISTORY */}
        <section style={{
          background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-md)', padding: '6px 14px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 0' }}>
            <span style={{ fontSize: 11.5, fontWeight: 900, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--text-dim)' }}>Histórico de hoje</span>
            <span style={{ color: 'var(--text-faint)', fontSize: 13 }}>▾</span>
          </div>
          {unlockRequests.filter(r => r.status === 'approved').length === 0 ? (
            <div style={{ fontSize: 12, color: 'var(--text-faint)', padding: '8px 0 12px', fontWeight: 700 }}>Nenhum uso hoje ainda.</div>
          ) : (
            <div style={{ borderTop: '1px solid var(--border)' }}>
              {unlockRequests.filter(r => r.status === 'approved').map(req => (
                <div key={req.id} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '11px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{
                    width: 30, height: 30, borderRadius: 9, border: '1.5px solid var(--ink)',
                    display: 'grid', placeItems: 'center', fontSize: 13, flexShrink: 0, color: '#fff',
                    background: APP_BG[req.appName] ?? 'var(--card)',
                  }}>▶</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 900, fontSize: 13 }}>{req.appName}</div>
                    <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--text-faint)', marginTop: 1 }}>{req.minutesRequested} min usados</div>
                  </div>
                  <span style={{ fontWeight: 900, fontSize: 12, color: 'var(--text-dim)' }}>aprovado</span>
                </div>
              ))}
            </div>
          )}
        </section>

      </div>

      <style>{`
        @keyframes wobble { 0%,100%{ transform:rotate(-6deg);} 50%{ transform:rotate(6deg);} }
      `}</style>
    </>
  )
}
