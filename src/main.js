import Vue from 'vue'
import App from './App.vue'
import store from './store/index'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';
Vue.use(Vant)
// Vue.use(fs)

// Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
