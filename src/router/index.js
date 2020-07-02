import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../page/login.vue'
import register from '../page/register.vue'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: login },
    { path: '/register', name: 'register', component: register }
  ]
})
export default router
