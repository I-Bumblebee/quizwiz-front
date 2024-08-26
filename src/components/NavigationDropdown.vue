<script>
import BaseAuthLink from '@/components/base/BaseAuthLink.vue'
import UserCard from '@/components/UserCard.vue'
import { LOGOUT } from '@/store/actions.type.js'
import TitleIcon from '@/components/icons/IconTitle.vue'
import XIcon from '@/components/icons/IconX.vue'

export default {
  name: 'NavigationDropdown',
  emits: ['toggle:isOpen'],
  components: { UserCard, BaseAuthLink, XIcon, TitleIcon },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  methods: {
    toggleMenu() {
      this.$emit('toggle:isOpen')
    },
    logout() {
      this.$store.dispatch(LOGOUT)
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    user() {
      return this.$store.getters.currentUser
    },
  },
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-30 h-full backdrop-blur-sm">
    <div class="h-full w-full bg-black opacity-10"></div>
  </div>
  <nav
    v-if="isOpen"
    class="absolute left-0 top-0 z-50 flex w-3/4 flex-col gap-4 bg-white px-4 pb-9 pt-4"
    v-click-outside="toggleMenu"
  >
    <div class="flex justify-between py-3.5">
      <RouterLink :to="{ name: 'home' }" @click.stop="toggleMenu">
        <TitleIcon class="cursor-pointer" />
      </RouterLink>
      <XIcon class="cursor-pointer fill-gray-500" @click.stop="toggleMenu" />
    </div>
    <hr />
    <RouterLink
      :to="{ name: 'quizzes' }"
      @click.stop="toggleMenu"
      class="py-3 font-raleway text-md font-bold tracking-wider text-gray-900"
    >
      Quizzes
    </RouterLink>
    <hr />
    <div v-if="isAuthenticated" class="flex w-full grow flex-col gap-4">
      <UserCard :isOpen="true"/>
      <hr />
      <BaseAuthLink :to="{}" class="bg-gray-100 text-blue" @click.stop="logout(); toggleMenu()">Log out</BaseAuthLink>
    </div>
    <div v-else class="flex flex-col gap-4" >
      <BaseAuthLink :to="{ name: 'register' }" class="bg-black py-3 text-white" @click.stop="logout(); toggleMenu()">
        Sign up
      </BaseAuthLink>
      <BaseAuthLink :to="{ name: 'login' }" class="bg-gray-100 py-3 text-blue" @click.stop="logout(); toggleMenu()">Log in</BaseAuthLink>
    </div>
  </nav>
</template>
