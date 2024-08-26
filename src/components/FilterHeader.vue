<script>
import IconX from '@/components/icons/IconX.vue'
import SearchIcon from '@/components/icons/IconSearch.vue'
import SubmitButton from '@/components/SubmitButton.vue'
import SharedFilterButton from '@/components/shared/SharedFilterButton.vue'

export default {
  name: 'FilterHeader',
  components: { SharedFilterButton, SubmitButton, SearchIcon, IconX },
  emits: ['submit', 'reset', 'close', 'update:searchParameter'],
  props: {
    selectedFilterCount: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      searchParameter: '',
    }
  },
  methods: {
    emitUpdateSearchParam() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$emit('update:searchParameter', this.searchParameter)
      }, 100)
    },
  },
}
</script>

<template>
  <div
    class="flex flex-col-reverse items-center bg-gray-50 text-base text-gray-500 laptop:flex laptop:flex-row laptop:gap-4 laptop:rounded-xl laptop:px-4 laptop:py-3"
  >
    <SharedFilterButton
      class="hidden py-px invert laptop:flex"
      :hideCounter="true"
      :filterCount="1"
    />
    <div
      class="flex w-full items-center gap-2 border-b border-t border-gray-500 border-opacity-40 bg-white px-4 py-5 laptop:rounded-3xl laptop:border laptop:px-5 laptop:py-1.5"
    >
      <SearchIcon class="stroke-gray-500" />
      <input
        type="text"
        class="w-full outline-none laptop:flex"
        placeholder="Search"
        v-model="searchParameter"
        @input="emitUpdateSearchParam"
      />
    </div>
    <div
      class="flex w-full flex-row items-center justify-between gap-4 px-4 py-6 font-semibold laptop:w-auto laptop:justify-center laptop:p-0 laptop:font-normal"
    >
      <div
        v-if="selectedFilterCount"
        class="hidden items-center gap-4 whitespace-nowrap text-gray-500 laptop:inline-flex"
      >
        <SubmitButton @click="$emit('submit')" />
        |
        <span @click="$emit('reset')" class="cursor-pointer">Reset all filters</span>
      </div>
      <span class="cursor-pointer text-gray-500 laptop:hidden" @click="$emit('reset')">Reset</span>
      <span class="-ml-3 laptop:hidden">FILTERS</span>
      <span class="scale-100 cursor-pointer laptop:-ml-2 laptop:scale-75">
        <IconX class="m-auto fill-gray-500" @click.stop.prevent="$emit('close')" />
      </span>
    </div>
  </div>
</template>
