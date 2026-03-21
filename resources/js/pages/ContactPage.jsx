import React, { useState } from 'react'
import { showToast } from '../components/Toast.jsx'

export default function ContactPage() {
  const [form,    setForm]    = useState({ name: '', email: '', phone: '', subject: 'Đặt phòng', message: '' })
  const [loading, setLoading] = useState(false)

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const submit = async () => {
    if (!form.name || !form.email || !form.message) { showToast('Vui lòng điền đầy đủ thông tin', 'error'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    showToast('Đã gửi tin nhắn! Chúng tôi sẽ phản hồi trong 24 giờ.')
    setForm({ name: '', email: '', phone: '', subject: 'Đặt phòng', message: '' })
    setLoading(false)
  }

  return (
    <div style={{ paddingTop: 64 }}>

      {/* HERO */}
      <section style={S.hero}>
        <div style={{ textAlign: 'center' }}>
          <p style={S.eyebrow}>LIÊN HỆ</p>
          <h1 style={S.heroTitle}>Chúng tôi luôn<br /><em style={{ color: 'var(--gold)' }}>sẵn sàng</em></h1>
          <div style={S.divider} />
          <p style={S.heroSub}>Hãy để chúng tôi giúp bạn có kỳ nghỉ hoàn hảo</p>
        </div>
      </section>

      {/* CONTACT INFO + FORM */}
      <section className="section">
        <div style={S.grid}>

          {/* Info */}
          <div>
            <p className="section-sub">THÔNG TIN LIÊN HỆ</p>
            <h2 className="section-title">Kết nối với chúng tôi</h2>
            <div className="gold-line" />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
              {[
                { icon: '📍', label: 'Địa chỉ',    val: '123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh' },
                { icon: '📞', label: 'Điện thoại', val: '+84 (28) 3823 4567' },
                { icon: '📱', label: 'Hotline',    val: '1800 1234 (Miễn phí)' },
                { icon: '📧', label: 'Email',      val: 'info@lumiere-hotel.com' },
                { icon: '🌐', label: 'Website',    val: 'www.lumiere-hotel.com' },
              ].map(item => (
                <div key={item.label} style={S.contactItem}>
                  <div style={S.contactIcon}>{item.icon}</div>
                  <div>
                    <div style={S.contactLabel}>{item.label}</div>
                    <div style={S.contactVal}>{item.val}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div style={S.hoursBox}>
              <div style={S.hoursTitle}>GIỜ LỄ TÂN</div>
              <div style={S.hoursItem}><span>Check-in</span><span style={{ color: 'var(--gold)' }}>14:00 — 24:00</span></div>
              <div style={S.hoursItem}><span>Check-out</span><span style={{ color: 'var(--gold)' }}>06:00 — 12:00</span></div>
              <div style={S.hoursItem}><span>Lễ tân 24/7</span><span style={{ color: 'var(--green)' }}>● Luôn có mặt</span></div>
            </div>
          </div>

          {/* Form */}
          <div>
            <p className="section-sub">GỬI TIN NHẮN</p>
            <h2 className="section-title">Liên hệ với chúng tôi</h2>
            <div className="gold-line" />

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Họ và tên *</label>
                <input className="form-input" value={form.name} onChange={set('name')} placeholder="Nguyễn Văn A" />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input className="form-input" type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Điện thoại</label>
                <input className="form-input" value={form.phone} onChange={set('phone')} placeholder="0901234567" />
              </div>
              <div className="form-group">
                <label className="form-label">Chủ đề</label>
                <select className="form-select" value={form.subject} onChange={set('subject')}>
                  {['Đặt phòng', 'Hỏi giá', 'Tổ chức sự kiện', 'Khiếu nại', 'Góp ý', 'Khác'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Tin nhắn *</label>
              <textarea className="form-textarea" style={{ minHeight: 140 }} value={form.message} onChange={set('message')} placeholder="Nhập nội dung tin nhắn của bạn..." />
            </div>
            <button className="btn btn-gold" style={{ width: '100%' }} onClick={submit} disabled={loading}>
              {loading ? 'Đang gửi...' : 'GỬI TIN NHẮN'}
            </button>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section style={{ background: 'var(--dark2)', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '5rem 2rem' }}>
          <p className="section-sub" style={{ textAlign: 'center' }}>VỊ TRÍ</p>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Tìm chúng tôi</h2>
          <div style={{ ...S.divider, margin: '1rem auto 2.5rem' }} />

          <div style={S.mapBox}>
            {/* Embedded Google Map placeholder — thay bằng iframe thật */}
            <div style={S.mapInner}>
              <div style={{ fontSize: 60, marginBottom: '1rem' }}>📍</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 22, color: 'var(--gold)', marginBottom: '0.5rem' }}>Lumière Hotel & Resort</div>
              <div style={{ color: 'var(--text2)', fontSize: 14 }}>123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</div>
              <a href="https://maps.google.com/?q=Nguyen+Hue+Ho+Chi+Minh" target="_blank" rel="noreferrer"
                className="btn btn-outline btn-sm" style={{ marginTop: '1.5rem' }}>
                Mở Google Maps
              </a>
            </div>
          </div>

          {/* How to get here */}
          <div style={S.transportGrid}>
            {[
              { icon: '✈️', title: 'Từ sân bay', desc: 'Sân bay Tân Sơn Nhất cách 8km, taxi ~25 phút. Chúng tôi có dịch vụ đưa đón riêng.' },
              { icon: '🚌', title: 'Xe buýt', desc: 'Tuyến 01, 03, 31 đều có điểm dừng trước khách sạn tại Nguyễn Huệ.' },
              { icon: '🏍️', title: 'Xe máy / Ô tô', desc: 'Bãi đậu xe 5 tầng ngay dưới khách sạn, giá ưu đãi cho khách lưu trú.' },
              { icon: '🚢', title: 'Bến Bạch Đằng', desc: 'Cách bến tàu du lịch chỉ 500m, đi bộ 7 phút dọc sông Sài Gòn.' },
            ].map(t => (
              <div key={t.title} style={S.transportCard}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{t.icon}</div>
                <div style={S.transportTitle}>{t.title}</div>
                <div style={S.transportDesc}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

const S = {
  hero:         { height: 400, background: 'linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.72)), url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80) center/cover', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
  eyebrow:      { fontSize: 11, letterSpacing: 5, color: 'var(--gold)', marginBottom: '1rem', textTransform: 'uppercase' },
  heroTitle:    { fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,6vw,64px)', fontWeight: 300, letterSpacing: 6, lineHeight: 1.2 },
  divider:      { width: 50, height: 1, background: 'var(--gold)', margin: '1.5rem auto' },
  heroSub:      { fontSize: 13, letterSpacing: 2, color: 'var(--text2)' },
  grid:         { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' },
  contactItem:  { display: 'flex', gap: '1rem', alignItems: 'flex-start' },
  contactIcon:  { fontSize: 20, width: 32, flexShrink: 0 },
  contactLabel: { fontSize: 10, letterSpacing: 2, color: 'var(--text3)', textTransform: 'uppercase', marginBottom: 4 },
  contactVal:   { fontSize: 14, color: 'var(--text)' },
  hoursBox:     { background: 'var(--dark2)', border: '1px solid rgba(201,169,110,0.15)', padding: '1.5rem' },
  hoursTitle:   { fontSize: 10, letterSpacing: 2, color: 'var(--gold)', marginBottom: '1rem', textTransform: 'uppercase' },
  hoursItem:    { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid rgba(201,169,110,0.08)', fontSize: 13, color: 'var(--text2)' },
  mapBox:       { background: 'var(--dark)', border: '1px solid rgba(201,169,110,0.15)', height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem' },
  mapInner:     { textAlign: 'center' },
  transportGrid:{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1rem' },
  transportCard:{ background: 'var(--dark)', border: '1px solid rgba(201,169,110,0.12)', padding: '1.5rem' },
  transportTitle:{ fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 300, marginBottom: 8 },
  transportDesc: { fontSize: 12, color: 'var(--text2)', lineHeight: 1.7 },
}
