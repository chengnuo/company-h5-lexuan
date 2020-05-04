<!-- 我要升级 -->
<template>
  <div class="myIWantToUpgrade">
    <!-- logo -->
    <div class="userImgLayout">
      <div class="myIWantToUpgrade__logo">
        <div class="currentLevel">当前等级</div>
        <img class="img"
             src="../../assets/img/my/user pupong_01@2x.png"
             alt="">
        <p class="title">普通用户</p>
      </div>
    </div>

    <div class="levelLayout">
      <div class="levelList clearfix">
        <div class="leftbar">
          <img class="img"
               src="../../assets/img/my/user pupong_01@2x.png"
               alt="">
        </div>
        <div class="centerbar">
          VIP
        </div>
        <div class="rightbar">
          <van-button class="upgradeBtn">升级申请</van-button>
        </div>
      </div>
      <div class="levelList clearfix">
        <div class="leftbar">
          <img class="img"
               src="../../assets/img/my/user pupong_01@2x.png"
               alt="">
        </div>
        <div class="centerbar">
          VIP
        </div>
        <div class="rightbar">
          <van-button class="upgradeBtn">升级申请</van-button>
        </div>
      </div>
    </div>

    <div class="explain">
      <div class="headerbar">升级说明</div>
      <div class="bodybar">
        <p>1.一次性订购5盒产品即可升级至VIP。</p>
        <p>2.一次性订购30盒产品即可升级至县级店。</p>
        <p>3.有疑问可联系客服咨询。</p>
      </div>
    </div>
  </div>
</template>
<script >
import commonJs from '@/util/common'
import { Toast } from 'vant';
export default {
  name: 'MyIWantToUpgrade',
  data() {
    return {

    }
  },
  mounted() {
    
    commonJs.outSideShare();
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.myIWantToUpgrade {
  .userImgLayout {
    width: 375px;
    height: 180px;
    text-align: center;
    // background: ('03@2x.png');1
    background: url(../../assets/img/goods/03@2x.png) center center no-repeat;
    background-size: 100% 100%;
    .currentLevel {
      padding-top: 112px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 16px;
    }
    .img {
      text-align: center;
      padding-top: 8px;

      width: 72px;
      height: 72px;
      margin: 0 auto;
      img {
        display: block;
        width: 72px;
        height: 72px;
        border-radius: 50%;
        object-fit: cover;
        margin: 0 auto;
        border: solid 2px #4cede6;
      }
    }

    .title {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(153, 153, 153, 1);
      line-height: 16px;
      margin-top: 9px;
    }
    .Inviter {
      margin-top: 10px;
      .leftbar {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 18px;
      }
      .rightbar {
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 18px;
      }
    }
  }
  .levelLayout {
    margin-top: 80px;
    .levelList {
      width: 345px;
      height: 98px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
      border-radius: 6px;
      margin: 0px 15px 10px 15px;
      .leftbar {
        width: 90px;
        height: 98px;
        display: flex;
        justify-content: center;
        align-items: center;

        float: left;

        img {
          width: 60px;
          height: 60px;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .centerbar {
        float: left;
        width: 155px;
        height: 98px;
        line-height: 98px;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(102, 102, 102, 1);
      }
      .rightbar {
        float: left;
        .upgradeBtn {
          margin-top: 34px;
          width: 80px;
          height: 30px;
          background: linear-gradient(
            225deg,
            rgba(10, 211, 238, 1) 0%,
            rgba(10, 190, 213, 1) 100%
          );
          border-radius: 3px;

          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 20px;
          padding: 0;
        }
      }
    }
  }
  .explain {
    margin-top: 20px;
    margin-left: 15px;
    .headerbar {
      margin-bottom: 5px;
    }
    .bodybar {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 16px;
      p {
        margin-top: 3px;
      }
    }
  }
}
</style>