import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'   // ← thêm dòng này
import { roomsAPI } from '../services/api.js'
import BookingModal from '../components/BookingModal.jsx'

const TESTIMONIALS = [
  { name:'Nguyễn Thanh Hà',  role:'Doanh nhân',     rating:5, text:'Dịch vụ tuyệt vời, phòng rộng rãi và sang trọng. Tôi đã ở nhiều khách sạn 5 sao nhưng Lumière thực sự vượt trội về sự chu đáo.', avatar:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80' },
  { name:'David Mitchell',    role:'Du khách Úc',    rating:5, text:'Absolutely stunning hotel! The infinity pool view at sunset is breathtaking. Staff were incredibly helpful and professional.', avatar:'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80' },
  { name:'Trần Minh Tuấn',   role:'Tuần trăng mật', rating:5, text:'Chúng tôi chọn Honeymoon Suite và không thể hài lòng hơn. Mọi chi tiết đều được chuẩn bị kỹ lưỡng, thực sự là kỳ nghỉ đáng nhớ nhất.', avatar:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80' },
  { name:'Lê Thu Trang',     role:'Travel Blogger',  rating:5, text:'Lumière xứng đáng 5 sao về mọi mặt. Đặc biệt ấn tượng với khu spa và nhà hàng La Maison. Nhất định sẽ quay lại.', avatar:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80' },
]

const ROOM_IMGS = {
  Standard:     'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80',
  Deluxe:       'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=600&q=80',
  Suite:        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&q=80',
  Presidential: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80',
}

function RoomCard({ room, onBook }) {
  const { user } = useAuth() // eslint-disable-line
  const img = ROOM_IMGS[room.type] || ROOM_IMGS.Standard
  const available = room.status === 'available'
  const amenities = Array.isArray(room.amenities) ? room.amenities : []
  const fmt = n => new Intl.NumberFormat('vi-VN').format(n) + 'đ'

  return (
    <div style={S.roomCard}>
      <div style={S.roomImgWrap}>
        <img src={img} alt={room.name} style={S.roomImg} />
        <span style={{ ...S.roomBadge, background: available ? 'rgba(39,174,96,0.85)' : 'rgba(192,57,43,0.85)' }}>
          {available ? 'Còn phòng' : 'Đã đặt'}
        </span>
      </div>
      <div style={S.roomBody}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:6 }}>
          <h3 style={S.roomName}>{room.name}</h3>
          <span style={{ fontSize:11, color:'var(--text3)' }}>P.{room.number}</span>
        </div>
        <div style={S.roomPrice}>{fmt(room.price)} <span style={{ fontSize:12, color:'var(--text2)', fontWeight:400 }}>/ đêm</span></div>
        <p style={S.roomDesc}>{room.description}</p>
        <div style={S.roomTags}>
          {amenities.slice(0,3).map(a => <span key={a} style={S.roomTag}>{a}</span>)}
          {amenities.length > 3 && <span style={S.roomTag}>+{amenities.length-3}</span>}
        </div>
        {available && <button className="btn btn-gold btn-sm" style={{ marginTop:12, width:'100%' }} onClick={() => onBook?.(room)}>Đặt phòng</button>}
      </div>
    </div>
  )
}

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
            <div style={S.sg}><label style={S.sl}>NHẬN PHÒNG</label><input type="date" style={S.si} value={checkin} min={today} onChange={e=>setCheckin(e.target.value)}/></div>
            <div style={S.sg}><label style={S.sl}>TRẢ PHÒNG</label><input type="date" style={S.si} value={checkout} min={checkin} onChange={e=>setCheckout(e.target.value)}/></div>
            <div style={{...S.sg,flex:'0 0 auto'}}><label style={S.sl}>&nbsp;</label><button className="btn btn-gold" onClick={()=>navigate(`/rooms?checkin=${checkin}&checkout=${checkout}`)}>TÌM PHÒNG</button></div>
          </div>
        </div>
      </section>

      {/* ROOMS */}
      <section className="section">
        <p className="section-sub">BỘ SƯU TẬP PHÒNG</p>
        <h2 className="section-title">Phòng & Suite</h2>
        <div className="gold-line"/>
        <div style={S.grid}>
          {rooms.map(r => <RoomCard key={r.id} room={r} onBook={setBookingRoom}/>)}
        </div>
        <div style={{textAlign:'center',marginTop:'3rem'}}>
          <Link to="/rooms" className="btn btn-outline">XEM TẤT CẢ PHÒNG</Link>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{background:'var(--dark2)',borderTop:'1px solid rgba(201,169,110,0.1)',padding:'5rem 2rem'}}>
        <div style={{maxWidth:1200,margin:'0 auto'}}>
          <p className="section-sub">TIỆN ÍCH</p>
          <h2 className="section-title">Dịch vụ đẳng cấp</h2>
          <div className="gold-line"/>
          <div style={S.servGrid}>
            {[
              { img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&q=80', title:'Spa & Wellness',   desc:'30+ liệu pháp thư giãn cao cấp' },
              { img:'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&q=80', title:'Hồ Bơi Vô Cực',   desc:'Tầm nhìn 360° từ tầng thượng' },
              { img:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=80', title:'Fine Dining',      desc:'3 nhà hàng & bar đẳng cấp' },
              { img:'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&q=80', title:'Fitness Center',   desc:'Thiết bị Technogym hiện đại' },
            ].map(s=>(
              <div key={s.title} style={S.servCard}>
                <img src={s.img} alt={s.title} style={S.servImg}/>
                <div style={S.servOverlay}>
                  <div style={S.servTitle}>{s.title}</div>
                  <div style={S.servDesc}>{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{textAlign:'center',marginTop:'2.5rem'}}>
            <Link to="/services" className="btn btn-outline">XEM TẤT CẢ DỊCH VỤ</Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section">
        <div style={S.aboutGrid}>
          <div>
            <p className="section-sub">VỀ CHÚNG TÔI</p>
            <h2 className="section-title">Trải nghiệm đẳng cấp 5 sao</h2>
            <div className="gold-line"/>
            <p style={S.aboutText}>Lumière Hotel & Resort tọa lạc tại vị trí đắc địa, mang đến cho quý khách trải nghiệm nghỉ dưỡng xa hoa với dịch vụ cá nhân hóa hoàn hảo. Với hơn 20 năm kinh nghiệm, chúng tôi tự hào là điểm đến lý tưởng.</p>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'1.5rem',marginTop:'2rem'}}>
              {[['200+','Phòng nghỉ'],['5★','Đánh giá'],['20+','Năm KN'],['50k+','Khách hàng']].map(([v,l])=>(
                <div key={l}><div style={{fontFamily:'var(--font-serif)',fontSize:34,color:'var(--gold)'}}>{v}</div><div style={{fontSize:11,color:'var(--text2)',letterSpacing:1}}>{l}</div></div>
              ))}
            </div>
            <div style={{marginTop:'2rem'}}><Link to="/about" className="btn btn-outline">TÌM HIỂU THÊM</Link></div>
          </div>
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80" alt="Hotel" style={S.aboutImg}/>
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
                <div style={{color:'var(--gold)',fontSize:14,letterSpacing:2,marginBottom:'1rem'}}>{'★'.repeat(t.rating)}</div>
                <p style={{color:'var(--text2)',fontSize:13,lineHeight:1.8,fontStyle:'italic',marginBottom:'1.5rem'}}>"{t.text}"</p>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <img src={t.avatar} alt={t.name} style={{width:44,height:44,borderRadius:'50%',objectFit:'cover',border:'1px solid rgba(201,169,110,0.3)'}}/>
                  <div>
                    <div style={{fontFamily:'var(--font-serif)',fontSize:15,fontWeight:300}}>{t.name}</div>
                    <div style={{fontSize:11,color:'var(--text3)',letterSpacing:1,marginTop:2}}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{padding:'5rem 2rem',textAlign:'center',background:`linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80) center/cover`}}>
        <p style={S.eyebrow}>SẴN SÀNG?</p>
        <h2 style={{fontFamily:'var(--font-serif)',fontSize:'clamp(28px,4vw,48px)',fontWeight:300,marginBottom:'1rem'}}>Đặt phòng ngay hôm nay</h2>
        <div style={{width:40,height:1,background:'var(--gold)',margin:'1rem auto 1.5rem'}}/>
        <p style={{color:'var(--text2)',fontSize:14,marginBottom:'2rem'}}>Nhận ưu đãi đặc biệt khi đặt phòng trực tuyến</p>
        <Link to="/rooms" className="btn btn-gold" style={{padding:'14px 40px',fontSize:13}}>ĐẶT PHÒNG NGAY</Link>
      </section>

      {/* FOOTER */}
      <footer style={{background:'var(--dark2)',borderTop:'1px solid rgba(201,169,110,0.12)',padding:'3rem 2rem',textAlign:'center'}}>
        <div style={{fontFamily:'var(--font-serif)',fontSize:22,letterSpacing:4,color:'var(--gold)',marginBottom:'1rem'}}>LUMIÈRE</div>
        <div style={{display:'flex',gap:'2rem',justifyContent:'center',marginBottom:'1rem',flexWrap:'wrap'}}>
          {[['/','/Trang chủ'],['/rooms','Phòng'],['/services','Dịch vụ'],['/about','Giới thiệu'],['/contact','Liên hệ']].map(([to,label])=>(
            <Link key={to} to={to} style={{fontSize:11,color:'var(--text3)',letterSpacing:1,textTransform:'uppercase'}}>{label}</Link>
          ))}
        </div>
        <p style={{color:'var(--text3)',fontSize:12}}>© 2024 Lumière Hotel & Resort. All rights reserved.</p>
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
  sg: { flex:1, minWidth:140 },
  sl: { display:'block', fontSize:10, letterSpacing:2, color:'var(--gold)', marginBottom:8, textTransform:'uppercase' },
  si: { width:'100%', background:'transparent', border:'none', borderBottom:'1px solid rgba(201,169,110,0.4)', color:'var(--text)', padding:'8px 0', fontFamily:'var(--font-sans)', fontSize:14, outline:'none' },
  grid:      { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))', gap:'1.5rem' },
  roomCard:  { background:'var(--dark2)', border:'1px solid rgba(201,169,110,0.15)', overflow:'hidden', transition:'transform .3s,border-color .3s' },
  roomImgWrap:{ position:'relative' },
  roomImg:   { width:'100%', height:220, objectFit:'cover', display:'block' },
  roomBadge: { position:'absolute', top:12, right:12, padding:'3px 10px', fontSize:10, letterSpacing:1, color:'#fff', textTransform:'uppercase' },
  roomBody:  { padding:'1.25rem' },
  roomName:  { fontFamily:'var(--font-serif)', fontSize:20, fontWeight:300 },
  roomPrice: { color:'var(--gold)', fontSize:18, fontWeight:500, margin:'4px 0 8px' },
  roomDesc:  { color:'var(--text2)', fontSize:12, lineHeight:1.65, marginBottom:10 },
  roomTags:  { display:'flex', gap:6, flexWrap:'wrap' },
  roomTag:   { padding:'2px 8px', border:'1px solid rgba(201,169,110,0.25)', fontSize:10, color:'var(--text2)', letterSpacing:1 },
  servGrid:  { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'1rem' },
  servCard:  { position:'relative', overflow:'hidden', height:280, cursor:'pointer' },
  servImg:   { width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform .4s' },
  servOverlay:{ position:'absolute', inset:0, background:'linear-gradient(transparent 40%,rgba(0,0,0,0.85))', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'1.25rem' },
  servTitle: { fontFamily:'var(--font-serif)', fontSize:20, fontWeight:300, marginBottom:4 },
  servDesc:  { fontSize:12, color:'var(--text2)' },
  aboutGrid: { display:'grid', gridTemplateColumns:'1fr 1fr', gap:'4rem', alignItems:'center' },
  aboutText: { color:'var(--text2)', lineHeight:1.8, fontSize:14 },
  aboutImg:  { width:'100%', height:400, objectFit:'cover', border:'1px solid rgba(201,169,110,0.15)' },
  testGrid:  { display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))', gap:'1.5rem' },
  testCard:  { background:'var(--dark)', border:'1px solid rgba(201,169,110,0.12)', padding:'2rem' },
}
