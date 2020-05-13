<template>
  <div class="addbandCard">
    <p class="title">设置密码</p>
    <p class="dec">为了保证你的账号安全，需先验证你的身份，验证成功后可以进行下一步操作</p>
    <p class="title" style="margin-top: 30px;">{{'+' + query.areaCode + '  '+ query.mobile}}</p>
    <a href="javascript:;" class="next" @click="jumpSetUpInputCode">验  证</a>
    <goBack/>
  </div>
</template> 
<script>

import commonJs from '@/util/common'
import goBack from '@/components/goBack';
export default {
  name: 'sendCode',
  data() {
    return {
      query:{
        areaCode: '',
        mobile: ''
      }
    }
  },
  mounted() { 
    commonJs.outSideShare();
    this.query = this.$route.query || {}
  },
  methods: {
    jumpSetUpInputCode(){
      this.$router.push({
        name: 'SetUpInputCode',
        query: this.query
      })
    },
  },
  components: {
    goBack
  }
}
</script>
<style lang="less">
  .addbandCard{
    width: 100%;
    min-height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background:rgba(245,248,250,1);
    .title{
      height:28px;
      padding-top: 38px;
      padding-bottom: 10px;
      font-size:20px;
      font-weight:600;
      color:#666666;
      line-height:28px;
      text-align: center;
    }
    .dec{
      height:22px;
      font-size:15px;
      font-weight:400;
      color:#999999;
      line-height:22px;
      margin:0 30px;
      span{
        color:#47D9AB;
      }
    }
    .inputBox{
      width:295px;
      height:24px;
      padding:10px 20px;
      background:rgba(255,255,255,1);
      border-radius:2px;
      border:1px solid rgba(230,230,230,1);
      margin:0 auto;
      margin-top: 40px;
      img{
        width: 24px;
        height: 24px;
        float: left;
        margin-right: 10px;
      }
      input{
        width: 245px;
        height: 24px;
        line-height: 24px;
        color: #333;
        font-size:16px;
        float: left;
      }
      input::-webkit-input-placeholder {
        color: #ccc;
      }
    }
    .next{
      width:335px;
      height:44px;
      line-height: 44px;
      background:linear-gradient(45deg,rgba(230,0,23,1) 0%,rgba(204,0,20,1) 100%);
      border-radius:22px;
      margin:0 auto;
      margin-top: 42px;
      display: block;
      font-size:16px;
      font-weight:400;
      color:rgba(255,255,255,1);
      text-align: center;
    }
  }
</style>
