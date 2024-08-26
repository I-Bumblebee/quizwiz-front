<script>
import { Field, ErrorMessage } from 'vee-validate'
import CheckMarkIcon from '@/components/icons/IconsCheckMark.vue'
export default {
  name: 'BaseInputCheckbox',
  components: { Field, ErrorMessage, CheckMarkIcon },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    round: {
      type: Boolean,
      default: true,
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
        this.checked = newVal === true
      },
    )
  },
}
</script>

<template>
  <div class="z-10 inline-flex flex-col items-start gap-1.5">
    <label
      class="inline-flex items-center gap-3 font-inter text-base leading-4"
      :class="round ? 'flex-row text-gray-700' : 'flex-row-reverse text-black'"
    >
      <Field
        :name="name"
        ref="checkbox"
        type="checkbox"
        :value="true"
        :uncheckedValue="false"
        hidden
      />
      <span
        class="relative flex cursor-pointer items-center justify-center"
        :class="[
          round ? 'h-5 w-5 rounded-full' : 'h-4 w-4 rounded-md-minus',
          checked ? 'border-2 border-black bg-black' : 'border border-gray-400 bg-white',
        ]"
      >
        <CheckMarkIcon class="stroke-white" />
      </span>
      <span>{{ label }}</span>
    </label>
    <ErrorMessage :name="name" class="ml-0.5 text-base leading-4 text-red" />
  </div>
</template>
