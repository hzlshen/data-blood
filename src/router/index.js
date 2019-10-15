import Vue from 'vue'
import Router from 'vue-router'
import HelloWord from '../components/index'
import TabList from '../page/tabList.vue'


Vue.use(Router)

export default new Router({
    routers: [
        {
            path: '/',
            name: 'TabList',
            component: TabList
        },
        {
            path: '/hello',
            name: 'HelloWord',
            component: HelloWord
        }
    ]
})