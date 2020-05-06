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
    font-size:15px;
    font-family:PingFang-SC-Bold,PingFang-SC;
    font-weight:bold;
    color:rgba(255,255,255,1);
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
