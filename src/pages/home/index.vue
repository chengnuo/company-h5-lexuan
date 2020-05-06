<template>
  <div class="home">
    <div class="search clearfix">
      <div class="leftbar fl">
        <input v-model="search" placeholder="请输入您要搜索的商品" />
      </div>
      <div class="rightbar fl"></div>
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
  .search{
    padding-top: 10px;
    width:375px;
    height:200px;
    background: #C61C1C;
    & .leftbar{
      width:270px;
      height:20px;
      padding: 4px 20px;
      background:rgba(255,255,255,1);
      border-radius:20px;
      opacity:0.8;
      margin-left: 15px;
      margin-right: 14px;

    }
    & .rightbar{
      width:24px;
      height:20px;
      background:rgba(255,255,255,1);
      margin-top: 4px;
    }
  }
  .banner{
    width:355px;
    height:160px;
    padding: 0 10px;
    margin-top: -100px;
  }
  .nav{

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