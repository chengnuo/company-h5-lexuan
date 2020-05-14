<template>
  <div class="my myCon">
    <!-- banner -->
    <!-- <div class="banner">
      <div class="userInfo clearfix">
        <div>
          <img
            v-if="userData.headImgUrl"
            class="img"
            :src="userData.headImgUrl"
            alt=""
          />
          <img
            v-else
            class="img"
            src="../../assets/img/my/headUrl.png"
            alt=""
          />
        </div>
        <div class="right">
          <div class="right-top" :class="classBalances[ptLevel]">
            <span class="right-top__name">{{ userData.nickname }}</span>
            <img
              v-if="ptLevel !== 0"
              :class="classType[ptLevel]"
              :src="classList[ptLevel]"
              alt=""
            />
          </div>
          <div class="balance" v-if="acBal != null">
            <div class="top" :class="classBalance[ptLevel]">
              <i class="first" /><span>可提现余额 (元)</span><i class="first" />
              <p>{{ acBal }}</p>
              <i class="second" />
            </div>
          </div>
          <div class="right__info" v-if="ptLevel !== 0 && acBal != null">
            <span>邀请码：{{ userData.inviteCode }}</span>
            <span @click="copyOdd(userData.inviteCode)">
              <img
                class="copy"
                src="../../assets/img/my/icon_copy@2x.png"
                alt=""
              />
            </span>
          </div>
        </div>
      </div>
    </div> -->
    <div class="headerbar">
      <div class="titleLayout clearfix">
        <div class="rightIcon fr" @click="handleSetUp"></div>
        <!-- <div class="title">开启创业</div> -->
      </div>
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
              <div class="ptlevel">乐选团长</div>
            </div>
            <div class="invitecode">
              邀请码：274832
            </div>
          </div>
        </div>

        <!-- <div class="temporaryAccount fr">
          <div class="name">临时账户(元)</div>
          <div class="number">275.25</div>
        </div> -->

      </div>
    </div>

    <div class="teamNuber clearfix">
      <div class="leftbar fl">
        <div class="name">我的团队(人)</div>
        <div class="number">198</div>
      </div>
      <div class="centerbar fl"></div>
      <div class="rightbar fl">
        <div class="name">我的资产(元)</div>
        <div class="number">2753</div>
      </div>
    </div>

    <!-- 我的订单 -->
    <div class="order">
      <ul class="order__top">
        <li @click="jumpMyOrder(10)">
          <p>我的订单</p>
          <van-icon class="right"
                    name="arrow" />
        </li>
      </ul>
      <ul class="order__box">
        <li v-for="(item, index) in orderList"
            :key="item.title"
            @click="jumpMyOrder(index)">
          <img :src="item.imgUrl"
               alt="" />
          <p>{{ item.title }}</p>
          <div v-if="falg">
            <div v-if="orderState.waitPay != 0 && index === 0"
                 class="bedeck">
              {{ orderState.waitPay }}
            </div>
            <div v-else-if="orderState.waitShip != 0 && index === 1"
                 class="bedeck">
              {{ orderState.waitShip }}
            </div>
            <div v-else-if="orderState.waitReceipt != 0 && index === 2"
                 class="bedeck">
              {{ orderState.waitReceipt }}
            </div>
            <!-- <div v-if="orderState.finish != 0 && index === 3" class="bedeck">
              {{ orderState.finish }}
            </div> -->
          </div>
        </li>
      </ul>
    </div>

    <!-- 列表 -->
    <div class="list">
      <div class="title">我的服务</div>
      <ul class="clearfix">
        <li @click="jumpPage('feedbackQuestions')">
          <img src="../../assets/img/my/42.png"
               alt="" />
          <span>意见反馈</span>
        </li>
        <li @click="jumpPage('sweepCode')">
          <img src="../../assets/img/my/42.png"
               alt="" />
          <span>防伪查询</span>
        </li>
        <li @click="jumpPage(111)">
          <img src="../../assets/img/my/42.png"
               alt="" />
          <span>我的上级</span>
        </li>
        <li @click="jumpPage(2)">
          <img src="../../assets/img/my/43.png"
               alt="" />
          <span>邀请好友</span>
        </li>

        <li @click="jumpPage(1)">
          <img src="../../assets/img/my/45.png"
               alt="" />
          <span>我要升级</span>
        </li>

        <li @click="jumpPage(111)">
          <img src="../../assets/img/my/42.png"
               alt="" />
          <span>进货</span>
        </li>
        <li @click="jumpPage(111)">
          <img src="../../assets/img/my/42.png"
               alt="" />
          <span>会员升级</span>
        </li>
        <li @click="jumpPage(111)">
          <img src="../../assets/img/my/42.png"
               alt="" />
          <span>会员升级</span>
        </li>
        <li @click="jumpPage(111)">
          <img src="../../assets/img/my/42.png"
               alt="" />
          <span>我的云仓</span>
        </li>
        <li @click="jumpPage(111)">
          <img src="../../assets/img/my/42.png"
               alt="" />
          <span>我的业绩</span>
        </li>

        <li @click="jumpPage(0)">
          <img src="../../assets/img/my/41.png"
               alt="" />
          <span>购买到家</span>
        </li>
        <!-- <li v-if="ptLevel !== 0" @click="jumpPage(3)">
          <img src="../../assets/img/my/44.png" alt="" />
          <span>会员升级</span>
          <p class="bedeck" v-if="num > 0">({{ num }}盒)</p>
        </li> -->

        <!-- 普通用户不给看库存 -->
        <!-- <li @click="jumpPage(5)"
            v-if="userData.ptLevel!=0">
          <img src="../../assets/img/my/46.png"
               alt="" />
          <span>我的库存</span>
          <div class="description"
               v-if="cloudNum>0">({{cloudNum}}盒)</div>
        </li> -->
        <!-- <li @click="jumpPage(4)">
          <img src="../../assets/img/my/42.png"
               alt="" />
          <span>咨询客服</span>
        </li> -->
      </ul>
    </div>

    <!-- 退出登录 -->
    <!-- <div class="sign-out"
         @click="signOut">
      <img src="../../assets/img/my/btn.png"
           alt="" />
    </div> -->

    <!-- 客服电话 -->
    <div class="serviceBox"
         v-if="serviceBoxShow">
      <div class="bg"
           @click="serviceBoxShow = false"></div>
      <div class="modalDlg">
        <div bind:tap="serviceCanel"
             class="kefuCloseBox"></div>
        <div>
          <img src="../../assets/img/my/kefu16@2x.jpg"
               class="kefuImage" />
        </div>
        <div class="title">客服热线</div>
        <div class="content">
          幸福引力官方客服为你提供商品、订单咨询服务，及时解答你的疑问，服务时间为周一至周日09:00
          - 21:00
        </div>
        <div class="action clearfix">
          <div class="leftbar"
               @click="serviceBoxShow = false">暂不需要</div>
          <a class="rightbar"
             href="javascript:;"
             @click="telPhone">立即拨打</a>
        </div>
      </div>
    </div>

    <bottomBanner :index="4" />
  </div>
</template>

<script>
import Vue from "vue";
import VueClipboard from "vue-clipboard2";
import { Toast } from 'vant'
import { apiUserIndex, apiCloudListInfo, apiShopMobileUserInfo, stockApiCloudNum } from '@/api/my'

import { apiShopMobileIncomeBal } from '@/api/bond'
import bottomBanner from '@/components/bottomBanner';


Vue.use(VueClipboard);

export default {
  name: "my",


  components: {
    bottomBanner,
  },

  data() {
    return {
      userData: {
        id: null,
        userToken: null
      },
      orderState: {},
      acBal: null,
      num: null,
      orderStateMap: {
        waitPay: null
      },
      orderList: [
        {
          title: "待付款",
          imgUrl: require("../../assets/img/my/14.png")
        },
        {
          title: "待发货",
          imgUrl: require("../../assets/img/my/13.png")
        },
        {
          title: "待收货",
          imgUrl: require("../../assets/img/my/11.png")
        },
        {
          title: "已完成",
          imgUrl: require("../../assets/img/my/12.png")
        }
      ],
      ptLevel: 0,
      falg: false,
      serviceBoxShow: false,
      list: [
        require("../../assets/img/my/21.png"),
        require("../../assets/img/my/22.png"),
        require("../../assets/img/my/24.png"),
        require("../../assets/img/my/23.png"),
        require("../../assets/img/my/25.png")
      ],
      classList: {
        1: require("../../assets/img/my/31.png"),
        2: require("../../assets/img/my/32.png"),
        3: require("../../assets/img/my/33.png"),
        4: require("../../assets/img/my/34.png"),
        5: require("../../assets/img/my/35.png")
      },
      classBalance: {
        0: "tenth"
      },
      classBalances: {
        0: "eleven"
      },
      classType: {
        1: "logo-1",
        2: "logo-2",
        3: "logo-2",
        4: "logo-3",
        5: "logo-2"
      },
      cloudNum: 0,
    };
  },

  created() {
    this.userData = JSON.parse(window.sessionStorage.getItem("userData")) || {};
    this.getEarnings();
    this.getOrderState();
    this.getCloudList();
    this.cloudNumFn(); // 库存
    this.apiHomeUserInfo(); // 每次进来获取个人治疗
  },

  methods: {
    getOrderState() {
      // const res = await this.$post(this.$api.apiUserIndex);
      // try {
      //   if (res.code.toString() === "10000") {
      //     this.orderState = res.data.order;
      //     this.userIndexInfo = res.data;
      //     this.ptLevel = res.data.ptLevel;
      //     this.falg = true;
      //   }
      // } catch (error) {
      //   this.$toast(res.msg);
      // }

      apiUserIndex({}).then(res => {
        if (res.code.toString() === "10000") {
          this.orderState = res.data.order;
          this.userIndexInfo = res.data;
          this.ptLevel = res.data.ptLevel;
          this.falg = true;
        }
      }).catch(error => {
        this.$toast(res.msg);
      })
    },

    getEarnings() {
      // const res = await this.$post(this.$api.apiShopMobileBalance);
      // try {
      //   if (res.code.toString() === "10000") {
      //     this.acBal = res.data.acBal;
      //   }
      // } catch (error) {
      //   this.$toast(res.msg);
      // }

      apiShopMobileIncomeBal({}).then(res => {
        if (res.code.toString() === "10000") {
          this.acBal = res.data.acBal;
        }
      }).catch(error => {
        this.$toast(error.msg);
      })
    },

    telPhone() {
      window.location.href = "tel://" + this.userIndexInfo.serverPhone;
    },

    jumpMyOrder(type) {
      this.$router.push({
        name: "myOrder",
        query: {
          type: type === 10 ? 0 : type + 1
        }
      });
    },

    getCloudList() {
      // const res = await this.$post(this.$api.apiCloudListInfo);
      // try {
      //   if (res.code.toString() === "10000") {
      //     this.num = res.data.num;
      //   }
      // } catch (error) {
      //   this.$toast(res.msg);
      // }



      apiCloudListInfo({}).then(res => {
        if (res.code.toString() === "10000") {
          this.num = res.data.num;
        }
      }).catch(error => {
        this.$toast(error);
      })
    },

    jumpPage(type) {
      const typeMap = {
        0: "GoodDetail",
        1: "BecomeServiceProvider",
        2: "MysInvitationPoster",
        3: "quickLevel",
        4: "",
        5: 'myStock',
        'sweepCode': 'sweepCode',
        'feedbackQuestions': 'feedbackQuestions',
      };

      const userData =
        JSON.parse(window.sessionStorage.getItem("userData")) || {};
      const inviteCode =
        userData.inviteCode || this.$route.query.inviteCode || "";

      if (type === 0) {
        window.location.href = `/goodDetail?inviteCode=${inviteCode}`;
      } else if (type === 1) {
        if (this.userData.ptLevel == 0) {
          Toast(`抱歉，你暂无购买资格，请联系你的上级进行购买`);
        } else {
          this.$router.push({ name: `BecomeServiceProvider` });
        }
      } else if (type === 2) {
        window.location.href = `/mysInvitationPoster?token=${userData.userToken}`;
      } else if (type === 4) {
        this.serviceBoxShow = true;
      } else {
        this.$router.push({ name: typeMap[type] });
      }
    },

    signOut() {
      this.$router.push({ name: "QuickLogin" });
      window.sessionStorage.removeItem("userData");
    },

    copyOdd(val) {
      this.$copyText(val).then(
        () => {
          this.$toast("复制成功");
        },
        () => {
          this.$toast("复制失败");
        }
      );
    },

    cut(str) {
      let newStr = "";
      let count = 0;
      // 当数字是整数
      if (str.indexOf(".") == -1) {
        for (let i = str.length - 1; i >= 0; i--) {
          if (count % 3 == 0 && count != 0) {
            newStr = str.charAt(i) + "," + newStr;
          } else {
            newStr = str.charAt(i) + newStr;
          }
          count++;
        }
        str = newStr; // 自动补小数点后两位
        return str;
      } else {
        // 当数字带有小数
        for (let i = str.indexOf(".") - 1; i >= 0; i--) {
          if (count % 3 == 0 && count != 0) {
            newStr = str.charAt(i) + "," + newStr;
          } else {
            newStr = str.charAt(i) + newStr; // 逐个字符相接起来
          }
          count++;
        }
        str = newStr + (str + "00").substr((str + "00").indexOf("."), 3);
        return str;
      }
    },

    // 库存
    cloudNumFn() {
      Toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中'
      })

      // const res = await this.$post(this.$api.stockApiCloudNum, {})

      // Toast.clear();
      // try {
      //   if (res.code.toString() === '10000') {
      //     this.cloudNum = res.data.num;
      //   }
      // } catch (error) {
      //   console.error(error)
      // }

      Toast.clear();

      stockApiCloudNum({}).then(res => {
        if (res.code.toString() === "10000") {
          this.cloudNum = res.data.num;
        }
      }).catch(error => {
        this.$toast(res.msg);
      })
    },
    // 个人资料
    async apiHomeUserInfo() {
      let sendData = {}
      // const res = await this.$post(this.$api.homeUserInfo, sendData)
      // try {
      //   if (res.code.toString() === '10000') {
      //     window.sessionStorage.setItem('userData', JSON.stringify(res.data)) // 这个保持跟之前一样。
      //     this.userData = res.data;
      //   } else {
      //   }
      // } catch (error) {
      //   console.error(error)
      // }

      apiShopMobileUserInfo(sendData).then(res => {
        if (res.code.toString() === "10000") {
          window.sessionStorage.setItem('userData', JSON.stringify(res.data)) // 这个保持跟之前一样。
          this.userData = res.data;
        }
      }).catch(error => {
        this.$toast(error);
      })
    },
    // 点击设置的时候
    handleSetUp(){
      this.$router.push({ name: `SetUp` });
    },
  }
};
</script>

<style lang="less" scoped>
.my {
  background: #f5f8fa;
  margin-bottom: 100px;

  & .teamNuber {
    width: 355px;
    height: 80px;
    background: linear-gradient(
      225deg,
      rgba(247, 222, 176, 1) 0%,
      rgba(247, 195, 153, 1) 100%
    );
    border-radius: 4px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    margin: -36px auto 0;
    & .leftbar {
      width: 177px;
      text-align: center;
      & .name {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(155, 93, 56, 1);
        line-height: 19px;
        margin-top: 15px;
      }
      & .number {
        font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(155, 93, 56, 1);
        line-height: 33px;
      }
    }
    & .centerbar {
      width: 1px;
      height: 30px;
      background: rgba(5, 5, 5, 0.1);
      margin: 26px 0;
    }
    & .rightbar {
      width: 177px;
      text-align: center;
      & .name {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(155, 93, 56, 1);
        line-height: 19px;
        margin-top: 15px;
      }
      & .number {
        font-size: 24px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(155, 93, 56, 1);
        line-height: 33px;
      }
    }
  }

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

  .modalDlg {
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

  &>.title {
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
    text-align: center;
    margin: 15px 0 10px;
  }

  .content {
    height: 68px;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 20px;
    padding: 0 20px;
  }

  .action {
    width: 100%;
    height: 20px;
    display: flex;
    margin-top: 42px;
  }

  .action .leftbar {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #666666;
    height: 20px;
    line-height: 20px;
    border-right: #cccccc 1px solid;
  }

  .action .rightbar {
    flex: 1;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
    color: #d71d34;
    height: 20px;
    line-height: 20px;
  }

  .kefuImage {
    height: 150px;
    width: 270px;
  }

  .kefuCloseBox {
    position: absolute;
    width: 18px;
    height: 18px;
    padding: 5px;
    right: 5px;
    top: 5px;
  }

  .kefuClose {
    width: 18px;
    height: 18px;
    display: block;
  }

  color: #333;
  position: relative;

  & .headerbar {
    width: 375px;
    height: 200px;
    // background: #c61c1c;
    background: url(../../assets/img/member/bg_100@2x.png) no-repeat;
    background-size: 100% 100%;
    & .titleLayout {
      padding-top: 32px;
      text-align: center;
      & .title {
        font-size: 18px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 25px;
      }
      & .rightIcon {
        width: 22px;
        height: 22px;
        background: rgba(255, 255, 255, 1);
        margin-right: 13px;
      }
    }
    & .userInfoLayout {
      margin-top: 35px;
      & .userInfo {
        // width: 140px;
        margin-left: 20px;
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
            color: rgba(255, 255, 255, 1);
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
            color: rgba(255, 255, 255, 1);
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
  }

  // .banner {
  //   width: 375px;
  //   height: 260px;
  //   position: relative;
  //   background: url(../../assets/img/my/head.png) center center no-repeat;
  //   background-size: 100%;

  //   .userInfo {
  //     width: 100%;
  //     height: 95px;
  //     padding-top: 63px;

  //     .img {
  //       width: 56px;
  //       height: 56px;
  //       border-radius: 50%;
  //       margin: 0 auto;
  //       object-fit: cover;
  //     }

  //     .right {
  //       .right-top {
  //         display: flex;
  //         margin-top: 6px;
  //         align-items: center;
  //         justify-content: center;

  //         &__name {
  //           height: 18px;
  //           font-size: 16px;
  //           color: rgba(255, 255, 255, 1);
  //           color: #fff;
  //           font-weight: bold;
  //           margin-right: 6px;
  //           text-align: center;
  //           vertical-align: middle;
  //         }

  //         > img {
  //           height: 16px;
  //           vertical-align: middle;
  //         }
  //       }

  //       .balance {
  //         .top {
  //           padding: 14px 0 2px;
  //           text-align: center;
  //           line-height: 20px;

  //           .first {
  //             display: inline-block;
  //             width: 80px;
  //             height: 1px;
  //             background: rgba(0, 0, 0, 1);
  //             opacity: 0.1;
  //             vertical-align: middle;
  //           }

  //           span {
  //             font-size: 12px;
  //             font-family: PingFangSC-Regular, PingFang SC;
  //             color: rgba(107, 77, 33, 1);
  //             line-height: 19px;
  //             padding: 0 10px;
  //             display: inline-block;
  //           }

  //           p {
  //             line-height: 30px;
  //             font-weight: bold;
  //             font-size: 22px;
  //             color: #6b4d21;
  //             padding: 2px 0 6px;
  //           }

  //           .second {
  //             width: 263px;
  //             height: 1px;
  //             margin: 0 auto;
  //             display: block;
  //             background: rgba(0, 0, 0, 1);
  //             opacity: 0.1;
  //           }
  //         }
  //       }

  //       &__info {
  //         display: flex;
  //         line-height: 18px;
  //         position: absolute;
  //         bottom: 10px;
  //         left: 130px;

  //         > span {
  //           color: #333;
  //           font-size: 12px;
  //           margin-right: 10px;
  //         }

  //         .copy {
  //           width: 14px;
  //           height: 14px;
  //         }
  //       }

  //       .name-act {
  //         line-height: 56px;
  //         color: #fff;
  //         margin-top: 0;
  //         font-weight: bold;
  //       }

  //       .logo-1 {
  //         width: 36px;
  //         padding: 6px 0;
  //       }

  //       .logo-2 {
  //         width: 39px;
  //         padding: 6px 0;
  //       }

  //       .logo-3 {
  //         width: 49px;
  //         padding: 6px 0;
  //       }
  //     }
  //   }
  // }

  .order {
    padding: 10px 10px 0;

    &__top {
      background: #fff;

      > li {
        display: flex;
        padding: 0 15px;
        line-height: 40px;
        position: relative;
        border-bottom: 1px solid #f2f2f2;
        justify-content: space-between;

        > p {
          display: flex;
        }

        .right {
          color: #ccc;
          font-size: 12px;
          margin-top: 12px;
        }
      }
    }

    &__box {
      display: flex;
      padding: 0 30px;
      background: #fff;

      li {
        width: 36px;
        height: 36px;
        padding: 18px 0 36px;
        margin-right: 43px;
        flex: 4;
        text-align: center;
        position: relative;

        > img {
          width: 36px;
          height: 36px;
          margin: 0 auto;
        }

        p {
          width: 36px;
          font-size: 12px;
          line-height: 16px;
        }

        .bedeck {
          min-width: 14px;
          height: 14px;
          line-height: 15px;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
          border-radius: 10px;
          padding: 2px;
          color: #fff;
          position: absolute;
          right: -4px;
          top: 12px;
          background: rgba(255, 69, 69, 1);
          border: 1px solid rgba(255, 255, 255, 1);
        }
      }

      li:nth-last-child(1) {
        margin-right: 0;
      }
    }
  }
  & .list {
    // height: 192px;
    min-height: 192px;
    // margin-top: ;
    // display: flex;
    margin: 11px 10px 0;

    background: #fff;
    width: 355px;
    
    &>.title {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 16px;
      padding-top: 12px;
      padding-left: 15px;
    }

    ul {
      border-radius: 6px;
      box-shadow: 0px 7px 7px -6px rgba(0, 0, 0, 0.2);
      padding-bottom: 32px;

      li {
        float: left;
        margin: 32px 32px 0 0;
        text-align: center;
        position: relative;

        img {
          width: 40px;
          height: 40px;
          margin: 0 auto;
        }

        span {
          font-size:13px;
          font-family:PingFangSC-Regular,PingFang SC;
          font-weight:400;
          color:rgba(51,51,51,1);
          line-height:18px;
          margin-top: 12px;
          display: inline-block;
        }
        .description {
          font-size: 10px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 12px;
          // width: 48px;
        }

        .bedeck {
          color: #999;
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFang SC;
        }
      }
      li:last-child {
        margin-right: 0;
      }

      li:nth-child(4n + 1) {
        padding-left: 26px;
      }

      li:nth-child(4n) {
        margin-right: 0;
      }
    }
  }

  .sign-out {
    width: 335px;
    margin: 0 auto;
    margin-top: 10px;

    img {
      width: 335px;
    }
  }

  .tenth {
    padding: 24px 0 2px !important;
  }

  .eleven {
    margin-top: 10px !important;
  }

  /deep/ .van-icon-arrow::before {
    content: "\F00A";
    font-size: 14px;
    font-weight: bold;
    margin: 0px -2px 0 0;
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
