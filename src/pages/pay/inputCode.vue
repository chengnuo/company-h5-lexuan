<template>
  <div class="addbandCard">
    <p class="title">输入验证码</p>
    <p class="dec">有赞验证码已发出，请输入<span>{{mobile}}</span>收到的验证码</p>
    <div class="inputBox">
      <img src="../../assets/img/pay/icon_07password_01@2x.png" alt="">
      <input type="tel" maxlength="6" placeholder="请输入验证码" v-model="code">
    </div>
    <a href="javascript:;" class="next" @click="payMobileUnified">验  证</a>
    <p class="timeTip" v-if="showCodeTip" @click="apiCode(1)">重新发送</p>
    <p class="codeTip" v-if="!showCodeTip">没收到验证码？<span>{{time}}</span>秒之后可重新发送</p>
  </div>
</template>
<script>
import { Toast } from 'vant'
import commonJs from '@/util/common'
import { apiUnifiedMobile} from '@/api/pay';

export default {
  name: 'inputCode',
  data() {
    return {
      code: '',
      showCodeTip: false,
      time: 60,
      mobile: null,
      platform: 'XFYLMALL'
    }
  },
  mounted() {
    
    this.platform = commonJs.getPlatform().platform;

   
    // if(this.platform == 'XFYLMALL'){
    //   this.goHome() // 跳回首页
    //   this.wxShare() // 分享
    // }

    this.apiCode(1)
    this.mobile = this.$route.query.mobile
  },
  methods: {
    // 快捷银行支付
    // changeInput(val){
    //   if(this.code.length>0){
    //     this.code = this.code.replace(/\s/g,'').replace(/(\d{4}|[^\d]{3})/g,"$1 ");
    //   }
    // },
    // 分享
    goHome() {
      const userData = JSON.parse(sessionStorage.getItem('userData')) || {}
      const inviteCode = this.$route.query.inviteCode || ''
      if (!userData.id) {
        window.location.href = `/login?inviteCode=${inviteCode}`
      }
    },
    // 分享 
    wxShare() {
      const userData = JSON.parse(window.sessionStorage.getItem('userData')) || {}
      const inviteCode = userData.inviteCode || this.$route.query.inviteCode || ''
      commonJs.outSideShare({
        title: '乐选',
        desc: `幸福好管家，经营好帮手`,
        link: `${commonJs.getUrl()}/login?inviteCode=${inviteCode}`,
        img: `${commonJs.getUrl()}/static/logo.png`
      })
    },
    apiCode(type) {
      var time = setTimeout(() => {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '支付加载中'
        })
      }, 300)
      var json = this.$route.query 
      var parameter = {
        mercId: commonJs.getPlatform().mercId,
        methodType: 'QuickPaySms',
        requestId: json.requestId,
        platform: this.platform,
        agrNo: json.agrNo,
        smsOrderType: json.smsOrderType,
        smsOrderNo: json.smsOrderNo,
        // prePayNo: json.prePayNo,
        clientIp: json.clientIp// 获取ip
      }
      const data = Object.assign({}, parameter)
      apiUnifiedMobile(data).then((res)=>{ 
        // 点击发送验证码才需要的操作 
        clearInterval(time)
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

        if (res.code.toString() === '10000') {
          Toast('成功发送验证码')
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
        Toast.clear()
      }).catch((error)=>{
        clearTimeout(timer)
        Toast.clear()
        console.log('error', error)
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
          message: '支付加载中'
        })
      }, 300)

      var json = this.$route.query
      var parameter = {
        methodType: 'QuickPayConfirm',
        requestId: json.requestId,
        agrNo: json.agrNo,
        smsOrderNo: json.smsOrderNo,
        platform: this.platform,
        mercId: commonJs.getPlatform().mercId,
        smsCode: this.code,
        sysCnl: 'H5',
        clientIp: json.clientIp// 获取ip
      }

      const data = Object.assign({}, parameter);
      apiUnifiedMobile(data).then((res)=>{ 
        // 点击发送验证码才需要的操作 
        clearInterval(timer)
        if (res.code.toString() === '10000') {
          var url = window.sessionStorage.getItem('bankPaySuccUrl');
          // Toast(res.msg)
          if(url){
            var href = JSON.parse(url);
            window.location.href= href.url;
          }else{
            this.$router.push({
              name: 'paySuccess'
            })
          }

        } else {
          Toast.fail(res.msg)
        }
        Toast.clear()
      }).catch((error)=>{
        clearTimeout(timer)
        Toast.clear()
        console.log('error', error)
        Toast.fail(error)
      })
    }
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
