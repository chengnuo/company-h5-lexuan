import axios from 'axios'
import commonJs from '@/util/common.js'
import { Toast } from 'vant'

// create an axios instance
const service = axios.create({
  baseURL: commonJs.config.prefixUrl, // api的base_url
  timeout: 100000 ,//请求头// request timeout
})

// request interceptor
service.interceptors.request.use(config => { 
  config.data = { // 全局公共参数
    mercId: "888000000000003",
    platform: "XFYLMALL",
    sysCnl: 'H5',
    timestamp: new Date().getTime().toString().substr(0, 10),
    ...config.data,
  }
  var headerJson = commonJs.jsSign(config.data).headers;
  config.headers['X-MPMALL-SignVer'] = headerJson['X-MPMALL-SignVer'];
  config.headers['X-MPMALL-Sign'] = headerJson['X-MPMALL-Sign'];
  config.headers['X-MPMALL-Token'] = headerJson['X-MPMALL-Token'];
  config.headers['X-MPMALL-APPVer'] = headerJson['X-MPMALL-APPVer'];
  
  return config;
}, error => { 
  Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    // console.log('resresres', res)
    // else if (res.code.toString() === '10501') {
    //   Toast(res.msg);
    //   window.location.href = `/login?inviteCode=${window.location.search}`
    //   return Promise.reject('error')
    // }
    if (res.code.toString() === '10033') {
      Toast(res.msg);
      window.location.href = `/login?inviteCode=${window.location.search}`
      return Promise.reject('error')
    } else if (res.code === 503) {
      Toast(res.msg);
      return Promise.reject('error')
    } 
    // else if (res.code !== 10000) {
    //   // 非5xx的错误属于业务错误，留给具体页面处理、
    //   Toast(res.msg);
    //   return Promise.reject(res)
    // } 
    else {
      return res
    }
  }, error => {
    console.log('err' + error)// for debug 
    return Promise.reject(error)
  })

export default service
