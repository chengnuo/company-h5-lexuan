<template>
  <div class="help">
    <div class="header">
      <div class="bg">
        <img class="bg__logo"
             src="../../assets/img/help/service_01_01@2x.png"
             alt="">
        <div class="wrap">
          <p class="wrap__title bedeck">1.如何注册成为乐选用户？</p>
          <p class="wrap__explain">由乐选代理邀请或联系客服，可申请成为乐选用户</p>
          <p class="wrap__title">2.我已经是乐选用户/代理，但是无法登录成功？</p>
          <p class="wrap__explain">这可能是你的账号未更新数据导致的，请联系客服咨询处理。</p>
        </div>
      </div>
    </div>
    <div class="footer">
      <span>客服电话：</span><a href="tel:4009963568">4009963568</a>
    </div>
  </div>
</template>

<script>
import commonJs from '@/util/common'
export default {
  name: 'Help',
   mounted(){
    commonJs.setDocumentTitle('帮助');
  },
}
</script>

<style lang="less" scoped>
.help {
  width: 375px;
  height: 100vh;
  background: #f5f8fa;

  .header {
    padding: 10px 0 40px;   

    .bg {
      width: 345px;
      height: 320px;
      margin: 0 15px;
      padding-bottom:20px;
      background: url("../../assets/img/help/bg_04@2x.png") no-repeat center;
      background-size: 100% 100%;

      &__logo {
        width: 110px;
        height: 110px;
        margin: 0 auto;
        padding-top: 20px;
      }
    }

    .wrap {
      text-align: justify;
      padding: 0 22px 0 15px;

      &__title {
        font-size: 16px;
        color:#47D9AB;
        font-weight: 600;
      }

      &__explain {
        color: #666;
        font-size: 14px;
        line-height: 20px;
        margin-top: 5px;
      }
    }

    .bedeck {
      padding-top: 30px;
    }
  }

  .footer {
    width: 100%;
    text-align: center;
    position: absolute;
    left:0;
    bottom:20px;
    height:20px;
    font-size:14px;
    font-weight:400;
    color:rgba(51,51,51,1);
    line-height:20px;
    a{
      color:#09C2DA;
    }
  }
}
</style>
