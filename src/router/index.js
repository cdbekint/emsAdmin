import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import Home from '@/components/Main/Home'
import companyAdd from '@/components/System/companyAdd'

Vue.use(Router)
Vue.use(iView)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/companyAdd',
      name: 'companyAdd',
      component: companyAdd,
      meta: {
        requireAuth: true
      }
    }
  ]
})

