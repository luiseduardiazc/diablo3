// npm packages
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

// local
import App from './App.vue'
import router from './router'
import store from './store'

// Bootstrap config
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Use BootstrapVue
Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
