<script>
export default {
  name: 'BaseQuizInfoWidget',
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number, Boolean],
    },
    placeholder: {
      type: String,
      default: 'N/A',
    },
  },
}
</script>

<template>
  <div class="inline-flex items-center gap-3">
    <slot class="w-10 h-10"/>
    <div class="flex flex-col">
      <p class="font-inter text-base font-semibold leading-5 text-gray-900">{{ label }}</p>
      <p class="font-inter text-base leading-5 text-gray-600" :class="!value && 'text-opacity-30'">
        {{ value || placeholder }}
      </p>
    </div>
  </div>
</template>
