<template>
  <div>
    <div class="quickLoginContainer">
      <div class="bg"></div>
      <div class="bg2"></div>
      <div class="loginBox">
        <!-- <img class="image" src="../../assets/img/login/logo_03@2x.png" /> -->
      </div>
      
      <!-- v-if="commonJs.isWeiXin()" -->
      <div class="wxLoginButton" v-if="commonJs.isWeiXin()" @click="handleQuickLogin">
        <img class="img" src="../../assets/img/login/Combined_Shape@2x.png" />
        <span class="description">微信登录</span>
      </div>
      <div class="loginButton" @click="login">手机号码登录</div>
    </div>
  </div>
</template>

<script>

import commonJs from '@/util/common'
import PreLoading from '../../components/preLoading'


import { Toast } from 'vant'

export default {
  name: 'QuickLogin',

  components: {
    PreLoading
  },
  
  data() {
    return {
      commonJs,
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {

      // 缓存数据
      const query = this.$route.query
      const params = this.$route.params
      if (!commonJs.getInviteCodeRedirectUrlFn().firstInviteCode) {
        commonJs.setInviteCodeRedirectUrlFn({
          firstInviteCode: this.$route.query || '',
          loginInviteCode: '',
          // redirectUrl: `${window.location.origin}${window.location.pathname}`
          redirectUrl: `${window.location.origin}/my`
        }) // 设置获取-首次和登录后的inviteCode111
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

    login(){
      const query = this.$route.query
      let inviteCode = query.inviteCode || ''
      window.location.href = `${window.location.origin}/login?inviteCode=${inviteCode}`
    },
    // 点击快捷登录的时候
    handleQuickLogin(){
      if(commonJs.isWeiXin()){
        this.quickLogin();
      }else{
        Toast(`请到微信里面登录`)
      }
    },

    // 点击快捷登录
    quickLogin(){
      const query = this.$route.query
      // 判断来源使用appid
      let appid = commonJs.config.appidZhuanbo
      const state = Math.random().toString()
      let inviteCode = query.inviteCode || ''
      const redirect_uri = encodeURIComponent(`${commonJs.config.baseZhuanboUrl}/loginMiddleware/getQuickLoginCode?inviteCode=${inviteCode}&myappid=${appid}&t=${state}`)

      location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
    },
  }
}
</script>

<style lang="less" scoped>
.quickLoginContainer {
  // .bg {
  //   width: 375px;
  //   height: 603px;
  // }
  .bg {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -1;
    background: url("../../assets/img/login/icon_bg_01@2x.png") no-repeat;
    background-size: 375px 286px;
  }
  .bg2 {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -1;
    background: url("../../assets/img/login/icon_bg_02@2x.png") no-repeat;
    background-size: 375px 310px;
    background-position: 0 bottom;
  }
  .loginBox {
    width: 100%;
    position: absolute;
    left: 0;
    top: 100px;
  }
  // .loginBox .image {
  //   width: 165px;
  //   height: 71px;
  //   margin: 0 auto;
  //   display: block;
  // }

  .loginBox .image {
    width: 140px;
    height: 140px;
    margin: 0 auto;
    display: block;
  }
  .loginBox .text {
    width: 100%;
    text-align: center;
    height: 22px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 22px;
    display: block;
    margin-top: 12px;
  }
  .loginButton {
    width: 335px;
    height: 44px;
    background:linear-gradient(225deg,rgba(255,103,0,1) 0%,rgba(237,173,57,1) 100%);
    border-radius:22px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 44px;
    text-align: center;
    position: absolute;
    left: 50%;
    margin-left: -167px;
    bottom: 49px;
  }
  .wxLoginButton {
    width: 335px;
    height: 44px;
    background: linear-gradient(
      225deg,
      rgba(51, 51, 51, 1) 0%,
      rgba(26, 26, 26, 1) 100%
    );
    border-radius: 2px;
    font-size: 16px;
    font-weight: 400;
    background:linear-gradient(45deg,rgba(230,0,23,1) 0%,rgba(204,0,20,1) 100%);
    border-radius:22px;
    color:rgba(255,255,255,1);
    line-height: 44px;
    text-align: center;
    position: absolute;
    left: 50%;
    margin-left: -167px;
    bottom: 123px;
    .img{
      width:28px;
      height:23px;
      position:absolute;
      left: 119px;
      top: 11px;
    }
    .description{
      position:absolute;
      left: 153px;
      top: 11px;
      line-height:22px;
    }
  }
  .agreement {
    width: 100%;
    height: 20px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 20px;
    position: absolute;
    left: 0;
    bottom: 65px;
    text-align: center;
  }
  .agreement .text {
    color: #d71d34;
  }
}
</style>
