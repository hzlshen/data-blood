import Vue from 'vue'
import App from './App'
import iview from 'iview'  //引入iview
import  router from './router/index'
import 'iview/dist/styles/iview.css'//引入iview的css文件
import store from './store'//引入store状态管理

Vue.config.productionTip = false

Vue.use(iview)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
