'use client'
import Link from 'next/link'
import { useStore } from '@/lib/store'

export default function LandingPage() {
  const { dispatch } = useStore()

  return (
    <div className="phone" style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0 20px', minHeight:'100dvh' }}>
      {/* Speed lines */}
      <div className="skybg" />

      <div style={{ width:'100%', display:'flex', flexDirection:'column', alignItems:'center', gap:32, position:'relative', zIndex:1 }}>
        {/* Logo */}
        <div style={{ textAlign:'center' }}>
          <div style={{
            display:'inline-flex', alignItems:'center', gap:8,
            fontFamily:'Anton, sans-serif', textTransform:'uppercase', fontSize:11, letterSpacing:3,
            color:'#fff', background:'var(--ink)', border:'2px solid var(--orange)',
            padding:'7px 16px 6px', borderRadius:'var(--r-pill)',
            boxShadow:'0 0 0 4px rgba(255,107,0,.12), 0 8px 20px -6px rgba(255,107,0,.5)',
            transform:'rotate(-2deg)', marginBottom:20
          }}>
            🥷 Arena Ninja Escolar
          </div>
          <h1 style={{ fontFamily:'Anton, sans-serif', textTransform:'uppercase', fontSize:56, lineHeight:.9, marginTop:8 }}>
            <span style={{ color:'var(--orange)', WebkitTextStroke:'3px var(--ink)', paintOrder:'stroke fill', filter:'drop-shadow(0 4px 0 var(--orange-deep))' }}>Turma</span>
            <span style={{ color:'var(--gold)', WebkitTextStroke:'3px var(--ink)', paintOrder:'stroke fill', filter:'drop-shadow(0 4px 0 var(--gold-deep))' }}>XP</span>
          </h1>
          <p style={{ color:'var(--text-dim)', fontWeight:800, fontSize:14, marginTop:8 }}>A arena ninja da sua turma</p>
        </div>

        {/* Features */}
        <div className="card" style={{ width:'100%' }}>
          {[
            { emoji:'📚', text:'Missões escolares geram XP' },
            { emoji:'🏆', text:'Suba no ranking da turma' },
            { emoji:'⏱️', text:'XP vira tempo nos seus apps' },
          ].map((f) => (
            <div key={f.text} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderBottom:'1px solid var(--border)' }}
              className="last:border-0">
              <span style={{ fontSize:24 }}>{f.emoji}</span>
              <span style={{ fontWeight:800, fontSize:14, color:'var(--text-dim)' }}>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div style={{ display:'flex', flexDirection:'column', gap:12, width:'100%' }}>
          <Link
            href="/convite"
            onClick={() => dispatch({ type: 'SET_ROLE', role: 'child' })}
            className="btn-orange wide"
            style={{ textDecoration:'none', borderRadius:'var(--r-lg)' }}
          >
            🥷 Sou Aluno — Entrar na Arena
          </Link>
          <Link
            href="/login"
            onClick={() => dispatch({ type: 'SET_ROLE', role: 'parent' })}
            style={{
              display:'flex', alignItems:'center', justifyContent:'center',
              minHeight:50, borderRadius:'var(--r-lg)',
              background:'var(--raised)', border:'2.5px solid var(--border)',
              fontWeight:900, fontSize:15, color:'var(--text-dim)',
              textDecoration:'none',
            }}
          >
            🛡️ Sou Pai ou Mãe
          </Link>
        </div>

        <p style={{ color:'var(--text-faint)', fontSize:11, fontWeight:700 }}>
          Piloto V1 — Escola Criar-te · 5º A
        </p>
      </div>
    </div>
  )
}
