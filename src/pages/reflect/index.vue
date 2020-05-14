<template>
  <div class="reflect">
    <div class="cashToCashLayout">
      <div class="cashToCash">提现到</div>
    </div>

    <div class="payItems">
      <div class="payItem clearfix">
        <div class="leftbar fl">
          <img class="img"
               src="../../assets/img/reflect/icon_07_wechat_01.png" />
        </div>
        <div class="centerbar fl">
          <span class="payName">微信</span>
          <span class="description">{{payItemsDescription}}</span>
        </div>
        <div class="rightbar fr">
          <span class="description">
            <span @click="handleReflectWithdrBankBind" v-if="isBind">去绑定</span>
            <span v-else @click="apiReflectWithdrBankUnbind">解除绑定</span>
          </span>
          <span class="rightbarIcon">
            <img src="../../assets/img/reflect/icon_05_more_03.png" />
          </span>
        </div>
      </div>
    </div>

    <div class="sumMoneyExtracted clearfix">
      <div class="leftbar fl">提取金额</div>
      <div class="rightbar fr">
        可提取金额
        <span class="price">{{reflectWithdrBankBindIndex.bal.acBal}}</span>
        元
      </div>
    </div>

    <div class="inputAmountLayout ">
      <div class="leftbar">输入提现金额</div>
      <div class="centerbar clearfix">
        <div class="symbol fl">¥</div>
        <input class="input fl"
               v-model.number="price"
               ref="priceInput" />
        <div class="all fl"
             @click="handleAll">全部</div>
      </div>
    </div>

    <div class="sendBtn" @click="handleSend">提交</div>
    <div class="arrivalAccountdescription">7天内到账</div>

    <!-- <div class="reflectWithdrBankBind" @click="handleReflectWithdrBankBind">提现绑定</div> -->

    <div class="withdrawalsRecord">
      <div class="title">提现记录</div>
      <div class="items" v-if="withdrawalsRecord.length>0">
        <div v-for="(item,index) in withdrawalsRecord" :key="index">
          <div class="item clearfix">
            <div class="leftbar fl">
              <div class="name">提现到{{item.bankName}}</div>
              <div class="time">{{item.addTime}}</div>
            </div>
            <div class="rightbar fr">
              <div class="price">{{item.price}}元</div>
              <div class="description">
                <span v-if="item.orderStatus=='A'">审核中</span>
                <span v-if="item.orderStatus=='W'">等待第三方机构处理</span>
                <span v-if="item.orderStatus=='S'">提现成功</span>
                <span v-if="item.orderStatus=='F'">提现失败</span>
                <span v-if="item.orderStatus=='R'">审核拒绝</span>
                <span v-if="item.orderStatus=='TS'">等待第三方机构处理</span>
              </div>
            </div>
          </div>
          <div class="line1px"></div>
        </div>
        <!-- <div>
          <div class="item clearfix">
            <div class="leftbar fl">
              <div class="name">提现到微信</div>
              <div class="time">2019-5-5 20:35</div>
            </div>
            <div class="rightbar fr">
              <div class="price">200元</div>
              <div class="description">提现成功</div>
            </div>
          </div>
          <div class="line1px"></div>
        </div> -->
      </div>
      <div v-if="withdrawalsRecord.length==0">
				<div class="noDataTip">
					<div>
						<img class="img" src="../../assets/img/reflect/icon_10_no_content_01@2x.png" />
					</div>
					<div class="text">没有相关数据</div>
				</div>
			</div>
    </div>

    <refelt v-if="showRefelt" :refeltKey="refeltKey" ref="refRefelt" @reflectIndexLoad="reflectIndexLoad"  />

  </div>
</template>

<script>
import PreLoading from '../../components/preLoading'
import commonJs from '@/util/common'
import { Toast } from 'vant'

import refelt from '@/components/refelt';

export default {
  name: 'Reflect',

  components: {
    PreLoading,
    refelt,
  },


  data() {
    return {
      payClientIp: '',
      reflectWithdrBankBind: {}, // 提现绑定api
      reflectWithdrBankBindIndex: {
        cardBindList: [],
        bal: {
          acBal: 0,
        },
      }, // 提现银行绑卡查询
      price: '',
      reflectCommonValue: {},
      refeltKey: {
        agrNo: '',
      },
      withdrawalsRecord: [], // 提现记录
      payItemsDescription: '',
      isBind: true, // 是否绑定
      showRefelt:false
    }
  },

  created() {

  },

  mounted() {
    if (!commonJs.getInviteCodeRedirectUrlFn().firstInviteCode) {
      commonJs.setInviteCodeRedirectUrlFn({
        firstInviteCode: this.$route.query,
        loginInviteCode: '',
        redirectUrl: ''
      }) // 设置获取-首次和登录后的inviteCode
    }

    this.apiClientIp(() => {
      this.apiReflectCommonValue(); // 基础数据
      this.apiReflectWithdrBankBindIndex(); // 提现银行绑卡查询
      // if (commonJs.isWeiXin()) {
      //   this.handleReflectWithdrBankBind();
      // }
      this.apiReflectWithdrList();
    }); // 获取客户端IP

    const code = this.$route.query.code

    if (commonJs.isWeiXin()) {
      if (!code) {
        window.location.href = `${commonJs.config.baseZhuanboUrl}/reflect/getReflectCode`;
      }
    }



  },

  methods: {
    // 初始化
    init() {

    },
    // 提现绑定api
    async apiReflectWithdrBankBind() {
      const code = this.$route.query.code
      let json = Object.assign({}, {
        code: code, // 获取code
        bankCode: 'WEIXIN',
        tradeType: 'JSAPI',
        sysCnl: 'WX-PUBLIC',
        bankCardType: '08',
        clientIp: this.payClientIp,
      })
      const res = await this.$post(this.$api.reflectWithdrBankBind, json)
      try {
        if (res.code.toString() == '10000') {
          this.reflectWithdrBankBind = res.data
          this.apiReflectWithdrBankBindIndex(); // 提现银行绑卡查询
          Toast(`绑定成功`)
        } else {
          Toast(res.msg)
        }
      } catch (error) {
        Toast(error.msg)
      }
    },
    // 提现银行绑卡查询 - reflectWithdrBankBindIndex
    async apiReflectWithdrBankBindIndex() {
      const code = this.$route.query.code
      let json = Object.assign({}, {
        sysCnl: 'WX-PUBLIC',
      })
      const res = await this.$post(this.$api.reflectWithdrBankBindIndex, json)
      try {
        if (res.code.toString() == '10000') {

          this.reflectWithdrBankBindIndex = res.data
          let bankCardName = res && res.data && res.data.cardBindList.length>0;

          // isBind111
          let result = res.data.cardBindList.map((item)=>{
            if(item.bankCode=='WEIXIN'){
              return item;
            }
          }).filter((item)=>{
            return item;
          })
          console.log('result', result)
          if(result.length>0){
            this.isBind = false;
            this.payItemsDescription = this.formatName(result[0].bankCardName)
            this.refeltKey = Object.assign({}, this.refeltKey,{
              agrNo: result[0].agrNo,
            })
          }
          
        } else {
          Toast(res.msg)
        }
      } catch (error) {
        Toast(error.msg)
      }
    },
    // 提现绑定1
    handleReflectWithdrBankBind() {
      const code = this.$route.query.code
      if (code) {
        this.$nextTick(() => {
          this.$refs.priceInput.focus()
          this.apiReflectWithdrBankBind();
        })
      } else {
        window.location.href = `/reflect/getReflectCode`;
      }

    },
    // 获取客户端IP
    async apiClientIp(callback) {
      const data = Object.assign({})
      const res = await this.$post(this.$api.payClientIp, data)
      try {
        if (res.code.toString() === '10000') {
          this.payClientIp = res.data.ip
          callback && callback()
        } else {
          Toast(res.msg)
        }
      } catch (error) {
        Toast(error)
      }
    },
    // 点击全部都时候
    handleAll() {
      this.price = this.reflectWithdrBankBindIndex.bal.acBal;
    },
    // 基础数据
    async apiReflectCommonValue() {

      var data = Object.assign({}, {
      })
      var res = await this.$post(this.$api.reflectCommonValue, data)
      try {
        if (res.code.toString() === '10000') {
          this.reflectCommonValue = res.data;
        } else {
          Toast(res.msg)
        }
      } catch (error) {
        Toast(error)
      }
    },
    // 提交
    handleSend(){
      if(this.isBind){
        Toast(`提现功能尚未绑定微信，请先绑定`)
        return false;
      }else if(this.price == null || this.price == ''){
        Toast(`请输入提现金额`)
        return false;
      }else if(this.reflectWithdrBankBindIndex.bal.acBal<this.price){
        // Toast(`提现金额不能大于可提金额`)
        Toast(`请输入小于${this.reflectWithdrBankBindIndex.bal.acBal}的提现金额`);
        return false;
      }else if(this.reflectCommonValue.withdrMaxPrice<this.price){
        // 请输入大于XXX的提现金额
        Toast(`请输入小于${this.reflectCommonValue.withdrMaxPrice}的提现金额`);
        return false;
      }else if(this.reflectCommonValue.withdrMinPrice>this.price){
        Toast(`请输入大于${this.reflectCommonValue.withdrMinPrice}的提现金额`);
        return false;
      }
      // if(this.reflectWithdrBankBindIndex.bal.acBal<=this.price && this.price>0 && this.reflectWithdrBankBindIndex.bal.acBal>0){
        if(this.reflectCommonValue.withdrMinPrice<=this.price && this.reflectCommonValue.withdrMaxPrice>=this.price){
          let sendData = Object.assign({});

          // window.sessionStorage.setItem('refeltKey', JSON.stringify({
          //   reflectCommonValue: this.reflectCommonValue,
          //   reflectWithdrBankBind: this.reflectWithdrBankBind,
          //   reflectWithdrBankBindIndex: this.reflectWithdrBankBindIndex,
          // })) // 这个保持跟之前一样。
          
          
          
          this.refeltKey = {
            agrNo: this.refeltKey.agrNo,
            price: this.price,
            clientIp: this.payClientIp || '0.0.0.0',
            withdrCommission: this.reflectCommonValue.withdrCommission,
          };

          this.showRefelt = true;
          this.$nextTick(() => {
            this.$refs.refRefelt.showTipBoxFn();
          })
        }else{
          let toastMsg = `提现金额，必须大于${this.reflectCommonValue.withdrMinPrice || ''} 并且 必须小于${this.reflectCommonValue.withdrMaxPrice || ''}`
          Toast(toastMsg)
        }
      // }else{
      //   let toastMsg = `没有可提取的金额`
      //   Toast(toastMsg)
      // }
    },
    // 提现记录
    async apiReflectWithdrList(){
      var data = Object.assign({}, {
        page: 1,
        limit: 9999,
      })
      var res = await this.$post(this.$api.reflectWithdrList, data)
      try {
        if (res.code.toString() === '10000') {
          this.withdrawalsRecord = res.data.items.filter((item)=>{
            return item.bankCode == 'WEIXIN'
          });
        } else {
          Toast(res.msg)
        }
      } catch (error) {
        Toast(error)
      }
    },
    // 解绑
    async apiReflectWithdrBankUnbind(){
      // let agrNo = this.reflectWithdrBankBindIndex && this.reflectWithdrBankBindIndex.cardBindList.length>0 && this.reflectWithdrBankBindIndex.cardBindList[0].agrNo || ''
      var data = Object.assign({}, {
        agrNo: this.refeltKey.agrNo,
        clientIp: this.payClientIp,
      })
      var res = await this.$post(this.$api.reflectWithdrBankUnbind, data)
      try {
        if (res.code.toString() === '10000') {
          this.reflectWithdrBankUnbind = res.data;
          this.apiReflectWithdrBankBindIndex(); // 提现银行绑卡查询
          Toast(`解除绑定成功`)
          window.location.href = `/reflect`
        } else {
          Toast(res.msg)
        }
      } catch (error) {
        Toast(error)
      }
    },
    formatName(name) {
        let newStr;
        if (name.length === 2) {
        newStr = name.substr(0, 1) + '*';
        } else if (name.length > 2) {
          let char = '';
          for (let i = 0, len = name.length - 2; i < len; i++) {
            char += '*';
          }
          newStr = name.substr(0, 1) + char + name.substr(-1, 1);
        } else {
          newStr = name;
        }

        return newStr;
    },
    // 组件成功的时候
    reflectIndexLoad(){
      console.log('组件成功的时候')
      this.apiReflectWithdrBankBindIndex(); // 提现银行绑卡查询
      this.apiReflectWithdrList();
      this.showRefelt = false;
      this.price = '';
    },

  }
}
</script>

<style lang="less" scoped>
.reflect {
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  height: 100vh;
  background: #f7f8fa;
  .cashToCash {
    height: 22px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
    padding-top: 20px;
    padding-bottom: 8px;
    padding-left: 15px;
  }
  .payItems {
    width: 375px;
    height: 70px;
    background: rgba(255, 255, 255, 1);
    .payItem {
      padding: 15px;
      .leftbar {
        .img {
          width: 40px;
          height: 40px;
        }
      }
      .centerbar {
        margin-left: 10px;
        margin-top: 9px;
        .payName {
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
        }
        .description {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(153, 153, 153, 1);
          line-height: 20px;
        }
      }
      .rightbar {
        margin-top: 9px;
        .description {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 18px;
          display: inline-block;
          vertical-align: middle;
        }
        .rightbarIcon {
          display: inline-block;
          vertical-align: middle;
        }
      }
    }
  }
  .sumMoneyExtracted {
    padding: 30px 15px 8px 15px;
    .rightbar {
      .price {
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(214, 45, 45, 1);
        line-height: 20px;
      }
    }
  }
  .inputAmountLayout {
    width: 375px;
    height: 116px;
    background: rgba(255, 255, 255, 1);
    .leftbar {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      line-height: 20px;
      padding-top: 24px;
      padding-left: 20px;
    }
    .centerbar {
      padding-top: 12px;
      padding-left: 20px;
      .symbol {
        height: 32px;
        font-size: 36px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        line-height: 32px;
      }
      .input {
        // height: 32px;
        font-size: 36px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
        // line-height: 32px;
        width: 275px;
        margin-left: 10px;
        margin-right: 10px;
        margin-top: -10px;
      }
      .all {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(215, 29, 52, 1);
        line-height: 20px;
        margin-top: 12px;
      }
    }
  }
  .sendBtn {
    text-align: center;
    width: 335px;
    height: 44px;
    line-height: 44px;
    background: linear-gradient(
      225deg,
      rgba(51, 51, 51, 1) 0%,
      rgba(26, 26, 26, 1) 100%
    );
    border-radius: 2px;
    margin: 40px 20px 0 20px;
    color: rgba(255, 255, 255, 1);
  }
  .arrivalAccountdescription {
    text-align: center;
    height: 18px;
    font-size: 13px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    line-height: 18px;
    padding-top: 15px;
    padding-bottom: 30px;
  }
  .withdrawalsRecord {
    width: 375px;
    // height: 214px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.04);
    .title {
      height: 19px;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(245, 159, 170, 1);
      line-height: 19px;
      text-align: center;
      padding-top: 10px;
      // padding-bottom: 20px;
    }
    .items {
      .item {
        padding: 20px;
        height: 47px;
        .name {
          height: 22px;
          font-size: 16px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 22px;
        }
        .time {
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(153, 153, 153, 1);
          line-height: 20px;
          margin-top: 5px;
        }
        .price{
          font-size:16px;
          font-family:PingFangSC-Medium,PingFang SC;
          font-weight:500;
          color:rgba(51,51,51,1);
          line-height:22px;
          text-align: right;
        }
        .description {
          height: 20px;
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          line-height: 20px;
          margin-top: 5px;
        }
      }
      .line1px {
        margin: 0 20px;
        // width: 345px;
        height: 1px;
        background: rgba(245, 245, 245, 1);
        // background: #000;
      }
    }
  }

  .noDataTip{
    width:100%;
    // position: absolute;
    // left: 0;
    // top: 260px;
    text-align: center;
    padding-bottom: 50px;
  }
  .noDataTip .img{
    width:130px;
    height: 130px;
    display: block;
    margin:0 auto;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .noDataTip .text{
    height:18px;
    font-size:13px;
    font-family:PingFangSC-Regular,PingFang SC;
    font-weight:400;
    color:rgba(153,153,153,1);
    line-height:18px;
  }
}
</style>