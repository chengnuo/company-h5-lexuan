<!--  广告位 -->
<template>
  <div class="customAdvertisingSpace">
    <!-- <div class="bg"></div> -->
    <div class="customAdvertisingSpaceLayout">
      <div class="typeOne marginTop10"
           v-if="displayType==0">
        <div class="items">
          <div class="item">
            <img class="img"
                 src="../assets/img/home/banner.jpg" />
          </div>
        </div>
      </div>
      <div class="typeTwo"
           v-if="displayType==1">
        <div class="items clearfix">
          <div class="item fl">
            <img class="img"
                 src="../assets/img/home/banner.jpg" />
          </div>
          <div class="item fl">
            <img class="img"
                 src="../assets/img/home/banner.jpg" />
          </div>
        </div>
      </div>
      <div class="typeThree marginTop10"
           v-if="displayType==2">
        <div class="items">
          <div class="item">1行3个</div>
          <div class="item">1行3个</div>
          <div class="item">1行3个</div>
          <div class="item">1行3个</div>
        </div>
      </div>
      <div class="typeFour marginTop10"
           v-if="displayType==3">
        <div class="items">
          <div class="item">1行4个</div>
          <div class="item">1行4个</div>
          <div class="item">1行4个</div>
          <div class="item">1行4个</div>
        </div>
      </div>
      <div class="typeFive"
           v-if="displayType==4">
        <div class="items clearfix">
          <div class="item fl">
            <img class="img"
                 src="../assets/img/home/banner.jpg" />
          </div>
          <div class="item fl">
            <img class="img"
                 src="../assets/img/home/banner.jpg" />
          </div>
          <div class="item fl">
            <img class="img"
                 src="../assets/img/home/banner.jpg" />
          </div>
          <div class="item fl">
            <img class="img"
                 src="../assets/img/home/banner.jpg" />
          </div>
        </div>
      </div>
      <div class="typeSix"
           v-if="displayType==5">
        <div class="items clearfix">
          <div class="leftbar fl">
            <div class="item">
              <img class="img"
                   src="../assets/img/home/banner.jpg" />
            </div>
          </div>
          <div class="rightbar fl">
            <div class="item">
              <img class="img"
                   src="../assets/img/home/banner.jpg" />
            </div>
            <div class="item">
              <img class="img"
                   src="../assets/img/home/banner.jpg" />
            </div>
          </div>
        </div>
      </div>

      <div class="typeSeven marginTop10"
           v-if="displayType==6">
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

      <div class="typeEight marginTop10"
           v-if="displayType==7">
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
import { apiShopMobileMsgNotifyList } from '@/api/my'


export default {
  name: 'CustomAdvertisingSpace',
  props: {
    displayType: {
      type: Number,
      default: () => {
        return 0
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
    onLoad() {
      this.apiShopMobileMsgNotifyList();
    },
    apiShopMobileMsgNotifyList() {
      const data = Object.assign({}, this.filterData, {

      })
      apiShopMobileMsgNotifyList(data).then(res => {
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
      }).catch(error => {
        console.log('error', error)
        Toast.fail(error)
      })
    },
  }
}
</script>
<style lang="less" scoped>
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
  .marginTop10 {
    margin-top: 10px;
  }
  .typeOne {
    color: #fff;
    & .items {
      display: flex;
      flex-wrap: wrap;
      & .item {
        // width: 375px;
        height: 160px;
        background: #111;
        flex: 1;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        // border: 0.5px solid #c00;
        box-sizing: border-box;
        overflow: hidden;

        & .img {
          width: 355px;
          // height: 160px;
          & img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .typeTwo {
    color: #fff;
    & .items {
      & .item {
        width: 172px;
        background: #222;
        overflow: hidden;
        box-sizing: border-box;
        & .img {
          width: 172px;
          height: 80px;
          & img {
            width: 100%;
            height: 100%;
          }
        }
      }
      & .item:nth-of-type(2n) {
        margin-left: 11px;
      }
    }
  }
  .typeThree {
    color: #fff;
    & .items {
      display: flex;
      flex-wrap: wrap;
      & .item {
        height: 150px;
        background: #333;
        flex: 1;
        width: 33.3%;
        min-width: 33.3%;
        max-width: 33.3%;
        border: 0.5px solid #c00;
        box-sizing: border-box;
        & .img {
          width: 355px;
          // height: 160px;
          & img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .typeFour {
    color: #fff;
    & .items {
      display: flex;
      flex-wrap: wrap;
      & .item {
        height: 150px;
        background: #444;
        flex: 1;
        width: 25%;
        min-width: 25%;
        max-width: 25%;
        border: 0.5px solid #c00;
        box-sizing: border-box;
        & .img {
          width: 355px;
          // height: 160px;
          & img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
  .typeFive {
    color: #fff;
    & .items {
      & .item {
        width: 172px;
        background: #555;
        box-sizing: border-box;
        margin-top: 10px;
        & .img {
          width: 172px;
          height: 80px;
          background: rgba(230, 230, 255, 1);
          border-radius: 4px;
          & img {
            width: 100%;
            height: 100%;
          }
        }
      }
      & .item:nth-of-type(2n) {
        margin-left: 11px;
      }
    }
  }
  .typeSix {
    color: #fff;
    & .items {
      & .leftbar {
        & .item {
          width: 170px;
          height: 170px;
          background: #666;
          // border: 0.5px solid #c00;
          box-sizing: border-box;
          & .img {
            width: 170px;
            height: 170px;
            & img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      & .rightbar {
        margin-left: 13px;
        & .item {
          width: 172px;
          height: 80px;
          background: #666;
          box-sizing: border-box;
          & .img {
            width: 172px;
            height: 80px;
            & img {
              width: 100%;
              height: 100%;
            }
          }
        }
        & .item:nth-child(n + 2) {
          margin-top: 10px;
        }
      }
    }
  }
  .typeSeven {
    color: #fff;
    & .items {
      display: flex;
      flex-wrap: wrap;
      & .headerbar {
        flex: 1;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        & .item {
          height: 187.5px;
          background: #777;
          border: 0.5px solid #c00;
          box-sizing: border-box;
          & .img {
            width: 355px;
            // height: 160px;
            & img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      & .bodybar {
        flex: 1;
        width: 100%;
        min-width: 100%;
        max-width: 100%;
        display: flex;
        flex-wrap: wrap;
        & .leftbar {
          flex: 1;
          width: 50%;
          min-width: 50%;
          max-width: 50%;
          & .item {
            height: 187.5px;
            background: #777;
            border: 0.5px solid #c00;
            box-sizing: border-box;
            & .img {
              width: 355px;
              // height: 160px;
              & img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
        & .rightbar {
          flex: 1;
          width: 50%;
          min-width: 50%;
          max-width: 50%;
          & .item {
            height: 187.5px;
            background: #777;
            border: 0.5px solid #c00;
            box-sizing: border-box;
            & .img {
              width: 355px;
              // height: 160px;
              & img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }

  .typeEight {
    color: #fff;
    & .items {
      display: flex;
      flex-wrap: wrap;
      & .leftbarOne {
        flex: 1;
        width: 50%;
        min-width: 50%;
        max-width: 50%;
        & .item {
          height: 240px;
          background: #888;
          border: 0.5px solid #c00;
          box-sizing: border-box;
          & .img {
            width: 355px;
            // height: 160px;
            & img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      & .rightbarOne {
        flex: 1;
        width: 50%;
        min-width: 50%;
        max-width: 50%;
        display: flex;
        flex-wrap: wrap;
        & .leftbarTwo {
          flex: 1;
          width: 100%;
          min-width: 100%;
          max-width: 100%;
          & .item {
            height: 120px;
            background: #888;
            border: 0.5px solid #c00;
            box-sizing: border-box;
            & .img {
              width: 355px;
              // height: 160px;
              & img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
        & .rightbarTwo {
          flex: 1;
          width: 100%;
          min-width: 100%;
          max-width: 100%;
          display: flex;
          flex-wrap: wrap;
          & .item {
            height: 120px;
            background: #888;
            border: 0.5px solid #c00;
            box-sizing: border-box;
            flex: 1;
            & .img {
              width: 355px;
              // height: 160px;
              & img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>