<script>
export default {
  name: 'BaseAuthLink',
  props: {
    to: {
      type: Object,
      default: () => ({}),
      required: true,
    },
  },
}
</script>

<template>
  <RouterLink
    :to="to"
    class="w-full rounded-md py-2.5 text-center font-raleway text-base font-bold tracking-wide whitespace-nowrap"
  >
    <slot />
  </RouterLink>
</template>
