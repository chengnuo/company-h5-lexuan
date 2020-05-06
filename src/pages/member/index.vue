<!-- 会员 -->
<template>
  <div class="member">
    会员
    <bottomBanner :index="2" />
  </div>
</template>

<script> 
import commonJs from '@/util/common'
import bottomBanner from '@/components/bottomBanner';

export default {
  name: 'Member',
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
.member {
  

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
