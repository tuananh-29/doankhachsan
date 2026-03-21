import React from 'react'

const team = [
  { name:'Nguyễn Minh Khoa', role:'Tổng Giám Đốc',      img:'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80' },
  { name:'Trần Thị Lan Anh',  role:'Giám Đốc Dịch Vụ',  img:'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&q=80' },
  { name:'Lê Hoàng Nam',      role:'Bếp Trưởng',         img:'https://images.unsplash.com/photo-1583394293214-0b3b4d10d1ae?w=300&q=80' },
  { name:'Phạm Thu Hương',    role:'Quản Lý Spa',        img:'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80' },
]

const milestones = [
  { year:'2004', title:'Thành lập',   desc:'Lumière Hotel khai trương với 50 phòng đầu tiên tại trung tâm thành phố.' },
  { year:'2010', title:'Mở rộng',     desc:'Nâng cấp lên 200 phòng, khai trương khu spa và nhà hàng fine dining.' },
  { year:'2016', title:'Giải thưởng', desc:'Đạt chứng nhận 5 sao quốc tế và giải thưởng "Best Luxury Hotel" khu vực.' },
  { year:'2024', title:'Tái định vị', desc:'Ra mắt bộ nhận diện mới, nâng cấp toàn diện trải nghiệm khách hàng.' },
]

const awards = [
  { img:'https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?w=400&q=80', title:'Best Luxury Hotel 2023',  org:'Vietnam Tourism Awards' },
  { img:'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&q=80',    title:'Five Star Certificate',    org:'International Hotel Standards' },
  { img:'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&q=80', title:'Green Hotel Certified',    org:'ASEAN Green Hotel Award' },
  { img:'https://images.unsplash.com/photo-1444201983204-c43cbd584d93?w=400&q=80', title:'Excellence in Service',    org:'TripAdvisor Travelers Choice' },
]

export default function AboutPage() {
  return (
    <div style={{ paddingTop:64 }}>

      {/* HERO */}
      <section style={S.hero}>
        <div style={S.heroOverlay}>
          <p style={S.eyebrow}>VỀ CHÚNG TÔI</p>
          <h1 style={S.heroTitle}>Câu chuyện của<br/><em style={{color:'var(--gold)'}}>Lumière</em></h1>
          <div style={S.divider}/>
          <p style={S.heroSub}>Hai mươi năm kiến tạo những kỷ niệm không thể quên</p>
        </div>
      </section>

      {/* STORY */}
      <section className="section">
        <div style={S.storyGrid}>
          <div>
            <p className="section-sub">CÂU CHUYỆN</p>
            <h2 className="section-title">Hành trình 20 năm</h2>
            <div className="gold-line"/>
            <p style={S.body}>Lumière Hotel & Resort được thành lập năm 2004 với một tầm nhìn đơn giản: tạo ra không gian nơi mỗi vị khách cảm nhận được sự chào đón chân thành nhất, được phục vụ chu đáo nhất.</p>
            <p style={{...S.body, marginTop:'1rem'}}>Từ một khách sạn nhỏ 50 phòng, chúng tôi đã phát triển thành resort 5 sao với đầy đủ tiện nghi cao cấp, nhưng điều chúng tôi tự hào nhất vẫn là tinh thần phục vụ tận tâm.</p>
            <p style={{...S.body, marginTop:'1rem'}}>Tên "Lumière" trong tiếng Pháp có nghĩa là "ánh sáng" — cam kết mang ánh sáng và sự ấm áp đến mỗi người khách.</p>
          </div>
          <img src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=700&q=80" alt="Hotel story" style={S.storyImg}/>
        </div>
      </section>

      {/* STATS */}
      <section style={{background:'var(--dark2)',borderTop:'1px solid rgba(201,169,110,0.1)',borderBottom:'1px solid rgba(201,169,110,0.1)'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'4rem 2rem'}}>
          <div style={S.statsGrid}>
            {[
              { val:'200+', label:'Phòng nghỉ',           img:'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&q=80' },
              { val:'5★',   label:'Xếp hạng quốc tế',    img:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&q=80' },
              { val:'20+',  label:'Năm kinh nghiệm',      img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&q=80' },
              { val:'50k+', label:'Khách hàng hài lòng',  img:'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=300&q=80' },
              { val:'3',    label:'Nhà hàng & Bar',        img:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&q=80' },
              { val:'1',    label:'Khu Spa & Wellness',    img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=300&q=80' },
            ].map(s=>(
              <div key={s.label} style={S.statCard}>
                <img src={s.img} alt={s.label} style={S.statImg}/>
                <div style={S.statOverlay}>
                  <div style={S.statVal}>{s.val}</div>
                  <div style={S.statLabel}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MILESTONES */}
      <section className="section">
        <p className="section-sub">HÀNH TRÌNH</p>
        <h2 className="section-title">Các mốc nổi bật</h2>
        <div className="gold-line"/>
        <div style={S.timeline}>
          {milestones.map(m=>(
            <div key={m.year} style={S.tlItem}>
              <div style={S.tlYear}>{m.year}</div>
              <div style={S.tlDot}/>
              <div style={S.tlLine}/>
              <div style={S.tlContent}>
                <h3 style={S.tlTitle}>{m.title}</h3>
                <p style={S.body}>{m.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section style={{background:'var(--dark2)',borderTop:'1px solid rgba(201,169,110,0.1)',padding:'5rem 2rem'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <p className="section-sub">ĐỘI NGŨ</p>
          <h2 className="section-title">Ban lãnh đạo</h2>
          <div className="gold-line"/>
          <div style={S.teamGrid}>
            {team.map(t=>(
              <div key={t.name} style={S.teamCard}>
                <img src={t.img} alt={t.name} style={S.teamImg}/>
                <div style={S.teamInfo}>
                  <div style={S.teamName}>{t.name}</div>
                  <div style={S.teamRole}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AWARDS */}
      <section className="section">
        <p className="section-sub">THÀNH TỰU</p>
        <h2 className="section-title">Giải thưởng & Chứng nhận</h2>
        <div className="gold-line"/>
        <div style={S.awardsGrid}>
          {awards.map(a=>(
            <div key={a.title} style={S.awardCard}>
              <img src={a.img} alt={a.title} style={S.awardImg}/>
              <div style={S.awardOverlay}>
                <div style={S.awardTitle}>{a.title}</div>
                <div style={S.awardOrg}>{a.org}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}

const S = {
  hero:       { height:480, background:'linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.75)),url(https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600&q=80) center/cover', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center' },
  heroOverlay:{ padding:'0 1rem' },
  eyebrow:    { fontSize:11, letterSpacing:5, color:'var(--gold)', marginBottom:'1rem', textTransform:'uppercase' },
  heroTitle:  { fontFamily:'var(--font-serif)', fontSize:'clamp(36px,6vw,64px)', fontWeight:300, letterSpacing:6, lineHeight:1.2 },
  divider:    { width:50, height:1, background:'var(--gold)', margin:'1.5rem auto' },
  heroSub:    { fontSize:13, letterSpacing:2, color:'var(--text2)' },
  storyGrid:  { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' },
  body:       { color:'var(--text2)', lineHeight:1.85, fontSize:14 },
  storyImg:   { width:'100%', height:400, objectFit:'cover', border:'1px solid rgba(201,169,110,0.15)' },
  statsGrid:  { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))', gap:'1rem' },
  statCard:   { position:'relative', height:200, overflow:'hidden' },
  statImg:    { width:'100%', height:'100%', objectFit:'cover', display:'block', filter:'brightness(0.4)' },
  statOverlay:{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center' },
  statVal:    { fontFamily:'var(--font-serif)', fontSize:42, color:'var(--gold)', fontWeight:300 },
  statLabel:  { fontSize:11, color:'var(--text2)', letterSpacing:1, marginTop:4, textAlign:'center' },
  timeline:   { paddingLeft:'1rem' },
  tlItem:     { display:'flex', gap:'2rem', marginBottom:'2.5rem', alignItems:'flex-start', position:'relative' },
  tlYear:     { fontFamily:'var(--font-serif)', fontSize:28, color:'var(--gold)', fontWeight:300, minWidth:70, flexShrink:0 },
  tlDot:      { width:12, height:12, borderRadius:'50%', background:'var(--gold)', marginTop:8, flexShrink:0 },
  tlLine:     {},
  tlContent:  { flex:1 },
  tlTitle:    { fontFamily:'var(--font-serif)', fontSize:18, fontWeight:300, marginBottom:6 },
  teamGrid:   { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'1.5rem' },
  teamCard:   { background:'var(--dark)', border:'1px solid rgba(201,169,110,0.12)', overflow:'hidden' },
  teamImg:    { width:'100%', height:280, objectFit:'cover', objectPosition:'top', display:'block' },
  teamInfo:   { padding:'1.25rem' },
  teamName:   { fontFamily:'var(--font-serif)', fontSize:18, fontWeight:300, marginBottom:4 },
  teamRole:   { fontSize:11, color:'var(--gold)', letterSpacing:2, textTransform:'uppercase' },
  awardsGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'1rem' },
  awardCard:  { position:'relative', height:200, overflow:'hidden' },
  awardImg:   { width:'100%', height:'100%', objectFit:'cover', display:'block', filter:'brightness(0.35)' },
  awardOverlay:{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'1rem', textAlign:'center' },
  awardTitle: { fontFamily:'var(--font-serif)', fontSize:18, fontWeight:300, marginBottom:6, color:'var(--gold)' },
  awardOrg:   { fontSize:11, color:'var(--text2)', letterSpacing:1 },
}
