import request from '@/util/request.js'
import commonJs from '@/util/common';

// 图片资料
export function apiUserIndex(data) {
  return request({
    url: '/shop/mobile/user/index',
    method: 'post',
    data
  })
}


// 我的通知
export function apiShopMobileMsgNotifyList(data) {
  return request({
    url: '/shop/mobile/msg/notify/list',
    method: 'post',
    data
  })
}


// 添加授权书
export function apiShopMobileUserPartnerCreate(data) {
  return request({
    url: '/shop/mobile/user/partner/create',
    method: 'post',
    data
  })
}


// 获取授权资料
export function apiShopMobileUserPartnerGet(data) {
  return request({
    url: '/shop/mobile/user/partner/get',
    method: 'post',
    data
  })
}
// 获取广告
export function apiAdList(data) {
  return request({
    url: `${commonJs.config.prefixUrlPhpBase}/base/ad/list`,
    method: 'post',
    data
  })
}

// 个人资料
export function apiShopMobileUserInfo(data) {
  return request({
    url: '/shop/mobile/user/info',
    method: 'post',
    data
  })
}

// 获取云仓信息
export function apiCloudListInfo(data) {
  return request({
    url: `${commonJs.config.api_cloud_url}/api/cloud/info`,
    method: 'post',
    data
  })
}

export function stockApiCloudNum(data) {
  return request({
    url: `${commonJs.config.api_cloud_url}/api/cloud/num`,
    method: 'post',
    data
  })
}

// 个人资料
export function myMobileUserInfo(data) {
  return request({
    url: `/shop/mobile/user/info`,
    method: 'post',
    data
  })
}

// 商品列表
export function goodsDetailGetList(data) {
  return request({
    url: `${commonJs.config.api_goods_url}/base/goods/list`,
    method: 'post',
    data
  })
}

// 商品详情
export function goodsDetailGetDetail(data) {
  return request({
    url: `${commonJs.config.api_goods_url}/base/goods/detail`,
    method: 'post',
    data
  })
}
