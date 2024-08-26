import axios from '@/plugins/axios/index.js'

const sendResetLink = async ({ email }) => {
  return await axios.post('/forgot-password', {
    email,
  })
}

const resetPassword = async ({ email, password, password_confirmation, token }) => {
  return await axios.post('/reset-password', {
    email,
    password,
    password_confirmation,
    token,
  })
}

export { sendResetLink, resetPassword }
