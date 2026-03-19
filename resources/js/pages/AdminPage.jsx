import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { roomsAPI, bookingsAPI, usersAPI } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'
import AdminRooms    from '../components/admin/AdminRooms.jsx'
import AdminBookings from '../components/admin/AdminBookings.jsx'
import AdminUsers    from '../components/admin/AdminUsers.jsx'

const fmt = n => new Intl.NumberFormat('vi-VN').format(n) + 'đ'

const NAV = [
  { key:'dashboard', label:'Dashboard',       icon:'◈' },
  { key:'rooms',     label:'Quản lý phòng',   icon:'◫' },
  { key:'bookings',  label:'Đặt phòng',        icon:'◉' },
  { key:'users',     label:'Khách hàng',       icon:'◎' },
]

export default function AdminPage() {
  const { user, logout } = useAuth()
  const [section,  setSection]  = useState('dashboard')
  const [stats,    setStats]    = useState({ rooms:0, available:0, bookings:0, confirmed:0, users:0, revenue:0 })
  const [recent,   setRecent]   = useState([])
  const [loading,  setLoading]  = useState(true)

  const loadDash = async () => {
    setLoading(true)
    try {
      const [rr, br, ur] = await Promise.all([roomsAPI.getAll(), bookingsAPI.getAll(), usersAPI.getAll()])
      const rooms = rr.data, bookings = br.data, users = ur.data
      setStats({
        rooms:     rooms.length,
        available: rooms.filter(r => r.status === 'available').length,
        bookings:  bookings.length,
        confirmed: bookings.filter(b => b.status === 'confirmed').length,
        users:     users.filter(u => u.role !== 'admin').length,
        revenue:   bookings.filter(b => b.status === 'confirmed').reduce((s,b) => s + b.total, 0),
      })
      setRecent(bookings.slice(0, 8))
    } catch {}
    finally { setLoading(false) }
  }

  useEffect(() => { loadDash() }, [])

  const switchSection = key => { setSection(key); if (key === 'dashboard') loadDash() }

  return (
    <div style={{ display:'flex', minHeight:'100vh' }}>
      {/* SIDEBAR */}
      <aside style={S.sidebar}>
        <div style={S.sideLogo}>
          <div>LUMIÈRE</div>
          <div style={{ fontSize:10, letterSpacing:2, color:'var(--text3)', marginTop:3, fontFamily:'var(--font-sans)' }}>ADMIN PANEL</div>
        </div>
        <nav style={{ flex:1, padding:'1rem 0' }}>
          {NAV.map(item => (
            <button key={item.key} onClick={() => switchSection(item.key)}
              style={{ ...S.navBtn, ...(section === item.key ? S.navActive : {}) }}>
              <span style={{ width:18, textAlign:'center' }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div style={{ padding:'1rem 1.25rem', borderTop:'1px solid rgba(201,169,110,0.12)' }}>
          <div style={{ fontSize:12, color:'var(--text2)', marginBottom:10 }}>{user?.name}</div>
          <Link to="/" style={{ fontSize:11, color:'var(--text3)', display:'block', marginBottom:6 }}>← Về trang chủ</Link>
          <button onClick={logout} style={{ fontSize:11, color:'var(--red)', background:'none', border:'none', cursor:'pointer', padding:0 }}>Đăng xuất</button>
        </div>
      </aside>

      {/* MAIN */}
      <main style={S.main}>
        {/* DASHBOARD */}
        {section === 'dashboard' && (
          <div>
            <div style={S.hdr}>
              <h1 style={S.title}>Dashboard</h1>
              <span style={{ fontSize:12, color:'var(--text2)' }}>Xin chào, {user?.name}</span>
            </div>

            {/* Stats */}
            <div style={S.statsGrid}>
              {[
                { label:'Tổng phòng',  value: stats.rooms,           sub: `${stats.available} phòng trống` },
                { label:'Đặt phòng',   value: stats.bookings,        sub: `${stats.confirmed} xác nhận` },
                { label:'Khách hàng',  value: stats.users,           sub: 'Đã đăng ký' },
                { label:'Doanh thu',   value: fmt(stats.revenue),    big: false },
              ].map(s => (
                <div key={s.label} style={S.statCard}>
                  <div style={S.statLabel}>{s.label}</div>
                  <div style={{ ...S.statVal, fontSize: typeof s.value === 'string' ? 20 : 36 }}>{s.value}</div>
                  {s.sub && <div style={S.statSub}>{s.sub}</div>}
                </div>
              ))}
            </div>

            {/* Recent bookings */}
            <div style={S.tableWrap}>
              <div style={{ padding:'1.25rem 1.5rem', borderBottom:'1px solid rgba(201,169,110,0.1)' }}>
                <span style={{ fontSize:11, letterSpacing:2, color:'var(--text3)', textTransform:'uppercase' }}>Đặt phòng gần đây</span>
              </div>
              {loading ? <p style={{ padding:'2rem', textAlign:'center', color:'var(--text3)' }}>Đang tải...</p> : (
                <table style={{ width:'100%', borderCollapse:'collapse' }}>
                  <thead><tr>{['Khách hàng','Phòng','Check-in','Check-out','Tổng','Trạng thái'].map(h => <th key={h} className="admin-th">{h}</th>)}</tr></thead>
                  <tbody>
                    {recent.map(b => (
                      <tr key={b.id}>
                        <td className="admin-td">{b.user_name}</td>
                        <td className="admin-td">{b.room_emoji} {b.room_name}</td>
                        <td className="admin-td">{b.checkin}</td>
                        <td className="admin-td">{b.checkout}</td>
                        <td className="admin-td" style={{ color:'var(--gold)' }}>{fmt(b.total)}</td>
                        <td className="admin-td"><span className={`badge badge-${b.status}`}>{b.status === 'confirmed' ? 'Xác nhận' : b.status === 'pending' ? 'Chờ' : 'Hủy'}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {section === 'rooms'    && <AdminRooms />}
        {section === 'bookings' && <AdminBookings />}
        {section === 'users'    && <AdminUsers />}
      </main>
    </div>
  )
}

const S = {
  sidebar:   { width:230, background:'var(--dark2)', borderRight:'1px solid rgba(201,169,110,0.12)', position:'fixed', height:'100vh', zIndex:50, display:'flex', flexDirection:'column', overflowY:'auto' },
  sideLogo:  { padding:'1.5rem', fontFamily:'var(--font-serif)', fontSize:18, fontWeight:300, letterSpacing:3, color:'var(--gold)', borderBottom:'1px solid rgba(201,169,110,0.12)' },
  navBtn:    { display:'flex', alignItems:'center', gap:12, width:'100%', padding:'11px 1.25rem', color:'var(--text2)', background:'none', border:'none', borderLeft:'2px solid transparent', cursor:'pointer', fontSize:13, textAlign:'left', transition:'all .2s' },
  navActive: { color:'var(--gold)', background:'rgba(201,169,110,0.07)', borderLeftColor:'var(--gold)' },
  main:      { marginLeft:230, padding:'2rem', minHeight:'100vh', flex:1 },
  hdr:       { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2rem', paddingBottom:'1.5rem', borderBottom:'1px solid rgba(201,169,110,0.12)' },
  title:     { fontFamily:'var(--font-serif)', fontSize:30, fontWeight:300 },
  statsGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))', gap:'1rem', marginBottom:'2rem' },
  statCard:  { background:'var(--dark2)', border:'1px solid rgba(201,169,110,0.12)', padding:'1.5rem' },
  statLabel: { fontSize:10, letterSpacing:2, color:'var(--text3)', marginBottom:8, textTransform:'uppercase' },
  statVal:   { fontFamily:'var(--font-serif)', fontWeight:300, color:'var(--gold)' },
  statSub:   { fontSize:11, color:'var(--text3)', marginTop:4 },
  tableWrap: { background:'var(--dark2)', border:'1px solid rgba(201,169,110,0.12)', overflowX:'auto' },
}
