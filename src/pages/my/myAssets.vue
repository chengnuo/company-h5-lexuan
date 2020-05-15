<!-- 我的资产 -->
<template>
  <div class="myAssets">
    <div class="bg"></div>
    我的资产
  </div>
</template>
<script >
import { Toast } from 'vant';

import commonJs from '@/util/common'
import {  apiShopMobileMsgNotifyList } from '@/api/my'


export default {
  name: 'MyAssets',
  data() {
    return {
      
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
  .bg {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
  .list {
    background: #fff;
    padding-left: 20px;
    padding-top: 20px;

    &>.leftbar {
      float: left;
      width: 40px;
      .img {
        width: 40px;
        height: 40px;
      }
    }
    &>.rightbar {
      float: left;
      margin-left: 10px;
      width: 300px;
      .headerbar {
        .leftbar {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
          float: left;
        }
        .rightbar {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 17px;
          margin-left: 15px;
          float: left;
          margin-top: 3px;
        }
      }
      .bodybar {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 20px;
        margin-top: 5px;
        margin-right: 10px;
      }
    }
  }
  /deep/ .van-list__finished-text{
    background: #fff;
  }
}
</style>