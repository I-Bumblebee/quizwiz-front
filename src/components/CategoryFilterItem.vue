<script>
import { Field } from 'vee-validate'

export default {
  name: 'CategoryFilterItem',
  components: { Field },
  props: {
    category: {
      type: {
        name: String,
        id: Number,
      },
      required: true,
    },
  },
  data() {
    return {
      checked: false,
    }
  },
  mounted() {
    if (this.$refs.checkbox?.value) {
      this.checked = this.$refs.checkbox.value.includes(this.category?.id)
    }
    this.$watch(
      () => this.$refs.checkbox?.value,
      (newVal) => {
        this.checked = newVal && newVal.includes(this.category?.id)
      },
    )
  },
}
</script>

<template>
  <label class="cursor-pointer">
    <Field ref="checkbox" name="category" type="checkbox" :value="category?.id" hidden />
    <span
      class="font-base rounded-3xl px-3.5 py-2.5 font-semibold capitalize"
      :class="checked ? 'bg-black text-white' : 'bg-white text-gray-600'"
    >
      {{ category?.name }}
    </span>
  </label>
</template>
