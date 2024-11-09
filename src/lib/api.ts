import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://sys.profithub.tech/',
  // baseURL: 'http://localhost:3335/',
})

export default api
