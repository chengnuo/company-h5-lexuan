<template>
 <!--pages/listShip/index.wxml-->
<div class="listShipContainer">
  <div class="title" v-if="listShip">本订单为多物流订单，请选择要查看的物流</div>
  <div class="list">
    <div @click="jump(item)" v-for="(item,index) in listShip" :key="index" >
      <span class="left">物流单号</span>
      <!-- <img src="../../images/common/more_01@2x.png"> -->
      <span class="right">{{item}}</span>
    </div>
  </div> 
  <goBack/>
</div>


</template> 
<script>
  import commonJs from '@/util/common'
  import goBack from '@/components/goBack';
  import {  apiTraceShip, apiListShip} from '@/api/logistics';
  export default{
    name: 'listShip', 
    data(){
      return{
        listShip: null
      }
    },
    mounted(){
      commonJs.outSideShare();
      this.getListShip();
    },
    methods:{
      getListShip(){
        apiListShip({
          orderNo: this.$route.query.orderNo,
          // shipSn:'1111'
        }).then((res)=>{
         if (res.code == 10000){
            this.listShip = res.data || [];
            console.log(this.listShip)
          }
        }).catch(error=>{
          // console.log(error)
          // this.$toast(error.msg)
        })
      },
      jump(No){
        this.$router.push({ 
          path: '/logistics' ,
          query: {
            shipSn:No,
            orderNo: this.$route.query.orderNo,
          }
        })
      }
    },
    components: {
      goBack
    }
  }
</script>
<style scoped>
/* pages/listShip/index.wxss */
.listShipContainer{
  width: 100%;
  min-height: 100%;
  background:rgba(245,245,245,1);
  position: absolute;
  left: 0; 
  top:0;
}
.listShipContainer .title{
  /*height:18px;*/
  font-size:13px;
  font-weight:400;
  color:rgba(153,153,153,1);
  line-height:18px;
  padding:20px 0 5px 15px;

}
.listShipContainer .list{
  padding: 0 15px;
  background: #fff;
}
.listShipContainer .list div{
  height: 21px;
  padding: 15px 0;
  border-bottom: solid 1px rgba(245,245,245,1);
}
.listShipContainer .list .left{
  height:21px;
  font-size:15px;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:21px;
  float: left;
}
.listShipContainer .list .right{
  height:20px;
  font-size:14px;
  font-weight:400;
  color:rgba(153,153,153,1);
  line-height:20px;
  float: right;
  margin-right:10px;
}
.listShipContainer .list img{
  width: 8px;
  height: 14px;
  float: right;
  margin-top: 3px;
}
.listShipContainer .list div:last-child{
  border: none;
}
</style>