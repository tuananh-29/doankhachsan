import React, { useState, useEffect } from 'react'
import { bookingsAPI } from '../../services/api.js'
import { showToast } from '../Toast.jsx'

const fmt = n => new Intl.NumberFormat('vi-VN').format(n) + 'đ'
const LABEL = { confirmed:'Xác nhận', pending:'Chờ duyệt', cancelled:'Đã hủy' }
const ROOM_IMGS = {
  'Standard':     'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=60&q=80',
  'Deluxe':       'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=60&q=80',
  'Suite':        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=60&q=80',
  'Presidential': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=60&q=80',
}

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading,  setLoading]  = useState(true)
  const [filter,   setFilter]   = useState('')

  const load = () => { setLoading(true); bookingsAPI.getAll().then(r=>setBookings(r.data)).catch(()=>{}).finally(()=>setLoading(false)) }
  useEffect(()=>{ load() },[])

  const updateStatus = async (id, status) => {
    try { await bookingsAPI.updateStatus(id, status); showToast('Đã cập nhật'); load() }
    catch(e) { showToast(e.response?.data?.message||'Lỗi','error') }
  }

  const rows = filter ? bookings.filter(b=>b.status===filter) : bookings

  return (
    <div>
      <div style={S.hdr}>
        <h1 style={S.title}>Quản lý đặt phòng</h1>
        <select className="form-select" style={{ width:'auto', minWidth:160 }} value={filter} onChange={e=>setFilter(e.target.value)}>
          <option value="">Tất cả trạng thái</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="pending">Chờ duyệt</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>
      <div style={S.wrap}>
        {loading ? <p style={S.empty}>Đang tải...</p> : rows.length===0 ? <p style={S.empty}>Không có đặt phòng nào</p> : (
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead><tr>{['ID','Khách hàng','Phòng','Check-in','Check-out','Tổng','Trạng thái','Thao tác'].map(h=><th key={h} className="admin-th">{h}</th>)}</tr></thead>
            <tbody>
              {rows.map(b => (
                <tr key={b.id}>
                  <td className="admin-td" style={{ color:'var(--text3)' }}>#{b.id}</td>
                  <td className="admin-td">
                    <div style={{ color:'var(--text)' }}>{b.user_name}</div>
                    <div style={{ fontSize:11, color:'var(--text3)', marginTop:2 }}>{b.user_phone}</div>
                  </td>
                  <td className="admin-td">
                    <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                      <img src={ROOM_IMGS[b.room_type]||ROOM_IMGS['Standard']} alt={b.room_name}
                        style={{ width:44, height:32, objectFit:'cover', border:'1px solid rgba(201,169,110,0.2)', flexShrink:0 }}/>
                      <div>
                        <div>{b.room_name}</div>
                        <div style={{ fontSize:11, color:'var(--text3)' }}>P.{b.room_number}</div>
                      </div>
                    </div>
                  </td>
                  <td className="admin-td">{b.checkin}</td>
                  <td className="admin-td">{b.checkout}</td>
                  <td className="admin-td" style={{ color:'var(--gold)', whiteSpace:'nowrap' }}>{fmt(b.total)}</td>
                  <td className="admin-td"><span className={`badge badge-${b.status}`}>{LABEL[b.status]}</span></td>
                  <td className="admin-td">
                    <div style={{ display:'flex', gap:5 }}>
                      {b.status!=='confirmed' && <button className="btn btn-gold   btn-xs" onClick={()=>updateStatus(b.id,'confirmed')}>✓</button>}
                      {b.status!=='cancelled' && <button className="btn btn-danger btn-xs" onClick={()=>updateStatus(b.id,'cancelled')}>✕</button>}
                    </div>
                  </td>
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
  hdr:  { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2rem', paddingBottom:'1.5rem', borderBottom:'1px solid rgba(201,169,110,0.12)' },
  title:{ fontFamily:'var(--font-serif)', fontSize:28, fontWeight:300 },
  wrap: { background:'var(--dark2)', border:'1px solid rgba(201,169,110,0.12)', overflowX:'auto' },
  empty:{ padding:'3rem', textAlign:'center', color:'var(--text3)' },
}
