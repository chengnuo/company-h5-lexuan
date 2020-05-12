<template>
  <div class="becomeServiceProvider">
    <div class="imgLayout">
      <!-- <img class="img1"
           :src="img1" /> -->
      <img class="img2"
           :src="img2" />
    </div>
    <div class="sendLayout">
      <!-- <div class="sendBtn" @click="handleSubmit">支付技术服务费，立即成为服务商11</div> -->
      <div @click="handleSubmit(1)">
        <img class="sendImg1 sendImgItem"
             :src="sendImg1"
             v-if="userData.ptLevel<=1 && userData.ptLevel!=0" />
        <img class="sendImg1 sendImgItem"
             :src="sendImg11"
             v-else />
      </div>
      <div @click="handleSubmit(2)">
        <img class="sendImg2 sendImgItem"
             :src="sendImg2"
             v-if="userData.ptLevel<=2 && userData.ptLevel!=0" />
        <img class="sendImg2 sendImgItem"
             :src="sendImg22"
             v-else />
      </div>
      <div @click="handleSubmit(3)">
        <img class="sendImg3 sendImgItem"
             :src="sendImg3"
             v-if="userData.ptLevel<=3 && userData.ptLevel!=0" />
        <img class="sendImg3 sendImgItem"
             :src="sendImg33"
             v-else />
      </div>
      <!-- <div @click="handleSubmit(3)">
        <img class="sendImg4 sendImgItem"
             :src="sendImg4" />
      </div>
      <div @click="handleSubmit(4)">
        <img class="sendImg5 sendImgItem"
             :src="sendImg5" /> 
      </div>-->

      <div>
        <img class="sendDescriptionImg sendImgItem"
             :src="sendDescriptionImg" />
      </div>
    </div>

    <goBack />
  </div>
</template>

<script>

import commonJs from '@/util/common'
import { Toast } from 'vant'
import goBack from '@/components/goBack';


// import img1 from '../../assets/img/becomeAnchor/bg_03@2x.png'
import img2 from '../../assets/img/becomeAnchor/bg_04@2x.png'


import sendImg1 from '../../assets/img/becomeAnchor/icon_bg_01@2x.png'
import sendImg2 from '../../assets/img/becomeAnchor/icon_bg_02@2x.png'
import sendImg3 from '../../assets/img/becomeAnchor/icon_bg_03@2x.png'
// import sendImg4 from '../../assets/img/becomeAnchor/icon_bg_04@2x.png'
// import sendImg5 from '../../assets/img/becomeAnchor/icon_bg_05@2x.png'


import sendImg11 from '../../assets/img/becomeAnchor/icon_bg_11@2x.png'
import sendImg22 from '../../assets/img/becomeAnchor/icon_bg_12@2x.png'
import sendImg33 from '../../assets/img/becomeAnchor/icon_bg_13@2x.png'

import sendDescriptionImg from '../../assets/img/becomeAnchor/icon_bg_04@2xdescription.png'


import { payClientIp } from '@/api/pay';
import { orderDepositSubmit } from '@/api/order';


export default {
  name: 'BecomeServiceProvider',

  components: {
    goBack,
  },

  data() {
    return {
      payClientIp: '',
      // img1,
      img2,
      payCommonValue: {},
      sendImg1,
      sendImg2,
      sendImg3,
      // sendImg4,
      // sendImg5,
      sendDescriptionImg,
      userData: {
        id: ''
      },
      sendImg11,
      sendImg22,
      sendImg33,
    }
  },
  mounted() {
    this.init();
    this.$nextTick(() => {
      this.wxShare();
    })
  },
  methods: {
    init() {
      this.apiClientIp();

      if (!commonJs.getInviteCodeRedirectUrlFn().firstInviteCode) {
        commonJs.setInviteCodeRedirectUrlFn({
          firstInviteCode: this.$route.query || '',
          loginInviteCode: '',
          redirectUrl: `${window.location.origin}${window.location.pathname}`
        }) // 设置获取-首次和登录后的inviteCode
      }

      this.userData = JSON.parse(sessionStorage.getItem('userData')) || {}
    },
    // 获取客户端IP
    apiClientIp(callback) {
      payClientIp({}).then((res) => {
        if (res.code.toString() === '10000') {
          this.payClientIp = res.data.ip
          callback && callback()
        } else {
          Toast(res.msg)
        }
      }).catch(error => {
        Toast(error)
      })
    },
    apiOrderDepositSubmit(obj) {

      let data = {
        orderType: '2', // 订单类型
        tradeCode: '02',
        busiType: '06',
        sysCnl: commonJs.isWeiXin() ? 'WX-PUBLIC' : 'H5', // 下单终端渠道：IOS、ANDROID、WX-APPLET(小程序)
        buyType: '0',
        clientIp: this.payClientIp,
      }
      orderDepositSubmit(Object.assign({}, data, obj)).then((res) => {
        window.sessionStorage.setItem('orderSubmit', JSON.stringify(res.data)) // 商户购买的时候，缓存信息

        if (res.code.toString() === '10000') {
          const getLoginAuthorization = JSON.parse(window.sessionStorage.getItem('loginAuthorization')) || {}
          const userData = JSON.parse(sessionStorage.getItem('userData')) || {}
          const url = `${commonJs.config.prefixH5Url}/pay?mercId=${res.data.mercId}&prePayNo=${res.data.prePayNo}&platform=ZBMALL&userId=${userData.id}&type=zhuanbo`
          window.location.href = url;
        } else {
          if (res.code.toString() === '10501') { // 请登录
            // window.sessionStorage.setItem('redirectUrl', JSON.stringify(window.location.href)) // 商户购买的时候，缓存信息
            if (!commonJs.getInviteCodeRedirectUrlFn().firstInviteCode) {
              commonJs.setInviteCodeRedirectUrlFn({
                redirectUrl: `${window.location.origin}${window.location.pathname}`,
                firstInviteCode: this.$route.query || ''
              }) // 设置获取-首次和登录后的inviteCode
            }
            this.$router.push({
              name: 'QuickLogin',
              query: {
                inviteCode: this.$route.query.inviteCode,
              }
            })
          } else {
            Toast(res.msg)
          }
        }

      }).catch((error) => {
        Toast(error)
      })

      // const res = await this.$post(this.$api.orderDepositSubmit, Object.assign({}, data, obj))
      // try {
      //   if (res.code.toString() === '10000') {
      //     const getLoginAuthorization = JSON.parse(window.sessionStorage.getItem('loginAuthorization')) || {}
      //     const userData = JSON.parse(sessionStorage.getItem('userData')) || {}
      //     const url = `${commonJs.config.prefixH5Url}/pay?mercId=${res.data.mercId}&prePayNo=${res.data.prePayNo}&platform=ZBMALL&userId=${userData.id}&type=zhuanbo`
      //     window.location.href = url;
      //   } else {
      //     if (res.code.toString() === '10501') { // 请登录
      //       // window.sessionStorage.setItem('redirectUrl', JSON.stringify(window.location.href)) // 商户购买的时候，缓存信息
      //       if (!commonJs.getInviteCodeRedirectUrlFn().firstInviteCode) {
      //         commonJs.setInviteCodeRedirectUrlFn({
      //           redirectUrl: `${window.location.origin}${window.location.pathname}`,
      //           firstInviteCode: this.$route.query || ''
      //         }) // 设置获取-首次和登录后的inviteCode
      //       }
      //       this.$router.push({
      //         name: 'QuickLogin',
      //         query: {
      //           inviteCode: this.$route.query.inviteCode,
      //         }
      //       })
      //     } else {
      //       Toast(res.msg)
      //     }
      //   }
      // } catch (error) {
      //   console.log(error)
      //   Toast(error)
      // }
      // window.sessionStorage.setItem('orderSubmit', JSON.stringify(res.data)) // 商户购买的时候，缓存信息

    },
    // 提交
    handleSubmit(current) {
      console.log('payCommonValue', this.payCommonValue)
      console.log('current', current)
      // let payCommonValueDepositPrice =  this.payCommonValue.depositPrice || ""
      // let depositPriceArr = payCommonValueDepositPrice.split(';')
      console.log('this.userData.id', this.userData.id)
      if (this.userData && (this.userData.id == undefined || this.userData.id == '')) {
        if (!commonJs.getInviteCodeRedirectUrlFn().firstInviteCode) {
          commonJs.setInviteCodeRedirectUrlFn({
            redirectUrl: `${window.location.origin}${window.location.pathname}`,
            firstInviteCode: this.$route.query || ''
          }) // 设置获取-首次和登录后的inviteCode
        }
        this.$router.push({
          name: 'QuickLogin',
          query: {
            inviteCode: this.$route.query.inviteCode,
          }
        })
        console.log('111')
      } else if (this.userData.ptLevel <= current) {
        this.apiOrderDepositSubmit({
          orderType: current,
        });
        console.log('222')
      } else {
        console.log('333')
        Toast(`暂不支持低于你的等级的套餐`)
      }

    },

    // 分享
    wxShare() {
      const userData = JSON.parse(window.sessionStorage.getItem('userData')) || {}
      const inviteCode = userData.inviteCode || this.$route.query.inviteCode || ''

      commonJs.outSideShare({
        title: '幸福引力',
        desc: `专业的直播带货平台`,
        link: `${commonJs.config.prefixH5Url}/becomeServiceProvider?inviteCode=${inviteCode}`,
        img: `${commonJs.config.prefixH5Url}/static/logo.png`
      })
    },
  }
}
</script>

<style  lang="less">
.becomeServiceProvider {
  width: 100%;
  min-height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: #f5f8fa;
  .payImg {
    width: 120px;
    margin: 0 auto;
    display: block;
    margin-top: 60px;
    margin-bottom: 10px;
  }
  p {
    margin: 0 auto;
  }
  .text {
    height: 28px;
    font-size: 20px;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
    text-align: center;
  }
  .title {
    width: 88%;
    height: 22px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(200, 150, 81, 1);
    line-height: 22px;
    margin-top: 50px;
    margin-bottom: 5px;
  }
  .dec {
    width: 88%;
    font-size: 14px;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 20px;
  }
  .down {
    width: 88%;
    height: 44px;
    background: linear-gradient(
      225deg,
      rgba(51, 51, 51, 1) 0%,
      rgba(26, 26, 26, 1) 100%
    );
    border-radius: 2px;
    margin: 0 auto;
    display: block;
    margin-top: 100px;
    color: #fff;
    text-align: center;
    line-height: 44px;
    font-size: 16px;
  }
  .sendLayout {
    text-align: center;
    // padding: 0 20px 15px;
    background: #f7f8fa;
    margin-top: 10px;
    margin-bottom: 20px;
    .sendBtn {
      // width: 347px;
      height: 100px;
      line-height: 100px;
      background: #000;
      border-radius: 10px;
      margin: 0 15px;
      color: #fff;
    }
    .sendImg1 {
      width: 347px;
      height: 100px;
      border-radius: 10px;

      padding: 0 14px;
    }
    .sendImg2 {
      width: 347px;
      height: 100px;
      border-radius: 10px;

      padding: 0 14px;
    }
    .sendImg3 {
      width: 347px;
      height: 100px;
      border-radius: 10px;

      padding: 0 14px;
    }

    .sendImg4 {
      width: 347px;
      height: 100px;
      border-radius: 10px;

      padding: 0 14px;
    }
    .sendImg5 {
      width: 347px;
      height: 100px;
      border-radius: 10px;

      padding: 0 14px;
    }
    .sendDescriptionImg {
      width: 347px;
      height: 202px;
      border-radius: 10px;

      padding: 0 14px;
    }
    .sendImgItem {
      margin-top: 10px;
    }
  }

  .sendLayoutBat {
    text-align: center;
    padding: 0 20px 15px;
    // margin-top: 40px;
    // margin-bottom: 15px;
    background: #f7f8fa;
    margin-top: -67px;
    .sendBtn {
      height: 44px;
      line-height: 44px;
      background: linear-gradient(
        225deg,
        rgba(51, 51, 51, 1) 0%,
        rgba(26, 26, 26, 1) 100%
      );
      border-radius: 2px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      width: 100%;
      position: relative;
    }
  }
  .imgLayout {
    .img1 {
      width: 374px;
      height: 200px;
    }
    .img2 {
      width: 347px;
      height: 348px;
      padding: 0 14px;
      margin-top: 20px;
    }
  }
}
</style>
