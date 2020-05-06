<!-- 会员 -->
<template>
  <div class="member">
    <div class="headerbar">
      <div class="titleLayout clearfix">
        <div class="rightIcon fr"></div>
        <div class="title">开启创业</div>
      </div>
    </div>
    <div class="vipcart"></div>
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
          <img class="headerbar" src="../../assets/img/member/a1.png" />
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
          <img class="headerbar" src="../../assets/img/member/a1.png" />
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
          <img class="headerbar" src="../../assets/img/member/a1.png" />
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
    background: #c61c1c;
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
        margin-right: 13px;
      }
    }
  }
  & .vipcart {
    margin: -20px 10px 0;
    width: 355px;
    height: 150px;
    background: linear-gradient(
      225deg,
      rgba(191, 191, 191, 1) 0%,
      rgba(115, 115, 115, 1) 100%
    );
    border-radius: 4px;
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
        .bodybar{

          font-size:14px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(51,51,51,1);
          line-height:20px;
        }
        .footerbar{
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
