import Vue from 'vue'
import App from './App.vue'
import jsPlumb from 'jsplumb'

Vue.prototype.$jsPlumb = jsPlumb.jsPlumb

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
