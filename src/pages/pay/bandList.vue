<template>
  <div class="bandList">
    <div class="title"><span>选择卡类型</span></div>
    <ul class="bandType">
      <li @click="changeType('01')">
        <span class="left">储蓄卡</span>
        <img  v-if="bankType !='01'" src="../../assets/act/icon_05choice_02@2x.png" alt="" class="right">
        <img  v-if="bankType=='01'" src="../../assets/act/icon_05choice_01@2x.png" alt="" class="right">
      </li>
      <li class="last" @click="changeType('02')">
        <span class="left">信用卡</span>
        <img v-if="bankType !='02'" src="../../assets/act/icon_05choice_02@2x.png" alt="" class="right">
        <img v-if="bankType=='02'" src="../../assets/act/icon_05choice_01@2x.png" alt="" class="right">
      </li>
    </ul>
    <div class="title"><span>热门银行</span></div>
    <ol class="list" v-if="bankType=='01'">
        <li v-for="item in debitCard"
        :key="item.bankCode" @click="jumpAddbandCard(item)">
          <img :src="item.logo">
          <span>{{item.bankName}}</span>
        </li>
    </ol>
    <ol class="list" v-if="bankType=='02'">
        <li v-for="item in creditCard"
        :key="item.bankCode" @click="jumpAddbandCard(item)">
          <img :src="item.logo">
          <span>{{item.bankName}}</span>
        </li>
    </ol>
  </div>
</template>
<script>
import { Toast, List } from 'vant'
import commonJs from '@/util/common'
import { apiUnifiedMobile} from '@/api/pay';

export default {
  data() {
    return {
      list: [],
      bankType: '01',
      debitCard: null,
      creditCard: null,
      platform:'XFYLMALL',
    }
  },
  mounted() {

    this.platform = commonJs.getPlatform().platform;

    // if(this.platform == 'XFYLMALL'){
    //   this.goHome() // 跳回首页
    //   this.wxShare() // 分享
    // }

    this.payMobileUnified()
  },
  methods: {
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
    jumpAddbandCard(item) {
      console.log(item)
      window.sessionStorage.removeItem('mpwjBankInfo')
      var json = item
      json.bankCardNo = this.$route.query.bandCardNum
      window.sessionStorage.setItem('mpwjBankInfo', JSON.stringify(json))

      this.$router.push({
        name: 'VerificationBankCards'
      })
    },
    changeType(type) {
      if (this.bankType == type) return
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: ''
      })
      clearTimeout(timer)
      var timer = setTimeout(() => {
        this.bankType = type
        if (type == '02' && !this.creditCard) {
          this.payMobileUnified()
        }
        Toast.clear()
      }, 300)
    },
    payMobileUnified() {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: ''
      })
      var parameter = {
        methodType: 'QueryBank',
        tradeCode: '01',
        bankType: '1',
        platform: this.platform,
        mercId: commonJs.getPlatform().mercId,
        bankCardType: this.bankType
      }

      apiUnifiedMobile(parameter).then((res)=>{ 
        if (res.code.toString() === '10000') {
          if (parameter.bankCardType == '01') this.debitCard = res.data.bankList
          if (parameter.bankCardType == '02') this.creditCard = res.data.bankList
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
  .bandList{
    .title{
      width: 100%;
      height:50px;
      line-height: 50px;
      background:#F5F5F5;
      span{
        margin-left: 20px;
        display: block;
        height:50px;
        line-height: 50px;
        font-size:16px;
        font-weight:500;
        color:rgba(51,51,51,1);
      }
    }
    .bandType{
      background:#fff;
      padding: 0 20px;
      li{
        height: 50px;
        border-bottom:solid 1px rgba(245,245,245,1);;
        .left{
          height: 50px;
          line-height: 50px;
          font-size:15px;
          font-weight:400;
          color:rgba(51,51,51,1);
          float: left;
        }
        .right{
          width: 18px;
          height: 18px;
          float: right;
          margin-top: 16px;
        }
        &.last{
          border:none;
        }
      }
    }
    .list{
      padding:0 20px;
      background:#fff;
      li{
        height: 30px;
        padding:12px 0;
        border-bottom:solid 1px rgba(245,245,245,1);
        img{
          width: 30px;
          height: 30px;
          float: left;
          margin-right: 8px;
        }
        span{
          height: 30px;
          line-height: 30px;

        }
      }
    }
  }
</style>
