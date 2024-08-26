<script>
import SharedHeader from '@/components/shared/SharedHeader.vue'
import { completeQuiz, fetchQuizQuestions, startQuiz, fetchQuiz } from '@/services/api/quiz.js'
import IconsDocument from '@/components/icons/IconsDocument.vue'
import IconsHashtag from '@/components/icons/IconsHashtag.vue'
import IconsClock from '@/components/icons/IconsClock.vue'
import IconsRocket from '@/components/icons/IconsRocket.vue'
import SharedQuizCategoryTags from '@/components/shared/SharedQuizCategoryTags.vue'
import IconsPin from '@/components/icons/IconsPin.vue'
import { Form as ValidationForm } from 'vee-validate'
import QuizQuestion from '@/components/QuizQuestion.vue'
import QuizTimer from '@/components/QuizTimer.vue'
import { NOTIFY } from '@/store/actions.type.js'
import QuizFinishModal from '@/components/QuizFinishModal.vue'

export default {
  name: 'QuizTakeView',
  components: {
    QuizFinishModal,
    QuizTimer,
    QuizQuestion,
    IconsPin,
    SharedQuizCategoryTags,
    IconsRocket,
    IconsClock,
    IconsHashtag,
    IconsDocument,
    SharedHeader,
    ValidationForm,
  },
  data() {
    return {
      quiz: null,
      questions: null,
      quizUserID: null,
      displayQuizResult: false,
      quizUserResult: null,
    }
  },
  methods: {
    fetchQuizAndQuestions() {
      const id = this.$route.params.id
      fetchQuizQuestions(id).then(({ data }) => {
        console.log(data)
        this.questions = data
      })

      fetchQuiz(id).then(({ data }) => {
        this.quiz = data
      })
    },
    submitQuiz() {
      this.displayQuizResult = true
      const answers = this.$refs.form.values
      completeQuiz(this.quiz, {
        quiz_user_id: this.quizUserID,
        ...answers,
      })
        .then(({ data }) => {
          this.quizUserResult = data
        })
        .catch(() => {
          this.$store.dispatch(NOTIFY, {
            title: 'Quiz Submission Failed',
            message: 'Please try again.',
            type: 'error',
          })
        })
    },
    closeModal() {
      this.displayQuizResult = false
      this.$router.replace({ name: 'quizzes' })
    },
  },
  watch: {
    $route() {
      this.fetchQuizAndQuestions()
    },
    displayQuizResult(newVal) {
      document.body.style.overflow = newVal ? 'hidden' : 'auto'
    },
  },
  beforeMount() {
    const id = this.$route.params.id
    this.fetchQuizAndQuestions()
    startQuiz(id)
      .then(({ data }) => {
        this.quizUserID = data.quiz_user_id
      })
      .catch(() => {
        this.$store.dispatch(NOTIFY, {
          title: 'Quiz Already Played',
          message: 'Replaying the quiz is not allowed.',
          type: 'warning',
        })
        this.$router.replace({ name: 'quiz', params: { id } })
      })
  },
}
</script>

<template>
  <QuizFinishModal
    @close="closeModal"
    :quizUserResult="quizUserResult"
    :quiz="quiz"
    :isOpen="displayQuizResult"
  />

  <SharedHeader :hideSearch="true" />
  <section class="container my-10">
    <div class="flex w-full flex-col items-center justify-center">
      <h1 class="px-12 text-center font-raleway text-xl-minus font-bold">{{ quiz?.title }}</h1>
      <div
        class="mt-5 flex flex-wrap items-center justify-center gap-3 whitespace-nowrap px-12 text-gray-500"
      >
        <div class="flex items-center gap-2">
          <IconsPin />
          <SharedQuizCategoryTags :categories="quiz?.categories" class="w-full text-gray-500" />
        </div>
        <span class="text-gray-300">|</span>
        <div class="flex items-center gap-2">
          <IconsHashtag />
          {{ quiz?.number_of_questions }} Questions
        </div>
        <span class="text-gray-300">|</span>
        <div class="flex items-center gap-2">
          <IconsDocument />
          {{ quiz?.total_points }} Points
        </div>
        <span class="text-gray-300">|</span>
        <div class="flex items-center gap-2">
          <IconsRocket />
          {{ quiz?.users_count }} Plays
        </div>
        <span class="text-gray-300">|</span>
        <div class="flex items-center gap-2">
          <IconsClock />
          {{ quiz?.time_limit_minutes }}m
        </div>
      </div>
    </div>

    <div class="mt-16 flex items-start justify-between laptop:mt-20 laptop:gap-8">
      <ValidationForm ref="form" class="flex w-full flex-col gap-12">
        <QuizQuestion
          v-for="(question, index) in questions"
          :key="question.id"
          :question="question"
          :index="index"
        />
      </ValidationForm>
      <div class="laptop:min-w-96">
        <QuizTimer :timeMinutes="quiz?.time_limit_minutes" @timeOver="submitQuiz" />
      </div>
    </div>
  </section>
</template>
