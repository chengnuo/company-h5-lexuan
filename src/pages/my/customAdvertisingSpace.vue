<!--  广告位 -->
<template>
  <div class="customAdvertisingSpace">
    <div class="bg"></div>
    <div class="customAdvertisingSpaceLayout">
      <div class="typeOne marginTop10">
        <div class="items">
          <div class="item">1行1个</div>
        </div>
      </div>
      <div class="typeTwo marginTop10">
        <div class="items">
          <div class="item">1行2个</div>
          <div class="item">1行2个</div>
          <div class="item">1行2个</div>
          <div class="item">1行2个</div>
        </div>
      </div>
      <div class="typeThree marginTop10">
        <div class="items">
          <div class="item">1行3个</div>
          <div class="item">1行3个</div>
          <div class="item">1行3个</div>
          <div class="item">1行3个</div>
        </div>
      </div>
      <div class="typeFour marginTop10">
        <div class="items">
          <div class="item">1行4个</div>
          <div class="item">1行4个</div>
          <div class="item">1行4个</div>
          <div class="item">1行4个</div>
        </div>
      </div>
      <div class="typeFive marginTop10">
        <div class="items">
          <div class="item">2左2右</div>
          <div class="item">2左2右</div>
          <div class="item">2左2右</div>
          <div class="item">2左2右</div>
        </div>
      </div>
      <div class="typeSix marginTop10">
        <div class="items">
          <div class="leftbar">
            <div class="item">1左2右</div>
          </div>
          <div class="rightbar">
            <div class="item">1左2右</div>
            <div class="item">1左2右</div>
          </div>
        </div>
      </div>

      <div class="typeSeven marginTop10">
        <div class="items">
          <div class="headerbar">
            <div class="item">1上2下</div>
          </div>
          <div class="bodybar">
            <div class="leftbar">
              <div class="item">1上2下</div>
            </div>
            <div class="rightbar">
              <div class="item">1上2下</div>
            </div>
          </div>
        </div>
      </div>

      <div class="typeEight marginTop10">
        <div class="items">
          <div class="leftbarOne">
            <div class="item">1左3右</div>
          </div>
          <div class="rightbarOne">
            <div class="leftbarTwo">
              <div class="item">1左3右</div>
            </div>
            <div class="rightbarTwo">
              <div class="item">1左3右</div>
              <div class="item">1左3右</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
import { Toast } from 'vant';

import commonJs from '@/util/common'
import {  apiShopMobileMsgNotifyList } from '@/api/my'


export default {
  name: 'CustomAdvertisingSpace',
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
.customAdvertisingSpace {
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
  .typeOne{
    color: #fff;
    & .items{
      display: flex;
      flex-wrap: wrap;
      & .item{
        // width: 375px;
        height: 150px;
        background: #111;
        flex: 1;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        border: 0.5px solid #c00;
        box-sizing: border-box;
      }
    }
  }
  .typeTwo{
    color: #fff;
    & .items{
      display: flex;
      flex-wrap: wrap;
      & .item{
        height: 150px;
        background: #222;
        flex: 1;
        width: 50%;
        min-width: 50%;
        max-width: 50%;
        border: 0.5px solid #c00;
        box-sizing: border-box;
      }
    }
  }
  .typeThree{
    color: #fff;
    & .items{
      display: flex;
      flex-wrap: wrap;
      & .item{
        height: 150px;
        background: #333;
        flex: 1;
        width: 33.3%;
        min-width: 33.3%;
        max-width: 33.3%;
        border: 0.5px solid #c00;
        box-sizing: border-box;
      }
    }
  }
  .typeFour{
    color: #fff;
    & .items{
      display: flex;
      flex-wrap: wrap;
      & .item{
        height: 150px;
        background: #444;
        flex: 1;
        width: 25%;
        min-width: 25%;
        max-width: 25%;
        border: 0.5px solid #c00;
        box-sizing: border-box;
      }
    }
  }
  .typeFive{
    color: #fff;
    & .items{
      display: flex;
      flex-wrap: wrap;
      & .item{
        height: 150px;
        background: #555;
        flex: 1;
        width: 50%;
        min-width: 50%;
        max-width: 50%;
        border: 0.5px solid #c00;
        box-sizing: border-box;
      }
    }
  }
  .typeSix{
    color: #fff;
    & .items{
      display: flex;
      flex-wrap: wrap;
      & .leftbar{
        flex: 1;
        width: 50%;
        min-width: 50%;
        max-width: 50%;
        & .item{
          height: 240px;
          background: #666;
          border: 0.5px solid #c00;
          box-sizing: border-box;
        }
      }
      & .rightbar{
        flex: 1;
        width: 50%;
        min-width: 50%;
        max-width: 50%;
        & .item{
          height: 120px;
          background: #666;
          border: 0.5px solid #c00;
          box-sizing: border-box;
        }
      }
      
    }
  }
  .typeSeven{
    color: #fff;
    & .items{
      display: flex;
      flex-wrap: wrap;
      & .headerbar{
        flex: 1;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        & .item{
          height: 187.5px;
          background: #777;
          border: 0.5px solid #c00;
          box-sizing: border-box;
        }
      }
      & .bodybar{
        flex: 1;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        display: flex;
        flex-wrap: wrap;
        & .leftbar{
          flex: 1;
          width: 50%;
          min-width: 50%;
          max-width: 50%;
          & .item{
            height: 187.5px;
            background: #777;
            border: 0.5px solid #c00;
            box-sizing: border-box;
          }
        }
        & .rightbar{
          flex: 1;
          width: 50%;
          min-width: 50%;
          max-width: 50%;
          & .item{
            height: 187.5px;
            background: #777;
            border: 0.5px solid #c00;
            box-sizing: border-box;
          }
        }
      }
      
    }
  }

  .typeEight{
    color: #fff;
    & .items{
      display: flex;
      flex-wrap: wrap;
      & .leftbarOne{
        flex: 1;
        width: 50%;
        min-width: 50%;
        max-width: 50%;
        & .item{
          height: 240px;
          background: #888;
          border: 0.5px solid #c00;
          box-sizing: border-box;
        }
      }
      & .rightbarOne{
        flex: 1;
        width: 50%;
        min-width: 50%;
        max-width: 50%;
        display: flex;
        flex-wrap: wrap;
        & .leftbarTwo{
          flex: 1;
          width: 100%;
          min-width: 100%;
          max-width: 100%;
          & .item{
            height: 120px;
            background: #888;
            border: 0.5px solid #c00;
            box-sizing: border-box;
          }
        }
        & .rightbarTwo{
          flex: 1;
          width: 100%;
          min-width: 100%;
          max-width: 100%;
          display: flex;
          flex-wrap: wrap;
          & .item{
            height: 120px;
            background: #888;
            border: 0.5px solid #c00;
            box-sizing: border-box;
            flex: 1;
          }
        }
      }
      
    }
  }
}
</style>