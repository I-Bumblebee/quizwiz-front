<script>
import ScrollIcon from '@/components/icons/IconGoBack.vue'

export default {
  name: 'CategorySelectionRow',
  components: { ScrollIcon },
  props: {
    categoryProps: {
      type: Array,
      required: true,
    },
    selectedCategories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      categories: this.categoryProps,
      canScrollLeft: false,
      canScrollRight: true,
    }
  },
  computed: {
    allCategoriesSelected() {
      return this.selectedCategories.length === 0
    },
  },
  methods: {
    updateRouteQuery(category) {
      const action = this.selectedCategories.includes(category.id) ? 'remove' : 'add'
      const query = { ...this.$route.query }

      if (action === 'remove') {
        query.category = this.selectedCategories.filter((id) => id !== category.id)
      } else {
        query.category = [...(query.category || []), category.id]
      }
      this.$router.push({ query })
    },
    toggleCategory(category) {
      this.updateRouteQuery(category)
    },
    clearAllCategories() {
      this.$router.push({ query: { ...this.$route.query, category: undefined } })
    },
    updateScrollIndicators() {
      const row = this.$refs.cats
      this.canScrollLeft = row.scrollLeft > 0
      this.canScrollRight = row.scrollWidth > row.clientWidth + row.scrollLeft
    },
    scroll(direction) {
      this.$refs.cats.scrollBy({
        left: direction * 100,
        behavior: 'smooth',
      })
    },
  },
}
</script>

<template>
  <div class="relative flex w-full items-center gap-4 overflow-hidden">
    <div
      v-if="canScrollLeft"
      class="absolute left-0 top-auto inline-flex h-full items-center bg-white pr-5 laptop:w-10"
      @click="scroll(-1)"
    >
      <ScrollIcon class="mb-px scale-150 cursor-pointer fill-black" />
    </div>
    <div
      @scroll="updateScrollIndicators()"
      ref="cats"
      class="category-list no-scrollbar flex gap-3 overflow-x-scroll whitespace-nowrap"
    >
      <div
        :class="allCategoriesSelected ? 'border-opacity-100' : 'text-gray-500'"
        class="category flex border-b-2 border-black border-opacity-0 px-1 py-20 pb-3 pt-3 font-inter font-semibold leading-5"
      >
        <div @click="clearAllCategories" class="cursor-pointer select-none">All Quizzes</div>
      </div>
      <div
        v-for="category in categories"
        :key="category.id"
        :class="{
          'border-opacity-100': selectedCategories.includes(category.id),
          'text-gray-500': !selectedCategories.includes(category.id),
        }"
        class="category flex border-b-2 border-black border-opacity-0 px-1 py-20 pb-3 pt-3 font-inter font-semibold leading-5"
      >
        <div @click="toggleCategory(category)" class="cursor-pointer select-none">
          {{ category.name }}
        </div>
      </div>
    </div>
    <div
      v-if="canScrollRight"
      class="absolute right-0 top-auto inline-flex h-full items-center bg-white pl-5"
      @click="scroll(1)"
    >
      <ScrollIcon class="mb-px rotate-180 scale-150 cursor-pointer fill-black" />
    </div>
  </div>
</template>
