<!-- 辅助线 -->
<template>
  <div class="customAuxiliaryLine">
    <!-- <div class="bg"></div> -->
    <div class="line" :style="[{'height':`${item.hight}` }]" >
    </div>
  </div>
</template>
<script >
import { Toast } from 'vant';

import commonJs from '@/util/common'
import {  apiShopMobileMsgNotifyList } from '@/api/my'


export default {
  name: 'CustomAuxiliaryLine',
  props:{
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
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
.customAuxiliaryLine {
  .bg {
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
  .line{
    height: 1px;
    margin: 10px 0;
    background: #c00;
  }
  
  
}
</style>