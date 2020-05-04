<template>
  <div class="financePay">
    <!-- <div class="payBox">
      <p>输入保证金额</p>
      <div class="inputBox">
        <span>¥</span>
        <textarea v-model="price" type="tel" maxlength="7" placeholder="请输入保证金额"></textarea>
      </div>
    </div> -->
    <div class="bond">
      <div class="headerbar">
        保证金余额
      </div>
      <div class="bodybar">
        <div class="leftbar">¥</div>
        <div class="rightbar">{{shopMobileIncomeBal.sctBal}}</div>
      </div>
    </div>
    <a href="javascript:;"
       class="submit"
       @click="handleSubmitDialog">
      <!-- 充 值 -->
    </a>

    <van-overlay :show="showBond"
                 @click="showBond = false">
      <div class="wrapper"
           @click.stop>
        <div class="blockBond">
          <div class="titleBond">请输入充值金额</div>
          <div class="inputBond">
            <van-cell-group>
              <!-- type="tel" -->
              <van-field v-model="price"
                         maxlength="7"
                         type="number"
                         placeholder="请输入充值金额"
                         ref="priceInput"
                          />
            </van-cell-group>
          </div>
          <div class="line"></div>
          <div class="submitBond">
            <div class="leftbar" @click="handleSubmitDialogCannel">取消</div>
            <div class="centerbar"></div>
            <div class="rightbar" @click="handleSubmit">确定</div>
          </div>
        </div>
      </div>
    </van-overlay>

    <goBack />
  </div>
</template>
<script>
// import bank from '@/components/rechargeBank';


import { apiRechargeShopMobileDepositSubmit } from '@/api/recharge'

import { apiPayMobileUnified } from '@/api/order'

import { apiPayClientIp } from '@/api/order'

import { Toast } from 'vant'

import { apiShopMobileIncomeBal } from '@/api/bond'


import commonJs from '@/util/common'

import goBack from '@/components/goBack';

export default {
  name: 'Price',
  data() {
    return {
      price: '',
      payClientIp: '',
      loading: false,
      showBond: false,
      shopMobileIncomeBal: {},
    }
  },
  components: {
    // bank
    goBack
  },
  mounted() {
    commonJs.outSideShare();
    if (!window.sessionStorage.getItem('userData')) {
      this.$router.push({
        path: '/recharge/login',
      })
    }
    this.apiClientIp();
    this.apiShopMobileIncomeBal();
  },
  methods: {
    // 保证金余额
    apiShopMobileIncomeBal(){
      const data = Object.assign({})
      apiShopMobileIncomeBal(data).then(res => {
        if (res.code.toString() === '10000') {
          this.shopMobileIncomeBal = res.data
        } else {
          Toast.fail(res.msg)
        }

      }).catch(error => {
        Toast.fail(error)
      })
    },
    // 获取客户端IP
    apiClientIp(callback) {
      const data = Object.assign({})
      apiPayClientIp(data).then(res => {
        if (res.code.toString() === '10000') {
          this.payClientIp = res.data.ip
          callback && callback()
        } else {
          Toast.fail(res.msg)
        }

      }).catch(error => {
        Toast.fail(error)
      })
    },
    // 充值提交-http://showdoc.sys.jxblot.com/web/#/22?page_id=1055
    apiRechargeShopMobileDepositSubmit() {

      let reg = /(^[1-9](\d+)?(\.\d{1,2})?$)|(^\d\.\d{1,2}$)/;
      if (!this.price) {
        Toast.fail('请输入金额')
        return false;
      } else if (!reg.test(this.price)) {
        Toast.fail('请输入非零的数，保留2位小数')
        return false;
      }

      let data = {
        tradeCode: '01',
        busiType: '05',
        price: window.parseFloat(this.price),
        clientIp: this.payClientIp,
        buyType: 0,
      }

      apiRechargeShopMobileDepositSubmit(data)
        .then((res) => {
          // alert(res.data.prepayNo)
          if (res.code.toString() === '10000') {

            window.sessionStorage.setItem('orderSubmit', JSON.stringify(res.data)) // 商户购买的时候，缓存信息

            this.apiPayMobileUnified({
              'methodType': 'PayCashier',
              'mercId': res.data.mercId, // 1
              'prePayNo': res.data.prePayNo // 1
            }, (resApiPayMobileUnified) => {
              let sysCnl = commonJs.isWeiXin() ? 'WX-PUBLIC' : 'H5'
              const getLoginAuthorization = JSON.parse(window.sessionStorage.getItem('loginAuthorization')) || {}
              const userData = JSON.parse(sessionStorage.getItem('userData')) || {}
              const url = `${commonJs.config.prefixH5Url}pay?mercId=${res.data.mercId}&prePayNo=${res.data.prePayNo}&source=${commonJs.payConfig.XFyinliPAYSourceRecharge}&platform=${resApiPayMobileUnified.data.prePayOrder.platform}&userId=${userData.id}&type=bone`
              window.location.href = url;
              // location.replace(url)
            })
          } else {
            Toast.fail(res.msg)
          }
        }).catch((error) => {

          console.log('error', error)
          Toast.fail(error)
        })
    },
    jumpRecord() { //跳转保证记录页面
      this.$router.push({
        path: '/recharge/record',
      })
    },
    // 弹出层
    handleSubmitDialog(){
      
      this.showBond = true;

      this.$nextTick(()=>{
        this.$refs.priceInput.focus()
      })
    },
    handleSubmitDialogCannel(){
      this.showBond = false;
    },
    // 生成订单
    handleSubmit() {
      this.apiRechargeShopMobileDepositSubmit();
    },
    // 订单支付
    apiPayMobileUnified(parameter, callback) {
      const data = Object.assign({}, parameter)
      // this.loading = true;

      // const res = await this.$post(this.$api.payMobileUnified, data)
      apiPayMobileUnified(data).then(res => {
        // this.loading = false;
        if (res.code.toString() === '10000') {
          // Toast.success(res.msg)
          callback && callback(res)
        } else {
          Toast.fail(res.msg)
        }
      }).catch(error => {
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
        font-size: 30px;
        float: left;
      }
      textarea {
        width: 300px;
        font-size: 30px;
        line-height: 34px;
        height: 34px;
        float: left;
      }
    }
  }
  .record {
    width: 335px;
    font-size: 16px;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    margin: 0 auto;
    margin-top: 30px;
    height: 44px;
    line-height: 44px;
    background: linear-gradient(
      225deg,
      rgba(28, 250, 174, 1) 0%,
      rgba(30, 211, 166, 1) 100%
    );
    border-radius: 2px;
  }
  .submit {
    width: 335px;
    height: 44px;
    // background: linear-gradient(
    //   225deg,
    //   rgba(10, 211, 238, 1) 0%,
    //   rgba(10, 190, 213, 1) 100%
    // );
    border-radius: 2px;
    margin: 0 auto;
    margin-top: 40px;
    display: block;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 44px;
    color: rgba(255, 255, 255, 1);
    background: url(../../assets/img/bond/btn_01_01@2x.png) center center
      no-repeat;
    background-size: 100% 100%;
  }
  input::-webkit-input-placeholder {
    color: #ccc;
    font-size: 26px;
  }

  .bond {
    width: 375px;
    height: 116px;
    background: rgba(255, 255, 255, 1);
    .headerbar {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
      padding-top: 24px;
      text-align: center;
    }
    .bodybar {
      margin-top: 12px;
      text-align: center;
      .leftbar {
        font-size: 36px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 32px;
        display: inline-block;
      }
      .rightbar {
        font-size: 36px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 32px;
        margin-left: 4px;
        display: inline-block;
      }
    }
  }

  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .blockBond {
    width: 270px;
    height: 165px;
    background: linear-gradient(
      225deg,
      rgba(252, 252, 252, 0.8) 0%,
      rgba(255, 255, 255, 0.5) 100%
    );
    border-radius: 12px;
    .titleBond {
      font-size: 17px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(3, 3, 3, 1);
      line-height: 24px;
      margin-top: 20px;
      text-align: center;
    }
    .inputBond {
      margin-top: 23px;
      width: 237px;
      height: 24px;
      background: rgba(255, 255, 255, 1);
      border: 1px solid #a4a4a6;
      margin-left: 16px;
      /deep/ .van-cell {
        padding: 0;
        padding-left: 4px;
      }
    }

    .line {
      width: 270px;
      height: 1px;
      background: #a4a4a6;
      margin-top: 30px;
    }

    .submitBond {
      .leftbar {
        font-size: 17px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        height: 43px;
        line-height: 43px;
        float: left;
        width: 135px;
        text-align: center;
      }
      .centerbar {
        width: 1px;
        height: 44px;
        background: #a4a4a6;
        float: left;
      }
      .rightbar {
        width: 134px;
        font-size: 17px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(9, 194, 218, 1);
        height: 43px;
        line-height: 43px;
        float: left;
        text-align: center;
      }
    }
  }

  /deep/ .van-overlay {
    background: rgba(51, 51, 51, 0.5);
  }
}
</style>