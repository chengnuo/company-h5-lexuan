<!-- 导航栏 -->
<template>
  <div class="customNavigationBar">
    <div class="bg"></div>
    <div class="typeOne">
      <div class="items">
        <div class="item" v-for="(item) in item.columns" :key="item.goodsId" @click="handleClickColumns(item)">
          <div class="logo">
            <img class="img" :src="item.banner" alt="" />
          </div>
          <div class="description">
            {{item.name}}
          </div>
        </div>
      </div>
    </div>

    <!-- <div class="typeTwo">
      <div class="items">
        <div class="item">
          <div class="logo">
            图标
          </div>
          <div class="description">
            名称一
          </div>
        </div>
        <div class="item">
          <div class="logo">
            图标
          </div>
          <div class="description">
            名称一
          </div>
        </div>
        <div class="item">
          <div class="logo">
            图标
          </div>
          <div class="description">
            名称一
          </div>
        </div>
        <div class="item">
          <div class="logo">
            图标
          </div>
          <div class="description">
            名称一
          </div>
        </div>
      </div>
    </div>

    <div class="typeThree">
      <div class="items">
        <div class="item">
          <div class="logo">
            图标
          </div>
          <div class="description">
            名称一
          </div>
        </div>
        <div class="item">
          <div class="logo">
            图标
          </div>
          <div class="description">
            名称一
          </div>
        </div>
        <div class="item">
          <div class="logo">
            图标
          </div>
          <div class="description">
            名称一
          </div>
        </div>
        <div class="item">
          <div class="logo">
            图标
          </div>
          <div class="description">
            名称一
          </div>
        </div>
        <div class="item">
          <div class="logo">
            图标
          </div>
          <div class="description">
            名称一
          </div>
        </div>
      </div>
    </div> -->

  </div>
</template>
<script >
import { Toast } from 'vant';

import commonJs from '@/util/common'
import {  apiShopMobileMsgNotifyList } from '@/api/my'


export default {
  name: 'CustomNavigationBar',
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
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
    // 点击的跳转
    handleClickColumns(item){
      window.location.href = `${item.turnUrl1}`
    },
  }
}
</script>
<style lang="less" scoped>
.customNavigationBar {
  & .bg {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
  .marginTop10{
    margin-top: 10px;
  }
  .typeOne{
    & .items{
      display: flex;
      flex-wrap: wrap;
      height: 100px;
      // justify-content: center;//x轴排列
      align-items: center;//y轴排列
      flex-direction: column;
      & .item{
        flex: 1;
        margin-top: 15px;
        & .logo{
          width: 50px;
          height: 50px;
          border: 0.5px solid #c00;
          & .img{
            width: 100%;
            height: 100%;
          }
        }
        & .description{
          margin-top: 7px;

          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(51,51,51,1);
          height:16.5px;
          line-height:16.5px;
          text-align: center;
        }
      }
    }
  }

  .typeTwo{
    & .items{
      display: flex;
      flex-wrap: wrap;
      height: 100px;
      // justify-content: center;//x轴排列
      align-items: center;//y轴排列
      flex-direction: column;
      & .item{
        flex: 1;
        margin-top: 15px;
        & .logo{
          width: 50px;
          height: 50px;
          border: 0.5px solid #c00;
        }
        & .description{
          margin-top: 7px;

          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(51,51,51,1);
          height:16.5px;
          line-height:16.5px;
        }
      }
    }
  }

  .typeThree{
    & .items{
      display: flex;
      flex-wrap: wrap;
      height: 100px;
      // justify-content: center;//x轴排列
      align-items: center;//y轴排列
      flex-direction: column;
      & .item{
        flex: 1;
        margin-top: 15px;
        & .logo{
          width: 50px;
          height: 50px;
          border: 0.5px solid #c00;
        }
        & .description{
          margin-top: 7px;

          font-size:12px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(51,51,51,1);
          height:16.5px;
          line-height:16.5px;
        }
      }
    }
  }
}
</style>