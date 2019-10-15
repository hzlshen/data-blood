import Vue from 'vue'
import App from './App.vue'
import jsPlumb from 'jsplumb'
import router from './router/index'
import Elementui from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'//引入css
Vue.use(Elementui)
Vue.prototype.$http = axios;
Vue.prototype.$jsPlumb = jsPlumb.jsPlumb

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
