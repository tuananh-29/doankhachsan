import React, { useState } from 'react'

const categories = ['Tất cả', 'Phòng nghỉ', 'Hồ bơi', 'Nhà hàng', 'Spa', 'Sảnh & Tiền sảnh', 'Sự kiện']

const photos = [
  { id: 1, cat: 'Phòng nghỉ',        emoji: '🛏️', title: 'Presidential Suite', desc: 'Tầng thượng với tầm nhìn toàn cảnh', size: 'large' },
  { id: 2, cat: 'Hồ bơi',           emoji: '🏊', title: 'Infinity Pool', desc: 'Hồ bơi vô cực tầng 20', size: 'medium' },
  { id: 3, cat: 'Nhà hàng',         emoji: '🍽️', title: 'La Maison', desc: 'Fine dining Pháp sang trọng', size: 'medium' },
  { id: 4, cat: 'Spa',              emoji: '💆', title: 'Wellness Center', desc: 'Không gian thư giãn tuyệt đối', size: 'small' },
  { id: 5, cat: 'Phòng nghỉ',       emoji: '🌊', title: 'Deluxe Ocean View', desc: 'Tầm nhìn panorama ra biển', size: 'medium' },
  { id: 6, cat: 'Sảnh & Tiền sảnh', emoji: '✨', title: 'Grand Lobby', desc: 'Sảnh chờ đẳng cấp 5 sao', size: 'large' },
  { id: 7, cat: 'Sự kiện',          emoji: '🎊', title: 'Ballroom', desc: 'Sảnh tiệc cưới & hội nghị', size: 'medium' },
  { id: 8, cat: 'Hồ bơi',          emoji: '🌅', title: 'Sunset Pool Bar', desc: 'Bar bên hồ bơi lúc hoàng hôn', size: 'small' },
  { id: 9, cat: 'Nhà hàng',        emoji: '🍹', title: 'Skybar', desc: 'Bar tầng thượng nhìn ra thành phố', size: 'small' },
  { id: 10, cat: 'Phòng nghỉ',     emoji: '🌹', title: 'Honeymoon Suite', desc: 'Setup lãng mạn cho cặp đôi', size: 'medium' },
  { id: 11, cat: 'Spa',            emoji: '🌸', title: 'Flower Bath', desc: 'Bồn tắm hoa thư giãn', size: 'large' },
  { id: 12, cat: 'Sự kiện',        emoji: '💍', title: 'Wedding Setup', desc: 'Tiệc cưới phong cách hoàng gia', size: 'medium' },
]

const palettes = [
  ['#1a0a00','#3d1f00'],['#001a1a','#003333'],['#0d0020','#1a0033'],
  ['#001a00','#003300'],['#1a001a','#330033'],['#0d1a00','#1a3300'],
]

export default function GalleryPage() {
  const [filter,   setFilter]   = useState('Tất cả')
  const [lightbox, setLightbox] = useState(null)

  const filtered = filter === 'Tất cả' ? photos : photos.filter(p => p.cat === filter)

  return (
    <div style={{ paddingTop: 64 }}>

      {/* HERO */}
      <section style={S.hero}>
        <div style={{ textAlign: 'center' }}>
          <p style={S.eyebrow}>THƯ VIỆN ẢNH</p>
          <h1 style={S.heroTitle}>Gallery<br /><em style={{ color: 'var(--gold)' }}>Lumière</em></h1>
          <div style={S.divider} />
          <p style={S.heroSub}>Khám phá vẻ đẹp của từng góc khuất</p>
        </div>
      </section>

      <section className="section">
        {/* Filter */}
        <div style={S.filters}>
          {categories.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              style={{ ...S.filterBtn, ...(filter === c ? S.filterActive : {}) }}>
              {c}
            </button>
          ))}
        </div>

        <p style={{ color: 'var(--text3)', fontSize: 12, marginBottom: '2rem' }}>{filtered.length} ảnh</p>

        {/* Masonry-style grid */}
        <div style={S.grid}>
          {filtered.map((photo, i) => {
            const [bg1, bg2] = palettes[i % palettes.length]
            const height = photo.size === 'large' ? 360 : photo.size === 'medium' ? 260 : 200
            return (
              <div key={photo.id} style={{ ...S.photoCard, gridColumn: photo.size === 'large' ? 'span 2' : 'span 1' }}
                onClick={() => setLightbox(photo)}>
                <div style={{ ...S.photoImg, height, background: `linear-gradient(135deg, ${bg1}, ${bg2})` }}>
                  <span style={{ fontSize: photo.size === 'large' ? 72 : 50 }}>{photo.emoji}</span>
                </div>
                <div style={S.photoOverlay}>
                  <div style={S.photoTitle}>{photo.title}</div>
                  <div style={S.photoDesc}>{photo.desc}</div>
                  <div style={S.photoCat}>{photo.cat}</div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox && (
        <div style={S.lightboxOverlay} onClick={() => setLightbox(null)}>
          <div style={S.lightboxContent} onClick={e => e.stopPropagation()}>
            <button style={S.lightboxClose} onClick={() => setLightbox(null)}>✕</button>
            <div style={S.lightboxImg}>
              <span style={{ fontSize: 100 }}>{lightbox.emoji}</span>
            </div>
            <div style={S.lightboxInfo}>
              <span style={S.photoCat}>{lightbox.cat}</span>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 300, margin: '0.75rem 0 0.5rem' }}>{lightbox.title}</h3>
              <p style={{ color: 'var(--text2)', fontSize: 14 }}>{lightbox.desc}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}

const S = {
  hero:         { height: 400, background: 'linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.72)), url(https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80) center/cover', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
  eyebrow:      { fontSize: 11, letterSpacing: 5, color: 'var(--gold)', marginBottom: '1rem', textTransform: 'uppercase' },
  heroTitle:    { fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,6vw,64px)', fontWeight: 300, letterSpacing: 6, lineHeight: 1.2 },
  divider:      { width: 50, height: 1, background: 'var(--gold)', margin: '1.5rem auto' },
  heroSub:      { fontSize: 13, letterSpacing: 2, color: 'var(--text2)' },
  filters:      { display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' },
  filterBtn:    { padding: '8px 18px', background: 'transparent', border: '1px solid rgba(201,169,110,0.2)', color: 'var(--text2)', cursor: 'pointer', fontSize: 12, letterSpacing: 1, transition: 'all .2s' },
  filterActive: { background: 'var(--gold)', color: 'var(--dark)', border: '1px solid var(--gold)', fontWeight: 500 },
  grid:         { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' },
  photoCard:    { position: 'relative', cursor: 'pointer', overflow: 'hidden', border: '1px solid rgba(201,169,110,0.1)', transition: 'transform .3s, border-color .3s' },
  photoImg:     { display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform .4s' },
  photoOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(transparent, rgba(0,0,0,0.85))', padding: '2rem 1.25rem 1.25rem', opacity: 0, transition: 'opacity .3s' },
  photoTitle:   { fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 300, marginBottom: 2 },
  photoDesc:    { fontSize: 11, color: 'var(--text2)', marginBottom: 6 },
  photoCat:     { display: 'inline-block', fontSize: 9, letterSpacing: 2, color: 'var(--gold)', border: '1px solid rgba(201,169,110,0.4)', padding: '2px 8px', textTransform: 'uppercase' },
  lightboxOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' },
  lightboxContent: { background: 'var(--dark2)', border: '1px solid rgba(201,169,110,0.2)', maxWidth: 680, width: '100%', position: 'relative', overflow: 'hidden' },
  lightboxClose:   { position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', color: 'var(--text2)', fontSize: 20, cursor: 'pointer', zIndex: 1 },
  lightboxImg:     { height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--dark3)' },
  lightboxInfo:    { padding: '1.5rem' },
}
