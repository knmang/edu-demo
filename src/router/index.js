import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunName: 'login' */'@/views/login/index')
  },
  {
    path: '/',
    component: () => import('@/views/layout/index'),
    meta: { requiresAuth: true },
    children: [
      {
        // 主页
        path: '',
        name: 'home',
        component: () => import(/* webpackChunName: 'home' */'@/views/user/index')
      },
      {
        // 角色列表
        path: '/role',
        name: 'role',
        component: () => import(/* webpackChunName: 'role' */'@/views/role/index')
      },
      {
        // 用户列表
        path: '/user',
        name: 'user',
        component: () => import(/* webpackChunName: 'user' */'@/views/user/index')
      },
      {
        // 课程列表
        path: '/course',
        name: 'course',
        component: () => import(/* webpackChunName: 'course' */'@/views/course/index')
      },
      {
        // 课程创建
        path: '/course/create',
        name: 'courseCreate',
        component: () => import(/* webpackChunName: 'courseCreate' */'@/views/course/create')
      },
      {
        // 课程内容
        path: '/course/:courseId/content',
        name: 'courseContent',
        component: () => import(/* webpackChunName: 'courseContent' */'@/views/course/content'),
        props: true
      },
      {
        // 广告列表
        path: '/advertising',
        name: 'advertising',
        component: () => import(/* webpackChunName: 'advertising' */'@/views/advertising/index')
      },
      {
        // 广告位列表
        path: '/adPosition',
        name: 'adPosition',
        component: () => import(/* webpackChunName: 'AdPosition' */'@/views/advertising/adList')
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

router.beforeEach((to, from, next) => {
  // 验证to是不是要身份验证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.user) {
      return next()
    }
    next({
      name: 'login',
      // 记录上次浏览页面
      query: {
        fullpath: to.fullPath
      }
    })
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router
