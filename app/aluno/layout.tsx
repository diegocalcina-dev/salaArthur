'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV = [
  { href: '/aluno',         ico: '🏠', label: 'Home' },
  { href: '/aluno/ranking', ico: '🏆', label: 'Ranking' },
  { href: '/aluno/perfil',  ico: '👤', label: 'Perfil' },
  { href: '/aluno/turma',   ico: '💬', label: 'Turma' },
]

export default function AlunoLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="phone" style={{ paddingBottom: 84 }}>
      <main>{children}</main>
      <nav className="navbar">
        {NAV.map(item => {
          const isActive = pathname === item.href ||
            (item.href !== '/aluno' && pathname.startsWith(item.href))
          return (
            <Link key={item.href} href={item.href} className={`nav-item${isActive ? ' active' : ''}`}>
              <span className="ico">{item.ico}</span>
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
