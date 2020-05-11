<!-- 订单页面 -->
<template>
  <div class="order">
    <!-- 编辑地址 -->
    <div class="addressEdit"
         @click="goAddress">
      <van-cell v-if="orderDetail.checkedAddress && orderDetail.checkedAddress.name"
                size="large"
                :label="`收货地址： ${orderDetail.checkedAddress.provinceName}${orderDetail.checkedAddress.cityName}${orderDetail.checkedAddress.areaName}-${orderDetail.checkedAddress.address}`"
                is-link
                icon="location-o">
        <span slot="title">
          收货人：{{orderDetail.checkedAddress.name}}
          <span style="float: right">{{orderDetail.checkedAddress.mobile}}</span>
        </span>
        <span slot="icon">
          <img src="../../assets/img/order/Positioning_01@2x.png"
               class="addressEditLeftIcon">
        </span>
        <van-icon slot="right-icon"
                  name="arrow"
                  class="addressEditArrow" />
      </van-cell>
      <van-cell v-else
                title="填写收货地址"
                size="large"
                is-link
                icon="location-o">
        <span slot="icon">
          <img src="../../assets/img/order/Positioning_01@2x.png"
               class="addressEditLeftIcon">
        </span>
        <van-icon slot="right-icon"
                  name="arrow"
                  class="addressEditArrow" />
      </van-cell>
    </div>
    <!-- 微信支付 -->
    <!-- <div class="pay">
      <van-radio-group v-model="pay">
        <van-cell-group>
          <van-cell title=""
                    clickable
                    @click="pay = '1'">
            <template slot="title">
              <span class="custom-text">
                <img src="../../../assets/img/order/pay_01@2x.png"
                     class="wechatPayImg" />
                <span class="wechatPayText">微信支付</span>
              </span>
            </template>
            <van-radio name="1" />
          </van-cell>
          <van-cell title=""
                    clickable
                    @click="pay = '2'">
            <template slot="title">
              <span class="custom-text">
                <img src="../../../assets/img/order/ipay_02@2x.png"
                     class="wechatPayImg" />
                <span class="wechatPayText">支付宝</span>
              </span>
            </template>
            <van-radio name="2" />
          </van-cell>
        </van-cell-group>
      </van-radio-group>

    </div> -->
    <!-- 商品明细 -->
    <div class="goodDetail clearfix" v-if="orderDetail.checkedGoodsList && orderDetail.checkedGoodsList.length>0">
      <div class="title">商品明细</div>
      <div class="list">
        <div class="clearfix"
             v-for="(item, index) in orderDetail.checkedGoodsList"
             :key="index">
          <!-- :num="item.number" -->
          <van-card :price="commonJs.numFilterToFixed2(item.price)"
                    :desc="joinSpecifications(item.specifications)"
                    :title="item.goodsName"
                    :thumb="item.picUrl" />
        </div>
      </div>
      <div class="addCartNumsLayoutLine"></div>
      <!-- <van-cell class="addCartNumsLayout"
                title="购买数量"
                  >
        <van-stepper 
          class="addCartNums" 
          v-model="addCartNums" 
          min="5" 
          :max="watchUserInviteLevelCountProfitPtLevel" 
          step="25" 
          @change="handleAddCart"
          :disable-input='true'
          
           />
      </van-cell> -->
      <van-cell class="addCartNumsLayout"
                title="购买数量">
        <div class="clearfix addCartItemNumber"
             v-for="(item, index) in orderDetail.checkedGoodsList"
             :key="index">
          x{{item.number}}
        </div>
      </van-cell>
    </div>

    <!-- 赠品 -->
    <div class="goodDetail clearfix"
         v-if="orderDetail.checkedGiftList && orderDetail.checkedGiftList.length>0">
      <div class="title">赠品</div>
      <div class="list">
        <div class="clearfix"
             v-for="(item, index) in orderDetail.checkedGiftList"
             :key="index">
          <van-card :num="item.number"
                    :price="commonJs.numFilterToFixed2(item.price)"
                    :desc="joinSpecifications(item.specifications)"
                    :title="item.goodsName"
                    :thumb="item.picUrl" />
        </div>
      </div>
      <div class="addCartNumsLayoutLine"></div>
      <!-- <van-cell class="addCartNumsLayout"
                title="赠品数量"
                  >
        <van-stepper 
          class="addCartNums" 
          v-model="addCartNums" 
          min="5" 
          :max="watchUserInviteLevelCountProfitPtLevel" 
          step="25" 
          @change="handleAddCart"
          :disable-input='true'
           />
      </van-cell> -->
    </div>
    <!-- 订单信息 -->
    <div class="orderInfo">
      <van-cell-group>
        <van-cell class="totalCommodity"
                  title="商品总额">
          ￥{{commonJs.numFilterToFixed2(orderDetail.goodsTotalPrice)}}
        </van-cell>
        <!-- <van-cell class="freight"
                  title="运费"
                  :value="`￥${orderDetail.orderShipPrice}`" /> -->
        <van-cell class="totalAmount"
                  title="总计金额">
          ￥{{commonJs.numFilterToFixed2(orderDetail.orderTotalPrice)}}
        </van-cell>

      </van-cell-group>
    </div>

    <!-- 提交订单 -->
    <div class="submitOrder">
      <div class="leftbar">
        总计金额 ：<span class="price">¥ {{commonJs.numFilterToFixed2(orderDetail.orderTotalPrice)}}</span>
      </div>
      <div class="rightbar">
        <van-button type="primary"
                    class="sendBtn"
                    @click="apiOrderSubmit">提交订单</van-button>
      </div>
    </div>

    <van-dialog v-model="checkOrderDialog"
                :show-confirm-button="false"
                class="checkOrderDialog">
      <div class="content">
        该订单已经生成，是否查看？
      </div>
      <van-button type="default"
                  class="successBtn"
                  @click="handleGoOrder">是的</van-button>
    </van-dialog>

  </div>
</template>

<script>

import commonJs from '@/util/common'
import { apiPayClientIp, apiPayMobileUnified, apiOrderSubmit } from '@/api/order'
import { apiShoppingCartBuy, apiGoodsUserInviteLevelCount } from '@/api/goods'
import { Toast } from 'vant'

export default {
  name: 'order',
  data() {
    return {
      active: 2,
      pay: '1',
      orderDetail: {
        checkedAddress: {
          name: ''
        },
        checkedGoodsList: [],
        checkedGiftList: [],
      },
      payClientIp: '',
      commonJs,
      submitLoad: false,
      addCartNums: 1, // 添加购物数量
      checkOrderDialog: false,
      userInviteLevelCount: {},
      watchUserInviteLevelCountProfitPtLevel: null,
    }
  },
  mounted() {
    commonJs.outSideShare();
    this.init()
  },
  watch: {
    userInviteLevelCount(value) {
      if (value.profitPtLevel == 1) {
        this.watchUserInviteLevelCountProfitPtLevel = 5
      } else {
        this.watchUserInviteLevelCountProfitPtLevel = 30
      }
    },
  },
  methods: {
    // 初始化
    init() {
      let userData = JSON.parse(sessionStorage.getItem('userData')) || {}
      this.apiClientIp()
      // this.apiGoodsUserInviteLevelCount({
      //   ptLevel: 2,
      // }, () => {
      //   // 获取缓存数据
      //   this.orderDetail = JSON.parse(window.sessionStorage.getItem('orderDetail'))
      //   this.addCartNums = this.orderDetail && this.orderDetail.checkedGoodsList && this.orderDetail.checkedGoodsList[0].number && this.orderDetail.checkedGoodsList[0].number || 1
        
        
      // })

      this.orderDetail = JSON.parse(window.sessionStorage.getItem('orderDetail'))
      this.addCartNums = this.orderDetail && this.orderDetail.checkedGoodsList && this.orderDetail.checkedGoodsList[0].number && this.orderDetail.checkedGoodsList[0].number || 1

    },
    // 获取客户端IP
    apiClientIp() {
      const data = Object.assign({})
      apiPayClientIp(data).then(res => {
        if (res.code.toString() === '10000') {
          this.payClientIp = res.data.ip
        } else {
          Toast.fail(res.msg)
        }

      }).catch(error => {
        Toast.fail(error)
      })
    },
    // 订单提交-http://showdoc.sys.jxblot.com/web/#/3?page_id=85
    /**
     * @method mercId 商户ID
     * @method prePayNo 预支付号
     * @method openid 支付id-jspai
     * @method source 来源
     */
    apiOrderSubmit() {
      const cartIds = (this.orderDetail.checkedGoodsList || []).map(res => res.id)// 购物车id
      const cartGitIds = (this.orderDetail.checkedGiftList || []).map(res => res.id)// 购物车赠品id
      const inviteCode = commonJs.getInviteCodeRedirectUrlFn().firstInviteCode.inviteCode || null
      let data = {}

      const checkedAddressId = this.orderDetail && this.orderDetail.checkedAddress && this.orderDetail.checkedAddress.id
      if (!checkedAddressId) {
        Toast.fail('请填写收货地址')
        return false
      }

      if (this.submitLoad) return;
      this.submitLoad = true;


      const getGoodDetailPurchType = JSON.parse(window.sessionStorage.getItem('goodDetailPurchType')) || {}

      data = {
        cartIds: cartIds.concat(cartGitIds), // 购物车id
        addressId: checkedAddressId, // 地址id
        sysCnl: commonJs.isWeiXin() ? 'WX-PUBLIC' : 'H5', // 下单终端渠道：IOS、ANDROID、WX-APPLET(小程序)
        clientIp: this.payClientIp, // 获取ip
        // buyType: '1', // 购买类型 0：普通购买 1：分享购买-提示：这里改为0
        // inviteCode: inviteCode, // 邀请码 购买类型为1：分享购买 此参数必填分享的用户邀请码
        buyType: 0, // 购买类型 0：普通购买 1：分享购买-提示：这里改为0
        purchType: getGoodDetailPurchType.purchType, // 进货类型 1：购买自用 2：进货云仓 3：提货 默认为1
      }
      // const res = await this.$post(this.$api.orderSubmit, data)
      console.log('购物车', data)
      apiOrderSubmit(data).then(res => {
        window.sessionStorage.setItem('orderSubmit', JSON.stringify(res.data)) // 商户购买的时候，缓存信息
        if (res.code.toString() === '10000') {
          if (getGoodDetailPurchType.purchType == 5) {
            // 提货详情
            this.$router.push({
              path: `/act/countyStore/deliveryGoodsSucceed`
            })
          } else {
            this.apiPayMobileUnified({
              'methodType': 'PayCashier',
              'mercId': res.data.mercId, // 1
              'prePayNo': res.data.prepayNo // 1
            }, (resApiPayMobileUnified) => {
              let sysCnl = commonJs.isWeiXin() ? 'WX-PUBLIC' : 'H5'
              const getLoginAuthorization = JSON.parse(window.sessionStorage.getItem('loginAuthorization')) || {}
              const userData = JSON.parse(sessionStorage.getItem('userData')) || {}
              // const url = `${commonJs.config.prefixH5Url}pay?mercId=${res.data.mercId}&prePayNo=${res.data.prepayNo}&openid=${getLoginAuthorization.openid}&source=${commonJs.payConfig.XFyinliPAYSource}&platform=${resApiPayMobileUnified.data.prePayOrder.platform}&userId=${userData.id}`
              const url = `${commonJs.config.prefixH5Url}/pay?mercId=${res.data.mercId}&prePayNo=${res.data.prepayNo}&source=${commonJs.payConfig.XFyinliPAYSourceLangshaMall}&platform=${resApiPayMobileUnified.data.prePayOrder.platform}&userId=${userData.id}`
              this.submitLoad = false;
              // const url = `http://localhost:8080pay?mercId=${res.data.mercId}&prePayNo=${res.data.prepayNo}&openid=${getLoginAuthorization.openid}&source=${commonJs.payConfig.XFyinliPAYSource}&platform=${resApiPayMobileUnified.data.prePayOrder.platform}&userId=${userData.id}`
              window.location.href = url;
            })
          }

        } else {
          console.log('res', res)
          this.submitLoad = false;
          Toast(res.msg)
        }

        // else if(res.code.toString() === '40002'){
        //   this.checkOrderDialog = true;
        // }

      }).catch(error => {
        this.submitLoad = false;
        console.log('error', error)
        Toast.fail(error)

      })
    },
    // 订单支付
    apiPayMobileUnified(parameter, callback) {
      const data = Object.assign({}, parameter)

      // const res = await this.$post(this.$api.payMobileUnified, data)
      apiPayMobileUnified(data).then(res => {
        if (res.code.toString() === '10000') {
          // Toast.success(res.msg)
          callback && callback(res)
        } else {
          Toast.fail(res.msg)
        }
      }).catch(error => {
        console.log('error', error)
        Toast.fail(error)
      })
    },
    joinSpecifications(value) {
      console.log('value', value)
      // return value.join()
      return value && value.map((item) => {
        return item.name
      }).join()
    },
    // 跳转去地址
    goAddress() {
      this.$router.push({
        name: 'Address'
      })
    },
    // 登录成功的时候，缓存信息给订单order
    buyLocalStorage(resData) {
      window.sessionStorage.setItem('orderDetail', JSON.stringify(resData)) // 商户购买的时候，缓存信息
      this.orderDetail = JSON.parse(window.sessionStorage.getItem('orderDetail'))
    },
    // 立即购买
    apiShoppingCartBuy() {
      // this.getProductId()
      //console.log('his.goodsDetail', this.goodsDetail)

      const data = {
        // productId: this.productId,
        productId: this.orderDetail.checkedGoodsList[0].productId,
        number: this.addCartNums,
        purchType: 1, // 进货类型 1：购买自用 2：进货云仓 4：线下发货
      }
      // const res = await this.$post(this.$api.shoppingCartBuy, data)
      apiShoppingCartBuy(data).then((res) => {
        if (res.code.toString() === '10000') {
          // 成功
          const resData = res.data || []
          this.buyLocalStorage(resData)
        } else {
          if (res.code.toString() === '10501') { // 请登录
            if (!commonJs.getInviteCodeRedirectUrlFn().firstInviteCode) {
              commonJs.setInviteCodeRedirectUrlFn({
                redirectUrl: `${window.location.origin}${window.location.pathname}`,
                firstInviteCode: this.$route.query
              }) // 设置获取-首次和登录后的inviteCode
            }
            const type = this.$route.query.type || 2
            this.$router.push({
              name: 'Login',
              query: {
                type: type,
                inviteCode: this.$route.query.inviteCode
              }
            })
          } else {
            Toast.fail(res.msg)
          }
        }
      }).catch((error) => {
        Toast.fail(error)
      })
    },
    // 添加购物车
    handleAddCart() {
      console.log('this.orderDetail', this.orderDetail)
      this.apiShoppingCartBuy();
    },
    // 跳转订单
    handleGoOrder() {
      this.$router.push({
        name: 'myOrder'
      })
    },
    // 邀请直属用户等级数量
    apiGoodsUserInviteLevelCount(obj, callback) {

      const data = Object.assign({}, obj)
      // const res = await this.$post(this.$api.shoppingCartBuy, data)
      apiGoodsUserInviteLevelCount(data).then((res) => {
        if (res.code.toString() === '10000') {
          console.log('邀请直属用户等级数量')
          this.userInviteLevelCount = res.data
          callback && callback()
        } else {
          Toast.fail(res.msg)
        }
      }).catch((error) => {
        Toast.fail(error)
      })
    },
  },
  components: {}
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
  /deep/ input:disabled,
  input[disabled] {
    color: "#333";
    opacity: 1;
    -webkit-text-fill-color: "#333";
    font-weight: bold;
    -webkit-font-weight: bold;
  }
  background: rgba(245, 245, 245, 1);
  position: absolute;
  width: 100%;
  height: 100%;
  border-top: 1px solid rgba(240, 240, 240, 1);
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
      margin-top: 6px;
    }
    .addressEditArrow {
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
    padding: 15px 0 0 0;
    // .list{
    //   height: 100px;
    // }
    .addCartNumsLayoutLine {
      width: 345px;
      height: 1px;
      background: rgba(240, 240, 240, 1);
      margin: 0 10px;
    }
    .addCartNumsLayout {
      .addCartNums {
        border-radius: 5px;
        border: 1px solid rgba(204, 204, 204, 1);
        // width:70px;
        // height:26px;
        float: right;
        /deep/ .van-stepper__minus {
          background: #fff;
          color: rgba(51, 51, 51, 1);
          width: 23px;
          background: url(../../assets/img/goods/-_01@2x.png) center 12px
            no-repeat;
          background-size: 10px 2px;
        }
        /deep/ .van-stepper__input {
          background: #fff;
          color: rgba(51, 51, 51, 1);
          font-weight: 700;
          margin: 0;
          width: 23px;
        }
        /deep/ .van-stepper__plus {
          background: #fff;
          color: rgba(51, 51, 51, 1);
          width: 23px;
          background: url(../../assets/img/goods/+_01@2x.png) center 8px
            no-repeat;
          background-size: 10px 10px;
        }
        /deep/ .van-stepper__minus--disabled {
          color: #cccccc;
          background: url(../../assets/img/goods/-_01@2x1.png) center 12px
            no-repeat;
          background-size: 10px 2px;
        }
        /deep/ .van-stepper__plus--disabled {
          color: #cccccc;
          background: url(../../assets/img/goods/+_02@2x.png) center 8px
            no-repeat;
          background-size: 10px 10px;
        }
        /deep/ .van-stepper__minus:before {
          background: none;
          position: relative;
        }
        /deep/ .van-stepper__minus:after {
          background: none;
          position: relative;
        }
        /deep/ .van-stepper__plus:before {
          background: none;
          position: relative;
        }
        /deep/ .van-stepper__plus:after {
          background: none;
          position: relative;
        }
      }
      .addCartItemNumber {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
      }
    }
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
      height: 100px;
    }
    .list .van-card:first-child {
      margin-top: 10px;
    }
    .van-card__thumb {
      width: 70px;
      height: 70px;
    }
    /deep/ .van-card__title {
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 21px;
      max-height: 42px;
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
    margin-top: 10px;
    margin-bottom: 70px;
    .totalCommodity {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
      border: none;
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
    /deep/ .van-cell:not(:last-child):after {
      border: none;
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
      .price {
        color: #d62d2d;
        font-weight: bold;
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
        background:linear-gradient(45deg,rgba(230,0,23,1) 0%,rgba(204,0,20,1) 100%);
        border-radius:22px;
        border-color: none;
        font-size: 15px;
        font-weight: 500;
        color: #ffffff;
        text-align: center;
        border: 0px;
      }
    }
  }

  .checkOrderDialog {
    .content {
      margin: 30px;
      font-size: 16px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(3, 3, 3, 1);
      line-height: 22px;
    }
    .successBtn {
      width: 99%;
      display: inline-block;
      font-size: 17px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(170, 145, 96, 1);
      line-height: 24px;
    }
  }
}
</style>
