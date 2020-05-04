<template>
  <div class="jump-succeed">
    <!-- 状态 -->
    <div class="jump-succeed__state">
      <img src="../../assets/img/login/Mask@2x.png"
           alt="">
      <p class="title">支付成功</p>
    </div>

    <!-- 操作按钮 -->
    <div class="jump-succeed__footer">
      <van-button class="btn-save goHome"
                  type="danger"
                  @click="handleGohome"
                  >返回首页</van-button>

      <van-button class="btn-save1 goOrderDetail"
                  type="danger"
                  @click="handleOrderDetail"
                  >查看订单</van-button>
    </div>
  </div>
</template>

<script>
import commonJs from '@/util/common'

export default {
  name: 'paySucceed',

  data() {
    return {
      applet: false,
      webapp: false,
      process: null
    }
  },

  created() {
    this.getIsWxClient()
  },
  mounted(){
    commonJs.outSideShare();
  },
  methods: {
    // 获取参数
    getIsWxClient() {
      this.process = process.env.NODE_ENV
      const ua = navigator.userAgent.toLowerCase()
      this.webapp = true

      if (/micromessenger/.test(ua)) {
        this.applet = true
        this.webapp = false
      }
    },

    // 跳转应用商店
    download() {
      const ua = window.navigator.userAgent
      const isIos = /(iPhone|iPad|iPod|iOS)/i.test(ua)

      if (isIos) {
        window.location.href = 'https://itunes.apple.com/cn/app/%E5%90%8D%E5%93%81%E7%8C%AB%E5%95%86%E5%9F%8E/id1460545620?mt=8'
      } else {
        window.location.href = 'https://sj.qq.com/myapp/detail.htm?apkName=com.xfhl.mpm'
      }
    },
    // 跳回首页
    handleGohome(){
      // 获取跳转记录
      // const getInviteCodeRedirectUrl = JSON.parse(window.sessionStorage.getItem('inviteCodeRedirectUrl')) || {}
      // window.location.href = getInviteCodeRedirectUrl.redirectUrl;
      const inviteCode = commonJs.getInviteCodeRedirectUrlFn().firstInviteCode.inviteCode || ''
      window.location.href = `/goodDetail?inviteCode=${inviteCode}`;
    },
    // 跳到订单详情
    handleOrderDetail(){
      const getOrderSubmit = JSON.parse(window.sessionStorage.getItem('orderSubmit')) || {}
      
      window.location.href = `/order/detail/${getOrderSubmit.orderNo}`
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
    .van-button--danger.btn-save {
      width: 335px;
      margin: 100px 0 10px;
      background: #333;

      background:linear-gradient(225deg,rgba(250,185,2,1) 0%,rgba(250,167,2,1) 100%);
      border-radius:2px;
      border: none;

      font-size:16px;
      font-family:PingFangSC;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:22px;
    }
    .van-button--danger.btn-save1 {
      width: 335px;
      margin: 10px 0 10px;
      background:rgba(51,51,51,1);
      border-radius:2px;

      font-size:16px;
      font-family:PingFangSC;
      font-weight:400;
      color:rgba(255,255,255,1);
      line-height:22px;
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
}
</style>
