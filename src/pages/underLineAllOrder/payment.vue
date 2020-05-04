<template>
  <div class="loginSuccessContainer">
    <img src="../../assets/img/login/Mask@2x.png" class="payImg">
    <p class="text">发货成功</p>
    <a href="javascript:;" class="btn jumpFristPage" @click="jumpFristPage">返回</a>
  </div>
</template>

<script>

import { Popup } from 'vant';
export default {
  name: 'loginSuccess',
  data() {
    return {
      show: false
    }
  },
  methods: {
    jumpFristPage(){
      this.$router.push({
        name: 'my',
      })
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
    .textBottom{
      height:17px;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:17px;
      text-align: center;
      margin-top: 20px;
      margin-bottom: 63px;
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
    .tip{
      width: 100%;
    } 
    .dec{
      width:88%;
      font-size:14px;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:20px;
    }
    .btn{
      width: 335px;
      height:44px;
      font-size:16px;
      background:linear-gradient(225deg,rgba(10,211,238,1) 0%,rgba(10,190,213,1) 100%);
      border-radius:2px;
      font-weight:400;
      color:rgba(255,255,255,1);
      display: block;
      margin-top: 30px;
      line-height: 44px;
      text-align: center;
      margin: 0 auto;
      margin-top:100px;
    }
  }
</style>
