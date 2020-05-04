import request from '@/util/request.js'
import commonJs from '@/util/common'

// 我的余额
export function apiShopMobileIncomeBal(data) {
  return request({ 
    url: `/shop/mobile/income/bal`,
    method: 'post', 
    data
  })
}
 
