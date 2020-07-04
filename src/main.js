import Vue from 'vue'
// import Vant from 'vant'
import App from './App.vue'
import 'amfe-flexible'
import router from './router'
import './access/iconfont.css'
import axios from 'axios'
// 注册全局组件
import navbar from './components/navbar.vue'
import headtitle from './components/login/head-title.vue'

import Vant from 'vant'
import 'vant/lib/index.css'
import moment from 'moment'

Vue.prototype.$axios = axios
// // 配置axios的默认基准地址
axios.defaults.baseURL = 'http://localhost:3000'
// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = localStorage.getItem('token')

    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function(res) {
    // 对响应数据做点什么
    if (res.data.data.statusCode === 401) {
      if (res.data.data.message === '用户信息验证失败') {
        this.$router.push('/login')
      }
    }
    return res
  },
  function(error) {
    // 对响应错误做点什么
    console.log(error)
    return Promise.reject(error)
  }
)

Vue.use(Vant)
// 注册全局组件
Vue.component('navbar', navbar)
Vue.component('headtitle', headtitle)
// 定义全局过滤器
Vue.filter('time', function(value) {
  return moment(value).format('YYYY-MM-DD')
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
