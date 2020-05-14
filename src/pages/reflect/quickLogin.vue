<template>
  <div>
    <div class="quickLoginContainer">
      <!-- <img src="../../assets/img/login/img_100_01@2x.png" class="bg" /> -->
      <div class="bg"></div>
      <div class="loginBox">
        <img class="image" src="../../assets/img/login/logo_03@2x.png" />
        <!-- <span class="text">— 欢 迎 来 到 赚 播 —</span> -->
      </div>
      <div class="loginButton" v-if="showLogin" @click="login">手机号码登录</div>
      <div class="wxLoginButton" v-if="commonJs.isWeiXin()" @click="handleQuickLogin">
        <img class="img" src="../../assets/img/login/Combined_Shape@2x.png" />
        <span class="description">微信登录</span>
      </div>
      <!-- <div class="agreement">注册即表示你同意 
        <span @click="handleUserAgreement" class="text" data-type="0" bindtap="junpAgreement">用户协议</span>
         和
         <span @click="handlePrivacy" class="text" data-type="1" bindtap="junpAgreement">隐私政策</span>
      </div> -->
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
      showLogin: false,
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
          redirectUrl: `${window.location.origin}/reflect`
        }) // 设置获取-首次和登录后的inviteCode111
      }

      if(query.showLogin==1){
        this.showLogin = true;
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
      window.location.href = `${window.location.origin}/reflect/login?inviteCode=${inviteCode}`
    },
    // 点击快捷登录的时候
    handleQuickLogin(){
      if(commonJs.isWeiXin()){
        this.quickLogin();
      }else{
        Toast(`该微信尚未绑定幸福引力账号`)
      }
    },

    // 点击快捷登录
    quickLogin(){
      const query = this.$route.query
      // 判断来源使用appid
      let appid = commonJs.config.appidZhuanbo
      const state = Math.random().toString()
      let inviteCode = query.inviteCode || ''
      const redirect_uri = encodeURIComponent(`${commonJs.config.baseZhuanboUrl}/reflect/getQuickLoginCode?inviteCode=${inviteCode}&myappid=${appid}&t=${state}`)

      location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
    },
  }
}
</script>

<style lang="less" scoped>
.quickLoginContainer {
  .bg {
    // width: 375px;
    // height: 603px;
    background: #F6FAF8;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -1;
  }
  .loginBox {
    width: 100%;
    position: absolute;
    left: 0;
    top: 100px;
  }
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
    background: linear-gradient(
      225deg,
      rgba(51, 51, 51, 1) 0%,
      rgba(26, 26, 26, 1) 100%
    );
    border-radius: 2px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 44px;
    text-align: center;
    position: absolute;
    left: 50%;
    margin-left: -167px;
    bottom: 148px;
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
    background:rgba(7,193,96,1);
    color:rgba(255,255,255,1);
    line-height: 44px;
    text-align: center;
    position: absolute;
    left: 50%;
    margin-left: -167px;
    bottom: 89px;
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
