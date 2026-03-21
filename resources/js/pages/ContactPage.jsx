import React, { useState } from 'react'
import { showToast } from '../components/Toast.jsx'

export default function ContactPage() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', subject:'Đặt phòng', message:'' })
  const [loading, setLoading] = useState(false)
  const set = k => e => setForm(p=>({...p,[k]:e.target.value}))

  const submit = async () => {
    if (!form.name||!form.email||!form.message){showToast('Vui lòng điền đầy đủ','error');return}
    setLoading(true)
    await new Promise(r=>setTimeout(r,1200))
    showToast('Đã gửi tin nhắn! Chúng tôi sẽ phản hồi trong 24 giờ.')
    setForm({name:'',email:'',phone:'',subject:'Đặt phòng',message:''})
    setLoading(false)
  }

  return (
    <div style={{ paddingTop:64 }}>

      {/* HERO */}
      <section style={S.hero}>
        <div style={{ textAlign:'center', padding:'0 1rem' }}>
          <p style={S.eyebrow}>LIÊN HỆ</p>
          <h1 style={S.heroTitle}>Chúng tôi luôn<br/><em style={{color:'var(--gold)'}}>sẵn sàng</em></h1>
          <div style={S.divider}/>
          <p style={S.heroSub}>Hãy để chúng tôi giúp bạn có kỳ nghỉ hoàn hảo</p>
        </div>
      </section>

      {/* CONTACT GRID */}
      <section className="section">
        <div style={S.grid}>

          {/* LEFT — Info */}
          <div>
            <p className="section-sub">THÔNG TIN</p>
            <h2 className="section-title">Kết nối với chúng tôi</h2>
            <div className="gold-line"/>

            {/* Cover image */}
            <img src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=700&q=80" alt="Hotel front" style={S.infoImg}/>

            <div style={{ display:'flex', flexDirection:'column', gap:'1.25rem', margin:'1.75rem 0' }}>
              {[
                { label:'Địa chỉ',    val:'123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh', img:'https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=40&q=80' },
                { label:'Điện thoại', val:'+84 (28) 3823 4567' },
                { label:'Hotline',    val:'1800 1234 (Miễn phí 24/7)' },
                { label:'Email',      val:'info@lumiere-hotel.com' },
              ].map(item=>(
                <div key={item.label} style={S.contactItem}>
                  <div style={S.contactDot}/>
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
              {[['Check-in','14:00 — 24:00'],['Check-out','06:00 — 12:00'],['Lễ tân 24/7','Luôn có mặt']].map(([k,v])=>(
                <div key={k} style={S.hoursRow}>
                  <span style={{color:'var(--text2)'}}>{k}</span>
                  <span style={{color:'var(--gold)'}}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Form */}
          <div>
            <p className="section-sub">GỬI TIN NHẮN</p>
            <h2 className="section-title">Liên hệ ngay</h2>
            <div className="gold-line"/>

            <div className="form-row">
              <div className="form-group"><label className="form-label">Họ và tên *</label><input className="form-input" value={form.name} onChange={set('name')} placeholder="Nguyễn Văn A"/></div>
              <div className="form-group"><label className="form-label">Email *</label><input className="form-input" type="email" value={form.email} onChange={set('email')} placeholder="your@email.com"/></div>
            </div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Điện thoại</label><input className="form-input" value={form.phone} onChange={set('phone')} placeholder="0901234567"/></div>
              <div className="form-group"><label className="form-label">Chủ đề</label>
                <select className="form-select" value={form.subject} onChange={set('subject')}>
                  {['Đặt phòng','Hỏi giá','Tổ chức sự kiện','Khiếu nại','Góp ý','Khác'].map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group"><label className="form-label">Tin nhắn *</label><textarea className="form-textarea" style={{minHeight:140}} value={form.message} onChange={set('message')} placeholder="Nội dung tin nhắn..."/></div>
            <button className="btn btn-gold" style={{width:'100%'}} onClick={submit} disabled={loading}>
              {loading ? 'Đang gửi...' : 'GỬI TIN NHẮN'}
            </button>
          </div>
        </div>
      </section>

      {/* MAP */}
      <section style={{background:'var(--dark2)',borderTop:'1px solid rgba(201,169,110,0.1)'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'5rem 2rem'}}>
          <p className="section-sub" style={{textAlign:'center'}}>VỊ TRÍ</p>
          <h2 className="section-title" style={{textAlign:'center'}}>Tìm chúng tôi</h2>
          <div style={{width:40,height:1,background:'var(--gold)',margin:'1rem auto 2.5rem'}}/>

          {/* Map image */}
          <div style={S.mapBox}>
            <img src="https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1200&q=80" alt="Map" style={{width:'100%',height:'100%',objectFit:'cover',display:'block',filter:'brightness(0.6) saturate(0.3)'}}/>
            <div style={S.mapPin}>
              <div style={S.mapPinDot}/>
              <div style={S.mapPinLabel}>Lumière Hotel & Resort<br/><span style={{fontSize:11,color:'var(--text2)'}}>123 Nguyễn Huệ, Q.1, TP.HCM</span></div>
            </div>
            <a href="https://maps.google.com/?q=Nguyen+Hue+Ho+Chi+Minh" target="_blank" rel="noreferrer"
              className="btn btn-gold btn-sm" style={{position:'absolute',bottom:'1.5rem',right:'1.5rem'}}>
              Mở Google Maps
            </a>
          </div>

          {/* Transport */}
          <div style={S.transportGrid}>
            {[
              { img:'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&q=80', title:'Từ sân bay',       desc:'Sân bay Tân Sơn Nhất cách 8km, taxi ~25 phút. Có dịch vụ đưa đón riêng.' },
              { img:'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400&q=80', title:'Xe buýt',          desc:'Tuyến 01, 03, 31 có điểm dừng trước khách sạn tại Nguyễn Huệ.' },
              { img:'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=400&q=80', title:'Xe máy / Ô tô',    desc:'Bãi đậu xe 5 tầng ngay dưới khách sạn, giá ưu đãi cho khách lưu trú.' },
              { img:'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&q=80', title:'Bến Bạch Đằng',   desc:'Cách bến tàu du lịch chỉ 500m, đi bộ 7 phút dọc sông Sài Gòn.' },
            ].map(t=>(
              <div key={t.title} style={S.transportCard}>
                <img src={t.img} alt={t.title} style={S.transportImg}/>
                <div style={{padding:'1.25rem'}}>
                  <div style={S.transportTitle}>{t.title}</div>
                  <div style={S.transportDesc}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

const S = {
  hero:          { height:400, background:'linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.72)),url(https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=1600&q=80) center/cover', display:'flex', alignItems:'center', justifyContent:'center' },
  eyebrow:       { fontSize:11, letterSpacing:5, color:'var(--gold)', marginBottom:'1rem', textTransform:'uppercase' },
  heroTitle:     { fontFamily:'var(--font-serif)', fontSize:'clamp(36px,6vw,64px)', fontWeight:300, letterSpacing:6, lineHeight:1.2 },
  divider:       { width:50, height:1, background:'var(--gold)', margin:'1.5rem auto' },
  heroSub:       { fontSize:13, letterSpacing:2, color:'var(--text2)' },
  grid:          { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem' },
  infoImg:       { width:'100%', height:220, objectFit:'cover', display:'block', border:'1px solid rgba(201,169,110,0.15)' },
  contactItem:   { display:'flex', gap:'1rem', alignItems:'flex-start' },
  contactDot:    { width:8, height:8, borderRadius:'50%', background:'var(--gold)', marginTop:6, flexShrink:0 },
  contactLabel:  { fontSize:10, letterSpacing:2, color:'var(--text3)', textTransform:'uppercase', marginBottom:2 },
  contactVal:    { fontSize:14, color:'var(--text)' },
  hoursBox:      { background:'var(--dark2)', border:'1px solid rgba(201,169,110,0.15)', padding:'1.25rem' },
  hoursTitle:    { fontSize:10, letterSpacing:2, color:'var(--gold)', marginBottom:'0.75rem', textTransform:'uppercase' },
  hoursRow:      { display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid rgba(201,169,110,0.07)', fontSize:13 },
  mapBox:        { position:'relative', height:380, overflow:'hidden', border:'1px solid rgba(201,169,110,0.15)', marginBottom:'2rem' },
  mapPin:        { position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', textAlign:'center' },
  mapPinDot:     { width:16, height:16, borderRadius:'50%', background:'var(--gold)', margin:'0 auto 8px', boxShadow:'0 0 0 6px rgba(201,169,110,0.25)' },
  mapPinLabel:   { background:'rgba(13,13,13,0.9)', border:'1px solid rgba(201,169,110,0.3)', padding:'8px 14px', fontSize:13, whiteSpace:'nowrap' },
  transportGrid: { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))', gap:'1rem' },
  transportCard: { background:'var(--dark)', border:'1px solid rgba(201,169,110,0.12)', overflow:'hidden' },
  transportImg:  { width:'100%', height:140, objectFit:'cover', display:'block', filter:'brightness(0.7)' },
  transportTitle:{ fontFamily:'var(--font-serif)', fontSize:16, fontWeight:300, marginBottom:6 },
  transportDesc: { fontSize:12, color:'var(--text2)', lineHeight:1.7 },
}
