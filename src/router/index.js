import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    nane: 'login',
    component: () => import(/* webpackChunName: 'login' */'@/views/login/index')
  },
  {
    path: '/',
    component: () => import('@/views/layout/index'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import(/* webpackChunName: 'user' */'@/views/user/index')
      },
      {
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunName: 'role' */'@/views/role/index')
      },
      {
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunName: 'user' */'@/views/user/index')
      },
      {
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunName: 'user' */'@/views/course/index')
      }
    ]
  },
  {
    path: '*',
    name: 'error-page',
    component: () => import('@/views/error-page/index')
  }
]

const router = new VueRouter({
  routes
})

export default router
