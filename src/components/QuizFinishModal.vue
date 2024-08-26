<script>
import IconsQuizFinished from '@/components/icons/IconsQuizFinished.vue'
import IconX from '@/components/icons/IconX.vue'

export default {
  name: 'QuizFinishModal',
  emits: ['close'],
  components: { IconX, IconsQuizFinished },
  props: {
    isOpen: {
      type: Boolean,
      default: false,
      required: true,
    },
    quiz: {
      type: {
        title: String,
        difficulty_level: {
          name: String,
          color: String,
        },
      },
      default: null,
      required: true,
    },
    quizUserResult: {
      type: {
        score: Number,
        time_taken_seconds: Number,
        correct_answers: Number,
        incorrect_answers: Number,
      },
      required: true,
    },
  },
  computed: {
    timeTakenFormatted() {
      const minutes = Math.floor(this.quizUserResult?.time_taken_seconds / 60)
      const seconds = this.quizUserResult?.time_taken_seconds % 60
      return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`
    },
  },
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 backdrop-blur-sm" @click.stop="$emit('close')">
    <div class="flex h-full w-full items-center justify-center bg-black bg-opacity-10">
      <div class="gap-3 w-100 flex flex-col rounded-lg bg-white p-6 font-inter font-medium shadow-timer">
        <IconX class="-mb-6 cursor-pointer self-end fill-gray-500" @click="$emit('close')" />
        <IconsQuizFinished class="self-center" />
        <h2 class="text-center text-md font-semibold text-gray-900">Quiz Finished</h2>
        <p class="text-center text-base font-normal text-gray-400">your results</p>

        <p class="text-base text-gray-700 -mb-2.5 ">Quiz Name</p>
        <p class="text-base text-black">{{ quiz.title }}</p>

        <hr />

        <p class="text-base text-gray-700 -mb-2.5 ">Quiz Level</p>
        <p class="text-base" :style="{ color: quiz.difficulty_level.color }">
          {{ quiz.difficulty_level.name }}
        </p>

        <hr />

        <p class="text-base text-gray-700 -mb-2.5">Time</p>
        <p class="text-base text-black">{{ timeTakenFormatted }}</p>

        <hr />

        <p class="text-base text-gray-700 -mb-2.5">Mistakes</p>
        <p class="text-base text-crimson">{{ quizUserResult?.incorrect_answers }}</p>

        <hr />

        <p class="text-base text-gray-700 -mb-2.5">Right Answers</p>
        <p class="text-base text-emerald">{{ quizUserResult?.correct_answers }}</p>

        <hr />

        <p class="text-base text-gray-700 -mb-2.5 ">Score</p>
        <p class="text-base text-black">{{ quizUserResult?.score }}</p>

        <button
          @click="$emit('close')"
          class="w-full rounded-lg bg-blue py-4 text-center font-inter text-sm font-semibold text-white laptop:py-3"
        >
          Back to home
        </button>
      </div>
    </div>
  </div>
</template>
