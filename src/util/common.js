// eslint-disable-next-line import/no-extraneous-dependencies
import axios from 'axios'
import wx from 'weixin-js-sdk'
// eslint-disable-next-line import/no-extraneous-dependencies
import md5 from 'js-md5'

// 全局配置
var config = null;

if (process.env.NODE_ENV === 'development') { //区别线上线下环境 
  //测试环境http请求配置参数
  config = {
    signJson: {
      // 'X-MPMALL-SignVer': 'v1'
    },
    signKey: '12345678',
    signKeyZB: '12345678', // 赚播
    prefixUrl: 'http://test-zb-api.zhuanbo.gdxfhl.com',
    // prefixUrl: 'http://192.168.1.96:16111',
    prefixH5Url: 'http://test-h5.zhuanbo.gdxfhl.com',
    prefixUrlPhpBase: 'http://test-api-base.yinli.gdxfhl.com', // phpbase域
    prefixUrlPhpSn: 'http://test-api-sn.yinli.gdxfhl.com', // phpbase域
    prefixZhuanboApi: 'http://test-zb-api.zhuanbo.gdxfhl.com',
    prefixZhuanboUrl: 'http://test-h5.zhuanbo.gdxfhl.com',
    getApiMppayMingpinmao: 'https://test-mppay.mingpinmao.cn', // 支付链接
    prefixOrderYinliUrl: 'http://test-order.zhuanbo.gdxfhl.com',
    api_cloud_url: 'http://test-mlive.zhuanbo.gdxfhl.com', // go
    webTitle: '乐选',
    appid: 'wxa54f0533340859b3' // 公众号 appid ，支付使用11
  }
} else {
  //正式环境http请求配置参数
  config = {
    signJson: {
      // 'X-MPMALL-SignVer': 'v1'
    },
    signKey: 'B3lv0q99Xou8HCmSdeJrjxwI4WXaGGof', // 后端提供-秘玩家生产商户号和密钥 888000000000003 1WPTv61IN3oD3747Eqq2rfw5R48c6U4v
    signKeyZB: 'B3lv0q99Xou8HCmSdeJrjxwI4WXaGGof', // 赚播
    prefixUrl: 'http://zb-api.zhuanbo.gdxfhl.com',
    prefixH5Url: 'http://h5.zhuanbo.gdxfhl.com',
    prefixUrlPhpBase: 'http://api-base.yinli.gdxfhl.com', // phpbase域
    prefixUrlPhpSn: 'http://api-sn.yinli.gdxfhl.com', // phpbase域
    getApiMppayMingpinmao: 'https://mppay.mingpinmao.cn', // 支付链接
    prefixOrderYinliUrl: 'http://order.yinli.zhuanbo.com',
    prefixZhuanboApi: 'http://zb-api.zhuanbo.gdxfhl.com',
    prefixZhuanboUrl: 'http://h5.zhuanbo.gdxfhl.com',
    api_cloud_url: 'http://mlive.zhuanbo.gdxfhl.com', // go
    webTitle: '乐选',
    appid: 'wxa54f0533340859b3' // 公众号 appid ，支付使用
  }
}

// 设置title,主要兼容微信title
function setTitle(title) {
  let ua = window.navigator.userAgent
  var isIos = new RegExp('iPhone').test(ua)
  // var isIpad = new RegExp('iPad').test(ua)
  var isWeixin = new RegExp('MicroMessenger').test(ua)

  document.title = title
  if (isIos && isWeixin) {
    const iframe = document.createElement('iframe')
    iframe.style.dosplay = 'none'
    iframe.src = '/favicon.ico'
    iframe.onload = () => {
      setTimeout(() => {
        document.body.removeChild(iframe)
      }, 30)
    }
    document.body.appendChild(iframe)
  }
}

// 字符串超出部分显示省略号
function subStlength(str, maxLength = 13, targetLength = 10) {
  if (!str) return null
  var reg = /^[A-Za-z]+$/
  var re = /^[0-9a-zA-Z]*$/g
  if (reg.test(str) || re.test(str)) {
    if (str.length > 2 * maxLength) str = str.substring(0, 2 * targetLength) + '...'
  } else {
    if (str.length > maxLength) str = str.substring(0, targetLength) + '...'
  }

  return str
}

function jsSign(obj) {
  const userData = JSON.parse(sessionStorage.getItem('userData')) || {}
  var userDataToken = JSON.parse(sessionStorage.getItem('userDataToken')) || {}

  var json = Object.assign({}, obj, config.signJson)
  var arr = []

  for (var a in json) {
    // eslint-disable-next-line eqeqeq
    if ((typeof (json[a]) !== 'object' && json[a]) || (typeof (json[a]) !== 'object' && json[a] === 0)) {
      arr.push(a)
    }
  }

  arr.sort()

  var str = ''
  for (var i = 0; i < arr.length; i++) {
    str += `${arr[i]}=${json[arr[i]]}&`
  }
  // str  = str.substring(0,str.length-1);
  // str = `${str}key=${config.signKey}`
  if (obj.platform === 'ZBMALL') {
    str = `${str}key=${config.signKeyZB}`
  } else {
    str = `${str}key=${config.signKey}`
  }
  console.log(str)
  str = window.btoa(md5(str))
  return {
    headers: {
      // 'X-MPMALL-Token': userData.userToken,
      // 'X-MPMALL-Token': 'l135aqexx6j241ok5w95jfew67hc09ck',
      // 'X-MP-Sign': str,
      // 'X-MPMALL-APPVer': 'v1' // 添加版本号，后端处理逻辑


      'X-MPMALL-SignVer': 'v1',
      'X-MPMALL-Token': userData.userToken || userDataToken.userToken,
      'X-MPMALL-Sign': str,
      'X-MPMALL-APPVer': '1.3' // 添加版本号，后端处理逻辑
    }
  }
}

function setDocumentTitle(title) { //设置title页面
  var ua = window.navigator.userAgent;
  var isMPMALL = ua.indexOf('X-XFYL') != -1 ? true : false;
  var isIos = /(iPhone|iPad|iPod|iOS)/i.test(ua);
  if (isMPMALL) {
    if (isIos) {
      window.webkit.messageHandlers.setDocumentTitle.postMessage({
        title: title
      });
    } else {

      window.lt_android.setDocumentTitle(JSON.stringify({
        title: title
      }))
    }
  } else {
    document.title = title;
  }
}
function openNewWebView(path) { //打开app新窗口
  var ua = window.navigator.userAgent;
  var isMPMALL = ua.indexOf('X-XFYL') != -1 ? true : false;
  var isIos = /(iPhone|iPad|iPod|iOS)/i.test(ua);
  if (isMPMALL) {
    if (isIos) {
      window.webkit.messageHandlers.openNewWebView.postMessage({
        url: path
      });
    } else {
      window.lt_android.openNewWebView(JSON.stringify({
        url: path
      }))
    }
  } else {
    window.location.href = path;
  }
}


function openGoodDetail(id) { //设置商品详情页
  var ua = window.navigator.userAgent;
  var isMPMALL = ua.indexOf('X-XFYL') != -1 ? true : false;
  var isIos = /(iPhone|iPad|iPod|iOS)/i.test(ua);
  if (isMPMALL) {
    if (isIos) {
      window.webkit.messageHandlers.openGoodDetail.postMessage({
        id
      });
    } else {
      window.lt_android.openGoodDetail(JSON.stringify({
        id
      }))
    }
  } else {
    window.location.href = `/goodDetail`
  }
}

function appReturnCallback() { //设置商品详情页
  var ua = window.navigator.userAgent;
  var isMPMALL = ua.indexOf('X-XFYL') != -1 ? true : false;
  var isIos = /(iPhone|iPad|iPod|iOS)/i.test(ua);
  if (isMPMALL) {
    if (isIos) {
      window.webkit.messageHandlers.appReturnCallback.postMessage({});
    }
  }
}

function openConfirmOrder(json) { //订单确认页面
  var ua = window.navigator.userAgent;
  var isMPMALL = ua.indexOf('X-XFYL') != -1 ? true : false;
  var isIos = /(iPhone|iPad|iPod|iOS)/i.test(ua);
  if (isMPMALL) {
    if (isIos) {
      window.webkit.messageHandlers.openConfirmOrder.postMessage(json);
    } else {
      window.lt_android.openConfirmOrder(JSON.stringify(json))
    }
  }else{
    window.sessionStorage.setItem('orderDetail', JSON.stringify(json)) // 商户购买的时候，缓存信息
    window.sessionStorage.setItem('goodDetailPurchType', JSON.stringify({
      purchType: 5,
    })) // 商户购买的时候，缓存信息
    window.location.href = `/order` // 进货类型 1：购买自用 2：进货云仓 3：提货 4：线下发货/线下进货 5：礼包提取 6：线上购买
  }
}


function openInviteFriend(userData) { //设置邀请页面
  var ua = window.navigator.userAgent;
  var isMPMALL = ua.indexOf('X-XFYL') != -1 ? true : false;
  var isIos = /(iPhone|iPad|iPod|iOS)/i.test(ua);
  if (isMPMALL) {
    if (isIos) {
      window.webkit.messageHandlers.openInviteFriend.postMessage({});
    } else {
      window.lt_android.openInviteFriend(JSON.stringify({}))
    }
  }else{
    // 
    window.location.href = `/act/countyStore/invitationPoster?token=${userData.userToken}`
  }
}


// 二次分享-微信环境
function outSideShare(infoJson) {

  var userDataJson = JSON.parse(sessionStorage.getItem('userData')) || {}
  var info = null;
  if(!infoJson){
    info={
      title: '乐选',
      desc: `**邀请你购买幸福精油，用幸福精油，享舒适生活`,
      link: `${getUrl()}/login`,
      img: `${getUrl()}/static/logo.png`
    }
    if(userDataJson.ptLevel + '' && userDataJson.ptLevel >= 0){
      info.link = config.prefixH5Url + '/login?inviteCode=' + userDataJson.inviteCode;
      var name = userDataJson.nickname.substring(0,userDataJson.nickname.length-2) + '*' + userDataJson.nickname.substring(userDataJson.nickname.length-1, userDataJson.nickname.length);
      info.desc = name + '邀请你购买幸福精油，用幸福精油，享舒适生活';
    }

  }else{
    info = infoJson;
  }

  var json = {
    url: window.location.href,
    tradeType:'JSAPI',
    operType:1 
  }

  axios.post(config.prefixUrl + '/shop/mobile/share/jsapi/ticket', json, jsSign(json)).then((res) => {
 
    if (res.data.code == 10000) {
      var data = res.data.data
      seconDaryShare(decodeURIComponent(info.title), decodeURIComponent(info.desc), info.link, info.img, data.appId, data.timestamp, data.nonceStr, data.signature)
    }
  })
}

function seconDaryShare(tit, describe, href, img, id, time, nonce, sign) {
  // let ua = window.navigator.userAgent
  // eslint-disable-next-line eqeqeq
  // if (ua.indexOf('MicroMessenger') != -1) {
  const wxConfig = {
    debug: false,
    appId: id,
    timestamp: time, // 必填，生成签名的时间戳
    nonceStr: nonce, // 必填，生成签名的随机串
    signature: sign, // 必填，签名，见附录1
    jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone', 'scanQRCode']
  }
  wx.config(wxConfig)
  wx.ready(function () {
    wx.onMenuShareTimeline({ // 微信分享到朋友圈
      title: tit,
      link: href,
      imgUrl: img,
      success: function () {},
      cancel: function () {}
    })

    wx.onMenuShareAppMessage({ // 微信分享给朋友
      title: tit,
      desc: describe,
      link: href,
      imgUrl: img,
      type: '', // 分享类型,music、video或link，不填默认为link
      dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
      success: function () {},
      cancel: function () {}
    })

    wx.onMenuShareQQ({ // 分享到qq
      title: tit,
      desc: describe,
      link: href,
      imgUrl: img,
      success: function () {},
      cancel: function () {}
    })

    wx.onMenuShareWeibo({ // 分享到qq微博
      title: tit,
      desc: describe,
      link: href,
      imgUrl: img,
      success: function () {},
      cancel: function () {}
    })

    wx.onMenuShareQZone({ // 分享到qq空间
      title: tit,
      desc: describe,
      link: href,
      imgUrl: img,
      success: function () {},
      cancel: function () {}
    })
  })

  wx.error(function () {
    // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
  })
  // }
}


// 获取页面url
function getUrl() {
  let url = ''
  if (process.env.NODE_ENV === 'development') {
    url = 'http://test-h5.yinli.gdxfhl.com'
  } else if (process.env.NODE_ENV === 'production') {
    url = 'http://h5.yinli.gdxfhl.com'
  }
  return url
}



// 获取支付url
function getWebpayUrl() {
  let url = ''
  if (process.env.NODE_ENV === 'development') {
    url = 'https://test-webpay.mingpinmao.cn'
  } else if (process.env.NODE_ENV === 'production') {
    url = 'https://webpay.mingpinmao.cn'
  }
  return url
}

/**
 * 判断是否微信浏览器
 * @method true 微信
 * @method false 非微信
 */
function isWeiXin() {
  let ua = window.navigator.userAgent.toLowerCase()
  // eslint-disable-next-line eqeqeq
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true
  } else {
    return false
  }
}

// 获取-首次和登录后的inviteCode
function getInviteCodeRedirectUrlFn() {
  const getInviteCodeRedirectUrl = JSON.parse(window.sessionStorage.getItem('inviteCodeRedirectUrl')) || {}
  return getInviteCodeRedirectUrl
}

// 设置-首次和登录后的inviteCode
function setInviteCodeRedirectUrlFn(value) {
  const data = Object.assign({}, {
    firstInviteCode: null,
    loginInviteCode: null,
    redirectUrl: null
  }, getInviteCodeRedirectUrlFn(), value)
  window.sessionStorage.setItem('inviteCodeRedirectUrl', JSON.stringify(data))
}


// 支付配置
let payConfig = {}
// 成功回调到指定页面
if (process.env.NODE_ENV === 'development') {
  payConfig = {
    XFyinliPAYSource: `testXFyinli`, // 乐选
    PAYMiddleware: `${config.prefixH5Url}/payMiddleware`, // 站外落地页-中间页

    XFyinliPAYSourceRecharge: `testXFyinliRecharge`, // 乐选-充值
    PAYMiddlewareRecharge: `${config.prefixH5Url}/payMiddleware` // 站外落地页-中间页
  }
} else {
  payConfig = {
    XFyinliPAYSource: `XFyinli`, // 乐选1
    PAYMiddleware: `${config.prefixH5Url}/payMiddleware`, // 站外落地页-中间页

    XFyinliPAYSourceRecharge: `XFyinliRecharge`, // 乐选-充值
    PAYMiddlewareRecharge: `${config.prefixH5Url}/payMiddleware` // 站外落地页-中间页
  }
}

function numFilterToFixed2(value) {
  // 截取当前数据到小数点后两位
  const realVal = value?parseFloat(value).toFixed(2):''
  return realVal
}

function getPlatform(){
    var json = null;
    if(window.sessionStorage.getItem('urlSource')){
      json = JSON.parse(window.sessionStorage.getItem('urlSource')); 
    }else{
      json = {
        mercId: "888000000000003",
        platform: "ZBMALL"
      };
    }
    return json;
}

function goPayConfig(type) {
  let url = {
    PAYPaySucceed: ''
  }
 if (type === 'testXFyinli') {
    url = {
      PAYPaySucceed: `${config.prefixH5Url}/paySuccess/payment` // 乐选,
    }
  } else if (type === 'XFyinli') {
    url = {
      PAYPaySucceed: `${config.prefixH5Url}/paySuccess/payment` // 乐选,
    }
  } else if (type === 'testXFyinliRecharge') {
    url = {
      PAYPaySucceed: `${config.prefixH5Url}/recharge/paySucceed` // 乐选-充值,
    }
  } else if (type === 'XFyinliRecharge') {
    url = {
      PAYPaySucceed: `${config.prefixH5Url}/recharge/paySucceed` // 乐选-充值,
    }
  }
  return url
}


 function bankSucddeed() {
   if (getPlatform().type == 'bone') {
     return 'http://hk-h5-pay.happylanswe.com/bondShopSuccessPage.html'
   } else if (getPlatform().type == 'recharge') {
     return 'http://hk-h5-pay.happylanswe.com/successPage.html'
   } else if (getPlatform().type == 'zhuanbo') { // 赚播
     return 'http://hk-h5-pay.happylanswe.com/zhuanbosuccessPage.html'
   } else {
     return 'http://hk-h5-pay.happylanswe.com/shopSuccessPage.html'
   }

 }


  //返出用户等级
 function computePtLevel(type){
    if(type === 0){
      return '普通用户'
    }else if(type === 1){
      return 'VIP'
    }else if(type === 2){
      return '县级店'
    }else if(type === 3){
      return '品牌店'
    }else if(type === 4){
      return '金钻'
    }else if(type === 5){
      return '总裁'
    }else if(type === 6){
      return '分公司'
    }

 } 

  function ifXFApp(){
    var ua = window.navigator.userAgent;
    var isMPMALL = ua.indexOf('X-XFYL') != -1 ? true : false;
    return isMPMALL;
  }

//  function showBandPay(){ //是否展示银行快捷支付

//     var platform = '';
//     if(window.sessionStorage.getItem('urlSource')){
//       platform = JSON.parse(window.sessionStorage.getItem('urlSource'));
//     }

//     if(platform && platform.platform == 'ZBMALL'){
//       return true;
//     }else{
//       return false;
//     }
// }

var common = {
  setTitle,
  config,
  outSideShare,
  jsSign,
  subStlength,
  isWeiXin,
  getWebpayUrl,
  getInviteCodeRedirectUrlFn,
  setInviteCodeRedirectUrlFn,
  numFilterToFixed2,
  getUrl,
  payConfig,
  setDocumentTitle,
  openNewWebView,
  openGoodDetail,
  openConfirmOrder,
  openInviteFriend,
  appReturnCallback,
  getPlatform,
  goPayConfig,
  bankSucddeed,
  computePtLevel,
  ifXFApp
}

export default common