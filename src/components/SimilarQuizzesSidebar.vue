<script>
import SharedQuizCard from '@/components/shared/SharedQuizCard.vue'
export default {
  name: 'SimilarQuizzesSidebar',
  components: {
    SharedQuizCard,
  },
  props: {
    similarQuizzes: { type: Array, required: true },
  },
}
</script>

<template>
  <div
    class="special no-scrollbar inline-flex max-h-screen-2xl flex-col flex-nowrap gap-8 overflow-y-scroll"
  >
    <ul class="flex flex-col items-center justify-center gap-8">
      <li v-for="quiz in similarQuizzes" :key="quiz.id">
        <SharedQuizCard
          :quiz="quiz"
          class="rounded-md border border-gray-300 bg-gray-100 shadow-none"
        />
      </li>
    </ul>
  </div>
</template>
