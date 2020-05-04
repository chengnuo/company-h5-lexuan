<template>
  <div class="countyStore">
    <div>
      <div class="bg"></div>
      <!-- <div>活动已经结束</div> -->

      <div class="banner">
        <img src="../../../assets/act/countyStore/act-banner1.png" />
      </div>
      <!-- v-if="activityStatusObj.isOpen=='0'" -->
      <div>
        <van-tabs v-model="type">
          <van-tab title="参与活动"
                  name="1">
            <div class="tab1">
              <div class="img">
                <img src="../../../assets/act/countyStore/act-banner2.png" />
              </div>
              <div class="desc">
                县级店一次订购1箱幸福精油，即可获赠1箱幸福精油及12个价值1390的卡西欧正版G-SHOCK黑玫瑰金手表礼品。
              </div>
              <div class="getPackage">
                <!-- :disabled="activityStatusObjIsOk" -->
                <van-button type="default"
                            class="getPackageBtn"
                            @click="handleGetPackage"
                            :disabled="activityStatusObjIsOk">参与活动</van-button>
              </div>
              <div class="lookDetail"
                  @click="handleLookDetail">
                查看详细规则 >
              </div>
            </div>
          </van-tab>
          <van-tab title="邀请用户"
                  name="2">
            <div class="tab2">
              <div class="countLayout">
                <div class="desc">当前礼品数量(个)</div>
                <div class="num">{{giftListObj.giftNumber}}</div>
              </div>
              <div class="itemsLayout">
                <div class="items"
                    v-for="(item, index) in giftListObj.items"
                    :key="index">
                  <span class="item item1">
                    <img v-if="item.headImgUrl"
                        :src="item.headImgUrl" />
                    <img v-else
                        src="../../../assets/act/countyStore/people.png" />
                  </span>
                  <span class="item item2">
                    {{userData.id == item.fromUserId ? '' : '成功邀请'}}
                  </span>
                  <span class="item item3">
                    {{userData.id == item.fromUserId ? '你' : item.nickname}}
                  </span>
                  <span class="item item4">
                    {{item.content}}
                  </span>
                </div>
                <!-- <div class="items" v-for="(item, index) in giftListObj.items"
                              :key="index">
                  <span class="item item1">
                    <img src="../../../assets/act/countyStore/people.png" />
                  </span>
                  <span class="item item2">
                    成功邀请
                  </span>
                  <span class="item item3">
                    张智宇
                  </span>
                  <span class="item item4">
                    购买5盒精油
                  </span>
                </div> -->
              </div>
              <div class="userHistory"
                  @click="handleUserHistory">
                使用记录 >
              </div>
              <div class="desc">
                礼品使用规则：公司赠送的1箱幸福精油和6个活动礼品须由VIP下单至公司待发货，等销售完公司赠送的1箱幸福精油和6个活动礼品后，县级店可通过【活动礼品提货】一次性提走剩余的6个活动礼品。
              </div>
              <div class="newUser">
                <van-button type="default"
                            class="newUserBtn"
                            @click="handleNewUser"
                            :disabled="activityStatusObjIsOk">邀请用户购买</van-button>
              </div>
              <!-- :disabled="activityStatusObjIsPick" -->
              <div class="eventGiftPickUp">
                <van-button type="default"
                            class="eventGiftPickUpBtn"
                            @click="handleEventGiftPickUp"
                            :disabled="activityStatusObjIsPick"
                            >活动礼品提货</van-button>
              </div>
              <div class="lookDetail"
                  @click="handleLookDetail">
                查看详细规则 >
              </div>
            </div>
          </van-tab>
        </van-tabs>

        <!-- <van-dialog
          v-model="show"
          title=" "
          show-cancel-button
        >
          县级店一次订购1箱幸福精油，即可获赠1箱幸福精油及12个价值1390的卡西欧正版G-SHOCK黑玫瑰手表礼品。
        </van-dialog> -->

        <!-- 微信h5支付成功 -->
        <van-dialog v-model="show"
                    title="县级店一次订购1箱幸福精油，即可获赠1箱幸福精油及12个价值1390的卡西欧正版G-SHOCK黑玫瑰手表礼品。"
                    class="showH5"
                    :show-confirm-button="false">
                    <div class="showH5Content">
                      <van-button type="default"
                                  class="showH5failBtn"
                                  @click="handleGetPackageDialogCannel">取消</van-button>
                      <van-button type="default"
                                  class="showH5SuccessBtn"
                                  @click="handleGetPackageDialogOk">去进货</van-button>
                      <div class="showH5Line"></div>
                    </div>
        </van-dialog>
      </div>
    </div>
    
    <PreLoading v-if="loading" class="myloading" />
    <goBack/>
  </div>
</template>

<script>
import { Toast } from 'vant'
import goBack from '@/components/goBack';
import commonJs from '@/util/common'
import { giftList, activityStatus, cartGetGift } from '@/api/act/countyStore'
import { apiMobileCommonValue, apiBaseGoodsList } from '@/api/goods'
import { apiMobileUserInfo } from '@/api/home'

import PreLoading from '../../../components/preLoading'

export default {
  name: 'countyStore',

  components: {
    PreLoading,
    goBack
  },

  data() {
    return {
      value: '',
      type: '1',
      activityStatusObj: {
        isOk: '0',
        isPick: '0',
        isOpen: '0',
      },
      giftListObj: {},
      show: false,
      cartGetGiftObj: {},
      activityStatusObjIsOk: true,
      activityStatusObjIsPick: true,
      loading: false,
      userData: {
        id: '',
        userToken: '',
      },
    };
  },
  // computed:{
  //   // 是否开启活动和邀请用户购买
  //   activityStatusObjIsOk(){
  //     let result = false;
  //     if(this.activityStatusObj.isOpen==0){
  //       result = true;
  //     }else if(this.activityStatusObj.isOk==0){
  //       result = true;
  //     }
  //     return result
  //   },
  //   // 是否开启活动礼品提货
  //   activityStatusObjIsPick(){
  //     let result = false;
  //     if(this.activityStatusObj.isOpen==0){
  //       result = true;
  //     }else if(this.activityStatusObj.isPick==0){
  //       result = true;
  //     }
  //     return result
  //   },
  // },
  mounted() {
    commonJs.outSideShare();
    let query = this.$route.query
    if (query.type) {
      this.type = query.type || 1
    }
    let sendData = {}
    let token = this.$route.query && this.$route.query.token || ''
    if (token) {
      window.sessionStorage.setItem('userData', JSON.stringify({
        userToken: token
      })) // 这个保持跟之前一样。
      // const res = await this.$post(this.$api.homeUserInfo, sendData)
      apiMobileUserInfo(sendData).then((res) => {
        if (res.code.toString() === '10000') {
          // this.loading = false;
          window.sessionStorage.setItem('userData', JSON.stringify(res.data)) // 这个保持跟之前一样。
          this.userData = res.data;
        } else {
          // this.$toast(res.msg) // 请登录
          // this.loading = false;
        }
      }).catch((error) => {
        Toast.fail(error)
        // this.loading = false;
      })
      this.apiActivityStatus();
      this.apiGiftList();

      commonJs.setDocumentTitle('“惠”聚幸福，感恩钜献');
    } else {
      Toast.fail('没有可用的token')
    }
  },
  methods: {
    // // 活动是否开启
    // activityStatusObjIsOk(){
    //   // activityStatusObj: {
    //   //   isOk: '0',
    //   //   isPick: '0',
    //   //   isOpen: '0',
    //   // },
    //   if(this.activityStatusObj.isOpen==0){
    //     return true
    //   }else if(this.activityStatusObj.isOk==0){
    //     return true
    //   }

    //   return true
    // },
    // 活动资格
    apiActivityStatus() {
      let filterData = {}
      this.loading = true;
      activityStatus(filterData).then((res) => {
        this.loading = false;
        if(res.code.toString()==='10000'){
          // this.activityStatusObj = res.data;

          // let res = {
          //   data:{
          //     "isOpen": 1,
          //     "isOk": 1,
          //     "isPick": 1
          //   }
          // }

          if(res.data.isOpen==0){
            this.activityStatusObjIsOk = true;
          }else if(res.data.isOk==0){
            this.activityStatusObjIsOk = true;
          }else{
            this.activityStatusObjIsOk = false;
          }

          if(res.data.isOpen==0){
            this.activityStatusObjIsPick = true;
          }else if(res.data.isPick==0){
            this.activityStatusObjIsPick = true;
          }else{
            this.activityStatusObjIsPick = false;
          }
          
          if (res.data.isOpen == 0) {
            Toast.fail('活动已经结束')
          }
        }else{
          this.activityStatusObjIsOk = true;
          this.activityStatusObjIsPick = true;
          Toast.fail(res.msg)
        }
        
      }).catch((error) => {
        this.activityStatusObjIsOk = true;
        this.activityStatusObjIsPick = true;
        this.loading = false;
        Toast.fail(error)
      })
    },
    // 礼包记录-这里写死2，展示最新的2个
    apiGiftList() {
      let filterData = Object.assign({}, {
        page: 1,
        limit: 2,
      })
      giftList(filterData).then((res) => {
        if(res.code.toString()==='10000'){
          this.giftListObj = res.data;
        }else{
          Toast.fail(res.msg)
        }
      }).catch((error) => {
        Toast.fail(error)
      })
    },
    // 礼包提取
    apiCartGetGift() {
      let filterData = {}
      cartGetGift(filterData).then((res) => {
        console.log('res', res)
        if(res.code.toString()==='10000'){
          commonJs.openConfirmOrder(res.data)
        }else{
          Toast.fail(res.msg)
        }
      }).catch((error) => {
        console.log('error', error)
        Toast.fail(error)
      })
    },
    // 获取礼包
    handleGetPackage() {
      this.show = true;
    },
    // 确认1
    handleGetPackageDialogOk() {
      // this.apiMobileCommonValue((res) => {
      //   this.show = false;
      //   commonJs.openGoodDetail("1")
      // })
      this.apiBaseGoodsList((res) => {
        this.show = false;
        let data = res.data.items.map((item)=>{
            if(item.goodsType=='0'){
              return item.id
            }
          })[0] || '';
          console.log('data', data)
        commonJs.openGoodDetail(data)
      })
    },
    // 取消
    handleGetPackageDialogCannel() {
      this.show = false;
    },
    // 邀请用户购买
    handleNewUser() {
      // this.show = true;
      commonJs.openInviteFriend(this.userData);
    },
    // 活动礼品提货
    handleEventGiftPickUp() {
      // this.show = true;
      this.apiCartGetGift()
    },
    // 获取商品id
    apiMobileCommonValue(callback) {

      // const res = await this.$post(this.$api.goodsDetailGetDetail, data)
      apiMobileCommonValue({}).then(res => {
        if (res.code.toString() === '10000') {
          callback && callback(res);
        } else {
          console.log(res)
          Toast.fail(res.msg)
        }
      }).catch(error => {
        console.log(error)
        Toast.fail(error)
      })

    },
    // 查看详情规则
    handleLookDetail() {
      var path = commonJs.config.prefixH5Url + '/act/countyStore/rule'
      commonJs.openNewWebView(path)
    },
    // 使用记录1
    handleUserHistory() {
      const userData = JSON.parse(sessionStorage.getItem('userData')) || {}
      if(userData && userData.userToken){
        var path = commonJs.config.prefixH5Url + '/act/countyStore/record?token=' + userData.userToken + '&userId=' + userData.id
        commonJs.openNewWebView(path)
      }
    },
    apiBaseGoodsList(callback){
      apiBaseGoodsList({
        row: 10,
        pageDepend: '',
      }).then(res => {
        if (res.code.toString() === '10000') {
          callback && callback(res);
        } else {
          console.log(res)
          Toast.fail(res.msg)
        }
      }).catch(error => {
        console.log(error)
        Toast.fail(error)
      })
    },
  }
}

</script>
<style scoped lang="less">
.countyStore {
  .bg {
    position: absolute;
    height: 100%;
    background: #fff;
    width: 100%;
    z-index: -1;
  }
  .banner {
    width: 375px;
    height: 160px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  /deep/ .van-tabs {
    background: #fff;
  }
  /deep/ .van-tabs__line {
    background-color: #09c2da;
    width: 50% !important;
  }
  /deep/ .van-tab {
    // height: 50px;
    font-size: 16px;
    color: #999;
    height: 50px;
    line-height: 50px;
  }
  /deep/ .van-tab--active {
    color: #09c2da;
  }
  /deep/ .van-tabs__wrap {
    height: 50px;
    line-height: 50px;
  }
  .tab1 {
    padding: 15px;
    .img {
      // padding: 20px 20px 0 20px;
      padding: 0 0 0 0;
      width: 335px;
      height: 140px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .desc {
      // margin: 10px 20px 15px 20px;
      margin: 10px 0 15px 0;
      color: #333333;
    }
    .getPackage {
      // padding: 0 20px 0 20px;
    }
    .getPackageBtn {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      width: 100%;

      background: linear-gradient(
        225deg,
        rgba(10, 211, 238, 1) 0%,
        rgba(10, 190, 213, 1) 100%
      );
      border-radius: 2px;
    }
    .lookDetail {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(9, 194, 218, 1);
      line-height: 20px;
      text-align: center;
      margin-top: 15px;
    }
    /deep/ .van-button--disabled{
      background:linear-gradient(225deg,rgba(241,241,241,1) 0%,rgba(220,220,220,1) 100%);
      color: #B8B8B8;
    }
  }
  .tab2 {
    padding: 15px;
    .countLayout {
      text-align: center;
      .desc {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 18px;
        margin-top: 15px;
      }
      .num {
        font-size: 30px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(71, 217, 171, 1);
        line-height: 32px;
        margin-top: 10px;
      }
    }
    .itemsLayout {
      margin-top: 20px;
    }
    .items {
      background: rgba(244, 255, 255, 1);
      border-radius: 5px;
      margin-top: 10px;
      .item {
        display: inline-block;
        vertical-align: middle;
        padding: 10px 0;
        height: 30px;
        line-height: 30px;

        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .item1 {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-left: 10px;

        img {
          width: 100%;
          height: 100%;
        }
      }
      .item2 {
        margin-left: 10px;
      }
      .item3 {
        margin-left: 5px;
        font-weight: bold;
      }
      .item4 {
        margin-left: 5px;
      }
    }
    .userHistory {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(9, 194, 218, 1);
      line-height: 20px;
      margin-top: 15px;
      text-align: center;
    }
    .desc {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
      margin-top: 50px;
    }
    .newUser {
      // padding: 0 20px 0 20px;
      margin-top: 15px;
    }
    .newUserBtn {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      width: 100%;

      background: linear-gradient(
        225deg,
        rgba(10, 211, 238, 1) 0%,
        rgba(10, 190, 213, 1) 100%
      );
      border-radius: 2px;
    }
    .eventGiftPickUp {
      // padding: 0 20px 0 20px;
      margin-top: 20px;
    }
    .eventGiftPickUpBtn {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 22px;
      width: 100%;

      background: linear-gradient(
        225deg,
        rgba(28, 250, 174, 1) 0%,
        rgba(30, 211, 166, 1) 100%
      );
      border-radius: 2px;
    }
    .lookDetail {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(9, 194, 218, 1);
      line-height: 20px;
      text-align: center;
      margin-top: 15px;
    }
    /deep/ .van-button--disabled{
      background:linear-gradient(225deg,rgba(241,241,241,1) 0%,rgba(220,220,220,1) 100%);
      color: #B8B8B8;
    }
  }

  .showH5 {
    width: 230px;
    border-radius: 0;
    .showH5Content{
      position: relative;
      .showH5Line{
        width: 1px;
        height: 12px;
        background:rgba(204,204,204,1);
        position: absolute;
        left: 50%;
        top: 15px;
      }
    }
    /deep/ .van-dialog__header {
      padding: 20px;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 20px;
    }
    .showH5SuccessBtn {
      width: 49%;
      display: inline-block;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: #09C2DA;
      line-height: 20px;
    }
    .showH5failBtn {
      width: 49%;
      display: inline-block;
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      line-height: 20px;
      color: #999999;
    }
    
  }


  .myloading{
    background: #fff;
    opacity: 0.3;
  }
  
}
</style>  
