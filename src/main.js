import Vue from 'vue'
import App from './App.vue'
import jsPlumb from 'jsplumb'
import router from './router/index'

Vue.prototype.$jsPlumb = jsPlumb.jsPlumb

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
