<script>
import { fetchQuiz, fetchSimilarQuizzes } from '@/services/api/quiz.js'
import SharedHeader from '@/components/shared/SharedHeader.vue'
import SharedFooter from '@/components/shared/SharedFooter.vue'
import Sidebar from '@/components/SimilarQuizzesSidebar.vue'
import BackIcon from '@/components/icons/IconGoBack.vue'
import SharedQuizCategoryTags from '@/components/shared/SharedQuizCategoryTags.vue'
import IconsClock from '@/components/icons/IconsClock.vue'
import IconsRocket from '@/components/icons/IconsRocket.vue'
import IconsHashtag from '@/components/icons/IconsHashtag.vue'
import IconsDocument from '@/components/icons/IconsDocument.vue'
import SharedLoadingModal from '@/components/shared/SharedLoadingModal.vue'
export default {
  name: 'QuizInnerView',
  components: {
    SharedLoadingModal,
    IconsDocument,
    IconsHashtag,
    IconsRocket,
    IconsClock,
    SharedQuizCategoryTags,
    BackIcon,
    SharedHeader,
    SharedFooter,
    Sidebar,
  },
  data() {
    return {
      quiz: null,
      similarQuizzes: [],
      loadingQuiz: true,
      loadingSimilarQuizzes: true,
    }
  },
  methods: {
    fetchQuizWithSimilarQuizzes() {
      const id = this.$route.params.id
      fetchQuiz(id).then(({ data }) => {
        this.quiz = data
        this.loadingQuiz = false
      })

      fetchSimilarQuizzes(id).then(({ data }) => {
        this.similarQuizzes = data
        this.loadingSimilarQuizzes = false
      })
    },
  },
  watch: {
    $route() {
      this.fetchQuizWithSimilarQuizzes()
    },
  },
  beforeMount() {
    this.fetchQuizWithSimilarQuizzes()
  },
}
</script>

<template>
  <SharedLoadingModal v-show="loadingQuiz || loadingSimilarQuizzes" />
  <SharedHeader :hideSearch="true" />
  <section class="container mb-14 font-inter text-sm laptop:mb-10">
    <div class="my-6 flex cursor-pointer gap-1" @click.stop="$router.back()">
      <BackIcon class="fill-gray-600" />
      <span class="font-inter text-base font-medium leading-4 text-gray-600">Back</span>
    </div>
    <div class="flex gap-10">
      <div v-show="!loadingQuiz && !loadingSimilarQuizzes">
        <div class="flex gap-6">
          <div class="flex max-w-md flex-col gap-4 font-semibold">
            <h1 class="font-raleway text-xl-minus font-bold">{{ quiz?.title }}</h1>
            <SharedQuizCategoryTags
              class="-order-1 laptop:order-none"
              :categories="quiz?.categories"
            />
            <p class="font-base text-gray-500">{{ quiz?.short_info }}</p>
            <img
              :src="quiz?.image"
              alt="cover image"
              class="mb-4 block h-72 w-full rounded-2xl-plus object-cover object-center laptop:hidden"
            />
            <div class="flex flex-col whitespace-nowrap text-gray-500 laptop:flex-row">
              <div class="flex gap-2 px-0 py-4 laptop:py-0 laptop:pr-3">
                <IconsHashtag />
                {{ quiz?.number_of_questions }} Questions
              </div>
              <div
                class="flex items-center gap-2 border-t border-gray-300 px-0 py-4 laptop:border-l laptop:border-t-0 laptop:px-3 laptop:py-0"
              >
                <IconsDocument />
                {{ quiz?.total_points }} Points
              </div>

              <div
                class="flex items-center gap-2 border-t border-gray-300 px-0 py-4 laptop:border-l laptop:border-t-0 laptop:px-3 laptop:py-0"
              >
                <IconsRocket />
                {{ quiz?.users_count }} Plays
              </div>
              <div
                class="flex items-center gap-2 border-t border-gray-300 px-0 py-4 laptop:border-l laptop:border-t-0 laptop:px-3 laptop:py-0"
              >
                <IconsClock />
                {{ quiz?.time_limit_minutes }}m
              </div>
            </div>
            <RouterLink
              :to="{ name: 'take-quiz', params: { id: quiz?.id } }"
              v-if="!quiz?.user.has_taken"
              class="mt-3 box-content block w-full rounded-lg bg-blue py-4 text-center font-inter text-sm font-semibold text-white laptop:mt-6 laptop:w-9/12 laptop:py-3"
            >
              Start Quiz
            </RouterLink>
          </div>
          <img
            :src="quiz?.image"
            alt="cover image"
            class="hidden h-76 w-82 rounded-2xl-plus object-cover object-center laptop:block"
          />
        </div>
        <hr class="my-10 hidden laptop:block" />
        <h3 class="hidden font-semibold laptop:block">Instructions</h3>
        <p class="hidden laptop:block">
          {{ quiz?.description }}
        </p>
      </div>
      <div class="hidden laptop:inline">
        <div v-show="loadingQuiz || loadingSimilarQuizzes" class="min-h-screen-2xl w-96"></div>
        <Sidebar :similarQuizzes="similarQuizzes" />
      </div>
    </div>
  </section>
  <SharedFooter />
</template>
