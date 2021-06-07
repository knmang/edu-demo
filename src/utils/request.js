import axios from 'axios'

const request = axios.create({})

// 判断地址前缀
function getBaseUrl (url) {
  if (url.startsWith('/boss')) {
    return 'http://eduboss.lagou.com'
  } else {
    return 'http://edufront.lagou.com'
  }
}

// 请求拦截器，在发送请求前匹配相应前缀网址
request.interceptors.request.use(function (config) {
  config.baseURL = getBaseUrl(config.url)
  return config
}, function (error) {
  return Promise.reject(error)
})

export default request
