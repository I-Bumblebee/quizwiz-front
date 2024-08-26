<script>
import TitleIcon from '@/components/icons/IconTitle.vue'
import BackIcon from '@/components/icons/IconGoBack.vue'

export default {
  name: 'LayoutAuth',
  components: { TitleIcon, BackIcon },
  props: {
    img: {
      type: String,
      required: true,
    },
    extendClass: {
      type: String,
      default: '',
      required: true,
    },
  },
}
</script>

<template>
  <div class="container relative flex p-0">
    <RouterLink :to="{ name: 'home' }" class="absolute left-10 top-10 hidden laptop:block">
      <TitleIcon />
    </RouterLink>
    <div class="hidden h-screen max-w-2xl flex-grow flex-col laptop:flex" :class="extendClass">
      <img :src="img" alt="scanning" />
    </div>
    <div
      class="mt-20 flex grow flex-col items-center gap-6 px-5 laptop:ml-20 laptop:mt-28 laptop:max-w-md laptop:items-start laptop:gap-10 laptop:px-0"
    >
      <slot />
    </div>
    <div
      class="absolute left-5 top-6 flex cursor-pointer gap-1 laptop:left-1/2 laptop:top-11"
      @click.stop="$router.back()"
    >
      <BackIcon class="fill-gray-500" />
      <span class="font-inter text-base font-medium leading-4 text-gray-500">Back</span>
    </div>
  </div>
</template>
