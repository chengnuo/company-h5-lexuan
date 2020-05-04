<template>
  <div class="setUpContainer">
    <ul>
      <li class="clearfix first">
        <van-uploader class="clearfix"
                      style="width:100%;"
                      :after-read="afterReadImgFrontList">
          <span class="left">头像</span>
          <img src="../../assets/img/my/more_01@2x.png"
               alt=""
               class="right">
          <img :src="headImgUrl"
               alt=""
               class="center img"
               v-if="headImgUrl">
          <img src="../../assets/img/my/headUrl.png"
               alt=""
               class="center img"
               v-if="!headImgUrl">
        </van-uploader>
      </li>
      <li class="clearfix">
        <span class="left">真实姓名</span>
        <em class="center">{{userInfo.nickname}}</em>
      </li>
      <li class="clearfix"
          @click="jumpSetUpInputCode">
        <span class="left">登录密码</span>
        <img src="../../assets/img/my/more_01@2x.png"
             alt=""
             class="right">
        <em class="center">{{userInfo.hasPwd == 1 ?'已设置':'未设置'}}</em>
      </li>
      <li class="clearfix"
          @click="jumpBondPrice">
        <span class="left">保证金</span>
        <img src="../../assets/img/my/more_01@2x.png"
             alt=""
             class="right">
      </li>
      <li class="clearfix"
          style="border:none;"
          @click="jumpCertificateAuthorization">
        <span class="left">授权书</span>
        <img src="../../assets/img/my/more_01@2x.png"
             alt=""
             class="right">
      </li>
    </ul>
    <a href="javascript:;"
       class="logOut"
       @click="clearSessionStorage">退出登录</a>

        <goBack :index="1"/>
  </div>
</template>

<script> 
import { Toast, Uploader } from 'vant';
import axios from 'axios'
import commonJs from '@/util/common'
import goBack from '@/components/goBack';
import { apiUserInfo, apiHeadUpload } from '@/api/setUp'
import { apiShopMobileUserPartnerGet } from '@/api/my'
import { Dialog } from 'vant';

export default {
  name: 'SetUp',
  data() {
    return {
      userInfo: {
      },
      headImgUrl: null,
      loading: false,
      shopMobileUserPartnerGet: {},
    }
  },
  mounted() {
    commonJs.outSideShare();
    this.userData = JSON.parse(sessionStorage.getItem('userData')) || {};
    this.getUserIndex();
    this.apiShopMobileUserPartnerGet();
  },
  methods: {
    // 获取授权资料
    apiShopMobileUserPartnerGet() {
      const data = Object.assign({}, {
        authType: 'B',
      })
      apiShopMobileUserPartnerGet(data).then(res => {
        if (res.code.toString() === '10000') {
          this.shopMobileUserPartnerGet = res.data;
        } else {
          Toast.fail(res.msg)
        }

      }).catch(error => {
        Toast.fail(error)
      })
    },
    // 授权书
    jumpCertificateAuthorization() {
      console.log('shopMobileUserPartnerGet', this.shopMobileUserPartnerGet)
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
      }else if (this.shopMobileUserPartnerGet.authStatus == 2) {
        Dialog.confirm({
          title: '',
          message: '你的授权资料不完整，无法使用该用能。请补充授权资料'
        }).then(() => {
          // on confirm
          this.$router.push({
            path: `/my/certificateAuthorization`
          })
        }).catch(() => {
          // on cancel
        });
      } else if (this.shopMobileUserPartnerGet.authNo) {
        this.$router.push({
          path: `/my/certificateAuthorizationBook`
        })
      } else {
        this.$router.push({
          path: `/my/certificateAuthorization`
        })
      }
    },
    jumpFristPage() {
      this.$router.push({
        name: 'GoodDetail',
      })
    },
    getUserIndex() {
      Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '加载中...'
      });
      apiUserInfo({}).then((res) => {

        Toast.clear(true);
        this.userInfo = res.data;
        this.headImgUrl = this.userInfo.headImgUrl;

      }).catch(error => {
        Toast.clear(true);
      })
    },
    jumpMyOrder() {
      this.$router.push({
        name: 'myOrder',
      })
    },
    jumpMyOrder() {
      this.$router.push({
        name: 'myOrder',
      })
    },
    jumpBondPrice() {
      this.$router.push({
        name: 'bondPrice',
      })
    },

    jumpSetUpInputCode() {
      this.$router.push({
        name: 'SetUpSendCode',
        query: {
          areaCode: this.userInfo.areaCode,
          mobile: this.userInfo.mobile
        }
      })
    },
    afterReadImgFrontList(resfile) {
      console.log(resfile.file.size / 1000000)
      // if (resfile.file.size / 1000000 > 2.048) {
      //   Toast('上传头像不能超过2M')
      //   return;
      // }
      var _this = this;
      Toast.loading({
        duration: 0,       // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '上传中...'
      });

      const formData = new FormData()
      formData.append('files', resfile.file)
      formData.append('mercId', '888000000000003')
      formData.append('platform', 'XFYLMALL')
      const format = {
        mercId: '888000000000003',
        platform: 'XFYLMALL'
      }

      axios.post(commonJs.config.prefixUrl + '/shop/mobile/user/head/upload', formData, commonJs.jsSign(format), {
        headers: { // 添加请求头
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          Toast.clear(true);
          _this.headImgUrl = res.data.data.headImgUrl;
          _this.userData = JSON.parse(sessionStorage.getItem('userData')) || {};
          _this.userData.headImgUrl = _this.headImgUrl;
          window.sessionStorage.setItem('userData', JSON.stringify(_this.userData));

        }).catch(err => {
          Toast.clear(true);
          // Toast(`上传失败，请重新上传`)
        })
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
  },
  components: {
    goBack
  }
}
</script>

<style  lang="less">
.setUpContainer {
  ul {
    background: #fff;
    padding: 0 15px;
    li {
      padding: 10px 0;
      border-bottom: 1px solid rgba(245, 245, 245, 1);
      .left {
        float: left;
        height: 30px;
        font-size: 15px;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 30px;
      }
      .center {
        float: right;
        height: 30px;
        font-size: 14px;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        line-height: 30px;
        margin-right: 15px;
      }
      .img {
        width: 50px;
        object-fit: cover;
        border-radius: 50%;
      }
      .right {
        float: right;
        width: 7px;
        height: 11px;
        margin-top: 9px;
      }
    }
    .first {
      .left {
        height: 50px;
        line-height: 50px;
      }
      .center {
        height: 50px;
        line-height: 50px;
      }
      .right {
        margin-top: 18px;
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
    bottom: 60px;
  }
  .van-uploader__input-wrapper {
    width: 100%;
  }
}
.van-dialog__message{
  font-size:16px;
  font-family:PingFangSC-Regular,PingFang SC;
  font-weight:400;
  color:rgba(3,3,3,1);
  line-height:22px;
  padding: 30px 30px 30px 30px;
}
.van-button--large{
  height: 43px;
  line-height: 43px;
}
.van-dialog__confirm {
  font-size: 17px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(9, 194, 218, 1);
  line-height: 24px;
}
</style>
