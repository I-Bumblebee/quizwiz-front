<script>
import { Form as ValidationForm } from 'vee-validate'
import * as yup from 'yup'
import { getCsrf } from '@/services/api/auth.js'
import LayoutAuth from '@/layouts/LayoutAuth.vue'
import BaseButtonSubmit from '@/components/base/BaseButtonSubmit.vue'
import girlOnFire from '@/assets/girl-on-fire.svg'
import { resetPassword } from '@/services/api/password.js'
import BaseInputPassword from '@/components/base/BaseInputPassword.vue'
import router from '@/router/index.js'
import store from '@/store/index.js'
import { NOTIFY } from '@/store/actions.type.js'
import { SET_ERRORS } from '@/store/mutations.type.js'

export default {
  name: 'ResetPasswordView',
  components: {
    BaseInputPassword,
    ValidationForm,
    LayoutAuth,
    BaseButtonSubmit,
  },
  data() {
    return {
      girlOnFire,
      email: this.$route.query.email,
      token: this.$route.query.token,
      schema: yup.object({
        password: yup.string().required().min(3).label('Password'),
        password_confirmation: yup
          .string()
          .oneOf([yup.ref('password'), null], 'Passwords must match')
          .required()
          .label('Confirm Password'),
      }),
    }
  },
  methods: {
    async onSubmit(credentials) {
      await getCsrf()
      resetPassword({ ...credentials, email: this.email, token: this.token })
        .then(() => {
          void router.push({ name: 'login' })
          void store.dispatch(NOTIFY, {
            type: 'success',
            title: 'Password reset',
            message: 'You can now login with your new password.',
          })
        })
        .catch(({ response }) => {
          store.commit(SET_ERRORS, response.data.errors)
          void store.dispatch(NOTIFY, {
            type: 'error',
            title: 'Token expired',
            message: 'Please request a new password reset link.',
          })
        })
    },
  },
  computed: {
    resetPasswordErrors() {
      return this.$store.getters.getErrors
    },
  },
  watch: {
    resetPasswordErrors() {
      this.$refs.form.setErrors(this.resetPasswordErrors)
    },
  },
}
</script>

<template>
  <LayoutAuth :img="girlOnFire" extendClass="bg-pink px-28 justify-center">
    <h1 class="-order-2 font-raleway text-lg font-extrabold text-black">Reset password</h1>
    <p class="text-center text-base font-normal text-gray-600 laptop:-mt-8 laptop:text-start">
      Please type something you’ll remember
    </p>
    <ValidationForm
      ref="form"
      v-slot="{ errors }"
      :validationSchema="schema"
      @submit="onSubmit"
      class="flex w-full flex-col gap-6"
    >
      <BaseInputPassword
        name="password"
        label="New password"
        placeholder="Must be at least 3 characters long"
        :errors="errors.password"
      />
      <BaseInputPassword
        name="password_confirmation"
        label="Confirm password"
        placeholder="Repeat your password"
        :errors="errors.password_confirmation"
      />
      <BaseButtonSubmit class="mt-4">Reset password</BaseButtonSubmit>
    </ValidationForm>
    <div class="mb-4 hidden laptop:block">
      <p class="mr-1 inline font-inter text-sm text-black text-opacity-70 laptop:text-base">
        Already have an account?
      </p>
      <RouterLink :to="{ name: 'login' }" class="font-inter text-base font-semibold text-blue">
        Login
      </RouterLink>
    </div>
  </LayoutAuth>
</template>
