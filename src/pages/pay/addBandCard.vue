<template>
  <div class="addbandCard">
    <p class="title">添加银行卡</p>
    <p class="dec">请将银行卡绑定您本人账号，以保障资金安全</p>
    <div class="inputBox">
      <img src="../../assets/img/pay/bankcard_v1.4_01@2x.png" alt="">
      <input type="tel" maxlength="19" placeholder="请输入卡号" v-model="cardNum">
    </div>
    <a href="javascript:;" class="next" :class="{'next-color' : cardNum.length>=12}" @click="next">下一步</a>
    <goBack/>
  </div>
</template>
<script>
import { Toast, List } from 'vant'
import commonJs from '@/util/common'
import goBack from '@/components/goBack';
import { apiUnifiedMobile} from '@/api/pay';
import { apiPayClientIp, apiPayMobileUnified, } from '@/api/order';
export default {
  data() {
    return {
      cardNum: '',
      platform:'',
      payClientIp:'0,0,0,0',
      loading: false
    }
  },
  mounted() {

    this.platform = commonJs.getPlatform().platform;
  },
  components: {
    goBack,
  },
  methods: { 
    next() {
      if (!this.cardNum || this.cardNum.length < 12) {
        // Toast('请填写银行卡卡号');
        return
      }

      this.apiClientIp(()=>{
        this.thirdPartypay();
      });

    },
    thirdPartypay() {

      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '查询中'
      })

      const prePayNo = this.$route.query.prePayNo
      const mercId = commonJs.getPlatform().mercId
      const platform = this.platform
      const callbackUrl = commonJs.bankSucddeed();

      const data = {
        methodType: 'DirectPay',
        prePayNo: this.$route.query.prePayNo,
        mercId: this.$route.query.mercId,
        tradeType: 'MWEB',
        bankCode: 'UPOP',
        openId: this.cardNum,
        callbackUrl: callbackUrl,
        clientIp: this.payClientIp, // 获取ip
        sysCnl: 'H5',
        platform: this.platform, // 平台编号 名品猫:MPMALL，名品玩家：MPWJMALL
        bankCardType: '05',
      }

      apiPayMobileUnified(data).then((res)=>{ 
        Toast.clear()
        window.location.href = 'http://hk-h5-pay.happylanswe.com/pay.html?version='+ encodeURIComponent(res.data.version) + '&token_id='+ encodeURIComponent(res.data.tokenId) + ' &bank_code=' + encodeURIComponent(res.data.bank_code) + '&access_type=' + encodeURIComponent(res.data.access_type)
      })
    },
    apiClientIp(callback) {
      const data = Object.assign({})
      apiPayClientIp(data).then(res=>{
        if (res.code.toString() === '10000') {
          this.payClientIp = res.data.ip
          callback && callback()
        } else {
          Toast.fail(res.msg)
        }

      }).catch(error=>{
        // Toast.fail(error)
      })
    },

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
      font-size:16px;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:22px;
      text-align: center;
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
      margin:0 auto;
      margin-top: 40px;
      display: block;
      font-size:16px;
      font-weight:400;
      color:rgba(255,255,255,1);
      text-align: center;
      background:linear-gradient(225deg,rgba(10,211,238,1) 0%,rgba(10,190,213,1) 100%);
      border-radius:2px;
      opacity: 0.6;
    }
    .next-color{
      background:linear-gradient(225deg,rgba(10,211,238,1) 0%,rgba(10,190,213,1) 100%);
      opacity: 1;
    }
  }
</style>
