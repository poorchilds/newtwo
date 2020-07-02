import Vue from 'vue'
// import Vant from 'vant'
import App from './App.vue'
import 'amfe-flexible'
import router from './router'
import './access/iconfont.css'
import axios from 'axios'
// import 'vant/lib/index.css'
// Vue.use(Vant)
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.prototype.$axios = axios
// // 配置axios的默认基准地址
axios.defaults.baseURL = 'http://localhost:3000'

// Vue.prototype.$axios = axios
// axios.defaults.baseURL = 'http://localhost:3000'
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
