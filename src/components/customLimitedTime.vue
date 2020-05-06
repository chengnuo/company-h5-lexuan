<!-- 限时秒杀 -->
<template>
  <div class="customLimitedTime">
    <div class="bg"></div>
    <!-- 抢购中 -->
    <div class="inRush">
      <div class="items">
        <div class="item ">
          <div class="time">
            11:00
          </div>
          <div class="description">
            昨日精选
          </div>
        </div>

        <div class="item ">
          <div class="time">
            11:00
          </div>
          <div class="description">
            已开抢
          </div>
        </div>

        <div class="item active">
          <div class="time">
            11:00
          </div>
          <div class="description">
            抢购中
          </div>
        </div>

        <div class="item ">
          <div class="time">
            11:00
          </div>
          <div class="description">
            即将开始
          </div>
        </div>

        <div class="item ">
          <div class="time">
            11:00
          </div>
          <div class="description">
            即将开始
          </div>
        </div>

      </div>
    </div>

    <!-- 本场还剩余 -->
    <div class="weStillHave clearfix">
      <div class="leftbar fl"></div>
      <div class="centerbar fl">
        <span class="description">本场还剩余</span>
        <span class="time">15 : 22 : 32</span>
      </div>
      <div class="rightbar fl"></div>
    </div>

    <!-- 秒杀列表 -->
    <div class="seckillList ">
      <div class="item clearfix">
        <div class="leftbar fl">
          <img class="img"
               src="../assets/img/my/SK_a_04@2x.png" />
        </div>
        <div class="rightbar fl">
          <div class="title">
            [原价128]不老日记何首乌何首乌头皮洗发露
          </div>
          <div class="buyLayout clearfix">
            <div class="price fl">
              <span class="symbol1">￥</span>
              <span class="number1">399</span>
              <span class="symbol2">￥</span>
              <span class="number2">499</span>

            </div>
            <div class="buy fr">
              马上抢
            </div>
          </div>
        </div>
      </div>
      
      <div class="item clearfix">
        <div class="leftbar fl">
          <img class="img"
               src="../assets/img/my/SK_a_04@2x.png" />
        </div>
        <div class="rightbar fl">
          <div class="title">
            [原价128]不老日记何首乌何首乌头皮洗发露
          </div>
          <div class="buyLayout clearfix">
            <div class="price fl">
              <span class="symbol1">￥</span>
              <span class="number1">399</span>
              <span class="symbol2">￥</span>
              <span class="number2">499</span>

            </div>
            <div class="buy fr">
              马上抢
            </div>
          </div>
        </div>
      </div>
      
      <div class="item clearfix">
        <div class="leftbar fl">
          <img class="img"
               src="../assets/img/my/SK_a_04@2x.png" />
        </div>
        <div class="rightbar fl">
          <div class="title">
            [原价128]不老日记何首乌何首乌头皮洗发露
          </div>
          <div class="buyLayout clearfix">
            <div class="price fl">
              <span class="symbol1">￥</span>
              <span class="number1">399</span>
              <span class="symbol2">￥</span>
              <span class="number2">499</span>

            </div>
            <div class="buy fr">
              马上抢
            </div>
          </div>
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
  name: 'CustomLimitedTime',
  props: {
    height: {
      type: Number,
      default: () => {
        return 0
      }
    }
  },
  data() {
    return {
    }
  },
  mounted() {

    commonJs.outSideShare();
    // this.apiShopMobileMsgNotifyList();
  },
  methods: {
    onLoad() {
      this.apiShopMobileMsgNotifyList();
    },
    apiShopMobileMsgNotifyList() {
      const data = Object.assign({}, this.filterData, {

      })
      apiShopMobileMsgNotifyList(data).then(res => {
        if (res.code.toString() === '10000') {

          // this.noticeList = res.data.items;
          // if (res.data.items.length < 20) {
          //   this.finished = true;
          // }
          var data = res.data.items;

          //第一次加载没有数据就提示没有图案
          // if (this.page == 1 && data.length <= 0) this.showNoRecordTip = true;

          if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              this.noticeList.push(data[i]);
            }
          } else {
            this.finished = true;
          }
          // 加载状态结束
          this.loading = false;

          this.filterData.page++
        } else {
          Toast.fail(res.msg)
        }
      }).catch(error => {
        console.log('error', error)
        Toast.fail(error)
      })
    },
  }
}
</script>
<style lang="less" scoped>
.customLimitedTime {
  .bg {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
  .marginTop10 {
    margin-top: 10px;
  }
  .line {
    height: 1px;
    margin: 10px 0;
    background: #c00;
  }
  .inRush {
    & .items {
      width: 375px;
      height: 50px;
      background: rgba(255, 245, 245, 1);
      display: flex;
      flex-wrap: wrap;

      // justify-content: center;//x轴排列
      align-items: center; //y轴排列
      flex-direction: column;
      & .item.active {
        & .time {
          background: rgba(249, 97, 97, 1);
          border-radius: 10px;
          font-size: 15px;
          font-family: PingFang-SC-Heavy, PingFang-SC;
          font-weight: 800;
          color: rgba(255, 255, 255, 1);
          line-height: 21px;
          padding: 0 6px;
        }
        & .description {
          font-size: 10px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(249, 97, 97, 1);
          line-height: 14px;
        }
      }
      & .item {
        flex: 1;
        margin-top: 7px;
        & .time {
          height: 21px;
          font-size: 15px;
          font-family: PingFang-SC-Heavy, PingFang-SC;
          font-weight: 800;
          color: rgba(51, 51, 51, 1);
          line-height: 21px;
          text-align: center;
        }
        & .description {
          height: 14px;
          font-size: 10px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 14px;
          margin-top: 1px;
          text-align: center;
        }
      }
    }
  }

  .weStillHave {
    padding-top: 20px;
    padding-bottom: 20px;
    background: #fff;
    & .leftbar {
      width: 72px;
      height: 1px;
      background: rgba(230, 230, 230, 1);
      margin-top: 15px;
      margin-left: 16px;
    }
    & .centerbar {
      width: 180px;
      // height:30px;
      border-radius: 18px;
      border: 1px solid rgba(230, 230, 230, 1);
      margin-left: 10px;
      margin-right: 10px;
      box-sizing: border-box;
      text-align: center;
      line-height: 30px;
      & .description {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 17px;
      }
      & .time {
        font-size: 15px;
        border-radius: 18px;
        margin-left: 10px;
      }
    }
    & .rightbar {
      width: 72px;
      height: 1px;
      background: rgba(230, 230, 230, 1);
      margin-top: 15px;
      margin-right: 15px;
    }
  }
  .seckillList {
    background: #fff;
    & .item {
      padding: 20px 15px;
      // border: 1px solid #ccc;
      // box-sizing: border-box;
      & .leftbar {
        & .img {
          width: 110px;
          height: 110px;
        }
      }
      & .rightbar {
        width: 225px;
        margin-left: 10px;
        .title {
          font-size: 15px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 21px;
        }
        & .buyLayout {
          margin-top: 38px;
          height: 30px;
          .price {
            margin-top: 10px;
            .symbol1 {
              font-size: 12px;
              font-family: PingFang-SC-Bold, PingFang-SC;
              font-weight: bold;
              color: rgba(198, 28, 28, 1);
              line-height: 16px;
            }
            .number1 {
              font-size: 18px;
              font-family: PingFang-SC-Bold, PingFang-SC;
              font-weight: bold;
              color: rgba(198, 28, 28, 1);
              line-height: 16px;
            }
            .symbol2 {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 12px;
              margin-left: 5px;
              text-decoration: line-through;
            }
            .number2 {
              font-size: 12px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 12px;
              text-decoration: line-through;
            }
          }
          .buy {
            // height:30px;
            background: rgba(240, 73, 73, 1);
            border-radius: 15px;
            padding: 5px 15px;
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            line-height: 20px;
            margin-top: 2px;
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
}
</style>