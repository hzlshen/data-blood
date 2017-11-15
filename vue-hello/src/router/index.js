import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Home from '../components/Hone.vue'
import List from '../components/List.vue'
import Manger from '../components/Manger.vue';
import Update from '../components/Update'
import Add from '../components/Add.vue'
import Delete from '../components/Delete.vue'
import Detail from '../components/Detail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',  //主路由
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Home',  //主路由
      name: 'Home',
      component: Home
    },
    {
      path: '/List',
      name: 'List',
      component: List
    },
    {
      path: '/Manger',
      name: 'Manger',
      component: Manger,
      children:[
        {
          path:'/Add',
          name:'Add',
          component:'Add'
        },
        {
          path: '/Update',
          name: 'Update',
          component: Update
        },
        {
          path:'/Delete',
          name:'Delete',
          component:'Delete'
        }
      ]
    },
    {
      path:'/Detail',
      name:'Detail',
      component:'Detail'
    }

  ]
})
