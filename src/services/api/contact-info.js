import axios from '@/plugins/axios/index.js'


const getContactInfo = async () => {
  return await axios.get('/contact-info')
}

export { getContactInfo }