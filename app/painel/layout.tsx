'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useStore } from '@/lib/store'

const NAV = [
  { href: '/painel',             ico: '📊', label: 'Início' },
  { href: '/painel/tarefas',     ico: '📋', label: 'Missões' },
  { href: '/painel/recompensas', ico: '🎁', label: 'Rewards' },
  { href: '/painel/aprovacoes',  ico: '✅', label: 'Aprovações' },
]

export default function PainelLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { state } = useStore()

  const pendingCount =
    state.unlockRequests.filter(r => r.status === 'pending').length +
    state.rewardRequests.filter(r => r.status === 'pending').length

  return (
    <div className="phone" style={{ paddingBottom: 84 }}>
      <main>{children}</main>

      {/* BOTTOM NAV — parent variant */}
      <nav style={{
        position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)',
        width: 'min(390px, 100vw)', height: 72, zIndex: 30,
        background: 'rgba(18,11,46,.92)', backdropFilter: 'blur(18px)',
        borderTop: '2px solid var(--border)',
        display: 'flex', alignItems: 'stretch',
      }}>
        {NAV.map(item => {
          const isActive = pathname === item.href ||
            (item.href !== '/painel' && pathname.startsWith(item.href))
          const isApprove = item.href === '/painel/aprovacoes'
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-item${isActive ? ' active' : ''}`}
              style={{ flex: 1, position: 'relative' }}
            >
              <span className="ico">{item.ico}</span>
              {isApprove && pendingCount > 0 && (
                <span style={{
                  position: 'absolute', top: 8, left: '56%',
                  width: 16, height: 16, borderRadius: '50%',
                  background: 'var(--danger)', border: '2px solid var(--bg)',
                  fontSize: 9, fontWeight: 900, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{pendingCount}</span>
              )}
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
