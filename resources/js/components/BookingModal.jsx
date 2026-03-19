import React, { useState } from 'react'
import { bookingsAPI } from '../services/api.js'
import { showToast } from './Toast.jsx'

const fmt = n => new Intl.NumberFormat('vi-VN').format(n) + 'đ'

export default function BookingModal({ room, onClose, onSuccess }) {
  const today    = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0]

  const [checkin,  setCheckin]  = useState(today)
  const [checkout, setCheckout] = useState(tomorrow)
  const [guests,   setGuests]   = useState('2 khách')
  const [note,     setNote]     = useState('')
  const [loading,  setLoading]  = useState(false)
  const [done,     setDone]     = useState(false)
  const [error,    setError]    = useState('')

  const nights = Math.max(1, Math.round((new Date(checkout) - new Date(checkin)) / 86400000))
  const total  = room ? room.price * nights : 0

  const submit = async () => {
    if (new Date(checkout) <= new Date(checkin)) { setError('Ngày trả phòng phải sau ngày nhận phòng'); return }
    setLoading(true); setError('')
    try {
      await bookingsAPI.create({ room_id: room.id, checkin, checkout, guests, note })
      setDone(true)
      showToast('Đặt phòng thành công!')
      setTimeout(() => { onSuccess?.(); onClose() }, 1800)
    } catch (e) {
      setError(e.response?.data?.message || 'Có lỗi xảy ra')
    } finally { setLoading(false) }
  }

  if (!room) return null

  return (
    <div style={S.overlay} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={S.modal}>
        <button onClick={onClose} style={S.close}>✕</button>
        <h2 style={{ fontFamily:'var(--font-serif)', fontSize:28, fontWeight:300, marginBottom:4 }}>{room.name}</h2>
        <p style={{ fontSize:11, letterSpacing:2, color:'var(--gold)', marginBottom:'1.5rem' }}>{fmt(room.price)} / ĐÊM</p>

        {done  && <div className="success-msg">✓ Đặt phòng thành công! Tổng: {fmt(total)}</div>}
        {error && <div className="error-banner">{error}</div>}

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Nhận phòng</label>
            <input type="date" className="form-input" value={checkin}  min={today}   onChange={e => setCheckin(e.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">Trả phòng</label>
            <input type="date" className="form-input" value={checkout} min={checkin} onChange={e => setCheckout(e.target.value)} />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Số khách</label>
          <select className="form-select" value={guests} onChange={e => setGuests(e.target.value)}>
            {['1 khách','2 khách','3 khách','4 khách','5+ khách'].map(g => <option key={g}>{g}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Ghi chú</label>
          <textarea className="form-textarea" value={note} onChange={e => setNote(e.target.value)} placeholder="Yêu cầu đặc biệt..." />
        </div>

        <div style={S.summary}>
          <span style={{ color:'var(--text2)', fontSize:13 }}>{nights} đêm</span>
          <span style={{ color:'var(--gold)', fontSize:18, fontWeight:500 }}>{fmt(total)}</span>
        </div>

        <div style={{ display:'flex', gap:'1rem', marginTop:'1.5rem' }}>
          <button className="btn btn-gold" style={{ flex:1 }} onClick={submit} disabled={loading || done}>
            {loading ? 'Đang xử lý...' : 'Xác nhận đặt phòng'}
          </button>
          <button className="btn btn-outline" onClick={onClose}>Hủy</button>
        </div>
      </div>
    </div>
  )
}

const S = {
  overlay: { position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' },
  modal:   { background:'var(--dark2)', border:'1px solid rgba(201,169,110,0.3)', maxWidth:500, width:'100%', padding:'2.5rem', position:'relative', maxHeight:'90vh', overflowY:'auto' },
  close:   { position:'absolute', top:'1rem', right:'1rem', background:'none', border:'none', color:'var(--text2)', fontSize:18, cursor:'pointer' },
  summary: { background:'var(--dark3)', padding:'1rem 1.25rem', border:'1px solid rgba(201,169,110,0.15)', display:'flex', justifyContent:'space-between', alignItems:'center' },
}
