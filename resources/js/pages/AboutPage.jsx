import React from 'react'

const team = [
  { name: 'Nguyễn Minh Khoa', role: 'Tổng Giám Đốc', emoji: '👨‍💼' },
  { name: 'Trần Thị Lan Anh',  role: 'Giám Đốc Dịch Vụ', emoji: '👩‍💼' },
  { name: 'Lê Hoàng Nam',      role: 'Bếp Trưởng', emoji: '👨‍🍳' },
  { name: 'Phạm Thu Hương',    role: 'Quản Lý Spa', emoji: '👩‍⚕️' },
]

const milestones = [
  { year: '2004', title: 'Thành lập', desc: 'Lumière Hotel khai trương với 50 phòng đầu tiên tại trung tâm thành phố.' },
  { year: '2010', title: 'Mở rộng', desc: 'Nâng cấp lên 200 phòng, khai trương khu spa và nhà hàng fine dining.' },
  { year: '2016', title: 'Giải thưởng', desc: 'Đạt chứng nhận 5 sao quốc tế và giải thưởng "Best Luxury Hotel" khu vực.' },
  { year: '2024', title: 'Tái định vị', desc: 'Ra mắt bộ nhận diện mới, nâng cấp toàn diện trải nghiệm khách hàng.' },
]

export default function AboutPage() {
  return (
    <div style={{ paddingTop: 64 }}>

      {/* HERO */}
      <section style={S.hero}>
        <div style={S.heroOverlay}>
          <p style={S.eyebrow}>VỀ CHÚNG TÔI</p>
          <h1 style={S.heroTitle}>Câu chuyện của<br /><em style={{ color: 'var(--gold)' }}>Lumière</em></h1>
          <div style={S.divider} />
          <p style={S.heroSub}>Hai mươi năm kiến tạo những kỷ niệm không thể quên</p>
        </div>
      </section>

      {/* STORY */}
      <section className="section">
        <div style={S.storyGrid}>
          <div>
            <p className="section-sub">CÂU CHUYỆN</p>
            <h2 className="section-title">Hành trình 20 năm</h2>
            <div className="gold-line" />
            <p style={S.bodyText}>
              Lumière Hotel & Resort được thành lập năm 2004 với một tầm nhìn đơn giản: tạo ra không gian nơi mỗi vị khách cảm nhận được sự chào đón chân thành nhất, được phục vụ chu đáo nhất và được sống trong không gian đẹp nhất.
            </p>
            <p style={{ ...S.bodyText, marginTop: '1rem' }}>
              Từ một khách sạn nhỏ 50 phòng, chúng tôi đã phát triển thành resort 5 sao với đầy đủ tiện nghi cao cấp, nhưng điều chúng tôi tự hào nhất vẫn là tinh thần phục vụ tận tâm — thứ không bao giờ thay đổi.
            </p>
            <p style={{ ...S.bodyText, marginTop: '1rem' }}>
              Tên "Lumière" trong tiếng Pháp có nghĩa là "ánh sáng" — đó là cam kết của chúng tôi: mang ánh sáng, sự ấm áp và niềm vui đến mỗi người khách đặt chân vào đây.
            </p>
          </div>
          <div style={S.storyImg}>
            <div style={{ fontSize: 80 }}>🏨</div>
            <div style={S.storyCaption}>Lumière Hotel — Kể từ năm 2004</div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={S.statsBg}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '4rem 2rem' }}>
          <div style={S.statsGrid}>
            {[
              { val: '200+', label: 'Phòng nghỉ', icon: '🛏️' },
              { val: '5★',   label: 'Xếp hạng quốc tế', icon: '⭐' },
              { val: '20+',  label: 'Năm kinh nghiệm', icon: '📅' },
              { val: '50k+', label: 'Khách hàng hài lòng', icon: '🤝' },
              { val: '3',    label: 'Nhà hàng & Bar', icon: '🍽️' },
              { val: '1',    label: 'Khu Spa & Wellness', icon: '💆' },
            ].map(s => (
              <div key={s.label} style={S.statCard}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
                <div style={S.statVal}>{s.val}</div>
                <div style={S.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="section">
        <p className="section-sub">HÀNH TRÌNH</p>
        <h2 className="section-title">Các mốc nổi bật</h2>
        <div className="gold-line" />
        <div style={S.timeline}>
          {milestones.map((m, i) => (
            <div key={m.year} style={S.timelineItem}>
              <div style={S.timelineYear}>{m.year}</div>
              <div style={S.timelineDot} />
              <div style={S.timelineContent}>
                <h3 style={S.timelineTitle}>{m.title}</h3>
                <p style={S.bodyText}>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section style={{ background: 'var(--dark2)', padding: '5rem 2rem', borderTop: '1px solid rgba(201,169,110,0.1)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p className="section-sub">ĐỘI NGŨ</p>
          <h2 className="section-title">Ban lãnh đạo</h2>
          <div className="gold-line" />
          <div style={S.teamGrid}>
            {team.map(t => (
              <div key={t.name} style={S.teamCard}>
                <div style={S.teamAvatar}>{t.emoji}</div>
                <div style={S.teamName}>{t.name}</div>
                <div style={S.teamRole}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section className="section">
        <p className="section-sub">THÀNH TỰU</p>
        <h2 className="section-title">Giải thưởng & Chứng nhận</h2>
        <div className="gold-line" />
        <div style={S.awardsGrid}>
          {[
            { icon: '🏆', title: 'Best Luxury Hotel 2023', org: 'Vietnam Tourism Awards' },
            { icon: '⭐', title: 'Five Star Certificate', org: 'International Hotel Standards' },
            { icon: '🌿', title: 'Green Hotel Certified', org: 'ASEAN Green Hotel Award' },
            { icon: '💎', title: 'Excellence in Service', org: 'TripAdvisor Travelers Choice' },
          ].map(a => (
            <div key={a.title} style={S.awardCard}>
              <div style={{ fontSize: 36, marginBottom: 12 }}>{a.icon}</div>
              <div style={S.awardTitle}>{a.title}</div>
              <div style={S.awardOrg}>{a.org}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

const S = {
  hero:        { height: 480, background: 'linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.75)), url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80) center/cover', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' },
  heroOverlay: { padding: '0 1rem' },
  eyebrow:     { fontSize: 11, letterSpacing: 5, color: 'var(--gold)', marginBottom: '1rem', textTransform: 'uppercase' },
  heroTitle:   { fontFamily: 'var(--font-serif)', fontSize: 'clamp(36px,6vw,64px)', fontWeight: 300, letterSpacing: 6, lineHeight: 1.2 },
  divider:     { width: 50, height: 1, background: 'var(--gold)', margin: '1.5rem auto' },
  heroSub:     { fontSize: 13, letterSpacing: 2, color: 'var(--text2)' },
  storyGrid:   { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' },
  bodyText:    { color: 'var(--text2)', lineHeight: 1.85, fontSize: 14 },
  storyImg:    { background: 'var(--dark2)', border: '1px solid rgba(201,169,110,0.15)', height: 360, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' },
  storyCaption:{ fontSize: 12, color: 'var(--text3)', letterSpacing: 2 },
  statsBg:     { background: 'var(--dark2)', borderTop: '1px solid rgba(201,169,110,0.1)', borderBottom: '1px solid rgba(201,169,110,0.1)' },
  statsGrid:   { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: '1.5rem' },
  statCard:    { textAlign: 'center', padding: '1.5rem', border: '1px solid rgba(201,169,110,0.12)', background: 'var(--dark)' },
  statVal:     { fontFamily: 'var(--font-serif)', fontSize: 36, color: 'var(--gold)', fontWeight: 300 },
  statLabel:   { fontSize: 11, color: 'var(--text3)', letterSpacing: 1, marginTop: 4 },
  timeline:    { position: 'relative', paddingLeft: '2rem' },
  timelineItem:{ display: 'flex', gap: '2rem', marginBottom: '2.5rem', alignItems: 'flex-start', position: 'relative' },
  timelineYear:{ fontFamily: 'var(--font-serif)', fontSize: 28, color: 'var(--gold)', fontWeight: 300, minWidth: 70, flexShrink: 0 },
  timelineDot: { width: 10, height: 10, borderRadius: '50%', background: 'var(--gold)', marginTop: 8, flexShrink: 0 },
  timelineContent: { flex: 1 },
  timelineTitle:   { fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 300, marginBottom: 6 },
  teamGrid:    { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1.5rem' },
  teamCard:    { background: 'var(--dark)', border: '1px solid rgba(201,169,110,0.12)', padding: '2rem', textAlign: 'center', transition: 'border-color .3s' },
  teamAvatar:  { fontSize: 48, marginBottom: 12 },
  teamName:    { fontFamily: 'var(--font-serif)', fontSize: 18, fontWeight: 300, marginBottom: 4 },
  teamRole:    { fontSize: 11, color: 'var(--gold)', letterSpacing: 2, textTransform: 'uppercase' },
  awardsGrid:  { display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(220px,1fr))', gap: '1.5rem' },
  awardCard:   { background: 'var(--dark2)', border: '1px solid rgba(201,169,110,0.15)', padding: '2rem', textAlign: 'center' },
  awardTitle:  { fontFamily: 'var(--font-serif)', fontSize: 16, fontWeight: 300, marginBottom: 6 },
  awardOrg:    { fontSize: 11, color: 'var(--text3)', letterSpacing: 1 },
}
