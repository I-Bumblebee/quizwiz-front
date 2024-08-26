<script>
import { Field } from 'vee-validate'
export default {
  name: 'DifficultyLevelItem',
  components: { Field },
  props: {
    difficulty: {
      type: {
        name: String,
        color: String,
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
      this.checked = this.$refs.checkbox.value.includes(this.difficulty?.id)
    }
    this.$watch(
      () => this.$refs.checkbox?.value,
      (newVal) => {
        this.checked = newVal && newVal.includes(this.difficulty?.id)
      },
    )
  },
  methods: {
    faded(hex) {
      if (!hex) return
      let r = parseInt(hex.slice(1, 3), 16),
        g = parseInt(hex.slice(3, 5), 16),
        b = parseInt(hex.slice(5, 7), 16)

      return `rgba(${r},${g},${b},0.1)`
    },
  },
}
</script>

<template>
  <label class="cursor-pointer">
    <Field ref="checkbox" name="difficulty" type="checkbox" :value="difficulty?.id" hidden />
    <span
      class="rounded-2xl px-5 py-3 text-base font-medium capitalize leading-5 laptop:px-3 laptop:py-1.5"
      :style="{
        color: this.checked ? 'white' : this.difficulty?.color,
        backgroundColor: this.checked ? this.difficulty?.color : this.faded(this.difficulty?.color),
      }"
    >
      {{ difficulty?.name }}
    </span>
  </label>
</template>
