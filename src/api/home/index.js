import request from '@/util/request.js'

import commonJs from '@/util/common'


// inviteCode: '/shop/mobile/user/info/inviteCode', // 邀请码换用户信息
export function apiUserInfoInviteCode(data) {
  return request({
    url: `/shop/mobile/user/info/inviteCode`,
    method: 'post',
    data
  })
}


// 个人资料
export function apiMobileUserInfo(data) {
  return request({
    url: `/shop/mobile/user/info`,
    method: 'post',
    data
  })
}


