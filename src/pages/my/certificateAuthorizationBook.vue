<!-- 授权书 -->
<template>
  <div class="certificateAuthorizationBook">
    <div class="certificateAuthorizationBookLayout">
      <div class="authNo">{{userData.authNo}}</div>
      <div class="zishouquan">兹授权</div>
      <div class="explain">
        <span class="title">{{shopMobileUserPartnerGet.name}}</span>为幸福集团品牌，植物精油产品微商渠道。
      </div>
      <div class="ptLevelLayout">
        <div class="img">
          <!-- <img v-if="userData.ptLevel==0" src="../../assets/img/my/coloured fengongs_01@2x.png" /> -->
          <img v-if="userData.ptLevel==1" src="../../assets/img/my/coloured VIP_01@2x.png" />
          <img v-if="userData.ptLevel==2" src="../../assets/img/my/coloured xianji_01@2x.png" />
          <img v-if="userData.ptLevel==3" src="../../assets/img/my/coloured_pinpai_01@2x.png" />
          <img v-if="userData.ptLevel==4" src="../../assets/img/my/coloured_jinzuan_01@2x.png" />
          <img v-if="userData.ptLevel==5" src="../../assets/img/my/coloured zongcai_01@2x.png" />
          <img v-if="userData.ptLevel==6" src="../../assets/img/my/coloured fengongs_01@2x.png" />
        </div>
      </div>
      <div class="wxNo">
        <span v-if="shopMobileUserPartnerGet.wxNo">{{shopMobileUserPartnerGet.wxNo}}</span>
        <span v-else>
          -
        </span>
      </div>
      <div class="area">
        <span v-if="shopMobileUserPartnerGet.provinceId">
          {{this.areaList.province_list[shopMobileUserPartnerGet.provinceId]}}
          {{this.areaList.city_list[shopMobileUserPartnerGet.cityId]}}
          {{this.areaList.county_list[shopMobileUserPartnerGet.areaId]}}
        </span>
        <span v-else>
          -
        </span>
      </div>
      <div class="cardNo">
        <span v-if="shopMobileUserPartnerGet.cardNoAbbr">
          {{shopMobileUserPartnerGet.cardNoAbbr || '-'}}
        </span>
      </div>
      <div class="data">
        <span v-if="shopMobileUserPartnerGet.authStartDate || shopMobileUserPartnerGet.authEndDate">
          {{shopMobileUserPartnerGet.authStartDate}}至{{shopMobileUserPartnerGet.authEndDate}}
        </span>
        <span v-else>
          -
        </span>
      </div>
    </div>

    <goBack />
  </div>
</template>
<script >
import { Toast } from 'vant';


import { apiShopMobileUserPartnerGet } from '@/api/my'

import commonJs from '@/util/common'
import cryptoJS from '@/util/cryptoJS'


import AreaList from '@/util/area'


import goBack from '@/components/goBack';

export default {
  name: 'CertificateAuthorizationBook',
  data() {
    return {
      userData: {
        id: '',
      },
      shopMobileUserPartnerGet: {},
      cryptoJS,
      areaList: AreaList,
    }
  },
  components: {
    // bank
    goBack
  },
  mounted() {

    commonJs.outSideShare();
    let userData = JSON.parse(window.sessionStorage.getItem('userData')) || {}

    this.userData = userData;

    this.apiShopMobileUserPartnerGet();

    // console.log('areaList', this.areaList)
    // this.$router.go(-2); 

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
  }
}
</script>
<style lang="less" scoped>
.certificateAuthorizationBook {
  width: 100%;
  min-height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: #333333;
  .certificateAuthorizationBookLayout {
    width: 354px;
    height: 500px;
    background: url(../../assets/img/my/vestinginstrument@2x.png) 0 0 no-repeat;
    background-size: 100%;
    margin-left: 10px;
    margin-top: 40px;
    .authNo {
      padding-left: 167px;
      padding-top: 139px;
      font-size: 10px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(35, 24, 21, 1);
      line-height: 10px;
    }
    .zishouquan {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(35, 24, 21, 1);
      line-height: 16px;
      margin-left: 70px;
      margin-top: 14px;
    }
    .explain {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(35, 24, 21, 1);
      line-height: 16px;

      margin-top: 4px;
      margin-left: 70px;
      margin-right: 70px;
      // line-height: 32px;
      .title {
        font-size: 12px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(35, 24, 21, 1);
        line-height: 10px;
        padding: 0 10px;
        border-bottom: 1px solid #000;
      }
    }
    .ptLevelLayout {
      margin-top: 21px;
      text-align: center;
      .img {
        width: 176px;
        height: 27px;
        display: inline-block;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .wxNo {
      margin-left: 130px;
      margin-top: 19px;
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(35, 24, 21, 1);
      line-height: 12px;
    }
    .area {
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(35, 24, 21, 1);
      line-height: 12px;
      margin-left: 130px;
      margin-top: 13px;
    }
    .cardNo {
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(35, 24, 21, 1);
      line-height: 12px;
      margin-left: 130px;
      margin-top: 14px;
    }
    .data {
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(35, 24, 21, 1);
      line-height: 12px;
      margin-left: 165px;
      margin-top: 96px;
      transform:scale(0.8);
    }
  }
}
</style>




