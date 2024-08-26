<script>
import SharedHeader from '@/components/shared/SharedHeader.vue'
import SharedFooter from '@/components/shared/SharedFooter.vue'
import landingPageLogo from '@/assets/landing_page_logo.svg'
import missionStatementSmall from '@/assets/mission_statement_sm.svg'
import girlReadingBookDesktop from '@/assets/girl_reading_book_desktop.svg'
import girReadingBookMobile from '@/assets/girl_reading_book_mobile.svg'
import ArrowIcon from '@/components/icons/IconArrow.vue'
export default {
  name: 'HomeView',
  components: {
    ArrowIcon,
    SharedHeader,
    SharedFooter,
  },
  data() {
    return {
      landingPageLogo,
      missionStatementSmall,
      girlReadingBookDesktop,
      girReadingBookMobile,
    }
  },
}
</script>

<template>
  <SharedHeader :hideSearch="true"/>
  <section class="container p-0 font-raleway font-black text-white">
    <div class="relative flex flex-col overflow-x-hidden overflow-y-hidden">
      <div class="px-12 pb-4 pt-7 laptop:pb-28 laptop:pl-24">
        <img :src="landingPageLogo" alt="quizwiz logo" />
      </div>
      <div class="relative -z-10 -mb-32 laptop:hidden">
        <img :src="girReadingBookMobile" alt="girl reading book" />
        <img :src="missionStatementSmall" alt="mission statement" class="absolute left-12 top-56" />
      </div>
      <div
        class="flex flex-col justify-center gap-4 bg-orange px-12 py-20  laptop:py-16 laptop:pl-24"
      >
        <span class="text-2xl">200+</span>
        <span class="text-xl underline decoration-white decoration-2 laptop:no-underline">
          Quiz games
          <ArrowIcon class="ml-5 inline-block stroke-white laptop:hidden" />
        </span>
      </div>
      <div
        class="flex flex-col justify-center gap-6 bg-blue px-12 py-11 laptop:pl-24"
      >
        <span class="text-2xl">25+</span>
        <span class="w-full text-xl underline decoration-white decoration-2 laptop:no-underline">
          Different
          <ArrowIcon class="ml-10 inline-block stroke-white laptop:hidden" />
          genre
        </span>
      </div>
      <img
        :src="girlReadingBookDesktop"
        alt=""
        class="absolute -bottom-64 right-0 hidden laptop:block"
      />
    </div>
  </section>
  <SharedFooter />
</template>
