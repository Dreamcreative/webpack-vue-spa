import http from '@/axios/axios.js'
export const login = (params) => {
  http.get('/index/login').then(res => res.data)
}