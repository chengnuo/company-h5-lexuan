import request from '@/util/request.js'

import commonJs from '@/util/common'

// 购物车列表
export function apiCartIndex(data) {
  return request({
    url: `/shop/mobile/cart/index`,
    method: 'post',
    data
  })
}

// 购物车删除
export function apiCartDelete(data) {
  return request({
    url: `/shop/mobile/cart/delete`,
    method: 'post',
    data
  })
}

// 购物车添加
export function apiCartAdd(data) {
  return request({
    url: `/shop/mobile/cart/add`,
    method: 'post',
    data
  })
}


//购物车结算信息
export function apiCartCheckout(data) {
  return request({
    url: `/shop/mobile/cart/checkout`,
    method: 'post',
    data
  })
}






