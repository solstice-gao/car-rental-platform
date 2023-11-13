import App from './App'
import uView from 'uview-ui'
import Vue from 'vue'

Vue.config.productionTip = false
Vue.use(uView)
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
