import request from '@/util/request.js'

// 国家区域编号
export function apiAreaList(data) {
  return request({
    url: '/shop/mobile/area/list',
    method: 'post',
    data
  })
}

// 验证码获取
export function apiAuthCode(data) {
  return request({
    url: '/shop/mobile/auth/code',
    method: 'post',
    data
  })
}

// langsha登录
export function apiLangshaShopMobileAuthLogin(data) {
  return request({
    url: '/shop/mobile/auth/login',
    method: 'post',
    data
  })
}


// 验证码获取
export function apiCheckCode(data) {
  return request({
    url: '/shop/mobile/auth/code/check',
    method: 'post',
    data
  })
}

// 登录
export function apiLogin(data) {
  return request({
    // url: '/shop/mobile/auth/login',
    url: '/shop/mobile/auth/login/mp',
    method: 'post',
    data
  })
}

// 注册
export function apiRegister(data) {
  return request({
    // url: '/shop/mobile/auth/register',
    url: '/shop/mobile/auth/login/mp',
    method: 'post',
    data
  })
}