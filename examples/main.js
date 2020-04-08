import Vue from 'vue'
import App from './App.vue'
import OhMyBox from '../packages/index.js'
import OhMyBoxItem from '../packages/index.js'

Vue.use(OhMyBox)
Vue.use(OhMyBoxItem)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
