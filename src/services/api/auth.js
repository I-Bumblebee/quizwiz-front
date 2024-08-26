import axios from '@/plugins/axios/index.js'

const getCsrf = () => {
  return axios.get(import.meta.env.VITE_BACKEND_URL + '/sanctum/csrf-cookie')
}

const getUser = () => {
  return axios.get('/user')
}

const register = ({ name, email, password, password_confirmation }) => {
  return axios.post('/register', {
    name,
    email,
    password,
    password_confirmation,
  })
}

const login = ({ email, password, remember }) => {
  return axios.post('/login', {
    email,
    password,
    remember,
  })
}

const logout = () => {
  return axios.post('/logout')
}

export { register, login, logout, getCsrf, getUser }
