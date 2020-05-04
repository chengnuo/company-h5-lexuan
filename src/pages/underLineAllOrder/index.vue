<template>
  <div class="myOrderContainer">
  <van-tabs v-model="active"  animated :swipe-threshold="5">
    <van-tab title="全部">
      <van-list
        v-model="loadingArr[0]"
        :finished="finishedArr[0]"
        @load="onLoad"
      >
      <orderList @changeStatus="changeStatusFn" :showNoOrderTip="showNoOrderTipArr[0]" @receivingGood="receivingGoodFn" :orderArr="orderListArr[0]"/>
      <p class="loadEndTip" v-if="loadEndTipArr[0]">没有更多了</p>
    </van-list>
  </van-tab>
  <van-tab title="待审批">
      <van-list
        v-model="loadingArr[1]"
        :finished="finishedArr[1]"
        @load="onLoad"
      >
      <orderList @changeStatus="changeStatusFn" :showNoOrderTip="showNoOrderTipArr[1]" @receivingGood="receivingGoodFn" :orderArr="orderListArr[1]"/>
    </van-list>
    <p class="loadEndTip" v-if="loadEndTipArr[1]">没有更多了</p>
  </van-tab>
  <van-tab title="已拒绝">
      <van-list
        v-model="loadingArr[2]"
        :finished="finishedArr[2]"
        @load="onLoad"
      >
       <orderList @changeStatus="changeStatusFn" :showNoOrderTip="showNoOrderTipArr[2]" @receivingGood="receivingGoodFn" :orderArr="orderListArr[2]"/>
    </van-list>
    <p class="loadEndTip" v-if="loadEndTipArr[2]">没有更多了</p>
  </van-tab>
  <van-tab title="已发货">
    <van-list
      v-model="loadingArr[3]"
      :finished="finishedArr[3]"
      @load="onLoad"
    >
      <orderList @changeStatus="changeStatusFn" :showNoOrderTip="showNoOrderTipArr[3]" @receivingGood="receivingGoodFn" :orderArr="orderListArr[3]"/>
    </van-list>
    <p class="loadEndTip" v-if="loadEndTipArr[3]">没有更多了</p>
  </van-tab>
</van-tabs>
  <goBack/>
  </div>
</template>
<script> 
  import commonJs from '@/util/common'
  import goBack from '@/components/goBack';
  import {  apiListOrder, apiCancelOrder, apiFinishOrder } from '@/api/underLineAllOrder';
  import orderList from '@/components/underLineAllOrder';
  import { Toast} from 'vant';
  export default {
  data() {
    return {
      active: 0, 
      // loading: false,
      // finished: false,
      loadingArr:[false,false,false,false,false],
      showNoOrderTipArr:[false,false,false,false,false],
      finishedArr:[false,false,false,false,false],
      loadEndTipArr:[false,false,false,false,false],
      pageArr:[1,1,1,1,1],
      orderListArr:[[],[],[],[],[],[]],
    }
  },
  watch: {
    // this.onLoad();
    active(val) { 
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  },
  mounted(){  
    commonJs.outSideShare();
  },
  methods:{
    onLoad() {
      console.log(this.finishedArr)
        var status = '';
        switch (parseInt(this.active)) {
          case 0:
              status = ''
            break;
          case 1:
              status = 'A'
            break;
          case 2:
              status = 'R'
            break;
          case 3:
              status = 'WD'
            break; 
        } 
        var timer = setTimeout(()=>{
          if(this.pageArr[this.active]  == 1){
            Toast.loading({
              duration: 0,       // 持续展示 toast
              forbidClick: true, // 禁用背景点击
              loadingType: 'spinner',
              message:'加载中...'
            });
          }
        },500);
        apiListOrder({
          page:this.pageArr[this.active],
          limit:10,
          status,
          position:1,
          purchTypes:[4]
        }).then((res)=>{

          if(res.code.toString() === '10000'){

              clearTimeout(timer);
              Toast.clear(true);
              if(this.pageArr[4] == 1 && this.orderListArr[4].length > 0){
                this.orderListArr[4] = [];
              }
              for(var i = 0; i < res.data.items.length; i++){ 
                this.orderListArr[this.active].push(res.data.items[i]);
                if(this.active == 3){
                  for(var j = 0; j < this.orderListArr[2].length; j++){
                    if(res.data.items[i].orderNo == this.orderListArr[2][j].orderNo){
                      this.orderListArr[2].splice(j,1);
                      if(this.orderListArr[2].length <= 0){this.showNoOrderTipArr.splice(2, 1, true)}
                    }
                  }
                  for(var q = 0; q < this.orderListArr[0].length; q++){
                    if(res.data.items[i].orderNo == this.orderListArr[0][q].orderNo){
                      var json = res.data.items[i];
                      json.orderStatusText = '待收货';
                      json.status = 'WD';
                      this.orderListArr[0].splice(i, 1, json);
                    }
                  }
                }
                if(this.active == 0){
                  for(var y = 0; y < this.orderListArr[1].length; y++){
                    if(res.data.items[i].orderNo == this.orderListArr[1][j].orderNo && res.data.items[i].status == "C"){
                      this.orderListArr[1].splice(j,1);
                      if(this.orderListArr[1].length <= 0){this.showNoOrderTipArr.splice(1, 1, true)}
                    }
                  }
                }
              } 

            //显示没有提示订单提示
            if(res.data.items.length <= 0 && this.pageArr[this.active ] == 1){
              this.showNoOrderTipArr.splice(this.active, 1, true); 
            }

            this.loadingArr.splice(this.active, 1, false); 

            //加载完毕提示
            if(res.data.items.length < 10) this.finishedArr.splice(this.active, 1, true); 

            //展示没有更多提示
            if(res.data.items.length < 10 && this.orderListArr[this.active].length >= 8) this.loadEndTipArr.splice(this.active, 1, true); 

            //页数加1 用于下次请求
            this.pageArr[this.active] = this.pageArr[this.active] + 1;
          }else{
            window.location.href = `/login?inviteCode=${window.location.search}`
          }
          

      

        }).catch(error=>{
          this.$toast(error)
          clearTimeout(timer);
          Toast.clear(true);
        })

         // 加载状态结束
    },
    changeStatusFn(id){
      var timer = setTimeout(()=>{
        Toast.loading({
          loadingType: 'spinner',
        });
      },500);
      apiCancelOrder({
        orderNo:id
      }).then((res)=>{
        clearTimeout(timer);
        Toast.clear(true);
        //全部状态修改为已取消 状态
        for(var i = 0; i < this.orderListArr[0].length; i++){
          console.log(this.orderListArr[0][i].orderNo)
          if(this.orderListArr[0][i].orderNo == id){
            var json = this.orderListArr[0][i];
            json.orderStatusText = '已拒绝';
            json.status = 'R';
            this.orderListArr[0].splice(i, 1, json);
            break;
          }
        }  
        this.$toast('取消订单成功');
      }).catch(error=>{

        clearTimeout(timer);
        Toast.clear(true);

      })
    },
    receivingGoodFn(json){//确认收货状态
      this.$router.push({
        name: 'DeliverGoods',
        query: {
          mobile: json.mobile, 
          name: json.userName,
          ptLevel: json.ptLevel,
          number: json.goodsList[0].number,
          headImgUrl: json.headImgUrl,
          orderNo: json.orderNo
        }
      })
    }
  },
  components: {
    orderList,
    goBack
  }
}
</script>
<style lang="less">
  .myOrderContainer .loadEndTip{
    color: #999;
    font-weight: 14px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    padding-bottom:8px;
  }
   .myOrderContainer  .van-tabs__wrap {
    position:fixed;
    left:0;
    top:0;
    width: 100%;
    z-index: 333;
    border:none !important;
  }
  .van-tabs__wrap:after {
    border:none !important;
  }
   .myOrderContainer  .van-tab{
    width: 96px !important;
    flex-basis: auto !important;
    -webkit-box-flex: auto !important;
    -webkit-flex:auto !important; 
    flex: auto !important;
  }
   .myOrderContainer .van-tab--active{
    color: #09C2DA;
  }
   .myOrderContainer .van-tabs__line{
    background: #09C2DA;
  }
   .myOrderContainer .van-tab__pane-wrapper{
    padding-top:40px;
  }
   .myOrderContainer  .van-swipe{
    width:100%;
    height: 100%;
    position:absolute;
    left:0;
    top:42px;
  }
   .myOrderContainer .van-swipe .scrollBox{
    height: 100%;
    overflow-y: scroll;
  }
  .myOrderContainer{
    width:100%;
    min-height: 100%;
    position: absolute;
    left:0;
    top:0;
    background:rgba(245,245,245,1);
    overflow: hidden;
  }
  .myOrderContainer .swiperTab{
    width: 100%;
    position: fixed;
    left:0;
    top:0;
    z-index: 1;
    background: #fff;
  }
  .myOrderContainer .swiperTab{
    display: flex;
    padding:0 26px;
  } 
  .myOrderContainer .swiperTab div{
    height:21px;
    font-size:15px;
    font-weight:400;
    color:#999999;
    line-height:21px;
    margin-right:28px;
    padding-bottom:11px;
    padding-top:8px;
  } 
  .myOrderContainer .swiperTab .active{
    font-size: 15px;
    font-weight: 500;
    color: #DB9202;
    border-bottom:2px solid #DB9202;
  }
  .myOrderContainer .swiperTab .last{
    margin-right:0;
  }
</style>