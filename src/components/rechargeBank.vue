  <template>
  <div class="bankContainer">
    <ol v-if="quickAgrBankList && quickPayCheck != 0">
      <li v-for="(item,index) in quickAgrBankList" :key="item.bankCardNo" @click="tab(item.bankCardNo,index)">
        <img :src="item.logo" alt="" class="left">
        <!-- <em class="center">{{ellipsisBank(item.bankName, item.bankCardNo)}}</em> -->
          <em class="center" :class="{'center-size': item.bankName.length > 12}">{{ellipsisBank(item.bankName, item.bankCardNo)}}</em>
          <img v-if="activeIndex != item.bankCardNo" src="../assets/act/icon_05choice_02@2x.png" alt="" class="right">
          <img v-if="activeIndex == item.bankCardNo" src="../assets/act/icon_05choice_01@2x.png" alt="" class="right">
          <span class="border"></span>
      </li>
      <li @click="jumpBank">
        <img src="../assets/act/icon_05pay_03@2x.png" alt="" class="left">
        <em class="center">使用新卡支付</em>
        <img src="../assets/act/more_01@2x.png" alt="" class="right more">
      </li>
    </ol>
  </div>
</template>

<script>
import commonJs from '@/util/common'
import { Lazyload, Toast } from 'vant'
import cryptoJS from '@/util/cryptoJS'
import { apiUnifiedMobile, payCommonValue, payClientIp} from '@/api/pay';
export default {
  name: 'bankContainer',

  data() {
    return { 
      quickAgrBankList:null,
      quickAgrBankListIndex: null, // 选中的银行卡是第几张
      activeIndex: '', // 支付
      payClientIp:null,
      actUnifiedObj:null,
      platform: 'ZBMALL'
    }
  },
  props:{
    quickPayCheck: Number
  },
  mounted() { 

    this.platform = commonJs.getPlatform().platform; 

    this.apiClientIp(() => {
      this.actUnifiedApi(this.$route.query.prePayNo, this.$route.query.mercId);
  
    })

  }, 
 
  methods: { 

    clearActiveIndex(){
      this.quickAgrBankListIndex = null;
      this.activeIndex = null;
    },

    tab(code, index) { //选择银行
      this.quickAgrBankListIndex = index;
      this.activeIndex = code;
      this.$parent.handleBankCode({
        bankCode: code
      });
      // this.jumpPayPage();
    }, 
 
    jumpPayPage() { // 跳转充值页面
      if (!this.activeIndex) {
        Toast('请选择支付方式')
        return
      }
      this.apiPayMobileUnified()
    },

    apiPayMobileUnified() { //快捷支付
      var timer = setTimeout(() => {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '支付加载中'
        })
      }, 300)

      var parameter = {
        methodType: 'QuickPayReq',
        mercId: commonJs.getPlatform().mercId,
        requestId: Date.parse(new Date()),
        prePayNo: this.actUnifiedObj.prePayOrder.prePayNo,
        payType: 3,
        platform: this.platform,
        agrNo: this.quickAgrBankList[this.quickAgrBankListIndex].agrNo,
        sysCnl: 'H5',
        clientIp: this.payClientIp// 获取ip
      }


    apiUnifiedMobile(parameter).then((res)=>{ 
      clearTimeout(timer)
      Toast.clear()
      if (res.code.toString() === '10000') {
        if (res.data.needSms == 'Y') {
          this.$router.push({
            name: 'inputCode',
            query: {
              methodType: parameter.methodType,
              requestId: parameter.requestId,
              agrNo: parameter.agrNo,
              prePayNo: res.data.prePayNo,
              smsOrderType: 2,
              smsOrderNo: res.data.smsOrderNo,
              clientIp: this.payClientIp,
              mobile: this.changeMobileFormat()
            }
          })
        } else {

          Toast('支付成功')
          // // this.$router.push({
          // //   name: 'payment',
          // // })
          //  this.$router.push({
          //   name: 'inputCode',
          //   query: {
          //     methodType: parameter.methodType,
          //     requestId: parameter.requestId,
          //     prePayNo: res.data.prePayNo,
          //     agrNo:parameter.agrNo,
          //     smsOrderType: 2,
          //     smsOrderNo: res.data.smsOrderNo,
          //     clientIp: this.payClientIp
          //   }
          // })
        }
      } else {
        Toast.fail(res.msg)
      }
        
      }).catch(error=>{
        clearTimeout(timer)
        Toast.clear()
        console.log('error', error)
        Toast.fail(error.msg)
      })
    },
    // 获取客户端IP
    apiClientIp(callback) {
      payClientIp({}).then((res)=>{ 
        if (res.code.toString() === '10000') {
          this.payClientIp = res.data.ip
          callback && callback()
        } else {
          Toast.fail(res.msg)
        }
      }).catch(error=>{
        Toast.fail(error)
      })
    }, 

    changeMobileFormat() {
      var mobile = cryptoJS.decrypted(this.quickAgrBankList[this.quickAgrBankListIndex].mobile)
      var reg = /^(\d{3})\d{4}(\d{4})$/

      return mobile.replace(reg, '$1****$2')
    },

    actUnifiedApi(prePayNo, mercId) { //获取快捷银行列表
      var timer = setTimeout(() => {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '加载中'
        })
      }, 300) 

      var data = Object.assign({}, this.form, {
        methodType: 'PayCashier',
        mercId,
        prePayNo,
        platform: this.platform
      })

      apiUnifiedMobile(data).then((res)=>{
        clearTimeout(timer)
         if (res.code.toString() === '10000') {
          // 快捷银行卡支付
          this.quickAgrBankList = res.data.quickAgrBankList

          //默认选中第一张银行卡
          if (this.quickAgrBankList.length > 0) { 
            this.activeIndex = this.quickAgrBankList[0].bankCardNo; 
            this.quickAgrBankListIndex = 0;
            

            this.$emit('handleBankCodeFn',{bankCode: this.activeIndex});
          }

          // 第三方支付平台
          this.unifiedArr = res.data.bankList

          if (this.unifiedArr.length <= 0 && this.quickAgrBankList.length <= 0) {
            this.ashPlacing = true
          }

          this.actUnifiedObj = res.data
          console.log(this.actUnifiedObj)
          //判断是绑卡成功就自动弹出支付框
          if(this.$route.query.showPayBox){
            this.showPayBox = true 
          }

        } else {
          Toast.fail(res.msg)
        }
        Toast.clear()
      }).catch(error=>{ 
        console.log('error', error)
        clearTimeout(timer)
        Toast.clear()
        // Toast.fail(error)
      })
    },
    ellipsisBank(name, key = '') {
      var num = cryptoJS.decrypted(key)
      var msg = name + '(' + (num.substring(num.length - 4, num.length)) + ')'
      return msg
    },
    jumpBank() {

      window.sessionStorage.setItem('bankOrderPayUrl', JSON.stringify({
        url: window.location.href
      }))//缓存绑卡成功跳转回来

      this.$router.push({
        name: 'addBandCard'
      })
    },
  }
}
</script>

<style lang="less" scoped>
  .bankContainer{

      ul,ol{
        padding:0 0 0 20px;
        background:#fff;
        li{
          width: 100%;
          height: 30px;
          padding: 15px 0;
          position:relative;
          overflow: hidden;
          &.noneBorder{
            border:none;
            padding-bottom: 0;
          }
          .left{
            width: 30px;
            float: left;
            margin-right: 10px;
          }
          .center{
            height: 30px;
            line-height: 30px;
            font-size:15px;
            font-weight:400;
            color:rgba(51,51,51,1);
            float:left;
          }
          .center-size{
            font-size:13px;
          }
          .right{
            width: 18px;
            height: 18px;
            float: right;
            margin-right:15px;
            margin-top: 6px;
          }
          .border{
            width: 100%;
            height: 1px;
            background:rgba(242,242,242,1);
            position:absolute;
            left:40px;
            bottom:0;
          }
          &:last-child {
            .border{
              display: none;
            }
          }
          .more{
            width: 8px;
            height: 14px;
          }
        } 
      } 
  }
</style>
