import React, { useState } from 'react'

const services = [
  {
    id: 'spa',
    icon: '💆',
    title: 'Spa & Wellness',
    subtitle: 'Thư giãn tâm hồn và thể xác',
    desc: 'Khu spa đẳng cấp với diện tích 2.000m², cung cấp hơn 30 liệu pháp chăm sóc sức khỏe từ truyền thống châu Á đến hiện đại châu Âu.',
    features: ['Massage toàn thân', 'Chăm sóc da mặt', 'Tắm ngâm thảo dược', 'Xông hơi khô & ướt', 'Yoga & Thiền định', 'Hồ jacuzzi ngoài trời'],
    hours: '07:00 — 22:00',
    price: 'Từ 500.000đ / liệu trình',
    img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
  },
  {
    id: 'pool',
    icon: '🏊',
    title: 'Hồ Bơi & Bãi Biển',
    subtitle: 'Không gian nước sang trọng',
    desc: 'Tổ hợp 3 hồ bơi bao gồm hồ bơi vô cực tầng thượng với tầm nhìn 360°, hồ bơi trẻ em và hồ bơi thể thao tiêu chuẩn Olympic.',
    features: ['Hồ bơi vô cực tầng thượng', 'Hồ bơi trẻ em', 'Hồ bơi thể thao', 'Bar pool side', 'Ghế tắm nắng cao cấp', 'Dịch vụ khăn tắm'],
    hours: '06:00 — 22:00',
    price: 'Miễn phí cho khách lưu trú',
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80',
  },
  {
    id: 'restaurant',
    icon: '🍽️',
    title: 'Nhà Hàng & Bar',
    subtitle: 'Ẩm thực tinh tế',
    desc: 'Ba điểm ẩm thực đẳng cấp phục vụ các món Việt Nam, Á Đông và Âu với nguyên liệu tươi sạch được tuyển chọn kỹ lưỡng mỗi ngày.',
    features: ['La Maison — Fine Dining Pháp', 'Le Jardin — Ẩm thực Việt Nam', 'Lumière Skybar — Cocktail & Tapas', 'Bữa sáng buffet quốc tế', 'Dịch vụ ăn phòng 24/7', 'Tiệc cưới & Sự kiện'],
    hours: '06:00 — 23:00',
    price: 'Từ 250.000đ / người',
    img: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
  },
  {
    id: 'fitness',
    icon: '🏋️',
    title: 'Phòng Gym & Fitness',
    subtitle: 'Duy trì lối sống năng động',
    desc: 'Phòng gym hiện đại 800m² trang bị đầy đủ thiết bị tập luyện cao cấp từ Technogym, cùng với các lớp tập nhóm hàng ngày.',
    features: ['Thiết bị Technogym', 'Cardio & Weights zone', 'Lớp Yoga buổi sáng', 'Lớp Pilates', 'Huấn luyện viên cá nhân', 'Phòng thay đồ VIP'],
    hours: '05:00 — 23:00',
    price: 'Miễn phí cho khách lưu trú',
    img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
  },
  {
    id: 'meeting',
    icon: '🤝',
    title: 'Phòng Họp & Sự Kiện',
    subtitle: 'Không gian chuyên nghiệp',
    desc: 'Hệ thống 8 phòng họp và hội trường tiêu chuẩn quốc tế với công nghệ AV hiện đại, phù hợp từ cuộc họp nhỏ đến hội nghị 500 người.',
    features: ['8 phòng họp đa năng', 'Hội trường 500 chỗ', 'Thiết bị AV hiện đại', 'High-speed WiFi', 'Dịch vụ catering', 'Hỗ trợ kỹ thuật 24/7'],
    hours: '24/7 theo yêu cầu',
    price: 'Liên hệ để báo giá',
    img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80',
  },
  {
    id: 'kids',
    icon: '🎠',
    title: 'Khu Vui Chơi Trẻ Em',
    subtitle: 'Thiên đường cho bé',
    desc: 'Khu vui chơi an toàn và sáng tạo với nhiều hoạt động phong phú, được giám sát bởi đội ngũ chuyên nghiệp để bố mẹ yên tâm nghỉ ngơi.',
    features: ['Khu chơi trong nhà', 'Hồ bơi trẻ em', 'Lớp nấu ăn mini', 'Lớp vẽ & thủ công', 'Rạp chiếu phim mini', 'Giữ trẻ theo yêu cầu'],
    hours: '08:00 — 20:00',
    price: 'Miễn phí cho khách lưu trú',
    img: 'https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=800&q=80',
  },
]

export default function ServicesPage() {
  const [active, setActive] = useState('spa')
  const current = services.find(s => s.id === active)

  return (
    <div style={{ paddingTop: 64 }}>

      {/* HERO */}
      <section style={S.hero}>
        <div style={{ textAlign: 'center' }}>
          <p style={S.eyebrow}>TIỆN ÍCH & DỊCH VỤ</p>
          <h1 style={S.heroTitle}>Trải nghiệm<br /><em style={{ color: 'var(--gold)' }}>toàn diện</em></h1>
          <div style={S.divider} />
          <p style={S.heroSub}>Mọi tiện nghi bạn cần, chúng tôi đều có</p>
        </div>
      </section>

      {/* SERVICE TABS */}
      <section className="section">
        <p className="section-sub">DANH MỤC</p>
        <h2 className="section-title">Dịch vụ của chúng tôi</h2>
        <div className="gold-line" />

        {/* Tab buttons */}
        <div style={S.tabs}>
          {services.map(s => (
            <button key={s.id} onClick={() => setActive(s.id)}
              style={{ ...S.tab, ...(active === s.id ? S.tabActive : {}) }}>
              <span style={{ fontSize: 20 }}>{s.icon}</span>
              <span style={{ fontSize: 11, letterSpacing: 1 }}>{s.title}</span>
            </button>
          ))}
        </div>

        {/* Active service detail */}
        {current && (
          <div style={S.detail}>
            <div style={S.detailImg}>
              <img src={current.img} alt={current.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={e => { e.target.style.display = 'none' }} />
              <div style={S.detailImgFallback}>{current.icon}</div>
            </div>
            <div style={S.detailInfo}>
              <p style={{ fontSize: 11, letterSpacing: 2, color: 'var(--gold)', marginBottom: 8, textTransform: 'uppercase' }}>{current.subtitle}</p>
              <h3 style={S.detailTitle}>{current.title}</h3>
              <div style={{ width: 40, height: 1, background: 'var(--gold)', margin: '1rem 0' }} />
              <p style={S.bodyText}>{current.desc}</p>

              <div style={S.featureGrid}>
                {current.features.map(f => (
                  <div key={f} style={S.feature}>
                    <span style={{ color: 'var(--gold)', marginRight: 8, fontSize: 12 }}>◆</span>
                    <span style={{ fontSize: 13, color: 'var(--text2)' }}>{f}</span>
                  </div>
                ))}
              </div>

              <div style={S.metaRow}>
                <div style={S.metaItem}>
                  <div style={S.metaLabel}>GIỜ HOẠT ĐỘNG</div>
                  <div style={S.metaVal}>{current.hours}</div>
                </div>
                <div style={S.metaItem}>
                  <div style={S.metaLabel}>GIÁ</div>
                  <div style={{ ...S.metaVal, color: 'var(--gold)' }}>{current.price}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ALL SERVICES GRID */}
      <section style={{ background: 'var(--dark2)', borderTop: '1px solid rgba(201,169,110,0.1)', padding: '5rem 2rem' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="section-sub">TẤT CẢ DỊCH VỤ</p>
          <h2 className="section-title">Tổng quan tiện ích</h2>
          <div className="gold-line" />
          <div style={S.allGrid}>
            {services.map(s => (
              <div key={s.id} style={S.allCard} onClick={() => { setActive(s.id); window.scrollTo({ top: 300, behavior: 'smooth' }) }}>
                <div style={{ fontSize: 36, marginBottom: 12 }}>{s.icon}</div>
                <div style={S.allTitle}>{s.title}</div>
                <div style={S.allSub}>{s.subtitle}</div>
                <div style={S.allPrice}>{s.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

const S = {
  hero:        { height: 400, background: 'linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.72)), url(https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80) center/cover', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
  eyebrow:     { fontSize: 11, letterSpacing: 5, color: 'var(--gold)', marginBottom: '1rem', textTransform: 'uppercase' },
  heroTitle:   { fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,6vw,64px)', fontWeight: 300, letterSpacing: 6, lineHeight: 1.2 },
  divider:     { width: 50, height: 1, background: 'var(--gold)', margin: '1.5rem auto' },
  heroSub:     { fontSize: 13, letterSpacing: 2, color: 'var(--text2)' },
  tabs:        { display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2.5rem' },
  tab:         { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: '12px 20px', background: 'var(--dark2)', border: '1px solid rgba(201,169,110,0.15)', color: 'var(--text2)', cursor: 'pointer', transition: 'all .2s', minWidth: 100 },
  tabActive:   { border: '1px solid var(--gold)', color: 'var(--gold)', background: 'rgba(201,169,110,0.06)' },
  detail:      { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' },
  detailImg:   { position: 'relative', height: 420, background: 'var(--dark2)', overflow: 'hidden', border: '1px solid rgba(201,169,110,0.15)' },
  detailImgFallback: { position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 80, zIndex: -1 },
  detailInfo:  { padding: '0.5rem 0' },
  detailTitle: { fontFamily: 'var(--font-serif)', fontSize: 36, fontWeight: 300 },
  bodyText:    { color: 'var(--text2)', lineHeight: 1.85, fontSize: 14 },
  featureGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', margin: '1.5rem 0' },
  feature:     { display: 'flex', alignItems: 'center' },
  metaRow:     { display: 'flex', gap: '2rem', marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(201,169,110,0.12)' },
  metaItem:    {},
  metaLabel:   { fontSize: 10, letterSpacing: 2, color: 'var(--text3)', marginBottom: 4, textTransform: 'uppercase' },
  metaVal:     { fontSize: 14, fontWeight: 500 },
  allGrid:     { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '1rem' },
  allCard:     { background: 'var(--dark)', border: '1px solid rgba(201,169,110,0.12)', padding: '1.75rem', textAlign: 'center', cursor: 'pointer', transition: 'border-color .2s, transform .2s' },
  allTitle:    { fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 300, marginBottom: 4 },
  allSub:      { fontSize: 11, color: 'var(--text3)', letterSpacing: 1, marginBottom: 8 },
  allPrice:    { fontSize: 12, color: 'var(--gold)' },
}
