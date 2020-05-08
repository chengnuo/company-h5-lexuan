<!-- materialCircle -->
<template>
  <div class="materialCircle">
    <div class="header">
      <van-tabs class="tabs">
        <van-tab title="素材圈"
                 name="one">
          <!-- 素材圈 -->
        </van-tab>
        <van-tab title="商学院"
                 name="two">
          <!-- 商学院 -->
        </van-tab>
      </van-tabs>
    </div>

    <div class="banner clearfix">
      <div class="item"></div>
      <div class="item"></div>
      <!-- <div class="item"></div> -->
    </div>

    <div class="nav">
      <van-tabs v-model="nav">
        <van-tab title="公司介绍"
                 name="a"></van-tab>
        <van-tab title="小白课程"
                 name="b"></van-tab>
        <van-tab title="优秀代理"
                 name="c"></van-tab>
        <van-tab title="团队管理"
                 name="e"></van-tab>
        <van-tab title="碧划算"
                 name="f"></van-tab>
      </van-tabs>
    </div>

    <div class="list">
      <div class="items">
        <div class="item clearfix">
          <div class="leftbar fl">
            <img class="img"
                 src="../../assets/img/my/SK_a_04@2x (1).png" />
          </div>
          <div class="rightbar fl">
            <div class="headerbar">
              2年历程 掠碧选2周年，8000+人的回忆，快来看看吧
            </div>
            <div class="bodybar clearfix">
              <div class="leftbarTwo fl">已有157435人浏览</div>
              <div class="rightbarTwo fr">2020-04-09</div>
            </div>
          </div>
        </div>

        <div class="item clearfix">
          <div class="leftbar fl">
            <img class="img"
                 src="../../assets/img/my/SK_a_04@2x (1).png" />
          </div>
          <div class="rightbar fl">
            <div class="headerbar">
              2年历程 掠碧选2周年，8000+人的回忆，快来看看吧
            </div>
            <div class="bodybar clearfix">
              <div class="leftbarTwo fl">已有157435人浏览</div>
              <div class="rightbarTwo fr">2020-04-09</div>
            </div>
          </div>
        </div>

        <div class="item clearfix">
          <div class="leftbar fl">
            <img class="img"
                 src="../../assets/img/my/SK_a_04@2x (1).png" />
          </div>
          <div class="rightbar fl">
            <div class="headerbar">
              2年历程 掠碧选2周年，8000+人的回忆，快来看看吧
            </div>
            <div class="bodybar clearfix">
              <div class="leftbarTwo fl">已有157435人浏览</div>
              <div class="rightbarTwo fr">2020-04-09</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Vue from "vue";
import { Toast } from 'vant'


export default {
  name: "MaterialCircle",


  components: {
  },

  data() {
    return {
      nav: '',
    }
  },

  created() {
  },

  methods: {

  },
};
</script>

<style lang="less" scoped>
.materialCircle {
  & .header {
    // padding-top: 10px;
    width: 375px;
    height: 200px;
    background: #c61c1c;
    & .tabs {
      /deep/ .van-tab__text {
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 25px;
      }
      /deep/ .van-tabs__nav {
        background: transparent;
      }
      /deep/ .van-tabs__line {
        background: #fff;
        width: 46px !important;
        height: 2px;
      }
      /deep/ .van-hairline--top-bottom:after {
        border: 0;
      }
      /deep/ .van-tab {
        width: 64px;
        flex: none;
        margin-left: 40px;
      }
      /deep/ .van-tab:first-child {
        margin-left: 110px;
      }
    }
  }

  & .banner {
    // width:120px;
    margin-top: -128px;
    height: 160px;
    & .item {
      width: 120px;
      height: 160px;
      float: left;
      border: 1px solid #000;
      margin-left: 10px;
      box-sizing: border-box;
    }
    & .item:last-child {
      margin-right: 0;
    }
  }
  & .nav {
    margin-top: 10px;
  }
  & .list {
    & .items {
      & .item {
        padding: 20px 15px;
        & .leftbar {
          .img {
            width: 110px;
            height: 110px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        & .rightbar {
          width: 225px;
          margin-left: 10px;
          & .headerbar {
            font-size: 15px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(51, 51, 51, 1);
            line-height: 21px;
          }
          & .bodybar {
            margin-top: 52px;
            & .leftbarTwo {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(102, 102, 102, 1);
              line-height: 16px;
            }
            & .rightbarTwo {
              font-size: 14px;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              line-height: 12px;
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
}
</style>
