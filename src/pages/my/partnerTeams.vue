<!-- 团队合伙人 -->
<template>
  <div class="partnerTeams">
    <div class="bg"></div>
    团队合伙人
  </div>
</template>
<script >
import { Toast } from 'vant';

import commonJs from '@/util/common'
import {  apiShopMobileMsgNotifyList } from '@/api/my'


export default {
  name: 'PartnerTeams',
  data() {
    return {
      
    }
  },
  mounted() {
    
  },
  methods: {},
}
</script>
<style lang="less" scoped>
.partnerTeams {
  .bg {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
}
</style>