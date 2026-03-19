import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { showToast } from '../components/Toast.jsx'

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form,    setForm]    = useState({ name:'', email:'', password:'', phone:'' })
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const set = k => e => setForm(p => ({ ...p, [k]: e.target.value }))

  const submit = async () => {
    if (!form.name || !form.email || !form.password) { setError('Vui lòng điền đầy đủ thông tin'); return }
    if (form.password.length < 6) { setError('Mật khẩu ít nhất 6 ký tự'); return }
    setLoading(true); setError('')
    try {
      const user = await register(form)
      showToast('Đăng ký thành công! Chào mừng ' + user.name)
      navigate('/')
    } catch (e) {
      setError(e.response?.data?.message || Object.values(e.response?.data?.errors || {})[0]?.[0] || 'Đăng ký thất bại')
    } finally { setLoading(false) }
  }

  return (
    <div style={S.page}>
      <div style={S.box}>
        <div style={S.logo}>LUMIÈRE</div>
        <div style={S.sub}>HOTEL & RESORT</div>
        <h3 style={S.title}>Đăng ký</h3>
        {error && <div className="error-banner">{error}</div>}
        <div className="form-group">
          <label className="form-label">Họ và tên</label>
          <input className="form-input" value={form.name}     onChange={set('name')}     placeholder="Nguyễn Văn A" />
        </div>
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" value={form.email} onChange={set('email')} placeholder="your@email.com" />
        </div>
        <div className="form-group">
          <label className="form-label">Mật khẩu</label>
          <input className="form-input" type="password" value={form.password} onChange={set('password')} placeholder="Ít nhất 6 ký tự" />
        </div>
        <div className="form-group">
          <label className="form-label">Số điện thoại</label>
          <input className="form-input" value={form.phone} onChange={set('phone')} placeholder="0901234567" />
        </div>
        <button className="btn btn-gold" style={{ width:'100%' }} onClick={submit} disabled={loading}>
          {loading ? 'Đang đăng ký...' : 'ĐĂNG KÝ'}
        </button>
        <div style={S.toggle}>Đã có tài khoản? <Link to="/login" style={{ color:'var(--gold)' }}>Đăng nhập</Link></div>
      </div>
    </div>
  )
}

const S = {
  page:  { minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--dark)', padding:'2rem' },
  box:   { width:'100%', maxWidth:420, background:'var(--dark2)', border:'1px solid rgba(201,169,110,0.2)', padding:'3rem' },
  logo:  { fontFamily:'var(--font-serif)', fontSize:28, fontWeight:300, letterSpacing:4, color:'var(--gold)', textAlign:'center', marginBottom:4 },
  sub:   { textAlign:'center', color:'var(--text3)', fontSize:10, letterSpacing:3, marginBottom:'2.5rem' },
  title: { fontFamily:'var(--font-serif)', fontSize:24, fontWeight:300, marginBottom:'1.5rem', textAlign:'center' },
  toggle:{ textAlign:'center', marginTop:'1.25rem', fontSize:13, color:'var(--text2)' },
}
