import React, { useState, useEffect } from 'react'
import { roomsAPI } from '../services/api.js'
import RoomCard     from '../components/RoomCard.jsx'
import BookingModal from '../components/BookingModal.jsx'

export default function RoomsPage() {
  const [rooms,       setRooms]       = useState([])
  const [loading,     setLoading]     = useState(true)
  const [bookingRoom, setBookingRoom] = useState(null)
  const [filterType,  setFilterType]  = useState('')
  const [filterStatus,setFilterStatus]= useState('')

  const load = () => {
    setLoading(true)
    const params = {}
    if (filterType)   params.type   = filterType
    if (filterStatus) params.status = filterStatus
    roomsAPI.getAll(params).then(r => setRooms(r.data)).catch(() => {}).finally(() => setLoading(false))
  }

  useEffect(() => { load() }, [filterType, filterStatus])

  return (
    <div style={{ paddingTop:80 }}>
      <section className="section">
        <p className="section-sub">DANH SÁCH PHÒNG</p>
        <h2 className="section-title">Chọn phòng phù hợp</h2>
        <div className="gold-line" />

        {/* Filters */}
        <div style={{ display:'flex', gap:'1rem', marginBottom:'2rem', flexWrap:'wrap', alignItems:'center' }}>
          <select className="form-select" style={{ width:'auto', minWidth:180 }} value={filterType} onChange={e => setFilterType(e.target.value)}>
            <option value="">Tất cả loại phòng</option>
            {['Standard','Deluxe','Suite','Presidential'].map(t => <option key={t}>{t}</option>)}
          </select>
          <select className="form-select" style={{ width:'auto', minWidth:160 }} value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">Tất cả trạng thái</option>
            <option value="available">Còn phòng</option>
            <option value="booked">Đã đặt</option>
          </select>
          <span style={{ fontSize:13, color:'var(--text3)' }}>{rooms.length} phòng</span>
        </div>

        {loading ? (
          <div style={{ textAlign:'center', padding:'4rem', color:'var(--text3)' }}>Đang tải...</div>
        ) : rooms.length === 0 ? (
          <div style={{ textAlign:'center', padding:'4rem', color:'var(--text3)' }}>Không có phòng nào phù hợp</div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))', gap:'1.5rem' }}>
            {rooms.map(r => <RoomCard key={r.id} room={r} onBook={setBookingRoom} />)}
          </div>
        )}
      </section>

      {bookingRoom && <BookingModal room={bookingRoom} onClose={() => setBookingRoom(null)} onSuccess={load} />}
    </div>
  )
}
