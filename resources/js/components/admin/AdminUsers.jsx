import React, { useState, useEffect } from 'react'
import { usersAPI } from '../../services/api.js'

export default function AdminUsers() {
  const [users,   setUsers]   = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { usersAPI.getAll().then(r => setUsers(r.data)).catch(() => {}).finally(() => setLoading(false)) }, [])

  return (
    <div>
      <div style={S.hdr}>
        <h1 style={S.title}>Khách hàng</h1>
        <span style={{ fontSize:13, color:'var(--text3)' }}>{users.filter(u => u.role !== 'admin').length} khách hàng</span>
      </div>
      <div style={S.wrap}>
        {loading ? <p style={S.empty}>Đang tải...</p> : (
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead><tr>{['Họ tên','Email','Điện thoại','Số đặt phòng','Ngày đăng ký','Vai trò'].map(h => <th key={h} className="admin-th">{h}</th>)}</tr></thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td className="admin-td" style={{ color:'var(--text)' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <div style={S.avatar}>{u.name.charAt(0).toUpperCase()}</div>
                      {u.name}
                    </div>
                  </td>
                  <td className="admin-td">{u.email}</td>
                  <td className="admin-td">{u.phone || '—'}</td>
                  <td className="admin-td" style={{ textAlign:'center' }}>{u.booking_count}</td>
                  <td className="admin-td">{u.created_at?.split('T')[0]}</td>
                  <td className="admin-td"><span className={`badge ${u.role === 'admin' ? 'badge-confirmed' : 'badge-pending'}`}>{u.role === 'admin' ? 'Admin' : 'Khách'}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

const S = {
  hdr:   { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2rem', paddingBottom:'1.5rem', borderBottom:'1px solid rgba(201,169,110,0.12)' },
  title: { fontFamily:'var(--font-serif)', fontSize:28, fontWeight:300 },
  wrap:  { background:'var(--dark2)', border:'1px solid rgba(201,169,110,0.12)', overflowX:'auto' },
  empty: { padding:'3rem', textAlign:'center', color:'var(--text3)' },
  avatar:{ width:30, height:30, borderRadius:'50%', background:'rgba(201,169,110,0.15)', border:'1px solid rgba(201,169,110,0.3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, color:'var(--gold)', flexShrink:0 },
}
