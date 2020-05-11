<template>
  <div class="goBackContainer" v-if="!show">
    <div></div>
    <div class="btn" @click="goBack" :class="{left:index == 1, bottom: index == 2}">
      返回
    </div>
  </div>
</template>

<script>
import commonJs from '@/util/common'
export default {
  name: 'goBackContainer',

  data() {
    return {
      show: false
    }
  },
  props:{
    index: Number
  },
  mounted() {
    this.show = commonJs.ifXFApp();
  },

  methods: {
   goBack(type){
    window.history.go(-1);
   }
  }
}
</script>

<style lang="less" scoped>
.goBackContainer{
  div{
    width: 100%;
    height:44px;
  }
  .btn{
    width: 100%;
    height:44px;
    line-height: 44px;
    color:#fff;
    background:linear-gradient(45deg,rgba(230,0,23,1) 0%,rgba(204,0,20,1) 100%);
    border-radius:2px;
    font-size:14px;
    position: fixed;
    bottom:0;
    left:0;
    z-index: 87;
    text-align: center;
  }
  .left{
    width: 90%;
    left: 50%;
    margin-left: -45%;
  }
  .bottom{
    bottom:60px;
  }
}
</style>
