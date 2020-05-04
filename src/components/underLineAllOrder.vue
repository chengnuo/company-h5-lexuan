<template>
  <div class="listOrderContainer">
    <div class="noOrderTip" v-if="showNoOrderTip">
      <img src="../assets/img/myOrder/icon_07list_02@2x.png">
      <p>你暂时没有相关订单哦～</p>
    </div>
    <div class="listOrderBox" v-for="(item,index) in orderArr"  :key="index" v-if="!showNoOrderTip" >
      <div>
        <div class="orderNumber">
          <span>线下购买审批</span>
          <span class="state">{{item.orderStatusText}}</span>
        </div>

        <ul class="clearfix">
          <li>
            <div class="orderTitle">发起人</div>
            <div class="orderInfo">{{item.userName}}</div>
          </li>
          <li>
            <div class="orderTitle">购买商品</div>
            <div class="orderInfo">
              <img :src="item.goodsList[0].picUrl" alt=""> 
            </div>
          </li>
          <li>
            <div class="orderTitle">商品名称</div>
            <div class="orderInfo">{{item.goodsList[0].goodsName}}</div>
          </li>
          <li>
            <div class="orderTitle">购买数量</div>
            <div class="orderInfo">{{item.goodsList[0].number}}</div>
          </li>
          <li>
            <div class="orderTitle">购买价格</div>
            <div class="orderInfo">¥{{item.goodsList[0].price}}</div>
          </li>
        </ul>
      
      <div class="toPaid">
        <div class="time">
          <span>发起时间：</span>
          <em>2019-05-22 15:23</em>
        </div>
        <div class="right box" @click="confirmOrder(item)" v-if="item.status == 'A'">发货</div>
        <div class="left box" @click="cancelOrder(item.orderNo)" v-if="item.status == 'A'">拒绝</div>
      </div> 
      </div>
    </div>
  </div>
</template>
<script>
  import { apiRepayOrder } from '@/api/myOrder';
  import commonJs from '@/util/common'
  import { Toast, Dialog} from 'vant';
  export default{
    name:'',
    props: {
      orderArr: {
        type: Array,
        required: true
      },
      showNoOrderTip:{
        type: Boolean,
        required: false
      }
    },
    methods:{
      jumpOrderDetail(orderNo){
        this.$router.push({ 
          path: '/order/detail/' + orderNo
        })
      },
      checkLogistics(orderNo){
        this.$router.push({ 
          path: '/logistics' ,
          query: {
            orderNo
          }
        })
      },
      cancelOrder(id){
        var _this = this;
        Dialog.confirm({
          // title: '订单处理',
          message: '是否确认拒绝该次线下购买请求？'
        }).then(() => {
          _this.$emit('changeStatus',id);
        }).catch(() => {
          // on cancel
        });
      },
      confirmOrder(json){
        this.$emit('receivingGood',json);
      }
    }
  }
</script>
<style>
  /* components/myOrder/all/index.wxss */

.listOrderContainer .noOrderTip{
  margin-top: 90px;
}
.listOrderContainer .noOrderTip img{
  width: 130px;
  height: 130px;
  display: block;
  margin: 0 auto;
}
.listOrderContainer .noOrderTip p{
  height:18px;
  font-size:13px;
  font-weight:400;
  color:rgba(153,153,153,1);
  line-height:18px;
  text-align: center;
  margin-top: -20px;
}
.listOrderContainer .orderNumber{
  height:20px;
  font-size:14px;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:20px;
  padding: 0 14px 12px;
  display: flex;
  justify-content: space-between;
}
.listOrderContainer .listOrderBox{
  position: relative;
  margin-bottom:10px;
  background: #fff;
  padding:15px 0;
}
.listOrderContainer .orderNumber .state{
  height:20px;
  font-size:14px;
  font-weight:600;
  color:#333;
  line-height:20px;
}
.listOrderContainer ul{
  width: 345px;
  border-left:solid 1px #E6E6E6;
  margin: 0 auto;
}
.listOrderContainer li {
  float: left;
}
.listOrderContainer li .orderTitle{
  padding: 10px 9px;
  height:17px;
  font-size:12px;
  font-weight:400;
  color:rgba(153,153,153,1);
  line-height:17px;
  border-right:solid 1px #E6E6E6;
  border-bottom:solid 1px #E6E6E6;
  border-top:solid 1px #E6E6E6;
  word-wrap: break-word; 
  break-word: break-all;
}      

.listOrderContainer .orderInfo{
  width: 50px;
  height: 50px;
  line-height: 18px;
  padding: 10px 9px;
  font-size:12px;
  font-weight:400;
  color:rgba(51,51,51,1);
  overflow: hidden;
  border-right:solid 1px #E6E6E6;
  border-bottom:solid 1px #E6E6E6;
  text-align: center;
  word-wrap: break-word;
  break-word: break-all;
}
.listOrderContainer .orderInfo img{
  width: 50px;
  height: 50px;
  display: block;
}


.listOrderContainer .toPaid{
  margin-top:11px;
  height: 33px;
  padding-left: 14px;
} 
.listOrderContainer .toPaid .time{
  float: left;
  height: 30px;
  line-height: 30px;
}
.listOrderContainer .toPaid .time span{
  height:30px;
  font-size:12px;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:17px;
}
.listOrderContainer .toPaid .time em{
  height:17px;
  font-size:12px;
  font-weight:400;
  color:rgba(51,51,51,1);
  line-height:17px;
}

.listOrderContainer .toPaid .box{
  width:80px;
  height:30px;
  border-radius:2px;
  border:1px solid rgba(51,51,51,1);
  line-height: 30px;
  text-align: center;
  font-size:13px;
}
.listOrderContainer .toPaid .left{
  float:right;
  margin-right: 11px;
  color:rgba(102,102,102,1);
  border:1px solid rgba(153,153,153,1);
}
.listOrderContainer .toPaid .leftMtr0{
  margin-left: 11px;
}
.listOrderContainer .toPaid .right{
  background:linear-gradient(225deg,rgba(10,211,238,1) 0%,rgba(10,190,213,1) 100%);
  border-radius:2px;
  float:right;
  font-weight: 500;
  margin-right: 15px;
  border:1px solid #0ABED5;
  color: #fff;
}
</style>

