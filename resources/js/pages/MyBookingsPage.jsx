import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { bookingsAPI } from '../services/api.js'
import { showToast } from '../components/Toast.jsx'

const fmt    = n  => new Intl.NumberFormat('vi-VN').format(n) + 'đ'
const nights = (a,b) => Math.round((new Date(b) - new Date(a)) / 86400000)
const STATUS = { confirmed:'Đã xác nhận', pending:'Đang chờ', cancelled:'Đã hủy' }

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState([])
  const [loading,  setLoading]  = useState(true)
  const navigate = useNavigate()

  const load = () => {
    setLoading(true)
    bookingsAPI.getAll().then(r => setBookings(r.data)).catch(() => {}).finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const cancel = async (id) => {
    if (!window.confirm('Xác nhận hủy đặt phòng này?')) return
    try {
      await bookingsAPI.cancel(id)
      setBookings(p => p.map(b => b.id === id ? { ...b, status:'cancelled' } : b))
      showToast('Đã hủy đặt phòng')
    } catch (e) { showToast(e.response?.data?.message || 'Lỗi', 'error') }
  }

  return (
    <div style={{ paddingTop:80 }}>
      <section className="section">
        <p className="section-sub">TÀI KHOẢN</p>
        <h2 className="section-title">Đặt phòng của tôi</h2>
        <div className="gold-line" />

        {loading ? (
          <div style={{ textAlign:'center', padding:'4rem', color:'var(--text3)' }}>Đang tải...</div>
        ) : bookings.length === 0 ? (
          <div style={{ textAlign:'center', padding:'4rem' }}>
            <p style={{ color:'var(--text3)', marginBottom:'1.5rem' }}>Bạn chưa có đặt phòng nào</p>
            <button className="btn btn-gold" onClick={() => navigate('/rooms')}>Khám phá phòng</button>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {bookings.map(b => {
              const n = nights(b.checkin, b.checkout)
              return (
                <div key={b.id} style={S.card}>
                  <div style={S.emoji}>{b.room_emoji || '🛏️'}</div>
                  <div style={{ flex:1 }}>
                    <div style={S.roomName}>{b.room_name}</div>
                    <div style={S.meta}>Phòng {b.room_number} · {b.checkin} → {b.checkout} ({n} đêm) · {b.guests}</div>
                    <div style={S.total}>{fmt(b.total)}</div>
                    {b.note && <div style={S.note}>Ghi chú: {b.note}</div>}
                    <span className={`badge badge-${b.status}`} style={{ marginTop:8, display:'inline-block' }}>
                      {STATUS[b.status]}
                    </span>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', gap:6, alignItems:'flex-end' }}>
                    <span style={{ fontSize:11, color:'var(--text3)' }}>#{b.id}</span>
                    <span style={{ fontSize:11, color:'var(--text3)' }}>{b.created_at?.split('T')[0]}</span>
                    {b.status !== 'cancelled' && (
                      <button className="btn btn-danger btn-xs" onClick={() => cancel(b.id)}>Hủy</button>
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
  card:     { background:'var(--dark2)', border:'1px solid rgba(201,169,110,0.15)', padding:'1.5rem', display:'flex', gap:'1.5rem', alignItems:'flex-start' },
  emoji:    { width:72, height:72, background:'var(--dark3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:32, flexShrink:0, border:'1px solid rgba(201,169,110,0.1)' },
  roomName: { fontFamily:'var(--font-serif)', fontSize:20, fontWeight:300, marginBottom:4 },
  meta:     { fontSize:12, color:'var(--text2)', letterSpacing:0.5 },
  total:    { color:'var(--gold)', fontSize:18, fontWeight:500, marginTop:4 },
  note:     { fontSize:12, color:'var(--text3)', marginTop:4 },
}
