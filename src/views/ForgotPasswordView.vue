<script>
import { Form as ValidationForm } from 'vee-validate'
import * as yup from 'yup'
import { getCsrf } from '@/services/api/auth.js'
import LayoutAuth from '@/layouts/LayoutAuth.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButtonSubmit from '@/components/base/BaseButtonSubmit.vue'
import girlOnFire from '@/assets/girl-on-fire.svg'
import { sendResetLink } from '@/services/api/password.js'
import router from '@/router/index.js'
import store from '@/store/index.js'
import { NOTIFY } from '@/store/actions.type.js'
import { SET_ERRORS } from '@/store/mutations.type.js'

export default {
  name: 'ForgotPasswordView',
  components: {
    BaseInput,
    ValidationForm,
    LayoutAuth,
    BaseButtonSubmit,
  },
  data() {
    return {
      girlOnFire,
      schema: yup.object({
        email: yup.string().required().email().label('Email'),
      }),
    }
  },
  methods: {
    async onSubmit(credentials) {
      await getCsrf()
      sendResetLink(credentials)
        .then(() => {
          void router.push({ name: 'reset-password' })
          void store.dispatch(NOTIFY, {
            type: 'success',
            title: 'Email sent',
            message: 'Please check your email to reset your password.',
          })
        })
        .catch(({ response }) => {
          store.commit(SET_ERRORS, response.data.errors)
          void store.dispatch(NOTIFY, {
            type: 'error',
            title: 'Error',
            message: 'Please check the form for errors.',
          })
        })
    },
  },
  computed: {
    sendEmailErrors() {
      return this.$store.getters.getErrors
    },
  },
  watch: {
    sendEmailErrors() {
      this.$refs.form.setErrors(this.sendEmailErrors)
    },
  },
}
</script>

<template>
  <LayoutAuth :img="girlOnFire" extendClass="bg-pink px-28 justify-center">
    <h1 class="-order-2 font-raleway text-lg font-extrabold text-black">Forgot password?</h1>
    <p class="text-center text-base font-normal text-gray-600 laptop:-mt-8 laptop:text-start">
      Don’t worry! It happens. Please enter the email associated with your account.
    </p>
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
      <BaseButtonSubmit class="mt-4">Send</BaseButtonSubmit>
    </ValidationForm>
  </LayoutAuth>
</template>
