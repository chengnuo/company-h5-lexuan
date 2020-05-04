<template>
  <div class="indexContainer">
    <div class="banner">
      <img src="../../assets/img/index/bg_03／03@2x.png"
           alt=""
           class="bg">
      <div class="logo">
        <img src="../../assets/img/index/logo_03@2x.png"
             alt="">
        <p>乐选</p>
      </div>
    </div>
    <div class="main">
      <div @click="jumpGoodDetaile"
           class="jumpGoodDetaile">
        去购买
      </div>
      <div style="margin-top:20px;"
           @click="jumpInvitationFriend" :class="{'prevent': userData && userData.ptLevel == 0 }">
        去分享
      </div>
    </div>
<!--     <div class="actTip" v-if="countGift" @click="goCountyStore">
      <div class="title">
        <span>活动礼包(个)</span>
        <em>{{countGift.allCount}}</em>
      </div>
      <div class="bottom">
        <div class="left">
          <span>线上礼包(个)</span>
          <em>{{countGift.onLineCount}}</em>
        </div>
        <div>
          <span>线下礼包(个)</span>
          <em>{{countGift.offLineCount}}</em>
        </div>
      </div>
    </div> -->
    <bottomBanner :index="1"></bottomBanner>
  </div>
</template>
<script >
import commonJs from '@/util/common'
import { Dialog } from 'vant';
import bottomBanner from '@/components/bottomBanner';
import { Toast } from 'vant';

import { apiShopMobileIncomeBal } from '@/api/bond'
import { apiShopMobileUserInfo } from '@/api/my';
import { cartCountGift } from '@/api/act/countyStore.js'
export default {
  name: 'Index',
  data() {
    return {
      showTip: false,
      userData: null,
      countGift: null,
      shopMobileIncomeBal: {}, // 保证金余额
      shopMobileUserInfo: {}, // 基本资料
    }
  },

  mounted() {
    commonJs.outSideShare();
    let userData = JSON.parse(window.sessionStorage.getItem('userData')) || {}
    this.userData = userData;


    this.apiShopMobileIncomeBal(); // 保证金余额
    this.apiShopMobileUserInfo();  // 获取授权资料
    if(userData && userData.ptLevel>=2){
      this.apiCountGift();
    }
  },
  methods: {
    // 获取授权资料
    apiShopMobileUserInfo() {
      const data = Object.assign({}, {
        authType: 'B',
      })
      apiShopMobileUserInfo(data).then(res => {
        if (res.code.toString() === '10000') {
          this.shopMobileUserInfo = res.data;
        } else {
          Toast.fail(res.msg)
        }

      }).catch(error => {
        Toast.fail(error)
      })
    },
    apiCountGift() {
      cartCountGift({}).then(res => {
        if (res.code.toString() === '10000') {
          this.countGift = res.data;
          console.log(this.countGift)
        } else {
          Toast.fail(res.msg)
        }

      }).catch(error => {
        Toast.fail(error)
      })
    },

    // 保证金余额
    apiShopMobileIncomeBal() {
      const data = Object.assign({})
      apiShopMobileIncomeBal(data).then(res => {
        if (res.code.toString() === '10000') {
          this.shopMobileIncomeBal = res.data
        } else {
          Toast.fail(res.msg)
        }

      }).catch(error => {
        Toast.fail(error)
      })
    },
    jumpGoodDetaile() {

      this.$router.push({
        name: 'GoodDetail',
      })
    },
    // 跳转逻辑
    goCountyStore() {
      window.location.href = `${commonJs.config.prefixH5Url}/act/countyStore?token=${this.userData.userToken}`
    },

    // 跳转进邀请好友
    jumpInvitationFriend() {
      // 4、邀请好友
      // 拦截普通用户进入，进行弹窗报错；
      // VIP 县级店不做拦截
      // 代理点击邀请好友，若客户押金不足，则拦截并弹窗报错；
      // 代理点击邀请好友，若客户授权资料不完整，则弹窗报错。
      if (this.userData.ptLevel == 1) {
        this.goInvitationPoster()
      } else if (this.userData.ptLevel == 2) {
        this.goInvitationPoster()
      } else if (this.userData.ptLevel == 0) {
        return;
        Dialog.alert({
          // title: '标题',
          message: '普通用户无法使用该功能。',
          // confirmButtonText: '去升级',
        }).then(() => {
          // on confirm
          // this.$router.push({
          //   path: `download` // 跳到app
          // })
        })
      } else if (this.shopMobileIncomeBal.sctBal == 0) {
        Dialog.confirm({
          // title: '标题',
          message: '保证金不足，无法使用该功能。请交纳保证金。',
          confirmButtonText: '去交纳',
        }).then(() => {
          // on confirm
          this.$router.push({
            path: `/bond/price` // 交纳保证金
          })
        }).catch(() => {
          // on cancel
        });
      } else if (this.shopMobileUserInfo.authStatus == 2) {
        Dialog.confirm({
          // title: '标题',
          message: '你的授权资料不完整，无法使用该用能。请补充授权资料。',
          confirmButtonText: '去补充',
        }).then(() => {
          // on confirm
          this.$router.push({
            name: 'MyCertificateAuthorization',// 授权资料
            query: {
              show: 1
            }

          })
        }).catch(() => {
          // on cancel
        });
      } else {
        this.goInvitationPoster()
      }

    }
  },

  components: {
    bottomBanner
  }
}
</script>
<style lang="less" scoped>
.indexContainer {
  .banner {
    position: relative;
    height: 180px;
    margin-bottom: 66px;
    .bg {
      width: 100%;
    }
    .logo {
      width: 100%;
      position: absolute;
      left: 0;
      top: 36px;
      img {
        width: 80px;
        margin: 0 auto;
      }
      p {
        height: 28px;
        font-size: 20px;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 28px;
        text-align: center;
        margin-top: 8px;
      }
    }
  }
  .main {
    div {
      width: 345px;
      height: 60px;
      line-height: 60px;
      font-size: 24px;
      color: #fff;
      background: linear-gradient(
        225deg,
        rgba(28, 250, 174, 1) 0%,
        rgba(30, 211, 166, 1) 100%
      );
      border-radius: 2px;
      margin: 0 auto;
      text-align: center;
    }
    .jumpGoodDetaile {
      background: linear-gradient(
        225deg,
        rgba(10, 211, 238, 1) 0%,
        rgba(10, 190, 213, 1) 100%
      );
      border-radius: 2px;
    }
    .prevent{
      background:linear-gradient(225deg,rgba(158,255,222,1) 0%,rgba(146,234,212,1) 100%);
      border-radius:2px;
    }
    
  }
  .actTip{
      width:345px;
      // height:156px;
      background:rgba(255,255,255,1);
      box-shadow:0px 2px 8px 8px rgba(0,0,0,0.04);
      border-radius:6px;
      margin:0 auto;
      margin-top: 25px;
      margin-bottom: 10px;
      .title{
        padding: 20px 0 16px 21px;
        span{
          height:14px;
          font-size:14px;
          font-weight:400;
          color:rgba(153,153,153,1);
          line-height:14px;
          display: block;
        }
        em{
          height:30px;
          font-size:26px;
          font-weight:400;
          color:rgba(51,51,51,1);
          line-height:30px;
          margin-top: 8px;
          display: block;
        }
      }
      .bottom{
        display: flex;
        border-top:rgba(238,238,238,1) solid 1px;
        div{
          flex: 1;
          padding-left:20px;
          padding-bottom:15px;
          &.left{
            border-right:rgba(238,238,238,1) solid 1px;
          }
          span{
            height:16px;
            font-size:14px;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:16px;
            display:block;
            padding-top:18px;
          }
          em{
            height:16px;
            font-size:14px;
            font-weight:400;
            color:rgba(153,153,153,1);
            line-height:16px;
            display:block;
            padding-top:10px;
          }

        }
      }
    }
}
</style>