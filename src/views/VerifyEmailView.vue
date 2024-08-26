<script>
import { Form as ValidationForm } from 'vee-validate'
import * as yup from 'yup'
import { getCsrf } from '@/services/api/auth.js'
import { sendVerificationEmail, verifyEmail } from '@/services/api/email.js'
import LayoutAuth from '@/layouts/LayoutAuth.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseButtonSubmit from '@/components/base/BaseButtonSubmit.vue'
import MailboxOpenIcon from '@/components/icons/IconMailboxOpen.vue'
import girOnFire from '@/assets/girl-on-fire.svg'
import store from '@/store/index.js'
import { NOTIFY } from '@/store/actions.type.js'
import router from '@/router/index.js'
import { SET_ERRORS } from '@/store/mutations.type.js'

export default {
  name: 'VerifyEmailView',
  components: {
    BaseInput,
    ValidationForm,
    LayoutAuth,
    BaseButtonSubmit,
    MailboxOpenIcon,
  },
  data() {
    return {
      girOnFire,
      schema: yup.object({
        email: yup.string().required().email().label('Email'),
      }),
      user: this.$route.query.user,
      hash: this.$route.query.hash,
      expires: this.$route.query.expires,
      signature: this.$route.query.signature,
    }
  },
  methods: {
    async onSubmit(credentials) {
      await getCsrf()
      sendVerificationEmail(credentials)
        .then(() => {
          void store.dispatch(NOTIFY, {
            type: 'success',
            title: 'Email sent',
            message: 'Please check your email to verify your account.',
          })
          void router.push({ name: 'login' })
        })
        .catch(({ response }) => {
          void store.dispatch(NOTIFY, {
            type: 'error',
            title: 'Email not sent',
            message: 'Please try again later.',
          })
          store.commit(SET_ERRORS, response.data.errors)
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
  async mounted() {
    if (this.user && this.hash && this.expires && this.signature) {
      await getCsrf()
      verifyEmail({
        user: this.user,
        hash: this.hash,
        expires: this.expires,
        signature: this.signature,
      })
        .then(() => {
          void router.push({ name: 'login' })
          void store.dispatch(NOTIFY, {
            type: 'success',
            title: 'Email verified',
            message: 'You can now login.',
          })
        })
        .catch(() => {
          void store.dispatch(NOTIFY, {
            type: 'warning',
            title: 'Token expired',
            message: 'Your email verification token has expired please try again',
          })
        })
    }
  },
}
</script>

<template>
  <LayoutAuth :img="girOnFire" extendClass="bg-pink px-28 justify-center">
    <h1 class="-order-2 font-raleway text-lg font-extrabold text-black">
      Verify Email
      <MailboxOpenIcon class="mb-2 ml-4 inline-block rotate-2" />
    </h1>
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
