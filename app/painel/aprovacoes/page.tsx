'use client'
import { useStore } from '@/lib/store'
import { formatRelative } from '@/lib/utils'

const APP_BG: Record<string, string> = {
  'YouTube': 'linear-gradient(180deg,#ff4242,#cc0000)',
  'Brawl Stars': 'linear-gradient(150deg,#7b5cff,#3b2bd4)',
  'Roblox': 'linear-gradient(150deg,#3d4452,#1d2230)',
  'TikTok': 'linear-gradient(150deg,#010101,#222)',
}

export default function AprovacoesPage() {
  const { state, dispatch } = useStore()
  const { unlockRequests, rewardRequests, child, apps } = state

  const pendingUnlocks = unlockRequests.filter(r => r.status === 'pending')
  const pendingRewards = rewardRequests.filter(r => r.status === 'pending')
  const resolvedUnlocks = unlockRequests.filter(r => r.status !== 'pending')
  const resolvedRewards = rewardRequests.filter(r => r.status !== 'pending')
  const totalPending = pendingUnlocks.length + pendingRewards.length

  return (
    <>
      {/* HEADER */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 20,
        background: 'linear-gradient(180deg, rgba(23,14,56,.97), rgba(18,11,46,.9))',
        backdropFilter: 'blur(8px)', borderBottom: '1.5px solid var(--border)',
        padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div>
          <h1 className="display" style={{ fontSize: 21, color: '#fff' }}>Aprovações</h1>
          <div style={{ fontSize: 11.5, fontWeight: 800, marginTop: 3, color: totalPending > 0 ? 'var(--amber)' : 'var(--text-dim)' }}>
            {totalPending > 0
              ? `${totalPending} pendente${totalPending > 1 ? 's' : ''} — ${child.name.split(' ')[0]} está esperando`
              : 'Nada pendente no momento'}
          </div>
        </div>
      </header>

      <div style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 16 }}>

        {/* EMPTY STATE */}
        {totalPending === 0 && resolvedUnlocks.length === 0 && resolvedRewards.length === 0 && (
          <div style={{
            background: 'var(--card)', border: '1.5px dashed var(--border)',
            borderRadius: 'var(--r-lg)', padding: 36, textAlign: 'center',
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>✅</div>
            <div style={{ fontWeight: 900, fontSize: 16 }}>Tudo em dia!</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--text-faint)', marginTop: 5 }}>Nenhuma aprovação pendente</div>
          </div>
        )}

        {/* PENDING UNLOCK REQUESTS */}
        {pendingUnlocks.length > 0 && (
          <section>
            <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--amber)', textTransform: 'uppercase', letterSpacing: .8, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--amber)', animation: 'liveBlink 1.4s infinite' }} />
              📱 Pedidos de tempo de tela
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pendingUnlocks.map(req => {
                const app = apps.find(a => a.id === req.appId)
                const canAfford = child.minutesBank >= req.minutesRequested
                return (
                  <div key={req.id} style={{
                    borderRadius: 'var(--r-lg)', border: '2px solid var(--amber)',
                    background: 'radial-gradient(130% 120% at 0% 0%, rgba(247,169,59,.18), rgba(18,11,46,0) 55%), linear-gradient(135deg, #3a2a12, #1e1442)',
                    padding: 14, boxShadow: '0 0 0 1px rgba(247,169,59,.1), var(--shadow-card)',
                  }}>
                    {/* Request info */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 13, border: '2.5px solid var(--ink)', flexShrink: 0,
                        background: APP_BG[req.appName] ?? 'var(--card)',
                        display: 'grid', placeItems: 'center', fontSize: 22, color: '#fff',
                      }}>{app?.appIcon ?? '📱'}</div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 900, fontSize: 14, color: '#fff' }}>
                          {child.name.split(' ')[0]} pediu {req.appName}
                        </div>
                        <div style={{
                          display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 4,
                          fontSize: 12, fontWeight: 900, color: 'var(--gold)',
                          background: 'rgba(247,201,72,.12)', border: '1px solid rgba(247,201,72,.25)',
                          borderRadius: 'var(--r-pill)', padding: '3px 10px',
                        }}>🕐 {req.minutesRequested} min</div>
                      </div>
                      <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--text-faint)', alignSelf: 'flex-start' }}>
                        {formatRelative(req.createdAt)}
                      </div>
                    </div>

                    {/* Insufficient balance warning */}
                    {!canAfford && (
                      <div style={{
                        background: 'rgba(231,76,60,.12)', border: '1.5px solid rgba(231,76,60,.4)',
                        borderRadius: 'var(--r-md)', padding: '9px 12px', marginBottom: 12,
                      }}>
                        <p style={{ fontSize: 12, fontWeight: 800, color: '#ff6b6b', margin: 0 }}>
                          ⚠️ Saldo insuficiente: {child.name.split(' ')[0]} tem {child.minutesBank} min, precisa de {req.minutesRequested} min
                        </p>
                      </div>
                    )}

                    <div style={{ display: 'flex', gap: 9 }}>
                      <button
                        onClick={() => dispatch({ type: 'REJECT_UNLOCK', requestId: req.id })}
                        style={{
                          flex: 1, minHeight: 44, borderRadius: 'var(--r-pill)', cursor: 'pointer',
                          fontWeight: 900, fontSize: 14, border: '2px solid var(--ink)',
                          color: '#fff', textShadow: '0 2px 0 rgba(11,6,32,.4)',
                          background: 'linear-gradient(180deg, #e74c3c, #c0392b)',
                          boxShadow: '0 4px 0 #7e1a12',
                        }}
                      >❌ Recusar</button>
                      <button
                        disabled={!canAfford}
                        onClick={() => dispatch({ type: 'APPROVE_UNLOCK', requestId: req.id })}
                        style={{
                          flex: 1, minHeight: 44, borderRadius: 'var(--r-pill)', cursor: canAfford ? 'pointer' : 'not-allowed',
                          fontWeight: 900, fontSize: 14, border: '2px solid var(--ink)',
                          color: '#fff', textShadow: '0 2px 0 rgba(11,6,32,.4)',
                          background: canAfford ? 'linear-gradient(180deg, #34c759, #1ea750)' : 'var(--raised)',
                          boxShadow: canAfford ? '0 4px 0 #0e6432' : undefined,
                          opacity: canAfford ? 1 : .5,
                        }}
                      >✅ Liberar {req.minutesRequested} min</button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* PENDING REWARD REQUESTS */}
        {pendingRewards.length > 0 && (
          <section>
            <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--gold)', textTransform: 'uppercase', letterSpacing: .8, marginBottom: 10 }}>
              🎁 Pedidos de recompensa
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {pendingRewards.map(req => (
                <div key={req.id} style={{
                  borderRadius: 'var(--r-lg)', border: '2px solid rgba(247,201,72,.4)',
                  background: 'radial-gradient(130% 120% at 0% 0%, rgba(247,201,72,.12), rgba(18,11,46,0) 55%), linear-gradient(135deg, #322411, #1b1140)',
                  padding: 14, boxShadow: 'var(--shadow-card)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{
                      width: 48, height: 48, borderRadius: 13, border: '2.5px solid var(--ink)', flexShrink: 0,
                      background: 'rgba(247,201,72,.15)', display: 'grid', placeItems: 'center', fontSize: 26,
                    }}>🎁</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 900, fontSize: 14, color: '#fff' }}>
                        {child.name.split(' ')[0]} pediu {req.rewardName}
                      </div>
                      <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 4,
                        fontSize: 12, fontWeight: 900, color: 'var(--gold)',
                        background: 'rgba(247,201,72,.12)', border: '1px solid rgba(247,201,72,.25)',
                        borderRadius: 'var(--r-pill)', padding: '3px 10px',
                      }}>⭐ {req.xpCost} XP</div>
                    </div>
                    <div style={{ fontSize: 10.5, fontWeight: 800, color: 'var(--text-faint)', alignSelf: 'flex-start' }}>
                      {formatRelative(req.createdAt)}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 9 }}>
                    <button
                      onClick={() => dispatch({ type: 'REJECT_REWARD', requestId: req.id })}
                      style={{
                        flex: 1, minHeight: 44, borderRadius: 'var(--r-pill)', cursor: 'pointer',
                        fontWeight: 900, fontSize: 14, border: '2px solid var(--ink)',
                        color: '#fff', textShadow: '0 2px 0 rgba(11,6,32,.4)',
                        background: 'linear-gradient(180deg, #e74c3c, #c0392b)',
                        boxShadow: '0 4px 0 #7e1a12',
                      }}
                    >❌ Recusar</button>
                    <button
                      onClick={() => dispatch({ type: 'APPROVE_REWARD', requestId: req.id })}
                      style={{
                        flex: 1, minHeight: 44, borderRadius: 'var(--r-pill)', cursor: 'pointer',
                        fontWeight: 900, fontSize: 14, border: '2px solid var(--ink)',
                        color: '#fff', textShadow: '0 2px 0 rgba(11,6,32,.4)',
                        background: 'linear-gradient(180deg, var(--orange-soft), var(--orange))',
                        boxShadow: 'var(--glow-orange)',
                      }}
                    >✅ Aprovar</button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* HISTORY */}
        {(resolvedUnlocks.length > 0 || resolvedRewards.length > 0) && (
          <section>
            <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--text-dim)', textTransform: 'uppercase', letterSpacing: .8, marginBottom: 10 }}>
              📋 Histórico
            </div>
            <div style={{
              background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 'var(--r-lg)', padding: '4px 14px',
            }}>
              {[...resolvedUnlocks, ...resolvedRewards].map((req, i, arr) => {
                const isUnlock = 'appId' in req
                const app = isUnlock ? apps.find(a => a.id === (req as typeof resolvedUnlocks[0]).appId) : null
                const approved = req.status === 'approved'
                return (
                  <div key={req.id} style={{
                    display: 'flex', alignItems: 'center', gap: 12, padding: '11px 0',
                    borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : undefined,
                  }}>
                    <div style={{
                      width: 34, height: 34, borderRadius: 10, border: '1.5px solid var(--border)',
                      display: 'grid', placeItems: 'center', fontSize: 16, flexShrink: 0,
                      background: isUnlock ? (APP_BG[(req as typeof resolvedUnlocks[0]).appName] ?? 'var(--raised)') : 'rgba(247,201,72,.1)',
                    }}>{isUnlock ? (app?.appIcon ?? '📱') : '🎁'}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 900, fontSize: 13, color: 'var(--text-dim)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {isUnlock ? (req as typeof resolvedUnlocks[0]).appName : (req as typeof resolvedRewards[0]).rewardName}
                      </div>
                      <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--text-faint)', marginTop: 1 }}>
                        {formatRelative(req.createdAt)}
                      </div>
                    </div>
                    <span style={{
                      fontSize: 10.5, fontWeight: 900, padding: '4px 10px', borderRadius: 'var(--r-pill)', whiteSpace: 'nowrap',
                      background: approved ? 'rgba(52,199,89,.12)' : 'rgba(231,76,60,.12)',
                      border: `1px solid ${approved ? 'var(--success)' : 'var(--danger)'}`,
                      color: approved ? 'var(--success)' : 'var(--danger)',
                    }}>{approved ? '✓ Aprovado' : '✕ Recusado'}</span>
                  </div>
                )
              })}
            </div>
          </section>
        )}

      </div>
      <style>{`@keyframes liveBlink { 0%,100%{opacity:1;} 50%{opacity:.3;} }`}</style>
    </>
  )
}
