<template>
  <div class="aliPay">
    <div class="sendLayout">
        <van-button
                    type="default"
                    class="sendBtn"
                    @click="handlePay">去付款</van-button>
    </div>
    
    <form id="alipaysubmit" name="punchout_form" method="post" action="">
      <input id="biz_content" type="hidden" name="biz_content" value="">
      <input type="submit" value="立即支付" style="display:none" >
    </form>
  </div>
</template>

<script>

import commonJs from '@/util/common'
import wx from 'weixin-js-sdk'
import { Toast } from 'vant'


import { apiPayClientIp, apiPayMobileUnified, apiOrderSubmit } from '@/api/order'

export default {
  name: 'aliPay',
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
      payClientIp: '' // ip
    }
  },

  created() {
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.apiClientIp()
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
    apiClientIp() {
      const data = Object.assign({})
      apiPayClientIp(data).then(res=>{
        if (res.code.toString() === '10000') {
          this.payClientIp = res.data.ip
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
    //     console.log('error', error)
    //     Toast.fail(error)
    //   }
    // },
    apiPayMobileUnified(parameter, callback){
      const data = Object.assign({}, parameter)
      apiPayMobileUnified(data).then((res)=>{
        if (res.code.toString() === '10000') {
          callback && callback(res)
        } else {
          Toast.fail(res.msg)
        }
      }).catch((error)=>{
        Toast.fail(error)
      })
    },
    // 支付宝支付 - copy
    // handlePay(target) {
    //   console.log('target', target)
    //   console.log('bankCode', this.bankCode)
    //   const prePayNo = this.$route.query.prePayNo
    //   const mercId = this.$route.query.mercId
    //   const platform = this.$route.query.platform
    //   const callbackUrl = commonJs.bankSucddeed(); // 跳回原来地方

    //   const dataTwo = {
    //     methodType: 'DirectPay',
    //     prePayNo: prePayNo,
    //     mercId: mercId,
    //     tradeType: 'MWEB',
    //     bankCode: 'ALIPAY',
    //     // openId: this.userData.wxOpenId, // h5支付没有openId
    //     callbackUrl: callbackUrl,
    //     clientIp: this.payClientIp, // 获取ip
    //     sysCnl: 'H5',
    //     platform: platform, // 平台编号 名品猫:MPMALL，名品玩家：MPWJMALL
    //     bankCardType: '08',
    //   }
    //   this.apiPayMobileUnified(dataTwo, (resTwo) => {
    //     if (resTwo.code.toString() === '10000') {
    //       const bizContent = resTwo.data.bizContent
    //       const requestUrl = resTwo.data.requestUrl
    //       const div = document.createElement('div') // 获取到转义后的值
    //       /* 此处form就是后台返回接收到的数据 */
    //       div.innerHTML = bizContent
    //       document.body.appendChild(div)
    //       document.getElementById('biz_content').value = div.innerHTML
    //       document.forms.alipaysubmit.action = requestUrl
    //       document.forms[0].submit()
    //     } else {
    //       console.log(resTwo)
    //     }
    //   })
    // }
    // 支付宝支付
    handlePay(target) {
      console.log('target', target)
      console.log('bankCode', this.bankCode)
      const prePayNo = this.$route.query.prePayNo
      const mercId = this.$route.query.mercId
      const platform = this.$route.query.platform
      const callbackUrl = commonJs.bankSucddeed(); // 跳回原来地方

      const dataTwo = {
        methodType: 'DirectPay',
        prePayNo: prePayNo,
        mercId: mercId,
        tradeType: 'MWEB',
        bankCode: 'ALIPAY',
        // openId: this.userData.wxOpenId, // h5支付没有openId
        callbackUrl: callbackUrl,
        clientIp: this.payClientIp, // 获取ip
        sysCnl: 'H5',
        platform: platform, // 平台编号 名品猫:MPMALL，名品玩家：MPWJMALL
        bankCardType: '08',
      }
      this.apiPayMobileUnified(dataTwo, (resTwo) => {
        if (resTwo.code.toString() === '10000') {
          // const bizContent = resTwo.data.bizContent
          // const requestUrl = resTwo.data.requestUrl
          // const div = document.createElement('div') // 获取到转义后的值
          // /* 此处form就是后台返回接收到的数据 */
          // div.innerHTML = bizContent
          // document.body.appendChild(div)
          // document.getElementById('biz_content').value = div.innerHTML
          // document.forms.alipaysubmit.action = requestUrl
          // document.forms[0].submit()
          window.location.href = resTwo.data.mweb_url;
        } else {
          console.log(resTwo)
        }
      })
    }

  }
}
</script>

<style lang="less" scoped>
.aliPay {
  .sendLayout {
    padding: 20px;
    .sendBtn {
      width: 100%;
      height: 44px;
      background: linear-gradient(225deg,#0ad3ee,#0abed5);
      color: #fff;
      border-radius: 4px;
    }
  }
}
</style>
