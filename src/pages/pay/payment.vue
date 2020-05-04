<template>
  <div class="loginSuccessContainer">
    <img src="../../assets/img/pay/payment.png" class="payImg">
    <p class="text">支付成功</p>
    <van-button class="down" @click="download">下载名品玩家APP，查看收益情况</van-button>
  </div>
</template>

<script>

export default {
  name: 'loginSuccess',
  data() {
    return {

    }
  },
  methods: {
    // 跳转应用商店
    download() {
      const ua = window.navigator.userAgent
      const isIos = /(iPhone|iPad|iPod|iOS)/i.test(ua)

      if (isIos) {
        // window.location.href = 'https://itunes.apple.com/cn/app/%E5%90%8D%E5%93%81%E7%8C%AB%E5%95%86%E5%9F%8E/id1460545620?mt=8'
        window.location.href = 'https://apps.apple.com/cn/app/%E5%90%8D%E5%93%81%E7%8E%A9%E5%AE%B6/id1468044355' // 名品玩家苹果链接
      } else {
        // window.location.href = 'https://sj.qq.com/myapp/detail.htm?apkName=com.xfhl.mpm'
        window.location.href = 'https://sj.qq.com/myapp/detail.htm?apkName=com.xfhl.mpmpartner' // 名品玩家安卓链接
      }
    }
  }
}
</script>

<style  lang="less">
  .loginSuccessContainer{
    width: 100%;
    min-height: 100%;
    position: absolute;
    left: 0;
    top:0;
    background: #fff;
    .payImg{
      width: 120px;
      margin:0 auto;
      display: block;
      margin-top:60px;
      margin-bottom:10px;
    }
    p{
      margin:0 auto;
    }
    .text{
      height:28px;
      font-size:20px;
      font-weight:600;
      color:rgba(51,51,51,1);
      line-height:28px;
      text-align: center;
    }
    .title{
      width:88%;
      height:22px;
      font-size:16px;
      font-weight:500;
      color:rgba(200,150,81,1);
      line-height:22px;
      margin-top: 50px;
      margin-bottom: 5px;
    }
    .dec{
      width:88%;
      font-size:14px;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:20px;
    }
    .down{
      width:88%;
      height:44px;
      background:linear-gradient(225deg,rgba(51,51,51,1) 0%,rgba(26,26,26,1) 100%);
      border-radius:2px;
      margin:0 auto;
      display: block;
      margin-top: 100px;
      color:#fff;
      text-align: center;
      line-height: 44px;
      font-size:16px;
    }
  }
</style>
