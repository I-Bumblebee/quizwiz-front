<script>
import DotIcon from '@/components/icons/IconDot.vue'
export default {
  name: 'SharedQuizCategoryTags',
  components: {
    DotIcon,
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    visitCategoryQuizzes(category) {
      this.$router.push({ name: 'quizzes', query: { category: category.id } })
    },
  },
}
</script>

<template>
  <div
    class="overflow-fade no-scrollbar flex min-h-6 w-full gap-2.5 font-inter text-base font-semibold capitalize text-blue"
  >
    <span
      v-for="category in categories"
      :key="category.id"
      class="inline-flex items-center gap-2.5"
    >
      <span @click.stop="visitCategoryQuizzes(category)" class="cursor-pointer">{{ category.name }}</span>
      <DotIcon v-if="category !== categories[categories.length - 1]" class="fill-gray-300" />
    </span>
  </div>
</template>

<style scoped>
.overflow-fade {
  mask-image: linear-gradient(90deg, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0) 100%);
}
</style>
