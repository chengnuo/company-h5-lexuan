<!-- 通知 -->
<template>
  <div class="notice">
    <div class="bg"></div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="list clearfix" v-for="(item, index) in noticeList" :key="index">
        <div class="leftbar">
          <img class="img"
              :src="item.logo" v-if="item.logo" />
          <img class="img"
                v-else
              src="../../assets/img/my/87@2x.png" />
        </div>
        <div class="rightbar">
          <div class="headerbar clearfix">
            <div class="leftbar">{{item.title}}</div>
            <div class="rightbar">{{item.howLongTime}}</div>
          </div>
          <div class="bodybar">
            {{item.content}}
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>
<script >
import { Toast } from 'vant';

import commonJs from '@/util/common'
import {  apiShopMobileMsgNotifyList } from '@/api/my'


export default {
  name: 'Notice',
  data() {
    return {
      noticeList: [],
      filterData: {
        page: 1,
        limit: 20,
      },
      loading: false,
      finished: false
    }
  },
  mounted() {
    
    commonJs.outSideShare();
    // this.apiShopMobileMsgNotifyList();
  },
  methods: {
    onLoad(){
      this.apiShopMobileMsgNotifyList();
    },
    apiShopMobileMsgNotifyList(){
      const data = Object.assign({}, this.filterData,{

      })
      apiShopMobileMsgNotifyList(data).then(res=>{
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
      }).catch(error=>{
        console.log('error', error)
        Toast.fail(error)
      })
    },
  }
}
</script>
<style lang="less" scoped>
.notice {
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