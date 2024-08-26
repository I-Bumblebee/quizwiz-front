<script>
import { Field, ErrorMessage } from 'vee-validate'
import AlertIcon from '@/components/icons/IconAlert.vue'
export default {
  name: 'BaseInput',
  components: { Field, ErrorMessage, AlertIcon },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    errors: {
      type: String,
      default: '',
    },
  },
  computed: {
    invalid() {
      return this.errors.length > 0
    },
  },
}
</script>

<template>
  <label
    :for="name"
    class="relative flex flex-col gap-1.5 font-inter text-base leading-4 text-gray-700"
  >
    {{ label }}
    <Field
      ref="input"
      :name="name"
      :type="type"
      :placeholder="placeholder"
      :validateOnInput="true"
      :validateOnBlur="false"
      class="w-full rounded-lg border p-4 text-sm leading-5 text-gray-900 outline-none"
      :class="invalid ? 'border-red' : 'focus-within:border-periwinkle border-gray-300'"
    />
    <span class="absolute right-4 top-10 mt-0.5 flex gap-2">
      <slot />
      <AlertIcon v-show="invalid" class="stroke-red" />
    </span>
    <ErrorMessage :name="name" class="ml-0.5 text-red" />
  </label>
</template>
