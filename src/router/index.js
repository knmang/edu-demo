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
        name: 'home'
        // component: Home,
      },
      {
        path: '/'
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
