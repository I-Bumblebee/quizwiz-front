<script>
import { Form as ValidationForm } from 'vee-validate'
import * as yup from 'yup'
import { getCsrf } from '@/services/api/auth.js'
import { LOGIN } from '@/store/actions.type.js'
import LayoutAuth from '@/layouts/LayoutAuth.vue'
import BaseInputPassword from '@/components/base/BaseInputPassword.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseInputCheckbox from '@/components/base/BaseInputCheckbox.vue'
import BaseButtonSubmit from '@/components/base/BaseButtonSubmit.vue'
import girlReadingBook from '@/assets/girl_reading_at_window.svg'
import WavingHandIcon from '@/components/icons/IconWavingHand.vue'
import MailboxOpenIcon from '@/components/icons/IconMailboxOpen.vue'

export default {
  name: 'RegisterView',
  components: {
    BaseInput,
    BaseInputPassword,
    ValidationForm,
    LayoutAuth,
    BaseInputCheckbox,
    BaseButtonSubmit,
    WavingHandIcon,
    MailboxOpenIcon,
  },
  data() {
    return {
      girlReadingBook,
      schema: yup.object({
        email: yup.string().required().email().label('Email'),
        password: yup.string().required().min(3).label('Password'),
        remember: yup.boolean(),
      }),
    }
  },
  methods: {
    async onSubmit(credentials) {
      await getCsrf()
      this.$store.dispatch(LOGIN, credentials)
    },
  },
  computed: {
    loginError() {
      return this.$store.getters.getErrors
    },
  },
  watch: {
    loginError() {
      this.$refs.form.setErrors(this.loginError)
    },
  },
}
</script>

<template>
  <LayoutAuth :img="girlReadingBook" extendClass="bg-sand px-24 justify-center">
    <h1 class="-order-2 font-raleway text-lg font-extrabold text-black">
      Hi, Welcome! <WavingHandIcon class="inline-block" />
    </h1>
    <ValidationForm
      ref="form"
      v-slot="{ errors }"
      :validationSchema="schema"
      @submit="onSubmit"
      class="flex w-full flex-col gap-6"
    >
      <BaseInput
        type="email"
        name="email"
        label="Email address"
        placeholder="Your Email"
        :errors="errors.email"
      />
      <BaseInputPassword
        name="password"
        label="Password"
        placeholder="Your Password"
        :errors="errors.password"
      />
      <div class="flex justify-between">
        <BaseInputCheckbox name="remember" label="Remember me" :errors="errors.remember" />
        <RouterLink
          :to="{ name: 'forgot-password' }"
          class="font-inter text-base tracking-wide text-gray-700"
          >Forgot password?</RouterLink
        >
      </div>
      <BaseButtonSubmit class="mt-4">Login</BaseButtonSubmit>
    </ValidationForm>
    <div class="-order-1 mb-4 text-center laptop:order-1">
      <div>
        <p class="mr-1 inline font-inter text-sm text-black text-opacity-70 laptop:text-base">
          Don't have an account?
        </p>
        <RouterLink :to="{ name: 'register' }" class="font-inter text-base font-semibold text-blue">
          Sign up
        </RouterLink>
      </div>
    </div>
    <RouterLink
      :to="{ name: 'verify-email' }"
      class="order-2 mt-4 self-end font-inter text-sm text-black text-opacity-70 laptop:-mt-10 laptop:self-start laptop:text-base"
      >Verify Email!
      <MailboxOpenIcon class="-mt-2 ml-2 inline-block rotate-2" />
    </RouterLink>
  </LayoutAuth>
</template>
