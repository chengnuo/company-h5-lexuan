<!-- 授权书资料录入 -->
<template>
  <div class="certificateAuthorization">
    <div class="cardBody">
      <div class="title">本平台代理授权需要实名，请完善以下本人信息</div>
      <van-cell-group>
        <van-field v-model="form.name"
                   label="真实姓名"
                   placeholder="请输入你的真实姓名" />
        <!-- <van-field v-model="payload.bankCardName"
                   label="身份证"
                   placeholder="请输入你的身份证号码" /> -->
        <van-field
          v-model="form.cardNo"
          :placeholder="'输入证件号码'"
          :maxlength="19"
        >
          <span slot="label">
            <span @click="handleId">
              <span>
                <span class="idCartTitle">{{cardTypeName}}</span>
                <img class="idCartImg" src="../../assets/img/pay/triangle_01@2x.png" />
              </span>
            </span>
          </span>
        </van-field>
        
        <van-field v-model="form.wxNo"
                   label="微信号"
                   placeholder="请输入你的微信号" />
        <van-field v-model="form.mobile"
                   label="手机号"
                   placeholder="请输入你的手机号码" />
        <div class="region"
         @click="showArea = true">
          <van-field v-model="area"
                    readonly="readonly"
                    label="授权地区"
                    placeholder="授权地区" />
          <!-- <van-icon class="region__bedeck"
                    name="arrow" /> -->
        </div>
        <van-field v-model="form.address"
                    type="textarea"
                   label="详细地址"
                   placeholder="请输入你的详细地址：如道路、门牌号、小区、楼栋号、单元室等" />

      </van-cell-group>
    </div>

    <div class="idCard2">
      <!-- <div class="title">身份证正反面照片（必填）</div> -->
      <div class="uploadLayout">

          <div class="leftbar">
            <van-uploader 
              v-model="imgFrontList" 
              :after-read="afterReadImgFrontList" 
              :on-change="onChangeImgFrontList"
              @delete="uploaderDelete" >
              <!-- <van-button icon="photo" type="primary">上传图片</van-button> -->
              <span v-if="imgFrontList.length<=0">
                <img src="../../assets/img/order/uploading_01@2x2.png" />
              </span>
            </van-uploader>
          </div>

        <div class="rightbar">
          <!-- <span>示例</span> -->
           <img src="../../assets/img/order/Sample id card_01@2x2.png" />
        </div>
      </div>
    </div>

    <div class="agreement">
      <van-checkbox-group v-model="checkboxAgreement">
        <van-checkbox name="1">同意 </van-checkbox>
      </van-checkbox-group>
      <span class="proxyAgreement"  @click="handleProxyAgreement">《代理经销商网络服务协议》</span>
    </div>

    <div class="commitLayout">
      <van-button type="default"
                  class="commitBtn"
                  @click="firstCommit">提 交</van-button>
    </div>

    <van-popup
      v-model="infoErrorDialog0"
      round
      position="bottom"
      :style="{ height: '50%' }"
    >
      <van-picker
        :values="form.cardType"
        :columns="columns"
        @change="infoErrorDialog0OnChange"
        show-toolbar
        @cancel="infoErrorDialog0OnCancel"
        @confirm="infoErrorDialog0OnConfirm"
       />
    </van-popup>


    <!-- 三级联动 -->
    <van-popup v-model="showArea"
               position="bottom"
               :overlay="true">
      <van-area class="add-addres__area"
                :area-list="areaList"
                :value="areaCode"
                ref="area"
                @cancel="showArea = false"
                @confirm="areaConfirm" />
    </van-popup>

    <PreLoading v-if="loading" class="myloading" />

    <goBack />
  </div>
</template>
<script >
import { Toast } from 'vant';

import { apiShopMobileMsgNotifyList, apiShopMobileUserPartnerCreate } from '@/api/my'

import axios from 'axios'


import commonJs from '@/util/common'


import AreaList from '@/util/area'
import {  apiOperate, apiAddressDetail, apiRegionList } from '@/api/address'


import cryptoJS from '@/util/cryptoJS'


import PreLoading from '../../components/preLoading'


import goBack from '@/components/goBack';


export default {
  name: 'CertificateAuthorization',

  components: {
    PreLoading,
    goBack,
  },

  data() {
    return {
      payload: {},
      mpwjBankInfo: {},
      radio: '',
      infoErrorDialog0: false,
      columns: [
        {
          text: '身份证',
          desc: '身份证',
          id: '1'
        },
        {
          text: '港澳居民来往内地通行证',
          desc: '通行证',
          id: '6'
        },
        {
          text: '台湾居民来往大陆通行证',
          desc: '台胞证',
          id: '5'
        },
        {
          text: '外籍护照',
          desc: '护　照',
          id: '8'
        }
      ],
      cardTypeName: '身份证', // cardType
      imgFrontList: [],
      imgBackList: [],
      form: {
        name: '', // 姓名
        cardType: '1', // 证件类型
        cardNo: '', // cardNo
        wxNo: '', // 微信号
        provinceId: '', // 行政区域表的省ID
        cityId: '', // 行政区域表的市ID
        areaId: '', // 行政区域表的区县ID
        address: '', // 地址
        imgFront: '', // 	身份证人像
        authType: "B", // 授权类型 A：饼干 B:精油
      },
      areaList: AreaList,
      areaCode: '110101',
      area: null,
      showArea: false,
      checkedArea: [],
      dataRegionList: [],
      checkboxAgreement: ['1'],
      loading: false,
    }
  },
  mounted() {
    commonJs.outSideShare();
    this.apiRegionList();
  },
  methods: {
    handleProxyAgreement() {
      console.log('1')
      this.$router.push({
        path: `/yinli/authorizedInformation`,
      })
    },
    firstCommit() {

      // {
      //   "name": "",
      //   "cardType": "1",
      //   "cardNo": "",
      //   "wxNo": "",
      //   "provinceId": 110000,
      //   "cityId": 110000,
      //   "areaId": 110101,
      //   "address": "",
      //   "imgFront": "",
      //   "authType": "B"
      // }

      if(!this.form.name){
        Toast('请输入姓名')
        return false;
      }else if(!this.form.cardType){
        Toast('请输入证件类型')
        return false;
      }else if(!this.form.cardNo){
        Toast('请输入证件号码')
        return false;
      }else if(!this.form.wxNo){
        Toast('请输入微信号码')
        return false;
      }else if(!this.form.provinceId){
        Toast('请选择授权地区')
        return false;
      }else if(!this.form.address){
        Toast('请输入地址')
        return false;
      }else if(!this.form.imgFront){
        Toast('请上传身份证人像面')
        return false;
      }else if(this.checkboxAgreement.length===0){
        Toast('请勾选同意协议')
        return false;
      }else{
        this.apiShopMobileUserPartnerCreate();
      }


      console.log('this', JSON.stringify(this.form, null, 2) )
    },
    
    // 授权书
    apiShopMobileUserPartnerCreate() {
      let data = Object.assign({}, this.form,{
        cardNo: cryptoJS.encrypted(this.form.cardNo)
      })
      console.log('data', data)
      apiShopMobileUserPartnerCreate(data).then(res=>{
        if (res.code.toString() === '10000') {
          // 成功跳到授权书页面
          console.log('授权书页面')
          let userData = JSON.parse(window.sessionStorage.getItem('userData')) || {} // 缓存支付信息
          window.sessionStorage.setItem('userData', JSON.stringify(Object.assign({}, userData, res.data)))
          
          // this.$router.push({
          //   path: `/my/certificateAuthorizationBook`,
          // })
          window.location.replace(`/my/certificateAuthorizationBook`) // 不留痕迹跳转
        } else {
          Toast.fail(res.msg)
        }

      }).catch(error=>{
        console.log('error', error)
        Toast.fail(error)
      })
    },

    infoErrorDialog0OnChange(picker, value, index) {
      // Toast(`当前值：${value}, 当前索引：${index}`);
      this.form.cardType = value.id
      this.cardTypeName = value.desc
    },
    infoErrorDialog0OnConfirm() {
      this.infoErrorDialog0 = false
    },
    infoErrorDialog0OnCancel() {
      this.infoErrorDialog0 = false
    },

    // 点击身份证
    handleId() {
      this.infoErrorDialog0 = true
    },
    // 图片读取后函数
    afterReadImgFrontList(resfile) {
      this.loading = true;
      console.log('resfile', resfile)
      const formData = new FormData()
      formData.append('files', resfile.file)
      formData.append('type', 1)
      formData.append('mercId', '888000000000003')
      formData.append('platform', 'ZBMALL')
      const format = {
        type: 1,
        mercId: '888000000000003',
        platform: 'ZBMALL'
      }

      console.log('this.imgFrontList', this.imgFrontList)
      this.imgFrontList = [];

      // orderStorageCreate: '/shop/mobile/storage/create' // 图片上传
      // formData, format

      axios.post(commonJs.config.prefixUrl + '/shop/mobile/storage/create', formData, commonJs.jsSign(format), {
        headers: { // 添加请求头
          'Content-Type': 'multipart/form-data'
        }
      })
      .then((res) => {
        this.loading = false;
        console.log(res)
        if (res.data.code.toString() === '10000') {
          this.form.imgFront = res.data.data[0]
          console.log('this.form.imgFront', this.form.imgFront)
          this.imgFrontList = [resfile];
        } else {
          Toast(res.msg)
        }
      }).catch(err=>{
        console.log('err', err)
        console.log('this.imgFrontList', this.imgFrontList)
        this.imgFrontList = [];
        this.loading = false;
        Toast(`上传失败，请重新上传`)
      })
    },
    onChangeImgFrontList(file, fileList){
      console.log('file, fileList',  file, fileList)
    },

    // 上传删除的时候
    uploaderDelete(){
      this.form.imgFront = ''
    },

    // 设置area数据
    areaConfirm(val) {
      this.showArea = false
      const tempArea = []
      this.checkedArea = Object.assign({}, val)

      val.forEach(item => {
        if (
          item.code === '110000' ||
          item.code === '120000' ||
          item.code === '310000' ||
          item.code === '500000'
        ) {
          val.splice(1, 1)
        }
      })

      val.forEach(v => {
        tempArea.push(v.name)
        this.area = tempArea.join(' ')
      })
      this.areaCode = val[val.length - 1].code
      this.getRegionList()
    },

    apiRegionList(){
      apiRegionList({}).then((res)=>{
        try {
          if (res.code === 10000) {
            this.dataRegionList = res.data.items;
          }else{
            Toast(res.msg)
          }
        } catch (error) {
          console.error(error)
        }
      }).catch(error=>{
        Toast(error)
      });
       
    },

    // 获取省市区数据
    async getRegionList() {
      // const res = await this.$post(this.$api.regionList, {})
      console.log('1')
      try {
        const temp = this.dataRegionList || []
        console.log('this.dataRegionList', this.dataRegionList)
        temp.forEach(v => {
          if (v.name === this.checkedArea[0].name) {
            console.log('this.checkedArea[0].name', this.checkedArea[0].name)
            console.log('v', v)
            this.form.provinceId = v.id
            const children = v.children

            children.forEach(v => {
              if (v.name === this.checkedArea[1].name) {
                this.form.cityId = v.id
                const threeChildren = v.children

                threeChildren.forEach(v => {
                  if (v.name === this.checkedArea[2].name) {
                    this.form.areaId = v.id
                  }
                })
              }
            })
          }
        })
      } catch (error) {
        console.error(error)
      }
      
    },

    // 三级联动数据组装
    findKey(obj, value, compare = (a, b) => a === b) {
      return Object.keys(obj).find(k => compare(obj[k], value))
    },
  }
}
</script>
<style lang="less" scoped>
.certificateAuthorization {
  width: 100%;
  min-height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  // .van-cell:not(:last-child):after{
  //   left: 0px;
  // }

  // textarea::-webkit-input-placeholder:after{   
  //   display:block;   
  //   content:"line@ \A line#";/*  \A 表示换行  */  
  //   color:red;   
  // };  
  // textarea::-moz-placeholder:after{   
  //   content:"line@ \A line#";/*  \A 表示换行  */  
  //   color:red;   
  // };   


  .van-cell {
    padding: 15px 10px 14px 20px;
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    line-height: 21px;
  }
  .cardHeader {
    .van-cell__title {
      width: 70px;
      flex: none;
    }
    .van-cell__value {
      text-align: left !important;
      color: #999;
    }
  }
  .cardBody {
    .van-cell__title {
      width: 70px;
      flex: none;
    }
  }

  /deep/ input:disabled {
    color: #323233;
    -webkit-text-fill-color: #323233;
    opacity: 1;
  }

  .cardBody {
    .title {
      padding: 15px 0 10px 20px;
      height: 22px;
      font-size: 16px;
      font-family: PingFangSC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 22px;
    }
    .idCartTitle {
      display: inline-block;
      vertical-align: middle;
    }
    .idCartImg {
      display: inline-block;
      vertical-align: middle;
      width: 14px;
      height: 14px;
    }
  }
  // 协议
  .agreement {
    text-align: left;
    // margin-top: 14px;
    // margin-left: 20px;
    height: 51px;
    line-height: 51px;

    font-size: 14px;
    font-family: PingFangSC-Regular, PingFangSC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    background: #fff;
    border-top: 1px solid rgba(245,245,245,1);
    /deep/ .van-checkbox-group {
      padding: 0px;
      float: left;
      .van-icon {
        width: 18px;
        height: 18px;
      }
      .van-checkbox__icon--checked {
        .van-icon {
          // background: #333333;
          // background: url();
          width: 18px;
          height: 18px;
          background: url(../../assets/img/pay/icon_05choice_01@2x.png) center center no-repeat;
          border: none;
          background-size: 100% 100%;
          
        }
        .van-icon-success:before{
          content: ' ';
        }
      }
      .van-cell__title {
        // line-height: 40px;
      }
      .van-cell__value {
        flex: none;
      }
      .van-checkbox {
        padding: 0;
        line-height: 51px;
        height: 51px;
        padding-left: 20px;
      }
      .van-cell {
        padding: 0 4px 0 15px;

        height: 60px;
        line-height: 60px;
      }
      .wechatPayImg {
        width: 26px;
        height: 26px;
        // display: inline-block;
        // vertical-align: middle;
        margin-left: 8px;
        float: left;
        margin-top: 16px;
      }
      .wechatPayText {
        // display: inline-block;
        // vertical-align: middle;
        margin-left: 11px;
        font-size: 15px;
        float: left;
      }
    }
    .proxyAgreement {
     
      height: 20px;
      font-size: 14px;
      font-family: PingFangSC;
      font-weight: 400;
      color: #09c2da;
      line-height: 20px;
      display: inline-block;
    }
  }
  // 同意协议并验证
  .commitLayout {
    padding: 0 20px;
    margin-top: 40px;
    margin-bottom: 40px;
    .commitBtn {
      height: 44px;
      line-height: 44px;
      width: 100%;
      background:linear-gradient(45deg,rgba(230,0,23,1) 0%,rgba(204,0,20,1) 100%);
      border-radius:22px;
      font-size: 16px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 44px;
    }
  }
  .infoErrorDialog1 {
    border-radius: 12px;
    .van-dialog__header {
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFangSC;
      font-weight: 500;
      color: rgba(3, 3, 3, 1);
      line-height: 24px;
    }
    .content {
      margin: 12px 30px 30px 30px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: rgba(3, 3, 3, 1);
      line-height: 22px;
    }
    .successBtn {
      width: 99%;
      display: inline-block;
      font-size: 17px;
      font-family: PingFangSC;
      font-weight: 400;
      color: #09c2da;
      line-height: 24px;
      border-top: 0.5px solid #ccc;
    }
  }
  .infoErrorDialog2 {
    border-radius: 12px;
    .van-dialog__header {
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFangSC;
      font-weight: 500;
      color: rgba(3, 3, 3, 1);
      line-height: 24px;
    }
    .content {
      margin: 12px 30px 30px 30px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: rgba(3, 3, 3, 1);
      line-height: 22px;
    }
    .successBtn {
      width: 99%;
      display: inline-block;
      font-size: 17px;
      font-family: PingFangSC;
      font-weight: 400;
      color: #09c2da;
      line-height: 24px;
      border-top: 0.5px solid #ccc;
    }
    .img {
      width: 208px;
      height: 74px;
      margin-top: 27px;
    }
  }

  .infoErrorDialog3 {
    border-radius: 12px;
    .van-dialog__header {
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFangSC;
      font-weight: 500;
      color: rgba(3, 3, 3, 1);
      line-height: 24px;
    }
    .content {
      margin: 12px 30px 30px 30px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: rgba(3, 3, 3, 1);
      line-height: 22px;
    }
    .successBtn {
      width: 99%;
      display: inline-block;
      font-size: 17px;
      font-family: PingFangSC;
      font-weight: 400;
      color: #09c2da;
      line-height: 24px;
      border-top: 0.5px solid #ccc;
    }
    .img {
      width: 208px;
      height: 74px;
      margin-top: 27px;
    }
  }

  .infoErrorDialog4 {
    border-radius: 12px;
    .van-dialog__header {
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFangSC;
      font-weight: 500;
      color: rgba(3, 3, 3, 1);
      line-height: 24px;
    }
    .content {
      margin: 30px 30px 30px 30px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: rgba(3, 3, 3, 1);
      line-height: 22px;
    }
    .successBtn {
      width: 100%;
      display: inline-block;
      font-size: 17px;
      font-weight: 400;
      color: rgba(170, 145, 96, 1);
      line-height: 24px;
      border-top: 0.5px solid #ccc;
    }
    .img {
      width: 208px;
      height: 74px;
      margin-top: 27px;
    }
  }

  .infoErrorDialog5 {
    border-radius: 12px;
    .van-dialog__header {
      font-size: 17px;
      font-family: PingFangSC-Medium, PingFangSC;
      font-weight: 500;
      color: rgba(3, 3, 3, 1);
      line-height: 24px;
    }
    .content {
      margin: 12px 30px 30px 30px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFangSC;
      font-weight: 400;
      color: rgba(3, 3, 3, 1);
      line-height: 22px;
    }
    .footerBtn {
      width: 100%;
      display: inline-block;
      font-size: 17px;
      font-family: PingFangSC;
      font-weight: 400;
      color: rgba(170, 145, 96, 1);
      line-height: 24px;
      border-top: 0.5px solid #ccc;
    }
    .img {
      width: 208px;
      height: 74px;
      margin-top: 27px;
    }
    .footer {
      .footerBtn {
        width: 50%;
        float: left;
      }
      .cancelBtn {
        color: #ccc;
      }
    }
  }

  .idCard2{
    background: #fff;
    /deep/ .van-uploader__preview-image{
      width:150px;
      height:95px;
    }
    // /deep/ .van-uploader__upload{
    //   overflow: hidden;
    // }
    /deep/ .van-uploader {
        // position: relative;
        // display: inline-block;
        // width:150px;
        height:95px;
        overflow: hidden;
    }
    /deep/ .van-uploader__preview-delete{
      position: absolute;
      top: 0;
      right: 0;
    }
    .title{
      background: #F5F5F5;
      font-size:16px;
      font-family:PingFangSC-Medium;
      font-weight:500;
      color:rgba(51,51,51,1);
      line-height:22px;
      padding: 15px 19px;

    }
    .uploadLayout{
      display: flex;
      justify-content: space-evenly;
      padding: 30px 0;
      .leftbar{
        width:150px;
        height:95px;
        // background:rgba(242,242,242,1);
        border-radius:2px;
        text-align: center;
        position: relative;
        img{
          
          width: 100%;
          height: 100%;
        }
        span{
          font-size:12px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(204,204,204,1);
          line-height:17px;
        }
      }
      .rightbar{
        width:150px;
        height:95px;
        border-radius:2px;
        text-align: center;
        border: 1px dashed #999;
        img{
          width: 100%;
          height: 100%;
        }
        span{
          font-size:12px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(204,204,204,1);
          line-height:17px;
        }
      }
    }
    .cardLayout{
      display: flex;
      justify-content: space-evenly;
      padding-top: 15px;
      padding-bottom: 30px;

      .leftbar{
        width:150px;
        text-align: center;

        span{
          font-size:12px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
          line-height:17px;
        }
        img{
          width: 100px;
          height: 63px;
          margin: 20px auto 10px;
        }
      }
      .rightbar{
        width:150px;
        text-align: center;

        span{
          font-size:12px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:rgba(153,153,153,1);
          line-height:17px;
        }
        img{
          width: 100px;
          height: 63px;
          margin: 20px auto 10px;
        }
      }
    }
  }

  .myloading{
    background: #fff;
    opacity: 0.3;
  }
}
</style>




