<script>
import { getContactInfo } from '@/services/api/contact-info.js'
import TitleIcon from '@/components/icons/IconTitle.vue'
export default {
  name: 'SharedFooter',
  components: { TitleIcon },
  data() {
    return {
      contactInfo: {
        email: '',
        telephone_number: '',
        facebook: '',
        linkedin: '',
      },
    }
  },
  beforeMount() {
    getContactInfo().then(({ data }) => {
      this.contactInfo = data
    })
  },
}
</script>

<template>
  <hr class="border-t border-gray-300" />
  <footer class="container relative flex flex-col px-10 laptop:px-24">
    <div class="flex flex-col gap-12 py-8 laptop:flex-row laptop:gap-28">
      <div class="-mb-6 border-b border-gray-200 pb-7 laptop:border-none">
        <RouterLink :to="{ name: 'home' }">
          <TitleIcon />
        </RouterLink>
      </div>
      <div class="flex flex-col gap-6">
        <h3 class="font-inter text-base font-semibold text-gray-900">Content</h3>
        <RouterLink :to="{ name: 'quizzes' }" class="font-inter text-xs text-gray-600">
          Quizzes
        </RouterLink>
      </div>
      <div class="flex flex-col gap-6">
        <h3 class="font-inter text-base font-semibold text-gray-900">Contact Us</h3>
        <p class="font-inter text-xs text-gray-600">Email: {{ contactInfo.email }}</p>
        <p class="font-inter text-xs text-gray-600">Tel: {{ contactInfo.telephone_number }}</p>
      </div>
      <div class="flex flex-col gap-6">
        <h3 class="font-inter text-base font-semibold text-gray-900">Social media</h3>
        <a :href="contactInfo.facebook" target="_blank" class="font-inter text-xs text-gray-600">
          Facebook</a
        >
        <a :href="contactInfo.linkedin" target="_blank" class="font-inter text-xs text-gray-600">
          LinkedIn</a
        >
      </div>
    </div>
    <div class="flex flex-col py-8 laptop:flex-row-reverse">
      <hr class="absolute bottom-20 left-0 w-full border-t border-gray-200" />
      <p class="font-inter text-xs text-gray-500">© 2021 QuizWiz. All rights reserved.</p>
    </div>
  </footer>
</template>
