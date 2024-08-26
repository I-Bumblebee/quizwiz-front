<script>
import TitleIcon from '@/components/icons/IconTitle.vue'
import MenuIcon from '@/components/icons/IconMenu.vue'
import NavigationDropdown from '@/components/NavigationDropdown.vue'
import UserCard from '@/components/UserCard.vue'
import SearchBar from '@/components/SearchBar.vue'
import BaseAuthLink from '@/components/base/BaseAuthLink.vue'
export default {
  name: 'SharedHeader',
  emits: ['update:searchParameter'],
  components: {
    BaseAuthLink,
    TitleIcon,
    MenuIcon,
    NavigationDropdown,
    UserCard,
    SearchBar,
  },
  props: {
    hideSearch: {
      type: Boolean,
      default: false,
    },
    searchParameter: {
      type: String,
      default: '',
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDropdownOpen: false,
      isUserCardOpen: false,
    }
  },
  methods: {
    toggleMenu() {
      this.isDropdownOpen = !this.isDropdownOpen
    },
    setIsUserCardOpen(newState) {
      this.isUserCardOpen = newState
    },
    updateSearchParameter(value) {
      this.$emit('update:searchParameter', value)
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated
    },
    user() {
      return this.$store.getters.currentUser
    },
    userLoading() {
      return this.$store.getters.isLoading
    }
  },
  watch: {
    isDropdownOpen(value) {
      document.body.style.overflow = value ? 'hidden' : 'auto'
    },
  },
}
</script>

<template>
  <header class="container z-30 flex h-20 items-center bg-white">
    <NavigationDropdown :isOpen="isDropdownOpen" @toggle:isOpen="toggleMenu" />
    <div class="flex gap-16">
      <RouterLink :to="{ name: 'home' }">
        <TitleIcon />
      </RouterLink>
      <RouterLink
        :to="{ name: 'quizzes' }"
        class="hidden items-center gap-2 font-raleway text-base font-bold tracking-wider text-gray-600 laptop:flex"
      >
        <div
          :class="active ? 'opacity-100' : 'opacity-0'"
          class="mb-px h-2 w-2 rounded-full bg-blue"
        ></div>
        Quizzes
      </RouterLink>
    </div>
    <div class="flex w-full items-center justify-end gap-4">
      <SearchBar v-if="!hideSearch" @input="updateSearchParameter" />
      <MenuIcon
        class="-mb-0.5 cursor-pointer stroke-gray-700 laptop:hidden"
        @click.stop="toggleMenu"
      />
      <UserCard
        v-if="isAuthenticated && !userLoading"
        @click.stop="isUserCardOpen = true"
        :isOpen="isUserCardOpen"
        @set:isOpen="setIsUserCardOpen($event)"
        class="hidden laptop:inline"
      />
      <div v-else-if="!userLoading" class="hidden laptop:flex">
        <BaseAuthLink :to="{ name: 'register' }" class="bg-black px-5 text-white">
          Sign up
        </BaseAuthLink>
        <BaseAuthLink :to="{ name: 'login' }" class="px-5 text-blue">Log in</BaseAuthLink>
      </div>
    </div>
  </header>
  <hr class="border-1 w-full border-b-gray-200" />
</template>
