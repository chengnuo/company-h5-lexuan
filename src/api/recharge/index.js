import request from '@/util/request.js'
import commonJs from '@/util/common'


// 登录
export function apiRechargeShopMobileAuthLogin(data) {
  return request({
    url: '/shop/mobile/auth/login',
    method: 'post',
    data
  })
}

// 充值提交
export function apiRechargeShopMobileDepositSubmit(data) {
  return request({
    // url: `${commonJs.config.prefixOrderYinliUrl}/shop/mobile/deposit/submit`,
    url: `/shop/mobile/deposit/submit`,
    method: 'post',
    data
  })
}

// 充值记录
export function apiRechargeExListDeposit(data) {
  return request({
    // url: `${commonJs.config.prefixOrderYinliUrl}/shop/mobile/deposit/submit`,
    url: `/shop/mobile/deposit/exList`,
    method: 'post',
    data
  })
}

