<!-- 验证银行卡信息 -->
<template>
  <div class="verificationBankCards">
    <div class="cardHeader">
      <van-cell-group>
        <van-cell
          title="银行卡"
          :value="`${mpwjBankInfo.bankName}${mpwjBankInfo.bankCardType=='01'?'储蓄卡':'信用卡'}`"
        />
        <!-- :value="`${mpwjBankInfo.bankCardNo}`" -->
        <van-cell
          title="卡　号"
          :value="`${computedNankCardNo}`"

        />
      </van-cell-group>
    </div>

    <div class="cardBody">
      <div class="title">填写银行预留信息</div>
      <van-cell-group>
        <van-field
          v-model="payload.bankCardName"
          label="持卡人"
          placeholder="持卡人姓名"
        />

        <van-field
          v-model="payload.cardNo"
          :placeholder="'输入证件号码'"
          :maxlength="19"
          v-if="mpwjBankInfo.bankCardType == '01'"
        >
          <span slot="label">
            <!-- <span @click="handleId"> -->
            <span>
              <span class="idCartTitle">{{cardTypeName}}</span>
              <!-- <img class="idCartImg" src="../../assets/img/pay/triangle_01@2x.png" /> -->
            </span>
          </span>
        </van-field>

        <van-field
          v-model="payload.cardNo"
          :placeholder="'输入证件号码'"
          :maxlength="19"
          v-if="mpwjBankInfo.bankCardType == '02'"
        >
          <span slot="label">
            <span>
              <span class="idCartTitle">{{cardTypeName}}</span>
            </span>
          </span>
        </van-field>

        <van-field
          v-model="payload.mobile"
          label="手机号"
          placeholder="银行预留手机号"
          right-icon="question"
          @click-right-icon="handleMobileIcon"
          :maxlength="11"
        />

        <!-- v-if="mpwjBankInfo.bankCardType == '02'" -->
        <van-field
          v-if="mpwjBankInfo.bankCardType == '02'"
          v-model="payload.validDate"
          label="有效期"
          placeholder="卡正面有效期，月份/年份"
          right-icon="question"
          @click-right-icon="handleValidDateIcon"
          @click="handleValidDate"
        />

        <van-field
          v-if="mpwjBankInfo.bankCardType == '02'"
          v-model="payload.cvn2"
          label="安全码"
          placeholder="卡背面签名栏处数字后三位或者四位"
          right-icon="question"
          @click-right-icon="handleCvn2Icon"
          :maxlength="4"
        />

      </van-cell-group>
    </div>

    <div class="agreement" @click="handlePayAgree">
      查看
      <span class="payAgreement" >《支付协议》</span>
    </div>

    <div class="commitLayout">
      <van-button
        type="default"
        class="commitBtn"
        @click="firstCommit"
        :disabled="!isDisabledCommitBtn()"
        >同意协议并验证</van-button>
    </div>

    <van-popup
      v-model="infoErrorDialog0"
      round
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        :values="payload.cardType"
        :columns="columns"
        @change="infoErrorDialog0OnChange"
        show-toolbar
        @cancel="infoErrorDialog0OnCancel"
        @confirm="infoErrorDialog0OnConfirm"
       />
    </van-popup>
    <!-- <van-action-sheet
      v-model="show"
      :actions="actions"
      @select="onSelect"
    /> -->

    <van-dialog
      v-model="infoErrorDialog1"
      :show-confirm-button="false"
      class="infoErrorDialog1"
      title="手机号"
    >
      <div class="content">
        银行预留手机号是在银行卡办卡时填写的手机号，若遗忘、换号可联系银行客服电话处理
      </div>
      <van-button type="default"
                  class="successBtn"
                  @click="infoErrorDialog1Ok"
                  >知道了</van-button>
    </van-dialog>

    <van-dialog
      v-model="infoErrorDialog2"
      :show-confirm-button="false"
      class="infoErrorDialog2"
      title="有效期"
    >
      <div class="content">
        有效期是信用卡正面卡号下方的四位数字，格式为“月份/年”，如03/22
        <img class="img" src="../../assets/img/pay/icon_front_01@2x.png" />
      </div>
      <van-button type="default"
                  class="successBtn"
                  @click="infoErrorDialog2Ok"
                  >知道了</van-button>
    </van-dialog>

    <van-dialog
      v-model="infoErrorDialog3"
      :show-confirm-button="false"
      class="infoErrorDialog3"
      title="安全码"
    >
      <div class="content">
        安全码是信用卡背面签名栏处数字后三位
        <img class="img" src="../../assets/img/pay/icon_the reverse side_01@2x.png" />
      </div>
      <van-button type="default"
                  class="successBtn"
                  @click="infoErrorDialog3Ok"
                  >知道了</van-button>
    </van-dialog>

    <van-dialog
      v-model="infoErrorDialog4"
      :show-confirm-button="false"
      class="infoErrorDialog4"
    >
      <div class="content">
        你填写的信息有误，请核对后再试
      </div>
      <van-button type="default"
                  class="successBtn"
                  @click="infoErrorDialog4Ok"
                  >知道了</van-button>
    </van-dialog>

    <van-dialog
      v-model="infoErrorDialog5"
      :show-confirm-button="false"
      class="infoErrorDialog5"
    >
      <div class="content">
        本次输入的身份证信息将进行实名认证，一旦确认，不可修改，下次绑卡时，只可输入此身份绑定的银行卡，是否确认？
      </div>
      <div class="footer">
        <van-button type="default"
                  class="footerBtn okBtn"
                  @click="infoErrorDialog5Ok"
                  >确定</van-button>
        <van-button type="default"
                  class="footerBtn cancelBtn"
                  @click="infoErrorDialog5Cancel"
                  >取消</van-button>
      </div>
    </van-dialog>

    <!-- :min-date="minDate" -->
    <van-popup
      v-model="infoErrorDialog6"
      round
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-datetime-picker
        v-model="validDate"
        type="year-month"
        :formatter="formatter"
        @confirm="handleDialogValidDateConfirm"
        @change="handleDialogValidDateChange"
        @cancel="handleDialogValidDateCancel"
      />
    </van-popup>

  </div>
</template>

<script>
import { Toast } from 'vant'

import cryptoJS from '@/util/cryptoJS'
import commonJs from '@/util/common'
import { apiUnifiedMobile, payClientIp} from '@/api/pay';
export default {
  name: 'verificationBankCards',
  data() {
    return {
      validDate: new Date(),
      platform: 'XFYLMALL',
      cardTypeName: '身份证', // cardType
      payload: {
        // bankCode: '',
        // bankCardNo: '',
        cardType: '1', // 证件类型
        cardNo: '', // 证件号码
        bankCardName: '', // 持卡人姓名
        mobile: '', // 银行预留手机
        validDate: '', // 有效期 MMYY(月月年年) 贷记卡必填
        cvn2: '' // 安全码 贷记卡必填

      }, // 请求信息
      message: '',
      infoErrorDialog0: false,
      infoErrorDialog1: false,
      infoErrorDialog2: false,
      infoErrorDialog3: false,
      infoErrorDialog4: false,
      infoErrorDialog5: false,
      infoErrorDialog6: false,
      columns: [
        {
          text: '身份证',
          desc: '身份证',
          id: '1'
        },
        // {
        //   text: '港澳居民来往内地通行证',
        //   desc: '通行证',
        //   id: '6'
        // },
        // {
        //   text: '台湾居民来往大陆通行证',
        //   desc: '台胞证',
        //   id: '5'
        // },
        // {
        //   text: '外籍护照',
        //   desc: '护　照',
        //   id: '8'
        // }
      ],
      mpwjBankInfo: {},
      payClientIp: '' // ip
      // computedNankCardNo: '' // 银行卡号分4位空格
    }
  },
  mounted() {
    this.init()

    this.platform = commonJs.getPlatform().platform;

    // if(this.platform == 'XFYLMALL'){
      
    //   this.goHome() // 如果没有登录信息，直接跳回9980
    //   this.wxShare() // 分享
    // }

  },
  computed: {
    computedNankCardNo() {
      const v = this.mpwjBankInfo.bankCardNo || ''
      return v.replace(/\s/g, '').replace(/(.{4})/g, '$1 ')
    }
  },
  methods: {
     goHome() {
      const userData = JSON.parse(sessionStorage.getItem('userData')) || {}
      const inviteCode = this.$route.query.inviteCode || ''
      if (!userData.id) {
        window.location.href = `/login?inviteCode=${inviteCode}`
      }
    },
    // 分享
    wxShare() {
      const userData = JSON.parse(window.sessionStorage.getItem('userData')) || {}
      const inviteCode = userData.inviteCode || this.$route.query.inviteCode || ''
      commonJs.outSideShare({
        title: '乐选',
        desc: `幸福好管家，经营好帮手`,
        link: `${commonJs.getUrl()}/login?inviteCode=${inviteCode}`,
        img: `${commonJs.getUrl()}/static/logo.png`
      })
    },
    init() {
      // cryptoJS.decrypted('CIDtcy7H0suSWQC49L8bSQ==')

      // sessionStorage.setItem('mpwjBankInfo', JSON.stringify({
      //   'bankCardNo': '6216261000000000018',
      //   'bankCode': 'SPABANK',
      //   'bankName': '平安银行借记卡',
      //   'bankAbbr': '平安银行',
      //   'bankCardType': '01'
      // }))
      const mpwjBankInfo = JSON.parse(sessionStorage.getItem('mpwjBankInfo')) || {}
      this.mpwjBankInfo = mpwjBankInfo

      const getVerificationBankCardsInfo = JSON.parse(sessionStorage.getItem('verificationBankCardsInfo')) || {}

      if (getVerificationBankCardsInfo.bankCardName || getVerificationBankCardsInfo.cardNo || getVerificationBankCardsInfo.mobile) {
        this.payload = Object.assign({}, getVerificationBankCardsInfo)
        this.cardTypeName = this.columns.filter((item) => {
          if (item.id == this.payload.cardType) {
            return item
          }
        }).map((item) => item.desc)[0]
      }

      this.apiClientIp()
    },
    // 按钮
    isDisabledCommitBtn() {
      const bankCardName = this.payload.bankCardName
      const cardNo = this.payload.cardNo && (this.payload.cardNo.length >= 12 && this.payload.cardNo.length <= 19)
      const mobile = this.payload.mobile && (this.payload.mobile.length === 11)
      const isDisabled = bankCardName && cardNo && mobile
      return isDisabled
    },
    // 获取客户端IP
    apiClientIp(callback) {
      payClientIp({}).then((res)=>{ 
        if (res.code.toString() === '10000') {
          this.payClientIp = res.data.ip
          callback && callback()
        } else {
          Toast.fail(res.msg)
        }
      }).catch(error=>{
        Toast.fail(error)
      })
    }, 
    // 订单支付
    apiPayMobileUnified(parameter, callback, errorCallback) {

      var timer = setTimeout(() => {
        Toast.loading({
          duration: 0, // 持续展示 toast
          forbidClick: true, // 禁用背景点击
          loadingType: 'spinner',
          message: '加载中'
        })
      }, 300)

      const data = Object.assign({}, {
        platform: this.platform,
      }, parameter)

      apiUnifiedMobile(data).then((res)=>{ 
        clearTimeout(timer)
        if (res.code.toString() === '10000') {
          callback && callback(res)
        } else {
          if (errorCallback) {
            errorCallback()
          } else {
            Toast.fail(res.msg)
          }
        }
        Toast.clear()
          
        
      }).catch(error=>{
        clearTimeout(timer)
        Toast.clear()
        console.log('error', error)
        Toast.fail(error.msg)
      })

    },
    // 年月
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      }
      return value
    },
    // 点击身份证
    handleId() {
      this.infoErrorDialog0 = true
    },
    handleIdInput() {
    },
    onSelect(item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.infoErrorDialog0 = false
      this.payload.cardType = item.name
    },
    infoErrorDialog0OnChange(picker, value, index) {
      // this.$toast(`当前值：${value}, 当前索引：${index}`);
      this.payload.cardType = value.id
      this.cardTypeName = value.desc
    },
    infoErrorDialog0OnConfirm() {
      this.infoErrorDialog0 = false
    },
    infoErrorDialog0OnCancel() {
      this.infoErrorDialog0 = false
    },
    // 第一次同意
    firstCommit() {
      // if(!this.payload.bankCardNo){
      //   Toast.fail('请选择银行卡')
      //   return false;
      // }else if(!this.payload.bankCardNo){
      //   Toast.fail('请输入银行卡号')
      //   return false;
      // }else

      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/

      if (!this.mpwjBankInfo.bankCode) {
        Toast.fail('请选择银行卡')
        return false
      } else if (!this.mpwjBankInfo.bankCardNo) {
        Toast.fail('请输入银行卡号')
        return false
      } else if (!this.payload.bankCardName) {
        Toast.fail('请输入持卡人姓名')
        return false
      } else if (!this.payload.cardNo) {
        Toast.fail('请输入证件号码')
        return false
      } else if (!this.payload.mobile) {
        Toast.fail('银行预留手机号')
        return false
      } else if (!reg.test(this.payload.mobile)) {
        Toast.fail('手机格式不正确')
        return false
      } else if (!this.payload.validDate && this.mpwjBankInfo.bankCardType === '02') {
        Toast.fail('请输入有效期')
        return false
      } else if (!this.payload.cvn2 && this.mpwjBankInfo.bankCardType === '02') {
        Toast.fail('请输入安全码')
        return false
      } else {
        // this.infoErrorDialog5 = true
        this.infoErrorDialog5Ok()
      }
    },
    // 第二次同意
    infoErrorDialog5Ok() {
      const userData = JSON.parse(sessionStorage.getItem('userData')) || {}
      const mpwjBankInfo = JSON.parse(sessionStorage.getItem('mpwjBankInfo')) || {}
      // http://showdoc.sys.jxblot.com/web/#/3?page_id=779
      let commitDataOne = {}
      let bankCardType02Data = {}

      if (mpwjBankInfo.bankCardType == '02') {
        bankCardType02Data = {
          validDate: this.payload.validDate ? cryptoJS.encrypted(this.payload.validDate.split('/').join('')) : '', // 有效期 MMYY(月月年年)(AES加密) 贷记卡必填
          cvn2: this.payload.cvn2 ? cryptoJS.encrypted(this.payload.cvn2) : '' // 安全码(AES加密) 贷记卡必填
        }
      }
      commitDataOne = Object.assign({}, {
        methodType: 'QuickSign', // 接口类型QuickSign
        requestId: new Date().getTime(), // 请求流水
        userId: commonJs.getPlatform().userId ||userData.id, // 	商城用户ID
        // userId: 404, // 	商城用户ID
        bankCardName: this.payload.bankCardName, // 持卡人姓名
        cardType: this.payload.cardType, // 证件类型 1:身份证 2:护照 3:军官证 4:回乡证 5:台胞证 6:港澳通行证 7:国际海员证 8:外国人永久居住证 9:其它
        bankCode: mpwjBankInfo.bankCode, // 银行编号
        bankCardType: mpwjBankInfo.bankCardType, // 银行卡类型 01:借记卡(储蓄卡);02:贷记卡(信用卡);9:未知
        bankCardNo: cryptoJS.encrypted(mpwjBankInfo.bankCardNo),
        cardNo: cryptoJS.encrypted(this.payload.cardNo), // 证件号码(AES加密)
        mobile: cryptoJS.encrypted(this.payload.mobile), // 手机号(AES加密)
        clientIp: this.payClientIp, // ip
        mercId: commonJs.getPlatform().mercId,
        platform: this.platform,
        ...bankCardType02Data
      })

      this.apiPayMobileUnified(commitDataOne, (resOne) => {
        const commitDataTwo = {
          clientIp: this.payClientIp, // ip
          requestId: new Date().getTime(), // 请求流水
          'methodType': 'QuickSignSms',
          'smsOrderNo': resOne.data.smsOrderNo,
          'smsOrderType': 1,
          'agrNo': resOne.data.agrNo,
          platform: this.platform,
          mercId: commonJs.getPlatform().mercId
        }
        this.apiPayMobileUnified(commitDataTwo, () => {
          sessionStorage.removeItem('verificationBankCardsInfo') // 成功的时候删除-verificationBankCardsInfo
          this.$router.push({
            name: 'PayAuthentication',
            query: {
              smsOrderNo: resOne.data.smsOrderNo,
              agrNo: resOne.data.agrNo,
              mobile: this.payload.mobile // 手机号(AES加密)
            }
          })
        })
      }, () => {
        // Toast.fail('你填写的信息有误，请核对后再试')
        this.infoErrorDialog4 = true
      })

      this.infoErrorDialog5 = false
    },
    // 缓存填写数据
    verificationBankCardsInfoSession() {
      // verificationBankCardsInfo
      window.sessionStorage.setItem('verificationBankCardsInfo', JSON.stringify({
        bankCardName: this.payload.bankCardName, // 持卡人姓名
        cardType: this.payload.cardType, // 证件类型
        cardNo: this.payload.cardNo, // 证件号码
        mobile: this.payload.mobile, // 手机号
        validDate: this.payload.validDate, // 有效期
        cvn2: this.payload.cvn2,
        clientIp: this.payClientIp // ip
      })) // 这个保持跟之前一样。
    },
    infoErrorDialog5Cancel() {
      this.infoErrorDialog5 = false
    },
    // 有效期图标
    handleValidDateIcon(e) {
      // e.preventDefault()
      e.stopPropagation()
      this.infoErrorDialog2 = true
    },
    // 有效期点击
    handleValidDate(e) {
      // e.preventDefault()
      e.stopPropagation()
      this.infoErrorDialog6 = true
    },
    // 有效期弹出确认
    handleDialogValidDateConfirm(value) {
      const date = new Date(value)
      const Y = String(date.getFullYear()).substr(2)
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      this.payload.validDate = M + '/' + Y

      this.infoErrorDialog6 = false
    },
    handleDialogValidDateChange() {
      const date = new Date(this.validDate)
      const Y = String(date.getFullYear()).substr(2)
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      this.payload.validDate = M + '/' + Y
    },
    handleDialogValidDateCancel() {
      const date = new Date(this.validDate)
      const Y = String(date.getFullYear()).substr(2)
      const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1)
      this.payload.validDate = M + '/' + Y
      this.infoErrorDialog6 = false
    },
    // 安全码
    handleCvn2Icon() {
      this.infoErrorDialog3 = true
    },
    // 手机1
    handleMobileIcon() {
      this.infoErrorDialog1 = true
    },
    infoErrorDialog1Ok() {
      this.infoErrorDialog1 = false
    },
    infoErrorDialog2Ok() {
      this.infoErrorDialog2 = false
    },
    infoErrorDialog3Ok() {
      this.infoErrorDialog3 = false
    },
    infoErrorDialog4Ok() {
      this.infoErrorDialog4 = false
    },
    // 支付协议
    handlePayAgree() {
      this.verificationBankCardsInfoSession()
      if(commonJs.getPlatform().platform == "XFYLMALL"){
        //乐选支付协议
        this.$router.push({
          path: '/pay/payAgree',
          query:{
            name: '广东幸福狐狸农产品有限公司'
          }
        })

      }else{
        //玩家支付协议
        this.$router.push({
          path: '/pay/payAgree'
        })
      }
    }
  }
}
</script>

<style  lang="less">
  .verificationBankCards{
    width: 100%;
    min-height: 100%;
    position: absolute;
    left: 0;
    top:0;
    // .van-cell:not(:last-child):after{
    //   left: 0px;
    // }
    .van-cell{
      padding: 14px 20px;
      font-size:15px;
      font-family:PingFangSC-Regular,PingFangSC;
      font-weight:400;
      color:rgba(102,102,102,1);
      line-height:21px;
    }
    .cardHeader{
      .van-cell__title{
        width: 70px;
        flex: none;
      }
      .van-cell__value{
        text-align: left !important;
        color: #999;
      }
    }
    .cardBody{
      .van-cell__title{
        width: 70px;
        flex: none;
      }
    }

    /deep/ input:disabled{
      color:#323233;
      -webkit-text-fill-color: #323233;
      opacity:1;
    }

    .cardBody{
      .title{
        padding: 15px 0 10px 20px;
        height:22px;
        font-size:16px;
        font-family:PingFangSC;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:22px;
      }
      .idCartTitle{
        display: inline-block;
        vertical-align: middle;
      }
      .idCartImg{
        display: inline-block;
        vertical-align: middle;
        width: 14px;
        height: 14px;
      }
    }
    // 协议
    .agreement{
      text-align: center;
      margin-top:14px;

      font-size:14px;
      font-family:PingFangSC-Regular,PingFangSC;
      font-weight:400;
      color:rgba(153,153,153,1);
      line-height:20px;
      .payAgreement{
        width:84px;
        height:20px;
        font-size:14px;
        font-family:PingFangSC;
        font-weight:400;
        color:#09C2DA;
        line-height:20px;
      }
    }
    // 同意协议并验证
    .commitLayout{
      padding: 0 20px;
      margin-top: 40px;
      .commitBtn{
        height:44px;
        line-height:44px;
        width: 100%;
        background:linear-gradient(225deg,rgba(10,211,238,1) 0%,rgba(10,190,213,1) 100%);
        border-radius:2px;
        font-size:16px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(255,255,255,1);
        line-height:44px;
      }
    }
    .infoErrorDialog1 {
      border-radius:12px;
      .van-dialog__header{
        font-size:17px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(3,3,3,1);
        line-height:24px;
      }
      .content {
        margin: 12px 30px 30px 30px;
        font-size:16px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(3,3,3,1);
        line-height:22px;
      }
      .successBtn {
        width: 99%;
        display: inline-block;
        font-size:17px;
        font-family:PingFangSC;
        font-weight:400;
        color:#09C2DA;
        line-height:24px;
        border-top: 0.5px solid #ccc;
      }
    }
    .infoErrorDialog2 {
      border-radius:12px;
      .van-dialog__header{
        font-size:17px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(3,3,3,1);
        line-height:24px;
      }
      .content {
        margin: 12px 30px 30px 30px;
        font-size:16px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(3,3,3,1);
        line-height:22px;
      }
      .successBtn {
        width: 99%;
        display: inline-block;
        font-size:17px;
        font-family:PingFangSC;
        font-weight:400;
        color:#09C2DA;
        line-height:24px;
        border-top: 0.5px solid #ccc;
      }
      .img{
        width: 208px;
        height: 74px;
        margin-top: 27px;
      }
    }

    .infoErrorDialog3 {
      border-radius:12px;
      .van-dialog__header{
        font-size:17px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(3,3,3,1);
        line-height:24px;
      }
      .content {
        margin: 12px 30px 30px 30px;
        font-size:16px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(3,3,3,1);
        line-height:22px;
      }
      .successBtn {
        width: 99%;
        display: inline-block;
        font-size:17px;
        font-family:PingFangSC;
        font-weight:400;
        color:#09C2DA;
        line-height:24px;
        border-top: 0.5px solid #ccc;
      }
      .img{
        width: 208px;
        height: 74px;
        margin-top: 27px;
      }
    }

    .infoErrorDialog4 {
      border-radius:12px;
      .van-dialog__header{
        font-size:17px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(3,3,3,1);
        line-height:24px;
      }
      .content {
        margin: 30px 30px 30px 30px;
        font-size:16px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(3,3,3,1);
        line-height:22px;
      }
      .successBtn {
        width: 100%;
        display: inline-block;
        font-size:17px;
        font-weight:400;
        color:rgba(170,145,96,1);
        line-height:24px;
        border-top: 0.5px solid #ccc;
      }
      .img{
        width: 208px;
        height: 74px;
        margin-top: 27px;
      }
    }

    .infoErrorDialog5 {
      border-radius:12px;
      .van-dialog__header{
        font-size:17px;
        font-family:PingFangSC-Medium,PingFangSC;
        font-weight:500;
        color:rgba(3,3,3,1);
        line-height:24px;
      }
      .content {
        margin: 12px 30px 30px 30px;
        font-size:16px;
        font-family:PingFangSC-Regular,PingFangSC;
        font-weight:400;
        color:rgba(3,3,3,1);
        line-height:22px;
      }
      .footerBtn {
        width: 100%;
        display: inline-block;
        font-size:17px;
        font-family:PingFangSC;
        font-weight:400;
        color:rgba(170,145,96,1);
        line-height:24px;
        border-top: 0.5px solid #ccc;
      }
      .img{
        width: 208px;
        height: 74px;
        margin-top: 27px;
      }
      .footer{
        .footerBtn{
          width: 50%;
          float: left;
        }
        .cancelBtn{
          color: #ccc;
        }
      }
    }
  }
</style>
