<script>
import IconsInfo from '@/components/icons/IconsInfo.vue'
import QuizQuestionOption from '@/components/QuizQuestionOption.vue'

export default {
  name: 'QuizQuestion',
  components: { QuizQuestionOption, IconsInfo },
  props: {
    question: {
      type: {
        id: Number,
        question: String,
        options: Array,
        correct_options_count: Number,
        points: Number,
      },
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
}
</script>

<template>
  <div class="flex w-full select-none flex-col gap-6 font-inter text-base">
    <div class="inline-flex items-center gap-2">
      <span class="font-semibold text-blue">Question - {{ index + 1 }}</span>
      <span class="h-4 overflow-hidden text-gray-300">|</span>
      <span class="font-semibold text-cerise">Points - {{ question?.points }}</span>
    </div>
    <h3 class="text-md font-semibold leading-7 text-black">
      {{ question?.question }}
    </h3>

    <div
      v-if="question?.correct_options_count > 1"
      class="flex w-82 flex-nowrap items-center gap-2 whitespace-nowrap rounded-md-minus border border-mediumseagreen border-opacity-55 bg-mediumseagreen bg-opacity-5 px-4 py-1.5 font-medium text-green-haze"
    >
      <IconsInfo />
      You can select {{ question?.correct_options_count }} options from questions
    </div>

    <div class="flex flex-col gap-2.5">
      <QuizQuestionOption
        v-for="option in question?.options"
        :key="option.id"
        :option="option"
        :maxAnswers="question?.correct_options_count"
        :questionID="question?.id"
      />
    </div>
  </div>
</template>
