import request from '@/utils/request'
import qs from 'qs'

// 用户登录
export const login = data => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}

// 用户基本信息
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}

// 所有用户角色的信息
export const getAllUserInfo = data => {
  return request({
    method: 'POST',
    url: '/boss/user/getUserPages',
    data
  })
}
