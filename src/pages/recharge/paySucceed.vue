<template>
  <div class="jump-succeed ignore-jump-succeed">
    <!-- 状态 -->
    <div class="jump-succeed__state">
      <img src="../../assets/img/login/Mask@2x.png"
           alt="">
      <p class="title">支付成功</p>
    </div>

    
    <div class="orderInfo" v-if="1">
      <div class="time">支付时间：{{orderDetailSource.payDate}} {{orderDetailSource.payTime}}</div>
      <div class="num">
        交易流水号：
        <span id="target">{{orderDetailSource.payNo}}</span>
        <span v-if="orderDetailSource.payNo">
          <span
            id="copyBtn"
            data-clipboard-action="copy" 
            data-clipboard-target="#target"
            @click="copyPolicyNo"
            class="copy"
          >
            <img class="img" src="../../assets/img/recharge/icon_copy_01@2x.png"
            alt="" />
           </span>
        </span>
      </div>
    </div>
    <a href="javascript:;" class="submit" @click="handleBack">返回</a>

    <PreLoading v-if="loading" class="myloading" />
  </div>
</template>

<script>


import {  apiOrderQueryOrderUnified } from '@/api/order'

import { Toast } from 'vant'


import PreLoading from '../../components/preLoading'

export default {
  name: 'rechargePaySucceed',

  components: {
    PreLoading,
  },


  data() {
    return {
      orderDetailSource: {},
      loading: true,
    }
  },

  created() {
    this.init();
  },

  methods: {
    // 初始化
    init() {
      // 获取缓存数据
      // this.orderDetail = JSON.parse(window.sessionStorage.getItem('orderDetail'))
      setTimeout(()=>{
        this.apiOrderQueryOrderUnified();
      },2000)
    },
    // 订单详情
    apiOrderQueryOrderUnified(){
      this.loading = true;
      const getOrderSubmit = JSON.parse(window.sessionStorage.getItem('orderSubmit')) || {}
      const data = Object.assign({},{
        orderNo: this.$route.query.orderNo || getOrderSubmit.orderNo ,
        methodType: 'QueryOrder',
        requestId: Date.parse(new Date()),
        // mercId: getOrderSubmit.mercId || '',
        // mercId: getOrderSubmit.mercId,
      })
      apiOrderQueryOrderUnified(data).then(res=>{
        this.loading = false;
        if (res.code.toString() === '10000') {
          console.log('')
          this.orderDetailSource = res.data;
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
            console.log('res', res)
            Toast.fail(res.msg)
          }
          
        }

      }).catch(error=>{
        this.loading = false;
        Toast.fail(error)
      })
    },
    // 复制成功
    onCopy(e){
      // console.log('e', e)
      Toast.fail(`复制成功`)
    },
    // 复制失败
    onCopyError(){
      Toast.fail(`复制失败，请重新再试`)
    },
    // 复制
    handleBack(){
      this.$router.push({
        name: 'rechargePrice'
      })
    },
    copyPolicyNo(){
     let _this = this;
     let clipboard = new this.clipboard("#copyBtn");
     clipboard.on('success', function () {
       _this.$toast("复制成功")
     });
     clipboard.on('error', function () {
       _this.$toast("复制失败")
     });
    },

  }
}
</script>

<style lang="less" scoped>
.jump-succeed {
  text-align: center;

  &__state {
    > img {
      width: 120px;
      height: 120px;
      text-align: center;
      margin: 0 auto;
      padding: 60px 0 10px;
    }

    .title {
      color: #333;
      font-weight: bold;
      line-height: 28px;
      font-size: 20px;
    }
  }

  &__footer {
    .btn-save {
      width: 335px;
      margin: 60px 0 10px;
      background: #333;
    }

    .wechat {
      display: flex;
      margin-top: 50px;
      justify-content: center;

      > img {
        width: 100px;
        height: 100px;
        pointer-events: auto;
      }

      &--right {
        color: #333;
        font-size: 16px;
        margin: 20px 0 0 15px;
        line-height: 28px;
        text-align: left;
      }
    }
  }

  /deep/ .van-button--danger {
    font-size: 16px;
    background-color: #333;
    border: 1px solid #333;
  }
  .orderInfo{
    text-align: left;
    margin-left: 89px;
    margin-top: 20px;
    .time{
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:17px;
    }
    .num{
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:17px;
      margin-top: 2px;
      .img{
        display: inline-block;
        width: 14px;
        height: 16px;
      }
      .copy{
        margin-left: 5px;
        position: relative;
        top: 3px;
      }
    }
  }
  .submit {
    width: 335px;
    height: 44px;
    background:linear-gradient(225deg,rgba(10,211,238,1) 0%,rgba(10,190,213,1) 100%);
    border-radius:2px;
    margin: 0 auto;
    margin-top: 44px;
    display: block;
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 44px;
    color: rgba(255, 255, 255, 1);
  }
  .myloading{
    background: #fff;
    opacity: 0.3;
  }
}
</style>