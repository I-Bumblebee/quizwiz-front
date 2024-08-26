<script>
import IconsGreenCheckmark from '@/components/icons/IconsGreenCheckmark.vue'
import { Field } from 'vee-validate'
export default {
  name: 'BaseOrderByCheckbox',
  components: { Field, IconsGreenCheckmark },
  props: {
    value: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      id: `${this.value.sort}/${this.value.order}`,
      checked: false,
    }
  },
  methods: {
    reset() {
      if (this.checked) {
        this.$refs.radio?.reset()
      }
    },
  },
  mounted() {
    this.checked = JSON.stringify(this.$refs.radio.value) === JSON.stringify(this.value)
    this.$watch(
      () => this.$refs.radio?.value,
      (newVal) => {
        this.checked = JSON.stringify(newVal) === JSON.stringify(this.value)
      },
    )
  },
}
</script>

<template>
  <label
    class="Capitalize relative flex w-full cursor-pointer items-center gap-2 rounded-lg px-3 py-2"
    :class="checked ? 'bg-gray-100' : 'bg-white'"
  >
    <slot />
    <span>{{ label }}</span>
    <IconsGreenCheckmark v-if="checked" class="absolute right-3 top-auto" />
    <Field ref="radio" name="orderBy" type="radio" :value="value" hidden @click="reset" />
  </label>
</template>
