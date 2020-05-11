<!-- 支付成功回调 -->
<template>
  <div class="pay ignore-pay">
    <div class="orderInfoLayout">
      <div class="orderInfo">
        <span class="leftbar">订单编号：</span>
        <span class="rightbar">{{dataSource.prePayOrder.orderNo}}</span>
      </div>
      <div class="orderInfo">
        <span class="leftbar">支付金额：</span>
        <span class="rightbar">¥ {{commonJs.numFilterToFixed2(dataSource.prePayOrder.price)}}</span>
      </div>
    </div>

    <!-- 微信支付 -->
    <div class="payType" v-if="hideAppPay">
      <div class="title">支付方式</div>
      <van-radio-group v-model="bankCode">
        <van-cell-group v-for="(item, index) in dataSource.bankList"
                        :key="index">
                        
          <van-cell title=""
                    clickable
                    @click="handleBankCode(item)"
                    v-if="(commonJs.isWeiXin() && item.bankCode == 'WEIXIN') || (!commonJs.isWeiXin() && item.bankCode == 'ALIPAY')"
            :class="item.bankCode"
          >
            <template slot="title">
              <span class="custom-text" v-if="item.bankCode == 'WEIXIN'">
                  <img :src="item.logo"
                      class="wechatPayImg"/>
                  <div class="wechatPayText">
                    <div class="itemBankName">{{item.bankName}}</div>
                    <div class="tipbar" v-if="payCommonValue.reduceWeixin">{{payCommonValue.reduceWeixin}}</div>
                  </div>
              </span>
              <span class="custom-text" v-if="item.bankCode == 'ALIPAY'">
                  <img :src="item.logo"
                      class="wechatPayImg"/>
                  <div class="wechatPayText">
                    <div class="itemBankName">{{item.bankName}}</div>
                    <div class="tipbar" v-if="payCommonValue.reduceAlipay">{{payCommonValue.reduceAlipay}}</div>
                  </div>
                  
                  
              </span>
            </template>
            <van-radio :name="item.bankCode"/>
          </van-cell>
        </van-cell-group>

      </van-radio-group>
    </div>
     <div class="payType" v-if="!hideAppPay">
      <div class="title">支付方式</div>
    </div>

    <!-- <div class="sendLayout">
      <van-button type="default"
                  class="sendBtn"
                  @click="handlePay">去付款</van-button>
    </div> -->
    <!--
      https://pay.weixin.qq.com/wiki/doc/api/H5.php?chapter=15_4
      注意：
        1.需对redirect_url进行urlencode处理

        2.由于设置redirect_url后,回跳指定页面的操作可能发生在：
          1,微信支付中间页调起微信收银台后超过5秒
          2,用户点击“取消支付“或支付完成后点“完成”按钮。因此无法保证页面回跳时，
            支付流程已结束，所以商户设置的redirect_url地址不能自动执行查单操作，
            应让用户去点击按钮触发查单操作。回跳页面展示效果可参考下图
    -->

    <bank @handleBankCodeFn="handleBankCode" :quickPayCheck="quickPayCheck" :payCommonValue="payCommonValue" :mppayCommonValue="mppayCommonValue" ref="myBank" v-if="showBankModel"/>

    <wechatPay v-if="bankCode == 'WEIXIN'"
               @wechatPayParent="wechatPayParent"
               :dataSource="dataSource"
               :urlSource="urlSource" />

    <aliPay v-if="bankCode == 'ALIPAY'"
      :urlSource="urlSource"
      :dataSource="dataSource"
     />


      <div class="sendLayout" v-if="(bankCode != 'ALIPAY') && (bankCode != 'WEIXIN')">
        <van-button
        type="default"
        class="sendBtn"
        @click="bankPayFn">去付款</van-button>
      </div>

    <!-- <div class="sendLayout">
      <van-button v-if="bankCode == 'ALIPAY'"
                  type="default"
                  class="sendBtn"
                  @click="handlePay">去付款</van-button>
    </div> --> 
    <goBack />
  </div>
</template>

<script>

import { Toast } from 'vant'
import wechatPay from '@/components/wechatPay'
import aliPay from '@/components/aliPay'

import commonJs from '@/util/common'
import bank from '../../components/bank'

import { apiPayClientIp, apiPayMobileUnified, apiOrderSubmit } from '@/api/order'
import { apiPayActCommonValueXFYL } from '@/api/pay'

import goBack from '@/components/goBack';

export default {
  name: 'pay',
  components: {
    // eslint-disable-next-line vue/no-unused-components
    wechatPay,
    // eslint-disable-next-line vue/no-unused-components
    aliPay,
    // eslint-disable-next-line vue/no-unused-components
    bank,
    goBack,
  },
  data() {
    return {
      bankCode: '',
      dataSource: { // 初始化数据
        bankList: [],
        merc: {},
        prePayOrder: {}
      },
      urlSource: {},
      commonJs,
      quickPayCheck: 0, //是否展示快捷支付
      hideWxPay: false,
      hideAppPay: true,
      showBankModel: false,
      payClientIp: '',
      payCommonValue: {},
      mppayCommonValue: {}, // 满减
    }
  },
  mounted() {
    // var w = document.documentElement.clientWidth || document.body.clientWidth
    // if (w >= 750) {
    //   console.log('w', w)
    //   this.bankCode = 'ALIPAY'
    // }

    // if (commonJs.isWeiXin()) {
    //   this.bankCode = 'WEIXIN'
    // }

    // this.bankCode = 'WEIXIN'

    
    this.init()


    

    // if(this.$route.query.platform != 'MNLMALL'){
    //   this.apiPayCommonValue();
    // }
    this.apiPayCommonValue();

    // this.apiCommonValue();
   
  },
  methods: {
    // 初始化
    /**
     * @method mercId 商户ID
     * @method prePayNo 预支付号
     * @method openid 支付id-jspai
     */
    init() {
      // route query
      const routeQuery = this.$route && this.$route.query
      // 获取基本信息
      const initData = {
        methodType: 'PayCashier',
        mercId: routeQuery.mercId,
        prePayNo: routeQuery.prePayNo,
        platform: routeQuery.platform || 'MPMALL' // 如果没有带，就用名品猫的1
        // sysCnl: routeQuery.platform || ( commonJs.isWeiXin() ? 'WX-PUBLIC' : 'H5'), // 下单终端渠道：IOS、ANDROID、WX-APPLET(小程序)
        // platform: 'MPWJMALL'
      }
      // 获取基本信息
      // 设置url来源缓存
      const cacheData = Object.assign({}, routeQuery, {
        origin: window.location.origin
      })
      this.showBankModel = true;
      window.sessionStorage.setItem('urlSource', JSON.stringify(cacheData)) // 缓存支付信息

      this.apiPayMobileUnified(initData, (resInitData) => {
        this.dataSource = resInitData.data
        window.sessionStorage.setItem('dataSource', JSON.stringify(resInitData.data)) // 缓存支付信息
      })

      this.urlSource = cacheData
      // this.bankCode = this.$route.query.bankCode || 'WEIXIN' // 缓存支付方式
      
      // if(!commonJs.showBandPay()){
      //   this.bankCode = this.$route.query.bankCode || 'WEIXIN' // 缓存支付方式
      // }
      
      //如果是乐选的屏蔽微信支付宝
      if(this.urlSource.platform == 'ZBMALL'){ // 乐选
        this.hideAppPay = true;
        // this.bankCode = '';
        if(this.$route.query.bankCode == 'WEIXIN'){
          this.bankCode = 'WEIXIN';
        }
      }else if(this.urlSource.platform == 'ZBMALL'){ // 赚播
        if(this.$route.query.bankCode == 'WEIXIN'){
          this.bankCode = 'WEIXIN';
        }
      }


      this.apiClientIp()
    },
    // 获取客户端IP
    apiClientIp() {
      const data = Object.assign({})
      apiPayClientIp(data).then(res=>{
        if (res.code.toString() === '10000') {
          this.payClientIp = res.data.ip
        } else {
          Toast.fail(res.msg)
        }

      }).catch(error=>{
        Toast.fail(error)
      })
    },
    // 订单支付
    // async apiPayMobileUnified(parameter, callback) {
    //   const data = Object.assign({}, parameter)
    //   const res = await this.$post(this.$api.payMobileUnified, data)
    //   try {
    //     if (res.code.toString() === '10000') {
    //       callback && callback(res)
    //     } else {
    //       Toast.fail(res.msg)
    //     }
    //   } catch (error) {
    //     console.log('error', error)
    //     Toast.fail(error)
    //   }
    // },
    apiPayMobileUnified(parameter, callback){
      const data = Object.assign({}, parameter)
      apiPayMobileUnified(data).then((res)=>{
        if (res.code.toString() === '10000') {
          callback && callback(res)
        } else {
          Toast.fail(res.msg)
        }
      }).catch((error)=>{
        Toast.fail(error)
      })
    },

  
    apiPayCommonValue(){ //是否展示快捷支付判断
      // apiPayCommonValue, apiPayActCommonValueXFYL


      let data = Object.assign({} , {
        // mercId: commonJs.getPlatform().mercId,
        // platform: commonJs.getPlatform().platform,
        
      })

      apiPayActCommonValueXFYL(data).then((res)=>{
        if (res.code.toString() === '10000') {
          this.quickPayCheck = res.data.quickPayCheck; 
          this.payCommonValue = res.data;

          //不展示快捷支付时 默认选中 微信/支付宝
          if(this.quickPayCheck == 0){
            this.bankCode = this.$route.query.bankCode || 'WEIXIN' // 缓存支付方式
          }

        } else {
          Toast.fail(res.msg)
        }
      }).catch((error)=>{
        Toast.fail(error)
      })
    },
    // 设置支付类型
    handleBankCode(item) {
      this.bankCode = item.bankCode
      if(this.bankCode == "WEIXIN" || this.bankCode == "ALIPAY"){
        this.$refs.myBank.clearActiveIndex();
      }

    },
    bankPayFn(){
      if(!this.bankCode){
        Toast('请选择支付方式');
        return;
      }
      window.sessionStorage.setItem('bankPaySuccUrl', JSON.stringify({
        url: commonJs.goPayConfig(this.$route.query.source).PAYPaySucceed
      }))// 缓存支付信息

      this.$refs.myBank.thirdPartypay();
    },
    // 微信点击事件
    wechatPayParent(target) {
    },
    // 公共参数
    apiCommonValue(callback){
      const data = Object.assign({},{
        methodType: 'CommonValue',
      })

      this.apiPayMobileUnified(data, (res) => {
        this.mppayCommonValue = res.data;
      })
    },


  }
}
</script>

<style lang="less" scoped>
.pay {
  background: #f5f5f5;
  position: absolute;
  width: 100%;
  height: 100%;
  .orderInfoLayout {
    padding: 15px 19px 18px;
    background: #fff;
    .orderInfo {
      margin-bottom: 5px;
      .leftbar {
        font-size: 15px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
      }
      .rightbar {
        font-size: 15px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);

        line-height: 21px;
      }
    }
  }
  .callbackTip {
    width: 100%;
    position: absolute;
    left: 0;
    top: 130px;
    .image {
      width: 260px;
      height: 260px;
      display: block;
      margin: 0 auto;
      font-size: 260px;
    }
    .text {
      width: 100%;
      height: 36px;
      font-size: 26px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 36px;
      text-align: center;
      display: block;
    }
    .download {
      text-align: center;
    }
  }

  .payType {
    .title {
      font-size: 16px;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      // line-height: 44px;
      padding: 15px 19px 10px;
    }
    /deep/ .van-radio-group {
      padding: 0px;
      .van-radio__icon--checked {
        .van-icon {
          // background: #333333;
          // background: url();
          width: 18px;
          height: 18px;
          background: url(../../assets/act/icon_05choice_01@2x.png) center center no-repeat;
          border: none;
          background-size: 100% 100%;
          
        }
        .van-icon-success:before{
          content: ' ';
        }
      }
      .van-cell__title {
        // line-height: 40px;
      }
      .van-cell__value {
        flex: none;
      }
      .van-radio {
        padding: 20px 10px 10px;
      }
      .van-cell {
        padding: 0 4px 0 15px;

        height: 70px;
        line-height: 70px;
      }
      .wechatPayImg {
        width: 44px;
        height: 44px;
        // display: inline-block;
        // vertical-align: middle;
        margin-left: 8px;
        float: left;
        margin-top: 16px;
      }
      .wechatPayText {
        // display: inline-block;
        // vertical-align: middle;
        margin-left: 10px;
        font-size: 15px;
        float: left;
      }
      .itemBankName{
        height:22px;
        font-size:16px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:22px;
        margin-top: 15px;
      }
      .tipbar{
        
        height:14px;
        border-radius:2px;
        border:1px solid rgba(215,29,52,1);
        font-size:9px;
        font-family:PingFangSC-Medium,PingFang SC;
        font-weight:500;
        color:rgba(215,29,52,1);
        line-height:14px;
        padding: 0 5px;
        margin-top: 6px;
      }
    }
  }
  .sendLayout {
    width: 335px;
    padding: 20px;
    // position: absolute;
    // left: 0;
    // bottom:23px;
    .sendBtn {
      width: 100%;
      height: 44px;
      line-height: 44px;
      background:linear-gradient(45deg,rgba(230,0,23,1) 0%,rgba(204,0,20,1) 100%);
      border-radius:22px;
      color: #fff; 
    }
  }
  .showH5 {
    .showH5SuccessBtn {
      color: #333333;
      width: 100%;
      display: block;
      font-size: 16px;
      font-weight: 400;
      margin-top: 20px;
    }
    .showH5failBtn {
      width: 100%;
      display: block;
      font-size: 16px;
      font-weight: 400;
    }
  }
}
</style>

<style lang="less" scoped>
@media screen and(min-width: 750px) {
  .WEIXIN{
    display: none;
  }
}
</style>
