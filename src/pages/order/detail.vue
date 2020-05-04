<!-- 订单页面 -->
<template>
  <div class="order">
    <div v-if="orderDetailSource.orderInfo.name">

      <div class="orderStatusText">
        <div class="title">
          {{orderDetailSource.orderInfo.orderStatusText}}
        </div>
        <div class="img">
          <span v-if="orderDetailSource.orderInfo.status=='W'">
            <img src="../../assets/img/order/pay_01@2x 2.png">
          </span>
          <span v-if="orderDetailSource.orderInfo.status=='S'">
            <img src="../../assets/img/order/done_01@2x.png">
          </span>
          <span v-if="orderDetailSource.orderInfo.status=='C'">
            <img src="../../assets/img/order/cancel_01@2x.png">
          </span>
          <span v-if="orderDetailSource.orderInfo.status=='WS'">
            <img src="../../assets/img/order/ship_01@2x.png">
          </span>
          <span v-if="orderDetailSource.orderInfo.status=='WD'">
            <img src="../../assets/img/order/Receipt_01@2x.png">
          </span>
        </div>
        <div class="expTime" v-if="formatExpTime!=-1 && orderDetailSource.orderInfo.status=='W'">{{formatExpTimeText}}</div>
      </div>

      <div style="display: none">
        <van-cell-group>
          <van-cell 
                    title="订单状态"
                    >
                    <div>
                      <span>{{orderDetailSource.orderInfo.orderStatusText}}</span>
                    </div>
          </van-cell>
        </van-cell-group>
      </div>


      <!-- 编辑地址 -->
      <div class="addressEdit">
          <!-- @click="goAddress" -->
        <van-cell 
                  size="large"
                  :label="`收货地址： ${orderDetailSource.orderInfo.address}`"
                  is-link
                  icon="location-o">
          <span slot="title">
            收货人：{{orderDetailSource.orderInfo.name}}
            <span style="float: right">{{orderDetailSource.orderInfo.mobile}}</span>
          </span>
          <span slot="icon">
            <img src="../../assets/img/order/Positioning_01@2x.png"
                class="addressEditLeftIcon">
          </span>
          <van-icon slot="right-icon"
                    name="arrow" class="addressEditArrow" />
        </van-cell>
      </div>
      <!-- 商品明细 -->
      <div class="goodDetail clearfix">
        <div class="title">商品明细</div>
        <div class="list">
          <div class="clearfix"
              v-for="(item, index) in orderDetailSource.orderGoods"
              :key="index">
            <van-card :num="item.goodsType==1?`赠品 ${item.number}`:`${item.number}`"
                      :price="commonJs.numFilterToFixed2(item.price)"
                      :desc="joinSpecifications(item.specifications)"
                      :title="item.goodsName"
                      :thumb="item.picUrl" />
          </div>
        </div>
      </div>
      <!-- 订单信息 -->
      <div class="orderInfo">
        <van-cell-group>
          <van-cell class="totalCommodity"
                    title="商品总额"
                    >
                    ￥ {{commonJs.numFilterToFixed2(orderDetailSource.orderInfo.goodsTotalPrice)}}
          </van-cell>
          <!-- <van-cell class="freight"
                    title="运费"
                    :value="`￥ ${orderDetailSource.orderInfo.shipPrice}`" /> -->
          <van-cell class="totalAmount"
                    :title="`${orderDetailSource.orderInfo.status=='W'?'需付款':'总计金额'}`"
                    >
                    ￥ {{commonJs.numFilterToFixed2(orderDetailSource.orderInfo.totalPrice)}}
          </van-cell>

        </van-cell-group>
      </div>

      <div class="orderInfo2">
        <van-cell-group>
          <van-cell title="订单编号：">
              {{orderDetailSource.orderInfo.orderNo}}
          </van-cell>
          <van-cell title="交易流水：">
              {{orderDetailSource.orderInfo.payNo}}
          </van-cell>
          <van-cell title="创建时间：">
              {{orderDetailSource.orderInfo.addTime}}
          </van-cell>
          <van-cell title="付款时间：">
              {{orderDetailSource.orderInfo.payTime}}
          </van-cell>
          <van-cell title="发货时间：">
              {{orderDetailSource.orderInfo.shipTime}}
          </van-cell>
        </van-cell-group>
      </div>
    </div>


    <goBack />

  </div>
</template>

<script>

import commonJs from '@/util/common'
import { apiOrderQueryOrder } from '@/api/order'

import PreLoading from '../../components/preLoading'
import { Toast } from 'vant'
/*引入日期插件*/
import moment from 'moment'

import goBack from '@/components/goBack';

export default {
  name: 'order',
  components: {
    PreLoading,
    goBack,
  },
  data() {
    return {
      active: 2,
      pay: '1',
      orderDetailSource: {
        orderGoods: [],
        orderInfo: {
          expTime: 0,
        },
      },
      payClientIp: '',
      commonJs,
      now: moment(),
      formatExpTime: -1,
      formatExpTimeText: '',
      countDownTimer: null,
	    // endDate: '2019-05-07 08:20:00',
    }
  },
  mounted() {
    commonJs.outSideShare();
    this.init()
  },
  computed: {
    //计算属性，返回剩余时间
  },
  methods: {
    // 初始化
    init() {
      // 获取缓存数据
      // this.orderDetail = JSON.parse(window.sessionStorage.getItem('orderDetail'))
      this.apiOrderDetail();
    },
    // 格式化
    PrefixInteger(num, n) {
	   return (Array(n).join(0) + num).slice(-n);
    },
    // 倒计时
    countDown(){
	    
        if(this.formatExpTime<=0){
          clearTimeout(this.countDownTimer);
        }
        this.formatExpTime--
        let x = this.formatExpTime * 1000
        let du = moment.duration(x);

        let days = du.get('days')
	      let hours = du.get('hours')
	      let mins = du.get('minutes')
        let ss = du.get('seconds')
        
	      if(hours<=0 && mins<=0 && ss<=0) {
	        this.formatExpTimeText =  "已过期"
	      }else {
	        this.formatExpTimeText =  `剩${this.PrefixInteger(mins,2)}分${this.PrefixInteger(ss,2)}秒自动取消`
        }
	    
	  },
    // 订单详情
    apiOrderDetail(){
      console.log('this.$route', this.$route)
      const data = Object.assign({},{
        // orderNo: this.$route.params.orderNo,
        orderNo: this.$route.params.orderNo || getOrderSubmit.orderNo ,
        methodType: 'QueryOrder',
        requestId: Date.parse(new Date()),
      })
     Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中'
      })
      apiOrderQueryOrder(data).then(res=>{
        if (res.code.toString() === '10000') {
          this.orderDetailSource = res.data;
          // this.formatExpTime = res.data.orderInfo.expTime
          this.formatExpTime = res.data.orderInfo.expTime
          this.countDownTimer = window.setInterval(()=>{
            this.countDown(this.formatExpTime)
          },1000)
          
        } else { 
          
        } 

        Toast.clear();
      }).catch(error=>{
        // Toast.fail(error)
      })
    },
    joinSpecifications(value) {
      return value.join()
    },
  },
}
</script>

<style lang="less" scoped>
.clearfix:after {
  content: ".";
  clear: both;
  display: block;
  height: 0;
  visibility: hidden;
}
.order {
  background: rgba(245, 245, 245, 1);
  position: absolute;
  width: 100%;
  height: 100%;
  .orderStatusText{
    background: url("../../assets/img/order/head@2x.png") no-repeat;
    background-size: 100% 100%;
    width: 375px;
    height: 180px;
    position: relative;
    .title{
      position: absolute;
      left: 40px;
      top: 99px;


      font-size:18px;
      font-family:PingFangSC;
      font-weight:500;
      color:#fff;
      line-height:25px;
    }
    .img{
      position: absolute;
      left: 255px;
      top: 78px;
      width: 70px;
      height: 70px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    .expTime{
      position: absolute;
      left: 40px;
      top: 130px;
      color: #fff;
    }
  }
  // 编辑地址
  .addressEdit {
    background: #fff;
    .addressEditLeftIcon {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 50%;
      left: 10px;
      font-size: 16px;
      -webkit-transform: translate(0, -50%);
      transform: translate(0, -50%);
    }
    .van-cell__title {
      padding: 0 20px 0 28px;
      color: #333333;
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 21px;
    }
    .van-cell__label {
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 18px;
    }
    .addressEditArrow {
      display: none;
      position: absolute;
      top: 50%;
      right: 10px;
      font-size: 16px;
      -webkit-transform: translate(0, -50%);
      transform: translate(0, -50%);
      color: rgb(204, 204, 204);
    }
  }
  // 商品明细
  .goodDetail {
    background: #fff;
    margin: 10px 0 0 0;
    padding: 15px 0;
    .title {
      padding: 0 0 0 15px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
    }
    .van-card {
      background: #fff;
      padding: 0 17px;
      margin-top: 26px;
      height: 82px;
    }
    .list .van-card:first-child {
      margin-top: 10px;
    }
    .van-card__thumb {
      width: 70px;
      height: 70px;
    }
    .van-card__title {
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 21px;
      max-height: 42px;
      height: 42px;
    }
    .van-card__desc {
      font-size: 13px;
      font-family: PingFangSC-Light;
      font-weight: 300;
      color: rgba(153, 153, 153, 1);
      line-height: 18px;
    }
    .van-card__bottom {
      .van-card__price {
        font-size: 16px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        margin-top: 8px;
      }
      .van-card__num {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
        margin-top: 10px;
      }
    }
  }
  // 支付
  .pay {
    margin-top: 10px;
    background: #fff;
    /deep/ .van-radio-group {
      padding: 0px;
      .van-radio__icon--checked {
        .van-icon {
          background: #333333;
          border-color: #333333;
        }
      }
      .van-cell__title {
        line-height: 40px;
      }
      .van-cell__value {
        flex: none;
      }
      .van-radio {
        padding: 10px;
      }
      .van-cell {
        padding: 0 20px;
      }
      .wechatPayImg {
        width: 22px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
      }
      .wechatPayText {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  // 订单信息
  .orderInfo {
    margin-bottom: 10px;
    .totalCommodity {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
    }
    .freight {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
    }
    .totalAmount {
      font-size: 15px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 21px;
      .van-cell__value {
        font-size: 15px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: #d62d2d;
        line-height: 21px;
      }
    }
    /deep/ .van-cell:not(:last-child):after{
      border: none;
    }
  }
  .orderInfo2{
    /deep/ .van-cell:not(:last-child):after{
      border: none;
    }
    /deep/ .van-cell__title{
      width: 80px;
      flex: 1;
    }
    /deep/ .van-cell__value{
      flex: 3;
      text-align: left;
    }
  }
  // 提交订单
  .submitOrder {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.05);
    .leftbar {
      padding: 10px 15px;
      height: 40px;
      line-height: 40px;
      float: left;
      .price{
        color: #d62d2d;
      }

    }
    .rightbar {
      float: right;
      margin-top: 10px;
      margin-right: 10px;
      .sendBtn {
        width: 110px;
        height: 40px;
        line-height: 40px;
        // background: #333333;
        background:linear-gradient(225deg,rgba(250,185,2,1) 0%,rgba(250,167,2,1) 100%);
        border-radius: 4px;
        font-size: 15px;
        font-weight: 500;
        color: #333333;
        text-align: center;
        border: 0px;
      }
    }
  }
}
</style>
