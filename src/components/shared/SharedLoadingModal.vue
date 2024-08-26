<script>
import IconsLoading from '@/components/icons/IconsLoading.vue'
export default {
  name: 'SharedLoadingModal',
  components: { IconsLoading },
}
</script>

<template>
<div class="fixed inset-0 bg-gray-900 bg-opacity-40 flex items-center justify-center z-50">
  <IconsLoading class="animate-spin w-32 h-32 laptop:w-auto laptop:h-auto mb-44"/>
</div>
</template>
