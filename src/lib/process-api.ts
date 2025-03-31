import axios from 'axios'

const processApi = axios.create({
  baseURL: 'http://localhost:8000/api',
})

export default processApi
