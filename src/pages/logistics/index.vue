<template>
  <div class="shipInfoContainer" v-if="shipInfo">
  <div class="shipInfoBox" v-if="shipInfo.length>0">
    <div class="list clearfix" v-for="(item,index) in shipInfo" :key="index">
      <div class="time">
        <p class="date">{{item.date}}</p>
        <p class="dateInfo">{{item.hour}}</p>
      </div>
      <div class="cut" >
        <div class="radius"></div>
        <div class="solid"></div>
      </div>
      <div class="info">{{item.desc}}</div>
    </div>
  </div>
  <div class="noShipInfo" v-if="shipInfo.length<=0">
    <img src="../../assets/img/logistics/icon_17logistics_01@2x.png">
    <p>暂时没有相关物流信息～</p>
  </div> 
  <goBack/>
</div>

</template> 
<script>
  import commonJs from '@/util/common'
  import goBack from '@/components/goBack';
  import {  apiTraceShip } from '@/api/logistics';
  export default{
    name: 'shipInfo', 
    data(){
      return{
        shipInfo: null
      }
    },
    mounted(){
      commonJs.outSideShare();
      this.getTraceShip();
    },
    methods:{
      getTraceShip(){
        apiTraceShip({
          orderNo: this.$route.query.orderNo,
          shipSn:this.$route.query.shipSn
        }).then((res)=>{
          console.log(res)
        for (var i = 0; i < res.data.length; i++) {
          res.data[i].date = res.data[i].time.substring(5, 10)
          res.data[i].hour = res.data[i].time.substring(11, 16)
        } 
        this.shipInfo = res.data;
        console.log(this.shipInfo)
        }).catch(error=>{
          console.log(error)
          this.$toast(error.msg)
        })
      }
    },
    components: {
      goBack
    }
  }
</script>
<style scoped>
.shipInfoContainer .noShipInfo{
  margin-top: 90px;
}
.shipInfoContainer .noShipInfo img{
  width: 130px;
  height: 130px;
  display: block;
  margin: 0 auto;
}
.shipInfoContainer .noShipInfo p{
  height:18px;
  font-size:13px;
  font-weight:400;
  color:rgba(153,153,153,1);
  line-height:18px;
  text-align: center;
}
.shipInfoContainer .shipInfoBox{
  padding:30px 15px ;
}
.shipInfoContainer .time{
  float:left;
  text-align: left;
  margin-right: 10px;
}
.shipInfoContainer .time .date{
  width: 45px;
  height:20px;
  font-size:14px;
  font-weight:400;
  color:#ddd;
  line-height:20px;
  display: block;
  text-align: center;
  margin-right:8px;
}
.shipInfoContainer .shipInfoBox .list:first-child .time .date{
  color:rgba(51,51,51,1);
}
.shipInfoContainer .time .dateInfo{
  width: 37px;
  height:17px;
  font-size:12px;
  font-weight:400;
  color:#ddd;
  line-height:17px;
  display: block;
  margin-top:1px;
  text-align: right;
}
.shipInfoContainer .shipInfoBox .list:first-child .time .dateInfo{
  color:rgba(51,51,51,1);
}
.shipInfoContainer .list{
  position: relative;
  padding-bottom: 30px;
}
.shipInfoContainer .cut{
  float:left;
  width:6px;
  position:absolute;
  margin-right: 14px;
  left: 50px;
  top:0;
  bottom:0;
}
.shipInfoContainer .cut .radius{
  width:8px;
  height:8px;
  background:#ccc;
  border-radius: 50%;
  position: absolute;
  left:-1px; 
  top:1px;
  z-index: 2;
}
.shipInfoContainer .shipInfoBox .list:first-child .cut .radius{
  background: #aa9160;
}
.shipInfoContainer .cut .solid{
  width:1px;
  height:100%;
  background: #ddd;
  position: absolute;
  left:3px;
  top:2px;
  z-index: 1;
}
.shipInfoContainer .info{
  width: 276px;
  float: right;
  font-size:14px;
  font-weight:400;
  color:rgba(204,204,204,1);
  line-height:19px;
}

.shipInfoContainer .list:first-child .info{
  color: #666;
}
.shipInfoContainer .list:first-child .active{
  color: #ccc;
}
.shipInfoContainer .shipInfoBox .list:first-child .time .active{
  color: #ccc;
}
.shipInfoContainer .shipInfoBox .list:last-child .cut .solid{
  display: none;
}
</style>