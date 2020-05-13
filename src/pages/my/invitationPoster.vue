<template>
  <div class="invitationPoster">
    <div class="bg"></div>
    <van-tabs v-model="activeName" @click="onClickTabs">
      <van-tab title="邀请好友"
               name="zero">
        <div class="vipLayout clearfix">
          <div id="canvas"></div>
          <div class="userInfo">
            <img v-if="userData.headImgUrl"
                 :src="userData.headImgUrl"
                 class="img" />
            <img v-else
                 src="../../assets/act/countyStore/people.png"
                 class="img" />
            <span class="nickname">{{formatName(userData.nickname)}}</span>
          </div>
          <div class="QRcodeInfo">
            <div class="QRcode">
              <img v-if="zeroQRCode"
                   :src="zeroQRCode"
                   class="img" />
            </div>
            <div class="descript">扫码购买</div>
          </div>
          <img :src="userIndex.inviteFriendImage" />
          <div class="photoFooter clearfix">
            <div class="leftbar clearfix"
                 @click="handleSharePhoto">
              <img class="img"
                   src="../../assets/act/tongzhi@2x.png" />
              <span class="text">分享图片</span>
            </div>
            <div class="centerbar"></div>
            <div class="rightbar clearfix"
                 @click="handleSavePhoto">
              <img class="img"
                   src="../../assets/act/tongzhi@2x (1).png" />
              <span class="text">保存图片</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="邀请VIP"
               name="one"  v-if="userData.ptLevel>=1">
        <div class="xjdLayout">
          <div class="userInfo">
            <img v-if="userData.headImgUrl"
                 :src="userData.headImgUrl"
                 class="img" />
            <img v-else
                 src="../../assets/act/countyStore/people.png"
                 class="img" />
            <span class="nickname">{{formatName(userData.nickname)}}</span>
          </div>
          <div class="QRcodeInfo">
            <div class="QRcode">
              <img v-if="oneQRCode"
                   :src="oneQRCode"
                   class="img" />
            </div>
            <div class="descript">扫码购买</div>
          </div>
          <div class="buyInviteCode">购买邀请码:{{userData.inviteCode}}11</div>
          <img :src="userIndex.inviteVipImage" />
          <div class="photoFooter clearfix">
            <div class="leftbar clearfix"
                 @click="handleSharePhoto">
              <img class="img"
                   src="../../assets/act/tongzhi@2x.png" />
              <span class="text">分享图片</span>
            </div>
            <div class="centerbar"></div>
            <div class="rightbar clearfix"
                 @click="handleSavePhoto">
              <img class="img"
                   src="../../assets/act/tongzhi@2x (1).png" />
              <span class="text">保存图片</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="邀请店长"
               name="two" v-if="userData.ptLevel>=2">
        <div class="xjdLayout">
          <div class="userInfo">
            <img v-if="userData.headImgUrl"
                 :src="userData.headImgUrl"
                 class="img" />
            <img v-else
                 src="../../assets/act/countyStore/people.png"
                 class="img" />
            <span class="nickname">{{formatName(userData.nickname)}}</span>
          </div>
          <div class="QRcodeInfo">
            <div class="QRcode">
              <img v-if="twoQRCode"
                   :src="twoQRCode"
                   class="img" />
            </div>
            <div class="descript">扫码购买</div>
          </div>
          <div class="buyInviteCode">购买邀请码:{{userData.inviteCode}}22</div>
          <img :src="userIndex.inviteDianZhangImage" />
          <div class="photoFooter clearfix">
            <div class="leftbar clearfix"
                 @click="handleSharePhoto">
              <img class="img"
                   src="../../assets/act/tongzhi@2x.png" />
              <span class="text">分享图片</span>
            </div>
            <div class="centerbar"></div>
            <div class="rightbar clearfix"
                 @click="handleSavePhoto">
              <img class="img"
                   src="../../assets/act/tongzhi@2x (1).png" />
              <span class="text">保存图片</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="邀请总监"
               name="three" v-if="userData.ptLevel>=3">
        <div class="xjdLayout">
          <div class="userInfo">
            <img v-if="userData.headImgUrl"
                 :src="userData.headImgUrl"
                 class="img" />
            <img v-else
                 src="../../assets/act/countyStore/people.png"
                 class="img" />
            <span class="nickname">{{formatName(userData.nickname)}}</span>
          </div>
          <div class="QRcodeInfo">
            <div class="QRcode">
              <img v-if="threeQRCode"
                   :src="threeQRCode"
                   class="img" />
            </div>
            <div class="descript">扫码购买</div>
          </div>
          <div class="buyInviteCode">购买邀请码:{{userData.inviteCode}}33</div>
          <img :src="userIndex.inviteZongjianImage" />
          <div class="photoFooter clearfix">
            <div class="leftbar clearfix"
                 @click="handleSharePhoto">
              <img class="img"
                   src="../../assets/act/tongzhi@2x.png" />
              <span class="text">分享图片</span>
            </div>
            <div class="centerbar"></div>
            <div class="rightbar clearfix"
                 @click="handleSavePhoto">
              <img class="img"
                   src="../../assets/act/tongzhi@2x (1).png" />
              <span class="text">保存图片</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="邀请合伙人"
               name="four" v-if="userData.ptLevel>=4">
        <div class="xjdLayout">
          <div class="userInfo">
            <img v-if="userData.headImgUrl"
                 :src="userData.headImgUrl"
                 class="img" />
            <img v-else
                 src="../../assets/act/countyStore/people.png"
                 class="img" />
            <span class="nickname">{{formatName(userData.nickname)}}</span>
          </div>
          <div class="QRcodeInfo">
            <div class="QRcode">
              <img v-if="fourQRCode"
                   :src="fourQRCode"
                   class="img" />
            </div>
            <div class="descript">扫码购买</div>
          </div>
          <div class="buyInviteCode">购买邀请码:{{userData.inviteCode}}44</div>
          <img :src="userIndex.inviteHehuorenImage" />
          <div class="photoFooter clearfix">
            <div class="leftbar clearfix"
                 @click="handleSharePhoto">
              <img class="img"
                   src="../../assets/act/tongzhi@2x.png" />
              <span class="text">分享图片</span>
            </div>
            <div class="centerbar"></div>
            <div class="rightbar clearfix"
                 @click="handleSavePhoto">
              <img class="img"
                   src="../../assets/act/tongzhi@2x (1).png" />
              <span class="text">保存图片</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="邀请联创"
               name="five" v-if="userData.ptLevel>=5">
        <div class="xjdLayout">
          <div class="userInfo">
            <img v-if="userData.headImgUrl"
                 :src="userData.headImgUrl"
                 class="img" />
            <img v-else
                 src="../../assets/act/countyStore/people.png"
                 class="img" />
            <span class="nickname">{{formatName(userData.nickname)}}</span>
          </div>
          <div class="QRcodeInfo">
            <div class="QRcode">
              <img v-if="fiveQRCode"
                   :src="fiveQRCode"
                   class="img" />
            </div>
            <div class="descript">扫码购买</div>
          </div>
          <div class="buyInviteCode">购买邀请码:{{userData.inviteCode}}55</div>
          <img :src="userIndex.inviteLianChuangImage" />
          <div class="photoFooter clearfix">
            <div class="leftbar clearfix"
                 @click="handleSharePhoto">
              <img class="img"
                   src="../../assets/act/tongzhi@2x.png" />
              <span class="text">分享图片</span>
            </div>
            <div class="centerbar"></div>
            <div class="rightbar clearfix"
                 @click="handleSavePhoto">
              <img class="img"
                   src="../../assets/act/tongzhi@2x (1).png" />
              <span class="text">保存图片</span>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <!-- 分享弹出层 -->
    <div class="shareDialogLayout" v-if="shareDialogVisibled" @click="handleCloseShareDialog">
      <div class="shareDialog"></div>
      <div class="moreImg">
        <img src="../../assets/act/rhfx@2x.png" />
      </div>
    </div>

    <goBack class="invitationPosterGoBack" />

    <PreLoading v-if="loading" class="myloading" />

  </div>
</template>

<script>
import commonJs from '@/util/common'
import Vue from 'vue';
// import { apiUserIndex } from '@/api/my'
import { Toast } from 'vant'
// import { apiMobileUserInfo } from '@/api/home'
import { Dialog } from 'vant';

import goBack from '@/components/goBack';
import PreLoading from '../../components/preLoading'

import { myMobileUserInfo, apiUserIndex, goodsDetailGetList, goodsDetailGetDetail } from '@/api/my'


var QRCode = require('qrcode')

export default {
  name: 'invitationPoster',

  components: {
    goBack,
    PreLoading
  },

  data() {
    return {
      activeName: 'vip',
      userIndex: {},
      userData: {
        id: '',
        userToken: '',
        ptLevel: 0,
      },
      vipQRCode: '',
      xjdQRCode: '',
      shareDialogVisibled: false,
      loading: false,
      goodsDetail: {
        sideName: '',
      },
      skuImage: '', // 图片url
      zeroQRCode: '', // 第0个二维码
      oneQRCode: '', // 第1个二维码
      twoQRCode: '', // 第2个二维码
      threeQRCode: '', // 第3个二维码
      fourQRCode: '', // 第4个二维码
      fiveQRCode: '', // 第5个二维码
      // sixQRCode: '', // 第6个二维码
    };
  },
  mounted() {
    // commonJs.outSideShare();1212311
    if (this.$route.query.type) {
      this.activeName = this.$route.query.type || 'vip'
    }
    if (this.$route.query.show==1) {
      this.shareDialogVisibled = true
    }
    

    
    let token = this.$route.query && this.$route.query.token || ''
    if (token) {
      window.sessionStorage.setItem('userData', JSON.stringify({
        userToken: token
      })) // 这个保持跟之前一样。
      // const res = await this.$post(this.$api.homeUserInfo, sendData)
      // apiMobileUserInfo(sendData).then((res) => 
      this.apiUserIndex();
      this.initUserInfo();

      this.apiGoodsDetailGetList((res) => {
        console.log('res', res)
        let resData = res && res.data && res.data.items && res.data.items.length > 0 && res.data.items[0].id || ''
        this.apiGoodsDetail({
          id: resData,
        }) // 获取详情
        
      })
      
      
    } else {
      Toast('没有可用的token')
    }

   
    

  },
  methods: {

    // 关闭分享图片
    handleCloseShareDialog(){
      this.shareDialogVisibled = false;
    },
    // 分享图片
    handleSharePhoto() {
      this.shareDialogVisibled = true;
    },
    // 保存图片
    handleSavePhoto() {

      Dialog.alert({
        // title: '标题',
        message: '网页端暂不支持保存图片，请截屏后分享好友。'
      }).then(() => {
        // on confirm
      })

    },
    // 个人信息
    initUserInfo(){
      // try {
        let sendData = {}
        
        // const res = await this.$post(this.$api.myMobileUserInfo, sendData)

        this.loading = true;

        myMobileUserInfo(sendData).then((res)=>{

          if (res.code.toString() === '10000') {
            this.loading = false;
            // this.loading = false;
            window.sessionStorage.setItem('userData', JSON.stringify(res.data)) // 这个保持跟之前一样。
            this.userData = res.data;
            QRCode.toDataURL(`${commonJs.config.baseZhuanboUrl}/goodDetail?inviteCode=${this.userData.inviteCode}`, (err, url) => {
              this.zeroQRCode = url
            })
            QRCode.toDataURL(`${commonJs.config.baseZhuanboUrl}/becomeServiceProvider2?inviteCode=${this.userData.inviteCode}&buyInviteCode=${this.userData.inviteCode}11`, (err, url) => {
              this.oneQRCode = url // vip
            })
            QRCode.toDataURL(`${commonJs.config.baseZhuanboUrl}/becomeServiceProvider2?inviteCode=${this.userData.inviteCode}&buyInviteCode=${this.userData.inviteCode}22`, (err, url) => {
              this.twoQRCode = url // dianzhang
            })
            QRCode.toDataURL(`${commonJs.config.baseZhuanboUrl}/becomeServiceProvider2?inviteCode=${this.userData.inviteCode}&buyInviteCode=${this.userData.inviteCode}33`, (err, url) => {
              this.threeQRCode = url // zongjian
            })
            QRCode.toDataURL(`${commonJs.config.baseZhuanboUrl}/becomeServiceProvider2?inviteCode=${this.userData.inviteCode}&buyInviteCode=${this.userData.inviteCode}44`, (err, url) => {
              this.fourQRCode = url // hehuoren
            })
            QRCode.toDataURL(`${commonJs.config.baseZhuanboUrl}/becomeServiceProvider2?inviteCode=${this.userData.inviteCode}&buyInviteCode=${this.userData.inviteCode}55`, (err, url) => {
              this.fiveQRCode = url // lianchuang
            })
          } else {
            // this.$toast(res.msg) // 请登录
            this.loading = false;
          }

        }).catch(error=>{
          this.loading = false;
          console.log('error', error)
          Toast(error)
        })
      
        
      // } catch (error) {
      //   this.loading = false;
      //   console.log('error', error)
      //   Toast(error)
      // }
    },
    // 图片11
    apiUserIndex() {

      const data = Object.assign({})
      this.loading = true;
      
      apiUserIndex(data).then(res => {
      // try {
        // const res = await this.$post(this.$api.myUserIndex, data)
        if (res.code.toString() === '10000') {
          this.userIndex = res.data
          this.loading = false;

        } else {
          Toast(res.msg)
          this.loading = false;
        }
      }).catch(error => {
           this.loading = false;
        Toast(error)
      })
      // } catch (error) {
      //   this.loading = false;
      //   Toast(error)
      // }
    },
    formatName(str) {
      let formatStr = str || ''
      // let formatStr = ''

      // if (formatStr.length >= 2) {
      //   let arr = formatStr.split('');
      //   arr[arr.length - 2] = '*'
      //   return arr.join('');
      // } else {
      //   return formatStr
      // }

      if (/^[0-9]+$/.test(formatStr)) {//这是用正则表达是检查
        let length = formatStr.length;
        if (length>=4){

          let numstr = formatStr.substring(Math.round(formatStr.length / 2) + 1, formatStr.length)


          formatStr = formatStr.substring(0, (formatStr.length / 2)-2) + '****' + numstr


        }else{
          formatStr = '****'
        }

        
      } else {

        let str = formatStr.substring(formatStr.length - 1, formatStr.length);

        formatStr = formatStr.substring(0, formatStr.length - 2) + '*' + str
        
      }

      return formatStr


      // return formatStr.substr(0, 2) + '***' + formatStr.substr(5, formatStr.split('').length);;
    },

    // 分享面膜1
    wxShareFacialMask() {
      let userData = JSON.parse(window.sessionStorage.getItem('userData')) || {}
      let inviteCode = userData.inviteCode || this.$route.query.inviteCode || ''

      let self = this;

      

      // alert(JSON.stringify(userData))
      
      // commonJs.outSideShare({
      //   title: '幸福引力',
      //   desc: `专业的直播带货平台`,
      //   link: `${commonJs.getUrl()}/goodDetail?inviteCode=${inviteCode}`,
      //   img: `${commonJs.getUrl()}/static/logo.png`
      // })

      console.log(`self.goodsDetail.sideName`, self.goodsDetail.sideName)
      console.log(`self.goodsDetail.skuImage`, self.skuImage)

      commonJs.outSideShare({
        title: `幸福引力`,
        desc: `${self.goodsDetail.sideName?self.goodsDetail.sideName:'专业的直播带货平台'}`,
        link: `${commonJs.getUrl()}/goodDetail?inviteCode=${inviteCode}`,
        img: `${self.skuImage}`
      })
    },
    // 分享服务商
    wxShareBecomeServiceProvider(type) {
      let userData = JSON.parse(window.sessionStorage.getItem('userData')) || {}
      let inviteCode = userData.inviteCode || this.$route.query.inviteCode || ''
      let typeFormat = type || '11'
      
      commonJs.outSideShare({
        title: '幸福引力',
        desc: `专业的直播带货平台`,
        link: `${commonJs.getUrl()}/becomeServiceProvider2?inviteCode=${this.userData.inviteCode}&buyInviteCode=${this.userData.inviteCode}${typeFormat}`,
        img: `${commonJs.getUrl()}/static/logo.png`
      })
    },
    // 点击tabs
    onClickTabs(target){
      console.log(`target`, target)
      if(target == 'zero'){
        this.wxShareFacialMask(); // 分享面膜
      }else if(target == 'one'){
        this.wxShareBecomeServiceProvider('11'); // vip
      }else if(target == 'two'){
        this.wxShareBecomeServiceProvider('22'); // 
      }else if(target == 'three'){
        this.wxShareBecomeServiceProvider('33'); // 
      }else if(target == 'four'){
        this.wxShareBecomeServiceProvider('44'); // 
      }else if(target == 'five'){
        this.wxShareBecomeServiceProvider('55'); // 
      }
    },

    // 获取商品列表
    apiGoodsDetailGetList(callback) {
      const data = Object.assign({})

      // const res = await this.$post(this.$api.goodsDetailGetList, data)
      // try {
      goodsDetailGetList(data).then((res)=>{
        if (res.code.toString() === '10000') {
          this.goodsDetailGetList = res.data.items;
          callback && callback(res)
        } else {
          Toast(res.msg)
        }
      }).catch(error=>{
        Toast(error)
      })
        
      // } catch (error) {
      //   console.log('error', error)
      //   Toast(error)
      // }
    },
    // 商品详情 - http://showdoc.sys.jxblot.com/web/#/3?page_id=76
    apiGoodsDetail(obj) {
      var data = Object.assign({}, {
        // id: parseInt(this.$route.params.id)
      }, obj)
      // const res = await this.$post(this.$api.goodsDetailGetDetail, data)
      goodsDetailGetDetail(data).then((res)=>{
        if (res.code.toString() === '10000') {
          this.goodsDetail = Object.assign({}, res.data) // 获取数据
          var skuImage = null;
          console.log('skuImage1')
          let isskuImage = this.goodsDetail.attributes && this.goodsDetail.attributes[0].specifications[0].length > 0 && this.goodsDetail.attributes[0].specifications[0].url
          if (isskuImage) {
            skuImage = this.goodsDetail.attributes[0].specifications[0].url
          } else {
            skuImage = this.goodsDetail.coverImages[0];
          }
          if (skuImage) {
            this.skuImage = skuImage;
          }

          this.$nextTick(()=>{
            this.wxShareFacialMask(); // 一开始分享面膜
          })

          
        } else {
          Toast(res.msg)
        }
      }).catch(error=>{
        Toast(error)
      })
    },

  }
}

</script>
<style scoped lang="less">
.invitationPoster {
  /deep/ .van-tabs {
    // background: #fff;
  }
  /deep/ .van-tabs__line {
    background-color: #D71D34;
    // width: 50% !important;
  }
  /deep/ .van-tab {
    // height: 50px;
    font-size: 16px;
    color: #999;
    height: 50px;
    line-height: 50px;
    flex: none;
    padding: 0 20px;
    flex-basis: inherit !important;
  }

  /deep/ .van-tab--active {
    color: #D71D34;
  }
  /deep/ .van-tabs__wrap {
    height: 50px;
    line-height: 50px;
  }
  /deep/ .van-tabs__nav {
    background: #fff;
  }
  /deep/ .van-hairline--top-bottom:after {
    border-width: 0;
  }
  img {
    width: 100%;
  }

  .vipLayout {
    padding: 38px;
    background: #333;
    position: relative;

    .userInfo {
      color: #fff;
      position: absolute;
      left: 53px;
      top: 59px;
      .img {
        width: 36px;
        height: 36px;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .nickname {
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 21px;
        float: left;
        margin-left: 10px;
        margin-top: 4px;
      }
    }
    .QRcodeInfo {
      position: absolute;
      left: 255px;
      top: 365px;
      .QRcode {
        width: 60px;
        height: 60px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .descript {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 14px;
        transform: scale(0.8);
        margin-top: 4px;
        margin-left: 6px;
      }
    }
    .photoFooter {
      width: 300px;
      height: 44px;
      background: rgba(255, 255, 255, 1);
      .leftbar {
        float: left;
        width: 50%;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 44px;
        text-align: center;
        .img {
          width: 20px;
          height: 20px;
          float: left;
          margin-left: 30px;
          margin-top: 13px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .text {
          float: left;
          margin-left: 5px;
        }
      }
      .centerbar {
        float: left;
        width: 1px;
        height: 25px;
        background: rgba(238, 238, 238, 1);
        margin-top: 10px;
      }
      .rightbar {
        float: left;
        width: 49%;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 44px;
        text-align: center;
        .img {
          width: 20px;
          height: 20px;
          float: left;
          margin-left: 30px;
          margin-top: 13px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .text {
          float: left;
          margin-left: 5px;
        }
      }
    }
  }
  .xjdLayout {
    padding: 38px;
    background: #333;
    position: relative;
    .userInfo {
      color: #fff;
      position: absolute;
      left: 53px;
      top: 59px;
      .img {
        width: 36px;
        height: 36px;
        float: left;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .nickname {
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 21px;
        float: left;
        margin-left: 10px;
        margin-top: 4px;
      }
    }
    .buyInviteCode{
      padding-left: 12px;
      width:124px;
      height:28px;
      line-height: 28px;
      background:rgba(0,0,0,0.3);
      border-radius:100px 0px 0px 100px;
      position: absolute;
      left: 202px;
      top: 59px;
      font-size:12px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
    .QRcodeInfo {
      position: absolute;
      left: 256px;
      top: 355px;
      .QRcode {
        width: 60px;
        height: 60px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .descript {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 14px;
        transform: scale(0.8);
        margin-top: 4px;
        margin-left: 6px;
      }
    }
    .photoFooter {
      width: 300px;
      height: 44px;
      background: rgba(255, 255, 255, 1);
      .leftbar {
        float: left;
        width: 50%;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 44px;
        text-align: center;
        .img {
          width: 20px;
          height: 20px;
          float: left;
          margin-left: 30px;
          margin-top: 13px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .text {
          float: left;
          margin-left: 5px;
        }
      }
      .centerbar {
        float: left;
        width: 1px;
        height: 25px;
        background: rgba(238, 238, 238, 1);
        margin-top: 10px;
      }
      .rightbar {
        float: left;
        width: 49%;
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 44px;
        text-align: center;
        .img {
          width: 20px;
          height: 20px;
          float: left;
          margin-left: 30px;
          margin-top: 13px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .text {
          float: left;
          margin-left: 5px;
        }
      }
    }
  }
  .bg {
    position: absolute;
    height: 100%;
    background: #333;
    width: 100%;
    z-index: -1;
  }

  .shareDialogLayout {
    .shareDialog {
      position: fixed;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      background: #000;
      opacity: 0.8;
    }
    .moreImg{
      position: fixed;
      right: 0;
      top: 0;
      z-index: 1001;
    }
  }
  .myloading{
    background: #fff;
    opacity: 0.3;
  }
  /deep/ .invitationPosterGoBack{
    background: #333;
    border: 0;
    padding: 0;
    margin: 0;
    height: 0;
    .seizeSeat{
      border: 0;
      padding: 0;
      margin: 0;
      height: 0;
    }
  }
}

</style>


<style lang="less">
.van-dialog__message{
  font-size: 16px;
}
</style>
