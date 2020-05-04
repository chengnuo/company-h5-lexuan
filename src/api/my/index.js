import request from '@/util/request.js'
import commonJs from '@/util/common';

// 国家区域编号
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
