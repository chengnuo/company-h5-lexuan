<template>
  <div class="sweepCodeContainer">
    <div class="title">防伪查询 正品保证</div>
    <div class="inputBox clearfix">
      <div class="left">
        <input type="text" :value="value" placeholder="请输入防伪码">
      </div>
      <div class="btn" @click="querySn(value)">查 询</div>
    </div>
    <div class="sweepCode" id="sweepCode" @click="outSideShare">
      <div>
        <!-- <img src="../../assets/img/sweepCode/icon_user_01@2x.png" alt=""> -->
        <span>扫一扫防伪码</span>
      </div>
    </div>
    <div class="bottom">
      <!-- <img src="../../assets/img/sweepCode/icon_04_anti fake_01@2x.png" alt="" class="bottomImg"> -->
    </div>
  </div>
</template>

<script>  
import commonJs from '@/util/common'
import axios from 'axios';
import wx from 'weixin-js-sdk'
import { Toast } from 'vant'
import { querySn, wxJsSdk } from '@/api/querySn'
export default {
  name: 'sweepCode',
  data() {
    return {
      value: '',
    };
  },
  mounted(){ 
    this.outSideShare()
  },
  methods:{
    //调用微信扫一扫接口
    outSideShare() { 
      var json = { 
        url: window.location.href
      }  
      
      wxJsSdk(json).then((res)=>{
        var _this = this; 
        if (res.code.toString() == '10000') {

          var data = res.data
          const wxConfig = {
            debug: false,
            appId: data.appId,
            timestamp:  data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: ['scanQRCode']
          }

          wx.config(wxConfig)
          var environmental= window.navigator.userAgent.toLowerCase();
          if (environmental.match(/MicroMessenger/i) == 'micromessenger') {
            wx.ready(function() {
             //获取本地跳转地址
             $('#sweepCode').click(function(){
               wx.scanQRCode({
                needResult: 1,// 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
                desc: 'scanQRCode desc',// 可以指定扫二维码还是一维码，默认二者都有
                success: function(res) {
                  var arr = res.resultStr.split('=');
                  _this.querySn(arr[1]);
                }
              });
             })
             
            });
          }else {
            Toast.fail("请在微信中登录！"); 
          }
        }
      })
    },
    querySn(code){

      if(!code){
        Toast('防伪码不能为空');
        return;
      }

      var json = {
        sn: code,
      }

      querySn(json).then((res)=>{
          if(res.code == 10000){
            this.$router.push({
              name:'sweepCodeSucc',
              query:{
                firstSweepTime:res.data.firstSweepTime,
                num: res.data.num
              }
            });
          }else if(res.code == 80001){
            this.$router.push({
              name:'sweepCodeError'
            });
          }else{
            Toast.fail(res.msg); 
          }
      })
    }
  }
}

</script>
<style scoped lang="less">
  .sweepCodeContainer{
    width: 100%;
    min-height: 100%;
    position: absolute;
    left:0;
    top:0;
    background:rgba(245,248,250,1);
    .title{
      height:28px;
      font-size:20px;
      font-weight:600;
      color:rgba(51,51,51,1);
      line-height:28px;
      text-align: center;
      padding-top: 38px;
      padding-bottom:30px;
    }
    .inputBox{
      padding:0 20px;
      .left{
        width:190px;
        height:22px;
        padding:11px 10px;
        background:rgba(255,255,255,1);
        border-radius:2px;
        border:1px solid rgba(230,230,230,1);
        float: left;
        input{
          height:22px;
          font-size:16px;
          font-weight:400;
          color:#333;
          line-height:22px;
        }
        ::-webkit-input-placeholder { /* Chrome/Opera/Safari */ 
          color: #ccc;
        }
      }
      .btn{
        width:110px;
        height:44px;
        line-height: 44px;
        font-size:16px;
        color:rgba(255,255,255,1);
        text-align: center;
        background:linear-gradient(225deg,rgba(255,161,0,1) 0%,rgba(255,127,0,1) 100%);
        border-radius:2px;
        float: right;
      }
    }
    .sweepCode{
      width:335px;
      height:44px;
      background:linear-gradient(225deg,rgba(182,0,0,1) 0%,rgba(149,0,0,1) 100%);
      border-radius:2px;
      margin: 0 auto;
      margin-top:40px;
      margin-bottom: 72px;
      div{
        width: 130px;
        height: 44px;
        margin: 0 auto;
        img{
          width: 22px;
          height: 22px;
          margin-top: 11px;
          float: left;
        }
        span{
          width: 96px;
          height:22px;
          font-size:16px;
          font-weight:400;
          color:rgba(255,255,255,1);
          line-height:22px;
          margin-top: 11px;
          float: right;
        }
      }
    }
    .bottom{
      padding:0 20px;
      img{
        width: 100%;
      }
    }
  } 
</style>  
