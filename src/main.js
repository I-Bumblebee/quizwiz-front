import { createApp } from 'vue'
import App from '@/App.vue'
import clickOutside from '@/directives/click-outside.js'
import router from '@/router/index.js'
import store from '@/store/index.js'
import axios from '@/plugins/axios/index.js'
import VueAxios from 'vue-axios'
import '@/main.css'

const app = createApp(App)

app.use(VueAxios, axios)
app.directive('click-outside', clickOutside)
app.use(store)
app.use(router)

app.mount('#app')
