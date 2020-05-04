<!-- 身份验证 -->
<template>
  <div class="login">

    <!-- logo -->
    <div class="login__logo">
      <!-- <img class="img"
           src="../../../assets/img/login/App Icon 60 x 60@2x.png"
           alt=""> -->

      <p class="title"
         style="margin-top: 93px;">输入验证码
        <p />
        <div class="desc">本次操作需要短信确认，请输入 <span class="mobile">{{mobileEncryption()}}</span> 收到的验证码</div>
    </div>

    <!-- 表单 -->
    <div class="login__form">
      <!-- <CountryAreaNo class="decorate"
                     v-click-outside="onClickOutside"
                     v-show="checkDialog.visible"
                     :visible.sync="checkDialog.visible" /> -->
      <div class="mobile"
           v-if="!checkDialog.visible">
        <img class="mobile--icon"
             src="../../assets/img/login/icon_user_01@2x.png"
             alt="">
        <van-field class="mobile--input"
                   clearable
                   type="tel"
                   maxlength="6"
                   v-model="form.smsCode"
                   placeholder="请输入验证码"
                   @input="handleCode" />
      </div>
    </div>

    <!-- 底部 -->
    <div class="login__footer"
         v-if="!checkDialog.visible">
      <van-button class="btn-save"
                  type="danger"
                  @click="handlePay"
                  :disabled="form.smsCode.length>0?false:true">验 证</van-button>
      <p class="describe">
        <span v-if="sendAuthCode"
              class="mobile--code"
              @click="verifyTel">重新发送</span>
        <a v-else>
          没收到验证码？
          <span>{{authTime}}s</span>
          后可重新发送
        </a>
      </p>
      <!-- <p class="describe">
        登录/注册即表示你同意
        <router-link :to="{ name: 'UserAgreement' }">
          <span>《用户协议》</span>
        </router-link>
        和
        <router-link :to="{ name: 'Privacy' }">
          <span>《隐私政策》</span>
        </router-link>
      </p> -->
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import clickOutside from '@/util/bind'
import commonJs from '@/util/common' 
import {apiUnifiedMobile, payClientIp} from '@/api/pay';

// import CountryAreaNo from '../cats/login/CountryAreaNo'

export default {
  name: 'payAuthentication',

  components: {
    // CountryAreaNo
  },

  directives: {
    clickOutside
  },

  data() {
    return {
      type: null,
      authTime: 0,
      platform:'XFYLMALL',
      inviteCode: '',
      isShow: false,
      tempCode: null,
      child: null,
      disabledBtn: true,
      sendAuthCode: true,
      checkDialog: {
        visible: false,
        number: '86'
      },
      form: {
        smsCode: '',
        mobile: ''
      },
      payClientIp: '' // ip
    }
  },

  created() {
  },

  mounted() {

    this.platform = commonJs.getPlatform().platform;

    // if(this.platform == 'XFYLMALL'){
    //   this.goHome() // 如果没有登录信息，直接跳回9980
    //   this.wxShare() // 分享
    // }
    
    this.getAuthTime()
    this.apiClientIp()
  },

  methods: { 

    goHome() {
      const userData = JSON.parse(sessionStorage.getItem('userData')) || {}
      const inviteCode = this.$route.query.inviteCode || ''
      if (!userData.id) {
        window.location.href = `/login?inviteCode=${inviteCode}`
      }
    },
    // 分享
    wxShare() {
      const userData = JSON.parse(window.sessionStorage.getItem('userData')) || {}
      const inviteCode = userData.inviteCode || this.$route.query.inviteCode || ''
      commonJs.outSideShare({
        title: '乐选',
        desc: `幸福好管家，经营好帮手`,
        link: `${commonJs.getUrl()}/login?inviteCode=${inviteCode}`,
        img: `${commonJs.getUrl()}/static/logo.png`
      })
    },
    // 获取客户端IP
    apiClientIp(callback) {
      payClientIp({}).then((res)=>{ 
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
    apiPayMobileUnified(parameter, callback) {
      const data = Object.assign({}, parameter)
      var timer = setTimeout(() => {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '加载中'
        })
      }, 300)
      apiUnifiedMobile(parameter).then((res)=>{
        clearTimeout(timer)
        if (res.code.toString() === '10000') {
          callback && callback(res)
        } else {
          Toast.fail(res.msg)
        }
        Toast.clear()
      }).catch((error)=>{
        clearTimeout(timer)
        Toast.clear()
        console.log('error', error)
        Toast.fail(error)
      })
    },
    // 手机加密
    mobileEncryption() {
      const mobile = this.$route.query.mobile || ''
      const formatMobile = mobile.substr(0, 3) + '****' + mobile.substr(7)
      return formatMobile
    },
    // 倒计时
    getAuthTime() {
      this.authTime = 60
      this.sendAuthCode = false
      const authTimeTimer = setInterval(() => {
        this.authTime--
        if (this.authTime <= 0) {
          this.sendAuthCode = true
          clearInterval(authTimeTimer)
        }
      }, 1000)
    },
    // 获取验证码
    async getAuthCode() {
      
      const commitDataTwo = {
        clientIp: this.payClientIp, // ip
        requestId: new Date().getTime(), // 请求流水
        'methodType': 'QuickSignSms',
        'smsOrderNo': this.$route.query.smsOrderNo,
        'smsOrderType': 1,
        'agrNo': this.$route.query.agrNo,
        platform: this.platform,
        mercId: commonJs.getPlatform().mercId
      }
      this.apiPayMobileUnified(commitDataTwo, () => {

      })
    },

    // 校验验证码
    async verifyAuthCode() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/

      if (this.$route.query.mobile === null || !this.$route.query.mobile) {
        this.$toast('请输入手机号码')
      } else if (!reg.test(this.$route.query.mobile)) {
        this.$toast('手机格式不正确')
      } else if (this.form.smsCode === null) {
        this.$toast('请输入验证码')
      } else {
        this.getAuthCode()
      }
    },

    // 判断按钮是否禁用
    handleCode() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (reg.test(this.$route.query.mobile) && this.form.smsCode.length >= 1) {
        this.disabledBtn = false
      } else {
        this.disabledBtn = true
      }
    },

    // 校验
    verifyTel() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/

      if (this.$route.query.mobile === null || !this.$route.query.mobile) {
        this.$toast('请输入手机号码')
      } else if (!reg.test(this.$route.query.mobile)) {
        this.$toast('手机格式不正确')
      } else {
        this.getAuthCode()
      }
    },
    // 跳转支付
    handlePay() {
      const commitDataOne = {
        'methodType': 'QuickSignConfirm',
        requestId: new Date().getTime(), // 请求流水
        clientIp: this.payClientIp, // ip
        smsCode: this.form.smsCode,
        smsOrderNo: this.$route.query.smsOrderNo,
        agrNo: this.$route.query.agrNo,
        platform: this.platform,
        mercId: commonJs.getPlatform().mercId
      }
      this.apiPayMobileUnified(commitDataOne, () => {
        this.$router.push({
          name: 'PayBindingSucceed'
        })
      })
    }

  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  background: #fff;
  text-align: center;

  &__logo {
    padding: 28px 0 30px;
    text-align: center;

    .desc {
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 22px;
      margin-top: 10px;

      .mobile {
        color: #47D9AB;
      }
    }

    .img {
      width: 77px;
      height: 77px;
      margin: 0 auto;
    }

    .title {
      color: #333;
      font-size: 20px;
      margin-top: 10px;
      line-height: 28px;
      font-weight: bold;
    }
  }

  &__form {
    .mobile {
      width: 335px;
      display: flex;
      height: 44px;
      margin: 0 auto;
      line-height: 44px;
      border-radius: 2px;
      border: 1px solid #ccc;

      &--icon {
        width: 24px;
        height: 24px;
        margin-top: 10px;
        padding-left: 20px;
      }

      &--region {
        font-size: 16px;
        padding: 0 11px 0 10px;
        color: #0079ff;
        display: inline-block;
      }

      &--bedeck {
        width: 2px;
        height: 24px;
        margin-top: 10px;
        background: #e6e6e6;
        display: inline-block;
      }

      &--input {
        text-indent: 10px;

        input::-webkit-input-placeholder {
          color: #ccc;
          font-size: 16px;
          padding-left: 10px;
        }
      }

      &--code {
        top: 0;
        right: 20px;
        font-size: 14px;
        color: #aa9160;
        position: absolute;
      }

      &--count-down {
        color: #ccc;
      }
    }

    .modifier {
      margin-top: 20px;
      position: relative;

      /deep/ .van-cell {
        width: 150px;
      }
    }

    .decorate {
      margin: 0 auto;
    }
  }

  &__footer {
    .btn-save {
      width: 335px;
      margin: 46px 0 10px;
      background: #333;
    }

    .describe {
      color: #ccc;
      font-size: 12px;
      line-height: 18px;

      span {
        color: #47D9AB;
      }
    }
  }

  /deep/ .van-cell {
    font-size: 16px;
  }

  /deep/ .van-button--danger {
    font-size: 16px;
    background:linear-gradient(225deg,rgba(10,211,238,1) 0%,rgba(10,190,213,1) 100%);
    border-radius:2px;
    border:none;
  }
}
</style>
