import request from '@/utils/request'

// 获取所有的广告列表
export const getAdvertisingListInfo = () => {
  return request({
    mehtod: 'GET',
    url: '/front/ad/getAdList'
  })
}

// 获取所有广告位
export const getAdPositionListInfo = () => {
  return request({
    mehtod: 'GET',
    url: '/front/ad/space/getAllSpaces'
  })
}

// 根据Id获取广告位
export const getAdById = id => {
  return request({
    mehtod: 'GET',
    url: '/front/ad/getAdById',
    parmas: {
      id
    }
  })
}
