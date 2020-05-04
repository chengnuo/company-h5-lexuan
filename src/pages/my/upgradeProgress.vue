<!-- 升级进度 -->
<template>
  <div class="myUpgradeProgress">
    <div class="progressHeader">
      <div class="header clearfix">
        <div class="leftbar">普通用户</div>
        <div class="centerbar">
          <img src="../../assets/img/my/upgrade_progress_01@2x.png" />
        </div>
        <div class="rightbar">VIP</div>
      </div>
      <div class="progress clearfix">
        <div class="leftbar"></div>
        <div class="centerbar"></div>
        <div class="rightbar"></div>
      </div>
    </div>
    <div class="goodsList">
      <div class="headerbar clearfix">
        <div class="leftbar">
          一次性订购5盒
        </div>
        <div class="rightbar">
          <img class="img"
               src="../../assets/img/my/unfinished_01@2x.png" />
        </div>
      </div>
      <div class="bodybar">
        <div class="goodsListTitle">
          0
        </div>
        <div class="goodsListProgress clearfix">
          <div class="leftbar"></div>
          <div class="centerbar"></div>
          <div class="rightbar"></div>
        </div>
        <div class="goodsListFooter clearfix">
          <div class="leftbar">0</div>
          <div class="rightbar">5</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import { Toast } from 'vant';
import commonJs from '@/util/common'
export default {
  name: 'MyUpgradeProgress',
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
.myUpgradeProgress {
  .progressHeader {
    width: 375px;
    height: 140px;
    background: linear-gradient(
      225deg,
      rgba(82, 225, 176, 1) 0%,
      rgba(38, 197, 218, 1) 100%
    );
    .header {
      padding-top: 50px;
      padding-left: 58px;
      .leftbar {
        float: left;

        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 28px;
      }
      .centerbar {
        float: left;
        margin-left: 30px;
        img {
          width: 40px;
          height: 20px;
        }
      }
      .rightbar {
        float: left;
        margin-left: 44px;
        height: 28px;

        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 25, 1);
        line-height: 28px;
      }
    }
  }
  .progress {
    margin-top: 25px;
    margin-left: 24px;
    .leftbar {
      width: 13px;
      height: 13px;
      background: rgba(255, 255, 255, 1);
      border-radius: 13px;
      float: left;
      margin-top: -6px;
    }
    .centerbar {
      width: 305px;
      height: 3px;
      background: rgba(255, 255, 255, 1);
      border-radius: 3px;
      float: left;
    }
    .rightbar {
      width: 9px;
      height: 9px;
      background: rgba(255, 255, 255, 1);
      border-radius: 9px;
      float: left;
      margin-top: -4px;
    }
  }

  .goodsList {
    width: 345px;
    height: 108px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
    border-radius: 6px;
    margin-left: 15px;
    margin-top: -15px;
    .headerbar {
      padding-top: 15px;
      .leftbar {
        padding-left: 19px;
        background: url(../../assets/img/my/upgradeProgressGoodsListTtile.png)
          12px center no-repeat;
        float: left;
      }
      .rightbar {
        .img {
          width: 54px;
          height: 34px;
        }
        float: right;
        margin-top: -6px;
        margin-right: 9px;
      }
    }
    .bodybar {
      .goodsListTitle {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(188, 171, 138, 1);
        line-height: 17px;
        margin-left: 12px;
        margin-top: 20px;
      }
      .goodsListProgress {
        margin-top: 6px;
        margin-left: 12px;
        .leftbar {
          width: 13px;
          height: 13px;
          background: #bcab8a;
          border-radius: 13px;
          float: left;
          margin-top: -6px;
        }
        .centerbar {
          width: 300px;
          height: 3px;
          background: rgba(204, 204, 204, 1);
          border-radius: 3px;
          float: left;
        }
        .rightbar {
          width: 9px;
          height: 9px;
          background: #cccccc;
          border-radius: 9px;
          float: left;
          margin-top: -4px;
        }
      }
      .goodsListFooter {
        margin-top: 6px;
        .leftbar {
          float: left;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 17px;
        }
        .rightbar {
          float: right;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(204, 204, 204, 1);
          line-height: 17px;
        }
      }
    }
  }
}
</style>