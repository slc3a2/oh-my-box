import Vue from 'vue'
import App from './App.vue'
import FlyBox from '../packages/index.js'
import FlyBoxItem from '../packages/index.js'
Vue.use(FlyBox)
Vue.use(FlyBoxItem)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
