import request from '@/util/request.js'
import commonJs from '@/util/common'

// 获取订单列表
export function apiListOrder(data) {
  return request({
    url: `${commonJs.config.prefixOrderYinliUrl}/shop/mobile/order/list`,
    method: 'post',
    data
  })
}

// 订单发货
export function apiShipOrder(data) {
  return request({
    url: `${commonJs.config.prefixOrderYinliUrl}/shop/mobile/order/ship`,
    method: 'post',
    data
  })
}

// 拒绝订单
export function apiCancelOrder(data) {
  return request({
    url: `${commonJs.config.prefixOrderYinliUrl}/shop/mobile/order/refuse`,
    method: 'post',
    data
  })
}