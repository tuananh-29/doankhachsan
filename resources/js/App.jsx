import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import Navbar        from './components/Navbar.jsx'
import Toast         from './components/Toast.jsx'
import HomePage      from './pages/HomePage.jsx'
import RoomsPage     from './pages/RoomsPage.jsx'
import LoginPage     from './pages/LoginPage.jsx'
import RegisterPage  from './pages/RegisterPage.jsx'
import MyBookingsPage from './pages/MyBookingsPage.jsx'
import AdminPage     from './pages/AdminPage.jsx'

function Guard({ children, adminOnly = false }) {
  const { user, loading } = useAuth()
  if (loading) return <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', color:'var(--text3)', fontFamily:'var(--font-serif)', fontSize:24 }}>Lumière…</div>
  if (!user) return <Navigate to="/login" replace />
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />
  return children
}

function Layout() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/rooms"       element={<RoomsPage />} />
        <Route path="/my-bookings" element={<Guard><MyBookingsPage /></Guard>} />
        <Route path="/admin/*"     element={<Guard adminOnly><AdminPage /></Guard>} />
        <Route path="*"            element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

function AppRoutes() {
  const { user } = useAuth()
  return (
    <>
      <Routes>
        <Route path="/login"    element={user ? <Navigate to="/"  replace /> : <LoginPage />} />
        <Route path="/register" element={user ? <Navigate to="/"  replace /> : <RegisterPage />} />
        <Route path="/*"        element={<Layout />} />
      </Routes>
      <Toast />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
