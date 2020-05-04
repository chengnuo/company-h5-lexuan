import request from '@/util/request.js'
import commonJs from '@/util/common'
// 我的页面
export function apiTraceShip(data) {
  return request({
    url: `${commonJs.config.prefixOrderYinliUrl}/shop/mobile/order/ship/trace`,
    method: 'post',
    data
  })
}

export function apiListShip(data) {
  return request({
    url: `${commonJs.config.prefixOrderYinliUrl}/shop/mobile/order/ship/list`,
    method: 'post',
    data
  })
}