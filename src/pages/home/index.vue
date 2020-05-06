<template>
  <div class="home">
    <div class="header">
      <div class="search clearfix">
        <div class="leftbar fl">
          <input v-model="search"
                 placeholder="请输入您要搜索的商品" />
        </div>
        <div class="rightbar fl"></div>
      </div>

      <div class="nav clearfix">
        <div class="items">
          <div class="item active">热销</div>
          <div class="item">面膜</div>
          <div class="item">美肤</div>
          <div class="item">周边</div>
        </div>

      </div>

    </div>

    <div class="banner">
      <customAdvertisingSpace />
    </div>
    <div class="nav">
      <customNavigationBar />
    </div>
    <div class="limitedTime">
      <customLimitedTime />
    </div>
  </div>
</template>
<script >
import { Toast, Swipe, SwipeItem } from 'vant';
import commonJs from '@/util/common';
import { Dialog } from 'vant';

import customAdvertisingSpace from '@/components/customAdvertisingSpace';
import customNavigationBar from '@/components/customNavigationBar';
import customLimitedTime from '@/components/customLimitedTime';



export default {
  name: 'Home',
  data() {
    return {
      search: '',
    }
  },
  components: {
    customAdvertisingSpace,
    customNavigationBar,
    customLimitedTime
  },
  mounted() {

  },
  methods: {

  },
}
</script>
<style lang="less" scoped>
.home {
  background: #fff;
  .header {
    padding-top: 10px;
    width: 375px;
    height: 200px;
    background: #c61c1c;

    & .search {
      & .leftbar {
        width: 270px;
        height: 20px;
        padding: 4px 20px;
        background: rgba(255, 255, 255, 1);
        border-radius: 20px;
        opacity: 0.8;
        margin-left: 15px;
        margin-right: 14px;
      }
      & .rightbar {
        width: 24px;
        height: 20px;
        background: rgba(255, 255, 255, 1);
        margin-top: 4px;
      }
    }
    & .nav {
      & .items {
        margin-top: 24px;
        margin-left: 20px;
        & .item.active {
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(255, 255, 255, 1);
          line-height: 18px;

          border-bottom: 2px solid #fff;
          padding-bottom: 8px;
        }
        & .item {
          float: left;
          margin-right: 20px;

          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(254, 205, 205, 1);
          line-height: 18px;
        }
      }
    }
  }
  .banner {
    width: 355px;
    height: 160px;
    padding: 0 10px;
    margin-top: -100px;
  }
  .nav {
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