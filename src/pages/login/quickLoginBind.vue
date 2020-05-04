<template>
  <div>
    <div class="login ignore-login"
         v-if="isShow && notShow">

      <div class="userImgLayout">
        <div class="loginLogo">
          <img class="loginLogoImg"
               src="../../assets/img/login/login_logo.png" />
        </div>
        <div>
          <div class="img">
            <img v-if="userData.headImgUrl"
                 :src="userData.headImgUrl"
                 alt="">
            <img v-else
                 src="../../assets/img/home/head portrait_02@2x.png"
                 alt="">
          </div>
          <div class="Inviter"
               v-if="userData.nickname">
            <span class="leftbar">邀请人：</span>
            <span class="rightbar">{{ userData.nickname }}</span>

            <!-- <div class="description">
              邀请你成为TA的粉丝
            </div> -->
          </div>

        </div>
      </div>

      <!-- logo -->
      <!-- <div class="login__logo">
      <img class="img"
           src="../../assets/img/login/App Icon 60 x 60@2x.png"
           alt="">
      <p class="title">幸福引力商城
        <p />
    </div> -->

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
                     @input="handleCode" />
        </div>
        <CountryAreaNo class="decorate"
                       v-click-outside="onClickOutside"
                       v-show="checkDialog.visible"
                       :visible.sync="checkDialog.visible" />
        <div class="mobile modifier"
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
                    :disabled="disabledBtn"
                    @click="login">{{ type === 1 ? '一键注册' : '登录 / 注册' }}</van-button>
        <p class="describe">
          登录/注册即表示你同意
          <!-- <router-link :to="{ name: 'UserAgreement' }">
          <span>《用户协议》</span>
        </router-link> -->
          <span @click="handleUserAgreement">《用户协议》</span>
          和
          <!-- <router-link :to="{ name: 'Privacy' }">
          <span>《隐私政策》</span>
        </router-link> -->
          <span @click="handlePrivacy">《隐私政策》</span>
        </p>
      </div>

      <!-- 邀请码 inviteCode -->
      <van-dialog className="inviteCodeShow"
                  v-model="inviteCodeShow"
                  title="请输入邀请码"
                  :show-confirm-button="false">
        <div class="inviteCodeShowInput">
          <van-field v-model="form.inviteCode"
                     placeholder="请输入邀请码"
                     autofocus />
        </div>
        <div class="inviteCodeShowBtns">

          <van-button type="default"
                      class="inviteCodeShowCancelBtn"
                      @click="inviteCodeShowCancel">取消</van-button>
          <div class="btnLine"></div>
          <van-button type="default"
                      class="inviteCodeShowSuccessBtn"
                      @click="login">确认</van-button>
        </div>
      </van-dialog>



      <!-- 登录绑定 -->
      <van-dialog className="loginBindShow"
                  v-model="loginBindShow"
                  title=""
                  :show-confirm-button="false">
        <!-- <div class="loginBindShowInput">
          <van-field v-model="form.loginBind"
                     placeholder="请输入邀请码"
                     autofocus />
        </div> -->
        <div class="loginBindShowInput">
          该手机号码已注册，是否确认绑定该微信号与手机号码
        </div>
        <div class="loginBindShowBtns">

          <van-button type="default"
                      class="loginBindShowCancelBtn"
                      @click="loginBindCancel">取消</van-button>
          <div class="btnLine"></div>
          <van-button type="default"
                      class="loginBindShowSuccessBtn"
                      @click="loginBindOk">确认</van-button>
        </div>
      </van-dialog>
    </div>
    <div v-if="!notShow">
      <PreLoading />
    </div>
  </div>
</template>

<script>
import commonJs from '@/util/common'
import CountryAreaNo from './CountryAreaNo'
import clickOutside from '@/util/bind'

import PreLoading from '../../components/preLoading'

export default {
  name: 'Login',

  components: {
    CountryAreaNo,
    PreLoading
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
      inviteCodeShow: false, // 邀请码
      notShow: true,
      userData: {},

      loginBindShow: false, // 是否弹出绑定
    }
  },

  created() {
    this.init()
  },

  mounted() {
    this.getParams()
  

    this.$nextTick(() => {
      this.getInviteCode()
    })
  },

  methods: {
    // 初始化
    init() {
    },

    // 微信联登绑定
    async apiLoginAuthWxBind(obj){
      const inviteCode = this.form.inviteCode || this.$route.query.inviteCode;
      const getLoginAuthWxBind = JSON.parse(window.sessionStorage.getItem('loginAuthWxBind')) || {}      
       let loginAuthWxBindData = Object.assign({},{
        // tokenId: getLoginAuthWxBind.data.tokenId,
        tokenId: getLoginAuthWxBind.tokenId,
        mobile: this.form.mobile,
        code: this.form.code,
        sureBind: 0,
        inviteCode: inviteCode,
        source: 'h5',
      },obj)
      const resLoginAuthWxBind = await this.$post(this.$api.loginAuthWxBind, loginAuthWxBindData)

      console.log('resLoginAuthWxBind', resLoginAuthWxBind)

      if (resLoginAuthWxBind.code.toString() === '10000') {
        const getInviteCodeRedirectUrlFn = commonJs.getInviteCodeRedirectUrlFn()
        window.sessionStorage.setItem('userData', JSON.stringify(resLoginAuthWxBind.data)) // 这个保持跟之前一样。
        const inviteCode = resLoginAuthWxBind.data.inviteCode || ''
        if (getInviteCodeRedirectUrlFn && getInviteCodeRedirectUrlFn.redirectUrl) { // 跳转逻辑，如果商品详情存在 redirectUrl 就跳转到登录
          window.location.href = `${getInviteCodeRedirectUrlFn.redirectUrl}?inviteCode=${inviteCode}`
        }else{
          window.location.href = `/my?inviteCode=${inviteCode}`
        }
        
      }else if (resLoginAuthWxBind.code.toString() === '10007') {
        // 用户不存在
        this.inviteCodeShow = true // 注册并且登录
      } else if (resLoginAuthWxBind.code.toString() === '10047') {
        // 邀请码不存在
        this.inviteCodeShow = true // 邀请码不存在11
      } else if (resLoginAuthWxBind.code.toString() === '10025') {
        this.loginBindShow = true // 该手机号码已注册，是否确认绑定该微信号与手机号码
      } else {
        this.$toast(resLoginAuthWxBind.msg)
      }
    },

    // 获取参数
    getParams() {
      this.type = Number(this.$route.query.type) || ''
      this.inviteCode = this.$route.query.inviteCode || ''
      // window.sessionStorage.setItem('inviteCode', JSON.stringify(this.$route.query))
      this.isShow = true
    },

    // 校验
    verifyTel() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/

      // if (this.form.mobile === null || !this.form.mobile) {
      //   this.$toast('请输入手机号码')
      // } else if (!reg.test(this.form.mobile)) {
      //   this.$toast('手机格式不正确')
      // } else {
      //   this.getAuthCode()
      // }

      if (this.form.mobile === null || !this.form.mobile) {
        this.$toast('请输入手机号码')
      } else {
        this.getAuthCode()
      }
    },

    // 获取验证码
    async getAuthCode(fn) {
      

      const paramsData = Object.assign({}, {
        type: 6,
        areaCode: this.checkDialog.number === null ? '86' : this.checkDialog.number,
        mobile: this.form.mobile
      })
      const res = await this.$post(this.$api.authCode, paramsData)

      try {
        if (res.code === '10004' || res.code === '10029' || res.code === 10014) {
          this.authTime = 60
          this.sendAuthCode = false
          const authTimeTimer = setInterval(() => {
            this.authTime--
            if (this.authTime <= 0) {
              this.sendAuthCode = true
              clearInterval(authTimeTimer)
            }
          }, 1000)

          fn && fn()

          return
        } else if (res.code === '10028') {
          this.$toast('该手机号码已经注册')
          return
        }

        this.$toast(res.msg)
      } catch (error) {
        console.error(error)
      }
    },

    // 校验验证码
    async verifyAuthCode() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/

      if (this.form.mobile === null || !this.form.mobile) {
        this.$toast('请输入手机号码')
      } else if (this.form.code === null) {
        this.$toast('请输入验证码')
      } else {
        const res = await this.$post(this.$api.checkCode, this.form)
        try {
          if (res.code.toString() === '10000') {
            this.register()
          } else if (res.code.toString() === '10017' || res.code.toString() === '10019') {
            this.$toast(res.msg)
          }
        } catch (error) {
          console.error(error)
        }
      }
    },

    // 登录或注册
    login() {
      this.apiLoginAuthWxBind();
    },
    // 取消注册
    inviteCodeShowCancel() {
      this.inviteCodeShow = false
    },

    // 判断按钮是否禁用
    handleCode() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      // if (reg.test(this.form.mobile) && this.form.code.length >= 1) {
      //   this.disabledBtn = false
      // } else {
      //   this.disabledBtn = true
      // }
      if (this.form.mobile.length > 0 && this.form.code.length >= 1) {
        this.disabledBtn = false
      } else {
        this.disabledBtn = true
      }
    },

    // 国家地区编号显示
    handleAreaCode(event) {
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

    // 事件处理
    onClickOutside() {
      if (this.child && !this.child.contains(event.target)) {
        this.checkDialog.visible = false
      }
    },
    // 用户协议
    handleUserAgreement() {
      this.$router.push({
        name: 'ZHuanboUserAgreement',
      })
    },

    // 隐私政策
    handlePrivacy() {
      this.$router.push({
        name: 'ZHuanboPrivacy',
      })
    },

    // 获取邀请码换用户信息
    async getInviteCode() {
      const inviteCodeRedirectUrl = JSON.parse(sessionStorage.getItem('inviteCodeRedirectUrl')) || {}
      const paramsData = Object.assign({}, { inviteCode: inviteCodeRedirectUrl.firstInviteCode.inviteCode || '' })
      const res = await this.$post(this.$api.inviteCode, paramsData)

      try {
        if (res.code.toString() === '10000' || res.code.toString() === '10404') {
          this.userData = res.data
        }
      } catch (error) {
        console.error(error)
      }
    },
    // 绑定ok
    loginBindOk(){
      this.apiLoginAuthWxBind({
        sureBind: 1,
      })
      this.loginBindShow = false;
    },
    // 绑定取消
    loginBindCancel(){
      this.loginBindShow = false;
    },
  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  background: #f5f8fa;
  text-align: center;

  .userImgLayout {
    width: 375px;
    height: 200px;
    background: url(../../assets/img/login/bg_01@2x.png) center center
      no-repeat;
    background-size: 100% 100%;
    .loginLogo {
      position: absolute;
      left: 138px;
      top: 84px;
      .loginLogoImg {
        width: 100px;
        height: 43px;
      }
    }
    .img {
      padding-top: 164px;
      text-align: center;
      img {
        display: block;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        object-fit: cover;
        margin: 0 auto;
      }
    }
    .Inviter {
      margin-top: 10px;
      .leftbar {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #d71d34;
        line-height: 18px;
      }
      .rightbar {
        // font-size: 16px;
        // font-family: PingFangSC-Medium, PingFang SC;
        // font-weight: 500;
        // color: #333333;
        // line-height: 18px;

        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
      }
      .description {
        height: 21px;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(200, 150, 81, 1);
        line-height: 21px;
      }
    }
  }

  &__logo {
    padding: 28px 0 30px;
    text-align: center;

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
    margin-top: 152px;
    .mobile {
      width: 335px;
      display: flex;
      height: 44px;
      margin: 0 auto;
      line-height: 44px;
      border-radius: 2px;
      border: 1px solid #ccc;
      background: #fff;

      &--icon {
        width: 24px;
        height: 24px;
        margin-top: 10px;
        padding-left: 20px;
      }

      &--region {
        font-size: 16px;
        padding: 0 11px 0 10px;
        color: #d71d34;
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
        color: #d71d34;
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
        color: #d71d34;
      }
    }

    /deep/ .van-button__text {
      color: #fff;
    }
  }

  /deep/ .van-cell {
    font-size: 16px;
  }

  /deep/ .van-button--danger {
    font-size: 16px;
    background-color: #333;
    border: 1px solid #333;
  }

  .inviteCodeShow {
    z-index: 999 !important;
    width: 270px;
    height: 200px;
    background: rgba(242, 242, 242, 1);
    border-radius: 4px;
    .inviteCodeShowBtns {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
    .btnLine {
      width: 1px;
      height: 14px;
      background: rgba(204, 204, 204, 1);
      // background: #c00;
      position: absolute;
      left: 50%;
      top: 15px;
    }
    .inviteCodeShowInput {
      padding: 20px 15px 15px 15px;
    }
    .inviteCodeShowSuccessBtn {
      width: 49%;
      display: inline-block;
      font-size: 17px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
      background: #f2f2f2;
    }
    .inviteCodeShowCancelBtn {
      width: 49%;
      display: inline-block;
      font-size: 17px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 22px;
      background: #f2f2f2;
    }
  }

  .loginBindShow {
    z-index: 999 !important;
    width: 270px;
    height: 200px;
    background: rgba(242, 242, 242, 1);
    border-radius: 4px;
    .loginBindShowBtns {
      position: absolute;
      bottom: 0;
      width: 100%;
    }
    .btnLine {
      width: 1px;
      height: 14px;
      background: rgba(204, 204, 204, 1);
      // background: #c00;
      position: absolute;
      left: 50%;
      top: 15px;
    }
    .loginBindShowInput {
      padding: 20px 15px 15px 15px;
    }
    .loginBindShowSuccessBtn {
      width: 49%;
      display: inline-block;
      font-size: 17px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
      background: #f2f2f2;
    }
    .loginBindShowCancelBtn {
      width: 49%;
      display: inline-block;
      font-size: 17px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 22px;
      background: #f2f2f2;
    }
  }
  /deep/ .van-overlay {
    z-index: 998 !important;
  }
}
</style>




<style lang="less" scoped>
@media screen and(min-width: 750px) {
  .ignore-login {
    background: #fff;
    text-align: center;
    margin: 0 auto;
    width: 375px * 2.5;

    .userImgLayout {
      width: 375px * 2.5;
      height: 200px * 2.5;
      background: url(../../assets/img/login/bg_01@2x.png) center center
        no-repeat;
      background-size: 100% 100%;
      position: relative;
      .loginLogo {
        position: absolute;
        left: 138px * 2.5;
        top: 84px * 2.5;
        .loginLogoImg {
          width: 100px * 2.5;
          height: 43px * 2.5;
        }
      }
      .img {
        padding-top: 164px * 2.5;
        text-align: center;
        img {
          display: block;
          width: 100px * 2.5;
          height: 100px * 2.5;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto;
        }
      }
      .Inviter {
        margin-top: 10px * 2.5;
        .leftbar {
          font-size: 14px * 2.5;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: #333333;
          line-height: 18px * 2.5;
        }
        .rightbar {
          font-size: 16px * 2.5;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: #333333;
          line-height: 18px * 2.5;
        }
        .description {
          height: 21px * 2.5;
          font-size: 15px * 2.5;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(200, 150, 81, 1);
          line-height: 21px * 2.5;
        }
      }
    }

    .login__logo {
      padding: 28px * 2.5 0 30px * 2.5;
      text-align: center;

      .img {
        width: 77px * 2.5;
        height: 77px * 2.5;
        margin: 0 auto;
      }

      .title {
        color: #333;
        font-size: 20px * 2.5;
        margin-top: 10px * 2.5;
        line-height: 28px * 2.5;
        font-weight: bold;
      }
    }

    .login__form {
      .mobile {
        width: 335px * 2.5;
        display: flex;
        height: 44px * 2.5;
        margin: 0 auto;
        line-height: 44px * 2.5;
        border-radius: 2px;
        border: 1px solid #ccc;

        &--icon {
          width: 24px * 2.5;
          height: 24px * 2.5;
          margin-top: 10px * 2.5;
          padding-left: 20px * 2.5;
        }

        &--region {
          font-size: 16px * 2.5;
          padding: 0 11px * 2.5 0 10px * 2.5;
          color: #d71d34;
          display: inline-block;
        }

        &--bedeck {
          width: 2px * 2.5;
          height: 24px * 2.5;
          margin-top: 10px * 2.5;
          background: #e6e6e6;
          display: inline-block;
        }

        &--input {
          text-indent: 10px;

          input::-webkit-input-placeholder {
            color: #ccc;
            font-size: 16px * 2.5;
            padding-left: 10px * 2.5;
          }
        }

        &--code {
          top: 0;
          right: 20px * 2.5;
          font-size: 14px * 2.5;
          color: #d71d34;
          position: absolute;
        }

        &--count-down {
          color: #ccc;
        }
      }

      .modifier {
        margin-top: 20px * 2.5;
        position: relative;

        /deep/ .van-cell {
          width: 150px * 2.5;
        }
      }

      .decorate {
        margin: 0 auto;
      }
    }

    .login__footer {
      .btn-save {
        width: 335px * 2.5;
        margin: 46px * 2.5 0 10px * 2.5;
        background: #333;
      }

      .describe {
        color: #ccc;
        font-size: 12px * 2.5;
        line-height: 18px * 2.5;

        span {
          color: #d71d34;
        }
      }
    }

    /deep/ .van-cell {
      font-size: 16px * 2.5;
    }

    /deep/ .van-button--danger {
      font-size: 16px * 2.5;
      background-color: #333;
      border: 1px solid #333;
    }

    .inviteCodeShow {
      z-index: 999 !important;
      width: 270px * 2.5;
      height: 200px * 2.5;
      background: rgba(242, 242, 242, 1);
      border-radius: 4px;
      .inviteCodeShowBtns {
        position: absolute;
        bottom: 0;
        width: 100%;
      }
      .btnLine {
        width: 1px;
        height: 14px;
        background: rgba(204, 204, 204, 1);
        // background: #c00;
        position: absolute;
        left: 50%;
        top: 15px;
      }
      .inviteCodeShowInput {
        padding: 20px * 2.5 15px * 2.5 15px * 2.5 15px * 2.5;
      }
      .inviteCodeShowSuccessBtn {
        width: 49%;
        display: inline-block;
        font-size: 17px * 2.5;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 22px * 2.5;
        background: #f2f2f2;
      }
      .inviteCodeShowCancelBtn {
        width: 49%;
        display: inline-block;
        font-size: 17px * 2.5;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 22px * 2.5;
        background: #f2f2f2;
      }
    }
    /deep/ .van-overlay {
      z-index: 998 !important;
    }
  }
}
</style>
