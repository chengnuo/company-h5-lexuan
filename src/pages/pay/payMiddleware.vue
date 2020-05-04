<!-- 支付成功回调 -->
<template>
  <div class="payMiddleware">

    <!-- 基本信息 -->
    <div class="orderInfoLayout">
      <div class="orderInfo">
        <span class="leftbar">订单编号：</span>
        <span class="rightbar">{{dataSource.prePayOrder.orderNo}}</span>
      </div>
      <div class="orderInfo">
        <span class="leftbar">支付金额：</span>
        <span class="rightbar">{{commonJs.numFilterToFixed2(dataSource.prePayOrder.price)}}</span>
      </div>
    </div>

    <!-- 微信支付 -->
    <div class="payType">
      <div class="title">支付方式</div>
      <van-radio-group v-model="bankCode">
        <van-cell-group v-for="(item, index) in dataSource.bankList"
                        :key="index">
                        <!-- v-if="!commonJs.isWeiXin() || item.bankCode == 'WEIXIN'" -->
          <van-cell title=""
                    clickable
                    @click="handleBankCode(item)"
                    v-if="(commonJs.isWeiXin() && item.bankCode == 'WEIXIN') || (!commonJs.isWeiXin() && item.bankCode == 'ALIPAY')"
          >
            <template slot="title">
              <span class="custom-text">
                <img v-if="item.bankCode == 'WEIXIN'"
                     src="../../assets/img/order/pay_01@2x.png"
                     class="wechatPayImg" />
                <img v-if="item.bankCode == 'ALIPAY'"
                     src="../../assets/img/order/ipay_02@2x.png"
                     class="wechatPayImg" />
                <span class="wechatPayText">{{item.bankName}}</span>
              </span>
            </template>
            <van-radio :name="item.bankCode" />
          </van-cell>
        </van-cell-group>

      </van-radio-group>
    </div>
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
    <!-- 微信h5支付成功 -->
    <van-dialog v-model="showH5"
                title="请确认是否完成支付"
                class="showH5"
                :show-confirm-button="false">
      <van-button type="default"
                  class="showH5SuccessBtn"
                  @click="handleH5PaySuccess">已完成支付</van-button>
      <van-button type="default"
                  class="showH5failBtn"
                  @click="handleH5PayFail">未完成支付</van-button>
    </van-dialog>
  </div>
</template>

<script>

import commonJs from '@/util/common'
import { Toast } from 'vant'

export default {
  name: 'pay',
  data() {
    return {
      dataSource: { // 初始化数据
        bankList: [],
        merc: {},
        prePayOrder: {}
      },
      pay: '1',
      payClientIp: '', // 获取客户端IP
      showH5: true, // h5弹出层
      urlSource: {}, // url带过来的数据缓存
      commonJs
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.dataSource = JSON.parse(window.sessionStorage.getItem('dataSource')) || {} // 数据源
      this.urlSource = JSON.parse(window.sessionStorage.getItem('urlSource')) || {} // url带过来的数据缓存
    },
    // 成功跳转
    goSuccess() {
      // window.location.href = `${commonJs.getUrl()}/paySucceed` // 跳回原来地方
      // window.location.href = `${commonJs.payConfig.PAYPaySucceed}` // 名品猫站外落地页-成功页
      window.location.href = `${commonJs.goPayConfig(this.urlSource.source).PAYPaySucceed}` // 跳回原来地方
    },
    // 失败/取消跳转
    goFail() {
      this.$router.push({
        name: 'Pay',
        query: {
          mercId: this.urlSource.mercId,
          openid: this.urlSource.openid,
          prePayNo: this.urlSource.prePayNo,
          source: this.urlSource.source,
          platform: this.urlSource.platform,
        }
      })
    },
    // h5成功的时候
    handleH5PaySuccess() {
      // h5支付，判断是否跳转
      const data = {
        methodType: 'QueryOrder',
        requestId: new Date().getTime(),
        mercId: this.urlSource.mercId,
        orderNo: this.dataSource.prePayOrder.orderNo,
        platform: this.urlSource.platform,
      }
      this.$post(this.$api.payMobileUnified, data, commonJs.jsSign(data))
        .then(res => {
          if (res.code.toString() === '10000') {
            if (res.data.orderStatus === 'S') {
              this.goSuccess() // 成功跳回之前
            } else if (res.data.orderStatus === 'W') {
              this.goFail() // 这个继续支付
            }
          } else {
            Toast.fail(res.msg)
          }
        })
        .catch(res => {
          Toast.fail(res.msg)
        })
    },
    // h5取消的时候
    handleH5PayFail() {
      this.showH5 = true
      this.goFail() // 这个继续支付
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.payMiddleware {
  background: #f5f5f5;
  position: absolute;
  width: 100%;
  height: 100%;
  .orderInfoLayout {
    padding: 15px 19px 18px;
    background: #fff;
    .orderInfo {
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
      line-height: 44px;
      padding: 0 19px;
    }
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
  .sendLayout {
    padding: 20px;
    .sendBtn {
      width: 100%;
      height: 44px;
      background: #333333;
      color: #fff;
      border-radius: 4px;
    }
  }
  .showH5 {
    /deep/ .van-dialog__header {
      padding: 24px 20px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
    }
    .showH5SuccessBtn {
      width: 49%;
      display: inline-block;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: #AA9160;
      line-height: 20px;
    }
    .showH5failBtn {
      width: 49%;
      display: inline-block;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      line-height: 20px;
      color: rgba(102, 102, 102, 1);
    }
  }
}
</style>
