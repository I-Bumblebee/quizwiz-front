<script>
export default {
  name: 'QuizInfoItem',
  props: {
    value: {
      type: [String, Number, Boolean],
      required: true,
    },
    placeholder: {
      type: String,
      default: 'N/A',
    },
    label: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <div class="inline-flex items-center gap-3">
    <slot class="h-10 w-10" />
    <div class="flex flex-col">
      <p class="whitespace-nowrap font-inter text-base font-semibold leading-5 text-gray-900">
        {{ label }}
      </p>
      <p class="font-inter text-base leading-5 text-gray-600" :class="!value && 'text-opacity-30'">
        {{ value || placeholder }}
      </p>
    </div>
  </div>
</template>
