import request from '@/util/request.js'
import commonJs from '@/util/common'

//个人资料
export function apiUserInfo(data) {
  return request({ 
    url: `/shop/mobile/user/info`, 
    method: 'post', 
    data
  })
}

//个人资料
export function apiHeadUpload(data) { 
  return request({ 
    url: `/shop/mobile/user/head/upload`, 
    method: 'post', 
    data
  }) 
} 
//获取手机验证码
export function apiAuthCode(data) { 
  return request({ 
    url: `/shop/mobile/auth/code`, 
    method: 'post', 
    data
  }) 
} 
 
//手机验证码验证
export function apiCheckCode(data) { 
  return request({ 
    url: `/shop/mobile/auth/code/check`, 
    method: 'post', 
    data
  }) 
} 

//修改密码
export function apiModifyPsd(data) { 
  return request({ 
    url: `/shop/mobile/user/psd/modify`, 
    method: 'post', 
    data
  }) 
} 


 
