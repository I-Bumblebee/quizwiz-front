<script>
import IconSettings from '@/components/icons/IconSettings.vue'
export default {
  name: 'SharedFilterButton',
  components: {
    IconSettings,
  },
  props: {
    filterCount: {
      type: Number,
      required: true,
    },
    hideCounter: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<template>
  <div
    class="relative box-content inline-flex h-9 items-center gap-2 rounded-xl bg-white px-3.5"
    :class="
      filterCount
        ? ' m-0 border-2 border-black text-black'
        : ' m-px border border-gray-500 border-opacity-60 text-gray-500'
    "
  >
    <IconSettings class="scale-115" :class="filterCount ? 'fill-black' : 'fill-gray-500'" />
    <span class="font-inter text-base leading-4">Filter</span>
    <span
      v-if="filterCount && !hideCounter"
      class="leading-2.5 absolute right-0 top-0 inline-flex h-5 w-5 -translate-y-1/3 translate-x-1/3 items-center justify-center rounded-full border-2 border-white bg-black text-center font-inter text-xs font-extrabold text-white"
    >
      {{ filterCount }}
    </span>
  </div>
</template>
