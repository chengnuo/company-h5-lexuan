<template>
  <div class="showTipBox"  v-if="showTipBox">
      <div class="bg" @click="hideTipBoxFn"></div>
      <div class="showTip">
        <img src="../assets/img/quickLevel/llustration_01@2x.png"></img>
        <div class="content">
          <em>预计到账{{accountPrice}}元</em>
          <div class="info">
            <span>服务费：{{service}}元</span>
            <span>费率：{{withdrCommission*100}}%</span>
          </div>
          <div class="btn" @click="refeltFn">确定</div>
        </div>
      </div>
    </div>
</template> 
<script>
  // import { refelt} from '@/api/refelt';

  import { Toast } from 'vant'
  export default{
    name: 'showTipBoxContainert',
    data() {
      return {
        showTipBox: false,
        price:0,
        service:0,
        accountPrice:0, 
        withdrCommission:0, 
      }
    },
    props:{
      refeltKey: Object
    },
    
    mounted(){
      if(this.refeltKey && this.refeltKey.price){
        this.price = this.numberMath(this.refeltKey.price);
        this.withdrCommission = this.refeltKey.withdrCommission/1000;//费率是千分比
        this.service = this.numberMath(this.price*this.withdrCommission);
        this.accountPrice = this.numberMath(this.price*(1-this.withdrCommission));
      }
    },
    methods:{
      showTipBoxFn(){
        this.showTipBox = true;
      },
      hideTipBoxFn(){
        this.$parent.showRefelt = false;
        this.showTipBox = false;

      },
      numberMath(num){
        return Number(num.toString().match(/^\d+(?:\.\d{0,2})?/));
      },
      async refeltFn() {
        var json = {
          agrNo:this.refeltKey.agrNo,
          price:this.numberMath(this.refeltKey.price),
          bankCode:'WEIXIN',
          sysCnl:'WX-PUBLIC',
          clientIp:this.refeltKey.clientIp,
          tradeType: 'JSAPI',
        }

        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '加载中'
        })

        const res = await this.$post(this.$api.apiWithdrApply,json);
        Toast.clear();
        
        try {
          if (res.code.toString() === "10000") {
            // this.$parent.withdrawalsRecord.unshift(res.data.items);
            this.showTipBox = false;
            Toast('申请提现成功');

            this.$emit('reflectIndexLoad')
          }else{
            Toast(res.msg);
            this.showTipBox = false;
          }
        } catch (error) {
            this.showTipBox = false;
            Toast(error.msg);
        }
      },
    }
  }

</script>
<style scoped>
.showTipBox{
  width: 100%;
  height: 100%;
  position: fixed;
  left:0;
  top:0;
  z-index: 2;
}
.showTipBox .bg{
  width: 100%;
  height: 100%;
  background:rgba(51,51,51,0.5);
  z-index: 1;
}
 .showTip {
  width:240px;
  height: 225px;
  position: absolute;
  left:50%;
  top:50%;
  margin-left:-120px;
  margin-top:-110px;
  background: #fff;
  z-index: 2;
}
.showTip img{
  width:240px;
  height: 121px;
  margin-top: -60px;
}
.showTip em{
  width: 240px;
  height:22px;
  font-size:16px;
  font-weight:600;
  color:rgba(51,51,51,1);
  line-height:22px;
  display: block;
  text-align: center;
  margin-top: 13px;
  margin-bottom: 10px;

}
.showTip .content .btn{
  width: 174px;
  height:40px;
  line-height: 40px;
  font-size:14px;
  font-weight:600;
  display: block;
  color: #fff;
  text-align: center;
  margin: 0 auto;
  background:linear-gradient(225deg,rgba(51,51,51,1) 0%,rgba(26,26,26,1) 100%);
}
.showTip .content .info{
  height:16px;
  margin-bottom: 30px;
  margin-left: 48px;
}
.showTip .content .info span{
  height:16px;
  font-size:12px;
  font-weight:400;
  color:rgba(102,102,102,1);
  line-height:16px;
  float: left;
  margin-right:20px;
}
</style>