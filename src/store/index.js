import Vuex from 'vuex'
import auth from '@/store/auth.module.js'
import toast from '@/store/toast.module.js'

export default new Vuex.Store({
  modules: {
    auth,
    toast,
  },
})
