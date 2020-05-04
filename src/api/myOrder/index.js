import request from '@/util/request.js'
import commonJs from '@/util/common'
// 我的页面
export function apiListOrder(data) {
  return request({
    url: `${commonJs.config.prefixOrderYinliUrl}/shop/mobile/order/list`,
    method: 'post',
    data
  })
}
// 取消订单
export function apiCancelOrder(data) {
  return request({
    url: `${commonJs.config.prefixOrderYinliUrl}/shop/mobile/order/cancel`,
    method: 'post',
    data
  })
}

// 完成订单
export function apiFinishOrder(data) {
  return request({
    url: `${commonJs.config.prefixOrderYinliUrl}/shop/mobile/order/finish`,
    method: 'post',
    data
  })
}

//订单付款
export function apiRepayOrder(data) {
  return request({
    url: `${commonJs.config.prefixOrderYinliUrl}/shop/mobile/order/repay`,
    method: 'post',
    data
  })
}