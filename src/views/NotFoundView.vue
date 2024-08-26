<script>
import RouteNotFoundImage from '@/assets/route_not_found.svg'
import SharedHeader from '@/components/shared/SharedHeader.vue'
import SharedFooter from '@/components/shared/SharedFooter.vue'
import IconsCurvedArrow from '@/components/icons/IconsCurvedArrow.vue'
export default {
  name: 'NotFoundView',
  components: { IconsCurvedArrow, SharedFooter, SharedHeader },
  data() {
    return {
      RouteNotFoundImage,
    }
  },
}
</script>

<template>
  <SharedHeader :hideSearch="true" />
  <section class="container flex items-center justify-center px-14 laptop:px-0">
    <div class="flex flex-col items-center py-14">
      <h1 class="mb-4 text-center font-raleway text-xl-minus font-black laptop:text-xl-plus">
        Oops!
      </h1>
      <p class="mb-14 font-inter text-md font-bold">Error 404</p>
      <img :src="RouteNotFoundImage" alt="Route not found" />
      <RouterLink :to="{ name: 'home' }" class="mt-11 flex gap-2.5 p-2.5">
        <IconsCurvedArrow />
        <span class="text-md text-blue">Go Home</span>
      </RouterLink>
    </div>
  </section>
  <SharedFooter />
</template>
