import { ADD_TOAST, REMOVE_TOAST } from '@/store/mutations.type.js'
import { NOTIFY } from '@/store/actions.type.js'

const state = {
  toasts: [],
}

const getters = {
  toasts(state) {
    return state.toasts
  },
}

const actions = {
  [NOTIFY](context, { title, message, type }) {
    const id = Date.now()
    context.commit(ADD_TOAST, { title, message, type, id })
    setTimeout(() => {
      context.commit(REMOVE_TOAST, id)
    }, 1000)
  },
}

const mutations = {
  [ADD_TOAST](state, toast) {
    state.toasts.push(toast)
  },
  [REMOVE_TOAST](state, id) {
    state.toasts = state.toasts.filter((toast) => toast.id !== id)
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
