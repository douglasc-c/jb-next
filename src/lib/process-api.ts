import axios from 'axios'

const processApi = axios.create({
  baseURL: 'https://py.auditaxs.com.br/api',
})

export default processApi
