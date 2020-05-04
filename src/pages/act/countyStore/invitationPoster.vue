<template>
  <div class="invitationPoster">
    <div class="bg"></div>
    <van-tabs v-model="activeName">
      <van-tab title="邀请VIP"
               name="vip">
        <div class="vipLayout clearfix">
          <div id="canvas"></div>
          <div class="userInfo">
            <img v-if="userData.headImgUrl"
                 :src="userData.headImgUrl"
                 class="img" />
            <img v-else
                 src="../../../assets/act/countyStore/people.png"
                 class="img" />
            <span class="nickname">{{formatName(userData.nickname)}}</span>
          </div>
          <div class="QRcodeInfo">
            <div class="QRcode">
              <img v-if="vipQRCode"
                   :src="vipQRCode"
                   class="img" />
            </div>
            <div class="descript">扫码购买</div>
          </div>
          <img :src="userIndex.inviteCardVIP" />
          <div class="photoFooter clearfix">
            <div class="leftbar clearfix"
                 @click="handleSharePhoto">
              <img class="img"
                   src="../../../assets/act/tongzhi@2x.png" />
              <span class="text">分享图片</span>
            </div>
            <div class="centerbar"></div>
            <div class="rightbar clearfix"
                 @click="handleSavePhoto">
              <img class="img"
                   src="../../../assets/act/tongzhi@2x (1).png" />
              <span class="text">保存图片</span>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="邀请县级店"
               name="xjd">
        <div class="xjdLayout">
          <div class="userInfo">
            <img v-if="userData.headImgUrl"
                 :src="userData.headImgUrl"
                 class="img" />
            <img v-else
                 src="../../../assets/act/countyStore/people.png"
                 class="img" />
            <span class="nickname">{{formatName(userData.nickname)}}</span>
          </div>
          <div class="QRcodeInfo">
            <div class="QRcode">
              <img v-if="xjdQRCode"
                   :src="xjdQRCode"
                   class="img" />
            </div>
            <div class="descript">扫码购买</div>
          </div>
          <img :src="userIndex.inviteCardXJ" />
          <div class="photoFooter clearfix">
            <div class="leftbar clearfix"
                 @click="handleSharePhoto">
              <img class="img"
                   src="../../../assets/act/tongzhi@2x.png" />
              <span class="text">分享图片</span>
            </div>
            <div class="centerbar"></div>
            <div class="rightbar clearfix"
                 @click="handleSavePhoto">
              <img class="img"
                   src="../../../assets/act/tongzhi@2x (1).png" />
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
        <img src="../../../assets/act/rhfx@2x.png" />
      </div>
    </div>

    <goBack />

  </div>
</template>

<script>
import commonJs from '@/util/common'
import Vue from 'vue';
import { apiUserIndex } from '@/api/my'
import { Toast } from 'vant'
import { apiMobileUserInfo } from '@/api/home'
import { Dialog } from 'vant';

import goBack from '@/components/goBack';


var QRCode = require('qrcode')

export default {
  name: 'invitationPoster',

  components: {
    goBack,
  },

  data() {
    return {
      activeName: 'vip',
      userIndex: {},
      userData: {
        id: '',
        userToken: '',
      },
      vipQRCode: '',
      xjdQRCode: '',
      shareDialogVisibled: false,
    };
  },
  mounted() {

    commonJs.outSideShare();
    if (this.$route.query.type) {
      this.activeName = this.$route.query.type || 'vip'
    }
    if (this.$route.query.show==1) {
      this.shareDialogVisibled = true
    }
    this.apiUserIndex();

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
          QRCode.toDataURL(`${commonJs.config.prefixH5Url}/goodDetail?inviteCode=${this.userData.inviteCode}`, (err, url) => {
            console.log('err', err)
            console.log('url', url)
            this.vipQRCode = url
            this.xjdQRCode = url
          })
        } else {
          // this.$toast(res.msg) // 请登录
          // this.loading = false;
        }
      }).catch((error) => {
        Toast.fail(error)
        // this.loading = false;
      })
    } else {
      Toast.fail('没有可用的token')
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
    // 获取客户端IP
    apiUserIndex() {
      const data = Object.assign({})
      apiUserIndex(data).then(res => {
        if (res.code.toString() === '10000') {
          this.userIndex = res.data

        } else {
          Toast.fail(res.msg)
        }
      }).catch(error => {
        Toast.fail(error)
      })
    },
    formatName(str) {
      let formatStr = str || ''

      if (formatStr.length >= 2) {
        let arr = formatStr.split('');
        arr[arr.length - 2] = '*'
        return arr.join('');
      } else {
        return formatStr
      }


      // return formatStr.substr(0, 2) + '***' + formatStr.substr(5, formatStr.split('').length);;
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
    background-color: #09c2da;
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
  }

  /deep/ .van-tab--active {
    color: #09c2da;
  }
  /deep/ .van-tabs__wrap {
    height: 50px;
    line-height: 50px;
  }
  /deep/ .van-tabs__nav {
    background: #333;
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
      left: 230px;
      top: 365px;
      .QRcode {
        width: 50px;
        height: 50px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .descript {
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 14px;
        transform: scale(0.8);
        margin-top: 4px;
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
    .QRcodeInfo {
      position: absolute;
      left: 230px;
      top: 365px;
      .QRcode {
        width: 50px;
        height: 50px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .descript {
        font-size: 10px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        line-height: 14px;
        transform: scale(0.8);
        margin-top: 4px;
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
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 1000;
      background: #000;
      opacity: 0.8;
    }
    .moreImg{
      position: absolute;
      right: 0;
      top: 0;
      z-index: 1001;
    }
  }
}

</style>


<style lang="less">
.van-dialog__message{
  font-size: 16px;
}
</style>
