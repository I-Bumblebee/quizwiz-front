<script>
import LogOutIcon from '@/components/icons/IconLogOut.vue'
import { LOGOUT } from '@/store/actions.type.js'

export default {
  name: 'UserCard',
  emits: ['set:isOpen'],
  components: { LogOutIcon },
  props: {
    isOpen: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  methods: {
    closeUserCard() {
      this.$emit('set:isOpen', false)
    },
    logOut() {
      this.$store.dispatch(LOGOUT)
    },
  },
  computed: {
    user() {
      return this.$store.getters.currentUser
    },
  },
}
</script>

<template>
  <div
    :class="
      isOpen
        ? 'box-content inline-flex w-full items-center gap-3 laptop:absolute laptop:right-24 laptop:top-4 laptop:z-20 laptop:inline-flex laptop:flex-col laptop:items-start laptop:rounded-lg laptop:border-2 laptop:border-gray-200 laptop:bg-white laptop:px-6 laptop:py-6 laptop:shadow-md laptop:max-w-xs laptop:box-border laptop:max-h-36'
        : 'inline'
    "
    v-click-outside="closeUserCard"
  >
    <img
      :src="user.image"
      alt="profile image"
      class="h-16 w-16 content-center rounded-full object-cover"
      :class="isOpen ? 'laptop:w-10 laptop:h-10' : 'laptop:w-11 laptop:h-11'"
    />
    <div class="flex-col w-full" :class="isOpen ? 'flex' : 'hidden'">
      <h2 class="font-inter text-sm font-semibold text-gray-900 laptop:text-base laptop:leading-5">
        {{ user.name }}
      </h2>
      <div class="flex items-center justify-between w-full">
        <h2 class="font-inter text-base text-gray-600 laptop:leading-5">{{ user.email }}</h2>
        <LogOutIcon class="hidden scale w-5 h-5 stroke-gray-500 laptop:block" @click.stop="logOut"/>
      </div>
    </div>
  </div>
</template>
