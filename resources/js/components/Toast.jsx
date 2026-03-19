import React, { useState, useEffect } from 'react'

let _push = null
export const showToast = (msg, type = 'success') => _push?.(msg, type)

export default function Toast() {
  const [toasts, setToasts] = useState([])

  useEffect(() => {
    _push = (msg, type) => {
      const id = Date.now()
      setToasts(p => [...p, { id, msg, type }])
      setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500)
    }
    return () => { _push = null }
  }, [])

  if (!toasts.length) return null

  return (
    <div style={{ position:'fixed', bottom:'2rem', right:'2rem', zIndex:9999, display:'flex', flexDirection:'column', gap:'0.5rem' }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          background: 'var(--dark3)',
          border: `1px solid ${t.type === 'success' ? 'var(--gold)' : 'var(--red)'}`,
          color: 'var(--text)', padding: '12px 20px', fontSize: 13, minWidth: 260,
          animation: 'slideUp .3s ease',
        }}>
          {t.type === 'success' ? '✓' : '✕'} {t.msg}
        </div>
      ))}
      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  )
}
