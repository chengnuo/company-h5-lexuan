<template>
  <div class="container">
    <img src="../../assets/img/index/bg_02@2x.png"
         alt=""
         class="bg">
    <ul>
      <li @click="jump">
        <a href="javascript:;">
          <img src="../../assets/img/index/img_50_01@2x.png"
               alt="">
        </a>
      </li>
      <li @click="jumpBecomeServiceProvider">
        <a href="javascript:;">
          <img src="../../assets/img/index/img_50_02@2x.bat.png"
               alt="">
        </a>
      </li>
     <!--  <li>
        <a href="http://xfhl.hyxmt.cn/a/Manager/Login.aspx">
          <img src="../../assets/img/index/img_50_03@2x.png"
               alt="">
        </a>
      </li> -->
    </ul>
  </div>
</template>
<script>

import { apiPayActCommonValueZB } from '@/api/pay';
import { Toast } from 'vant'
import commonJs from '@/util/common'

export default {
  name: 'Start',
  data() {
    return {
      payCommonValueZB: {
        maskBusinessEntranceOpen: 0,
      },
    }
  },
  mounted() {
    // this.getShopMobileCommonValue();
  },
  methods: {
    jump() {
      this.$router.push({
        name: 'SignIn',
      })
    },
    // 跳服务商1
    jumpBecomeServiceProvider(){
      // http://h5.zhuanbo.gdxfhl.com/becomeServiceProvider
      let inviteCode = this.$route.query.inviteCode || '';
      window.location.href = `${commonJs.config.prefixZhuanboUrl}/quickLogin?inviteCode=${inviteCode}`;
    },
    // 获取公共参数-赚播
    getShopMobileCommonValue(){
      let data = Object.assign({} , {
        mercId: '888000000000004',
        platform: 'LXMALL',
      })
      apiPayActCommonValueZB(data).then((res)=>{
        if (res.code.toString() === '10000') {
          this.payCommonValueZB = res.data;
        } else {
          Toast.fail(res.msg)
        }
      }).catch((error)=>{
        Toast.fail(error)
      })

    },
  }
}
</script>
<style scoped lang="less">
.container {
  .bg {
    width: 100%;
    height: 200px;
    display: block;
  }
  ul {
    padding: 30px 0;
    li {
      margin-bottom: 20px;
      img {
        width: 335px;
        height: 120px;
        display: block;
        margin: 0 auto;
      }
    }
  }
}
</style>