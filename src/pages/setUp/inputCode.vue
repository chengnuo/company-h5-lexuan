<template>
  <div class="addbandCard">
    <p class="title">输入验证码</p>
    <p class="dec">请输入<span>{{mobile}}</span>收到的4位验证码</p>
    <div class="inputBox">
      <img src="../../assets/img/my/icon_user_01@2x (2).png" alt="">
      <input type="tel" maxlength="6" placeholder="请输入验证码" v-model="code">
    </div>
    <a href="javascript:;" class="next" @click="payMobileUnified">验  证</a>
    <p class="timeTip" v-if="showCodeTip" @click="apiCode(1)">重新发送</p>
    <p class="codeTip" v-if="!showCodeTip">没收到验证码？<span>{{time}}</span>秒之后可重新发送</p>
    <goBack/>
  </div>
</template>
<script>
import { Toast } from 'vant'
import commonJs from '@/util/common'
import goBack from '@/components/goBack';
import { apiAuthCode, apiCheckCode } from '@/api/setUp' 

export default {
  name: 'inputCode',
  data() {
    return {
      code: '',
      showCodeTip: false,
      time: 60,
      mobile: null,
      platform: 'ZBMALL'
    }
  },
  mounted() { 
    commonJs.outSideShare();
    this.mobile = this.$route.query.mobile
    this.query = this.$route.query;
    this.apiCode(1)
  },
  methods: {
    
    apiCode(type) { 
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '发送中'
        })
      var data = {
        mobile: this.mobile,
        type: 3,
        areaCode: this.query.areaCode
      }
      apiAuthCode(data).then((res)=>{ 
        // 点击发送验证码才需要的操作 
        clearInterval(timer)
        var timer = null
        if (type) {
          this.showCodeTip = false
          this.time = 60
          timer = setInterval(() => {
            this.time--  
            if (this.time == 0) {
              this.showCodeTip = true
              clearInterval(timer)
            }
          }, 1000)
        }

        Toast.clear()
        if (res.code.toString() === '10014') {
          // Toast('成功发送验证码')
        } else if (res.code.toString() === '31022') {
          this.time = parseInt(res.msg)
          this.showCodeTip = false
          timer = setInterval(() => {
            this.time--
            if (this.time == 0) {
              this.showCodeTip = true
              clearInterval(timer)
            }
          }, 1000)
          // Toast(res.msg)
        } else {
          Toast(res.msg)
        }
      }).catch((error)=>{
        clearTimeout(timer)
        Toast.clear()
        Toast.fail(error)
      })

    }, // 快捷银行支付
    async payMobileUnified() {
      if (!this.code) {
        Toast('请输入验证码')
        return
      }

      var timer = setTimeout(() => {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '验证中'
        })
      }, 300)
      var data ={
        mobile: this.mobile,
        code:this.code
      } 

      apiCheckCode(data).then((res)=>{ 
        // 点击发送验证码才需要的操作 
        Toast.clear()
        clearInterval(timer)
        if (res.code.toString() === '10000') {
            this.$router.push({
              name: 'SetUpPassWord',
              query: this.query
            })
 
        } else { 
          Toast(res.msg)
        }
      }).catch((error)=>{
        Toast.clear()
        Toast(error)
      })
    }
  },
  components: {
    goBack
  }
}
</script>
<style lang="less">
  .addbandCard{
    width: 100%;
    min-height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background:rgba(245,248,250,1);
    .title{
      height:28px;
      padding-top: 38px;
      padding-bottom: 10px;
      font-size:20px;
      font-weight:600;
      color:rgba(51,51,51,1);
      line-height:28px;
      text-align: center;
    }
    .dec{
      height:22px;
      font-size:15px;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:22px;
      margin:0 30px;
      text-align: center;
      span{
        color:#47D9AB;
      }
    }
    .inputBox{
      width:295px;
      height:24px;
      padding:10px 20px;
      background:rgba(255,255,255,1);
      border-radius:2px;
      border:1px solid rgba(230,230,230,1);
      margin:0 auto;
      margin-top: 40px;
      img{
        width: 24px;
        height: 24px;
        float: left;
        margin-right: 10px;
      }
      input{
        width: 245px;
        height: 24px;
        line-height: 24px;
        color: #333;
        font-size:16px;
        float: left;
      }
      input::-webkit-input-placeholder {
        color: #ccc;
      }
    }
    .next{
      width:335px;
      height:44px;
      line-height: 44px;
      background:linear-gradient(225deg,rgba(10,211,238,1) 0%,rgba(10,190,213,1) 100%);
      border-radius:2px;
      margin:0 auto;
      margin-top: 40px;
      display: block;
      font-size:16px;
      font-weight:400;
      color:rgba(255,255,255,1);
      text-align: center;
    }
    .timeTip,.codeTip{
      height:20px;
      font-size:14px;
      font-weight:400;
      color:#09C2DA;
      line-height:20px;
      text-align: center;
      margin-top: 15px;
    }
    .codeTip{
      color:#999;
      span{
        color:#09C2DA;
      }
    }
  }
</style>
