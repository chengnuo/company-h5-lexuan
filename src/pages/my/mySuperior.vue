<!-- 我的上级 -->
<template>
  <div class="mySuperior">
    <!-- <div class="bg"></div> -->
    <!-- 可以升级 -->
    <div>
      <div class="userInfoLayout">
        <div class="userInfo clearfix fl">
          <div class="leftbar fl">
            <div class="img">
              <img v-if="userData.headImgUrl"
                  :src="userData.headImgUrl"
                  alt="">
              <img v-else
                  src="../../assets/img/home/head portrait_02@2x.png"
                  alt="">
            </div>
          </div>
          <div class="rightbar  fl">
            <div>
              <div class="name">萧十一郎</div>
              <div class="ptlevel">联创</div>
            </div>
            <div class="invitecode">
              邀请码：274832
            </div>
          </div>
        </div>
      </div>

      <div class="mySuperiorTitle">
        联系方式
      </div>
      <div class="contactInformation">
        <div class="item">
          <div class="leftbar fl">18967542365</div>
          <div class="rightbar fr"></div>
        </div>
      </div>
      <div class="mySuperiorTitle">
        微信名片
      </div>
      <div class="wechatBusinessCard">
        <div class="qrcode">
          <img class="img"
              src="../../assets/img/home/banner.jpg" />
        </div>
        <div class="description">扫一扫上面的二维码图案，加我微信</div>
      </div>
    </div>
    <!-- 你已经是最高级别 -->
    <!-- <div class="highestLevel">
      <div class="highestLevelBg">
        <img class="img"
              src="../../assets/img/home/banner.jpg" />
      </div>
      <div class="description">你已经是最高级别</div>
    </div> -->
  </div>
</template>
<script >
import { Toast } from 'vant';

import commonJs from '@/util/common'
import { apiShopMobileMsgNotifyList } from '@/api/my'


export default {
  name: 'MySuperior',
  data() {
    return {
      userData: {},
    }
  },
  mounted() {


  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.mySuperior {
  .bg {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
  & .mySuperiorTitle {
    padding: 15px 15px 10px 15px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
  }
  & .userInfoLayout {
    width: 375px;
    height: 97px;
    background: rgba(255, 255, 255, 1);
    & .userInfo {
      margin: 20px 15px 21px 15px;
      & .leftbar {
        & .img {
          width: 56px;
          height: 56px;
          img {
            width: 100%;
            height: 100%;
            border-radius: 100%;
          }
        }
      }
      & .rightbar {
        margin-left: 10px;
        margin-top: 8px;
        & .name {
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 18px;
          display: inline-block;
        }
        & .ptlevel {
          height: 10px;
          line-height: 10px;
          background: rgba(255, 237, 199, 1);
          border: 1px solid rgba(192, 176, 140, 1);
          padding: 3px 6px;
          font-size: 10px;
          border-radius: 10px;
          color: #ae7637;
          text-align: center;
          margin-top: 5px;
          display: inline-block;
          margin-left: 10px;
        }
        & .invitecode {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 17px;
          margin-top: 5px;
        }
      }
    }
    & .temporaryAccount {
      width: 80px;
      height: 36px;
      border-radius: 4px;
      border: 1px solid rgba(255, 133, 133, 1);
      margin-right: 20px;
      padding: 10px;
      & .name {
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 14px;
      }
      & .number {
        font-size: 20px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
        line-height: 20px;
        margin-top: 2px;
      }
    }
  }
  & .contactInformation {
    width: 375px;
    height: 46px;
    background: rgba(255, 255, 255, 1);
    & .item {
      padding: 15px;
      & .leftbar {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
        line-height: 16px;
      }
      & .rightbar {
        width: 20px;
        height: 21px;
        background: linear-gradient(
          45deg,
          rgba(230, 0, 23, 1) 0%,
          rgba(204, 0, 20, 1) 100%
        );
      }
    }
  }
  & .wechatBusinessCard {
    background: #fff;
    padding: 40px 25px;
    & .qrcode {
      width: 244px;
      height: 244px;
      margin: 0 auto;
      & .img {
        width: 100%;
        height: 100%;
      }
    }
    & .description {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
      margin-top: 25px;
      text-align: center;
    }
  }
  & .highestLevel {
    background: #fff;
    padding: 130px 20px;
    & .highestLevelBg {
      width:200px;
      height:200px;
      background:rgba(216,216,216,1);
      margin: 0 auto;
      & .img {
        width: 100%;
        height: 100%;
      }
    }
    & .description {
      font-size:16px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:22px;
      margin-top: 25px;
      text-align: center;
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