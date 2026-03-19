import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const fmt = n => new Intl.NumberFormat('vi-VN').format(n) + 'đ'

export default function RoomCard({ room, onBook }) {
  const { user } = useAuth()
  const navigate = useNavigate()
  const available  = room.status === 'available'
  const amenities  = Array.isArray(room.amenities) ? room.amenities : []

  const handleBook = () => {
    if (!user) { navigate('/login'); return }
    onBook?.(room)
  }

  return (
    <div style={S.card}>
      <div style={S.imgBox}>{room.emoji || '🛏️'}</div>
      <div style={S.body}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
          <h3 style={S.name}>{room.name}</h3>
          <span style={{ fontSize:11, color:'var(--text3)' }}>P.{room.number}</span>
        </div>
        <div style={S.price}>{fmt(room.price)} <span style={{ fontSize:12, color:'var(--text2)', fontWeight:400 }}>/ đêm</span></div>
        <p style={S.desc}>{room.description}</p>
        <div style={S.tags}>
          {amenities.slice(0,3).map(a => <span key={a} style={S.tag}>{a}</span>)}
          {amenities.length > 3 && <span style={S.tag}>+{amenities.length - 3}</span>}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:14 }}>
          <span className={`badge badge-${available ? 'available' : 'booked'}`}>
            {available ? 'Còn phòng' : 'Đã đặt'}
          </span>
          {available && <button className="btn btn-gold btn-sm" onClick={handleBook}>Đặt phòng</button>}
        </div>
      </div>
    </div>
  )
}

const S = {
  card:   { background:'var(--dark2)', border:'1px solid rgba(201,169,110,0.15)', overflow:'hidden', transition:'transform .3s,border-color .3s', cursor:'default' },
  imgBox: { height:200, background:'var(--dark3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:60 },
  body:   { padding:'1.25rem' },
  name:   { fontFamily:'var(--font-serif)', fontSize:20, fontWeight:300 },
  price:  { color:'var(--gold)', fontSize:18, fontWeight:500, margin:'4px 0 8px' },
  desc:   { color:'var(--text2)', fontSize:12, lineHeight:1.65, marginBottom:10 },
  tags:   { display:'flex', gap:6, flexWrap:'wrap' },
  tag:    { padding:'2px 8px', border:'1px solid rgba(201,169,110,0.25)', fontSize:10, color:'var(--text2)', letterSpacing:1 },
}
