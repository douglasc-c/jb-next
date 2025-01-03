import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://sys.4handsgroup.com/',
  // baseURL: 'http://localhost:3335/',
})

api.interceptors.request.use(
  (config) => {
    const cookies = document.cookie
    const token = cookies
      .split('; ')
      .find((row) => row.startsWith('auth-token='))
    if (token) {
      config.headers.Authorization = `Bearer ${token.split('=')[1]}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

export default api
