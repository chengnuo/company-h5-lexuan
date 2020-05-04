<!-- 饼干中间页 -->
<template>
  <div class="biscuitMiddle">
    <div class="banner">
      <div class="title">微信扫码进入饼干业务入口</div>
      <img src="../../../assets/img/yinli/biscuitMiddle.png" alt="" />
    </div>
    <div class="content">
      <div class="title">饼干业务入口指引：</div>
      <div>1.截屏保存二维码；</div>
      <div>2.打开微信App；</div>
      <div>3.点击微信首页右上角“+”；</div>
      <div>4.选择“扫一扫”；</div>
      <div>5.点击右上角“相册”；</div>
      <div>6.选择刚刚保存的二维码截图；</div>
      <div>7.点击“完成”即可。</div>
    </div>
  </div>
</template>

<script>
import commonJs from '@/util/common'

export default {
  name: 'biscuitMiddle',

  data() {
    return {
    }
  },
  created() {
    
  },

  mounted(){
    commonJs.setDocumentTitle('饼干业务入口');
    commonJs.outSideShare();
  },

  methods: {
  }
}
</script>

<style lang="less" scoped>
.biscuitMiddle {
  width:100%;
  min-height: 100%;
  margin:0 auto;
  background:rgba(245,248,250,1);
  position: absolute;
  left:0; 
  top:0;
  .banner{
    width:345px;
    height:337px;
    margin:0 auto;
    background: url("../../../assets/img/help/bg_04@2x.png") no-repeat center;
    background-size: 100% 100%;
    .title{
      height:30px;
      font-size:22px;
      font-weight:500;
      color:rgba(71,217,171,1);
      line-height:30px;
      padding:50px 0;
      text-align: center;
    } 
    img{
      width: 160px;
      height: 160px;
      margin:0 auto;
      display: block;
    }
  }
  .content{
    padding:20px 15px 0;
    div{
      font-size:14px;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:20px;
    }
    .title{
      height:22px;
      font-size:16px;
      font-weight:400;
      color:rgba(51,51,51,1);
      line-height:22px;
      margin-bottom:5px;
    }
  }
}

// .biscuitMiddle .content{
//   text-align: left;
//   margin-left: 60px;
// }
</style>
