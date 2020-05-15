<!-- 我的资产 -->
<template>
  <div class="myAssets">
    <div class="bg"></div>
    <!-- 明细 -->
    <div class="incomeDetails clearfix">
      <div class="leftbar fl">
        <div class="name">账户余额</div>
        <div class="number">2379.5</div>
      </div>
      <div class="verticalLine1 fl"></div>
      <div class="centerbar fl">
        <div class="name">收益账户</div>
        <div class="number">599.5</div>
      </div>
      <div class="verticalLine2 fl"></div>
      <div class="rightbar fl">
        <div class="name">充值帐户</div>
        <div class="number">780</div>
      </div>
    </div>
    <!-- 收益 -->
    <div class="profitDetails clearfix">
      <div class="leftbar fl">
        <div class="name">账户余额</div>
        <div class="number">2379.5</div>
      </div>
      <div class="verticalLine1 fl"></div>
      <div class="centerbar fl">
        <div class="name">收益账户</div>
        <div class="number">599.5</div>
      </div>
      <div class="verticalLine2 fl"></div>
      <div class="rightbar fl">
        <div class="name">充值帐户</div>
        <div class="number">780</div>
      </div>
    </div>

    <!-- 筛选 -->
    <div class="screen">
      <!-- 弹出层1 -->
      <div class="screenDialog1"
           style="display:none">
        <div class="itemMask1"></div>
        <div class="itemMask11"></div>
        <div class="itemDialog1">
          <div class="layout1">
            <div class="title">请选择收益类型</div>
            <div class="list clearfix">
              <div class="item active fl">全部收益</div>
              <div class="item fl">在途收益</div>
            </div>
          </div>
          <div class="layout11">
            <div class="title">请选择收益类型</div>
            <div class="list clearfix">
              <div class="item active fl">商品销售奖励</div>
              <div class="item fl">团队奖励</div>
              <div class="item fl">培训奖励</div>
              <div class="item fl">团队业绩奖励</div>
              <div class="item fl">个人业绩奖励</div>
              <div class="item fl">调账</div>
              <div class="item fl">提现</div>
              <div class="item fl">充值</div>
            </div>
          </div>
          <div class="commitLayout clearfix">
            <div class="leftbar fl">重 置</div>
            <div class="rightbar fl">确 定</div>
          </div>
        </div>
      </div>
      <!-- 弹出层2 -->
      <div class="screenDialog2"
           style="display:none">
        <div class="itemMask2"></div>
        <div class="itemMask22"></div>
        <div class="itemDialog2">
          <div class="timeLayout clearfix">
            <div class="leftbar fl active">2019-06-19</div>
            <div class="centerbar fl">至</div>
            <div class="rightbar fl">2019-06-19</div>
          </div>
          <div class="datetimePickerLayout">
            <van-datetime-picker v-model="currentDate"
                                 type="date"
                                 title="选择年月日"
                                 :min-date="minDate"
                                 :max-date="maxDate" />
          </div>
          <div class="commitLayout clearfix">
            <div class="leftbar fl">重 置</div>
            <div class="rightbar fl">确 定</div>
          </div>
        </div>
      </div>
      <!-- 弹出层3 -->
      <div class="screenDialog3">
        <div class="itemMask3"></div>
        <div class="itemMask33"></div>
        <div class="itemDialog3">
          <div class="name">请选择收益关联用户</div>
          <div class="input">
            <input type="text" placeholder="请输入手机号/会员码" />
          </div>
          
          <div class="commitLayout clearfix">
            <div class="leftbar fl">重 置</div>
            <div class="rightbar fl">确 定</div>
          </div>
        </div>
      </div>
      <div class="listTab clearfix">
        <div class="item fl ">
          筛选

        </div>
        <div class="verticalLine1 fl"></div>
        <div class="item fl ">
          时间
        </div>
        <div class="verticalLine2 fl"></div>
        <div class="item fl active">用户</div>
      </div>

      <div class="list">
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
                <em class="plus">
                  （+{{item.operateGift}}
                </em>
                <!-- <em v-if="item.operateType==1"
                    class="plus">
                  （赠送礼品）+{{item.operateGift}}
                </em>
                <em v-if="item.operateType==2">
                  <span v-if="item.purchType!=4">
                    （赠送礼品）-{{item.operateGift}}
                  </span>
                </em> -->
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import { Toast } from 'vant';

import commonJs from '@/util/common'
import { apiShopMobileMsgNotifyList } from '@/api/my'


export default {
  name: 'MyAssets',
  data() {
    return {
      giftList: [
        {
          userId: 1,
          nickname: 'nickname',
          content: 'content',
          updateTime: 'updateTime',
          operateGift: 99,
        },
        {
          userId: 2,
          nickname: 'nickname2',
          content: 'content2',
          updateTime: 'updateTime2',
          operateGift: 99,
        },
        {
          userId: 3,
          nickname: 'nickname3',
          content: 'content3',
          updateTime: 'updateTime3',
          operateGift: 99,
        },
      ],

      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
    }
  },
  mounted() {


  },
  methods: {

  },
}
</script>
<style lang="less" scoped>
.myAssets {
  background: #f6f8fa;
  .bg {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
  & .incomeDetails {
    width: 375px;
    height: 100px;
    background: linear-gradient(
      225deg,
      rgba(247, 222, 176, 1) 0%,
      rgba(247, 195, 153, 1) 100%
    );
    border: 1px solid rgba(255, 255, 255, 0.2);
    & .leftbar {
      width: 125px;
      & .name {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(155, 93, 56, 1);
        line-height: 17px;
        text-align: center;
        margin-top: 15px;
      }
      & .number {
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(155, 93, 56, 1);
        line-height: 37px;
        text-align: center;
      }
    }

    & .verticalLine1 {
      width: 1px;
      height: 28px;
      background: rgba(5, 5, 5, 0.1);
      margin-top: 28px;
    }
    & .centerbar {
      width: 125px;
      & .name {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(155, 93, 56, 1);
        line-height: 17px;
        text-align: center;
        margin-top: 15px;
      }
      & .number {
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(155, 93, 56, 1);
        line-height: 37px;
        text-align: center;
      }
    }

    & .verticalLine2 {
      width: 1px;
      height: 28px;
      background: rgba(5, 5, 5, 0.1);
      margin-top: 28px;
    }
    & .rightbar {
      width: 123px;
      & .name {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(155, 93, 56, 1);
        line-height: 17px;
        text-align: center;
        margin-top: 15px;
      }
      & .number {
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(155, 93, 56, 1);
        line-height: 37px;
        text-align: center;
      }
    }
  }

  & .profitDetails {
    width: 355px;
    height: 75px;
    background: #fff;
    margin: -21px auto 0;
    & .leftbar {
      width: 118px;
      & .name {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(155, 93, 56, 1);
        line-height: 17px;
        text-align: center;
        margin-top: 15px;
      }
      & .number {
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(155, 93, 56, 1);
        line-height: 37px;
        text-align: center;
      }
    }

    & .verticalLine1 {
      width: 1px;
      height: 28px;
      background: rgba(5, 5, 5, 0.1);
      margin-top: 28px;
    }
    & .centerbar {
      width: 118px;
      & .name {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(155, 93, 56, 1);
        line-height: 17px;
        text-align: center;
        margin-top: 15px;
      }
      & .number {
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(155, 93, 56, 1);
        line-height: 37px;
        text-align: center;
      }
    }

    & .verticalLine2 {
      width: 1px;
      height: 28px;
      background: rgba(5, 5, 5, 0.1);
      margin-top: 28px;
    }
    & .rightbar {
      width: 116px;
      & .name {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(155, 93, 56, 1);
        line-height: 17px;
        text-align: center;
        margin-top: 15px;
      }
      & .number {
        font-size: 26px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(155, 93, 56, 1);
        line-height: 37px;
        text-align: center;
      }
    }
  }
  & .screen {
    margin-top: 10px;
    width: 375px;
    background: rgba(255, 255, 255, 1);
    position: relative;
    // 弹出层1
    & .screenDialog1 {
      & .itemMask1 {
        width: 375px;
        height: 460px;
        background: rgba(0, 0, 0, 0.1);
        position: absolute;
        left: 0;
        top: 40px;
      }
      & .itemMask11 {
        width: 375px;
        height: 164px;
        background: rgba(0, 0, 0, 0.1);
        position: absolute;
        left: 0;
        top: -164px;
      }
      & .itemDialog1 {
        width: 375px;
        height: 320px;
        background: #fff;
        position: absolute;
        left: 0;
        top: 40px;
        & .title {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 14px;
          margin-left: 15px;
          margin-top: 15px;
        }
        & .list {
          margin-left: 5px;
          margin-top: 5px;
          & .item.active {
            width: 108px;
            height: 34px;
            background: rgba(255, 238, 239, 1);
            border-radius: 17px;
            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(230, 0, 23, 1);
            line-height: 34px;
          }
          & .item {
            width: 108px;
            height: 34px;
            background: rgba(245, 245, 245, 1);
            border-radius: 17px;

            font-size: 12px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(102, 102, 102, 1);
            line-height: 34px;
            text-align: center;
            margin-left: 10px;
            margin-top: 10px;
          }
        }
        & .commitLayout {
          width: 375px;
          height: 60px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px -1px 5px 0px rgba(0, 0, 0, 0.05);
          margin-top: 20px;
          & .leftbar {
            width: 168px;
            height: 40px;
            line-height: 40px;
            border-radius: 20px;
            border: 1px solid rgba(51, 51, 51, 1);
            margin-left: 15px;
            margin-top: 10px;
            font-size: 15px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            text-align: center;
          }
          & .rightbar {
            width: 168px;
            height: 40px;
            line-height: 40px;
            background: linear-gradient(
              45deg,
              rgba(230, 0, 23, 1) 0%,
              rgba(204, 0, 20, 1) 100%
            );
            border-radius: 20px;
            margin-left: 15px;
            margin-top: 10px;
            font-size: 15px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
            text-align: center;
          }
        }
      }
    }
    // 弹出层2
    & .screenDialog2 {
      & .itemMask2 {
        width: 375px;
        height: 460px;
        background: rgba(0, 0, 0, 0.1);
        position: absolute;
        left: 0;
        top: 40px;
      }
      & .itemMask22 {
        width: 375px;
        height: 164px;
        background: rgba(0, 0, 0, 0.1);
        position: absolute;
        left: 0;
        top: -164px;
      }
      & .itemDialog2 {
        width: 375px;
        height: 320px;
        background: #fff;
        position: absolute;
        left: 0;
        top: 40px;
        & .timeLayout {
          width: 375px;
          height: 49px;
          background: rgba(255, 255, 255, 1);
          text-align: center;
          line-height: 49px;
          & .leftbar {
            width: 181px;
            font-size: 15px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          & .centerbar {
            font-size: 15px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          & .rightbar {
            width: 179px;

            font-size: 15px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
          }
          & .active {
            font-size: 15px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 103, 0, 1);
          }
        }
        & .commitLayout {
          width: 375px;
          height: 60px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px -1px 5px 0px rgba(0, 0, 0, 0.05);
          margin-top: 20px;
          & .leftbar {
            width: 168px;
            height: 40px;
            line-height: 40px;
            border-radius: 20px;
            border: 1px solid rgba(51, 51, 51, 1);
            margin-left: 15px;
            margin-top: 10px;
            font-size: 15px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            text-align: center;
          }
          & .rightbar {
            width: 168px;
            height: 40px;
            line-height: 40px;
            background: linear-gradient(
              45deg,
              rgba(230, 0, 23, 1) 0%,
              rgba(204, 0, 20, 1) 100%
            );
            border-radius: 20px;
            margin-left: 15px;
            margin-top: 10px;
            font-size: 15px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
            text-align: center;
          }
        }
      }
    }
    // 弹出层3
    & .screenDialog3 {
      & .itemMask3 {
        width: 375px;
        height: 460px;
        background: rgba(0, 0, 0, 0.1);
        position: absolute;
        left: 0;
        top: 40px;
      }
      & .itemMask33 {
        width: 375px;
        height: 164px;
        background: rgba(0, 0, 0, 0.1);
        position: absolute;
        left: 0;
        top: -164px;
      }
      & .itemDialog3 {
        width: 375px;
        height: 196px;
        background: #fff;
        position: absolute;
        left: 0;
        top: 40px;
        & > .name {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 14px;
          margin-top: 20px;
          margin-left: 15px;
        }
        & > .input {
          margin-left: 15px;
          margin-top: 18px;
          &>input{
            width: 295px;
            border-radius: 22px;
            border: 1px solid rgba(204, 204, 204, 1);
            height: 22px;
            padding: 11px 20px;
          }

        }
        & .commitLayout {
          width: 375px;
          height: 60px;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0px -1px 5px 0px rgba(0, 0, 0, 0.05);
          margin-top: 20px;
          & .leftbar {
            width: 168px;
            height: 40px;
            line-height: 40px;
            border-radius: 20px;
            border: 1px solid rgba(51, 51, 51, 1);
            margin-left: 15px;
            margin-top: 10px;
            font-size: 15px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            text-align: center;
          }
          & .rightbar {
            width: 168px;
            height: 40px;
            line-height: 40px;
            background: linear-gradient(
              45deg,
              rgba(230, 0, 23, 1) 0%,
              rgba(204, 0, 20, 1) 100%
            );
            border-radius: 20px;
            margin-left: 15px;
            margin-top: 10px;
            font-size: 15px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(255, 255, 255, 1);
            text-align: center;
          }
        }
      }
    }
    & .listTab {
      height: 40px;
      line-height: 40px;
      & > .item.active {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(230, 0, 23, 1);
        // line-height:16px;
      }
      & > .item {
        padding: 0 15px 0 17px;
        position: relative;
      }
      & .verticalLine1 {
        width: 1px;
        height: 18px;
        background: rgba(245, 245, 245, 1);
        margin-top: 11px;
      }
      & .verticalLine2 {
        width: 1px;
        height: 18px;
        background: rgba(245, 245, 245, 1);
        margin-top: 11px;
      }
    }
    & .list {
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
            background: rgba(255, 248, 249, 1);
            border-radius: 5px;
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