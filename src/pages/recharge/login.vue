<!-- 登录 -->
<template>
  <div class="login">
    <!-- <div class="userImgLayout">
      <div v-if="userData.nickname">
        <div class="img">
          <img v-if="userData.headImgUrl === ''"
               src="../../assets/img/home/head portrait_02@2x.png"
               alt="">
          <img v-show="userData.headImgUrl"
               :src="userData.headImgUrl"
               alt="">
        </div>
        <div class="Inviter">
          <span class="leftbar">邀请人：</span>
          <span class="rightbar">{{ userData.nickname }}</span>
        </div>
      </div>
    </div> -->

    <!-- logo -->
    <div class="userImgLayout">
      <div class="login__logo" :class="[inputFoucus?'inputFoucus':'']">
        <img class="img"
            src="../../assets/img/login/default@2x.png"
            alt="">
        <p class="title">乐选
          <p />
      </div>
    </div>

    <!-- 表单 -->
    <div class="login__form">
      <div class="mobile">
        <img class="mobile--icon"
             src="../../assets/img/login/icon_user_01@2x(1).png"
             alt="">
        <span class="mobile--region"
              ref="areaNo"
              @click="handleAreaCode($event)">+{{ this.checkDialog.number }}</span>
        <i class="mobile--bedeck" />
        <van-field class="mobile--input"
                   clearable
                   type="tel"
                   maxlength="11"
                   v-model="form.mobile"
                   placeholder="请输入手机号"
                   @input="handleCode"
                   @focus="handleMobileFocus"
                   @blur="handleMobileBlur"
                    />
      </div>
      <CountryAreaNo class="decorate"
                     v-click-outside="onClickOutside"
                     v-show="checkDialog.visible"
                     :visible.sync="checkDialog.visible" />

      <div class="mobile modifier"
           v-if="!checkDialog.visible">
        <img class="mobile--icon"
             src="../../assets/img/login/icon_user_01@2x(2).png"
             alt="">
        <van-field class="mobile--input"
                   type="tel"
                   maxlength="4"
                   v-model="form.code"
                   placeholder="请输入验证码"
                   @input="handleCode"
                   @focus="handleCodeFocus"
                   @blur="handleCodeBlur"
                    />
        <span v-if="sendAuthCode"
              class="mobile--code"
              @click="verifyTel">获取验证码</span>
        <span v-else
              class="mobile--count-down mobile--code">{{ authTime }}s后可再次获取</span>
      </div>
    </div>

    <!-- 底部 -->
    <div class="login__footer"
         v-if="!checkDialog.visible">
      <van-button class="btn-save"
                  type="danger"
                  @click="handlelogin"
                  :disabled="form.mobile.length>0 && form.code.length>0 ?false:true">登 录</van-button>
      <!-- <p class="describe">
        <router-link :to="{ name: 'ActPasswordLogin' }">
          <span>使用密码登录</span>
        </router-link>
      </p> -->
      <!-- style="position: absolute;bottom: 20px;width: 100%;text-align: center;" 安卓兼容问题 -->


      <!-- <p class="describe">
        注册即表示你同意
        <router-link :to="{ name: 'YinliUserAgreement' }">
          <span>《用户协议》</span>
        </router-link>
        和
        <router-link :to="{ name: 'YinliPrivacy' }">
          <span>《隐私政策》</span>
        </router-link>
      </p> -->
    </div>

    
  </div>
</template>

<script>
import commonJs from '@/util/common'
import clickOutside from '@/util/bind'
import CountryAreaNo from './CountryAreaNo'
import { apiAuthCode, apiCheckCode } from '@/api/login'
import { apiUserInfoInviteCode } from '@/api/home'

import { apiRechargeShopMobileAuthLogin } from '@/api/recharge'



export default {
  name: 'actLogin',

  components: {
    CountryAreaNo
  },

  directives: {
    clickOutside
  },

  data() {
    return {
      type: null,
      authTime: 0,
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
        code: '',
        mobile: ''
      },
      actRegister: 0, // 是否注册
      userData: {},
      inputFoucus: false,
    }
  },

  created() {
  },

  mounted() {
    this.init();
    if (!commonJs.getInviteCodeRedirectUrlFn().firstInviteCode) {
      commonJs.setInviteCodeRedirectUrlFn({
        firstInviteCode: this.$route.query,
        loginInviteCode: '',
        redirectUrl: ''
      }) // 设置获取-首次和登录后的inviteCode
    }

    this.$nextTick(() => {
      this.getInviteCode()
    })
  },

  methods: {
    // 初始化
    init() {
      // if (commonJs.isWeiXin()) { // 如果是微信浏览器才执行跳转方法
      //   // const getLoginAuthorization = window.sessionStorage.getItem('loginAuthorization')
      //   // openid this.$route.query.openid
      //   // if (getLoginAuthorization && JSON.stringify(getLoginAuthorization) !== '{}') {
      //   // } else {
      //   //   const url = `${commonJs.getUrl()}/LoginMiddleware?loginSource=${commonJs.payConfig.XFyinliPAYSource}`
      //   //   window.location.href = url;
      //   // }
      //   if (this.$route.query.openid) {
      //     const data = Object.assign({}, window.sessionStorage.getItem('loginAuthorization'), {
      //       openid: this.$route.query.openid || ''
      //     })
      //     window.sessionStorage.setItem('loginAuthorization', JSON.stringify(data)) // 登录缓存信息
      //   } else {
      //     let inviteCode = this.$route.query.inviteCode || ''
      //     const url = `${commonJs.getUrl()}/LoginMiddleware?loginSource=${commonJs.payConfig.XFyinliPAYSource}&inviteCode=${inviteCode}`
      //     window.location.href = url;
      //   }
      // }
    },
    // 加载倒计时
    loadAuthTime() {
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
    getAuthCode() {
      const paramsData = Object.assign({}, {
        type: 2,
        areaCode: this.checkDialog.number === null ? '86' : this.checkDialog.number,
        mobile: this.form.mobile
      })

      apiAuthCode(paramsData).then(res => {

        console.log('res', res)
        if (res.code.toString() === '10004' || res.code.toString() === '10014') {
          // 登录
          // this.$router.push({
          //   name: 'ActVerificationCode',
          //   query: {
          //     mobile: this.form.mobile
          //   }
          // })
          this.loadAuthTime(); // 加载倒计时
          return
        } else if (res.code.toString() === '10029') {
          this.$toast(res.msg)
        } else if (res.code.toString() === '10028') {
          this.$toast('该手机号码已经注册')
        } else {
          this.$toast(res.msg)
        }
      }).catch(error => {
        this.$toast(error)
      })
    },

    // 校验验证码
    async verifyAuthCode() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/

      // if (this.form.mobile === null || !this.form.mobile) {
      //   this.$toast('请输入手机号码')
      // } else if (!reg.test(this.form.mobile)) {
      //   this.$toast('手机格式不正确')
      // } else if (this.form.code === null) {
      //   this.$toast('请输入验证码')
      // } else {
      if (this.form.mobile === null || !this.form.mobile) {
        this.$toast('请输入手机号码')
      } else if (this.form.code === null) {
        this.$toast('请输入验证码')
      } else {
        apiCheckCode(this.form).then(res => {
          if (res.code === 10000) {
            this.register()
          } else if (res.code === '10017' || res.code === '10019') {
            this.$toast(res.msg)
          }
        }).catch(error => {
          this.$toast(error)
        })
      }
    },

    // 判断按钮是否禁用
    handleCode() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (reg.test(this.form.mobile) && this.form.code.length >= 1) {
        this.disabledBtn = false
      } else {
        this.disabledBtn = true
      }
    },

    // 校验
    verifyTel() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/

      // if (this.form.mobile === null || !this.form.mobile) {
      //   this.$toast('请输入手机号码')
      // } else if (!reg.test(this.form.mobile)) {
      //   this.$toast('手机格式不正确')
      // } else {
      if (this.form.mobile === null || !this.form.mobile) {
        this.$toast('请输入手机号码')
      } else {
        this.getAuthCode()
      }
    },

    // 事件处理
    onClickOutside() {
      if (this.child && !this.child.contains(event.target)) {
        this.checkDialog.visible = false
      }
    },

    // 国家地区编号显示
    handleAreaCode() {
      this.child = this.$refs.areaNo

      Object.assign(this.checkDialog, {
        visible: true,
        number: this.checkDialog.number !== '86' ? this.checkDialog.number : '86'
      })
    },

    // 获取国家地区编号
    getAreaCode(number) {
      this.checkDialog.number = number.toString()
    },

    // login() {
    // this.$router.push({
    //   name: 'ActVerificationCode',
    //   query: {
    //     mobile: this.form.mobile
    //   }
    // })
    // }

    // 点击登录
    handlelogin() {
      this.login();
    },

    login() {
      // const { actLogin } = this.$api

      const data = Object.assign({}, this.form, {
        mobile: this.form.mobile,
        type: 4,
        inviteCode: this.$route.query.inviteCode || '',
      })
      // const res = await this.$post(actLogin, data)

      apiRechargeShopMobileAuthLogin(data).then(res => {
        if (res.code.toString() === '10000') {

          if(res.data.ptLevel!==6){
            this.$toast('你暂无权限进货')
            return false;
          }


          // 登录后，跳转详情
          let queryInviteCode = this.$route.query.inviteCode || '';
          window.sessionStorage.setItem('goodId', JSON.stringify({
            path: `${window.location.origin}/goodDetail?inviteCode=${queryInviteCode}`,
          }));
          const getInviteCodeRedirectUrlFn = commonJs.getInviteCodeRedirectUrlFn();
          if (getInviteCodeRedirectUrlFn && getInviteCodeRedirectUrlFn.redirectUrl) { // 跳转逻辑，如果商品详情存在 redirectUrl 就跳转到登录
            console.log('getInviteCodeRedirectUrlFn.redirectUrl', getInviteCodeRedirectUrlFn.redirectUrl)
            let inviteCode = res.data.inviteCode || '';
            window.location.href = `${getInviteCodeRedirectUrlFn.redirectUrl}?inviteCode=${inviteCode}`
          } else {
            let inviteCode = res.data.inviteCode || '';
            // window.location.href = `/goodDetail?inviteCode=${inviteCode}` // 商品详情

            // this.$router.push({
            //   path: `/goodDetail?inviteCode=${inviteCode}` // 商品详情
            // })
            // 现在跳download
            this.$router.push({
              name: `rechargePrice` // 跳到app
            })
            
          }

          commonJs.setInviteCodeRedirectUrlFn({
            firstInviteCode: {
              inviteCode: this.$route.query.inviteCode || '',
            },
            loginInviteCode: {
              inviteCode: res.data.inviteCode || '',
            },
            redirectUrl: null
          }) // 设置获取-首次和登录后的inviteCode
          window.sessionStorage.setItem('userData', JSON.stringify(res.data))

        } else {
          this.$toast(res.msg)
        }


      }).catch(error => {
        console.log('error', error)
        this.$toast(error)
      })
    },

    // 获取邀请码换用户信息
    async getInviteCode() {
      const inviteCodeRedirectUrl = JSON.parse(sessionStorage.getItem('inviteCodeRedirectUrl')) || {}
      const paramsData = Object.assign({}, { inviteCode: inviteCodeRedirectUrl.firstInviteCode.inviteCode || '' })
      // const res = await this.$post(this.$api.inviteCode, paramsData)
      apiUserInfoInviteCode(paramsData).then((res) => {
        if (res.code.toString() === '10000' || res.code.toString() === '10404') {
          this.userData = res.data
        }
      }).catch(error => {
        console.log('error', error)
      })

    },
    handleMobileFocus(){
      this.inputFoucus = true;
    },
    handleMobileBlur(){
      this.inputFoucus = false;
    },
    handleCodeFocus(){
      this.inputFoucus = true;
    },
    handleCodeBlur(){
      this.inputFoucus = false;
    },
  }
}
</script>

<style lang="less" scoped>
.login {
  .userImgLayout {
    width: 375px;
    height: 180px;
    // background: ('03@2x.png');1
    background: url(../../assets/img/goods/03@2x.png) center center no-repeat;
    background-size: 100% 100%;
    .img {
      padding-top: 30px;
      text-align: center;
      img {
        display:block;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        object-fit: cover;
        margin:0 auto;
        border:solid 2px #4CEDE6;
      }
    }
    .Inviter {
      margin-top: 10px;
      .leftbar {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 18px;
      }
      .rightbar {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 18px;
      }
    }
  }
  height: 100vh;
  background: #fff;
  text-align: center;

  // &__logo {

  //   left: 50%;
  //   margin-top: 20px;
    
  //   text-align: center;

  //   .img {
  //     width: 60px;
  //     height: 60px;
  //     margin: 0 auto;
  //   }

  //   .title {
  //     font-size: 14px;
  //     font-family: PingFangSC-Medium, PingFang SC;
  //     font-weight: 500;
  //     color: rgba(102, 102, 102, 1);
  //     line-height: 20px;
  //     margin-top: 5px;
  //   }
  // }

  &__logo {
    padding: 28px 0 30px;
    text-align: center;

    .img {
      width: 60px;
      height: 60px;
      margin: 0 auto;
    }

    .title {
      font-size:16px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color:rgba(255,255,255,1);
      line-height:22px;
      margin-top: 10px;
    }
  }
  &__logo.inputFoucus{

    // position: relative;
    // left: 50%;
    // margin-left: -30px;
    // bottom: 0;
    // padding: 50px 0 30px;
    
    // text-align: center;
  }

  &__form {
    .mobile {
      width: 335px;
      display: flex;
      height: 44px;
      margin: 30px auto 0;
      line-height: 44px;
      border-radius: 2px;
      border: 1px solid #ccc;

      /deep/ .van-field__control {
        margin-top: 2px;
      }

      &--icon {
        width: 24px;
        height: 24px;
        margin-top: 10px;
        padding-left: 20px;
      }

      &--region {
        font-size: 16px;
        padding: 1px 11px 0 10px;
        color: #0079FF;
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
        top: 2px;
        right: 20px;
        font-size: 14px;
        color: #09C2DA;
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
        color: #09C2DA;
      }
    }
  }

  /deep/ .van-cell {
    font-size: 16px;
  }

  /deep/ .van-button--danger {
    font-size: 16px;   
    background:linear-gradient(225deg,rgba(10,211,238,1) 0%,rgba(10,190,213,1) 100%);
    border: 0px;
    color: #ffffff;
  }
}
</style>
