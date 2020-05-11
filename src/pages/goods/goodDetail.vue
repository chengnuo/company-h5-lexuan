<!-- 商品详情页面 -->
<template>
  <div class="goodDetail ignore-goodDetail">

    <!-- <div v-if="userData.id" class="goMy" @click="handleGoMy">
      <img src="../../assets/img/goods/mine_02@2x.png" />
    </div>
    <div v-else class="goMy" @click="handleGoLogin">
      <img src="../../assets/img/goods/mine_01@2x1.png" />
    </div> -->

    <div v-if="goodsDetail.name">
      <!-- 下载1 -->
      <!-- <downLoad /> -->
      <!-- 展示图 -->
      <div class="goodDetailSwipeList">
        <van-swipe @change="onChange"
                   v-if="goodsDetail">
          <van-swipe-item v-if="goodsDetail.videoTranscodeUrl">
            <div>
              <aliyunPlayer :sourceUrl="goodsDetail.videoTranscodeUrl"
                            :coverUrl="goodsDetail.videoImage"
                            :playerSize="[1,1]"></aliyunPlayer>
            </div>
          </van-swipe-item>
          <van-swipe-item v-for="(item, index) in goodsDetail.coverImages"
                          :key="index">
            <!-- <img :src="item"
                alt=""
                width="100%" /> -->
            <img v-lazy="item"
                 width="100%" />
          </van-swipe-item>
          <div class="custom-indicator"
               slot="indicator">
            <!-- && current - 1 !== 0 -->
            <span v-if="goodsDetail.videoTranscodeUrl">
              <span v-if="current - 1 !== 0">
                {{ current - 1 == 0 ? 1 :current - 1}}/{{ goodsDetail.coverImages.length }}
              </span>
            </span>
            <span v-else>
              {{ current }}/{{ goodsDetail.coverImages.length }}
            </span>
          </div>
        </van-swipe>
      </div>
      <!-- 说明 -->
      <div class="explain">
        <div class="title">{{goodsDetail.name}}</div>
        <div class="describe">{{goodsDetail.sideName}}</div>
        <div class="price clearfix">
          <span>¥</span>
          <span class="num">{{commonJs.numFilterToFixed2(goodsDetail.price)}}</span>
        </div>
        <div class="service">
        </div>
      </div>
      <!-- 商品详情图 -->
      <div class="goodDetailList">
        <div v-for="(item, index) in goodsDetail.detail"
             :key="index">
          <img alt=""
               width="100%"
               v-lazy="item" />
        </div>

      </div>
      <!-- 立即购买 -->
      <!-- :quota="quota" :quota-used="quotaUsed" :custom-stepper-config="customStepperConfig" -->
      <div class="buy">
        <van-action-sheet v-model="buyShow"
                          title=" ">
          <div class="buyContent">
            <div class="headerbar">
              <div class="list clearfix">
                <van-card :thumb="skuImage">
                  <span slot="title"
                        class="headerbarTitle">¥ {{commonJs.numFilterToFixed2(nowPrice)}}</span>
                  <span slot="price"
                        class="headerbarPrice">
                    你正在以
                    <span class="headerbarPriceType">{{buyObj.ptLevelName}}</span>
                    价格
                    <span class="headerbarPriceNum">¥ {{commonJs.numFilterToFixed2(nowPrice)}}</span>
                    购买此商品
                  </span>
                </van-card>
              </div>
            </div>

            <div class="buyLine"></div>

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

              <div class="buyLine"></div>

            </div>

            <div class="footerbar">
              <div class="purchaseQuantity">
                <van-cell center
                          :title="'购买数量'"
                          class="addCartNumsLayout">
                  <!-- :max="watchUserInviteLevelCountProfitPtLevel" -->
                  <!-- step="5" -->
                  <!-- max="5" -->
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
                          @click="confirmBtn">
                确 定
              </van-button>
            </div>
          </div>

        </van-action-sheet>

        <div class="lowerShelf"
             v-if="goodsDetail.status==0">该商品已下架，非常抱歉!</div>
        <div class="shortage"
             v-if="goodsDetail.status==2">该商品暂时缺货，非常抱歉!</div>
        <div v-if="goodsDetail.status==1"
             class="buyNowLayout clearfix">
          <div @click="handleGoHome" class="img1">
            <img 
               src="../../assets/img/index/icon_UAScale_unselected_01@2x.png"
               alt="">
          </div>
          <div @click="handleGoShoppingCart" class="img2">
            <img 
                src="../../assets/img/index/icon_discover_unselected_01@2x.png"
                alt="">
          </div>
          <div class="joinCart" @click="handleJoinCart">加入购物车</div>
          <div class="buyNow"
               @click="handleBuy(1)">立即购买</div>

        </div>

        <!-- <van-button 
                    type="primary"
                    :class="['buyBtn', buyObj.upLineMsg?'LineHeight20':'LineHeight40']"
                    @click="handleBuy(1)"
                    :disabled="buyObj.upLineDisabled">
            <div>
              <p class="title">立即购买</p>
              <p v-if="buyObj.upLineMsg"
                class="msg">{{buyObj.upLineMsg}}</p>
            </div>
          </van-button> -->

        <!-- <van-button v-if="goodsDetail.status==1"
                    type="primary"
                    :class="['buyUnderLineBtn', buyObj.upLineMsg?'LineHeight20':'LineHeight40']"
                    :disabled="buyObj.unLineDisabled"
                    @click="handleBuy(4)">
          <div>
            <p class="title">线下购买</p>
            <p v-if="buyObj.upLineMsg"
               class="msg">{{buyObj.unLineMsg}}</p>
          </div>
        </van-button> -->
      </div>

      <!-- 分享 -->
      <!-- <div class="share"
          @click="wxShare">
        <img src="../../assets/img/goodDetail/share_01@2x.png" />
      </div> -->

      <!-- <bottomBanner :index="11" /> -->
    </div>
    <div v-else>
      <PreLoading />
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import commonJs from '@/util/common'
import aliyunPlayer from '@/components/aliyunPlayer'
import PreLoading from '../../components/preLoading'
import { apiGoodsDetailGetDetail, apiShoppingCartBuy, apiMobileCommonValue, apiGoodsUserInviteLevelCount, apiBaseGoodsList } from '@/api/goods'
import { Lazyload } from 'vant'
import Vue from 'vue'
import bottomBanner from '@/components/bottomBanner';
import { Dialog } from 'vant';
import {  apiCartAdd } from '@/api/shoppingCart'

Vue.use(Lazyload)

export default {
  name: 'goodDetail',

  components: {
    PreLoading,
    aliyunPlayer,
    bottomBanner,
  },

  data() {
    return {
      active: 2,
      current: 1,
      buyShow: false, // 订单sku显示的时候
      goodsDetail: { // 详情
        // goods: {
        //   coverImages: [],
        //   detail: [],
        //   videoUrl: []
        // },
        // specifications: [], // sku 全数据-规则
        // products: [] // sku 数据
      },
      skuImagesList: [], // 缓存图片
      skuListClass: {}, // skuClass
      purchaseQuantity: 0, // 购买数量
      // purchaseQuantityMin: 5,
      // purchaseQuantityMax: 5,
      skuImage: '', // 图片
      commonJs,
      keys: [],
      data: {},
      SKUResult: {},
      nowPrice: '0',
      haveChangedId: [],
      haveChangedpId: [],
      userInviteLevelCount: {},
      watchUserInviteLevelCountProfitPtLevel: null,

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

      purchType: '', // 线上或者线下类型

      userData: {
        id: ''
      },
      isJoinCart: false, // 是否购物车打开
    }
  },
  mounted() {
    this.init()
  },
  watch: {
    // userInviteLevelCount(value) {
    //   if (value.profitPtLevel == 1) {
    //     this.watchUserInviteLevelCountProfitPtLevel = 5
    //   } else {
    //     this.watchUserInviteLevelCountProfitPtLevel = 30
    //   }
    // },
  },
  methods: {
    // 初始化
    init() {

      let userData = JSON.parse(window.sessionStorage.getItem('userData')) || {}

      this.userData = userData;

      this.apiBaseGoodsList((res) => {

        // this.apiGoodsUserInviteLevelCount({
        //   ptLevel: 2,
        // }, () => {
        //   this.apiGoodsDetail({
        //     id: res.data.items.map((item) => {
        //       if (item.goodsType == '0') {
        //         return item.id
        //       }
        //     })[0] || '',
        //   }) // 获取详情
        // })

        this.apiGoodsDetail({
          id: res.data.items.map((item) => {
            if (item.goodsType == '0') {
              return item.id
            }
          })[0] || '',
        }) // 获取详情
      })


      const query = this.$route.query
      const params = this.$route.params

      if (!commonJs.getInviteCodeRedirectUrlFn().firstInviteCode) {
        commonJs.setInviteCodeRedirectUrlFn({
          firstInviteCode: this.$route.query || '',
          loginInviteCode: '',
          redirectUrl: `${window.location.origin}${window.location.pathname}`
        }) // 设置获取-首次和登录后的inviteCode
      }
    },
    // start-skuInitFn
    skuInitFn() {
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
      console.log('index, cindex, cid, e index, cindex, cid, e <0 0 215 e>', index, cindex, cid, e)
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

      // this.nowPrice = this.goodsDetail.price;
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
        // this.nowPrice = this.goodsDetail.price
        this.changePurchaseQuantity();
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

          // this.nowPrice = res.data.price
          this.changePurchaseQuantity();

          // sku初始化
          this.skuInitFn()
          this.queryDGoodsById()


          let tabInfoSpecificationIds = this.goodsDetail && this.goodsDetail.skus.length > 0 && this.goodsDetail.skus[0].specificationIds.length > 0
          if (tabInfoSpecificationIds) {
            this.tabInfoChange(0, 0, this.goodsDetail.skus[0].specificationIds[0], this.$event)
          }


          this.wxShare() // 分享
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
      if (this.purchType == 1) {
        this.$router.push({
          name: 'Order',
          query: {
            inviteCode: this.$route.query.inviteCode,
          }
        })
      } else if (this.purchType == 4) {
        this.$router.push({
          name: 'UnderLineOrder',
          query: {
            inviteCode: this.$route.query.inviteCode,
          }
        })
      }

    },
    // 立即购买
    apiShoppingCartBuy() {
      
      // this.getProductId()

      const data = {
        productId: this.productId,
        number: this.purchaseQuantity,
        purchType: this.purchType, // 进货类型 1：购买自用 2：进货云仓 4：线下发货
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
            Toast(res.msg)
          }
        }
      }).catch((error) => {
        Toast(error)
      })
    },
    // 展示图点击的时候
    onChange(index) {
      this.current = index + 1
    },
    // 点击购买弹出
    handleBuy(purchType) {

      if (this.userData && !this.userData.id) {
        this.$router.push({
          name: 'Login',
          query: {
            inviteCode: this.$route.query.inviteCode
          }
        })
        return false;
      }

      this.purchType = purchType;
      window.sessionStorage.setItem('goodDetailPurchType', JSON.stringify({
        purchType: purchType,
      })) // 商户购买的时候，缓存信息

      if (this.purchType == 1) {
        this.buyShow = true
      } else if (this.purchType == 4) {

        this.$router.push({
          name: 'UnderLineOrder',
          query: {
            inviteCode: this.$route.query.inviteCode,
          }
        })


      }



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
      this.getProductId() // 获取productId
      
      if (this.isSku()) {

      }else if(this.isJoinCart==true){ // 购物车点击的时候
        this.isJoinCart = false;
        // true
        this.apiCartAdd({
          productId: this.productId,
          number: this.purchaseQuantity,
        })
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
      this.wxShare() // 分享
    },
    // 分享
    wxShare() {

      commonJs.outSideShare();
      // const inviteCode = this.$route.query.inviteCode
      // const type = this.$route.query.type || null
      // const id = this.$route.params.id
      // const self = this

      // commonJs.outSideShare({
      //   title: `${self.goodsDetail.name}`,
      //   desc: `${self.goodsDetail.sideName}`,
      //   link: `${commonJs.getUrl()}/goodDetail/${id}?inviteCode=${inviteCode}`,
      //   img: `${self.skuImage}`
      // })
    },
    // 邀请直属用户等级数量
    apiGoodsUserInviteLevelCount(obj, callback) {

      // Toast.loading({
      //   duration: 0, // 持续展示 toast
      //   forbidClick: true, // 禁用背景点击
      //   loadingType: 'spinner',
      //   message: '加载中'
      // })
      const data = Object.assign({}, obj)
      // const res = await this.$post(this.$api.shoppingCartBuy, data)
      apiGoodsUserInviteLevelCount(data).then((res) => {
        // Toast.clear();
        if (res.code.toString() === '10000') {
          console.log('邀请直属用户等级数量')
          this.userInviteLevelCount = res.data


          // upLineDisabled: false, // 线上
          // unLineDisabled: false, // 线下

          // res.data.upGiftNumber
          // res.data.downGiftNumber

          // http://47.112.117.247:9099/happy/v2.2.4/#id=2zsib9&p=d-%E5%95%86%E5%9F%8E&g=1

          let type1 = (this.userData.ptLevel == 0 && res.data.profitPtLevel == 2 && res.data.upGiftNumber == 0 && res.data.downGiftNumber == 0)
            ||
            (this.userData.ptLevel == 0 && res.data.profitPtLevel == 3 && res.data.upGiftNumber == 0 && res.data.downGiftNumber == 0)
            ||
            (this.userData.ptLevel == 0 && res.data.profitPtLevel == 4 && res.data.upGiftNumber == 0 && res.data.downGiftNumber == 0)
            ||
            (this.userData.ptLevel == 0 && res.data.profitPtLevel == 5 && res.data.upGiftNumber == 0 && res.data.downGiftNumber == 0)
            ||
            (this.userData.ptLevel == 0 && res.data.profitPtLevel == 6 && res.data.upGiftNumber == 0 && res.data.downGiftNumber == 0)

          let type2 = (this.userData.ptLevel == 0 && res.data.profitPtLevel == 2 && res.data.upGiftNumber > 0 && res.data.downGiftNumber > 0)
            ||
            (this.userData.ptLevel == 0 && res.data.profitPtLevel == 3 && res.data.upGiftNumber > 0 && res.data.downGiftNumber > 0)
            ||
            (this.userData.ptLevel == 0 && res.data.profitPtLevel == 4 && res.data.upGiftNumber > 0 && res.data.downGiftNumber > 0)
            ||
            (this.userData.ptLevel == 0 && res.data.profitPtLevel == 5 && res.data.upGiftNumber > 0 && res.data.downGiftNumber > 0)
            ||
            (this.userData.ptLevel == 0 && res.data.profitPtLevel == 6 && res.data.upGiftNumber > 0 && res.data.downGiftNumber > 0)

          let type3 = (this.userData.ptLevel == 0 && res.data.profitPtLevel == 2 && res.data.upGiftNumber == 0 && res.data.downGiftNumber > 0)
            ||
            (this.userData.ptLevel == 0 && res.data.profitPtLevel == 3 && res.data.upGiftNumber == 0 && res.data.downGiftNumber > 0)
            ||
            (this.userData.ptLevel == 0 && res.data.profitPtLevel == 4 && res.data.upGiftNumber == 0 && res.data.downGiftNumber > 0)
            ||
            (this.userData.ptLevel == 0 && res.data.profitPtLevel == 5 && res.data.upGiftNumber == 0 && res.data.downGiftNumber > 0)
            ||
            (this.userData.ptLevel == 0 && res.data.profitPtLevel == 6 && res.data.upGiftNumber == 0 && res.data.downGiftNumber > 0)

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
              purchaseQuantityStep: 25,
            })
            this.purchaseQuantity = 5;
          } else if (type2) {
            this.buyObj = Object.assign({}, this.buyObj, {
              type: 2,
              upLineMsg: '(买5盒立升VIP)',
              unLineMsg: '(买30盒立升县级店)',
              upLineDisabled: false,
              unLineDisabled: false,
              purchaseQuantityStep: 25,
            })
            this.purchaseQuantity = 5;

          } else if (type3) {
            this.buyObj = Object.assign({}, this.buyObj, {
              type: 3,
              upLineMsg: '(买5盒立升VIP)',
              unLineMsg: '(买5盒立升VIP)',
              upLineDisabled: false,
              unLineDisabled: false,
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
              purchaseQuantityMin: 5,
              purchaseQuantityMax: 5,
              purchaseQuantityStep: 5,
            })
            this.purchaseQuantity = 5;
          } else if (type5) { // vip
            this.buyObj = Object.assign({}, this.buyObj, {
              type: 5,
              upLineMsg: '',
              unLineMsg: '',
              upLineDisabled: false,
              unLineDisabled: false,
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
        } else if (res.code.toString() === '10501') {
          // 没有登录的时候不处理
        } else {
          Toast(res.msg)
        }
        callback && callback();
      }).catch((error) => {
        Toast(error)
      })
    },
    // 普通用户逻辑
    plainPurchaseQuantity() {
      console.log('this.purchaseQuantity', this.purchaseQuantity)
      if (this.purchaseQuantity >= 5 && this.purchaseQuantity < 30) {
        console.log('普通用户逻辑1', this.goodsDetail.plus)
        this.nowPrice = this.goodsDetail.plus
        this.buyObj.ptLevelName = 'VIP';
      } else {
        console.log('普通用户逻辑2', this.goodsDetail.train)
        this.nowPrice = this.goodsDetail.train
        this.buyObj.ptLevelName = '县级店';
      }
    },
    // 改变数量的时候
    changePurchaseQuantity() {
      if (this.buyObj.type == 1) {
        this.plainPurchaseQuantity()
      } else if (this.buyObj.type == 2) {
        this.plainPurchaseQuantity()
      } else if (this.buyObj.type == 3) {
        this.plainPurchaseQuantity()
      } else if (this.buyObj.type == 4) {
        this.plainPurchaseQuantity()


      } else if (this.buyObj.type == 5) { // vip
        // this.nowPrice = this.goodsDetail.plus
        this.plainPurchaseQuantity()
        // this.buyObj.ptLevelName = 'VIP';
      } else if (this.buyObj.type == 6) {
        this.nowPrice = this.goodsDetail.train
        this.buyObj.ptLevelName = '县级店';
      } else if (this.buyObj.type == 7) {
        this.nowPrice = this.goodsDetail.serv
        this.buyObj.ptLevelName = '品牌店';
      } else if (this.buyObj.type == 8) {
        this.nowPrice = this.goodsDetail.partner
        this.buyObj.ptLevelName = '金钻';
      } else if (this.buyObj.type == 9) {
        this.nowPrice = this.goodsDetail.director
        this.buyObj.ptLevelName = '总裁';
      } else if (this.buyObj.type == 10) {
        this.nowPrice = this.goodsDetail.spokesman
        this.buyObj.ptLevelName = '分公司';
      }

      console.log('buyObj', this.buyObj)
    },

    // 跳到my
    handleGoMy() {
      this.$router.push({
        name: 'my',
      })
    },
    // 跳到首页
    handleGoLogin() {
      const inviteCode = this.$route.query.inviteCode || ''
      this.$router.push({
        name: 'Login',
        query: {
          inviteCode: inviteCode,
        }
      })
    },
    // 跳到首页
    handleGoHome(){
      console.log('home')
      this.$router.push({
        name: 'Home',
      })
    },
    // 跳到购物车
    handleGoShoppingCart(){
      console.log('ShoppingCart')
      this.$router.push({
        name: 'ShoppingCart',
      })
    },
    // 加入购物车
    handleJoinCart(){
      this.buyShow = true
      this.isJoinCart = true
    },
    // 新增购物车
    apiCartAdd(obj){
      const data = Object.assign({},obj)
      apiCartAdd(data).then(res=>{
        if (res.code.toString() === '10000') {
          this.buyShow = false
          Toast(`成功添加到购物车`)
        } else {
          Toast(res.msg)
        }

      }).catch(error=>{
        Toast(error)
      })
    },

  }
}
</script>

<style lang="less" scoped>
.goodDetail {
  width: 100%;
  .goMy {
    position: fixed;
    top: 30px;
    right: 15px;
    z-index: 1;
    img {
      width: 44px;
      height: 44px;
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
  .van-popup--bottom.van-popup--round {
    border-radius: 0;
  }
  .goodDetailSwipeList {
    height: 375px;
    // height: 750px;
    .custom-indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      color: #fff;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .explain {
    padding: 15px 15px;
    .title {
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
      line-height: 26px;
    }
    .describe {
      font-size: 12px;
      font-family: PingFangSC-Light;
      font-weight: bold;
      color: rgba(102, 102, 102, 1);
      line-height: 18px;
    }
    .price {
      margin-top: 10px;
      span {
        float: left;
        font-size: 14px;
        font-weight: 400;
        color: #d62d2d;
        line-height: 22px;
        margin-right: 4px;
        height: 20px;
        overflow: hidden;
        &.num {
          line-height: 20px;
          font-size: 18px;
          font-weight: bold;
        }
      }
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
        width: 23px;
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
  .buy {
    position: fixed;
    width: 100%;
    bottom: 0;
    padding: 10px 10px;
    background: #fff;
    z-index: 1000;

    & .buyNowLayout {
      & .img1 {
        width: 48px;
        height: 42px;
        float: left;
        border: 1px dashed #878787;
        img {
          width: 100%;
          height: 100%;
        }
      }
      & .img2 {
        width: 48px;
        height: 42px;
        float: left;
        margin-left: 10px;
        border: 1px dashed #878787;
        img {
          width: 100%;
          height: 100%;
        }
      }
      & .joinCart {
        width: 110px;
        height: 40px;
        border-radius: 20px;
        border: 1px solid rgba(198, 28, 28, 1);

        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(198, 28, 28, 1);
        line-height: 40px;
        float: left;
        text-align: center;
        margin-left: 14px;
      }
      & .buyNow {
        width: 110px;
        height: 40px;
        background: linear-gradient(
          45deg,
          rgba(237, 73, 73, 1) 0%,
          rgba(198, 28, 28, 1) 100%
        );
        border-radius: 20px;
        font-size: 15px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 255, 255, 1);
        line-height: 40px;
        float: left;
        text-align: center;
        margin-left: 10px;
      }
    }

    .buyContent {
      padding: 20px 20px 20px 20px;
      height: 533px;
      .headerbarTitle {
        margin-top: 10px;
        font-weight: bold;
        font-size: 22px;
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
        margin-top: 20px;
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
      position: absolute;
      bottom: 20px;
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
        margin-top: 20px;
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
  .share {
    position: absolute;
    right: 10px;
    top: 70px;
    width: 30px;
    height: 30px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
