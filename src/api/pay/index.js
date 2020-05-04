import request from '@/util/request.js'

import commonJs from '@/util/common'


// 收银台信息接口
export function apiUnifiedMobile(data) {
  return request({
    url: `${commonJs.config.getApiMppayMingpinmao}/mobile/unified`,
    // url: 'http://192.168.1.74:15103/mobile/unified',
    method: 'post',
    data
  })
}
 

// 是否展示快捷支付逻辑1
export function payCommonValue(data) {
  return request({
    url: `${commonJs.config.prefixUrl}/shop/mobile/commonValue`,
    method: 'post',
    data
  })
}

// 是否展示快捷支付逻辑2
export function apiPayActCommonValueXFYL(data) {
  return request({
    url: `${commonJs.config.prefixUrl}/shop/mobile/commonValue`,
    method: 'post',
    data
  })
}

// 公共参数-赚播
export function apiPayActCommonValueZB(data) {
  return request({
    url: `${commonJs.config.prefixZhuanboApi}/shop/mobile/commonValue`,
    method: 'post',
    data
  })
}


// 获取ip
export function payClientIp(data) {
  return request({
    url: `client/ip`,
    method: 'post',
    data
  })
}


// 获取openid
// export function payShopMobileKeyFind(data) {
//   return request({
//     url: `/shop/mobile/key/find`,
//     method: 'post',
//     data
//   })
// }
// 获取openid 换支付的接口
export function payGetAppId(data) {
  return request({
    url: `${commonJs.config.getApiMppayMingpinmao}/mobile/unified`,
    method: 'post',
    data
  })
}
// code换取openid
export function payAuthCode2openid(data) {
  return request({
    url: `/shop/mobile/auth/code2openid`,
    method: 'post',
    data
  })
}

// code换取openid
export function payZhuanboAuthCode2openid(data) {
  return request({
    url: `${commonJs.config.prefixZhuanboApi}/shop/mobile/auth/code2openid`,
    method: 'post',
    data
  })
}




 
