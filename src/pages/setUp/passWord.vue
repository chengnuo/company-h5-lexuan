<template>
  <div class="addbandCard">
    <p class="title">设置密码</p>
    <div class="inputBox">
      <img src="../../assets/img/pay/icon_07password_01@2x.png" alt="" class="left">
      <input :type="showPassword?'text':'password'" placeholder="请输入新密码" v-model="code">
      <div  class="right" @click="showPassWordFn">
        <img v-if="!showPassword" src="../../assets/img/my/icon_hide_01@2x.png" alt="" />
        <img v-else src="../../assets/img/my/icon_02／hide_02@2x.png" alt="" />
        
      </div>
    </div>

    <a href="javascript:;" class="next" @click="modifyPsd">完 成</a>
    <goBack/>
  </div>
</template>
<script>
import { Toast } from 'vant'
import commonJs from '@/util/common'
import goBack from '@/components/goBack';
import { apiAuthCode, apiCheckCode, apiModifyPsd} from '@/api/setUp' 

export default {
  name: 'inputCode',
  data() {
    return {
      code: '', 
      mobile: null, 
      showPassword: false
    }
  },
  mounted() { 
    commonJs.outSideShare();
    this.mobile = this.$route.query.mobile
  },
  methods: {
    showPassWordFn(){
      this.showPassword=!this.showPassword;
    },
   // 快捷银行支付
    modifyPsd() {
      if (!this.code) {
        Toast('请输入新密码')
        return;
      }

      var timer = setTimeout(() => {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '设置中'
        })
      }, 300)

      var data ={
        mobile: this.mobile,
        password:this.code
      } 

      apiModifyPsd(data).then((res)=>{ 
        // 点击发送验证码才需要的操作 
        Toast.clear()
        clearInterval(timer)
        if (res.code.toString() === '10000') {
            this.$router.push({
              name: 'my'
            })
 
          Toast(res.msg)
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
    .inputBox{
      width:295px;
      height:24px;
      padding:10px 20px;
      padding-right: 40px;
      background:rgba(255,255,255,1);
      border-radius:2px;
      border:1px solid rgba(230,230,230,1);
      margin:0 auto;
      margin-top: 40px;
      position: relative;
      .left{
        width: 24px;
        height: 24px;
        float: left;
        margin-right: 10px;
      }
      input{
        width: 235px;
        height: 24px;
        line-height: 24px;
        color: #333;
        font-size:16px;
        float: left;
      }
      input::-webkit-input-placeholder {
        color: #ccc;
      }
      .right{
        width: 24px;
        height: 24px;
        position: absolute;
        right:20px;
        top:10px;
        z-index: 99;
        img{
          width: 100%;
          height: 100%;
        }
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
  }
</style>
