<script>
import ToastSuccessIcon from '@/components/icons/IconToastSuccess.vue'
import ToastWarningIcon from '@/components/icons/IconToastWarning.vue'
import ToastErrorIcon from '@/components/icons/IconToastError.vue'
export default {
  name: 'ToastNotification',
  components: {
    ToastSuccessIcon,
    ToastWarningIcon,
    ToastErrorIcon,
  },
  computed: {
    toasts() {
      return this.$store.getters.toasts
    },
  },
}
</script>

<template>
  <transition-group
    name="toast"
    tag="div"
    class="fixed left-1/2 top-10 z-50 w-full max-w-xs -translate-x-1/2 laptop:left-auto laptop:right-10 laptop:translate-x-0"
  >
    <div
      v-for="toast in toasts"
      :key="toast.id"
      class="bg-shark flex flex-col overflow-hidden rounded-lg"
    >
      <div class="flex w-full items-center gap-4 px-5 py-4">
        <ToastSuccessIcon v-if="toast.type === 'success'" class="drop-shadow-success h-10 w-10" />
        <ToastWarningIcon v-if="toast.type === 'warning'" class="drop-shadow-warning h-10 w-10" />
        <ToastErrorIcon v-if="toast.type === 'error'" class="drop-shadow-error h-10 w-10" />
        <div class="text-white">
          <p class="font-raleway text-sm font-bold">{{ toast.title }}</p>
          <p class="font-inter text-base">{{ toast.message }}</p>
        </div>
      </div>
      <div
        class="animate-width h-1 w-full"
        :class="
          toast.type === 'success'
            ? 'bg-green'
            : toast.type === 'warning'
              ? 'bg-gold'
              : 'bg-crimson'
        "
      ></div>
    </div>
  </transition-group>
</template>

<style scoped>
.toast-leave-active {
  transition: all 0.5s ease;
}
.toast-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@keyframes width-to-zero {
  to {
    width: 0;
  }
}

.animate-width {
  animation: width-to-zero 1s ease-in-out forwards;
  animation-fill-mode: forwards;
}
</style>
