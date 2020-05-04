import request from '@/util/request.js'

// 我的收益
export function incomeIndex(data) {
  return request({
    url: '/shop/mobile/income/index',
    method: 'post',
    data
  })
}
// 常见问题
export function questionList(data) {
  return request({
    url: '/shop/mobile/common/question/list',
    method: 'post',
    data
  })
}
// 滚动广告位
export function poolList(data) {
  return request({
    url: '/shop/mobile/msg/pool/list',
    method: 'post',
    data
  })
}


