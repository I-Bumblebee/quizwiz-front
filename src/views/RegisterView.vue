<script>
import { Form as ValidationForm } from 'vee-validate'
import * as yup from 'yup'
import { getCsrf } from '@/services/api/auth.js'
import { REGISTER } from '@/store/actions.type.js'
import LayoutAuth from '@/layouts/LayoutAuth.vue'
import BaseInputPassword from '@/components/base/BaseInputPassword.vue'
import BaseInput from '@/components/base/BaseInput.vue'
import BaseInputCheckbox from '@/components/base/BaseInputCheckbox.vue'
import BaseButtonSubmit from '@/components/base/BaseButtonSubmit.vue'
import girlScanningPapers from '@/assets/register_bg.svg'

export default {
  name: 'RegisterView',
  components: {
    BaseInput,
    BaseInputPassword,
    ValidationForm,
    LayoutAuth,
    BaseInputCheckbox,
    BaseButtonSubmit,
  },
  data() {
    return {
      girlScanningPapers,
      schema: yup.object({
        name: yup.string().required().min(3).label('Username'),
        email: yup.string().required().email().label('Email'),
        password: yup.string().required().min(3).label('Password'),
        password_confirmation: yup
          .string()
          .oneOf([yup.ref('password'), null], 'Passwords must match')
          .required()
          .label('Confirm Password'),
        accept: yup.boolean().required('You must accept the terms and privacy policy'),
      }),
    }
  },
  methods: {
    async onSubmit(credentials) {
      await getCsrf()
      this.$store.dispatch(REGISTER, credentials)
    },
  },
  computed: {
    registrationError() {
      return this.$store.getters.getErrors
    },
  },
  watch: {
    registrationError() {
      this.$refs.form.setErrors(this.registrationError)
    },
  },
}
</script>

<template>
  <LayoutAuth :img="girlScanningPapers" extendClass="items-start bg-azure bg-opacity-50 pt-12">
    <h1 class="-order-2 font-raleway text-lg font-extrabold text-black">Create account</h1>
    <ValidationForm
      ref="form"
      v-slot="{ errors }"
      :validationSchema="schema"
      @submit="onSubmit"
      class="flex w-full flex-col gap-6"
    >
      <BaseInput
        name="name"
        type="text"
        label="Username"
        placeholder="Your username"
        :errors="errors.name"
      />
      <BaseInput
        name="email"
        label="Email"
        type="email"
        placeholder="Example@gmail.com"
        :errors="errors.email"
      />
      <BaseInputPassword
        name="password"
        label="Create a password"
        placeholder="Must be at least 3 characters long"
        :errors="errors.password"
      />
      <BaseInputPassword
        name="password_confirmation"
        label="Confirm password"
        placeholder="Repeat your password"
        :errors="errors.password_confirmation"
      />
      <BaseInputCheckbox name="accept" label="I accept the terms and privacy policy" />
      <BaseButtonSubmit>Sign Up</BaseButtonSubmit>
    </ValidationForm>
    <div class="-order-1 mb-4 laptop:order-1">
      <p class="mr-1 inline font-inter text-sm text-black text-opacity-70 laptop:text-base">
        Already have an account?
      </p>
      <RouterLink :to="{ name: 'login' }" class="font-inter text-base font-semibold text-blue">
        Login
      </RouterLink>
    </div>
  </LayoutAuth>
</template>
