<script>
import SharedQuizCategoryTags from '@/components/shared/SharedQuizCategoryTags.vue'
import QuizInfoWidget from '@/components/QuizInfoWidget.vue'

export default {
  name: 'SharedQuizCard',
  components: {
    QuizInfoWidget,
    SharedQuizCategoryTags,
  },
  props: {
    quiz: {
      type: {
        image: String,
        title: String,
        categories: Array,
        user: {
          has_taken: Boolean,
          completed_at: String,
          time_taken: Number,
          score: Number,
        },
        users_count: Number,
        difficulty_level: Object,
        total_points: Number,
      },
      required: true,
    },
  },
  methods: {
    visitQuiz() {
      this.$router.push({ name: 'quiz', params: { id: this.quiz.id } })
    },
  },
}
</script>

<template>
  <div class="box-content inline-flex w-86 flex-col gap-8 p-6 shadow-card">
    <img
      :src="quiz.image"
      alt="quiz cover image"
      class="h-60 w-full cursor-pointer object-cover object-center"
      @click.stop="visitQuiz"
    />
    <div class="mb-0.5 flex flex-col gap-5">
      <SharedQuizCategoryTags :categories="quiz.categories" />
      <p
        class="-mt-3 cursor-pointer overflow-hidden overflow-ellipsis whitespace-nowrap font-inter text-md-plus font-semibold"
        @click.stop="visitQuiz"
      >
        {{ quiz.title }}
      </p>
      <QuizInfoWidget
        :hasTaken="quiz.user.has_taken"
        :completedAt="quiz.user.completed_at"
        :totalTime="quiz.user.time_taken"
        :totalUsers="quiz.users_count"
        :difficultyLevel="quiz.difficulty_level"
        :points="quiz.user.score"
        :totalPoints="quiz.total_points"
      />
    </div>
  </div>
</template>
