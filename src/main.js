import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入全局CSS
import '@/assets/css/commond.scss'

// 引入animate动画css
import animated from 'animate.css'
Vue.use(animated)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
