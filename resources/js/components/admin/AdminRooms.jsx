import React, { useState, useEffect } from 'react'
import { roomsAPI } from '../../services/api.js'
import { showToast } from '../Toast.jsx'

const fmt = n => new Intl.NumberFormat('vi-VN').format(n) + 'đ'
const EMPTY = { number:'', type:'Standard', name:'', price:'', status:'available', description:'', amenities:'' }
const ROOM_IMGS = {
  'Standard':     'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=80&q=80',
  'Deluxe':       'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=80&q=80',
  'Suite':        'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=80&q=80',
  'Presidential': 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=80&q=80',
}

export default function AdminRooms() {
  const [rooms,   setRooms]   = useState([])
  const [loading, setLoading] = useState(true)
  const [modal,   setModal]   = useState(false)
  const [editing, setEditing] = useState(null)
  const [form,    setForm]    = useState(EMPTY)
  const [saving,  setSaving]  = useState(false)

  const load = () => { setLoading(true); roomsAPI.getAll().then(r => setRooms(r.data)).catch(()=>{}).finally(()=>setLoading(false)) }
  useEffect(()=>{ load() },[])
  const set = k => e => setForm(p=>({...p,[k]:e.target.value}))

  const openAdd  = () => { setEditing(null); setForm(EMPTY); setModal(true) }
  const openEdit = r  => {
    setEditing(r)
    setForm({ number:r.number, type:r.type, name:r.name, price:r.price, status:r.status, description:r.description||'', amenities:(r.amenities||[]).join(', ') })
    setModal(true)
  }

  const save = async () => {
    if (!form.number||!form.name||!form.price) { showToast('Điền đầy đủ thông tin','error'); return }
    setSaving(true)
    const payload = { ...form, price:parseInt(form.price), amenities:form.amenities.split(',').map(s=>s.trim()).filter(Boolean), emoji:'' }
    try {
      editing ? await roomsAPI.update(editing.id, payload) : await roomsAPI.create(payload)
      showToast(editing ? 'Đã cập nhật phòng' : 'Đã thêm phòng mới')
      setModal(false); load()
    } catch(e) { showToast(e.response?.data?.message||'Lỗi','error') }
    finally { setSaving(false) }
  }

  const del = async id => {
    if (!window.confirm('Xóa phòng này?')) return
    try { await roomsAPI.delete(id); showToast('Đã xóa'); load() }
    catch(e) { showToast(e.response?.data?.message||'Lỗi','error') }
  }

  return (
    <div>
      <div style={S.hdr}>
        <h1 style={S.title}>Quản lý phòng</h1>
        <button className="btn btn-gold btn-sm" onClick={openAdd}>+ Thêm phòng</button>
      </div>

      <div style={S.wrap}>
        {loading ? <p style={S.empty}>Đang tải...</p> : (
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead><tr>{['Ảnh & Số phòng','Loại','Tên','Giá/đêm','Trạng thái','Thao tác'].map(h=><th key={h} className="admin-th">{h}</th>)}</tr></thead>
            <tbody>
              {rooms.map(r => (
                <tr key={r.id}>
                  <td className="admin-td">
                    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                      <img src={ROOM_IMGS[r.type]||ROOM_IMGS['Standard']} alt={r.name}
                        style={{ width:52, height:38, objectFit:'cover', border:'1px solid rgba(201,169,110,0.2)', flexShrink:0 }}/>
                      <span style={{ fontWeight:500 }}>P.{r.number}</span>
                    </div>
                  </td>
                  <td className="admin-td"><span style={S.typeBadge}>{r.type}</span></td>
                  <td className="admin-td" style={{ color:'var(--text)' }}>{r.name}</td>
                  <td className="admin-td" style={{ color:'var(--gold)' }}>{fmt(r.price)}</td>
                  <td className="admin-td"><span className={`badge badge-${r.status==='available'?'available':'booked'}`}>{r.status==='available'?'Còn phòng':'Đã đặt'}</span></td>
                  <td className="admin-td">
                    <div style={{ display:'flex', gap:6 }}>
                      <button className="btn btn-outline btn-xs" onClick={()=>openEdit(r)}>Sửa</button>
                      <button className="btn btn-danger btn-xs"  onClick={()=>del(r.id)}>Xóa</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <div style={S.overlay} onClick={e=>e.target===e.currentTarget&&setModal(false)}>
          <div style={S.modal}>
            <button onClick={()=>setModal(false)} style={S.close}>✕</button>
            <h2 style={S.title}>{editing?`Sửa phòng ${editing.number}`:'Thêm phòng mới'}</h2>
            <p style={{ fontSize:11, letterSpacing:2, color:'var(--text3)', marginBottom:'1.5rem' }}>THÔNG TIN PHÒNG</p>

            {/* Preview ảnh theo loại */}
            <img src={ROOM_IMGS[form.type]||ROOM_IMGS['Standard']} alt="preview"
              style={{ width:'100%', height:140, objectFit:'cover', marginBottom:'1.5rem', border:'1px solid rgba(201,169,110,0.2)' }}/>

            <div className="form-row">
              <div className="form-group"><label className="form-label">Số phòng</label><input className="form-input" value={form.number} onChange={set('number')} placeholder="101"/></div>
              <div className="form-group"><label className="form-label">Loại phòng</label>
                <select className="form-select" value={form.type} onChange={set('type')}>
                  {['Standard','Deluxe','Suite','Presidential'].map(t=><option key={t}>{t}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group"><label className="form-label">Tên phòng</label><input className="form-input" value={form.name} onChange={set('name')} placeholder="Deluxe Ocean View"/></div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Giá / đêm (VND)</label><input className="form-input" type="number" value={form.price} onChange={set('price')} placeholder="2500000"/></div>
              <div className="form-group"><label className="form-label">Trạng thái</label>
                <select className="form-select" value={form.status} onChange={set('status')}>
                  <option value="available">Còn phòng</option><option value="booked">Đã đặt</option>
                </select>
              </div>
            </div>
            <div className="form-group"><label className="form-label">Mô tả</label><textarea className="form-textarea" value={form.description} onChange={set('description')} placeholder="Mô tả phòng..."/></div>
            <div className="form-group"><label className="form-label">Tiện nghi (cách nhau bằng dấu phẩy)</label><input className="form-input" value={form.amenities} onChange={set('amenities')} placeholder="WiFi, TV 4K, Điều hòa"/></div>
            <div style={{ display:'flex', gap:'1rem', marginTop:'1.5rem' }}>
              <button className="btn btn-gold" style={{ flex:1 }} onClick={save} disabled={saving}>{saving?'Đang lưu...':'Lưu'}</button>
              <button className="btn btn-outline" onClick={()=>setModal(false)}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const S = {
  hdr:      { display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'2rem', paddingBottom:'1.5rem', borderBottom:'1px solid rgba(201,169,110,0.12)' },
  title:    { fontFamily:'var(--font-serif)', fontSize:28, fontWeight:300 },
  wrap:     { background:'var(--dark2)', border:'1px solid rgba(201,169,110,0.12)', overflowX:'auto' },
  empty:    { padding:'3rem', textAlign:'center', color:'var(--text3)' },
  typeBadge:{ fontSize:10, padding:'2px 8px', border:'1px solid rgba(201,169,110,0.25)', color:'var(--text2)', letterSpacing:1 },
  overlay:  { position:'fixed', inset:0, background:'rgba(0,0,0,0.85)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' },
  modal:    { background:'var(--dark2)', border:'1px solid rgba(201,169,110,0.3)', maxWidth:520, width:'100%', padding:'2.5rem', position:'relative', maxHeight:'90vh', overflowY:'auto' },
  close:    { position:'absolute', top:'1rem', right:'1rem', background:'none', border:'none', color:'var(--text2)', fontSize:18, cursor:'pointer' },
}
