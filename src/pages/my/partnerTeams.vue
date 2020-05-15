<!-- 团队合伙人 -->
<template>
  <div class="partnerTeams">
    <div class="bg"></div>
    <div class="headerbar">
      <div class="title">团队合伙人</div>
      <div class="teamPeople">团队人数</div>
      <div class="teamNumber">268<span>人</span></div>
    </div>

    <div class="partnerTeamsTabs">
      <van-tabs>
        <van-tab>
          <div slot="title">
            <div class="tabTitle">联创</div>
            <div class="tabNumber">(1000)</div>
          </div>
          <div class="item clearfix">
            <div class="leftbar fl clearfix">
              <img class="img fl" src="../../assets/act/countyStore/people.png" />
              <div class="name fl">心相印</div>
              <div class="tip fl">直属</div>
            </div>
            <div class="rightbar fr">
              2019-05-23
            </div>
          </div>
          <div class="item clearfix">
            <div class="leftbar fl clearfix">
              <img class="img fl" src="../../assets/act/countyStore/people.png" />
              <div class="name fl">心相印</div>
              <div class="tip fl">直属</div>
            </div>
            <div class="rightbar fr">
              2019-05-23
            </div>
          </div>
          <div class="item clearfix">
            <div class="leftbar fl clearfix">
              <img class="img fl" src="../../assets/act/countyStore/people.png" />
              <div class="name fl">心相印</div>
              <div class="tip fl">直属</div>
            </div>
            <div class="rightbar fr">
              2019-05-23
            </div>
          </div>
        </van-tab>
        <van-tab >
        
          <div slot="title">
            <div class="tabTitle">金牌</div>
            <div class="tabNumber">(1000)</div>
          </div>
        </van-tab>
        <van-tab >
          
          <div slot="title">
            <div class="tabTitle">创客</div>
            <div class="tabNumber">(1000)</div>
          </div>
        </van-tab>
        <van-tab >
          
          <div slot="title">
            <div class="tabTitle">会员</div>
            <div class="tabNumber">(1000)</div>
          </div>
        </van-tab>
        <van-tab >
          
          <div slot="title">
            <div class="tabTitle">普通</div>
            <div class="tabNumber">(1000)</div>
          </div>
        </van-tab>
      </van-tabs>
    </div>

  </div>
</template>
<script >
import { Toast } from 'vant';

import commonJs from '@/util/common'
import { apiShopMobileMsgNotifyList } from '@/api/my'


export default {
  name: 'PartnerTeams',
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {},
}
</script>
<style lang="less" scoped>
.partnerTeams {
  .bg {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
  & .headerbar {
    width: 375px;
    height: 164px;
    // position: absolute;
    // left: 0;
    // top: 0;
    background: url("../../assets/img/my/Status_Bar@2x.png") no-repeat;
    background-size: 375px 164px;
    & .title {
      height: 44px;
      line-height: 44px;
      text-align: center;
      font-size: 18px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      padding-top: 30px;
    }
    & .teamPeople {
      margin-top: 27px;
      margin-left: 20px;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 25px;
    }
    & .teamNumber {
      margin-left: 20px;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 1);
      line-height: 25px;
      & span {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 18px;
      }
    }
  }

  & .partnerTeamsTabs {
    // margin-top: 10px;
    /deep/ .van-tabs__line {
      display: none;
    }
    /deep/ .van-tab {
      background: #d8d8d8;
    }
    /deep/ .van-tab--active {
      background: #fff;
    }
    // & .tabTitle{
    //   position:absolute;
    //   left: -14px;
    //   top: -5px;
    // }
    // & .tabNumber{
    //   position:absolute;
    //   left: -14px;
    //   top: 8px;
    //   font-size: 12px;
    //   color: #A9A9A9;
    // }
    /deep/ .van-tab__text{
      width: 100%;
      line-height: 18px;
    }
    & .tabTitle{
      margin-top: 4px;
    }
    & .tabNumber{
      font-size: 12px;
      color: #A9A9A9;
    }
    & .item {
      padding: 20px 14px 10px 16px;
      & .leftbar{
        & .img{
          width: 30px;
          height: 30px;
        }
        & .name{
          margin-left: 10px;
          margin-top: 5px;
        }
        & .tip{
          margin-left: 10px;
          margin-top: 9px;


          height:12px;
          border-radius:6px;
          border:1px solid rgba(234,86,91,1);
          font-size:8px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(234,86,91,1);
          line-height:11px;
          padding: 0 5px;
        }
      }

      & .rightbar{
        font-size:12px;
        font-family:PingFangSC-Regular,PingFang SC;
        font-weight:400;
        color:rgba(153,153,153,1);
        line-height:30px;
      }
    }
  }
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
</style>