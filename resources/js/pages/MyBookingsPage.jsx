import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { bookingsAPI } from '../services/api.js'
import { showToast } from '../components/Toast.jsx'

const fmt    = n  => new Intl.NumberFormat('vi-VN').format(n) + 'đ'
const nights = (a,b) => Math.round((new Date(b)-new Date(a))/86400000)
const STATUS = { confirmed:'Đã xác nhận', pending:'Đang chờ', cancelled:'Đã hủy' }

const ROOM_IMGS = {
  'Standard':     'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&q=80',
  'Deluxe':       'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=200&q=80',
  'Suite':        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=200&q=80',
  'Presidential': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=200&q=80',
}

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([])
  const [loading,  setLoading]  = useState(true)
  const navigate = useNavigate()

  const load = () => {
    setLoading(true)
    bookingsAPI.getAll().then(r => setBookings(r.data)).catch(()=>{}).finally(()=>setLoading(false))
  }
  useEffect(()=>{ load() },[])

  const cancel = async (id) => {
    if (!window.confirm('Xác nhận hủy đặt phòng này?')) return
    try {
      await bookingsAPI.cancel(id)
      setBookings(p => p.map(b => b.id===id ? { ...b, status:'cancelled' } : b))
      showToast('Đã hủy đặt phòng')
    } catch(e) { showToast(e.response?.data?.message||'Lỗi','error') }
  }

  return (
    <div style={{ paddingTop:80 }}>
      <section className="section">
        <p className="section-sub">TÀI KHOẢN</p>
        <h2 className="section-title">Đặt phòng của tôi</h2>
        <div className="gold-line"/>

        {loading ? (
          <div style={{ textAlign:'center', padding:'4rem', color:'var(--text3)' }}>Đang tải...</div>
        ) : bookings.length===0 ? (
          <div style={{ textAlign:'center', padding:'4rem' }}>
            <p style={{ color:'var(--text3)', marginBottom:'1.5rem' }}>Bạn chưa có đặt phòng nào</p>
            <button className="btn btn-gold" onClick={()=>navigate('/rooms')}>Khám phá phòng</button>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {bookings.map(b => {
              const n   = nights(b.checkin, b.checkout)
              const img = ROOM_IMGS[b.room_type] || ROOM_IMGS['Standard']
              return (
                <div key={b.id} style={S.card}>
                  <img src={img} alt={b.room_name} style={S.roomImg}/>
                  <div style={{ flex:1 }}>
                    <div style={S.roomName}>{b.room_name}</div>
                    <div style={S.meta}>Phòng {b.room_number} · {b.checkin} → {b.checkout} ({n} đêm) · {b.guests}</div>
                    <div style={S.total}>{fmt(b.total)}</div>
                    {b.note && <div style={{ fontSize:12, color:'var(--text3)', marginTop:4 }}>Ghi chú: {b.note}</div>}
                    <span className={`badge badge-${b.status}`} style={{ marginTop:8, display:'inline-block' }}>
                      {STATUS[b.status]}
                    </span>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:6, alignItems:'flex-end' }}>
                    <span style={{ fontSize:11, color:'var(--text3)' }}>#{b.id}</span>
                    <span style={{ fontSize:11, color:'var(--text3)' }}>{b.created_at?.split('T')[0]}</span>
                    {b.status!=='cancelled' && (
                      <button className="btn btn-danger btn-xs" onClick={()=>cancel(b.id)}>Hủy</button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}

const S = {
  card:     { background:'var(--dark2)', border:'1px solid rgba(201,169,110,0.15)', display:'flex', gap:'1.5rem', alignItems:'flex-start', overflow:'hidden' },
  roomImg:  { width:140, height:110, objectFit:'cover', flexShrink:0, display:'block' },
  roomName: { fontFamily:'var(--font-serif)', fontSize:20, fontWeight:300, marginBottom:4, marginTop:'1rem' },
  meta:     { fontSize:12, color:'var(--text2)', letterSpacing:0.5 },
  total:    { color:'var(--gold)', fontSize:18, fontWeight:500, marginTop:4 },
}
