<template>
  <div class="myOrderContainer">
    <div class="title">下级进货信息</div>
    <div class="infoBox">
      <div class="info clearfix">
        <img :src="headImgUrl" alt="">
        <div class="center">
          <div class="name clearfix">
             <span>{{name}}</span>
             <em>{{ptLevel}}</em>
          </div>
          <em class="mobile">{{mobile}}</em>
        </div>
        <div class="right">
          <span>进货数量</span>
          <div>{{number}}<i>盒</i></div>
        </div>
      </div>
    </div>
    <div class="title">线下发货流程</div>
    <div class="content">
      <p class="tip">1.请确认收到货款后再操作发货；</p>
      <p class="tip">2.点击确认发货按钮，即可完成发货</p>
      <p class="tip">3.发货完成后，请自行将商品交给你的下级。</p>
      <img class="icon" src="../../assets/img/underlineAllOrder/img_banner_01@2x.png" alt="">    
    </div>
    <div class="_height44"></div>
    <a href="javascript:;" class="btn" @click="confirmOrder">确认发货</a>
  </div>
</template>
<script> 

  import commonJs from '@/util/common'
  import { apiShipOrder } from '@/api/underLineAllOrder';
  import { Toast, Dialog} from 'vant';
  export default {
  data() {
    return {
      mobile: null, 
      name: null,
      ptLevel: null,
      number: null,
      headImgUrl: null,
      orderNo: null
    }
  },
 
  mounted(){ 
      commonJs.outSideShare();
      this.mobile = this.$route.query.mobile; 
      this.name = this.$route.query.name;
      this.ptLevel = this.$route.query.ptLevel; 
      this.number = this.$route.query.number; 
      this.headImgUrl = this.$route.query.headImgUrl; 
      this.orderNo = this.$route.query.orderNo; 

  },
  methods:{
   
    confirmOrder(id){
      var _this = this;
      Dialog.confirm({
        // title: '订单处理',
        message: '是否确认发货'
      }).then(() => {
      _this.receivingGoodFn()
      }).catch(() => {
        // on cancel
      });
    },
    
    receivingGoodFn(id){//确认收货状态
      var timer = setTimeout(()=>{
        Toast.loading({
          loadingType: 'spinner',
        });
      },500);

      apiShipOrder({
        orderNo:this.orderNo
      }).then((res)=>{
        clearTimeout(timer);
        if (res.code.toString() === '10000') {
           this.$router.push({
            name: 'underLineAllOrderPayment',
          })
        }else{
          this.$toast(res.code)
        }
      }).catch(error=>{
        clearTimeout(timer);
        Toast.clear(true);

      })

    }
  }
}
</script>
<style lang="less">
  .myOrderContainer{
    width: 100%;
    min-height: 100%;
    position:absolute;
    left:0;
    top:0;
    background:#fff;
    .title{
      height:22px;
      font-size:16px;
      background:;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:22px;
      padding-left: 20px;
      padding: 15px 0 10px 20px;
      background:rgba(245,245,245,1);
    }
    .infoBox{
      padding:20px;
      background:#fff;
      .info{
        width: 305px;
        height:62px;
        background:rgba(244,255,255,1);
        border-radius:5px;
        padding: 0 20px 0 10px;
        img{
          width:30px;
          height:30px;
          object-fit: cover;
          margin-right: 10px;
          float: left;
          border-radius: 50%;
          margin-top: 15px;
        }
        .center{
          padding-top: 10px;
          float: left;
          .name{
            height: 18px;
            margin-bottom: 6px;
            span{
              height:18px;
              font-size:14px;
              font-weight:500;
              color:rgba(51,51,51,1);
              line-height:18px;
              float:left;
              margin-right: 4px;
            }
            em{
              height:14px;
              background:linear-gradient(45deg,rgba(253,223,192,1) 0%,rgba(255,222,189,1) 100%);
              border-radius:2px;
              line-height: 14px;
              text-align: center;
              color:rgba(245,142,0,1);
              font-size: 12px;
              padding:0 5px;
              margin-top: 2px;
              float:left;
            }
          }
          .mobile{
            height:18px;
            font-size:14px;
            font-weight:400;
            color:rgba(51,51,51,1);
            line-height:18px;
          }
        }
        .right{
          margin-top: 14px;
          float: right;
          span{
            height:14px;
            font-size:10px;
            font-weight:400;
            color:rgba(102,102,102,1);
            line-height:14px;
            margin-bottom: 3px;
            display: block;
          }
          div{
            height:16px;
            font-size:14px;
            font-weight:400;
            color:rgba(214,45,45,1);
            line-height:16px;
            display: block;
            i{
              font-size: 12px;
            }
          }
        }
      }
    }
    .content{
      background: #fff;
      padding:20px;
      .tip{
        font-size:15px;
        font-weight:400;
        color:rgba(51,51,51,1);
        line-height:21px;
        margin-bottom: 3px;
      }
      .icon{
        width: 260px;
        display: block;
        margin: 0 auto;
        margin-top: 40px;
        margin-bottom: 45px;
      }
    }
    ._height44{
      width:100%;
      height:44px;
    }
    .btn{
        width:335px;
        height:44px;
        background:linear-gradient(225deg,rgba(10,211,238,1) 0%,rgba(10,190,213,1) 100%);
        font-size:16px;
        line-height: 44px;
        text-align: center;
        color:#fff;
        position: fixed;
        left:50%;
        margin-left: -167px;
        bottom:20px;
    }
  }
</style>