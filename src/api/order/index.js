import request from '@/util/request.js'
import commonJs from '@/util/common'

// 获取客户端IP
export function apiPayClientIp(data) {
  return request({
    url: 'client/ip',
    method: 'post',
    data
  })
}

// 收银台，支付相关
export function apiPayMobileUnified(data) {
  return request({
    // url: 'http://192.168.1.74:15103/mobile/unified',
    url: `${commonJs.config.getApiMppayMingpinmao}/mobile/unified`, // 这里是全链接，订单支付-http://showdoc.sys.jxblot.com/web/#/3?page_id=277
    method: 'post',
    data
  })
}


// 订单提交
export function apiOrderSubmit(data) {
  return request({
    url: '/shop/mobile/order/submit',
    method: 'post',
    data
  })
}

// 订单详情
export function apiOrderDetail(data) {
  return request({
    url: '/shop/mobile/order/detail',
    method: 'post',
    data
  })
}

// 订单详情
export function apiOrderQueryOrder(data) {
  return request({
    url: `${commonJs.config.prefixOrderYinliUrl}/shop/mobile/order/detail`,
    method: 'post',
    data
  })
}

// 订单详情
export function apiOrderQueryOrderUnified(data) {
  return request({
    url: `${commonJs.config.getApiMppayMingpinmao}/mobile/unified`,
    method: 'post',
    data
  })
}


// 充值提交
export function orderDepositSubmit(data) {
  return request({
    url: `/shop/mobile/deposit/submit`,
    method: 'post',
    data
  })
}

