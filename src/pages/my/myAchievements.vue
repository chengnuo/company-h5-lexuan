<!-- 我的业绩 -->
<template>
  <div class="myAchievements">
    <div class="bg"></div>
    <div class="performanceAwards">
      <div class="headerbar clearfix">
        <div class="leftbar fl">联创团队业绩奖励</div>
        <div class="rightbar fr">
          <div class="time">2020-05</div>
          <div class="name">未结算</div>
        </div>
      </div>
      <div class="bodybar clearfix">
        <div class="leftbar fl">
          <div class="name">本期业绩奖总额</div>
          <div class="number">9800.26</div>
        </div>
        <div class="centerbar fl"></div>
        <div class="rightbar fl">
          <div class="indicatorAccumulation clearfix">
            <div class="name fl">指标累计：</div>
            <div class="number fl">1595 TD</div>
          </div>
          <div class="ratio clearfix">
            <div class="name fl">比率：</div>
            <div class="number fl">3</div>
          </div>
        </div>
      </div>
      <div class="performanceAwardsLine">

      </div>
      <div class="footerbar">
        距离升级到比率
        <span>3.2</span>
        还需要
        <span>1405</span>
        的业绩
      </div>
    </div>
  </div>
</template>
<script >
import { Toast } from 'vant';

import commonJs from '@/util/common'
import { apiShopMobileMsgNotifyList } from '@/api/my'


export default {
  name: 'MyAchievements',
  data() {
    return {

    }
  },
  mounted() {
  },
  methods: {

  },
}
</script>
<style lang="less" scoped>
.myAchievements {
  .bg {
    width: 100%;
    height: 100%;
    background: #F6F8FA;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
  & .performanceAwards {
    & .headerbar {
      width: 375px;
      height: 52px;
      background: rgba(251, 238, 214, 1);

      & .leftbar {
        font-size: 16px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(155, 93, 56, 1);
        line-height: 22px;
        margin-top: 15px;
        margin-left: 15px;
      }
      & .rightbar {
        margin-top: 6px;
        margin-right: 15px;
        & .time {
          font-size: 16px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(155, 93, 56, 1);
          line-height: 22px;
        }
        & .name {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 17px;
          margin-top: 1px;
          text-align: right;
        }
      }
    }
    & .bodybar {
      height: 84px;
      background: #fff;
      & .leftbar {
        width: 187px;
        & .name {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 17px;
          margin-top: 15px;
          margin-left: 15px;
        }
        & .number {
          font-size: 26px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(198, 28, 28, 1);
          line-height: 37px;
          margin-left: 15px;
        }
      }
      & .centerbar {
        width: 1px;
        height: 48px;
        background: rgba(245, 245, 245, 1);
        margin-top: 18px;
      }
      & .rightbar {
        width: 187px;
        & .indicatorAccumulation {
          margin-left: 15px;
          margin-top: 22px;
          & .name {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 17px;
          }
          & .number {
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: 17px;
          }
        }
        & .ratio {
          margin-left: 15px;
          margin-top: 5px;
          & .name {
            font-size: 12px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 17px;
          }
          & .number {
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: 17px;
          }
        }
      }
    }
    & .performanceAwardsLine{
      width:375px;
      height:1px;
      background:rgba(245,245,245,1);
    }
    & .footerbar {
      height: 47px;
      line-height: 47px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      background: #fff;
      padding-left: 15px;
      & span {
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(198, 28, 28, 1);
        line-height: 17px;
      }
    }
  }
}

.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix::after {
  clear: both;
  content: " ";
  visibility: hidden;
  height: 0;
}
</style>