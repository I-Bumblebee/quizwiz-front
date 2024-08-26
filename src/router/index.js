import { createRouter, createWebHistory } from 'vue-router'
import { guestGuard } from '@/router/guard.js'

import Register from '@/views/RegisterView.vue'
import Login from '@/views/LoginView.vue'
import ForgotPassword from '@/views/ForgotPasswordView.vue'
import ResetPassword from '@/views/ResetPasswordView.vue'
import VerifyEmail from '@/views/VerifyEmailView.vue'
import Home from '@/views/HomeView.vue'
import QuizListing from '@/views/QuizListingView.vue'
import QuizInnerView from '@/views/QuizInnerView.vue'
import QuizTakeView from '@/views/QuizTakeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'

const routes = [
  {
    path: '/register',
    name: 'register',
    component: Register,
    beforeEnter: guestGuard,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    beforeEnter: guestGuard,
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: ResetPassword,
    beforeEnter: guestGuard,
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: ForgotPassword,
    beforeEnter: guestGuard,
  },
  {
    path: '/verify-email',
    name: 'verify-email',
    component: VerifyEmail,
    beforeEnter: guestGuard,
  },
  {
    path: '/quizzes',
    name: 'quizzes',
    component: QuizListing,
  },
  {
    path: '/quizzes/:id',
    name: 'quiz',
    component: QuizInnerView,
  },
  {
    path: '/take-quiz/:id',
    name: 'take-quiz',
    component: QuizTakeView,
  },
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/server-error',
    name: 'server-error',
    component: () => import('@/views/ServerErrorView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
