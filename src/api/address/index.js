import request from '@/util/request.js'

// 地址列表
export function apiAddressList(data) {
  return request({
    url: '/shop/mobile/address/list',
    method: 'post',
    data
  })
}

// 设置默认地址
export function apiOperateDefault(data) {
  return request({
    url: '/shop/mobile/address/operate/default',
    method: 'post',
    data
  })
}

// 地址添加/修改
export function apiOperate(data) {
  return request({
    url: '/shop/mobile/address/operate',
    method: 'post',
    data
  })
}

// 地址详情
export function apiAddressDetail(data) {
  return request({
    url: '/shop/mobile/address/detail',
    method: 'post',
    data
  })
}

// 地址删除
export function apiAddressDelete(data) {
  return request({
    url: '/shop/mobile/address/delete',
    method: 'post',
    data
  })
}

// 省市区
export function apiRegionList(data) {
  return request({
    url: '/shop/mobile/region/list',
    method: 'post',
    data
  })
}