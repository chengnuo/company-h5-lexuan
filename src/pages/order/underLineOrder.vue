<!-- 订单页面 -->


                
<!-- <span class="headerbarPriceType" v-if="userInviteLevelCount.profitPtLevel==0">普通用户</span>
<span class="headerbarPriceType" v-else-if="userInviteLevelCount.profitPtLevel==1">VIP</span>
<span class="headerbarPriceType" v-else-if="userInviteLevelCount.profitPtLevel==2">县级店</span>
<span class="headerbarPriceType" v-else-if="userInviteLevelCount.profitPtLevel==3">品牌店</span>
<span class="headerbarPriceType" v-else-if="userInviteLevelCount.profitPtLevel==4">金钻</span>
<span class="headerbarPriceType" v-else-if="userInviteLevelCount.profitPtLevel==5">总裁</span>
<span class="headerbarPriceType" v-else-if="userInviteLevelCount.profitPtLevel==6">分公司</span> -->
<!-- <span class="headerbarPriceType" v-else>县级店</span> -->
<template>
  <div class="underLineOrder">
    <div class="bg"></div>
    <!-- 联系上级 -->
    <div class="underLineOrderTitle">
      联系上级
    </div>
    <!-- 信息 -->
    <div class="info">
      <div class="message">您正在向你的上级发起线下购买，请先联系你的上级确认他/她的线下仓库是否足够。</div>
      <div class="user">
        <div class="leftbar">
          <img :src="myInviteUser.headImgUrl"
               v-if="myInviteUser.headImgUrl" />
          <img v-else
               src="../../assets/act/countyStore/people.png" />
        </div>
        <div class="rightbar">
          <div>
            <span class="title">{{myInviteUser.nickname}}</span>
            <span class="tip"
                  v-if="myInviteUser.ptLevel==0">普通用户</span>
            <span class="tip"
                  v-else-if="myInviteUser.ptLevel==1">VIP</span>
            <span class="tip"
                  v-else-if="myInviteUser.ptLevel==2">县级店</span>
            <span class="tip"
                  v-else-if="myInviteUser.ptLevel==3">品牌店</span>
            <span class="tip"
                  v-else-if="myInviteUser.ptLevel==4">金钻</span>
            <span class="tip"
                  v-else-if="myInviteUser.ptLevel==5">总裁</span>
            <span class="tip"
                  v-else-if="myInviteUser.ptLevel==6">分公司</span>
          </div>
          <div class="phone">{{myInviteUser.mobile}}</div>
        </div>
      </div>
    </div>

    <!-- 选择购买数量 -->
    <div class="underLineOrderTitle">
      选择购买数量
    </div>
    <div class="buy">
      <div class="buyContent">
        <div class="headerbar">
          <div class="list clearfix">
            <van-card :thumb="skuImage">
              <span slot="title"
                    class="headerbarTitle">
                <span class="symbol">¥</span>
                <span class="money">0</span>
              </span>
              <!-- <span slot="title"
                    class="headerbarTitle">¥ {{commonJs.numFilterToFixed2(nowPrice)}}</span>
              <span slot="price"
                    class="headerbarPrice">
                你正在以

                <span class="headerbarPriceType" v-if="purchaseQuantity==5">VIP</span>
                <span class="headerbarPriceType" v-if="purchaseQuantity==30">县级店</span>
                价格
                <span class="headerbarPriceNum">¥ {{commonJs.numFilterToFixed2(nowPrice)}}</span>
                购买此商品
              </span> -->
            </van-card>
          </div>
        </div>

        <div class="buyLine marginTop20 marginBottom15"></div>

        <div class="bodybar">
          <div class="list"
               v-for="(item, index) in keys"
               :key="index">
            <div class="skuTitle">{{item.name}}</div>
            <div class="skuList">
              <van-button type="default"
                          :disabled="citem.notClick"
                          @click="tabInfoChange(index,cindex,citem.id,$event)"
                          v-for="(citem,cindex) in item.specifications"
                          :class="['skuListBtn', {'active': citem.isActiveC}]"
                          :attr_id="citem.id"
                          :key="cindex">
                {{citem.name}}</van-button>
            </div>
          </div>

          <div class="buyLine marginTop25 marginBottom25"></div>

        </div>

        <div class="footerbar">
          <div class="purchaseQuantity">
            <van-cell center
                      :title="'购买数量'"
                      class="addCartNumsLayout">
              <!-- <van-stepper v-model="purchaseQuantity"
                            class="addCartNums"
                            :min="purchaseQuantityMin"
                            max="30"
                            step="25"
                            :disable-input='true'
                            @change="changePurchaseQuantity"
                            /> -->

              <van-stepper v-model="purchaseQuantity"
                           class="addCartNums"
                            :min="buyObj.purchaseQuantityMin"
                            :max="buyObj.purchaseQuantityMax"
                            :step="buyObj.purchaseQuantityStep"
                           :disable-input='true'
                           @change="changePurchaseQuantity" />
            </van-cell>
          </div>
          <van-button type="default"
                      class="confirmBtn"
                      @click="confirmBtn">提交进货请求</van-button>
          </van-button>
        </div>
      </div>
    </div>

    <van-dialog v-model="checkOrderDialog"
                :show-confirm-button="false"
                class="checkOrderDialog">
      <div class="content">
        该订单已经生成，是否查看？
      </div>
      <van-button type="default"
                  class="successBtn"
                  @click="handleGoOrder">是的</van-button>
    </van-dialog>

    <goBack />

  </div>
</template>

<script>

import commonJs from '@/util/common'
import { apiPayClientIp, apiPayMobileUnified, apiOrderSubmit } from '@/api/order'
// import { apiShoppingCartBuy, apiGoodsUserInviteLevelCount } from '@/api/goods'
import { Toast } from 'vant'

import { apiGoodsDetailGetDetail, apiShoppingCartBuy, apiMobileCommonValue, apiGoodsUserInviteLevelCount, apiBaseGoodsList } from '@/api/goods'
import { Lazyload } from 'vant'
import Vue from 'vue'

import PreLoading from '../../components/preLoading'


import goBack from '@/components/goBack';

export default {
  name: 'underLineOrder',

  components: {
    PreLoading,
    goBack,
  },


  data() {
    return {
      active: 2,
      pay: '1',
      orderDetail: {
        checkedAddress: {
          name: ''
        },
        checkedGoodsList: [],
        checkedGiftList: [],
      },
      payClientIp: '',
      commonJs,
      submitLoad: false,
      addCartNums: 1, // 添加购物数量
      checkOrderDialog: false,
      userInviteLevelCount: {
        inviteUser: {
          headImgUrl: '',
          name: '',
          mobile: '',
          ptLevel: '',
        }
      },
      watchUserInviteLevelCountProfitPtLevel: null,
      // sku
      skuImage: '', // 图片
      nowPrice: '0',
      purchaseQuantity: 0, // 购买数量
      // purchaseQuantityMin: 5,
      // purchaseQuantityMax: 5,
      keys: [],
      data: {},
      SKUResult: {},
      nowPrice: '0',
      haveChangedId: [],
      haveChangedpId: [],
      goodsDetail: { // 详情
        // goods: {
        //   coverImages: [],
        //   detail: [],
        //   videoUrl: []
        // },
        // specifications: [], // sku 全数据-规则
        // products: [] // sku 数据
      },
      myInviteUser: {
        headImgUrl: '',
        name: '',
        mobile: '',
        ptLevel: '',
      }, // 用户数据
      userData: {
        id: ''
      },
      buyObj: {
        type: 0,
        upLineMsg: '',
        unLineMsg: '',
        upLineDisabled: false, // 线上
        unLineDisabled: false, // 线下
        ptLevelName: '', // 会员级别
        purchaseQuantityMin: 5, // 最小
        purchaseQuantityMax: 5, // 最大
        purchaseQuantityStep: 5, // 步数

      },
    }
  },
  mounted() {
    commonJs.outSideShare();
    this.init()
  },
  watch: {
    userInviteLevelCount(value) {
      if (value.profitPtLevel == 1) {
        this.watchUserInviteLevelCountProfitPtLevel = 5
      } else {
        this.watchUserInviteLevelCountProfitPtLevel = 30
      }
    },
  },
  methods: {
    // 初始化
    init() {
      // let userData = JSON.parse(sessionStorage.getItem('userData')) || {}
      // this.apiClientIp()
      // this.apiGoodsUserInviteLevelCount({
      //   ptLevel: 1,
      // },()=>{
      //   // 获取缓存数据
      //   this.orderDetail = JSON.parse(window.sessionStorage.getItem('orderDetail'))
      //   console.log('this.orderDetail', this.orderDetail)
      //   this.addCartNums = this.orderDetail.checkedGoodsList[0].number || 1
      // })

      let userData = JSON.parse(window.sessionStorage.getItem('userData')) || {}

      this.userData = userData;

      this.apiBaseGoodsList((res) => {
        this.apiClientIp();
        this.apiGoodsDetail({
          id: res.data.items.map((item) => {
            if (item.goodsType == '0') {
              return item.id
            }
          })[0] || '',
        }) // 获取详情
        this.apiGoodsUserInviteLevelCount({
          ptLevel: 2,
        });
      })

    },
    // 获取客户端IP
    apiClientIp(callback) {
      const data = Object.assign({})
      apiPayClientIp(data).then(res => {
        if (res.code.toString() === '10000') {
          this.payClientIp = res.data.ip
          callback && callback()
        } else {
          Toast.fail(res.msg)
        }

      }).catch(error => {
        Toast.fail(error)
      })
    },
    // 订单提交-http://showdoc.sys.jxblot.com/web/#/3?page_id=85
    /**
     * @method mercId 商户ID
     * @method prePayNo 预支付号
     * @method openid 支付id-jspai
     * @method source 来源
     */
    apiOrderSubmit() {
      const cartIds = this.orderDetail.checkedGoodsList.map(res => res.id)// 购物车id
      const cartGitIds = (this.orderDetail.checkedGiftList || []).map(res => res.id)// 购物车赠品id
      const inviteCode = commonJs.getInviteCodeRedirectUrlFn().firstInviteCode.inviteCode || null
      let data = {}

      // const checkedAddressId = this.orderDetail && this.orderDetail.checkedAddress && this.orderDetail.checkedAddress.id
      // if (!checkedAddressId) {
      //   Toast.fail('请填写收货地址')
      //   return false
      // }

      if (this.submitLoad) return;
      this.submitLoad = true;


      const getGoodDetailPurchType = JSON.parse(window.sessionStorage.getItem('goodDetailPurchType')) || {}

      data = {
        cartIds: cartIds.concat(cartGitIds), // 购物车id
        // addressId: checkedAddressId, // 地址id
        sysCnl: commonJs.isWeiXin() ? 'WX-PUBLIC' : 'H5', // 下单终端渠道：IOS、ANDROID、WX-APPLET(小程序)
        clientIp: this.payClientIp, // 获取ip
        // buyType: '1', // 购买类型 0：普通购买 1：分享购买-提示：这里改为0
        // inviteCode: inviteCode, // 邀请码 购买类型为1：分享购买 此参数必填分享的用户邀请码
        buyType: 0, // 购买类型 0：普通购买 1：分享购买-提示：这里改为0
        purchType: getGoodDetailPurchType.purchType, // 进货类型 1：购买自用 2：进货云仓 3：提货 默认为1
      }
      // const res = await this.$post(this.$api.orderSubmit, data)
      console.log('购物车', data)
      apiOrderSubmit(data).then(res => {
        window.sessionStorage.setItem('orderSubmit', JSON.stringify(res.data)) // 商户购买的时候，缓存信息
        if (res.code.toString() === '10000') {
          // this.apiPayMobileUnified({
          //   'methodType': 'PayCashier',
          //   'mercId': res.data.mercId, // 1
          //   'prePayNo': res.data.prepayNo // 1
          // }, (resApiPayMobileUnified) => {
          //   let sysCnl = commonJs.isWeiXin() ? 'WX-PUBLIC' : 'H5'
          //   const getLoginAuthorization = JSON.parse(window.sessionStorage.getItem('loginAuthorization')) || {}
          //   const userData = JSON.parse(sessionStorage.getItem('userData')) || {}
          //   // const url = `${commonJs.config.prefixH5Url}pay?mercId=${res.data.mercId}&prePayNo=${res.data.prepayNo}&openid=${getLoginAuthorization.openid}&source=${commonJs.payConfig.XFyinliPAYSource}&platform=${resApiPayMobileUnified.data.prePayOrder.platform}&userId=${userData.id}`
          //   const url = `${commonJs.config.prefixH5Url}pay?mercId=${res.data.mercId}&prePayNo=${res.data.prepayNo}&source=${commonJs.payConfig.XFyinliPAYSource}&platform=${resApiPayMobileUnified.data.prePayOrder.platform}&userId=${userData.id}`
          //   this.submitLoad = false;
          //   // const url = `http://localhost:8080pay?mercId=${res.data.mercId}&prePayNo=${res.data.prepayNo}&openid=${getLoginAuthorization.openid}&source=${commonJs.payConfig.XFyinliPAYSource}&platform=${resApiPayMobileUnified.data.prePayOrder.platform}&userId=${userData.id}`
          //   window.location.href=url;
          // })
          console.log('成功')
          this.$router.push({
            name: 'UnderLinePaySucceed',
          })
        } else {
          console.log('res', res)
          this.submitLoad = false;
          Toast.fail(res.msg)
        }

        // else if(res.code.toString() === '40002'){
        //   this.checkOrderDialog = true;
        // }

      }).catch(error => {
        this.submitLoad = false;
        console.log('error', error)
        Toast.fail(error)

      })
    },
    // 订单支付
    apiPayMobileUnified(parameter, callback) {
      const data = Object.assign({}, parameter)

      // const res = await this.$post(this.$api.payMobileUnified, data)
      apiPayMobileUnified(data).then(res => {
        if (res.code.toString() === '10000') {
          // Toast.success(res.msg)
          callback && callback(res)
        } else {
          Toast.fail(res.msg)
        }
      }).catch(error => {
        console.log('error', error)
        Toast.fail(error)
      })
    },
    joinSpecifications(value) {
      console.log('value', value)
      // return value.join()
      return value && value.map((item) => {
        return item.name
      }).join()
    },
    // 跳转去地址
    goAddress() {
      this.$router.push({
        name: 'Address'
      })
    },
    // 登录成功的时候，缓存信息给订单order
    // buyLocalStorage(resData) {
    //   window.sessionStorage.setItem('orderDetail', JSON.stringify(resData)) // 商户购买的时候，缓存信息
    //   this.orderDetail = JSON.parse(window.sessionStorage.getItem('orderDetail'))

    //   this.apiOrderSubmit()
    // },
    // 立即购买
    apiShoppingCartBuy() {
      // this.getProductId()
      //console.log('his.goodsDetail', this.goodsDetail)


      const getGoodDetailPurchType = JSON.parse(window.sessionStorage.getItem('goodDetailPurchType')) || {}

      const data = {
        // productId: this.productId,
        productId: this.orderDetail.checkedGoodsList[0].productId,
        number: this.addCartNums,
        purchType: getGoodDetailPurchType.purchType, // 进货类型 1：购买自用 2：进货云仓 4：线下发货
      }
      // const res = await this.$post(this.$api.shoppingCartBuy, data)
      apiShoppingCartBuy(data).then((res) => {
        if (res.code.toString() === '10000') {
          // 成功
          const resData = res.data || []
          this.buyLocalStorage(resData)
        } else {
          if (res.code.toString() === '10501') { // 请登录
            if (!commonJs.getInviteCodeRedirectUrlFn().firstInviteCode) {
              commonJs.setInviteCodeRedirectUrlFn({
                redirectUrl: `${window.location.origin}${window.location.pathname}`,
                firstInviteCode: this.$route.query
              }) // 设置获取-首次和登录后的inviteCode
            }
            const type = this.$route.query.type || 2
            this.$router.push({
              name: 'Login',
              query: {
                type: type,
                inviteCode: this.$route.query.inviteCode
              }
            })
          } else {
            Toast.fail(res.msg)
          }
        }
      }).catch((error) => {
        Toast.fail(error)
      })
    },
    // 添加购物车
    handleAddCart() {
      console.log('this.orderDetail', this.orderDetail)
      this.apiShoppingCartBuy();
    },
    // 跳转订单
    handleGoOrder() {
      this.$router.push({
        name: 'myOrder'
      })
    },
    // sku ============== sku
    // start-skuInitFn
    skuInitFn() {
      // let res = {"code":"10000","msg":"success","data":{"id":"1182242","goodsType":"0","name":"goods name","sideName":"","alias":"","categoryId":"1","brandId":"0","videoTranscodeUrl":"","coverImages":["https:\/\/static-mpmall.mingpinmao.cn\/goods\/20190909\/k8tmoewjk31gzf3at9j0.jpg"],"detail":["https:\/\/static-mpmall.mingpinmao.cn\/goods\/20190909\/k8tmoewjk31gzf3at9j0.jpg"],"price":"100.00","originalPrice":"180.00","sharePrice":"0.00","baseScore":"17.00","traceType":"0","supplierCode":"XFHL","higherOnePrice":"0.00","higherTwoPrice":"0.00","status":"1","buyerPartner":"0","salesNum":"0","buyerNumber":"1","addTime":"2019-09-27 14:01:43","attributes":[{"id":"2783","name":"color","specifications":[{"id":"4592","name":"red","url":"https:\/\/static-mpmall.mingpinmao.cn\/goods\/20190909\/k8tmoewjk31gzf3at9j0.jpg"},{"id":"4593","name":"white","url":"https:\/\/static-mpmall.mingpinmao.cn\/goods\/20190909\/k8tmoewjk31gzf3at9j0.jpg"}]},{"id":"2784","name":"size","specifications":[{"id":"4594","name":"S","url":""},{"id":"4595","name":"M","url":""},{"id":"4596","name":"L","url":""}]},{"id":"2785","name":"\u6b3e\u5f0f","specifications":[{"id":"4597","name":"\u957f\u6b3e","url":""},{"id":"4598","name":"\u77ed\u6b3e","url":""}]}],"skus":[{"id":"3606","price":"1000.00","stock":"99","specificationIds":["4592","4595","4597"],"skuSn":"XFHL2019092703606"},{"id":"3607","price":"1100.00","stock":"77","specificationIds":["4593","4596","4597"],"skuSn":"XFHL2019092703607"},{"id":"3608","price":"1200.00","stock":"999","specificationIds":["4593","4594","4598"],"skuSn":"XFHL2019092703608"}],"videoImage":"","shareUrl":"http:\/\/h5.mingpinmao.cn\/goodDetail\/1182242"}}

      // const res = { 'code': '10000', 'msg': 'success', 'data': { 'id': '1182241', 'goodsType': '0', 'name': 'goods name', 'sideName': '', 'alias': '', 'categoryId': '1', 'brandId': '0', 'videoTranscodeUrl': '', 'coverImages': ['https:\/\/static-mpmall.mingpinmao.cn\/goods\/20190909\/k8tmoewjk31gzf3at9j0.jpg'], 'detail': ['https:\/\/static-mpmall.mingpinmao.cn\/goods\/20190909\/k8tmoewjk31gzf3at9j0.jpg'], 'price': '100.00', 'originalPrice': '180.00', 'sharePrice': '1.00', 'baseScore': '17.00', 'traceType': '0', 'supplierCode': 'XFHL', 'higherOnePrice': '1.00', 'higherTwoPrice': '1.00', 'status': '1', 'buyerPartner': '0', 'salesNum': '0', 'buyerNumber': '1', 'addTime': '2019-09-20 15:51:07', 'attributes': [{ 'id': '2791', 'name': 'color', 'specifications': [{ 'id': '4611', 'name': 'red', 'url': 'https:\/\/static-mpmall.mingpinmao.cn\/goods\/20190909\/k8tmoewjk31gzf3at9j0.jpg' }, { 'id': '4612', 'name': 'white', 'url': 'https:\/\/static-mpmall.mingpinmao.cn\/goods\/20190909\/k8tmoewjk31gzf3at9j0.jpg' }] }, { 'id': '2792', 'name': 'size', 'specifications': [{ 'id': '4613', 'name': 'S', 'url': '' }, { 'id': '4614', 'name': 'M', 'url': '' }, { 'id': '4615', 'name': 'L', 'url': '' }] }], 'skus': [{ 'id': '3615', 'price': '1000.00', 'stock': '99', 'specificationIds': ['4611', '4614'], 'skuSn': 'XFHL2019092903615' }, { 'id': '3616', 'price': '1100.00', 'stock': '77', 'specificationIds': ['4612', '4615'], 'skuSn': 'XFHL2019092903616' }, { 'id': '3617', 'price': '1200.00', 'stock': '999', 'specificationIds': ['4612', '4613'], 'skuSn': 'XFHL2019092903617' }], 'videoImage': '', 'shareUrl': 'http:\/\/h5.mingpinmao.cn\/goodDetail\/1182241' }}

      let result = []

      this.keys = this.goodsDetail.attributes.map((item) => {
        return {
          id: item.id,
          name: item.name,
          isActiveC: false,
          notClick: false,
          specifications: item.specifications.map((cItem) => {
            return {
              id: cItem.id,
              name: cItem.name,
              isActiveC: false,
              notClick: false,
              url: cItem.url,
            }
          })
        }
      })


      // skuList
      result = this.goodsDetail.attributes.map((item) => {
        const childrenSpecifications = item.specifications || []
        return childrenSpecifications.map((childrenSpecificationsItem) => {
          return childrenSpecificationsItem.id
        })
      })

      /* https://www.jb51.net/article/144703.htm */

      // 笛卡尔乘积1


      const cartesianArr = this.cartesianProductOf(...result)


      const skuJoin = {}

      // skusList
      this.goodsDetail.skus.map((item) => {

        const childrenSpecificationIds = item.specificationIds.sort((a, b) => {
          return a - b
        }) || []

        cartesianArr.map((cartesianArrItem) => {
          if (this.ArrayIsEqual(childrenSpecificationIds, cartesianArrItem)) {
            const childrenSpecificationIdsJoin = childrenSpecificationIds.join(';')

            if (!skuJoin[childrenSpecificationIdsJoin]) {
              skuJoin[childrenSpecificationIdsJoin] = {}
            }
            skuJoin[childrenSpecificationIdsJoin] = {
              price: item.price,
              id: item.id
            }

            return false
          } else {
          }
        })

      })

      this.data = skuJoin
      // https://github.com/768680109/vue-sku 配合sku项目
    },
    cartesianProductOf() {
      return Array.prototype.reduce.call(arguments, function (a, b) {
        var ret = []
        a.forEach(function (a) {
          b.forEach(function (b) {
            const c = a.concat([b]).sort((a, b) => {
              return a - b
            })
            ret.push(c)
          })
        })
        return ret
      }, [[]])
    },
    // 判断2个数组是否相等-https://blog.csdn.net/u012836656/article/details/89085303
    ArrayIsEqual(arr1, arr2) { // 判断2个数组是否相等
      if (arr1 === arr2) { // 如果2个数组对应的指针相同，那么肯定相等，同时也对比一下类型
        return true
      } else {
        if (arr1.length != arr2.length) {
          return false
        } else { // 长度相同
          for (const i in arr1) { // 循环遍历对比每个位置的元素
            if (arr1[i] != arr2[i]) { // 只要出现一次不相等，那么2个数组就不相等
              return false
            }
          }// for循环完成，没有出现不相等的情况，那么2个数组相等
          return true
        }
      }
    },
    /* 分割线-----balabala end*/
    /* 商品详情数据*/
    queryDGoodsById() {
      this.initSKU()// 初始化，得到SKUResult
      /* 根据SKUResult得到初始化的时候哪些不能点击*/
      for (let i = 0; i < this.keys.length; i++) {
        for (let j = 0; j < this.keys[i].specifications.length; j++) {
          if (this.SKUResult[this.keys[i].specifications[j].id] == null) {
            this.keys[i].specifications[j].notClick = true
          }
        }
      }
    },
    // 获得对象的key
    getObjKeys(obj) {
      if (obj !== Object(obj)) throw new TypeError('Invalid object')
      var keys = []
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) { keys[keys.length] = key }
      }
      return keys
    },

    // 把组合的key放入结果集SKUResult
    add2SKUResult(combArrItem, sku) {
      var key = combArrItem.join(';')
      if (this.SKUResult[key]) { // SKU信息key属性·
        this.SKUResult[key].count += sku.count
        this.SKUResult[key].prices.push(sku.price)
      } else {
        this.SKUResult[key] = {
          count: sku.count,
          prices: [sku.price]
        }
      }
    },

    // 初始化得到结果集
    initSKU() {
      var i; var j; var skuKeys = this.getObjKeys(this.data)
      for (i = 0; i < skuKeys.length; i++) {
        var skuKey = skuKeys[i] // 一条SKU信息key
        var sku = this.data[skuKey] // 一条SKU信息value
        var skuKeyAttrs = skuKey.split(';') // SKU信息key属性值数组
        skuKeyAttrs.sort(function (value1, value2) {
          return parseInt(value1) - parseInt(value2)
        })

        // 对每个SKU信息key属性值进行拆分组合
        var combArr = this.combInArray(skuKeyAttrs)
        for (j = 0; j < combArr.length; j++) {
          this.add2SKUResult(combArr[j], sku)
        }

        // 结果集接放入SKUResult
        this.SKUResult[skuKeyAttrs.join(';')] = {
          count: sku.count,
          prices: [sku.price]
        }
      }
    },

    /**
     * 从数组中生成指定长度的组合
     * 方法: 先生成[0,1...]形式的数组, 然后根据0,1从原数组取元素，得到组合数组
     */
    combInArray(aData) {
      if (!aData || !aData.length) {
        return []
      }

      var len = aData.length
      var aResult = []

      for (var n = 1; n < len; n++) {
        var aaFlags = this.getCombFlags(len, n)
        while (aaFlags.length) {
          var aFlag = aaFlags.shift()
          var aComb = []
          for (var i = 0; i < len; i++) {
            aFlag[i] && aComb.push(aData[i])
          }
          aResult.push(aComb)
        }
      }

      return aResult
    },

    /**
     * 得到从 m 元素中取 n 元素的所有组合
     * 结果为[0,1...]形式的数组, 1表示选中，0表示不选
     */
    getCombFlags(m, n) {
      if (!n || n < 1) {
        return []
      }

      var aResult = []
      var aFlag = []
      var bNext = true
      var i, j, iCnt1

      for (i = 0; i < m; i++) {
        aFlag[i] = i < n ? 1 : 0
      }

      aResult.push(aFlag.concat())

      while (bNext) {
        iCnt1 = 0
        for (i = 0; i < m - 1; i++) {
          if (aFlag[i] == 1 && aFlag[i + 1] == 0) {
            for (j = 0; j < i; j++) {
              aFlag[j] = j < iCnt1 ? 1 : 0
            }
            aFlag[i] = 0
            aFlag[i + 1] = 1
            var aTmp = aFlag.concat()
            aResult.push(aTmp)
            if (aTmp.slice(-n).join('').indexOf('0') == -1) {
              bNext = false
            }
            break
          }
          aFlag[i] == 1 && iCnt1++
        }
      }
      return aResult
    },
    /* 商品条件筛选 end*/
    tabInfoChange(index, cindex, cid, e) {
      const orderInfo = this.keys/* 所有规格*/
      const orderInfoChild = this.keys[index].specifications/* 当前点击的规格的所有子属性内容*/
      // 选中自己，兄弟节点取消选中
      if (orderInfoChild[cindex].notClick != true) {
        if (orderInfoChild[cindex].isActiveC == true) {
          orderInfoChild[cindex].isActiveC = false
        } else {
          for (let i = 0; i < orderInfoChild.length; i++) {
            orderInfoChild[i].isActiveC = false
          }
          orderInfoChild[cindex].isActiveC = true
        }
      }

      // 已经选择的节点
      const haveChangedId = []
      const haveChangedpId = []
      for (let i = 0; i < this.keys.length; i++) {
        for (let j = 0; j < this.keys[i].specifications.length; j++) {
          if (this.keys[i].specifications[j].isActiveC == true) {
            haveChangedId.push(this.keys[i].specifications[j].id)
            haveChangedpId.push(this.keys[i].id)
            if (this.keys[i].specifications[j].url) {
              this.skuImage = this.keys[i].specifications[j].url
            }
            this.keys[i].isActiveC = true
            break
          } else {
            this.keys[i].isActiveC = false
          }
        }
      }

      this.nowPrice = this.goodsDetail.price;
      if (haveChangedId.length) {
        // 获得组合key价格
        haveChangedId.sort(function (value1, value2) {
          return parseInt(value1) - parseInt(value2)
        })
        var len = haveChangedId.length
        var prices = this.SKUResult[haveChangedId.join(';')].prices
        var maxPrice = Math.max.apply(Math, prices)
        var minPrice = Math.min.apply(Math, prices)
        // this.nowPrice = maxPrice > minPrice ? minPrice + '-' + maxPrice : maxPrice/* 筛选价格*/
        // if (prices.length==1){
        //   this.nowPrice = prices[0]
        // }

        // if(this.purchaseQuantity==5){
        //   this.nowPrice = this.goodsDetail.plus
        // }else if(this.purchaseQuantity==30){
        //   this.nowPrice = this.goodsDetail.train
        // }else{
        //   this.nowPrice = this.goodsDetail.price
        // }
        // 改变购买数量的时候
        this.changePurchaseQuantity();

        // 用已选中的节点验证待测试节点
        const daiceshi = []// 待测试节点
        const daiceshiId = []
        for (let i = 0; i < this.keys.length; i++) {
          for (let j = 0; j < this.keys[i].specifications.length; j++) {
            if (this.keys[index].specifications[cindex].id != this.keys[i].specifications[j].id) {
              daiceshi.push({
                index: i,
                cindex: j,
                id: this.keys[i].specifications[j].id
              })
              daiceshiId.push(this.keys[i].specifications[j].id)
            }
          }
        }
        for (let i = 0; i < haveChangedId.length; i++) {
          var indexs = daiceshiId.indexOf(haveChangedId[i])
          if (indexs > -1) {
            daiceshi.splice(indexs, 1)
          }
        }
        for (let i = 0; i < daiceshi.length; i++) {
          let testAttrIds = [] // 从选中节点中去掉选中的兄弟节点
          let siblingsId = ''
          for (let m = 0; m < this.keys[daiceshi[i].index].specifications.length; m++) {
            if (this.keys[daiceshi[i].index].specifications[m].isActiveC == true) {
              siblingsId = this.keys[daiceshi[i].index].specifications[m].id
            }
          }
          if (siblingsId != '') {
            for (let j = 0; j < len; j++) {
              (haveChangedId[j] != siblingsId) && testAttrIds.push(haveChangedId[j])
            }
          } else {
            testAttrIds = haveChangedId.concat()
          }
          testAttrIds = testAttrIds.concat(this.keys[daiceshi[i].index].specifications[daiceshi[i].cindex].id)
          testAttrIds.sort(function (value1, value2) {
            return parseInt(value1) - parseInt(value2)
          })
          if (!this.SKUResult[testAttrIds.join(';')]) {
            this.keys[daiceshi[i].index].specifications[daiceshi[i].cindex].notClick = true
            this.keys[daiceshi[i].index].specifications[daiceshi[i].cindex].isActiveC = false
          } else {
            this.keys[daiceshi[i].index].specifications[daiceshi[i].cindex].notClick = false
          }
        }

        this.haveChangedId = haveChangedId
        this.haveChangedpId = haveChangedpId
      } else {
        // 设置默认价格
        this.nowPrice = this.goodsDetail.price
        this.haveChangedId = []
        this.haveChangedpId = []
        // 设置属性状态
        for (let i = 0; i < this.keys.length; i++) {
          for (let j = 0; j < this.keys[i].specifications.length; j++) {
            if (this.SKUResult[this.keys[i].specifications[j].id]) {
              this.keys[i].specifications[j].notClick = false
            } else {
              this.keys[i].specifications[j].notClick = true
              this.keys[i].specifications[j].isActiveC = false
            }
          }
        }
      }
    },
    unique(arr, key) {
      var result = []
      var obj = {}
      for (var i = 0; i < arr.length; i++) {
        if (!obj[arr[i][key]]) {
          result.push(arr[i])
          obj[arr[i][key]] = true
        }
      }
      return result
    },
    // 获取商品id
    // apiMobileCommonValue(callback) {

    //   // const res = await this.$post(this.$api.goodsDetailGetDetail, data)
    //   apiMobileCommonValue({}).then(res => {
    //     if (res.code.toString() === '10000') {
    //       callback && callback(res);
    //     } else {
    //       console.log(res)
    //       Toast.fail(res.msg)
    //     }
    //   }).catch(error => {
    //     console.log(error)
    //     Toast.fail(error)
    //   })

    // },
    apiBaseGoodsList(callback) {
      apiBaseGoodsList({
        row: 10,
        pageDepend: '',
      }).then(res => {
        if (res.code.toString() === '10000') {
          callback && callback(res);
        } else {
          console.log(res)
          Toast.fail(res.msg)
        }
      }).catch(error => {
        console.log(error)
        Toast.fail(error)
      })
    },
    // 商品详情 - http://showdoc.sys.jxblot.com/web/#/3?page_id=76
    apiGoodsDetail(data) {
      // var data = {
      //   id: parseInt(this.$route.params.id) || 1
      // }
      console.log('data', data)
      // const res = await this.$post(this.$api.apiGoodsDetailGetDetail, data)
      apiGoodsDetailGetDetail(data).then(res => {

        if (res.code.toString() === '10000') {
          this.goodsDetail = Object.assign({}, res.data) // 获取数据

          const resSpecifications = Object.assign([], res.data.attributes) // sku规则
          const resProducts = Object.assign([], res.data.skus) // sku数据

          // // 处理数据
          // const result = resSpecifications.map((specificationsItem, index) => {
          //   return resProducts.map((resProductsItem, index) => {
          //     if (specificationsItem.specificationKeys === '颜色') {
          //       const intersection = resProductsItem.specifications.filter(v => specificationsItem.specificationValues.includes(v))
          //       return ({
          //         ...resProductsItem,
          //         XFHLcolor: intersection[0]
          //       })
          //     }
          //   })
          // })


          // if (result.length > 0 && result[0][0] !== undefined) {
          //   this.skuImagesList = Object.assign([], this.unique(result[0], 'XFHLcolor'))
          // } else {
          //   this.skuImagesList = []
          // }

          // this.skuImage = resSpecifications[0].specifications[0].url // 初始化选中第一张图
          //规格显示小图
          var skuImage = null;
          console.log('skuImage1')
          let isskuImage = this.goodsDetail.attributes && this.goodsDetail.attributes[0].specifications[0].length > 0 && this.goodsDetail.attributes[0].specifications[0].url
          if (isskuImage) {
            skuImage = this.goodsDetail.attributes[0].specifications[0].url
          } else {
            skuImage = this.goodsDetail.coverImages[0];
          }
          if (skuImage) {
            this.skuImage = skuImage;
          }

          // // 初始化 skuListClass
          this.skuListClass = resSpecifications.length > 0 ? resSpecifications.map((item, index) => {
            return {
              // name: item.id
              name: ''
            }
          }) : []


          // // 回选其他类型
          // resSpecifications.map((specificationsItem, index) => {
          //   const currentActive = specificationsItem.specificationValues[0]
          //   this.handleSkuList(currentActive, index)
          //   return ({
          //     ...specificationsItem
          //   })
          // })

          this.nowPrice = res.data.price

          // sku初始化
          this.skuInitFn()
          this.queryDGoodsById()
          this.wxShare() // 分享


          let tabInfoSpecificationIds = this.goodsDetail && this.goodsDetail.skus.length > 0 && this.goodsDetail.skus[0].specificationIds.length > 0
          if (tabInfoSpecificationIds) {
            this.tabInfoChange(0, 0, this.goodsDetail.skus[0].specificationIds[0], this.$event)
          }
        } else {
          Toast.fail(res.msg)
        }
      }).catch(error => {
        console.log(error)
        Toast.fail(error)
      })
    },
    // 处理数据获取productId
    getProductId() {
      // this.haveChangedId
      const products = Object.assign([], this.goodsDetail.skus)

      const arr = this.haveChangedId
      // for (const i in this.skuListClass) {
      //   const item = this.skuListClass[i]
      //   arr.push(item.name)
      // }

      for (let j = 0; j < products.length; j++) {
        const productsItem = products[j]
        // const intersection = productsItem.specifications.filter(v => arr.includes(v))
        const specificationsToString = productsItem.specificationIds.sort().toString()
        const arrToString = arr.sort().toString()
        if (specificationsToString === arrToString) {
          this.productId = productsItem.id // 获取products id
          break
        }
      }
    },
    // 登录成功的时候，缓存信息给订单order
    buyLocalStorage(resData) {
      window.sessionStorage.setItem('orderDetail', JSON.stringify(resData)) // 商户购买的时候，缓存信息
      this.orderDetail = JSON.parse(window.sessionStorage.getItem('orderDetail'))

      const getGoodDetailPurchType = JSON.parse(window.sessionStorage.getItem('goodDetailPurchType')) || {}

      this.apiOrderSubmit()
      // this.$router.push({
      //   name: 'UnderLinePaySucceed',
      //   query: {
      //     inviteCode: this.$route.query.inviteCode,
      //   }
      // })

    },
    // 立即购买
    apiShoppingCartBuy() {
      this.getProductId()


      const getGoodDetailPurchType = JSON.parse(window.sessionStorage.getItem('goodDetailPurchType')) || {}


      const data = {
        productId: this.productId,
        number: this.purchaseQuantity,
        purchType: getGoodDetailPurchType.purchType, // 进货类型 1：购买自用 2：进货云仓 4：线下发货
      }
      // const res = await this.$post(this.$api.shoppingCartBuy, data)
      apiShoppingCartBuy(data).then((res) => {
        if (res.code.toString() === '10000') {
          // 成功
          const resData = res.data || []
          this.buyLocalStorage(resData)
        } else {
          if (res.code.toString() === '10501') { // 请登录
            // window.sessionStorage.setItem('redirectUrl', JSON.stringify(window.location.href)) // 商户购买的时候，缓存信息
            if (!commonJs.getInviteCodeRedirectUrlFn().firstInviteCode) {
              commonJs.setInviteCodeRedirectUrlFn({
                redirectUrl: `${window.location.origin}${window.location.pathname}`,
                firstInviteCode: this.$route.query || ''
              }) // 设置获取-首次和登录后的inviteCode
            }
            this.$router.push({
              name: 'Login',
              query: {
                inviteCode: this.$route.query.inviteCode,
              }
            })
          } else {
            Toast.fail(res.msg)
          }
        }
      }).catch((error) => {
        Toast.fail(error)
      })
    },
    // 展示图点击的时候
    onChange(index) {
      this.current = index + 1
    },
    isSku() {
      var msg = null;

      for (let i = 0; i < this.goodsDetail.attributes.length; i++) {
        let itemI = this.goodsDetail.attributes[i];
        if (!this.haveChangedpId.includes(itemI.id)) {
          msg = '请选择' + itemI.name + '规格';
          break;
        }
      }

      if (msg) {
        Toast(msg)
      }
      return msg;
    },
    // 点击购买
    confirmBtn() {
      console.log('点击购买')
      if (this.isSku()) {

      } else {
        this.apiShoppingCartBuy()
      }

      // this.skuListClass
    },
    // 点击的时候切换图片
    changeSkuImagesList(value, rowIndex) {
      // const skuImagesList = Object.assign([], this.skuImagesList)
      // for (const i in skuImagesList) {
      //   const item = skuImagesList[i]
      //   if (item.XFHLcolor === value) {
      //     this.skuImage = item.url
      //   }
      // }
      if (value.url.length > 0) {
        this.skuImage = value.url
      }
      // this.wxShare() // 分享
    },
    // 分享
    wxShare() {
      const inviteCode = this.$route.query.inviteCode
      const type = this.$route.query.type || null
      const id = this.$route.params.id
      const self = this

      commonJs.outSideShare({
        title: `${self.goodsDetail.name}`,
        desc: `${self.goodsDetail.sideName}`,
        link: `${commonJs.getUrl()}/goodDetail/${id}?inviteCode=${inviteCode}`,
        img: `${self.skuImage}`
      })
    },
    // 邀请直属用户等级数量
    apiGoodsUserInviteLevelCount(obj) {

      const data = Object.assign({}, obj)
      // const res = await this.$post(this.$api.shoppingCartBuy, data)
      apiGoodsUserInviteLevelCount(data).then((res) => {
        if (res.code.toString() === '10000') {
          console.log('邀请直属用户等级数量')

          // if(res.data.profitList === this.purchaseQuantity)

          console.log('this.myInviteUser', this.myInviteUser)
          this.userInviteLevelCount = res.data
          this.myInviteUserFn();



          // upLineDisabled: false, // 线上
          // unLineDisabled: false, // 线下

          // res.data.upGiftNumber
          // res.data.downGiftNumber

          // http://47.112.117.247:9099/happy/v2.2.4/#id=2zsib9&p=d-%E5%95%86%E5%9F%8E&g=1

          let type1 = (this.userData.ptLevel==0 && res.data.profitPtLevel == 2 && res.data.upGiftNumber == 0 && res.data.downGiftNumber == 0)
            ||
            (this.userData.ptLevel==0 && res.data.profitPtLevel == 3 && res.data.upGiftNumber == 0 && res.data.downGiftNumber == 0)
            ||
            (this.userData.ptLevel==0 && res.data.profitPtLevel == 4 && res.data.upGiftNumber == 0 && res.data.downGiftNumber == 0)
            ||
            (this.userData.ptLevel==0 && res.data.profitPtLevel == 5 && res.data.upGiftNumber == 0 && res.data.downGiftNumber == 0)
            ||
            (this.userData.ptLevel==0 && res.data.profitPtLevel == 6 && res.data.upGiftNumber == 0 && res.data.downGiftNumber == 0)

          let type2 = (this.userData.ptLevel==0 && res.data.profitPtLevel == 2 && res.data.upGiftNumber > 0 && res.data.downGiftNumber > 0)
            ||
            (this.userData.ptLevel==0 && res.data.profitPtLevel == 3 && res.data.upGiftNumber > 0 && res.data.downGiftNumber > 0)
            ||
            (this.userData.ptLevel==0 && res.data.profitPtLevel == 4 && res.data.upGiftNumber > 0 && res.data.downGiftNumber > 0)
            ||
            (this.userData.ptLevel==0 && res.data.profitPtLevel == 5 && res.data.upGiftNumber > 0 && res.data.downGiftNumber > 0)
            ||
            (this.userData.ptLevel==0 && res.data.profitPtLevel == 6 && res.data.upGiftNumber > 0 && res.data.downGiftNumber > 0)

          let type3 = (this.userData.ptLevel==0 && res.data.profitPtLevel == 2 && res.data.upGiftNumber == 0 && res.data.downGiftNumber > 0)
            ||
            (this.userData.ptLevel==0 && res.data.profitPtLevel == 3 && res.data.upGiftNumber == 0 && res.data.downGiftNumber > 0)
            ||
            (this.userData.ptLevel==0 && res.data.profitPtLevel == 4 && res.data.upGiftNumber == 0 && res.data.downGiftNumber > 0)
            ||
            (this.userData.ptLevel==0 && res.data.profitPtLevel == 5 && res.data.upGiftNumber == 0 && res.data.downGiftNumber > 0)
            ||
            (this.userData.ptLevel==0 && res.data.profitPtLevel == 6 && res.data.upGiftNumber == 0 && res.data.downGiftNumber > 0)

          let type4 = res.data.profitPtLevel == 1


          let type5 = this.userData.ptLevel == 1


          // let type6 = this.userData.ptLevel == 2 || this.userData.ptLevel == 3 || this.userData.ptLevel == 4 || this.userData.ptLevel == 5


          // let type7 = this.userData.ptLevel == 6



          let type6 = this.userData.ptLevel == 2
          let type7 = this.userData.ptLevel == 3
          let type8 = this.userData.ptLevel == 4
          let type9 = this.userData.ptLevel == 5
          // this.userData.ptLevel == 3 || this.userData.ptLevel == 4 || this.userData.ptLevel == 5


          let type10 = this.userData.ptLevel == 6


          // let type5 = res.data.profitPtLevel==1
          // let type6 = res.data.profitPtLevel==1
          // let type7 = res.data.profitPtLevel==1



          this.buyObj.purchaseQuantityMax = 30;

          if (type1) {
            this.buyObj = Object.assign({}, this.buyObj, {
              type: 1,
              upLineMsg: '(买5盒立升VIP)',
              unLineMsg: '(买30盒立升县级店)',
              upLineDisabled: false,
              unLineDisabled: false,
              purchaseQuantityMin: 30,
              purchaseQuantityMax: 30,
              purchaseQuantityStep: 30,
            })
            this.purchaseQuantity = 30;
          } else if (type2) {
            this.buyObj = Object.assign({}, this.buyObj, {
              type: 2,
              upLineMsg: '(买5盒立升VIP)',
              unLineMsg: '(买30盒立升县级店)',
              upLineDisabled: false,
              unLineDisabled: false,
              purchaseQuantityMin: 30,
              purchaseQuantityMax: 30,
              purchaseQuantityStep: 30,
            })
            this.purchaseQuantity = 30;

          } else if (type3) {
            this.buyObj = Object.assign({}, this.buyObj, {
              type: 3,
              upLineMsg: '(买5盒立升VIP)',
              unLineMsg: '(买5盒立升VIP)',
              upLineDisabled: false,
              unLineDisabled: false,
              purchaseQuantityMin: 5,
              purchaseQuantityMax: 30,
              purchaseQuantityStep: 25,
            })
            this.purchaseQuantity = 5;

            console.log('type3')
          } else if (type4) {
            this.buyObj = Object.assign({}, this.buyObj, {
              type: 4,
              upLineMsg: '(买5盒立升VIP)',
              unLineMsg: '(买30盒立升县级店)',
              upLineDisabled: false,
              unLineDisabled: true,
              purchaseQuantityMin: 30,
              purchaseQuantityMax: 30,
              purchaseQuantityStep: 30,
            })
            this.purchaseQuantity = 30;
          } else if (type5) { // vip
            this.buyObj = Object.assign({}, this.buyObj, {
              type: 5,
              upLineMsg: '',
              unLineMsg: '',
              upLineDisabled: false,
              unLineDisabled: false,
              purchaseQuantityMin: 30,
              purchaseQuantityMax: 10000,
              purchaseQuantityStep: 30,
            })
            this.purchaseQuantity = 5;
          } else if (type6) { // 县级店
            this.buyObj = Object.assign({}, this.buyObj, {
              type: 6,
              upLineMsg: '',
              unLineMsg: '',
              upLineDisabled: false,
              unLineDisabled: false,
              purchaseQuantityMin: 30,
              purchaseQuantityMax: 10000,
              purchaseQuantityStep: 30,
            })
            this.purchaseQuantity = 30;
          } else if (type7) { // 品牌店
            this.buyObj = Object.assign({}, this.buyObj, {
              type: 7,
              upLineMsg: '',
              unLineMsg: '',
              upLineDisabled: false,
              unLineDisabled: false,
              purchaseQuantityMin: 30,
              purchaseQuantityMax: 10000,
              purchaseQuantityStep: 30,
            })
            this.purchaseQuantity = 30;
          } else if (type8) { // 金钻
            this.buyObj = Object.assign({}, this.buyObj, {
              type: 8,
              upLineMsg: '',
              unLineMsg: '',
              upLineDisabled: false,
              unLineDisabled: false,
              purchaseQuantityMin: 30,
              purchaseQuantityMax: 10000,
              purchaseQuantityStep: 30,
            })
            this.purchaseQuantity = 30;
          } else if (type9) { // 总裁
            this.buyObj = Object.assign({}, this.buyObj, {
              type: 9,
              upLineMsg: '',
              unLineMsg: '',
              upLineDisabled: false,
              unLineDisabled: false,
              purchaseQuantityMin: 30,
              purchaseQuantityMax: 10000,
              purchaseQuantityStep: 30,
            })
            this.purchaseQuantity = 30;
          } else if (type10) { // 分公司
            this.buyObj = Object.assign({}, this.buyObj, {
              type: 10,
              upLineMsg: '',
              unLineMsg: '',
              upLineDisabled: false,
              unLineDisabled: true,
              purchaseQuantityMin: 30,
              purchaseQuantityMax: 10000,
              purchaseQuantityStep: 30,
            })
            this.purchaseQuantity = 30;
          } else {
            this.buyObj = Object.assign({}, this.buyObj, {
              type: -1,
              upLineMsg: '',
              unLineMsg: '',
              upLineDisabled: true,
              unLineDisabled: true,
            })
            this.purchaseQuantity = 5;
          }


          console.log('this.buyObj', this.buyObj)

        } else {
          Toast.fail(res.msg)
        }
      }).catch((error) => {
        console.log('error', error)
        Toast.fail(error)
      })
    },
    // 改变数量的时候
    changePurchaseQuantity() {
      if (this.purchaseQuantity >= 5 && this.purchaseQuantity < 30) {
        this.nowPrice = this.goodsDetail.plus
      } else if (this.purchaseQuantity >= 30) {
        this.nowPrice = this.goodsDetail.train
      }
      this.myInviteUserFn();
    },
    myInviteUserFn() {
      console.log('his.purchaseQuantity', this.purchaseQuantity)
      this.myInviteUser = (this.userInviteLevelCount.profitList || []).filter((item) => {
        if (this.purchaseQuantity >= 5 && this.purchaseQuantity < 30) {
          // console.log('1', item.num)
          if (item.num >= 0 && item.num < 30) {
            // console.log('111')
            return item
          }
        } else if (this.purchaseQuantity >= 30) {
          // console.log('2')
          if (item.num == 30) {
            return item
          }
        }

      })[0] || {}
    },

    // sku-end ====== sku-end
  },
}
</script>

<style lang="less" scoped>
.clearfix:after {
  content: ".";
  clear: both;
  display: block;
  height: 0;
  visibility: hidden;
}

.underLineOrder {
  // .bg {
  //   position: absolute;
  //   height: 100%;
  //   background: #fff;
  //   width: 100%;
  //   z-index: -1;
  // }

  background: #fff !important;

  .underLineOrderTitle {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    line-height: 22px;
    padding-top: 15px;
    padding-bottom: 10px;
    padding-left: 20px;
    background: #f5f5f5;
  }

  .info {
    width: 375px;
    height: 155px;
    background: rgba(255, 255, 255, 1);

    .message {
      padding: 20px 20px 10px 20px;
    }
    .user {
      width: 345px;
      height: 62px;
      background: rgba(244, 255, 255, 1);
      border-radius: 5px;
      margin-left: 15px;
      margin-bottom: 21px;
      padding-bottom: 5px;
      .leftbar {
        width: 30px;
        height: 30px;
        float: left;
        margin-left: 10px;
        margin-top: 15px;
        margin-right: 10px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .rightbar {
        float: left;
        margin-top: 10px;
        .title {
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
          line-height: 18px;
        }
        .tip {
          width: 37px;
          height: 14px;
          background: linear-gradient(
            45deg,
            rgba(253, 223, 192, 1) 0%,
            rgba(255, 222, 189, 1) 100%
          );
          border-radius: 2px;

          font-size: 9px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(245, 142, 0, 1);
          line-height: 14px;
          margin-left: 4px;
          padding: 0 5px;
        }
        .phone {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 18px;
          margin-top: 8px;
        }
      }
    }
  }
  .underLineGoodDetail {
    background: #fff;
    .headerbar {
      padding-top: 20px;
      padding-left: 20px;
      .leftbar {
        float: left;
        width: 70px;
        height: 70px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .rightbar {
        margin-left: 10px;
        float: left;
        .title {
          margin-top: 4px;
          .symbol {
            font-size: 14px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 16px;
          }
          .money {
            margin-left: 4px;
            font-size: 22px;
            font-family: PingFangSC-Semibold, PingFang SC;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
            line-height: 24px;
          }
        }
        .desc {
          .headerbarTitle {
            margin-top: 10px;
          }
          .headerbarPrice {
            font-size: 13px;
            margin-top: 7px;

            .headerbarPriceType {
              color: #47d9ab;
            }
            .headerbarPriceNum {
              color: #d62d2d;
            }
          }
        }
      }
    }
    .footerbar {
      .specifications {
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
        margin-top: 36px;
        margin-left: 20px;
      }
      .skuList {
        margin-top: 10px;
        .skuListBtn {
          width: 65px;
          height: 28px;
          line-height: 28px;
          background: rgba(220, 255, 243, 1);
          border-radius: 5px;
          border: 1px solid rgba(71, 217, 171, 1);
          text-align: center;

          font-size: 13px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(71, 217, 171, 1);
        }
      }
    }
  }
  /deep/ input:disabled,
  input[disabled] {
    color: "#333";
    opacity: 1;
    -webkit-text-fill-color: "#333";
    font-weight: bold;
    -webkit-font-weight: bold;
  }
  background: rgba(245, 245, 245, 1);
  position: absolute;
  width: 100%;
  height: 100%;
  border-top: 1px solid rgba(240, 240, 240, 1);
  // 编辑地址
  .addressEdit {
    background: #fff;
    .addressEditLeftIcon {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 50%;
      left: 10px;
      font-size: 16px;
      -webkit-transform: translate(0, -50%);
      transform: translate(0, -50%);
    }
    .van-cell__title {
      padding: 0 20px 0 28px;
      color: #333333;
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 21px;
    }
    .van-cell__label {
      font-size: 13px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 18px;
      margin-top: 6px;
    }
    .addressEditArrow {
      position: absolute;
      top: 50%;
      right: 10px;
      font-size: 16px;
      -webkit-transform: translate(0, -50%);
      transform: translate(0, -50%);
      color: rgb(204, 204, 204);
    }
  }
  .addCartNumsLayoutLine {
    width: 345px;
    height: 1px;
    background: rgba(240, 240, 240, 1);
    margin: 0 10px;
  }
  .addCartNumsLayout {
    .addCartNums {
      border-radius: 5px;
      border: 1px solid rgba(204, 204, 204, 1);
      // width:70px;
      // height:26px;
      float: right;
      /deep/ .van-stepper__minus {
        background: #fff;
        color: rgba(51, 51, 51, 1);
        width: 23px;
        background: url(../../assets/img/goods/-_01@2x.png) center 12px
          no-repeat;
        background-size: 10px 2px;
      }
      /deep/ .van-stepper__input {
        background: #fff;
        color: rgba(51, 51, 51, 1);
        font-weight: 700;
        margin: 0;
        width: 26px;
      }
      /deep/ .van-stepper__plus {
        background: #fff;
        color: rgba(51, 51, 51, 1);
        width: 23px;
        background: url(../../assets/img/goods/+_01@2x.png) center 8px no-repeat;
        background-size: 10px 10px;
      }
      /deep/ .van-stepper__minus--disabled {
        color: #cccccc;
        background: url(../../assets/img/goods/-_01@2x1.png) center 12px
          no-repeat;
        background-size: 10px 2px;
      }
      /deep/ .van-stepper__plus--disabled {
        color: #cccccc;
        background: url(../../assets/img/goods/+_02@2x.png) center 8px no-repeat;
        background-size: 10px 10px;
      }
      /deep/ .van-stepper__minus:before {
        background: none;
        position: relative;
      }
      /deep/ .van-stepper__minus:after {
        background: none;
        position: relative;
      }
      /deep/ .van-stepper__plus:before {
        background: none;
        position: relative;
      }
      /deep/ .van-stepper__plus:after {
        background: none;
        position: relative;
      }
    }
  }
  .goodDetailList {
    margin-bottom: 44px;
  }
  // 支付
  .pay {
    margin-top: 10px;
    background: #fff;
    /deep/ .van-radio-group {
      padding: 0px;
      .van-radio__icon--checked {
        .van-icon {
          background: #333333;
          border-color: #333333;
        }
      }
      .van-cell__title {
        line-height: 40px;
      }
      .van-cell__value {
        flex: none;
      }
      .van-radio {
        padding: 10px;
      }
      .van-cell {
        padding: 0 20px;
      }
      .wechatPayImg {
        width: 22px;
        height: 20px;
        display: inline-block;
        vertical-align: middle;
      }
      .wechatPayText {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  // 订单信息
  .orderInfo {
    margin-top: 10px;
    margin-bottom: 70px;
    .totalCommodity {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
      border: none;
    }
    .freight {
      font-size: 14px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 20px;
    }
    .totalAmount {
      font-size: 15px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 21px;
      .van-cell__value {
        font-size: 15px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
        color: #d62d2d;
        line-height: 21px;
      }
    }
    /deep/ .van-cell:not(:last-child):after {
      border: none;
    }
  }
  // 提交订单
  .submitOrder {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 1);
    // box-shadow: 0px -2px 10px 0px rgba(0, 0, 0, 0.05);
    // .leftbar {
    //   padding: 10px 15px;
    //   height: 40px;
    //   line-height: 40px;
    //   float: left;
    //   .price{
    //     color: #d62d2d;
    //     font-weight: bold;
    //   }

    // }
    .rightbar {
      margin: 20px;
      .sendBtn {
        width: 335px;
        height: 44px;
        background: linear-gradient(
          225deg,
          rgba(10, 211, 238, 1) 0%,
          rgba(10, 190, 213, 1) 100%
        );
        border-radius: 2px;
        border: none;
      }
    }
  }

  .checkOrderDialog {
    .content {
      margin: 30px;
      font-size: 16px;
      font-family: PingFangSC;
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
      color: rgba(170, 145, 96, 1);
      line-height: 24px;
    }
  }

  // .underLineGoodDetail{
  //   .addCartNumsLayoutLine{
  //     width:345px;
  //     height:1px;
  //     background:rgba(240,240,240,1);
  //     margin: 0 10px;
  //   }
  //   .addCartNumsLayout{
  //     margin-top: 51px;

  //     .addCartNums{
  //       border-radius:5px;
  //       border:1px solid rgba(204,204,204,1);
  //       // width:70px;
  //       // height:26px;
  //       float: right;
  //       /deep/ .van-stepper__minus{
  //         background: #fff;
  //         color: rgba(51,51,51,1);
  //         width: 23px;
  //         background: url(../../assets/img/goods/-_01@2x.png) center 12px no-repeat;
  //         background-size: 10px 2px;
  //       }
  //       /deep/ .van-stepper__input{
  //         background: #fff;
  //         color: rgba(51,51,51,1);
  //         font-weight: 700;
  //         margin: 0;
  //         width: 23px;
  //       }
  //       /deep/ .van-stepper__plus{
  //         background: #fff;
  //         color: rgba(51,51,51,1);
  //         width: 23px;
  //         background: url(../../assets/img/goods/+_01@2x.png) center 8px no-repeat;
  //         background-size: 10px 10px;
  //       }
  //       /deep/ .van-stepper__minus--disabled{
  //         color: #cccccc;
  //         background: url(../../assets/img/goods/-_01@2x1.png) center 12px no-repeat;
  //         background-size: 10px 2px;
  //       }
  //       /deep/ .van-stepper__plus--disabled{
  //         color: #cccccc;
  //         background: url(../../assets/img/goods/+_02@2x.png) center 8px no-repeat;
  //         background-size: 10px 10px;
  //       }
  //       /deep/ .van-stepper__minus:before{
  //         background: none;
  //         position: relative;
  //       }
  //       /deep/ .van-stepper__minus:after{
  //         background: none;
  //         position: relative;
  //       }
  //       /deep/ .van-stepper__plus:before{
  //         background: none;
  //         position: relative;
  //       }
  //       /deep/ .van-stepper__plus:after{
  //         background: none;
  //         position: relative;
  //       }
  //     }
  //   }
  // }

  .buy {
    // position: fixed;
    // width: 100%;
    // bottom: 0;
    // padding: 10px 15px;
    .buyContent {
      padding: 20px 20px 20px 20px;
      // height: 533px;
      .headerbarTitle {
        margin-top: 10px;
        font-weight: bold;
        .symbol {
          font-size: 14px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 16px;
        }
        .money {
          font-size: 22px;
          font-family: PingFangSC-Semibold, PingFang SC;
          font-weight: 600;
          color: rgba(51, 51, 51, 1);
          line-height: 24px;
          margin-left: 4px;
        }
      }
      .headerbarPrice {
        font-size: 13px;

        .headerbarPriceType {
          color: #47d9ab;
        }
        .headerbarPriceNum {
          color: #d62d2d;
        }
      }
    }
    .buyLine {
      width: 335px;
      height: 1px;
      background: rgba(245, 245, 245, 1);
      margin: 5px 0;
    }
    .marginTop20 {
      margin-top: 20px;
    }
    .marginTop25 {
      margin-top: 25px;
    }
    .marginBottom15 {
      margin-bottom: 15px;
    }
    .marginBottom25 {
      margin-bottom: 25px;
    }
    .bodybar {
      .list {
        margin-top: 5px;
      }
      .skuTitle {
        font-size: 15px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 21px;
      }
      .skuList {
        margin-top: 10px;
        .skuListBtn {
          font-size: 13px;
          height: 28px;
          line-height: 28px;
          background: rgba(245, 245, 245, 1);
          border-radius: 5px;
          padding: 0 20px;
          border: 1px solid rgba(245, 245, 245, 1);
          margin-right: 5px;
          margin-bottom: 5px;
        }
        .active {
          font-weight: 400;
          background: rgba(220, 255, 243, 1);
          border-radius: 5px;
          border: 1px solid rgba(30, 211, 166, 1);
          color: #47d9ab;
        }
      }
    }
    .purchaseQuantity {
      .van-cell {
        padding: 0;
        // margin-top: 20px;
        .van-cell__title {
          font-size: 15px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
          line-height: 21px;
        }
      }
    }

    .footerbar {
      // position: absolute;
      // bottom: 20px;
      width: 335px;
      .confirmBtn {
        height: 44px;
        line-height: 44px;
        background: linear-gradient(
          225deg,
          rgba(10, 211, 238, 1) 0%,
          rgba(10, 190, 213, 1) 100%
        );
        border-color: #09c2da;
        border-radius: 4px;
        color: #fff;
        width: 100%;
        margin-top: 30px;
        font-size: 16px;
      }
    }

    .van-card {
      background: #fff;
      // padding: 0 17px;
      padding: 0;
      margin-top: 26px;
      height: 70px;
    }
    .list .van-card:first-child {
      margin-top: 10px;
    }
    .van-card__thumb {
      width: 70px;
      height: 70px;
    }
    .van-card__title {
      font-size: 15px;
      font-family: PingFangSC-Regular;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 21px;
      max-height: 42px;
    }
    .van-card__desc {
      font-size: 13px;
      font-family: PingFangSC-Light;
      font-weight: 300;
      color: rgba(153, 153, 153, 1);
      line-height: 18px;
    }
    .van-card__content {
      min-height: 70px;
      font-size: 14px;
    }
    .van-card__bottom {
      .van-card__price {
        font-size: 14px;
        font-family: PingFangSC-Semibold;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 22px;
        margin-top: 8px;
      }
      .van-card__num {
        font-size: 14px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        line-height: 20px;
        margin-top: 10px;
      }
    }
    .commonBtn {
      position: relative;
      display: inline-block;
      box-sizing: border-box;
      height: 44px;
      margin: 0;
      padding: 0;
      font-size: 16px;
      line-height: 42px;
      text-align: center;
      border-radius: 2px;
      -webkit-transition: opacity 0.2s;
      transition: opacity 0.2s;
      -webkit-appearance: none;
      -webkit-text-size-adjust: 100%;

      color: #fff;
    }
    .buyBtn {
      text-align: center;
      color: #fff;
      float: left;
      height: 40px;
      width: 165px;

      background: linear-gradient(
        225deg,
        rgba(28, 250, 174, 1) 0%,
        rgba(30, 211, 166, 1) 100%
      );
      border-radius: 2px;

      border: none;
      font-size: 16px;
      .msg {
        font-size: 10px;
      }
    }
    .LineHeight40 {
      line-height: 40px;
    }
    .LineHeight20 {
      line-height: 20px;
    }
    .buyUnderLineBtn {
      text-align: center;
      color: #fff;
      float: left;

      margin-left: 15px;
      height: 40px;

      width: 165px;
      background: linear-gradient(
        225deg,
        rgba(10, 211, 238, 1) 0%,
        rgba(10, 190, 213, 1) 100%
      );
      border: none;
      font-size: 16px;
      .msg {
        font-size: 10px;
      }
    }
    .lowerShelf {
      width: 100%;
      height: 30px;
      background: rgba(102, 102, 102, 0.8);
      color: rgba(255, 255, 255, 1);
      text-align: center;
      line-height: 30px;
      font-size: 14px;
    }
    .shortage {
      width: 100%;
      height: 30px;
      background: rgba(102, 102, 102, 0.8);
      color: rgba(255, 255, 255, 1);
      text-align: center;
      line-height: 30px;
      font-size: 14px;
    }
  }
}
</style>
