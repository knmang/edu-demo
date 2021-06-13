import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const request = axios.create({})

// 判断地址前缀
function getBaseUrl (url) {
  if (url.startsWith('/boss')) {
    return 'http://eduboss.lagou.com'
  } else {
    return 'http://edufront.lagou.com'
  }
}

// 请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求前判断匹配相应前缀网址
  config.baseURL = getBaseUrl(config.url)
  // 统一设置Token
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 跳转登录页
function toLogin () {
  router.push({
    name: 'login',
    query: {
      fullPath: router.currentRoute.fullPath
    }
  })
}

// 401错误Token处理方法
let isRefresh = false
// 存储token刷新时被挂起的请求
let resList = []
function refresh (error) {
  // 没有Token
  if (!store.state.user) {
    console.log(0)
    toLogin()
  }
  // Token过期
  if (isRefresh) {
    return resList.push(() => {
      request(error.config)
    })
  }
  isRefresh = true
  return request({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  }).then(res => {
    console.log(res.data)
    if (res.data.state === 1) {
      // 存储新的token
      store.commit('saveUser', res.data.content)
      // 重新发送之前的请求
      resList.forEach(callback => callback())
      resList = []
      // 重新发送本次请求
      return request(error.config)
    } else {
      toLogin()
    }
  }).catch(error => { console.log(error) }).finally(() => { isRefresh = false })
}

// 响应拦截器
request.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response
}, function (error) {
  // 请求成功，但状态码错误情况
  if (error.response) {
    const { status } = error.response
    let errorMessage = ''
    switch (status) {
      case 400: errorMessage = '请求参数无效'
        break
      case 401: refresh(error)
        break
      case 403: errorMessage = '没有权限，请联系管理员'
        break
      case 404: errorMessage = '请求资源不存在'
        break
      default: errorMessage = '服务端错误，请联系管理员'
    }
    if (status !== 401) {
      Message.error(errorMessage)
    }
  }
  return Promise.reject(error)
})

export default request
