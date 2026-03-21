import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const NAV_LINKS = [
  { to: '/',         label: 'Trang chủ' },
  { to: '/rooms',    label: 'Phòng' },
  { to: '/services', label: 'Dịch vụ' },
  { to: '/gallery',  label: 'Gallery' },
  { to: '/about',    label: 'Giới thiệu' },
  { to: '/contact',  label: 'Liên hệ' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const isActive = (to) => to === '/' ? location.pathname === '/' : location.pathname.startsWith(to)

  return (
    <nav style={S.nav}>
      <Link to="/" style={S.brand}>LUMIÈRE</Link>
      <div style={S.links}>
        {NAV_LINKS.map(l => (
          <Link key={l.to} to={l.to} style={{ ...S.link, ...(isActive(l.to) ? S.linkActive : {}) }}>
            {l.label}
          </Link>
        ))}
      </div>
      <div style={S.right}>
        {user ? (
          <>
            <span style={{ fontSize: 12, color: 'var(--text2)', whiteSpace: 'nowrap' }}>{user.name}</span>
            {user.role === 'admin' && <Link to="/admin" className="btn btn-outline btn-sm">Admin</Link>}
            <Link to="/my-bookings" className="btn btn-ghost btn-sm">Đặt phòng</Link>
            <button onClick={logout} className="btn btn-ghost btn-sm">Đăng xuất</button>
          </>
        ) : (
          <>
            <Link to="/login"    className="btn btn-ghost btn-sm">Đăng nhập</Link>
            <Link to="/register" className="btn btn-gold btn-sm">Đăng ký</Link>
          </>
        )}
      </div>
    </nav>
  )
}

const S = {
  nav:        { position:'fixed', top:0, width:'100%', zIndex:100, background:'rgba(13,13,13,0.97)', backdropFilter:'blur(12px)', borderBottom:'1px solid rgba(201,169,110,0.18)', padding:'0 2rem', height:64, display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem' },
  brand:      { fontFamily:'var(--font-serif)', fontSize:20, fontWeight:300, letterSpacing:4, color:'var(--gold)', flexShrink:0 },
  links:      { display:'flex', gap:'1.5rem', alignItems:'center', flex:1, justifyContent:'center' },
  link:       { color:'var(--text2)', fontSize:11, letterSpacing:'1.5px', textTransform:'uppercase', transition:'color .2s', whiteSpace:'nowrap' },
  linkActive: { color:'var(--gold)' },
  right:      { display:'flex', gap:'0.6rem', alignItems:'center', flexShrink:0 },
}
