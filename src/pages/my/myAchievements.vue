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

    <div class="achievementsTable">
      <van-grid :column-num="3"
                class="columnItemType1">
        <van-grid-item text="名称" />
        <van-grid-item text="业绩(TD)" />
        <van-grid-item text="业绩返点" />
      </van-grid>
      <van-grid :column-num="3"
                class="columnItemType2">
        <van-grid-item text="我的订购" />
        <van-grid-item text="文字" />
        <van-grid-item text="文字" />
      </van-grid>
      <van-grid :column-num="3"
                class="columnItemType2">
        <van-grid-item text="下级团队" />
        <van-grid-item text="文字" />
        <van-grid-item text="文字" />
      </van-grid>
      <van-grid :column-num="3"
                class="columnItemType2">
        <van-grid-item text="同级团队" />
        <van-grid-item text="文字" />
        <van-grid-item text="文字" />
      </van-grid>
      <van-grid :column-num="3"
                class="columnItemType2">
        <van-grid-item text="总业绩" />
        <van-grid-item text="文字" />
        <van-grid-item text="文字" />
      </van-grid>
    </div>

    <div class="achievementsTabs">
      <van-tabs>
        <van-tab title="我的订购">
          <div class="item">
            <ul>
              <li v-for="(item, index) in giftList"
                  class="clearfix"
                  :key="index">
                <img v-if="item.headImgUrl"
                    :src="item.headImgUrl"
                    class="left" />
                <img v-else
                    src="../../assets/act/countyStore/people.png"
                    class="left" />
                <div class="center">
                  <div class="name line-clamp-1">
                    <!-- {{userId == item.fromUserId ? '' : item.nickname}} -->
                    {{item.nickname}}
                  </div>
                  <div class="dec">{{item.content}}</div>
                </div>
                <div class="right">
                  <span class="date">{{item.updateTime}}</span>
                  <em v-if="item.operateType==1"
                      class="plus">
                    （赠送礼品）+{{item.operateGift}}
                  </em>
                  <em v-if="item.operateType==2">
                    <span v-if="item.purchType!=4">
                      （赠送礼品）-{{item.operateGift}}
                    </span>
                  </em>
                </div>
              </li>
            </ul>
          </div>
        </van-tab>
        <van-tab title="下级团队">下级团队</van-tab>
        <van-tab title="同级团队">同级团队</van-tab>
      </van-tabs>
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
      giftList: [
        {
          userId: 1,
          nickname: 'nickname',
          content: 'content',
          updateTime: 'updateTime',
        },
        {
          userId: 2,
          nickname: 'nickname2',
          content: 'content2',
          updateTime: 'updateTime2',
        },
        {
          userId: 3,
          nickname: 'nickname3',
          content: 'content3',
          updateTime: 'updateTime3',
        },
      ],
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
    background: #f6f8fa;
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
    & .performanceAwardsLine {
      width: 375px;
      height: 1px;
      background: rgba(245, 245, 245, 1);
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
  & .achievementsTable {
    margin-top: 10px;
  }
  & .columnItemType1 {
    /deep/ .van-grid-item__content {
      background: rgba(216, 216, 216, 1);
      padding: 0px;
      /deep/ .van-grid-item__text {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 40px;
        height: 40px;
      }
    }
  }
  & .columnItemType2 {
    /deep/ .van-grid-item__content {
      // background:rgba(216,216,216,1);
      padding: 0px;
      /deep/ .van-grid-item__text {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 40px;
        height: 40px;
      }
    }
  }
  & .achievementsTabs {
    margin-top: 10px;
    /deep/ .van-tabs__line {
      display: none;
    }
    /deep/ .van-tab {
      background: #d8d8d8;
    }
    /deep/ .van-tab--active {
      background: #fff;
    }
    & .item {
      ul {
        padding: 20px 15px;
        padding-bottom: 0;
        min-height: 100%;
        li {
          min-height: 42px;
          padding: 18px 15px 18px 10px;
          background:rgba(255,248,249,1);
          border-radius:5px;
          margin-bottom: 10px;
          .left {
            width: 30px;
            height: 30px;
            float: left;
            border-radius: 50%;
            margin-top: 6px;
            margin-right: 10px;
            object-fit: cover;
          }
          .center {
            float: left;
            .name {
              max-width: 170px;
              height: 18px;
              font-size: 14px;
              color: rgba(51, 51, 51, 1);
              line-height: 18px;
              margin-bottom: 6px;
            }
            .dec {
              max-width: 170px;
              // height:18px;
              font-size: 14px;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              line-height: 18px;
            }
          }
          .right {
            float: right;
            .date {
              height: 14px;
              font-size: 10px;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              line-height: 14px;
              margin-bottom: 8px;
              display: block;
            }
            em {
              height: 18px;
              font-size: 14px;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
              line-height: 18px;
              display: block;
              &.plus {
                color: rgba(214, 45, 45, 1);
              }
            }
          }
        }
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