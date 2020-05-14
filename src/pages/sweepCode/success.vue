<template>
  <div class="successContainer">
    <img src="../../assets/img/sweepCode/BarsStatusBadefndault@2x.png" alt="" class="header">  
    <div class="title">您的防伪码为幸福狐狸官方出品码</div>
    <ul>
      <li>
        <em>查询结果：</em>
        <span>幸福狐狸官方正品</span>
      </li>
      <li>
        <em>查询次数：</em>
        <span>{{num}}</span>
      </li>
      <li>
        <em>首次查询：</em>
        <span>{{firstSweepTime}}</span>
      </li>
      <li>
        <em>温馨提示：</em>
        <span>如您首次查询时间与此不符，我司提醒您谨防 假冒!</span>
      </li>
    </ul>
    <a href="javascript:;" class="btn" @click="routerBack">返 回</a>
  </div>
</template> 
<script>  
export default {
  name: 'sweepCodeSucc',
  data() {
    return {
      firstSweepTime: null,
      num: null
    };
  },
  mounted(){ 
    this.firstSweepTime = this.$route.query.firstSweepTime;
    this.num = this.$route.query.num;
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
      margin-top:82px;
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
    ul{
      padding: 0 38px;
      li{
        font-size:12px;
        font-weight:400;
        color:rgba(102,102,102,1);
        line-height:17px;
        display: flex;
        margin-top: 4px;
        em{
        }
        span{
          max-width: 230px;
        }
      }
    }
    .btn{
      width:335px;
      height:44px;
      line-height: 44px;
      font-size:16px;
      color:rgba(255,255,255,1);
      text-align: center;
      background:linear-gradient(45deg,rgba(230,0,23,1) 0%,rgba(204,0,20,1) 100%);
      border-radius:22px;
      display: block;
      margin: 0 auto;
      margin-top:66px;
    }
  }
</style>  
