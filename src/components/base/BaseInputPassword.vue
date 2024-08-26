<script>
import BaseInput from '@/components/base/BaseInput.vue'
import HideIcon from '@/components/icons/IconEyeHide.vue'
import ShowIcon from '@/components/icons/IconEyeShow.vue'
export default {
  name: 'BaseInputPassword',
  components: { HideIcon, ShowIcon, BaseInput },
  props: {
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    errors: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      showPassword: false,
      type: 'password',
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword
      this.type = this.showPassword ? 'text' : 'password'
    },
  },
}
</script>

<template>
  <BaseInput :type="type" :name="name" :label="label" :placeholder="placeholder" :errors="errors">
    <span @click="togglePassword" class="cursor-pointer" v-show="!errors.length">
      <HideIcon v-if="showPassword" class="h-4 fill-gray-400" />
      <ShowIcon v-else class="fill-gray-400" />
    </span>
  </BaseInput>
</template>
