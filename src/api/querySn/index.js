import request from '@/util/request.js'
import commonJs from '@/util/common'
// 订单提交
export function querySn(data) {
  return request({
    url: `${commonJs.config.prefixUrlPhpSn}/api/sn/query`,
    method: 'post',
    data
  })
}export function wxJsSdk(data) {
  return request({
    url: `${commonJs.config.prefixUrl}/shop/mobile/share/jsapi/ticket`,
    method: 'post',
    data
  })
}