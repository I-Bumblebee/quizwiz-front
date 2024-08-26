<script>
export default {
  name: 'FilterSortToggle',
  props: {
    showFilters: {
      type: Boolean,
      required: true,
    },
  }
}
</script>

<template>
  <div
    class="h-20 p-4 font-inter text-base font-semibold laptop:hidden"
  >
    <div
      class="relative flex w-full cursor-pointer justify-around rounded-3xl bg-gray-300 bg-opacity-30 py-3"
    >
      <div
        class="absolute left-0 top-0 flex h-full w-1/2 rounded-3xl border border-gray-300 bg-white transition-all"
        :class="showFilters ? 'translate-x-0' :'translate-x-full' "
      ></div>
      <span :class="showFilters && 'text-blue'" class="z-50"> Filter </span>
      <span :class="!showFilters && 'text-blue'" class="z-50"> Sorting </span>
    </div>
  </div>
</template>

