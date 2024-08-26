<script>
import SubmitButton from '@/components/SubmitButton.vue'

export default {
  name: 'FilterFooter',
  emits: ['submit', 'close'],
  components: { SubmitButton },
  props: {
    selectedFilterCount: {
      type: Number,
      required: true,
    },
  },
}
</script>

<template>
  <div
    v-if="selectedFilterCount"
    class="fixed bottom-0 left-0 w-full bg-white shadow-4xl laptop:hidden"
  >
    <div class="my-4 flex h-14 w-full gap-3 px-4 font-inter text-md font-semibold">
      <SubmitButton class="h-full w-full text-md" @click="$emit('submit')" />
      <div
        class="flex h-full w-2/3 cursor-pointer items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700"
        @click="$emit('close')"
      >
        Cancel
      </div>
    </div>
  </div>
</template>
