import Vue from 'vue'
import Router from 'vue-router'
import HelloWord from '../components/HelloWorld'


Vue.use(Router)

export default new Router({
    routers: [
        {
            path: '/',
            name: 'HelloWord',
            component: HelloWord
        }
    ]
})