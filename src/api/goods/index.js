import request from '@/util/request.js'

import commonJs from '@/util/common'
// ${commonJs.config.prefixUrlPhpBase}


// 商品详情
export function apiGoodsDetailGetDetail(data) {
  return request({
    url: `${commonJs.config.prefixUrlPhpBase}/base/goods/detail`,
    method: 'post',
    data
  })
}


// 商品详情
// export function apiGoodsDetailGetDetail(data) {
//   return request({
//     url: `/shop/mobile/goods/detail`,
//     method: 'post',
//     data
//   })
// }

// 立即购买
export function apiShoppingCartBuy(data) {
  return request({
    // url: '/shop/mobile/cart/once/add',
    url: '/shop/mobile/cart/once/add',
    method: 'post',
    data
  })
}

// 商品列表
export function apiGoodsList(data) {
  return request({
    url: '/shop/mobile/goods/list',
    method: 'post',
    data
  })
}


// 获取商品Id
export function apiMobileCommonValue(data) {
  return request({
    url: '/shop/mobile/commonValue',
    method: 'post',
    data
  })
}

// 邀请直属用户等级数量
export function apiGoodsUserInviteLevelCount(data) {
  return request({
    url: '/shop/mobile/user/invite/level/count',
    method: 'post',
    data
  })
}

// 邀请直属用户等级数量
export function apiBaseGoodsList(data) {
  return request({
    url: `${commonJs.config.prefixUrlPhpBase}/base/goods/list`,
    method: 'post',
    data
  })
}
