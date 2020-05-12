<template>
  <div>
    <div class="headerBg"></div>
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

      <div v-for="(item) in homeIndex.templates" :key="item.indexs">
        <div class="banner" v-if="item.templateType==1">
          <customAdvertisingSpace :item="item" />
        </div>
        <div class="nav" v-if="item.templateType==0">
          <customNavigationBar :item="item" />
        </div>
        <div class="limitedTime" v-if="item.templateType==3">
          <customLimitedTime :item="item" />
        </div>
        <div v-if="item.templateType==5">
          <customAuxiliaryBlank :item="item"  />
        </div>
        <div v-if="item.templateType==4">
          <customAuxiliaryLine :item="item"  />
        </div>
      </div>


      <bottomBanner :index="1"></bottomBanner>

      
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
import customAuxiliaryBlank from '@/components/customAuxiliaryBlank';
import customAuxiliaryLine from '@/components/customAuxiliaryLine';
import bottomBanner from '@/components/bottomBanner';



export default {
  name: 'Home',
  data() {
    return {
      search: '',
      homeIndex: {
        templates: [],
      },
    }
  },
  components: {
    customAdvertisingSpace,
    customNavigationBar,
    customLimitedTime,
    bottomBanner,
    customAuxiliaryBlank,
    customAuxiliaryLine,
  },
  mounted() {
    this.init();
  },
  methods: {
    init(){
      this.apiIndex();
    },
    apiIndex() {
      let res = {
        "msg": "成功",
        "code": 10000,
        "data": {
          "id": 413,
          "status": 1,
          "pageType": 0,
          "updateTime": "2020-05-07 15:58:24",
          "templates": [
            {
              "templateType": 0,
              "displayType": 0,
              "columns": [
                {
                  "goodsId": "1",
                  "name": "名称1",
                  "banner": "http://thirdwx.qlogo.cn/mmopen/vi_32/GyyZ9gHrjhnSBuPa4pX4ibib6yB0zk4DHjysibwUrpYmCptDL9RmSgibKEkln3wSLG0ficH8MyZ8LyqHmnAOrib6eLyQ/132",
                  "turnUrl1": "http://baidu.com/"
                },
                {
                  "goodsId": "2",
                  "name": "名称2",
                  "banner": "http://thirdwx.qlogo.cn/mmopen/vi_32/GyyZ9gHrjhnSBuPa4pX4ibib6yB0zk4DHjysibwUrpYmCptDL9RmSgibKEkln3wSLG0ficH8MyZ8LyqHmnAOrib6eLyQ/132",
                  "turnUrl1": "http://thirdwx.qlogo.cn/mmopen/vi_32/GyyZ9gHrjhnSBuPa4pX4ibib6yB0zk4DHjysibwUrpYmCptDL9RmSgibKEkln3wSLG0ficH8MyZ8LyqHmnAOrib6eLyQ/132"
                }
              ],
              "indexs": 0,
              "isDisplayBorder": 1,
              "bgBanner": "http://thirdwx.qlogo.cn/mmopen/vi_32/GyyZ9gHrjhnSBuPa4pX4ibib6yB0zk4DHjysibwUrpYmCptDL9RmSgibKEkln3wSLG0ficH8MyZ8LyqHmnAOrib6eLyQ/132"
            },
            {
              "templateType": 1,
              "ads": [
                {
                  "turnUrl": "http://thirdwx.qlogo.cn/mmopen/vi_32/GyyZ9gHrjhnSBuPa4pX4ibib6yB0zk4DHjysibwUrpYmCptDL9RmSgibKEkln3wSLG0ficH8MyZ8LyqHmnAOrib6eLyQ/132",
                  "turnType": "1",
                  "banner": "http://thirdwx.qlogo.cn/mmopen/vi_32/GyyZ9gHrjhnSBuPa4pX4ibib6yB0zk4DHjysibwUrpYmCptDL9RmSgibKEkln3wSLG0ficH8MyZ8LyqHmnAOrib6eLyQ/132",
                  "title": "标题1"
                },
                {
                  "turnUrl": "http://thirdwx.qlogo.cn/mmopen/vi_32/GyyZ9gHrjhnSBuPa4pX4ibib6yB0zk4DHjysibwUrpYmCptDL9RmSgibKEkln3wSLG0ficH8MyZ8LyqHmnAOrib6eLyQ/132",
                  "turnType": "2",
                  "banner": "http://thirdwx.qlogo.cn/mmopen/vi_32/GyyZ9gHrjhnSBuPa4pX4ibib6yB0zk4DHjysibwUrpYmCptDL9RmSgibKEkln3wSLG0ficH8MyZ8LyqHmnAOrib6eLyQ/132",
                  "title": "标题2"
                }
              ],
              "displayType": 0,
              "acrossCarousel": 0,
              "indexs": 1
            },
            {
              "templateType": 2,
              "isDisplayPrice": 0,
              "displayType": 1,
              "displayMark": 0,
              "sortType": 1,
              "isDisplayNum": 0,
              "isDisplayTitle": 0,
              "goodsCategory": 0,
              "indexs": 2,
              "displayNum": 11,
              "goodsIds": [
                "0",
                "22",
                "1"
              ],
              "goodsType": 1
            },
            {
              "templateType": 3,
              "isDisplayPrice": 0,
              "displayType": 1,
              "displayMark": 0,
              "sortType": 1,
              "isDisplayNum": 0,
              "isDisplayTitle": 0,
              "indexs": 3,
              "displayNum": 2
            },
            {
              "templateType": 4,
              "indexs": 4,
              "hight": "11px"
            },
            {
              "templateType": 5,
              "indexs": 5,
              "hight": "11px"
            }
          ]
        }
      }

      

      this.homeIndex = res.data;
      console.log('this.homeIndex',this.homeIndex)
    },
  },
}
</script>
<style lang="less" scoped>
.headerBg{
  width: 375px;
  height: 200px;
  background: #c61c1c;
  position:absolute;
  top:0;
  left: 0;
  z-index: 0;

}
.home {
  // background: #fff;
  position: relative;
  margin-bottom: 60px;
  & .header {
    padding-top: 10px;
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
  & .banner {
    width: 355px;
    height: 160px;
    padding: 0 10px;
    // margin-top: -100px;
  }
  & .nav {

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