import Vue from 'vue'
import Router from 'vue-router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

import Home from '@/components/Main/Home'
import login from '@/Login.vue'
import companyAdd from '@/components/System/companyAdd'
import companyList from '@/components/System/companyList'
import staffList from '@/components/System/staffList'

import systemLog from '@/components/Log/systemLog'
import mobileLog from '@/components/Log/mobileLog'
import android from '@/components/Log/android'
import androidUpdate from '@/components/Log/androidUpdate'

import menuGroupList from '@/components/Menu/menuGroupList'
import menuGroupAdd from '@/components/Menu/menuGroupAdd'
import menuGroupEdit from '@/components/Menu/menuGroupEdit'

import menuList from '@/components/Menu/menuList'
import menuAdd from '@/components/Menu/menuAdd'
import menuEdit from '@/components/Menu/menuEdit'

Vue.use(Router)
Vue.use(iView)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      // redirect: '/companyList',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/staffList',
      name: 'staffList',
      component: staffList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/companyList',
      name: 'companyList',
      component: companyList,
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
    },
    {
      path: '/menuList',
      name: 'menuList',
      component: menuList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/menuAdd',
      name: 'menuAdd',
      component: menuAdd,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/menuEdit',
      name: 'menuEdit',
      component: menuEdit,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/menuGroupList',
      name: 'menuGroupList',
      component: menuGroupList,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/menuGroupAdd',
      name: 'menuGroupAdd',
      component: menuGroupAdd,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/menuGroupEdit',
      name: 'menuGroupEdit',
      component: menuGroupEdit,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/android',
      name: 'android',
      component: android,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/androidUpdate',
      name: 'androidUpdate',
      component: androidUpdate,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/mobileLog',
      name: 'mobileLog',
      component: mobileLog,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/systemLog',
      name: 'systemLog',
      component: systemLog,
      meta: {
        requireAuth: true
      }
    }
  ]
})

