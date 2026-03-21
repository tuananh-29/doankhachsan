import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const fmt = n => new Intl.NumberFormat('vi-VN').format(n) + 'đ'

const ROOM_IMGS = {
  Standard:     'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
  Deluxe:       'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
  Suite:        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
  Presidential: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80',
}

export default function RoomCard({ room, onBook }) {
  const { user }   = useAuth()
  const navigate   = useNavigate()
  const available  = room.status === 'available'
  const amenities  = Array.isArray(room.amenities) ? room.amenities : []
  const img        = ROOM_IMGS[room.type] || ROOM_IMGS.Standard

  const handleBook = () => {
    if (!user) { navigate('/login'); return }
    onBook?.(room)
  }

  return (
    <div style={S.card}>
      <div style={S.imgWrap}>
        <img src={img} alt={room.name} style={S.img} />
        <span style={{ ...S.badge, background: available ? 'rgba(39,174,96,0.85)' : 'rgba(192,57,43,0.85)' }}>
          {available ? 'Còn phòng' : 'Đã đặt'}
        </span>
        <span style={S.type}>{room.type}</span>
      </div>
      <div style={S.body}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
          <h3 style={S.name}>{room.name}</h3>
          <span style={{ fontSize:11, color:'var(--text3)', flexShrink:0 }}>P.{room.number}</span>
        </div>
        <div style={S.price}>{fmt(room.price)} <span style={{ fontSize:12, color:'var(--text2)', fontWeight:400 }}>/ đêm</span></div>
        <p style={S.desc}>{room.description}</p>
        <div style={S.tags}>
          {amenities.slice(0,3).map(a => <span key={a} style={S.tag}>{a}</span>)}
          {amenities.length > 3 && <span style={S.tag}>+{amenities.length-3}</span>}
        </div>
        {available
          ? <button className="btn btn-gold btn-sm" style={{ marginTop:14, width:'100%' }} onClick={handleBook}>Đặt phòng</button>
          : <div style={{ marginTop:14, padding:'8px', textAlign:'center', fontSize:12, color:'var(--text3)', border:'1px solid rgba(201,169,110,0.1)' }}>Phòng đã có khách</div>
        }
      </div>
    </div>
  )
}

const S = {
  card:    { background:'var(--dark2)', border:'1px solid rgba(201,169,110,0.15)', overflow:'hidden', transition:'transform .3s,border-color .3s' },
  imgWrap: { position:'relative', overflow:'hidden' },
  img:     { width:'100%', height:220, objectFit:'cover', display:'block', transition:'transform .4s' },
  badge:   { position:'absolute', top:12, right:12, padding:'3px 10px', fontSize:10, letterSpacing:1, color:'#fff', textTransform:'uppercase' },
  type:    { position:'absolute', top:12, left:12, padding:'3px 10px', fontSize:10, letterSpacing:1, color:'var(--gold)', background:'rgba(13,13,13,0.8)', border:'1px solid rgba(201,169,110,0.3)', textTransform:'uppercase' },
  body:    { padding:'1.25rem' },
  name:    { fontFamily:'var(--font-serif)', fontSize:20, fontWeight:300 },
  price:   { color:'var(--gold)', fontSize:18, fontWeight:500, margin:'4px 0 8px' },
  desc:    { color:'var(--text2)', fontSize:12, lineHeight:1.65, marginBottom:10 },
  tags:    { display:'flex', gap:6, flexWrap:'wrap' },
  tag:     { padding:'2px 8px', border:'1px solid rgba(201,169,110,0.25)', fontSize:10, color:'var(--text2)', letterSpacing:1 },
}
