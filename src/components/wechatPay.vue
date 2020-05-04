<template>
  <div class="wechatPay">
    <div class="sendLayout">
      <van-button type="default"
                  class="sendBtn"
                  @click="wechatPayChild"
                  :loading="loading"
                  >去付款</van-button>
    </div>
  </div>
</template>

<script>

import commonJs from '@/util/common'
import wx from 'weixin-js-sdk'
import { Toast } from 'vant'

import { apiPayClientIp, apiPayMobileUnified, apiOrderSubmit } from '@/api/order'
import { payGetAppId, payAuthCode2openid, payZhuanboAuthCode2openid } from '@/api/pay'


export default {
  name: 'wechatPay',
  // https://cn.vuejs.org/v2/guide/components-props.html
  props: {
    dataSource: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: () => {
        return {}
      }
    },
    urlSource: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      chooseWXPay: {}, // 微信浏览器支付
      payClientIp: '', // 获取客户端IP
      loading: false,
    }
  },

  created() {
  },
  mounted() {
    // commonJs.bankSucddeed()
    // 初始化
    this.init()
  },
  methods: {
    // 初始化
    init() {
      // 获取ip
      this.apiClientIp(() => {
        // 如果是微信场景
        if (commonJs.isWeiXin()) {
          console.log('commonJs.isWeiXin')
          // openid
          // this.openId = this.$route.query.openid
          // 如果获取到code
          
          let getPayOpenId = JSON.parse(window.sessionStorage.getItem('payOpenId')) || {} // 缓存支付信息
          // route query
          const routeQuery = this.$route && this.$route.query
          console.log('routeQuery', routeQuery)
          console.log('commonJs', commonJs.getPlatform())
          console.log('getPayOpenId', getPayOpenId)
          if(getPayOpenId && getPayOpenId.openId){
            this.openId = getPayOpenId.openId
            console.log('this.openId微信支付', this.openId)
            this.$nextTick(()=>{
              // this.initPay() // 微信支付
            })
            return false;
          }else if (this.$route.query.code) {
            
              let code = this.$route.query.code;
              let data = {
                code: code,
                source: 'gzh',
                tradeType: 'JSAPI',
                operType: '2',
                sysCnl: "WX-PUBLIC",
                mercId: commonJs.getPlatform().mercId,
                platform: commonJs.getPlatform().platform,
              }
              // code 换 openid
              this.apiPayAuthCode2openid(data,()=>{
                // this.initPay() // 微信支付
              })
            return false;   
          }else{
            let data = {
              tradeType: 'JSAPI', // 交易类型 JSAPI：公众号或小程序 APP：app NATIVE：扫码 MICROPAY：刷卡 MWEB：H5
              operType: '2', // 操作类型 1：授权(登录,获取AccessToken) 2：支付
              bankCode: 'WEIXIN', // 银行编号 支付宝：ALIPAY 微信：WEIXIN
              sysCnl: "WX-PUBLIC",
              mercId: commonJs.getPlatform().mercId,
              platform: commonJs.getPlatform().platform,
              methodType: 'GetAppId',
              requestId: new Date().getTime(), // 请求流水
            }
            // 获取openid
            this.apiPayGetAppId(data, ()=>{
              console.log('this.apiPayGetAppId')
            });
            return false;
          }
        }
      })
    },
    // 获取openid
    apiPayGetAppId(data, callback){
      payGetAppId(data).then((res)=>{
        if(res.code.toString()==='10000'){
          console.log( window.location.search )
          const state = Math.random().toString()
          // &bankCode=WEIXIN
          let resAppId = res.data.appId;
          // let resAppId = 'wx3fb8ccb54d4a1417';
          const redirect_uri = encodeURIComponent(`${commonJs.config.prefixH5Url}pay${window.location.search}&bankCode=WEIXIN&t=${state}`)
          window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${resAppId}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_base&state=${state}#wechat_redirect`
          callback && callback()
        }else{
          Toast.fail(res.msg)
        }
      }).catch((error)=>{
        Toast.fail(error)
      })
    },
    // code换取openid
    apiPayAuthCode2openid(data,callback){

      console.log('赚播', commonJs.getPlatform().platform)

      if(commonJs.getPlatform().platform=='ZBMALL'){ // 赚播
        payZhuanboAuthCode2openid(data).then((res)=>{
          if(res.code.toString()==='10000'){

            let getPayOpenId = JSON.parse(window.sessionStorage.getItem('payOpenId')) || {} // 缓存支付信息

            if(getPayOpenId && getPayOpenId.openId){
              return false;
            }else{
              window.sessionStorage.setItem('payOpenId', JSON.stringify({
                openId: res.data.openid
              })) // 缓存支付信息

              this.openId = res.data.openid
            }
            callback && callback()
          }else{
            Toast.fail(res.msg)
          }
        }).catch((error)=>{
          Toast.fail(error)
        })
      }else{ // 乐选
        payAuthCode2openid(data).then((res)=>{
          if(res.code.toString()==='10000'){

            let getPayOpenId = JSON.parse(window.sessionStorage.getItem('payOpenId')) || {} // 缓存支付信息

            if(getPayOpenId && getPayOpenId.openId){
              return false;
            }else{
              window.sessionStorage.setItem('payOpenId', JSON.stringify({
                openId: res.data.openid
              })) // 缓存支付信息

              this.openId = res.data.openid
            }
            callback && callback()
          }else{
            Toast.fail(res.msg)
          }
        }).catch((error)=>{
          Toast.fail(error)
        })
      }
      
    },
    // 微信点击支付的时候
    wechatPayChild() {
      if (commonJs.isWeiXin()) {
        this.handleWxPay() // 微信支付
      } else {
        this.handleH5Pay() // h5支付
      }
      this.$emit('wechatPayParent', '这是我暴露出去的数据', '这是我暴露出去的数据2')
    },
    // 获取客户端IP
    // async apiClientIp(callback) {
    //   const data = Object.assign({})
    //   const res = await this.$post(this.$api.payClientIp, data)
    //   try {
    //     if (res.code.toString() === '10000') {
    //       this.payClientIp = res.data.ip
    //       callback && callback()
    //     } else {
    //       Toast.fail(res.msg)
    //     }
    //   } catch (error) {
    //     Toast.fail(error)
    //   }
    // },
    // 获取客户端IP
    apiClientIp(callback) {
      const data = Object.assign({})
      apiPayClientIp(data).then(res=>{
        if (res.code.toString() === '10000') {
          this.payClientIp = res.data.ip
          callback && callback()
        } else {
          Toast.fail(res.msg)
        }

      }).catch(error=>{
        Toast.fail(error)
      })
    },
    // 订单支付
    // async apiPayMobileUnified(parameter, callback) {
    //   const data = Object.assign({}, parameter)
    //   const res = await this.$post(this.$api.payMobileUnified, data)

    //   try {
    //     if (res.code.toString() === '10000') {
    //       callback && callback(res)
    //     } else {
    //       Toast.fail(res.msg)
    //     }
    //   } catch (error) {
    //     Toast.fail(error)
    //   }
    // },
    apiPayMobileUnified(parameter, callback){
      this.loading = true;
      const data = Object.assign({}, parameter)
      apiPayMobileUnified(data).then((res)=>{
        this.loading = false;
        if (res.code.toString() === '10000') {
          callback && callback(res)
        } else {
          Toast.fail(res.msg)
        }
      }).catch((error)=>{
        this.loading = false;
        Toast.fail(error)
      })
    },
    // 初始化-微信浏览器支付
    // initPay() {
    //   console.log('initPay-this.openId', this.openId)
    //   if (this.openId) {
    //     const platform = this.$route.query.platform
    //     const callbackUrl = commonJs.bankSucddeed();
    //     const dataTwo = {
    //       methodType: 'DirectPay',
    //       prePayNo: this.$route.query.prePayNo,
    //       mercId: this.$route.query.mercId,
    //       tradeType: 'JSAPI',
    //       bankCode: 'WEIXIN',
    //       openId: this.openId, // 注意大小写
    //       clientIp: this.payClientIp, // 获取ip
    //       sysCnl: 'WX-PUBLIC',
    //       platform: platform, // 平台编号 名品猫:MPMALL，名品玩家：MPWJMALL
    //       bankCardType: '08',
    //       callbackUrl,
    //     }
    //     console.log('dataTwo', dataTwo)
    //     this.apiPayMobileUnified(dataTwo, (resTwo) => {
    //       this.chooseWXPay = Object.assign({}, resTwo.data)
    //       console.log('this.chooseWXPay', this.chooseWXPay)
    //       const wxData = {
    //         debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //         appId: this.chooseWXPay.appId, // 必填，公众号的唯一标识
    //         timestamp: this.chooseWXPay.timeStamp, // 必填，生成签名的时间戳
    //         nonceStr: this.chooseWXPay.nonceStr, // 必填，生成签名的随机串
    //         signature: this.chooseWXPay.sign, // 必填，签名
    //         jsApiList: ['chooseWXPay', 'onMenuShareWeibo'] // 必填，需要使用的JS接口列表
    //       }
    //       // wx.config
    //       wx.config(wxData)
    //     })
    //   } else {
    //     Toast.fail('openid不存在')
    //   }
    // },
    // 微信支付-信来国际
    handleWxPay(){
      
      const self = this

      if (self.openId) {
      
        const platform = self.$route.query.platform
        const callbackUrl = commonJs.bankSucddeed();
        const dataTwo = {
          methodType: 'DirectPay',
          prePayNo: self.$route.query.prePayNo,
          mercId: self.$route.query.mercId,
          tradeType: 'JSAPI',
          bankCode: 'WEIXIN',
          openId: self.openId, // 注意大小写
          clientIp: self.payClientIp, // 获取ip
          sysCnl: 'WX-PUBLIC',
          platform: platform, // 平台编号 名品猫:MPMALL，名品玩家：ZBMALL
          bankCardType: '08',
          callbackUrl,
        }
        console.log('dataTwo', dataTwo)
        self.apiPayMobileUnified(dataTwo, (resTwo) => {
          self.chooseWXPay = Object.assign({}, resTwo.data)
          if(resTwo.data.routeCode == 'SHEENPAYHK'){
            window.location.href = resTwo.data.payUrl
          }
        })
      } else {
        Toast('openid不存在')
      }
      
    },
    // 调起微信浏览器支付-备份
    handleWxPayCopy() {
      const self = this
      console.log('调起微信浏览器支付1', self.chooseWXPay)
      // 需在用户可能点击分享按钮前就先调用
      wx.ready(function() {
        wx.chooseWXPay({
          timestamp: self.chooseWXPay.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: self.chooseWXPay.nonceStr, // 支付签名随机串，不长于 32 位
          package: self.chooseWXPay.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: self.chooseWXPay.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: self.chooseWXPay.sign, // 支付签名
          success: function(res) {
            console.log('调起微信浏览器支付wx.success', res)
            self.goSuccess()
            // 成功跳回之前
            // 支付成功后的回调函数
          },
          fail: function(res) {
            console.log('调起微信浏览器支付wx.fail', res)
          }
        })
      })
      // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
      wx.error(function(res) {
        console.log('调起微信浏览器支付wx.error', res)
      })
    },
    // h5支付
    handleH5Pay() {
      const prePayNo = this.$route.query.prePayNo
      const mercId = this.$route.query.mercId
      const platform = this.$route.query.platform
      // const openid = this.$route.query.openid
      // const source = this.$route.query.source

      // const callbackUrl = encodeURIComponent(``)
      // const callbackUrl = `${commonJs.getUrl()}/payMiddleware`
      // const callbackUrl = `${commonJs.payConfig.PAYMiddleware}` // 名品猫站外落地页-中间页
      const callbackUrl = commonJs.bankSucddeed(); // 乐选中间页

      const dataTwo = {
        methodType: 'DirectPay',
        prePayNo: prePayNo,
        mercId: mercId,
        tradeType: 'MWEB',
        bankCode: 'WEIXIN',
        // openId: this.userData.wxOpenId, // h5支付没有openId
        callbackUrl: callbackUrl,
        clientIp: this.payClientIp, // 获取ip
        sysCnl: 'H5',
        platform: platform, // 平台编号 名品猫:MPMALL，名品玩家：MPWJMALL
        bankCardType: '08',
      }
      this.apiPayMobileUnified(dataTwo, (resTwo) => {
        window.location.href = resTwo.data.mwebUrl
      })
    },
    // 成功跳转
    goSuccess() {
      // window.location.href = `${commonJs.goPayConfig(this.urlSource.source).PAYPaySucceed}` // 跳回原来地方
      window.location.href = commonJs.bankSucddeed();
    },
    // 失败/取消跳转
    goFail() {
      this.$router.push({
        name: 'Pay',
        query: {
          mercId: this.urlSource.mercId,
          openid: this.urlSource.openid,
          prePayNo: this.urlSource.prePayNo,
          source: this.urlSource.source,
          platform: this.urlSource.platform,
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.wechatPay {
  .sendLayout {
    width: 335px;
    padding: 20px;
    // position: absolute;
    // left: 0;
    // bottom:23px;
    .sendBtn {
      width: 100%;
      height: 44px;
      line-height: 44px;
      background:linear-gradient(225deg,rgba(10,211,238,1) 0%,rgba(10,190,213,1) 100%);
      border-radius:2px;
      color: #fff; 
    }
  }
}
</style>
