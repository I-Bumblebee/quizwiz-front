<script>
import { Field } from 'vee-validate'
import IconsCheckMark from '@/components/icons/IconsCheckMark.vue'
export default {
  name: 'QuizQuestionOption',
  components: { IconsCheckMark, Field },
  props: {
    questionID: {
      type: Number,
      required: true,
    },
    option: {
      type: {
        id: Number,
        option: String,
      },
      required: true,
    },
    maxAnswers: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      checked: false,
    }
  },
  mounted() {
    this.$watch(
      () => this.$refs.checkbox?.value,
      (newVal) => {
        if (newVal) {
          if (newVal.length > this.maxAnswers) {
            newVal.shift()
            this.$refs.checkbox.reset({ value: newVal })
          }
          this.checked = newVal.includes(this.option.id)
        }
      },
    )
  },
}
</script>

<template>
  <label
    class="rounded-md-plus flex items-center justify-between border p-4 font-inter text-base leading-5"
    :class="
      checked
        ? 'border-blue border-opacity-40 bg-blue bg-opacity-5 text-blue'
        : 'border-gray-200 text-gray-600'
    "
  >
    <span class="cursor-pointer">
      {{ option?.option }}
    </span>
    <Field
      :name="questionID.toString()"
      type="checkbox"
      :value="option?.id"
      hidden
      ref="checkbox"
    />
    <span
      class="box-content flex h-4 w-4 min-w-4 cursor-pointer items-center justify-center rounded-full border"
      :class="checked ? 'border-blue bg-blue' : 'border-gray-200 bg-white'"
    >
      <IconsCheckMark class="h-3 w-3 stroke-white" />
    </span>
  </label>
</template>
