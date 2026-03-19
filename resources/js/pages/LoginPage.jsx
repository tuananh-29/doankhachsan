import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { showToast } from '../components/Toast.jsx'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate  = useNavigate()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const submit = async () => {
    if (!email || !password) { setError('Vui lòng điền đầy đủ'); return }
    setLoading(true); setError('')
    try {
      const user = await login(email, password)
      showToast('Chào mừng ' + user.name + '!')
      navigate(user.role === 'admin' ? '/admin' : '/')
    } catch (e) {
      setError(e.response?.data?.message || 'Đăng nhập thất bại')
    } finally { setLoading(false) }
  }

  return (
    <div style={S.page}>
      <div style={S.box}>
        <div style={S.logo}>LUMIÈRE</div>
        <div style={S.sub}>HOTEL & RESORT</div>
        <h3 style={S.title}>Đăng nhập</h3>
        {error && <div className="error-banner">{error}</div>}
        <div className="form-group">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" />
        </div>
        <div className="form-group">
          <label className="form-label">Mật khẩu</label>
          <input className="form-input" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" onKeyDown={e => e.key === 'Enter' && submit()} />
        </div>
        <button className="btn btn-gold" style={{ width:'100%' }} onClick={submit} disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'ĐĂNG NHẬP'}
        </button>
        <div style={S.hint}>Demo: admin@hotel.com / admin123 &nbsp;|&nbsp; user@hotel.com / user123</div>
        <div style={S.toggle}>Chưa có tài khoản? <Link to="/register" style={{ color:'var(--gold)' }}>Đăng ký ngay</Link></div>
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
  hint:  { textAlign:'center', marginTop:'1rem', fontSize:11, color:'var(--text3)' },
  toggle:{ textAlign:'center', marginTop:'1.25rem', fontSize:13, color:'var(--text2)' },
}
