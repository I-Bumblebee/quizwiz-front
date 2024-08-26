<script>
import QuizInfoItem from '@/components/QuizInfoItem.vue'
import { format } from 'date-fns'
import IconCompleted from '@/components/icons/IconCompleted.vue'
import IconNotCompleted from '@/components/icons/IconNotCompleted.vue'
import IconDifficulty from '@/components/icons/IconDifficulty.vue'
import IconTotalPoints from '@/components/icons/IconTotalPoints.vue'

export default {
  name: 'QuizInfoWidget',
  components: { IconTotalPoints, IconDifficulty, IconNotCompleted, IconCompleted, QuizInfoItem },
  props: {
    hasTaken: {
      type: Boolean,
      required: true,
    },
    completedAt: {
      type: [String, null],
      required: false,
    },
    totalTime: {
      type: [Number, null],
      required: true,
    },
    totalUsers: {
      type: Number,
      required: true,
    },
    difficultyLevel: {
      type: {
        name: String,
        color: String,
      },
      required: true,
    },
    points: {
      type: [Number, null],
      required: true,
    },
    totalPoints: {
      type: Number,
      required: true,
    },
  },
  methods: {
    format(date, formatString = 'dd MMM, yyyy') {
      if (date) {
        return format(new Date(date), formatString)
      } else {
        return ''
      }
    },
  },
}
</script>

<template>
  <div class="flex gap-6">
    <QuizInfoItem :label="hasTaken ? 'Completed at' : 'Not Completed'" :value="format(completedAt)">
      <IconCompleted v-if="hasTaken" />
      <IconNotCompleted v-else />
    </QuizInfoItem>
    <QuizInfoItem label="Total Time" :value="hasTaken && `${Math.floor(totalTime / 60)}Minute`" />
    <QuizInfoItem label="Total Users" :value="totalUsers" />
  </div>
  <div class="flex gap-6">
    <QuizInfoItem label="Difficulty level" :value="difficultyLevel.name">
      <IconDifficulty :color="difficultyLevel.color" />
    </QuizInfoItem>
    <QuizInfoItem v-if="hasTaken" label="Points" :value="`${points}/${totalPoints}`">
      <IconTotalPoints />
    </QuizInfoItem>
  </div>
</template>
