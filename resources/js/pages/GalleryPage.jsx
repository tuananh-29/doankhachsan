import React, { useState } from 'react'

const categories = ['Tất cả', 'Phòng nghỉ', 'Hồ bơi', 'Nhà hàng', 'Spa', 'Sảnh & Tiền sảnh', 'Sự kiện']

const photos = [
  { id:1,  cat:'Phòng nghỉ',        title:'Presidential Suite',    desc:'Tầng thượng với tầm nhìn toàn cảnh',    size:'large',  img:'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=900&q=80' },
  { id:2,  cat:'Hồ bơi',           title:'Infinity Pool',         desc:'Hồ bơi vô cực tầng 20',                size:'medium', img:'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80' },
  { id:3,  cat:'Nhà hàng',         title:'La Maison',             desc:'Fine dining Pháp sang trọng',           size:'medium', img:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600&q=80' },
  { id:4,  cat:'Spa',              title:'Wellness Center',       desc:'Không gian thư giãn tuyệt đối',         size:'small',  img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=400&q=80' },
  { id:5,  cat:'Phòng nghỉ',       title:'Deluxe Ocean View',     desc:'Tầm nhìn panorama ra biển',             size:'medium', img:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80' },
  { id:6,  cat:'Sảnh & Tiền sảnh', title:'Grand Lobby',           desc:'Sảnh chờ đẳng cấp 5 sao',              size:'large',  img:'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=900&q=80' },
  { id:7,  cat:'Sự kiện',          title:'Ballroom',              desc:'Sảnh tiệc cưới & hội nghị',             size:'medium', img:'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80' },
  { id:8,  cat:'Hồ bơi',          title:'Sunset Pool Bar',        desc:'Bar bên hồ bơi lúc hoàng hôn',         size:'small',  img:'https://images.unsplash.com/photo-1455587734955-081b22074882?w=400&q=80' },
  { id:9,  cat:'Nhà hàng',        title:'Skybar',                 desc:'Bar tầng thượng nhìn ra thành phố',    size:'small',  img:'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=400&q=80' },
  { id:10, cat:'Phòng nghỉ',      title:'Honeymoon Suite',        desc:'Setup lãng mạn cho cặp đôi',           size:'medium', img:'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80' },
  { id:11, cat:'Spa',             title:'Massage Room',           desc:'Phòng massage cao cấp riêng tư',        size:'large',  img:'https://images.unsplash.com/photo-1519823551278-64ac92734fb1?w=900&q=80' },
  { id:12, cat:'Sự kiện',         title:'Wedding Setup',          desc:'Tiệc cưới phong cách hoàng gia',        size:'medium', img:'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80' },
  { id:13, cat:'Sảnh & Tiền sảnh',title:'Reception Desk',         desc:'Quầy lễ tân sang trọng',               size:'small',  img:'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&q=80' },
  { id:14, cat:'Phòng nghỉ',      title:'Standard Garden View',   desc:'Phòng tiêu chuẩn view vườn',           size:'small',  img:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=80' },
  { id:15, cat:'Nhà hàng',        title:'Breakfast Buffet',       desc:'Bữa sáng buffet quốc tế phong phú',    size:'medium', img:'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&q=80' },
  { id:16, cat:'Hồ bơi',         title:'Kids Pool',              desc:'Hồ bơi trẻ em an toàn & vui vẻ',      size:'small',  img:'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=400&q=80' },
]

export default function GalleryPage() {
  const [filter,   setFilter]   = useState('Tất cả')
  const [lightbox, setLightbox] = useState(null)

  const filtered = filter === 'Tất cả' ? photos : photos.filter(p => p.cat === filter)

  return (
    <div style={{ paddingTop:64 }}>

      {/* HERO */}
      <section style={S.hero}>
        <div style={{ textAlign:'center', padding:'0 1rem' }}>
          <p style={S.eyebrow}>THƯ VIỆN ẢNH</p>
          <h1 style={S.heroTitle}>Gallery<br/><em style={{ color:'var(--gold)' }}>Lumière</em></h1>
          <div style={S.divider}/>
          <p style={S.heroSub}>Khám phá vẻ đẹp của từng góc khuất</p>
        </div>
      </section>

      <section className="section">
        {/* Filter tabs */}
        <div style={S.filters}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              style={{ ...S.filterBtn, ...(filter===c ? S.filterActive : {}) }}>
              {c}
            </button>
          ))}
        </div>
        <p style={{ color:'var(--text3)', fontSize:12, marginBottom:'2rem' }}>{filtered.length} ảnh</p>

        {/* Grid */}
        <div style={S.grid}>
          {filtered.map(photo => {
            const height = photo.size==='large' ? 380 : photo.size==='medium' ? 260 : 200
            return (
              <div key={photo.id}
                style={{ ...S.photoCard, gridColumn: photo.size==='large' ? 'span 2' : 'span 1' }}
                onClick={() => setLightbox(photo)}>
                <img src={photo.img} alt={photo.title} style={{ ...S.photoImg, height }}/>
                <div style={S.photoOverlay}>
                  <div style={S.photoTitle}>{photo.title}</div>
                  <div style={S.photoDesc}>{photo.desc}</div>
                  <span style={S.photoCat}>{photo.cat}</span>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div style={S.overlay} onClick={() => setLightbox(null)}>
          <div style={S.lightbox} onClick={e => e.stopPropagation()}>
            <button style={S.closeBtn} onClick={() => setLightbox(null)}>✕</button>
            <img src={lightbox.img.replace('w=400','w=900').replace('w=600','w=900')}
              alt={lightbox.title} style={S.lightboxImg}/>
            <div style={{ padding:'1.5rem' }}>
              <span style={S.photoCat}>{lightbox.cat}</span>
              <h3 style={{ fontFamily:'var(--font-serif)', fontSize:26, fontWeight:300, margin:'0.75rem 0 0.5rem' }}>{lightbox.title}</h3>
              <p style={{ color:'var(--text2)', fontSize:14 }}>{lightbox.desc}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

const S = {
  hero:        { height:400, background:'linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.7)),url(https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80) center/cover', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center' },
  eyebrow:     { fontSize:11, letterSpacing:5, color:'var(--gold)', marginBottom:'1rem', textTransform:'uppercase' },
  heroTitle:   { fontFamily:'var(--font-serif)', fontSize:'clamp(36px,6vw,64px)', fontWeight:300, letterSpacing:6, lineHeight:1.2 },
  divider:     { width:50, height:1, background:'var(--gold)', margin:'1.5rem auto' },
  heroSub:     { fontSize:13, letterSpacing:2, color:'var(--text2)' },
  filters:     { display:'flex', gap:'0.5rem', flexWrap:'wrap', marginBottom:'1rem' },
  filterBtn:   { padding:'8px 18px', background:'transparent', border:'1px solid rgba(201,169,110,0.2)', color:'var(--text2)', cursor:'pointer', fontSize:12, letterSpacing:1, transition:'all .2s' },
  filterActive:{ background:'var(--gold)', color:'var(--dark)', border:'1px solid var(--gold)', fontWeight:500 },
  grid:        { display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'0.75rem' },
  photoCard:   { position:'relative', overflow:'hidden', border:'1px solid rgba(201,169,110,0.1)', cursor:'pointer' },
  photoImg:    { width:'100%', objectFit:'cover', display:'block', transition:'transform .4s' },
  photoOverlay:{ position:'absolute', bottom:0, left:0, right:0, background:'linear-gradient(transparent,rgba(0,0,0,0.82))', padding:'2rem 1rem 1rem', opacity:0, transition:'opacity .3s' },
  photoTitle:  { fontFamily:'var(--font-serif)', fontSize:16, fontWeight:300, marginBottom:3 },
  photoDesc:   { fontSize:11, color:'var(--text2)', marginBottom:6 },
  photoCat:    { display:'inline-block', fontSize:9, letterSpacing:2, color:'var(--gold)', border:'1px solid rgba(201,169,110,0.4)', padding:'2px 8px', textTransform:'uppercase' },
  overlay:     { position:'fixed', inset:0, background:'rgba(0,0,0,0.93)', zIndex:500, display:'flex', alignItems:'center', justifyContent:'center', padding:'2rem' },
  lightbox:    { background:'var(--dark2)', border:'1px solid rgba(201,169,110,0.2)', maxWidth:780, width:'100%', position:'relative', overflow:'hidden', maxHeight:'90vh', overflowY:'auto' },
  closeBtn:    { position:'absolute', top:'1rem', right:'1rem', background:'rgba(0,0,0,0.6)', border:'1px solid rgba(201,169,110,0.3)', color:'var(--text)', fontSize:16, cursor:'pointer', width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', zIndex:1 },
  lightboxImg: { width:'100%', maxHeight:500, objectFit:'cover', display:'block' },
}
