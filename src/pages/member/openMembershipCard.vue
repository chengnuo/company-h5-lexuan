<!-- 开通会员卡 -->
<template>
  <div class="openMembershipCard">
    开通会员卡
  </div>
</template>

<script> 
import commonJs from '@/util/common'
import bottomBanner from '@/components/bottomBanner';

export default {
  name: 'OpenMembershipCard',
  components: {
    bottomBanner,
  },
  data() {
    return {
      purchaseQuantity: 0,
    }
  },
  mounted() {

  },
  methods: {
    changePurchaseQuantity() { },
  },

}
</script>

<style  lang="less">
.openMembershipCard {
  background: rgba(240, 245, 249, 1);
  margin-bottom: 100px;


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
}
</style>
