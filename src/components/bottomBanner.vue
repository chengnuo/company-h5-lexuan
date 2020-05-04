<template>
  <div class="bottomContainer">
    <div></div>
    <ul>
      <!-- <li class="left" @click="jump(0)">
        <img src="../assets/img/index/icon_22／Tabmy_05@2x.png" alt="" v-if="index != 0">
        <img src="../assets/img/index/icon_UAScale_selected_01@2x.png" alt="" v-if="index == 0">
      </li> -->
      <li class="center" @click="jump(1)">
        <img src="../assets/img/index/H5_icon_02@2x.png" alt="" v-if="index != 1">
        <img src="../assets/img/index/H5_icon_01@2x.png" alt="" v-if="index == 1">
      </li>
      <li class="right" @click="jump(2)">
        <img src="../assets/img/index/H5_icon_04@2x.png" alt="" v-if="index != 2">
        <img src="../assets/img/index/H5_icon_03@2x.png" alt="" v-if="index == 2">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'preLoading',

  data() {
    return {
      preLoad: true
    }
  },
  props:{
    index: Number
  },
  mounted() {

  },

  methods: {
   jump(type){
    if(this.index == type) return;
    if(type == 0){
      this.$router.push({
        name: 'Index',
      })
    }else if(type == 1){
      this.$router.push({
        name: 'Index',
      })
    }else if(type == 2){
      this.$router.push({
        name: 'my',
      })
    }
   }
  }
}
</script>

<style lang="less" scoped>
.bottomContainer{
  div{
    width: 100%;
    height:70px;
  }
  ul{
    width: 100%;
    position: fixed;
    left: 0;
    bottom:0;
    padding:7px 0 8px;
    border-top:1px solid rgba(230,230,230,1);
    z-index: 999;
    background: #fff;
    li{
      width: 50%;
      height: 54px;
      float:left;
      &.left{
        // margin-left:25px;
      }
      &.center{
        // margin:0 50px;
      }
      &.right{
        // margin-right:25px;
      }
      img{
        width: 90px;
        display: block;
        margin:0 auto;
      }
    }
  }
}
</style>
