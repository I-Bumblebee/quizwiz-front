<script>
export default {
  name: 'IconDifficulty',
  props: {
    color: {
      type: String,
      required: true,
    },
  },
}
</script>

<template>
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="20" class="opacity-5" :fill="color" />
    <path
      d="M20.8333 11.6667L12.5 21.6667H20L19.1667 28.3334L27.5 18.3334H20L20.8333 11.6667Z"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
      :stroke="color"
    />
  </svg>
</template>
