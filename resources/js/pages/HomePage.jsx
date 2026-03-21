import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { roomsAPI } from '../services/api.js'
import RoomCard     from '../components/RoomCard.jsx'
import BookingModal from '../components/BookingModal.jsx'

const TESTIMONIALS = [
  { name:'Nguyễn Thanh Hà',  role:'Doanh nhân',          rating:5, text:'Dịch vụ tuyệt vời, phòng rộng rãi và sang trọng. Tôi đã ở nhiều khách sạn 5 sao nhưng Lumière thực sự vượt trội về sự chu đáo.', avatar:'👩‍💼' },
  { name:'David Mitchell',    role:'Du khách Úc',          rating:5, text:'Absolutely stunning hotel! The infinity pool view at sunset is breathtaking. Staff were incredibly helpful and professional.', avatar:'👨‍🦱' },
  { name:'Trần Minh Tuấn',   role:'Tuần trăng mật',       rating:5, text:'Chúng tôi chọn Honeymoon Suite và không thể hài lòng hơn. Mọi chi tiết đều được chuẩn bị kỹ lưỡng, thực sự là kỳ nghỉ đáng nhớ.', avatar:'💑' },
  { name:'Lê Thu Trang',     role:'Travel Blogger',        rating:5, text:'Lumière xứng đáng 5 sao về mọi mặt. Đặc biệt ấn tượng với khu spa và nhà hàng La Maison. Nhất định sẽ quay lại.', avatar:'✍️' },
]

export default function HomePage() {
  const [rooms,       setRooms]       = useState([])
  const [bookingRoom, setBookingRoom] = useState(null)
  const today    = new Date().toISOString().split('T')[0]
  const tomorrow = new Date(Date.now()+86400000).toISOString().split('T')[0]
  const [checkin,  setCheckin]  = useState(today)
  const [checkout, setCheckout] = useState(tomorrow)
  const navigate = useNavigate()

  const load = () => roomsAPI.getAll().then(r => setRooms(r.data.slice(0,3))).catch(()=>{})
  useEffect(()=>{ load() },[])

  return (
    <div>
      {/* HERO */}
      <section style={S.hero}>
        <div style={S.heroInner}>
          <p style={S.eyebrow}>CHÀO MỪNG ĐẾN VỚI</p>
          <h1 style={S.h1}>LUMIÈRE<br/><em style={{color:'var(--gold)'}}>Hotel & Resort</em></h1>
          <div style={S.divider}/>
          <p style={S.tagline}>SANG TRỌNG · TINH TẾ · ĐẲNG CẤP</p>
          <div style={S.searchBar}>
            <div style={S.sg}><label style={S.sl}>NHẬN PHÒNG</label><input type="date" style={S.si} value={checkin}  min={today}   onChange={e=>setCheckin(e.target.value)}/></div>
            <div style={S.sg}><label style={S.sl}>TRẢ PHÒNG</label><input type="date" style={S.si} value={checkout} min={checkin} onChange={e=>setCheckout(e.target.value)}/></div>
            <div style={{...S.sg,flex:'0 0 auto'}}><label style={S.sl}>&nbsp;</label><button className="btn btn-gold" onClick={()=>navigate(`/rooms?checkin=${checkin}&checkout=${checkout}`)}>TÌM PHÒNG</button></div>
          </div>
        </div>
      </section>

      {/* FEATURED ROOMS */}
      <section className="section">
        <p className="section-sub">BỘ SƯU TẬP PHÒNG</p>
        <h2 className="section-title">Phòng & Suite</h2>
        <div className="gold-line"/>
        <div style={S.grid}>
          {rooms.map(r=><RoomCard key={r.id} room={r} onBook={setBookingRoom}/>)}
        </div>
        <div style={{textAlign:'center',marginTop:'3rem'}}>
          <Link to="/rooms" className="btn btn-outline">XEM TẤT CẢ PHÒNG</Link>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section style={{background:'var(--dark2)',borderTop:'1px solid rgba(201,169,110,0.1)',padding:'5rem 2rem'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <p className="section-sub">TIỆN ÍCH</p>
          <h2 className="section-title">Dịch vụ đẳng cấp</h2>
          <div className="gold-line"/>
          <div style={S.servGrid}>
            {[
              {icon:'💆',title:'Spa & Wellness',desc:'30+ liệu pháp thư giãn cao cấp'},
              {icon:'🏊',title:'Hồ Bơi Vô Cực',desc:'Tầm nhìn 360° từ tầng thượng'},
              {icon:'🍽️',title:'Fine Dining',  desc:'3 nhà hàng & bar đẳng cấp'},
              {icon:'🏋️',title:'Fitness Center',desc:'Thiết bị Technogym hiện đại'},
            ].map(s=>(
              <div key={s.title} style={S.servCard}>
                <div style={{fontSize:36,marginBottom:12}}>{s.icon}</div>
                <div style={S.servTitle}>{s.title}</div>
                <div style={S.servDesc}>{s.desc}</div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'2.5rem'}}>
            <Link to="/services" className="btn btn-outline">XEM TẤT CẢ DỊCH VỤ</Link>
          </div>
        </div>
      </section>

      {/* ABOUT SNIPPET */}
      <section className="section">
        <div style={S.aboutGrid}>
          <div>
            <p className="section-sub">VỀ CHÚNG TÔI</p>
            <h2 className="section-title">Trải nghiệm đẳng cấp 5 sao</h2>
            <div className="gold-line"/>
            <p style={S.aboutText}>Lumière Hotel & Resort tọa lạc tại vị trí đắc địa, mang đến cho quý khách trải nghiệm nghỉ dưỡng xa hoa với dịch vụ cá nhân hóa hoàn hảo. Với hơn 20 năm kinh nghiệm, chúng tôi tự hào là điểm đến lý tưởng cho cả du khách và doanh nhân.</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem',marginTop:'2rem'}}>
              {[['200+','Phòng nghỉ'],['5★','Đánh giá'],['20+','Năm kinh nghiệm'],['50k+','Khách hàng']].map(([v,l])=>(
                <div key={l}>
                  <div style={{fontFamily:'var(--font-serif)',fontSize:34,color:'var(--gold)'}}>{v}</div>
                  <div style={{fontSize:11,color:'var(--text2)',letterSpacing:1}}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:'2rem'}}>
              <Link to="/about" className="btn btn-outline">TÌM HIỂU THÊM</Link>
            </div>
          </div>
          <div style={S.aboutImg}>🏨</div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{background:'var(--dark2)',borderTop:'1px solid rgba(201,169,110,0.1)',padding:'5rem 2rem'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <p className="section-sub" style={{textAlign:'center'}}>ĐÁNH GIÁ</p>
          <h2 className="section-title" style={{textAlign:'center'}}>Khách hàng nói gì</h2>
          <div style={{width:40,height:1,background:'var(--gold)',margin:'1rem auto 3rem'}}/>
          <div style={S.testGrid}>
            {TESTIMONIALS.map(t=>(
              <div key={t.name} style={S.testCard}>
                <div style={S.testStars}>{'★'.repeat(t.rating)}</div>
                <p style={S.testText}>"{t.text}"</p>
                <div style={S.testAuthor}>
                  <div style={S.testAvatar}>{t.avatar}</div>
                  <div>
                    <div style={S.testName}>{t.name}</div>
                    <div style={S.testRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'5rem 2rem',textAlign:'center'}}>
        <p style={S.eyebrow}>SẴN SÀNG?</p>
        <h2 style={{fontFamily:'var(--font-serif)',fontSize:'clamp(28px,4vw,48px)',fontWeight:300,marginBottom:'1rem'}}>Đặt phòng ngay hôm nay</h2>
        <div style={{width:40,height:1,background:'var(--gold)',margin:'1rem auto 1.5rem'}}/>
        <p style={{color:'var(--text2)',fontSize:14,marginBottom:'2rem'}}>Nhận ưu đãi đặc biệt khi đặt phòng trực tuyến</p>
        <Link to="/rooms" className="btn btn-gold" style={{padding:'14px 40px',fontSize:13}}>ĐẶT PHÒNG NGAY</Link>
      </section>

      {/* FOOTER */}
      <footer style={S.footer}>
        <div style={{fontFamily:'var(--font-serif)',fontSize:22,letterSpacing:4,color:'var(--gold)',marginBottom:'1rem'}}>LUMIÈRE</div>
        <div style={{display:'flex',gap:'2rem',justifyContent:'center',marginBottom:'1rem',flexWrap:'wrap'}}>
          {[['/',          'Trang chủ'],
            ['/rooms',     'Phòng'],
            ['/services',  'Dịch vụ'],
            ['/gallery',   'Gallery'],
            ['/about',     'Giới thiệu'],
            ['/contact',   'Liên hệ'],
          ].map(([to,label])=>(
            <Link key={to} to={to} style={{fontSize:11,color:'var(--text3)',letterSpacing:1,textTransform:'uppercase'}}>{label}</Link>
          ))}
        </div>
        <p style={{color:'var(--text3)',fontSize:12,letterSpacing:1}}>© 2024 Lumière Hotel & Resort. All rights reserved.</p>
      </footer>

      {bookingRoom && <BookingModal room={bookingRoom} onClose={()=>setBookingRoom(null)} onSuccess={load}/>}
    </div>
  )
}

const S = {
  hero:      { height:'100vh', minHeight:700, background:'linear-gradient(rgba(0,0,0,0.45),rgba(0,0,0,0.72)),url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80) center/cover', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center' },
  heroInner: { padding:'0 1rem', maxWidth:900, width:'100%' },
  eyebrow:   { fontSize:11, letterSpacing:5, color:'var(--gold)', marginBottom:'1rem', textTransform:'uppercase' },
  h1:        { fontFamily:'var(--font-serif)', fontSize:'clamp(42px,8vw,80px)', fontWeight:300, letterSpacing:8, lineHeight:1.1, marginBottom:'1rem' },
  divider:   { width:60, height:1, background:'var(--gold)', margin:'1.5rem auto' },
  tagline:   { fontSize:11, letterSpacing:4, color:'var(--text2)', marginBottom:'3rem', textTransform:'uppercase' },
  searchBar: { background:'rgba(255,255,255,0.06)', backdropFilter:'blur(10px)', border:'1px solid rgba(201,169,110,0.3)', padding:'1.75rem 2rem', display:'flex', gap:'1.5rem', flexWrap:'wrap', alignItems:'flex-end', maxWidth:800, margin:'0 auto' },
  sg:        { flex:1, minWidth:140 },
  sl:        { display:'block', fontSize:10, letterSpacing:2, color:'var(--gold)', marginBottom:8, textTransform:'uppercase' },
  si:        { width:'100%', background:'transparent', border:'none', borderBottom:'1px solid rgba(201,169,110,0.4)', color:'var(--text)', padding:'8px 0', fontFamily:'var(--font-sans)', fontSize:14, outline:'none' },
  grid:      { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))', gap:'1.5rem' },
  servGrid:  { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(220px,1fr))', gap:'1.5rem' },
  servCard:  { background:'var(--dark)', border:'1px solid rgba(201,169,110,0.12)', padding:'2rem', textAlign:'center', transition:'border-color .3s' },
  servTitle: { fontFamily:'var(--font-serif)', fontSize:18, fontWeight:300, marginBottom:6 },
  servDesc:  { fontSize:12, color:'var(--text3)', letterSpacing:0.5 },
  aboutGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' },
  aboutText: { color:'var(--text2)', lineHeight:1.8, fontSize:14 },
  aboutImg:  { background:'var(--dark3)', height:380, display:'flex', alignItems:'center', justifyContent:'center', fontSize:80, border:'1px solid rgba(201,169,110,0.1)' },
  testGrid:  { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'1.5rem' },
  testCard:  { background:'var(--dark)', border:'1px solid rgba(201,169,110,0.12)', padding:'2rem' },
  testStars: { color:'var(--gold)', fontSize:14, letterSpacing:2, marginBottom:'1rem' },
  testText:  { color:'var(--text2)', fontSize:13, lineHeight:1.8, fontStyle:'italic', marginBottom:'1.5rem' },
  testAuthor:{ display:'flex', alignItems:'center', gap:12 },
  testAvatar:{ fontSize:28, width:44, height:44, background:'var(--dark2)', display:'flex', alignItems:'center', justifyContent:'center', border:'1px solid rgba(201,169,110,0.15)', flexShrink:0 },
  testName:  { fontFamily:'var(--font-serif)', fontSize:15, fontWeight:300 },
  testRole:  { fontSize:11, color:'var(--text3)', letterSpacing:1, marginTop:2 },
  footer:    { background:'var(--dark2)', borderTop:'1px solid rgba(201,169,110,0.12)', padding:'3rem 2rem', textAlign:'center' },
}
