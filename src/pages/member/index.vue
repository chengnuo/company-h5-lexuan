<!-- 会员 -->
<template>
  <div class="member">
    <div class="headerbar">
      <div class="titleLayout clearfix">
        <div class="rightIcon fr"></div>
        <div class="title">开启创业</div>
      </div>
      <div class="userInfoLayout">
        <div class="userInfo clearfix fl">
          <div class="leftbar fl">
            <div class="img">
              <img v-if="userData.headImgUrl"
                   :src="userData.headImgUrl"
                   alt="">
              <img v-else
                   src="../../assets/img/home/head portrait_02@2x.png"
                   alt="">
            </div>
          </div>
          <div class="rightbar  fl">
            <div class="name">萧十一郎</div>
            <div class="ptlevel">乐选团长</div>
          </div>
        </div>

        <div class="temporaryAccount fr">
          <div class="name">临时账户(元)</div>
          <div class="number">275.25</div>
        </div>

      </div>
    </div>
    <div class="vipcart">
      <img class="img"
           src="../../assets/img/member/icon_bg_03@2x.png" />
    </div>
    <div class="openNow">
      立即开通
    </div>

    <div class="membershipInterestsLayout">
      <div class="membershipInterests clearfix">
        <div class="icon fl"></div>
        <div class="title fl">会员权益</div>
      </div>
      <div class="line"></div>
      <div class="items clearfix">
        <div class="item"><img src="../../assets/img/member/1.png" /></div>
        <div class="item"><img src="../../assets/img/member/2.png" /></div>
        <div class="item"><img src="../../assets/img/member/3.png" /></div>
        <div class="item"><img src="../../assets/img/member/4.png" /></div>
        <div class="item"><img src="../../assets/img/member/5.png" /></div>
        <div class="item"><img src="../../assets/img/member/6.png" /></div>
        <div class="item"><img src="../../assets/img/member/7.png" /></div>
        <div class="item"><img src="../../assets/img/member/8.png" /></div>
        <div class="item"><img src="../../assets/img/member/9.png" /></div>
      </div>
    </div>

    <div class="VIPExclusivePurchaseLayout">
      <div class="VIPExclusivePurchase clearfix">
        <div class="icon fl"></div>
        <div class="title fl">会员权益</div>
        <div class="more fr">查看更多></div>
      </div>
      <div class="line"></div>

      <div class="items clearfix">
        <div class="item">
          <img class="headerbar"
               src="../../assets/img/member/a1.png" />
          <div class="bodybar">不老日记深层清洁泡ol面膜哈哈面膜100ml</div>
          <div class="footerbar">
            <div class="price">
              <span class="symbol1">￥</span>
              <span class="number1">399</span>
              <span class="symbol2">￥</span>
              <span class="number2">499</span>
            </div>
          </div>
        </div>

        <div class="item">
          <img class="headerbar"
               src="../../assets/img/member/a1.png" />
          <div class="bodybar">不老日记深层清洁泡ol面膜哈哈面膜100ml</div>
          <div class="footerbar">
            <div class="price">
              <span class="symbol1">￥</span>
              <span class="number1">399</span>
              <span class="symbol2">￥</span>
              <span class="number2">499</span>
            </div>
          </div>
        </div>

        <div class="item">
          <img class="headerbar"
               src="../../assets/img/member/a1.png" />
          <div class="bodybar">不老日记深层清洁泡ol面膜哈哈面膜100ml</div>
          <div class="footerbar">
            <div class="price">
              <span class="symbol1">￥</span>
              <span class="number1">399</span>
              <span class="symbol2">￥</span>
              <span class="number2">499</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <bottomBanner :index="2" />
  </div>
</template>

<script> 
import commonJs from '@/util/common'
import bottomBanner from '@/components/bottomBanner';

export default {
  name: 'Member',
  components: {
    bottomBanner,
  },
  data() {
    return {
      purchaseQuantity: 0,
      userData: {},
    }
  },
  mounted() {

  },
  methods: {
    changePurchaseQuantity() { },
  },

}
</script>

<style  lang="less">
.member {
  background: rgba(240, 245, 249, 1);
  margin-bottom: 100px;

  & .headerbar {
    width: 375px;
    height: 200px;
    // background: #c61c1c;
    background: url(../../assets/img/member/bg_100@2x.png) no-repeat;
    background-size: 100% 100%;
    & .titleLayout {
      padding-top: 30px;
      text-align: center;
      & .title {
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 25px;
      }
      & .rightIcon {
        width: 22px;
        height: 22px;
        background: rgba(255, 255, 255, 1);
        // margin-right: 13px;
        position: absolute;
        right: 13px;
      }
    }
    & .userInfoLayout {
      margin-top: 19px;
      & .userInfo {
        width: 140px;
        margin-left: 20px;
        & .leftbar {
          & .img {
            width: 56px;
            height: 56px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        & .rightbar {
          margin-left: 10px;
          margin-top: 8px;
          & .name {
            font-size: 16px;
            font-family: PingFangSC-Medium, PingFang SC;
            font-weight: 500;
            color: rgba(255, 255, 255, 1);
            line-height: 18px;
          }
          & .ptlevel {
            height: 10px;
            line-height: 10px;
            background: rgba(255, 237, 199, 1);
            border: 1px solid rgba(192, 176, 140, 1);
            padding: 3px 6px;
            font-size: 10px;
            border-radius: 10px;
            color: #ae7637;
            text-align: center;
            margin-top: 5px;
          }
        }
      }
      & .temporaryAccount {
        width: 80px;
        height: 36px;
        border-radius: 4px;
        border: 1px solid rgba(255, 133, 133, 1);
        margin-right: 20px;
        padding: 10px;
        & .name {
          font-size: 10px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(255, 255, 255, 1);
          line-height: 14px;
        }
        & .number {
          font-size: 20px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 20px;
          margin-top: 2px;
        }
      }
    }
  }
  & .vipcart {
    margin: -60px 10px 0;
    width: 355px;
    height: 150px;
    background: linear-gradient(
      225deg,
      rgba(191, 191, 191, 1) 0%,
      rgba(115, 115, 115, 1) 100%
    );
    border-radius: 4px;
    & .img {
      width: 355px;
      height: 150px;
      & img {
        width: 100%;
        height: 100%;
      }
    }
  }
  & .openNow {
    width: 305px;
    height: 40px;
    line-height: 40px;
    background: linear-gradient(
      45deg,
      rgba(237, 73, 73, 1) 0%,
      rgba(198, 28, 28, 1) 100%
    );
    border-radius: 20px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin: -20px auto 0;
    text-align: center;
    font-size: 15px;
    font-family: PingFang-SC-Bold, PingFang-SC;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    position: relative;
    z-index: 1;
  }
  & .membershipInterestsLayout {
    width: 355px;
    height: 460px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    margin: 10px 10px 10px 10px;
    & .membershipInterests {
      & .icon {
        width: 4px;
        height: 16px;
        background: linear-gradient(
          42deg,
          rgba(207, 156, 86, 1) 0%,
          rgba(235, 201, 151, 1) 100%
        );
        box-shadow: 0px 7px 7px -6px rgba(0, 0, 0, 0.3);
        margin: 20px 5px 20px 13px;
      }
      & .title {
        font-size: 16px;
        font-family: PingFang-SC-Heavy, PingFang-SC;
        font-weight: 800;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        margin: 17px 0 0 0;
      }
    }
    & .line {
      width: 315px;
      height: 1px;
      background: rgba(242, 242, 242, 1);
      margin: 0 auto;
    }

    & .items {
      margin-top: 20px;
      .item {
        width: 90px;
        height: 110px;
        float: left;
        margin-left: 20px;
        margin-top: 10px;
        text-align: center;
        img {
          // width: 100%;
          height: 100%;
          display: inline-block;
        }
      }
    }
  }

  & .VIPExclusivePurchaseLayout {
    width: 355px;
    // height: 460px;
    background: rgba(255, 255, 255, 1);
    border-radius: 4px;
    margin: 10px 10px 10px 10px;
    & .VIPExclusivePurchase {
      & .icon {
        width: 4px;
        height: 16px;
        background: linear-gradient(
          42deg,
          rgba(207, 156, 86, 1) 0%,
          rgba(235, 201, 151, 1) 100%
        );
        box-shadow: 0px 7px 7px -6px rgba(0, 0, 0, 0.3);
        margin: 20px 5px 20px 13px;
      }
      & .title {
        font-size: 16px;
        font-family: PingFang-SC-Heavy, PingFang-SC;
        font-weight: 800;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        margin: 17px 0 0 0;
      }
      & .more {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 17px;
        margin-top: 22px;
        margin-right: 20px;
      }
    }
    & .line {
      width: 315px;
      height: 1px;
      background: rgba(242, 242, 242, 1);
      margin: 0 auto;
    }

    & .items {
      margin-top: 20px;
      .item {
        width: 50%;
        float: left;
        padding: 20px 15px;
        box-sizing: border-box;
        .headerbar {
          width: 150px;
          height: 150px;
          background: rgba(247, 247, 247, 1);
          border-radius: 4px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .bodybar {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 20px;
        }
        .footerbar {
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
