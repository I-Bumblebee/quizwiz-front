<script>
import { FETCH_USER } from '@/store/actions.type.js'
import ToastNotification from '@/components/ToastNotification.vue'

export default {
  name: 'App',
  components: {
    ToastNotification,
  },
  beforeCreate() {
    this.$store.dispatch(FETCH_USER)
  },
}
</script>

<template>
  <RouterView />
  <ToastNotification />
</template>
