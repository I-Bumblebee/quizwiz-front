<script>
import SharedHeader from '@/components/shared/SharedHeader.vue'
import SharedFooter from '@/components/shared/SharedFooter.vue'
import { fetchQuizzes, fetchCategories, fetchDifficultyLevels } from '@/services/api/quiz.js'
import SharedQuizCard from '@/components/shared/SharedQuizCard.vue'
import CategorySelectionRow from '@/components/CategorySelectionRow.vue'
import SharedFilterButton from '@/components/shared/SharedFilterButton.vue'
import FilterSelection from '@/components/FilterSelection.vue'
import IconsLoadMore from '@/components/icons/IconsLoadMore.vue'
import SharedLoadingModal from '@/components/shared/SharedLoadingModal.vue'
export default {
  name: 'QuizListingView',
  components: {
    SharedLoadingModal,
    IconsLoadMore,
    FilterSelection,
    SharedHeader,
    SharedFooter,
    SharedQuizCard,
    CategorySelectionRow,
    SharedFilterButton,
  },
  data() {
    return {
      page: 1,
      searchParameter: '',
      isFilterOpen: false,
      loading: true,
      lastPage: 1,
      quizzes: [],
      categories: [],
      difficulties: [],
      selectedFilters: {
        categories: [],
        difficulties: [],
        myQuizzes: [],
        notCompleted: [],
        sort: [],
      },
    }
  },
  watch: {
    searchParameter(value) {
      let query = { ...this.$route.query, search: value }
      this.$router.push({ query })
    },
    $route: {
      handler() {
        this.loading = true
        this.page = 1
        this.updateSelectedFilters()
        fetchQuizzes(this.page, this.$route.query)
          .then(({ data }) => {
            this.quizzes = []
            this.$nextTick(() => {
              this.quizzes = data.data
              this.lastPage = data.meta.last_page
            })
          })
          .finally(() => (this.loading = false))
      },
      deep: true,
    },
    page(nextPage) {
      if (nextPage > 1 && nextPage <= this.lastPage) {
        this.loading = true
        fetchQuizzes(nextPage, this.$route.query)
          .then(({ data }) => {
            this.quizzes.push(...data.data)
            this.lastPage = data.meta.last_page
          })
          .finally(() => (this.loading = false))
      }
    },
    isFilterOpen(value) {
      document.body.style.overflow = value ? 'hidden' : 'auto'
    },
  },
  computed: {
    onLastPage() {
      return this.page === this.lastPage
    },
  },
  methods: {
    updateSelectedFilters() {
      this.selectedFilters = {
        categories: [this.$route.query.category].flat().filter(Boolean).map(Number),
        difficulties: [this.$route.query['difficulty']].flat().filter(Boolean).map(Number),
        myQuizzes: !!+this.$route.query['my-quizzes'],
        notCompleted: !!+this.$route.query['not-completed'],
      }
      const sort = this.$route.query.sort
      const order = this.$route.query.order
      if (sort && order) {
        this.selectedFilters.orderBy = { sort, order }
      }
    },
    selectedFiltersCount() {
      return Object.values(this.selectedFilters).reduce(
        (acc, curr) => acc + (Array.isArray(curr) ? curr.length : curr ? 1 : 0),
        0,
      )
    },
  },
  beforeMount() {
    this.updateSelectedFilters()
    Promise.all([
      fetchQuizzes(this.page, this.$route.query),
      fetchCategories(),
      fetchDifficultyLevels(),
    ])
      .then(([quizzesData, categoriesData, difficultiesData]) => {
        console.log('quizzesData', quizzesData)
        this.quizzes = quizzesData.data.data
        this.lastPage = quizzesData.data.meta.last_page
        this.categories.push(...categoriesData.data)
        this.difficulties.push(...difficultiesData.data)
        this.loading = false
      })
      .finally(() => (this.loading = false))
  },
}
</script>

<template>
  <SharedHeader v-model:searchParameter="searchParameter" :active="true" />
  <div v-if="loading" class="h-screen"></div>
  <SharedLoadingModal v-if="loading" />
  <section v-else class="container">
    <div
      class="mb-10 mt-6 flex flex-col items-start justify-between gap-y-4 laptop:flex-row laptop:items-center"
    >
      <CategorySelectionRow
        :categoryProps="categories"
        :selectedCategories="selectedFilters.categories"
        class="mr-10"
      />
      <SharedFilterButton
        :filterCount="selectedFiltersCount()"
        @click.stop="isFilterOpen = true"
        class="cursor-pointer select-none"
      />
      <FilterSelection
        @close="isFilterOpen = false"
        v-if="isFilterOpen"
        :categories="categories"
        :difficultyLevels="difficulties"
        :isOpen="isFilterOpen"
        :selectedFilterCount="selectedFiltersCount()"
        :selectedCategories="selectedFilters.categories"
        :selectedDifficulties="selectedFilters.difficulties"
        :myQuizzesSelected="selectedFilters.myQuizzes"
        :notCompletedSelected="selectedFilters.notCompleted"
        :selectedOrderBy="selectedFilters.orderBy"
      />
    </div>
    <div class="grid grid-cols-1 gap-8 laptop:grid-cols-3">
      <SharedQuizCard v-for="quiz in quizzes" :key="quiz.id" :quiz="quiz" />
    </div>
    <div v-if="!onLastPage" class="flex cursor-pointer justify-center" @click="page += 1">
      <div
        class="mb-16 mt-10 inline-flex items-center gap-2.5 rounded-md-plus bg-gray-100 px-6 py-3 font-inter text-sm font-semibold text-blue"
      >
        <IconsLoadMore />
        Load More
      </div>
    </div>
    <div v-else class="h-20"></div>
  </section>
  <SharedFooter />
</template>
