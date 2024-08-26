<script>
import SearchIcon from './icons/IconSearch.vue'
import IconX from '@/components/icons/IconX.vue'
export default {
  name: 'SearchBar',
  components: { IconX, SearchIcon },
  emits: ['input'],
  data() {
    return {
      isOpen: false,
      timer: null,
      searchParameter: '',
    }
  },
  methods: {
    closeSearch(withClear = false) {
      if (withClear === true) {
        this.searchParameter = ''
        this.emitInputEvent()
      }
      this.isOpen = false
    },
    openSearch() {
      this.isOpen = true
    },
    emitInputEvent() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('input', this.searchParameter)
      }, 550)
    },
  },
  watch: {
    isOpen(value) {
      if (!value) {
        this.$refs.searchInput.blur()
      }

      document.body.style.overflow = value ? 'hidden' : 'auto'
    },
  },
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-10 h-full w-full bg-white laptop:hidden"></div>
  <div
    class="z-10 box-border flex items-center justify-center transition-width duration-300 laptop:mr-7"
    :class="
      isOpen
        ? ' absolute left-4 right-4 flex rounded-xl border border-gray-200 bg-gray-50 laptop:relative laptop:left-0 laptop:right-0 laptop:top-0 laptop:w-96 '
        : 'relative mr-4 w-24'
    "
    @click.stop="openSearch"
    v-click-outside="closeSearch"
  >
    <SearchIcon class="m-2.5 h-6 w-6 stroke-gray-500" />
    <input
      type="text"
      name="search"
      id="search"
      placeholder="Search"
      class="w-full overflow-ellipsis bg-inherit font-inter text-base text-gray-700 outline-none"
      ref="searchInput"
      v-model="searchParameter"
      @input="emitInputEvent"
      @keyup.enter="closeSearch"
    />
    <div
      class="flex h-11 cursor-pointer items-center rounded-r-lg border-l border-gray-200 bg-white px-3"
      v-show="isOpen"
      @click.stop="closeSearch(true)"
    >
      <IconX class="scale-75 fill-gray-500 stroke-gray-500" />
    </div>
  </div>
</template>
