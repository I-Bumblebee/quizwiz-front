<script>
import { startTimer } from '@/utils/timer.js'
export default {
  name: 'QuizTimer',
  data() {
    return {
      timeLeft: 0,
    }
  },
  props: {
    timeMinutes: {
      type: Number,
      required: true,
    },
  },
  emits: ['timeOver'],
  watch: {
    timeMinutes(newVal, oldVal) {
      if (newVal !== oldVal && newVal !== null) {
        startTimer(this.timeMinutes, (updatedTime) => (this.timeLeft = updatedTime))
      }
    },
    timeLeft(newVal) {
      if (newVal === 0) {
        this.$emit('timeOver')
      }
    },
  },
}
</script>

<template>
  <div
    class="shadow-timer fixed left-0 top-0 flex w-full flex-row-reverse gap-2.5 rounded-md-plus border-gray-300 border-opacity-55 bg-white p-4 text-gray-600 laptop:left-auto laptop:top-auto laptop:mt-6 laptop:max-w-96 laptop:flex-col laptop:gap-8 laptop:border laptop:p-8"
  >
    <div
      class="shadow-timer absolute left-1/2 top-0 hidden -translate-x-1/2 -translate-y-1/2 rounded-md-plus border border-gray-300 border-opacity-55 bg-white px-11 py-3 font-inter text-sm font-semibold text-gray-600 laptop:inline-block"
    >
      Timer
    </div>

    <div
      class="min-w-26 laptop:text-xl-plus whitespace-nowrap rounded-md-plus border border-gray-300 bg-gray-300 bg-opacity-10 px-2.5 py-2 text-md text-gray-600 laptop:mt-6 laptop:border-none laptop:bg-white laptop:p-0 laptop:text-center"
    >
      <span class="inline text-xs text-black laptop:hidden">Timer</span>
      <br class="inline laptop:hidden" />
      {{ Math.floor(timeLeft / 60) }} : {{ timeLeft % 60 }}
    </div>

    <hr class="hidden laptop:block" />

    <button
      @click="$emit('timeOver')"
      class="w-full rounded-lg bg-blue py-4 text-center font-inter text-sm font-semibold text-white laptop:py-3"
    >
      Submit
    </button>
  </div>
</template>
