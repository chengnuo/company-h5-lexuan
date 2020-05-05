<template>
  <div class="myContainer">
    <div class="banner">
      <div class="userInfo clearfix"
           v-if="userIndexInfo">
        <img :src="userData.headImgUrl"
             alt=""
             v-if="userData.headImgUrl">
        <img src="../../assets/img/my/headUrl.png"
             alt=""
             v-if="!userData.headImgUrl">
        <div class="right">
          <span class="line-clamp-1"
                v-if="shopMobileUserInfo && shopMobileUserInfo.authStatus==1">{{userData.nickname}}</span>
          <span class="line-clamp-1"
                v-else>{{userData.mobile}}</span>
          <div class="info">
            <em v-if="shopMobileUserInfo">{{computePtLevelFn(shopMobileUserInfo.ptLevel)}}</em>
            <div v-if="shopMobileUserInfo.authStatus==1">授权码：{{shopMobileUserInfo.authNo}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="orderListTip">
      <div class="vanswipe"
           v-if="adList && !hiddenAd">
        <van-swipe indicator-color="rgba(80,236,187,1)">
          <van-swipe-item v-for="(item, index) in adList"
                          :key="index"
                          @click="onClickSwipe(item)">
            <img :src="item.url"></van-swipe-item>
        </van-swipe>
      </div>
      <div class="lineClass">
        <div class="solid"
             @click="jumpMyOrder(0)">
          <p>我的订单</p>
          <img src="../../assets/img/my/more_01@2x.png"
               alt=""
               class="right">
        </div>
      </div>
      <div class="main">
        <div class="list"
             @click="jumpMyOrder(1)">
          <img src="../../assets/img/my/icon_08／wallet_01@2x.png">
          <p>待付款</p>
          <!-- <div class="round {{myDetail.order.waitPay >= 99?'round_3':''}}{{myDetail.order.waitPay <= 98 && myDetail.order.waitPay >= 10?'round_2':''}}" v-if="myDetail.order.waitPay && myDetail.order.waitPay!=0">{{myDetail.order.waitPay >= 99 ? '99+' : myDetail.order.waitPay}}</div> -->
          <div class="round"
               :class="{'round_2': (userIndexInfo.order.waitPay <= 98 && userIndexInfo.order.waitPay >= 10),'round_3': userIndexInfo.order.waitPay >= 99}"
               v-if="userIndexInfo && userIndexInfo.order.waitPay != 0">{{userIndexInfo.order.waitPay >= 99 ? '99+' : userIndexInfo.order.waitPay}}</div>
        </div>
        <div class="list"
             @click="jumpMyOrder(2)">
          <img src="../../assets/img/my/icon_08／Ship_01@2x.png">
          <p>待发货</p>
          <div class="round"
               :class="{'round_2': (userIndexInfo.order.waitShip <= 98 && userIndexInfo.order.waitShip >= 10),'round_3': userIndexInfo.order.waitShip >= 99}"
               v-if="userIndexInfo && userIndexInfo.order.waitShip != 0">{{userIndexInfo.order.waitShip >= 99 ? '99+' : userIndexInfo.order.waitShip}}</div>
        </div>
        <div class="list"
             @click="jumpMyOrder(3)">
          <img src="../../assets/img/my/icon_08／car_01@2x.png">
          <p>待收货</p>
          <div class="round"
               :class="{'round_2': (userIndexInfo.order.waitReceipt <= 98 && userIndexInfo.order.waitReceipt >= 10),'round_3': userIndexInfo.order.waitReceipt >= 99}"
               v-if="userIndexInfo && userIndexInfo.order.waitReceipt != 0">{{userIndexInfo.order.waitReceipt >= 99 ? '99+' : userIndexInfo.order.waitReceipt}}</div>
        </div>
        <div class="list"
             @click="jumpMyOrder(4)">
          <img src="../../assets/img/my/icon_08／done_01@2x.png">
          <p>已完成</p>
         <!--  <div class="round"
               :class="{'round_2': (userIndexInfo.order.finish <= 98 && userIndexInfo.order.finish >= 10),'round_3': userIndexInfo.order.finish >= 99}"
               v-if="userIndexInfo && userIndexInfo.order.finish != 0">{{userIndexInfo.order.finish >= 99 ? '99+' : userIndexInfo.order.finish}}</div> -->
        </div>
      </div>
    </div>
    <ul class="listBox">
      <!-- <li @click="jumpMyNotice">
        <p class="bar"></p>
        <img src="../../assets/img/my/icon_04／inform_01@2x.png"
             alt=""
             class="left">
        <div class="frist clearfix">
          <span>我的通知</span>
          <img src="../../assets/img/my/more_01@2x.png"
               alt=""
               class="right">
          <em :class="{'round_2': (userIndexInfo.notifyNumber <= 98 && userIndexInfo.notifyNumber >= 10),'round_3': userIndexInfo.notifyNumber >= 99}"
              v-if="userIndexInfo && userIndexInfo.notifyNumber != 0">{{userIndexInfo.notifyNumber}}</em>
        </div>
      </li> -->
      <li @click="jumpInvitationFriend">
        <p class="bar"></p>
        <img src="../../assets/img/my/icon_04／share_01@2x.png"
             alt=""
             class="left">
        <div class="frist clearfix">
          <span>邀请好友</span>
          <img src="../../assets/img/my/more_01@2x.png"
               alt=""
               class="right">
        </div>
      </li>
      <li @click="jumpUnderLineAllOrder">
        <p class="bar"></p>
        <img src="../../assets/img/my/icon_04／consignment_01@2x.png"
             alt=""
             class="left">
        <div class="frist clearfix">
          <span>线下发货</span>
          <img src="../../assets/img/my/more_01@2x.png"
               alt=""
               class="right">
          <em :class="{'round_2': (userIndexInfo.offLineOrderNum <= 98 && userIndexInfo.offLineOrderNum >= 10),'round_3': userIndexInfo.offLineOrderNum >= 99}"
              v-if="userIndexInfo && userIndexInfo.offLineOrderNum != 0">{{userIndexInfo.offLineOrderNum}}</em>
        </div>
      </li>
      <!-- <li @click="jumpMyCertiBook">
        <p class="bar"></p>
        <img src="../../assets/img/my/icon_04／set_01@2x.png"
             alt=""
             class="left">
        <div class="clearfix">
          <span>授权书</span>
          <img src="../../assets/img/my/more_01@2x.png"
               alt=""
               class="right">
        </div>
      </li> -->

      <li @click="serviceBoxShow=true">
        <p class="bar"></p>
        <img src="../../assets/img/my/icon_04／set_01@2x(1).png"
             alt=""
             class="left">
        <div class="clearfix">
          <span>客服</span>
          <img src="../../assets/img/my/more_01@2x.png"
               alt=""
               class="right">
        </div>
      </li>
      <li @click="jumpSetUp">
        <p class="bar"></p>
        <img src="../../assets/img/my/icon_04／set_01@2x.png"
             alt=""
             class="left">
        <div class="clearfix">
          <span>设置</span>
          <img src="../../assets/img/my/more_01@2x.png"
               alt=""
               class="right">
        </div>
      </li>
      <li @click="jumpDownload">
        <p class="bar"></p>
        <img src="../../assets/img/my/icon_04／withdraw deposit_01@2x.png"
             alt=""
             class="left">
        <div class="clearfix">
          <span>提现</span>
          <img src="../../assets/img/my/more_01@2x.png"
               alt=""
               class="right">
        </div>
      </li>
      <!-- 分割线 -->
      <li @click="jumpCustomAdvertisingSpace">
        <p class="bar"></p>
        <img src="../../assets/img/my/icon_04／withdraw deposit_01@2x.png"
             alt=""
             class="left">
        <div class="clearfix">
          <span>广告位</span>
          <img src="../../assets/img/my/more_01@2x.png"
               alt=""
               class="right">
        </div>
      </li>
      <li @click="jumpCustomNavigationBar">
        <p class="bar"></p>
        <img src="../../assets/img/my/icon_04／withdraw deposit_01@2x.png"
             alt=""
             class="left">
        <div class="clearfix">
          <span>导航栏</span>
          <img src="../../assets/img/my/more_01@2x.png"
               alt=""
               class="right">
        </div>
      </li>
      <li @click="jumpCustomLimitedTime">
        <p class="bar"></p>
        <img src="../../assets/img/my/icon_04／withdraw deposit_01@2x.png"
             alt=""
             class="left">
        <div class="clearfix">
          <span>限时秒杀</span>
          <img src="../../assets/img/my/more_01@2x.png"
               alt=""
               class="right">
        </div>
      </li>
    </ul>
    <div class="serviceBox"
         v-if="serviceBoxShow">
      <div class="bg"
           @click="serviceBoxShow=false"></div>
      <div class="modalDlg">
        <div bind:tap="serviceCanel"
             class="kefuCloseBox">
          <!-- <img src="images/close_04@2x.png" class="kefuClose" /> -->
        </div>
        <div>
          <img src="../../assets/img/my/consult customer service_01@2x.png"
               class="kefuImage" />
        </div>
        <div class="title">客服热线</div>
        <div class="content">乐选官方客服为你提供商品、订单咨询服务，及时解答你的疑问，服务时间为周一至周日09:00 - 21:00</div>
        <div class="action clearfix">
          <div class="leftbar"
               @click="serviceBoxShow=false">暂不需要</div>
          <a class="rightbar"
             href="javascript:;"
             @click="telPhone">立即拨打</a>
        </div>
      </div>
    </div>
    <bottomBanner :index="2"></bottomBanner>
  </div>
</template>
<script >
import { apiUserIndex, apiAdList, apiShopMobileUserInfo } from '@/api/my';
import { Toast, Swipe, SwipeItem } from 'vant';
import commonJs from '@/util/common';
import bottomBanner from '@/components/bottomBanner';
import { Dialog } from 'vant';

import { apiShopMobileIncomeBal } from '@/api/bond'
export default {
  name: 'my',
  data() {
    return {
      serviceBoxShow: false, // 是否显示客服box
      // userData: null, //用户基础信息
      userIndexInfo: null,//用户信息相关订单 客服电话
      userIndexInfoTel: null,
      adList: [],
      hiddenAd: false,
      userData: {
        id: '',
        userToken: '',
      },
      shopMobileIncomeBal: {}, // 保证金余额
      shopMobileUserInfo: {}, // 基本资料
      ptLevelMap: {
        0: '普通用户',
        1: 'VIP',
        2: '县级店',
        3: '品牌店',
        4: '金钻',
        5: '总裁',
        6: '分公司',
      },
    }
  },
  components: {
    bottomBanner
  },
  mounted() {
    commonJs.outSideShare();
    this.getuserInfo();
    this.getUserIndex();
    this.getAdListFn();
    this.apiShopMobileIncomeBal(); // 保证金余额
    this.apiShopMobileUserInfo();  // 获取授权资料
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
    // 跳转逻辑
    goInvitationPoster() {
      window.location.href = `${commonJs.config.prefixH5Url}/act/countyStore/invitationPoster?token=${this.userData.userToken}`
    },
    jumpDownload(){
      this.$router.push({
        name: 'download'
      })
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
            path: `/my/certificateAuthorization` // 授权资料
          })
        }).catch(() => {
          // on cancel
        });
      } else {
        this.goInvitationPoster()
      }




    },
    getAdListFn() {
      apiAdList({
        position: 3
      }).then((res) => {
        if (res.code.toString() === '10000') {
          this.adList = res.data.items;
          // for (var i = 0; i < res.data.items.length; i++) {
          //   var arr = res.data.items[i].levelList;
          //   for (var j = 0; j < arr.length; j++) {
          //     if (arr[j] == this.userData.ptLevel) {
          //       this.adList.push(res.data.items[i]);
          //     }
          //   }
          // }

          // if (this.adList.length <= 0) this.hiddenAd = true;
        }
      }).catch(error => {
        // Toast.fail(error)
      })
    },
    onClickSwipe(item) {
      if (item.type == 3) {
        return;
      } else if (item.type == 2) {
        this.$router.push({
          name: 'GoodDetail'
        })
      } else if (item.type == 1) {

        // this.adList[0]

        let arr = this.adList[0].levelList.map((item) => {
          return this.ptLevelMap[item]
        })
        if (this.adList[0].levelList.includes(this.userData.ptLevel + '')) {
          // this.adList
          window.location.href = `${commonJs.config.prefixH5Url}/act/countyStore?token=${this.userData.userToken}`;
        } else {
          Dialog.alert({
            // title: '标题',
            message: `抱歉，该活动仅限 ${arr.join()} 参加`,
            // confirmButtonText: '去升级',
          }).then(() => {
            // on confirm
            // this.$router.push({
            //   path: `download` // 跳到app
            // })
          })

        }



      }
    },
    getuserInfo() {
      this.userData = JSON.parse(sessionStorage.getItem('userData')) || {};
      console.log(this.userData)
    },
    clearSessionStorage() { //退出登录并跳转首页

      var goodPath = JSON.parse(sessionStorage.getItem('goodId')) || {};
      window.sessionStorage.removeItem('goodId')
      window.sessionStorage.removeItem('userData')
      window.sessionStorage.removeItem('inviteCodeRedirectUrl')

      this.$router.push({
        name: 'Login',
      })
    },
    jumpMyOrder(type) { //退出登录并跳转首页
      this.$router.push({
        name: 'myOrder',
        query: {
          type
        }
      })
    },
    // 跳到我要升级
    jumpMyNotice() {
      this.$router.push({
        name: 'MyNotice'
      })
    },
    jumpSetUp() {
      this.$router.push({
        name: 'SetUp'
      })
    },
    jumpMyCertiBook() {
      this.$router.push({
        name: 'MyCertificateAuthorizationBook'
      })
    },
    telPhone() {
      window.location.href = 'tel://' + this.userIndexInfo.serverPhone;
    },
    jumpUnderLineAllOrder() {
      if (this.userData.ptLevel == 0) {
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
      } else {
        this.$router.push({
          name: 'underLineAllOrder'
        })
      }
    },
    computePtLevelFn(type) {
      return commonJs.computePtLevel(type);
    },
    getUserIndex() {
      var timer = setTimeout(() => {
        Toast.loading({
          duration: 0,       // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '加载中...'
        });
      }, 10);
      apiUserIndex({}).then((res) => {
        if (res.code == 10501) {
          this.$router.push({
            path: '/login',
          })
        }
        clearTimeout(timer);
        Toast.clear(true);
        this.userIndexInfo = res.data;
        this.userIndexInfoTel = 'tel:' + this.userIndexInfo.serverPhone;

      }).catch(error => {
        console.log('error', error)
        clearTimeout(timer);
        Toast.clear(true);
      })
    },
    changeArr(str) {
      return str.split(',');
    },
    jumpCustomAdvertisingSpace(){
      this.$router.push({
        name: 'CustomAdvertisingSpace'
      })
    },
    jumpCustomNavigationBar(){
      this.$router.push({
        name: 'CustomNavigationBar'
      })
    },
    jumpCustomLimitedTime(){
      this.$router.push({
        name: 'CustomLimitedTime'
      })
    },
  }
}
</script>
<style lang="less" scoped>
.myContainer {
  .serviceBox {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 11;
    .bg {
      width: 100%;
      height: 100%;
      background: rgba(51, 51, 51, 0.5);
      position: absolute;
      left: 0;
      top: 0;
    }
    .service {
      width: 216px;
      height: 100px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.3);
      border-radius: 2px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -108px;
      margin-top: -50px;
      p {
        width: 100%;
        height: 20px;
        font-size: 14px;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
        text-align: center;
        margin-top: 24px;
        margin-bottom: 21px;
      }
      div {
        width: 100%;
        display: flex;
        position: relative;
        span {
          width: 1px;
          height: 13px;
          background: #cccccc;
          position: absolute;
          left: 50%;
          top: 8px;
        }
        a {
          width: 50%;
          height: 28px;
          line-height: 28px;
          color: #db9202;
          display: block;
          text-align: center;
          font-size: 14px;
          &.sure {
            color: rgba(102, 102, 102, 1);
          }
        }
      }
    }
  }
  .banner {
    width: 100%;
    height: 179px;
    position: relative;
    background: linear-gradient(
      180deg,
      rgba(253, 195, 1, 1) 0%,
      rgba(254, 211, 11, 1) 100%
    );
    background: url(../../assets/img/my/head@2x.png) center center no-repeat;
    background-size: 100%;
    .userInfo {
      width: 100%;
      height: 95px;
      padding-top: 34px;
      img {
        width: 56px;
        height: 56px;
        float: left;
        border-radius: 50%;
        margin-left: 25px;
        margin-right: 16px;
        object-fit: cover;
        border: #4cede6 solid 2px;
      }
      .right {
        float: left;
        span {
          width: 216px;
          height: 18px;
          font-size: 16px;
          font-weight: 500;
          color: rgba(255, 255, 255, 1);
          line-height: 18px;
          color: #fff;
          margin-top: 6px;
          display: block;
        }
        .info {
          margin-top: 9px;
          em {
            height: 14px;
            line-height: 14px;
            background: rgba(255, 237, 199, 1);
            border: 1px solid rgba(192, 176, 140, 1);
            font-size: 10px;
            text-align: center;
            padding: 0 9px;
            border-radius: 10px;
            color: rgba(174, 118, 55, 1);
            float: left;
            margin-right: 6px;
          }
          div {
            width: 120px;
            height: 14px;
            line-height: 14px;
            border: 1px solid rgba(255, 255, 255, 1);
            font-size: 10px;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
            border-radius: 10px;
            text-align: center;
            float: left;
          }
        }
      }
    }
  }
  .listBox {
    margin-top: 15px;
    padding: 0 15px 0 10px;
    background: #fff;
    li {
      // height: 44px;
      background: rgba(255, 255, 255, 1);
      position: relative;
      .bar {
        width: 290px;
        height: 1px;
        background: rgba(242, 242, 242, 1);
        position: absolute;
        left: 46px;
        bottom: 0;
        overflow: hidden;
      }
      .left {
        width: 30px;
        height: 30px;
        margin-right: 5px;
        position: absolute;
        top: 10px;
        left: 10px;
      }
      div {
        height: 30px;
        margin-left: 45px;
        margin-right: 15px;
        padding: 11px 0 12px;
        position:relative;
        &.frist {
          border-bottom: solid 1px #f2f2f2;
        }
      }
      span {
        height: 30px;
        line-height: 30px;
        font-size: 15px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        float: left;
      }
      em {
        width: 16px;
        height: 16px;
        line-height: 16px;
        font-size: 12px;
        background: rgba(254, 107, 107, 1);
        border-radius: 50%;
        text-align: center;
        color: #fff;
        float: right;
        margin-top: 9px;
        &.round_2 {
          width: 20px;
          border-radius: 3px;
          right: -5px;
        }
        &.round_3 {
          width: 26px;
          right: -8px;
          border-radius: 7px;
        }
      }
      .right {
        width: 7px;
        height: 15px;
        float: right;
        margin-top: 7px;
        margin-left: 10px;
      }
    }
  }
  .logOut {
    width: 90%;
    height: 44px;
    line-height: 44px;
    background: linear-gradient(
      225deg,
      rgba(10, 211, 238, 1) 0%,
      rgba(10, 190, 213, 1) 100%
    );
    border-radius: 2px;
    display: block;
    font-size: 16px;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    text-align: center;
    color: #fff;
    position: fixed;
    left: 50%;
    margin-left: -45%;
    bottom: 20px;
  }
}
.myContainer .lineClass {
  background: #fff;
  padding: 12px 0;
  border-bottom: solid 1px rgba(245, 245, 245, 1);
  border-left-top-radius: 5px;
  border-right-top-radius: 5px;
}
.myContainer .lineClass .solid {
  height: 16px;
  padding: 0 15px;
}
.myContainer .lineClass p {
  float: left;
  height: 16px;
  font-size: 14px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 16px;
}
.myContainer .lineClass img {
  float: right;
  width: 7px;
  height: 11px;
  margin-top: 7px;
}
.myContainer .orderListTip {
  width: 345px;
  // height:131px;
  // background:rgba(255,255,255,1);
  border-radius: 6px;
  margin: 0 auto;
  position: relative;
  margin-top: -40px;
}
.myContainer .main {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background: #fff;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  width: 274px;
  background: rgba(255, 255, 255, 1);
  border-left-bottom-radius: 6px;
  border-right-bottom-radius: 6px;
  padding: 0 36px;
  padding-bottom: 20px;
}
.myContainer .main .list {
  position: relative;
  margin-top: 18px;
}
.myContainer .main img {
  width: 36px;
  height: 36px;
  display: block;
}
.myContainer .main p {
  width: 36px;
  height: 16px;
  font-size: 12px;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  line-height: 16px;
  text-align: center;
}
.myContainer .main .round {
  width: 14px;
  height: 14px;
  background: #d62d2d;
  font-size: 11px;
  text-align: center;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 14px;
  border-radius: 50%;
  position: absolute;
  right: -2px;
  top: 0;
}
.myContainer .main .round_2 {
  width: 20px;
  border-radius: 3px;
  right: -5px;
}
.myContainer .main .round_3 {
  width: 26px;
  right: -8px;
  border-radius: 7px;
}

.myContainer .foot {
  margin-top: 20px;
}

.myContainer .lineClass .noSolid {
  border: none;
}

.myContainer .mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: #000;
  z-index: 9000;
  opacity: 0.4;
}

.myContainer .modalDlg {
  width: 270px;
  height: 340px;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  margin-left: -135px;
  margin-top: -170px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 10px 0px rgba(51, 51, 51, 0.3);
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.myContainer .title {
  height: 22px;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(51, 51, 51, 1);
  line-height: 22px;
  text-align: center;
  margin: 15px 0 10px;
}
.myContainer .content {
  height: 68px;
  font-size: 14px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  line-height: 20px;
  padding: 0 20px;
}

.myContainer .action {
  width: 100%;
  height: 20px;
  display: flex;
  margin-top: 42px;
}
.myContainer .action .leftbar {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #666666;
  height: 20px;
  line-height: 20px;
  border-right: #cccccc 1px solid;
}

.myContainer .action .rightbar {
  flex: 1;
  text-align: center;
  font-size: 14px; 
  font-weight: 400;
  color: #09C2DA;
  height: 20px;
  line-height: 20px;
}
.myContainer .kefuImage {
  height: 150px;
  width: 270px;
}
.myContainer .kefuCloseBox {
  position: absolute;
  width: 18px;
  height: 18px;
  padding: 5px;
  right: 5px;
  top: 5px;
}
.myContainer .kefuClose {
  width: 18px;
  height: 18px;
  display: block;
}

.myContainer .vanswipe {
  width: 345px;
  height: 120px;
  border-radius: 6px;
  margin-bottom: 15px;
}
.myContainer .van-swipe {
  width: 345px;
  height: 120px;
  border-radius: 6px;
  margin-bottom: 11px;
  position: relative;
}
.myContainer .van-swipe img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>