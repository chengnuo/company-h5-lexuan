<template>
  <div class="warp">
   <!--  <img src="../../assets/img/login/Mask@2x.png" class="suc">
    <p class="dec">注册成功</p> -->
    <div @click="down" class="imgbox">
      <img src="../../assets/img/download/newedition_01@2x.jpg" alt="" class="bottom" @click="down">
    </div>
    <a href="javascript:;" @click="down" class="down">下载乐选APP</a>
    <van-popup v-model="show" position="top">
      <img src="../../assets/img/download/img_01@2x.png" class="tip">
    </van-popup>
    <goBack v-if="showBack" :index="2"/>
  </div>
</template>
<script>
  import { Popup } from 'vant';
  import goBack from '@/components/goBack';
  export default{
    data(){
      return{
        show: false,
        showBack: false
      }
    },
    mounted(){
      if(this.$route.query.type != 'download'){
        this.showBack = true;
      }

    },
    components:{
        goBack
    },
    methods:{
      down(){
        var ua = window.navigator.userAgent;
        var isWeixin = new RegExp('MicroMessenger').test(ua);
        var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
        if(isAndroid){
          if(isWeixin){
            this.show = true;
            return;
          }else{
            window.location.href = 'http://yinli.lighthin.cn/download/xfhl.hi.apks';
          }
        }else{
          window.location.href = 'https://apps.apple.com/cn/app/%E5%B9%B8%E7%A6%8F%E5%BC%95%E5%8A%9B/id1447849064';
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .warp{
    width: 100%;
    // min-height: 100%;
    position:absolute;
    left: 0;
    top:0;
    background:#fff;
    padding-bottom:69px;
    .suc{
      width: 120px;
      display: block;
      margin:20px auto 0;
    }
    .dec{
      text-align: center;
      height:28px;
      font-size:20px;
      font-weight:600;
      color:rgba(51,51,51,1);
      line-height:28px;
      margin: 10px 0 19px 0;
    }
    .tip{
      width: 100%;
    } 
    .imgbox{
      width: 100%;
      margin:0 auto;
      img{
        width: 100%;
      }
    }
    .down{
      width: 100%;
      height:56px;
      font-size:18px;
      font-weight:500;
      line-height:56px;
      text-align: center;
      // padding-bottom: 5px;
      color: #fff;
      position:fixed;
      left: 0;
      bottom:0;
      background:linear-gradient(225deg,rgba(10,211,238,1) 0%,rgba(10,190,213,1) 100%);
    }
  }
</style> 