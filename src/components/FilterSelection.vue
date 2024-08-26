<script>
import { Form as ValidationForm } from 'vee-validate'

import DifficultyLevelItem from '@/components/DifficultyFilterItem.vue'
import CategoryFilterItem from '@/components/CategoryFilterItem.vue'
import OrderBySelection from '@/components/OrderBySelection.vue'
import FilterSortToggle from '@/components/FilterSortToggle.vue'
import FilterHeader from '@/components/FilterHeader.vue'
import FilterFooter from '@/components/FilterFooter.vue'
import BaseInputCheckbox from '@/components/base/BaseInputCheckbox.vue'
export default {
  name: 'FilterSelection',
  emits: ['close'],
  components: {
    BaseInputCheckbox,
    FilterFooter,
    FilterSortToggle,
    OrderBySelection,
    ValidationForm,
    DifficultyLevelItem,
    CategoryFilterItem,
    FilterHeader,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    difficultyLevels: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    selectedFilterCount: {
      type: Number,
      required: true,
    },
    selectedCategories: {
      type: Array,
      required: true,
    },
    selectedDifficulties: {
      type: Array,
      required: true,
    },
    myQuizzesSelected: {
      type: Boolean,
      required: true,
    },
    notCompletedSelected: {
      type: Boolean,
      required: true,
    },
    selectedOrderBy: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      showFilters: true,
      count: this.selectedFilterCount,
      sortedCategories: this.categories,
      categorySearchParam: '',
    }
  },
  methods: {
    toggleFilters() {
      this.showFilters = !this.showFilters
    },
    onSubmit() {
      const queryParams = Object.entries(this.$refs.form.values).reduce((acc, [key, value]) => {
        if (Array.isArray(value)) {
          if (value.length) {
            acc[key] = value
          }
        } else if (value) {
          acc[key] = value
        }
        return acc
      }, {})

      if (queryParams.orderBy) {
        const { sort, order } = queryParams.orderBy
        queryParams.sort = sort
        queryParams.order = order
        delete queryParams.orderBy
      }

      if (queryParams['my-quizzes']) {
        queryParams['my-quizzes'] = 1
      } else {
        delete queryParams['my-quizzes']
      }

      if (queryParams['not-completed']) {
        queryParams['not-completed'] = 1
      } else {
        delete queryParams['not-completed']
      }

      this.$router.push({ query: queryParams })

      this.$emit('close')
    },
    reset() {
      this.$refs.form.resetForm()
      this.onSubmit()
    },
  },
  mounted() {
    this.$refs.form.setFieldValue('difficulty', this.selectedDifficulties)
    this.$refs.form.setFieldValue('category', this.selectedCategories)
    this.$refs.form.setFieldValue('my-quizzes', this.myQuizzesSelected)
    this.$refs.form.setFieldValue('not-completed', this.notCompletedSelected)
    this.$refs.form.setFieldValue('orderBy', this.selectedOrderBy)

    this.$watch(
      () => this.$refs.form.values,
      (newVal) => {
        this.$nextTick(() => {
          this.count = Object.values(newVal).reduce(
            (acc, curr) => acc + (Array.isArray(curr) ? curr.length : curr ? 1 : 0),
            0,
          )
        })
      },
      { deep: true },
    )
  },
  watch: {
    categorySearchParam(value) {
      this.sortedCategories = this.categories.filter((category) =>
        category.name.toLowerCase().includes(value.toLowerCase()),
      )
    },
  },
}
</script>

<template>
  <div
    class="fixed inset-0 z-50 select-none bg-white laptop:absolute laptop:inset-auto laptop:right-24 laptop:top-10 laptop:flex laptop:w-3/4 laptop:flex-col laptop:gap-2.5 laptop:rounded-xl laptop:border laptop:border-black laptop:p-4"
    v-click-outside="() => $emit('close')"
  >
    <FilterHeader
      :selectedFilterCount="count"
      @close="$emit('close')"
      @submit="onSubmit"
      @toggle:showFilters="toggleFilters"
      @reset="reset"
      @update:searchParameter="categorySearchParam = $event"
    />
    <FilterSortToggle :showFilters="showFilters" @click.prevent.stop="toggleFilters" />
    <ValidationForm
      ref="form"
      @submit="onSubmit"
      class="flex h-full items-stretch gap-2.5 font-inter text-base"
    >
      <div
        class="max-h-xl w-full grow flex-col gap-4 rounded-lg border-gray-300 bg-white p-4 laptop:flex laptop:border"
        :class="showFilters ? 'flex' : 'hidden'"
      >
        <h4 class="text-blue">Filter by</h4>
        <BaseInputCheckbox label="My quizzes" name="my-quizzes" :round="false" />
        <BaseInputCheckbox label="Not completed" name="not-completed" :round="false" />
        <hr />
        <h4 class="text-gray-900">Levels</h4>
        <div class="flex h-auto flex-wrap gap-2 gap-y-7 py-2 laptop:gap-y-3.5">
          <DifficultyLevelItem
            v-for="difficultyLevel in difficultyLevels"
            :difficulty="difficultyLevel"
            :key="difficultyLevel.id"
          />
        </div>
        <hr />
        <h4 class="text-gray-900">Categories</h4>
        <div class="full flex flex-wrap gap-2 gap-y-6 overflow-y-scroll py-2.5">
          <CategoryFilterItem
            v-for="category in sortedCategories"
            :category="category"
            :key="category.id"
          />
        </div>
      </div>
      <OrderBySelection :showOrderBy="!showFilters" />
      <button @click.stop.prevent="onSubmit" hidden ref="submit" />
    </ValidationForm>
    <FilterFooter :selectedFilterCount="count" @close="$emit('close')" @submit="onSubmit" />
  </div>
</template>
