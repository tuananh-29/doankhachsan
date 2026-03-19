import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <nav style={S.nav}>
      <Link to="/" style={S.brand}>LUMIÈRE</Link>

      <div style={S.links}>
        <Link to="/"     style={S.link}>Trang chủ</Link>
        <Link to="/rooms" style={S.link}>Phòng</Link>
        <a href="#about"  style={S.link}>Giới thiệu</a>
      </div>

      <div style={S.right}>
        {user ? (
          <>
            <span style={{ fontSize:13, color:'var(--text2)' }}>{user.name}</span>
            {user.role === 'admin' && <Link to="/admin" className="btn btn-outline btn-sm">Admin</Link>}
            <Link to="/my-bookings" className="btn btn-ghost btn-sm">Đặt phòng của tôi</Link>
            <button onClick={handleLogout} className="btn btn-ghost btn-sm">Đăng xuất</button>
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
  nav: {
    position:'fixed', top:0, width:'100%', zIndex:100,
    background:'rgba(13,13,13,0.96)', backdropFilter:'blur(12px)',
    borderBottom:'1px solid rgba(201,169,110,0.18)',
    padding:'0 2.5rem', height:64,
    display:'flex', alignItems:'center', justifyContent:'space-between', gap:'1rem',
  },
  brand: { fontFamily:'var(--font-serif)', fontSize:22, fontWeight:300, letterSpacing:4, color:'var(--gold)', flexShrink:0 },
  links: { display:'flex', gap:'2rem', alignItems:'center' },
  link:  { color:'var(--text2)', fontSize:12, letterSpacing:'1.5px', textTransform:'uppercase', transition:'color .2s' },
  right: { display:'flex', gap:'0.75rem', alignItems:'center', flexShrink:0 },
}
