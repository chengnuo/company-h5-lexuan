<template>
  <div class="jump-succeed ignore-jump-succeed">
    <!-- 状态 -->
    <div class="jump-succeed__state">
      <img src="../../assets/img/login/Mask@2x.png"
           alt="">
      <p class="title">绑定成功</p>
    </div>

    <!-- 操作按钮 -->
    <div class="jump-succeed__footer">
      <van-button class="btn-save"
                  type="danger"
                  @click="handleOk">确定</van-button>
    </div>

  </div>
</template>

<script>
import commonJs from '@/util/common'

export default {
  name: 'PayBindingSucceed',

  data() {
    return {
      applet: false,
      webapp: false,
      process: null,
      platform: 'XFYLMALL'
    }
  },

  created() {

    this.platform = commonJs.getPlatform().platform;

    // if(this.platform == 'XFYLMALL'){
    //   this.goHome() // 跳回首页
    //   this.wxShare() // 分享
    // }

  },

  methods: {
   goHome() {
      const userData = JSON.parse(sessionStorage.getItem('userData')) || {}
      const inviteCode = this.$route.query.inviteCode || ''
      if (!userData.id) {
        window.location.href = `/login?inviteCode=${inviteCode}`
      }
    },
    // 分享 
    wxShare() {
      const userData = JSON.parse(window.sessionStorage.getItem('userData')) || {}
      const inviteCode = userData.inviteCode || this.$route.query.inviteCode || ''
      commonJs.outSideShare({
        title: '乐选',
        desc: `幸福好管家，经营好帮手`,
        link: `${commonJs.getUrl()}/login?inviteCode=${inviteCode}`,
        img: `${commonJs.getUrl()}/static/logo.png`
      })
    },
    handleOk() {
      var url = window.sessionStorage.getItem('bankOrderPayUrl');
      if(url){
        var href = JSON.parse(url);
        window.location.href= href.url;
        return;
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
      background:linear-gradient(225deg,rgba(10,211,238,1) 0%,rgba(10,190,213,1) 100%);
      border-radius:2px;
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
    border:none;
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
      border:none;
    }
  }
}
</style>
