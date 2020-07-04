import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../page/login.vue'
import register from '../page/register.vue'
import user from '../page/user.vue'
import editdata from '../page/editdata.vue'

// 这段代码是为了解决router重复跳转到（路由）一个地址报promise错误
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login', name: 'login', component: login },
    { path: '/register', name: 'register', component: register },
    // user路由
    { path: '/user', name: 'user', component: user },
    { path: '/editdata', name: 'editdata', component: editdata }
  ]
})
const rout = ['/user']
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (rout.includes(to.fullPath)) {
    if (token) {
      next()
    } else {
      router.push('/login')
    }
  } else {
    next()
  }
})
export default router
