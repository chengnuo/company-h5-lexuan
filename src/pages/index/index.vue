<!-- <template>
  <div class="indexContainer">
    <div class="banner">
      <div class="list">
        <img src="../../assets/img/index/icon_01／fake_01@2x.png">
        <img src="../../assets/img/index/icon_01／introduction_01@2x.png">
        <img src="../../assets/img/index/icon_01／ordergoods_01@2x.png">
        <img src="../../assets/img/index/icon_01／report_01@2x.png">
      </div>
    </div>  
    <div class="main">
      <van-swipe :autoplay="3000" indicator-color="rgba(80,236,187,1)" @change="onChange">
        <van-swipe-item><img src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3008142408,2229729459&fm=26&gp=0.jpg"></van-swipe-item>
        <van-swipe-item><img src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3008142408,2229729459&fm=26&gp=0.jpg"></van-swipe-item>
        <van-swipe-item><img src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3008142408,2229729459&fm=26&gp=0.jpg"></van-swipe-item>
        <van-swipe-item><img src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3008142408,2229729459&fm=26&gp=0.jpg"></van-swipe-item>
      </van-swipe>
      <div class="commonBox" >
        <div class="title clearfix">
          <div class="left">
            <em>累计收益</em>
            <span>{{incomeIndex.totalIncome}}</span>
          </div>
          <div class="right">
            <em>今日收益</em>
            <span class="red" v-if="incomeIndex.todayTotalIncome>0">+{{incomeIndex.todayTotalIncome}}</span>

            <span v-if="incomeIndex.todayTotalIncome<=0">+{{incomeIndex.todayTotalIncome}}</span>
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <em>在途收益</em>
            <div>
              <span>{{incomeIndex.totalUavaIncome}}</span>
              <i></i>
            </div>
          </div>
          <div class="right">
            <em>可提收益</em>
            <div>
              <span>{{incomeIndex.todayWithdrawIncome}}</span>
              <i></i>
            </div>
          </div>
        </div>
      </div>
      <div class="commonBox">
        <div class="title clearfix">
          <div class="left">
            <em>累计销售</em>
            <span>{{incomeIndex.totalConsume}}</span>
          </div>
          <div class="right">
            <em>今日销售</em>
            <span class="red" v-if="incomeIndex.todayTotalConsume>0">+{{incomeIndex.todayTotalConsume}}</span>
            <span v-if="incomeIndex.todayTotalConsume<=0">+{{incomeIndex.todayTotalConsume}}</span>
          </div>
        </div>
        <div class="bottom">
          <div class="left">
            <em>总订购数</em>
            <div>
              <span>{{incomeIndex.totalBuy}}</span>
              <i></i>
            </div>
          </div>
          <div class="right">
            <em>总客户数</em>
            <div>
              <span>{{incomeIndex.totalTeam}}</span>
              <i></i>
            </div>
          </div>
        </div>
      </div>
      <div class="questions">
        <div class="title">
          <span></span>
          常见问题
        </div>
        <van-collapse v-model="activeNames">
          <van-collapse-item title="什么是在途收益？" name="1">
          <div class="small-title">
            如何提现？
          </div>
          <p>选择“提现”、提现银行卡，输入提现金额，点击“下一步” 输入支付密码，即可提交提现申请。</p>
        </van-collapse-item>
        </van-collapse>
      </div>
    </div>
    <bottomBanner :index="0"></bottomBanner>
  </div>
</template>
<script >
  import { incomeIndex, questionList, poolList } from '@/api/index'
  import { Toast, Swipe, SwipeItem, Collapse, CollapseItem } from 'vant';
  import bottomBanner from '@/components/bottomBanner';
  export default{
    name:'Index',
    data(){
      return{
        activeNames: [''],
        incomeIndex: null,
        poolList:null
      }
    },

    mounted(){
     this.getIncomeIndexFn();
     this.getPoolListFn();
     // this.getQuestionListFn();
    },

    methods:{
      onChange(index) {
        // Toast('当前 Swipe 索引：' + index);
      },
      getIncomeIndexFn(){
        incomeIndex({}).then((res)=>{ 
          if (res.code.toString() === '10000') {
            this.incomeIndex = res.data;
          }
        }).catch(error=>{
          // Toast.fail(error)
        })
      },
      getPoolListFn(){
        poolList({}).then((res)=>{ 
          if (res.code.toString() === '10000') {
            this.poolList = res.data;
          }
        }).catch(error=>{
          // Toast.fail(error)
        })
      },
      getQuestionListFn(){
        questionList({}).then((res)=>{ 
          if (res.code.toString() === '10000') {
            console.log(res)
          }
        }).catch(error=>{
          // Toast.fail(error)
        })
      }

    },
    components: {
      bottomBanner
    }
  }
</script>
<style lang="less" scoped>
 .indexContainer{
    width: 100%;
    .banner{
      width:375px;
      height:180px;
      background:-webkit-linear-gradient(top right, rgba(82,225,176,1) 0%, rgba(38,197,218,1) 100%);
      background:-o-linear-gradient(top right, rgba(82,225,176,1) 0%, rgba(38,197,218,1) 100%);
      background:linear-gradient(to bottom left, rgba(82,225,176,1) 0%, rgba(38,197,218,1) 100%);
      .list{
        display: flex;
        padding-left:20px;
        padding-top:56px;
        img{
          width: 74px;
          height: 74px;
          margin-right: 13px;
        }
      }
    }
    .main{
      width: 345px;
      margin:0 auto;
      margin-top: -40px;
      position: relative;
      .van-swipe{
        width: 100%;
        height:120px;
        border-radius:6px;
        margin-bottom: 11px;
      }
      .commonBox{
        width:345px;
        height:156px;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 8px 0px rgba(0,0,0,0.04);
        border-radius:6px;
        margin: 0 auto;
        margin-bottom: 11px;
        overflow: hidden;
        .title{
          padding:0 20px 15px;
          border-bottom:rgba(238,238,238,1) solid 1px;
          .left{
            float: left;
            padding-top:20px;
            em{
              height:14px;
              font-size:14px;
              font-weight:400;
              color:rgba(153,153,153,1);
              line-height:14px;
              display: block;
            }
            span{
              height:24px;
              font-size:26px;
              font-weight:400;
              color:rgba(51,51,51,1);
              line-height:24px;
              margin-top: 8px;
              display: block;
            }
          }
          .right{
            float: right;
            padding-top:28px;
            em{
              height:12px;
              font-size:10px;
              font-weight:400;
              color:rgba(153,153,153,1);
              line-height:12px;
              display: block;
            }
            span{
              height:20px;
              font-size:20px;
              font-weight:400;
              line-height:20px;
              display: block;
              color:rgba(153,153,153,1);
              margin-top: 6px;
              &.red{
                color:rgba(214,45,45,1);
              }

            }
          }
        }
        .bottom{
          display: flex;
          .left,.right{
            flex:1;
            border-right:solid 1px rgba(238,238,238,1);
            padding:18px 0 20px 21px;
            em{
              height:16px;
              font-size:14px;
              font-weight:400;
              color:rgba(51,51,51,1);
              line-height:16px;
              display: block;
              margin-bottom: 10px;
            }
            div{
              height: 16px;
              span{
                height: 16px;
                font-size:14px;
                font-weight:400;
                color:rgba(153,153,153,1);
                line-height:16px;
                float: left;
              }
              i{
                font-size:14px;
                font-weight:400;
                color:rgba(214,45,45,1);
                line-height:16px;
                float: right;
              }
            }
          }
          .right{
            border:none;
          }
        }
      }
      .questions{
        .title{
          height:17px;
          font-size:12px;
          position:relative;
          font-weight:400;
          color:rgba(153,153,153,1);
          line-height:17px;
          padding-left:5px;
          margin-bottom: 2px;
          span{
            width:2px;
            height:12px;
            background:linear-gradient(225deg,rgba(10,211,238,1) 0%,rgba(10,190,213,1) 100%);
            position:absolute;
            left:0;
            top:2px;
          }
        }
        .van-cell__title{
          height:20px;
          font-size:14px;
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:20px;
        }
        .small-title{
          height:20px;
          font-size:14px;
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:20px;
          padding-bottom:5px;
        }
        p{
          font-size:12px;
          font-weight:400;
          color:rgba(153,153,153,1);
          line-height:17px;
        }
      }
    }
 }
</style> -->