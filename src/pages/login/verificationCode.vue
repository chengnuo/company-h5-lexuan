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
        <div class="desc">请输入 <span class="mobile">{{mobileEncryption()}}</span> 收到的4位验证码</div>
    </div>

    <!-- 表单 -->
    <div class="login__form">
      <CountryAreaNo class="decorate"
                     v-click-outside="onClickOutside"
                     v-show="checkDialog.visible"
                     :visible.sync="checkDialog.visible" />
      <div class="mobile"
           v-if="!checkDialog.visible">
        <img class="mobile--icon"
             src="../../assets/img/login/icon_user_01@2x.png"
             alt="">
        <van-field class="mobile--input"
                   clearable
                   type="tel"
                   maxlength="4"
                   v-model="form.code"
                   placeholder="请输入验证码"
                   @input="handleCode" />
      </div>
    </div>

    <!-- 底部 -->
    <div class="login__footer"
         v-if="!checkDialog.visible">
      <van-button class="btn-save"
                  type="danger"
                  @click="handlelogin"
                  :disabled="form.code.length>0?false:true">验 证</van-button>
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
import clickOutside from '@/util/bind'
import CountryAreaNo from './CountryAreaNo'

import { apiAuthCode, apiCheckCode, apiLogin, apiRegister } from '@/api/login'

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
      }
    }
  },

  created() {
  },

  mounted() {
    this.getAuthTime()
  },

  methods: {
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
    getAuthCode() {
      const paramsData = Object.assign({}, {
        type: 6,
        areaCode: this.checkDialog.number === null ? '86' : this.checkDialog.number,
        mobile: this.$route.query.mobile
      })
      apiAuthCode(paramsData).then(res=>{
        if (res.code.toString() === '10004' || res.code.toString() === '10029' || res.code.toString() === '10014') {
          this.getAuthTime()
          return
        } else if (res.code === '10028') {
          this.$toast('该手机号码已经注册')
          return
        }
        this.$toast(res.msg)

      }).catch(error=>{
        this.$toast(error)
      })
    },

    // 校验验证码
    verifyAuthCode() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/

      if (this.$route.query.mobile === null || !this.$route.query.mobile) {
        this.$toast('请输入手机号码')
      } else if (!reg.test(this.$route.query.mobile)) {
        this.$toast('手机格式不正确')
      } else if (this.form.code === null) {
        this.$toast('请输入验证码')
      } else {
        // const res = await this.$post(this.$api.checkCode, this.form)
        apiCheckCode(this.form).then(res=>{
          if (res.code === 10000) {
            this.register()
          } else if (res.code === '10017' || res.code === '10019') {
            this.$toast(res.msg)
          }
        }).catch(error=>{
          this.$toast(error)
        })
      }
    },

    // 判断按钮是否禁用
    handleCode() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (reg.test(this.$route.query.mobile) && this.form.code.length >= 1) {
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

    // 点击登录
    handlelogin() {
      if (this.$route.query.actRegister) { // 如果是注册
        if (this.$route.query.inviteCode) { // 如果带了邀请码
          this.actRegisterAndLogin()
        } else { // 没有邀请码去填写邀请码
          this.$router.push({
            name: 'ActInviteCode',
            query: {
              mobile: this.$route.query.mobile,
              actRegister: this.$route.query.actRegister,
              code: this.form.code
            }
          })
        }
      } else {
        this.login() // 登录
      }
    },

    login() {
      // const { actLogin } = this.$api

      const data = Object.assign({}, this.form, {
        mobile: this.$route.query.mobile,
        type: 4
      })
      // const res = await this.$post(actLogin, data)

      apiLogin(data).then(res=>{
        if (res.code.toString() === '10000') {
          window.sessionStorage.setItem('userData', JSON.stringify(res.data)) // 这个保持跟之前一样。
          this.$router.push({
            name: 'ActLoginSuccess'
          })
          return
        }
        this.$toast(res.msg)

      }).catch(error=>{
        this.$toast(error)
      })
    },

    // 注册并且登录
    actRegisterAndLogin() {
      const data = Object.assign({}, this.form, {
        mobile: this.$route.query.mobile,
        code: this.form.code,
        inviteCode: this.$route.query.inviteCode
      })

      apiRegister(data).then(res=>{
        if (res.code.toString() === '10000') {
          window.sessionStorage.setItem('userData', JSON.stringify(res.data)) // 这个保持跟之前一样。
          this.$router.push({
            name: 'ActLoginSuccess'
          })
          return
        }
        this.$toast(res.msg)
      }).catch(error=>{
        this.$toast(error)
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
        color: #c89651;
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
      background:rgba(255,255,255,1);
      border-radius:22px;
      border:1px solid rgba(230,230,230,1);
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
        border-radius:22px;

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
        color: #DB9202;
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
        color: #DB9202;
      }
    }
  }

  /deep/ .van-cell {
    font-size: 16px;
  }

  /deep/ .van-button--danger {
    font-size: 16px;
    background:linear-gradient(45deg,rgba(230,0,23,1) 0%,rgba(204,0,20,1) 100%);
    border-radius:22px;
    font-size:16px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(255,255,255,1);
    line-height:22px;
  }
}
</style>
