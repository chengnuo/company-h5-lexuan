<template>
  <div class="jump-succeed ignore-jump-succeed">
    <!-- 状态 -->
    <div class="jump-succeed__state">
      <img src="../../assets/img/login/Mask@2x.png"
           alt="">
      <p class="title">支付成功</p>
    </div>

    <!-- 操作按钮 -->
    <div class="jump-succeed__footer">
      <van-button class="btn-save"
                  type="danger"
                  @click="download">下载名品猫APP，选购品质好物</van-button>
    </div>
  </div>
</template>

<script>
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
    }
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
}
</style>




<style lang="less" scoped>
@media screen and(min-width: 750px) {
  .ignore-jump-succeed {
    text-align: center;
    margin: 0 auto;
    width: 375px * 2.5;

    .jump-succeed__state {
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

    .jump-succeed__footer {
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
  }
}
</style>
