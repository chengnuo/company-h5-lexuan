<template>
  <div class="listOrderContainer">
    <div class="noOrderTip"
         v-if="showNoOrderTip">
      <img src="../assets/img/myOrder/icon_07list_02@2x.png">
      <p>你暂时没有相关订单哦～</p>
    </div>
    <div class="listOrderBox"
         v-for="(item,index) in orderArr"
         :key="index"
         v-if="!showNoOrderTip">
      <div>
        <div class="orderNumber">
          <img src="../assets/img/myOrder/xxfh_01@2x.png"
               alt=""
               v-if="item.purchType == 4">
          <span>订单编号：{{item.orderNo}}</span>
          <span class="state">{{item.orderStatusText}}</span>
        </div>
        <div class="order"
             v-for="key in item.goodsList"
             @click="jumpOrderDetail(item)">
          <img mode="aspectFill"
               :src="key.picUrl">
          <div class="info">
            <div class="title">{{key.goodsName}}</div>
            <div class="dec">{{key.specifications.toString().replace(/,/g,'；')}}</div>
            <div class="price">
              <div class="left">
                <span class="unit">¥</span>
                <span>{{key.price}}</span>
              </div>
              <div class="right">
                <span class="symbol">
                  <span v-if="key.goodsType==1">赠品</span>
                  X
                </span>{{key.number}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="totalBox">
        <div class="total">
          <div class="left">共{{item.goodsList.length}}件商品</div>
          <div class="right">
            <span class="priceText">总计：</span>
            <div class="priceNum">
              <span class="unit">¥</span>
              <span>{{item.totalPrice}}</span>
            </div>
          </div>
        </div>
        <div class="toPaid"
             v-if="item.status == 'W'">
          <div class="right"
               @click="toPay(item.orderNo)">付款</div>
          <div class="left"
               @click="cancelOrder(item.orderNo)">取消订单</div>
        </div>
        <div class="toPaid" v-show="item.purchType != 2 && item.purchType != 4"
             v-if="item.status == 'WD' || item.status == 'S'">
          <div class="right"
               v-if="item.status == 'WD'"
               @click="confirmOrder(item.orderNo)">确认收货</div>
          <div class="left"
               @click="checkLogistics(item.orderNo)"
               :class="{'leftMtr20':item.status == 'WD' , 'leftMtr0': item.status != 'WD'}"
               style="margin-left:20px;">查看物流</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { apiRepayOrder } from '@/api/myOrder';
import commonJs from '@/util/common'
import { Toast, Dialog } from 'vant';
export default {
  name: '',
  props: {
    orderArr: {
      type: Array,
      required: true
    },
    showNoOrderTip: {
      type: Boolean,
      required: false
    }
  },
  methods: {
    jumpOrderDetail(item) {
      console.log('orderNo', item)
      if (item.purchType == 4 || item.purchType == 5) { // 状态：-1 删除,0:下线 1 上线
        return true
      }else{
        this.$router.push({
          path: '/order/detail/' + item.orderNo
        })
      }

    },
    checkLogistics(orderNo) {
      console.log(orderNo)
      this.$router.push({
        path: '/listShip',
        query: {
          orderNo
        }
      })
    },
    toPay(orderNo) {
      apiRepayOrder({
        orderNo,
        // sysCnl: commonJs.isWeiXin() ? 'WX-PUBLIC' : 'H5', // 下单终端渠道：IOS、ANDROID、WX-APPLET(小程序)1
      }).then((res) => {
        let sysCnl = commonJs.isWeiXin() ? 'WX-PUBLIC' : 'H5'
        window.sessionStorage.setItem('orderSubmit', JSON.stringify(res.data)) // 商户购买的时候，缓存信息
        const getLoginAuthorization = JSON.parse(window.sessionStorage.getItem('loginAuthorization')) || {}
        const userData = JSON.parse(sessionStorage.getItem('userData')) || {}


        const url = `${commonJs.config.prefixH5Url}pay?mercId=${res.data.mercId}&prePayNo=${res.data.prepayNo}&source=${commonJs.payConfig.XFyinliPAYSourceLangshaMall}&platform=XFYLMALL&userId=${userData.id}`




        window.location.href = url
      }).catch(error => {

      })
    },
    cancelOrder(id) {
      var _this = this;
      Dialog.confirm({
        // title: '订单处理',
        message: '是否确定取消该订单'
      }).then(() => {
        _this.$emit('changeStatus', id);
      }).catch(() => {
        // on cancel
      });
    },
    confirmOrder(id) {
      var _this = this;
      Dialog.confirm({
        // title: '订单处理',
        message: '是否确认收货'
      }).then(() => {
        _this.$emit('receivingGood', id);
      }).catch(() => {
        // on cancel
      });
    }
  }
}
</script>
<style>
/* components/myOrder/all/index.wxss */

.listOrderContainer .noOrderTip {
  margin-top: 90px;
}
.listOrderContainer .noOrderTip img {
  width: 130px;
  height: 130px;
  display: block;
  margin: 0 auto;
}
.listOrderContainer .noOrderTip p {
  height: 18px;
  font-size: 13px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 18px;
  text-align: center;
  margin-top: -20px;
}
.listOrderContainer .orderNumber {
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
  padding: 0 14px 12px;
  /*display: flex;
  justify-content: space-between;*/
}
.listOrderContainer .listOrderBox {
  position: relative;
  margin-bottom: 10px;
  background: #fff;
  padding: 15px 0;
}
.listOrderContainer .orderNumber span {
  float: left;
}
.listOrderContainer .orderNumber .state {
  height: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  line-height: 20px;
  float: right;
}
.listOrderContainer .orderNumber img {
  width: 52px;
  float: left;
  margin-right: 5px;
}
.listOrderContainer .order {
  padding: 0 15px;
  display: flex;
  /* align-items: center; */
  margin-bottom: 10px;
}
.listOrderContainer .order img {
  width: 70px;
  height: 70px;
}
.listOrderContainer .order img {
  width: 70px;
  height: 70px;
  margin-right: 15px;
}
.listOrderContainer .order .info .title {
  width: 260px;
  max-height: 42px;
  font-size: 15px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 21px;
  display: block;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  margin-bottom: 10px;
}
.listOrderContainer .order .info .dec {
  width: 260px;
  height: 28px;
  font-size: 13px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 14px;
  display: block;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: break-word;
  white-space: normal !important;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.listOrderContainer .order .price {
  display: flex;
  justify-content: space-between;
  /* padding-top: 20px; */
}
.listOrderContainer .order .price .left {
  height: 22px;
  font-size: 16px;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
}
.listOrderContainer .order .price .left .unit {
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
  margin-right: 3px;
}
.listOrderContainer .order .price .right {
  height: 20px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 20px;
}
.listOrderContainer .order .price .symbol {
  font-size: 11px;
  margin-right: 3px;
}
.listOrderContainer .total {
  display: flex;
  justify-content: space-between;
}
.listOrderContainer .totalBox {
  padding: 0 15px;
}
.listOrderContainer .total {
  padding-top: 10px;
  border-top: rgba(245, 245, 245, 1) solid 1px;
  margin-top: 25px;
}
.listOrderContainer .total .left {
  height: 17px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 17px;
}
.listOrderContainer .total .right {
  display: flex;
  height: 20px;
}
.listOrderContainer .total .right .priceText {
  height: 17px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 17px;
}
.listOrderContainer .total .right .priceNum {
  height: 17px;
  font-size: 14px;
  font-weight: 600;
  color: #d62d2d;
  line-height: 16px;
}
.listOrderContainer .total .right .unit {
  height: 17px;
  font-size: 12px;
  font-weight: 400;
  color: #d62d2d;
  line-height: 17px;
  margin-right: 1px;
}
.listOrderContainer .toPaid {
  margin-top: 11px;
  height: 33px;
  display: _none;
}
.listOrderContainer .toPaid div {
  width: 80px;
  text-align: center;
  line-height: 33px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  height: 30px;
  border-radius: 2px;
}
.listOrderContainer .toPaid .left {
  float: right;
  margin-right: 11px;
  color: rgba(102, 102, 102, 1);
  border: 1px solid rgba(153, 153, 153, 1);
}
.listOrderContainer .toPaid .leftMtr0 {
  margin-right: 0;
}
.listOrderContainer .toPaid .leftMtr20 {
  margin-right: 10px;
}
.listOrderContainer .toPaid .right {
  background: linear-gradient(
    225deg,
    rgba(10, 211, 238, 1) 0%,
    rgba(10, 190, 213, 1) 100%
  );
  border-radius: 2px;
  float: right;
  font-weight: 500;
  border: 1px solid #0abed5;
}
</style>

