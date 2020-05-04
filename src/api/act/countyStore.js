import request from '@/util/request.js'

// 礼包记录
export function giftList(data) {
  return request({
    url: '/shop/mobile/gift/list',
    method: 'post',
    data
  })
}


// 活动资格
export function activityStatus(data) {
  return request({
    url: '/shop/mobile/activity/status',
    method: 'post',
    data
  })
}


// 礼包提取
export function cartGetGift(data) {
  return request({
    url: '/shop/mobile/cart/get/gift',
    method: 'post',
    data
  })
}

// 礼包总数量
export function cartCountGift(data) {
  return request({
    url: '/shop/mobile/gift/count',
    method: 'post',
    data
  })
}
 


