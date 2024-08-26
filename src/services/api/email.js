import axios from '@/plugins/axios/index.js'

const sendVerificationEmail = async ({ email }) => {
  return await axios.post('/email/verification-notification', {
    email,
  })
}

const verifyEmail = async ({ user, hash, expires, signature }) => {
  return await axios.get(`/email/verify/${user}/${hash}?expires=${expires}&signature=${signature}`)
}

export { sendVerificationEmail, verifyEmail }
