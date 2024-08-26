import store from '@/store/index.js'

export const guestGuard = async (to, from, next) => {
  if (store.getters.isLoading) {
    await new Promise((resolve) => {
      const unsubscribe = store.subscribe((mutation, state) => {
        if (!state.loading) {
          unsubscribe()
          resolve()
        }
      })
    })
  }

  if (store.getters.isAuthenticated) {
    next({ name: 'home' })
  } else {
    next()
  }
}
