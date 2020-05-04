<template>
  <div class="successContainer">
    <img src="../../assets/img/sweepCode/icon_04_question_01@2x.png" alt="" class="header">  
    <div class="title">您查询的防伪码不存在！</div>
    <p>请核对后重新查询，谨防假冒！</p>
    <a href="javascript:;" class="btn" @click="routerBack">返 回</a>
  </div>
</template> 
<script>  
export default {
  name: 'sweepCodeError',
  data() {
    return {
      
    };
  },
  mounted(){ 

  },
  methods:{
    routerBack(){
      this.$router.go(-1);
    }
  }
}

</script>
<style scoped lang="less">
  .successContainer{
    .header{
      width:120px;
      height: 120px;
      margin:0 auto;
      margin-top:60px;
    }
    .title{
      height:28px;
      font-size:20px;
      text-align: center;
      font-weight:600;
      color:rgba(51,51,51,1);
      line-height:28px;
      margin-top:10px;
      margin-bottom: 20px;
    }
    p{
      height:17px;
      font-size:12px;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:17px;
      text-align: center;
    }
    .btn{
      width:335px;
      height:44px;
      line-height: 44px;
      font-size:16px;
      color:rgba(255,255,255,1);
      text-align: center;
      background:linear-gradient(225deg,rgba(182,0,0,1) 0%,rgba(149,0,0,1) 100%);
      border-radius:2px;
      display: block;
      margin: 0 auto;
      margin-top:134px;
    }
  }
</style>  
