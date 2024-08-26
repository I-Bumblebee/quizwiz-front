import { register, login, logout, getUser } from '@/services/api/auth.js'
import { LOGIN, REGISTER, LOGOUT, FETCH_USER, NOTIFY } from '@/store/actions.type.js'
import { SET_AUTH, SET_ERRORS, SET_LOADING } from '@/store/mutations.type.js'
import router from '@/router/index.js'

const state = {
  user: {},
  errors: {},
  loading: false,
}

const getters = {
  currentUser(state) {
    return state.user
  },
  isAuthenticated(state) {
    return Object.keys(state.user).length > 0
  },
  getErrors(state) {
    return state.errors
  },
  isLoading(state) {
    return state.loading
  },
}

const actions = {
  [LOGIN](context, credentials) {
    context.commit(SET_LOADING, true)
    login(credentials)
      .then(({ data }) => {
        context.commit(SET_AUTH, data)
        void context.dispatch(NOTIFY, {
          type: 'success',
          title: 'Welcome back!',
          message: 'You are now logged in.',
        })
        void router.push({ name: 'home' })
      })
      .catch(({ response }) => {
        context.commit(SET_ERRORS, response.data.errors)
        void context.dispatch(NOTIFY, {
          type: 'error',
          title: 'Error',
          message: 'Invalid credentials.',
        })
      })
      .finally(() => {
        context.commit(SET_LOADING, false)
      })
  },
  [REGISTER](context, credentials) {
    context.commit(SET_LOADING, true)
    register(credentials)
      .then(() => {
        void context.dispatch(NOTIFY, {
          type: 'success',
          title: 'Email sent',
          message: 'Please check your email to verify your account.',
        })
        void router.push({ name: 'login' })
      })
      .catch(({ response }) => {
        context.commit(SET_ERRORS, response.data.errors)
      })
      .finally(() => {
        context.commit(SET_LOADING, false)
      })
  },
  [LOGOUT](context) {
    context.commit(SET_LOADING, true)
    logout()
      .then(() => {
        context.commit(SET_AUTH, {})
        void context.dispatch(NOTIFY, {
          type: 'success',
          title: 'Goodbye!',
          message: 'You are now logged out.',
        })
      })
      .catch(({ response }) => {
        context.commit(SET_ERRORS, response.data.errors)
        void context.dispatch(NOTIFY, {
          type: 'error',
          title: 'Error',
          message: 'An error occurred while logging out.',
        })
      })
      .finally(() => {
        context.commit(SET_LOADING, false)
      })
  },
  [FETCH_USER](context) {
    context.commit(SET_LOADING, true)
    getUser()
      .then(({ data }) => {
        context.commit(SET_AUTH, data)
      })
      .catch(() => {
        context.commit(SET_AUTH, {})
      })
      .finally(() => {
        context.commit(SET_LOADING, false)
      })
  },
}

const mutations = {
  [SET_AUTH](state, user) {
    state.user = user
  },
  [SET_ERRORS](state, errors) {
    state.errors = errors
  },
  [SET_LOADING](state, loading) {
    state.loading = loading
  },
}

export default {
  state,
  actions,
  mutations,
  getters,
}
