<script>
import OrderByCheckbox from '@/components/base/BaseOrderByCheckbox.vue'
import IconsArrowDiag from '@/components/icons/IconsArrowDiag.vue'
import IconArrowUp from '@/components/icons/IconArrowUp.vue'
import IconDiamond from '@/components/icons/IconDiamond.vue'

export default {
  name: 'OrderBySelection',
  emits: ['update:count'],
  components: { OrderByCheckbox, IconsArrowDiag, IconArrowUp, IconDiamond },
  props: {
    showOrderBy: {
      type: Boolean,
      required: true,
    },
  },
}
</script>

<template>
  <div
    class="w-full flex-col gap-4 rounded-lg border-gray-300 bg-white p-4 laptop:flex laptop:max-w-sm laptop:border"
    :class="showOrderBy ? 'flex' : 'hidden'"
  >
    <h4 class="text-blue">Sort by</h4>
    <div class="flex flex-col gap-2">
      <OrderByCheckbox label="A-Z" :value="{ sort: 'title', order: 'asc' }">
        <IconArrowUp />
      </OrderByCheckbox>
      <OrderByCheckbox label="Z-A" :value="{ sort: 'title', order: 'desc' }">
        <IconArrowUp class="rotate-180" />
      </OrderByCheckbox>
      <OrderByCheckbox label="Most popular" :value="{ sort: 'users_count', order: 'desc' }">
        <IconDiamond />
      </OrderByCheckbox>
      <OrderByCheckbox label="Newest" :value="{ sort: 'created_at', order: 'desc' }">
        <IconsArrowDiag />
      </OrderByCheckbox>
      <OrderByCheckbox label="Oldest" :value="{ sort: 'created_at', order: 'asc' }">
        <IconsArrowDiag class="rotate-180" />
      </OrderByCheckbox>
    </div>
  </div>
</template>
