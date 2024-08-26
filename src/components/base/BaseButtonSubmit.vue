<script>
export default {
  name: 'BaseButtonSubmit',
}
</script>

<template>
  <button
    type="submit"
    class="w-full rounded-lg bg-black py-4 text-center text-sm font-semibold text-white"
  >
    <slot />
  </button>
</template>
