import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export const authAPI = {
  login:    d => api.post('/auth/login', d),
  register: d => api.post('/auth/register', d),
  me:       () => api.get('/auth/me'),
  logout:   () => api.post('/auth/logout'),
}

export const roomsAPI = {
  getAll: params => api.get('/rooms', { params }),
  getOne: id     => api.get(`/rooms/${id}`),
  create: d      => api.post('/rooms', d),
  update: (id,d) => api.put(`/rooms/${id}`, d),
  delete: id     => api.delete(`/rooms/${id}`),
}

export const bookingsAPI = {
  getAll:       ()      => api.get('/bookings'),
  create:       d       => api.post('/bookings', d),
  updateStatus: (id, s) => api.patch(`/bookings/${id}/status`, { status: s }),
  cancel:       id      => api.delete(`/bookings/${id}`),
}

export const usersAPI = {
  getAll: () => api.get('/users'),
}

export default api