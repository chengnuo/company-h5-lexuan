<template>
  <div class="financePay">
    <!--   <div class="title">
            <ul>
                <li>
                    <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2018939532,1617516463&fm=26&gp=0.jpg" alt="" class="left">
                    <span class="center">中国工商银行储蓄卡(9470)</span>
                    <img class="right" src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2018939532,1617516463&fm=26&gp=0.jpg" alt="">
                </li>
            </ul>
        </div> -->
    <!-- <bank/> -->
    <div class="payBox">
      <p>输入进货金额</p>
      <div class="inputBox">
        <span>¥</span>
        <textarea v-model="price" type="tel" maxlength="7" placeholder="请输入进货金额"></textarea>
      </div>
    </div>
    <a href="javascript:;" class="submit" @click="handleSubmit">确定</a>
    <p class="record" @click="jumpRecord">查看进货记录</p>
    <!--   <div class="codeBox">
            <div class="box">
                <div class="title">请输入验证码</div>
                <div class="inputBox">
                    <input type="text">
                    <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2018939532,1617516463&fm=26&gp=0.jpg" alt="">
                </div>
                <div class="btnBox">
                    <span class="frist">取消</span>
                    <span>确定</span>
                </div>
            </div>
        </div> -->
  </div>
</template>
<script>
// import bank from '@/components/rechargeBank';


import { apiRechargeShopMobileDepositSubmit } from '@/api/recharge'

import { apiPayMobileUnified } from '@/api/order'

import { apiPayClientIp} from '@/api/order'

import { Toast } from 'vant'


import commonJs from '@/util/common'

export default {
  name: 'Price',
  data() {
    return {
      price: '',
      payClientIp: '',
      loading: false,
    }
  },
  components: {
    // bank
  },
  mounted() { 
    if(!window.sessionStorage.getItem('userData')){
      this.$router.push({
        path: '/recharge/login' ,
      })
    }
    this.apiClientIp();
  },
  methods: {
    // 获取客户端IP
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
        Toast.fail(error)
      })
    },
    // 充值提交-http://showdoc.sys.jxblot.com/web/#/22?page_id=1055
    apiRechargeShopMobileDepositSubmit(){
      
      let reg = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/;
      if(!this.price){
        Toast.fail('请输入金额')
        return false;
      }else if(!reg.test(this.price)){
        Toast.fail('请输入非零的数，保留2位小数')
        return false;
      }

      let data = {
        tradeCode: '02',
        busiType: '02',
        price: window.parseFloat(this.price),
        clientIp: this.payClientIp,
        buyType: 0,
      }

      apiRechargeShopMobileDepositSubmit(data)
      .then((res)=>{
        // alert(res.data.prepayNo)
        if(res.code.toString()==='10000'){

          window.sessionStorage.setItem('orderSubmit', JSON.stringify(res.data)) // 商户购买的时候，缓存信息
          
          this.apiPayMobileUnified({
            'methodType': 'PayCashier',
            'mercId': res.data.mercId, // 1
            'prePayNo': res.data.prePayNo // 1
          }, (resApiPayMobileUnified) => {
            let sysCnl = commonJs.isWeiXin() ? 'WX-PUBLIC' : 'H5'
            const getLoginAuthorization = JSON.parse(window.sessionStorage.getItem('loginAuthorization')) || {}
            const userData = JSON.parse(sessionStorage.getItem('userData')) || {}
            const url = `${commonJs.config.prefixH5Url}pay?mercId=${res.data.mercId}&prePayNo=${res.data.prePayNo}&source=${commonJs.payConfig.XFyinliPAYSourceRecharge}&platform=${resApiPayMobileUnified.data.prePayOrder.platform}&userId=${userData.id}&type=recharge`
            window.location.href=url;
            // location.replace(url)
          })
        }else{
           Toast.fail(res.msg)
        }
      }).catch((error)=>{

        console.log('error', error)
        Toast.fail(error)
      })
    },
    jumpRecord(){ //跳转进货记录页面
      this.$router.push({
        path: '/recharge/record' ,
      })
    },
    // 生成订单
    handleSubmit(){
      this.apiRechargeShopMobileDepositSubmit();
    },
    // 订单支付
    apiPayMobileUnified(parameter, callback) {
      const data = Object.assign({}, parameter)
      // this.loading = true;

      // const res = await this.$post(this.$api.payMobileUnified, data)
      apiPayMobileUnified(data).then(res=>{
        // this.loading = false;
        if (res.code.toString() === '10000') {
          // Toast.success(res.msg)
          callback && callback(res)
        } else {
          Toast.fail(res.msg)
        }
      }).catch(error=>{
        // this.loading = false;
        console.log('error', error)
        Toast.fail(error)
      })
    },
  },
 
}
</script>
<style scoped lang="less">
.financePay {
  width: 100%;
  min-height: 100%;
  position: absolute;
  left: 0;
  top: 0; 
  .payBox {
    padding: 24px 20px 28px;
    background: #fff;
    p {
      height: 20px;
      font-size: 14px;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
      margin-bottom: 12px;
    }
    .inputBox { 
      height: 36px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1); 
      background: #fff;
      span {
        height: 34px;
        line-height: 34px;
        margin-right: 10px;
        font-size:30px;
        float: left;
      }
      textarea {
        width: 300px;
        font-size:30px;
        line-height: 34px;
        height: 34px;
        float: left;     
      }
    }
  }  
  .record{
    width: 335px;
    font-size:16px;
    font-weight:400;
    color:rgba(255,255,255,1);
    text-align: center;
    margin:0 auto;
    margin-top: 30px;
    height:44px;
    line-height:44px;
    background:linear-gradient(225deg,rgba(28,250,174,1) 0%,rgba(30,211,166,1) 100%);
    border-radius:2px;
  }
  .submit {
    width: 335px;
    height: 44px;
    background:linear-gradient(225deg,rgba(10,211,238,1) 0%,rgba(10,190,213,1) 100%);
    border-radius:2px;
    margin: 0 auto;
    margin-top: 40px;
    display: block;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 44px;
    color: rgba(255, 255, 255, 1);
  }
  input::-webkit-input-placeholder {
    color: #ccc;
    font-size: 26px;
}
}
</style>