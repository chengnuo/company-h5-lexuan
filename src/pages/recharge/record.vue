<template>
  <div class="recordContainer">
    <van-list v-model="loading"
              :finished="finished"
              @load="getGiftList"
              loading-text=" ">
      <div class="noRecordTip"
           v-if="showNoRecordTip">
        <img src="../../assets/img/recharge/icon_10no content_01@2x.png">
        <p>没有进货记录哦～</p>
      </div>

      <ul v-if="!showNoRecordTip">
        <li v-for="(item, index) in giftList"
            class="clearfix"
            :key="index">
          <img v-if="item.headImgUrl"
               :src="item.headImgUrl"
               class="left" />
          <img v-else
               src="../../assets/act/countyStore/people.png"
               class="left" />
          <!-- <img :src="item.headImgUrl"
               alt=""
               class="left"> -->
          <div class="center">
            <div class="name line-clamp-1">
              你 
            </div>
            <div class="dec">进货商品</div>
          </div>
          <div class="right">
            <span class="date">{{item.payDateTime}}</span>
            <em>¥{{item.price}}</em>
          </div>
        </li>
      </ul>
      <div class="loadTip" v-if="giftList.length >= 10">{{finished ? '没有更多充值记录了' : '正在加载数据中...'}}</div>
    </van-list>

  </div>
</template>

<script> 

import { List, Toast} from 'vant';
import commonJs from '@/util/common'
import { apiRechargeExListDeposit } from '@/api/recharge/index.js'

export default {
  name: 'rechargeRecord',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      giftList: [],
      userId: null,
      page: 1,
      limit: 10,
      showNoRecordTip: false//是否展示没有礼包提示
    };
  },
  created() {
    // var token = this.$route.query.token;
    // window.sessionStorage.setItem('userData', JSON.stringify({
    //   userToken: token
    // }))
    if(window.sessionStorage.getItem('userData')){
      this.userId = JSON.parse(window.sessionStorage.getItem('userData')).id;
    }
  },
  mounted() {
    this.userId = this.$route.query.userId;
    commonJs.setDocumentTitle('进货记录');
  },
  methods: {
    getGiftList() { 
      var json = {
        page: this.page,
        limit: this.limit,
        busyType: '02',
        tradeCode: '02',
      }
      apiRechargeExListDeposit(json).then((res) => {

        if (res.code == 10000) {
          var data = res.data.items;

          //第一次加载没有数据就提示没有图案
          if (this.page == 1 && data.length <= 0) this.showNoRecordTip = true;

          if (data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              this.giftList.push(data[i]);
            }
          } else {
            this.finished = true;
          }
          // 加载状态结束
          this.loading = false;

          this.page++

        } else {
          // 加载状态结束
          this.loading = false;
          Toast.fail(res.msg);
        }
      })
    }
  }
}

</script>

<style lang="less">
.recordContainer {
  width: 100%;
  min-height: 100%;
  background: #fff;
  position: absolute;
  left: 0;
  top: 0;
  .noRecordTip {
    margin-top: 90px;
    img {
      width: 130px;
      height: 130px;
      display: block;
      margin: 0 auto;
    }
    p {
      height: 18px;
      font-size: 13px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 18px;
      text-align: center;
    }
  }
  ul {
    padding: 20px 15px;
    padding-bottom: 0;
    min-height: 100%;
    li {
      min-height: 42px;
      padding: 18px 15px 18px 10px;
      background:rgba(244,255,255,1);
      border-radius: 5px;
      margin-bottom: 10px;
      .left {
        width: 30px;
        height: 30px;
        float: left;
        border-radius: 50%;
        margin-top: 6px;
        margin-right: 10px;
        object-fit: cover;
      }
      .center {
        float: left;
        .name {
          max-width: 170px;
          height: 18px;
          font-size: 14px;
          color: rgba(51, 51, 51, 1);
          line-height: 18px;
          margin-bottom: 6px;
        }
        .dec {
          max-width: 170px;
          // height:18px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 18px;
        }
      }
      .right {
        float: right;
        .date {
          height: 14px;
          font-size: 10px;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 14px;
          margin-bottom: 8px;
          display: block;
        }
        em {
          height: 18px;
          font-size: 14px;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 18px;
          display: block;
          text-align: right;
        }
      }
    }
  }
  .loadTip {
    margin: 10px 20px;
    text-align: center;
    height: 40px;
    padding-bottom: 10px;
    line-height: 40px;
    font-size: 14px;
    position: relative;
    z-index: 12;
    color: #999;
  }
  .line-clamp-1 {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: normal !important;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
}
</style>  
