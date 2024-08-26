import axios from 'axios'
import router from '@/router/index.js'

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
  withXSRFToken: true,
})
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log('Request error handling under development')
    if (error.response?.status === 500) {
      router.replace({ name: 'server-error' })
    }

    return Promise.reject(error)
  },
)

export default instance
