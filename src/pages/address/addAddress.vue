<template>
  <div class="add-addres">
    <!-- 表单 -->
    <van-field v-model="form.name"
               clearable
               placeholder="收货人" />
    <van-field v-model="form.mobile"
               type="tel"
               clearable
               placeholder="手机号码"
               maxlength="11" />
    <div class="region"
         @click="showArea = true">
      <van-field v-model="area"
                 readonly="readonly"
                 placeholder="所在地区" />
      <van-icon class="region__bedeck"
                name="arrow" />
    </div>
    <van-field v-model.trim="form.address"
               type="textarea"
               placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等" />

    <!-- 操作按钮 -->
    <van-button class="add-addres__btn-save"
                type="danger"
                @click="saveAddress">保&nbsp;&nbsp;&nbsp;存</van-button>

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
  </div>
</template>

<script>
import commonJs from '@/util/common'
import AreaList from '@/util/area'
import {  apiOperate, apiAddressDetail, apiRegionList } from '@/api/address'

export default {
  name: 'AddAddress',

  data() {
    return {
      area: null,
      flag: true,
      areaCode: '110101',
      value: null,
      values: null,
      showArea: false,
      areaList: AreaList,
      checkedArea: [],
      form: {
        id: null,
        name: null,
        mobile: null,
        address: null,
        provinceId: null,
        cityId: null,
        areaId: null,
        isDefault: 0
      },
      dataRegionList: [],
    }
  },

  created() {
    this.getAddressDetail()
    this.apiRegionList();
  },
  mounted(){
    commonJs.outSideShare();
  },
  methods: {
    // 新增及编辑地址
    async saveAddress() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/

      if (this.flag) {
        if (!this.form.name) {
          this.$toast('请输入收货人')
          return
        } else if (this.form.name.length > 15) {
          this.$toast('收货人名称长度不能超过15位')
          return
        } else if (this.form.mobile === null || !this.form.mobile) {
          this.$toast('请输入手机号码')
          return
        } else if (this.area === null || !this.area) {
          this.$toast('请选择所在地区')
          return
        } else if (this.form.address === null || !this.form.address) {
          this.$toast('请输入详细地址')
          return
        }
      }

      const paramsData = Object.assign(this.form, {
        id: this.ids || null,
        provinceId: this.form.provinceId,
        cityId: this.form.cityId,
        areaId: this.form.areaId
      })
      // const res = await this.$post(this.$api.operate, paramsData)

      apiOperate(paramsData).then(res=>{
        if (res.code === 10000 && this.ids) {
          this.$toast('编辑成功')
          this.handleOrderDetail()
          this.$router.push({ name: 'Address' })
          return
        } else if (res.code === 10000) {
          this.handleOrderDetail()
          this.$toast('新增成功')
          this.$router.push({ name: 'Address' })
          return
        }
      }).catch(error=>{
        this.$toast(error)
      })
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

    // 地址详情
    async getAddressDetail() {
      this.ids = this.$route.query.id
      document.title = this.ids ? '编辑地址' : '新增地址'
      if(this.ids){ // 编辑的时候才调用地址详情接口
        apiAddressDetail({ id: this.ids }).then((res)=>{
          if (res.code === 10000) {
            this.form = res.data
            if (this.form.provinceName === this.form.cityName) {
              this.area = `${this.form.cityName} ${this.form.areaName}`
              return
            }
            this.areaCode = this.findKey(this.areaList.county_list, this.form.areaName)
            this.area = `${this.form.provinceName} ${this.form.cityName} ${this.form.areaName}`
          }
        }).catch(error=>{
          this.$toast(error)
        })
      }
      
    },
    apiRegionList(){
      apiRegionList({}).then((res)=>{
        try {
          if (res.code === 10000) {
            this.dataRegionList = res.data.items;
          }else{
            this.$toast(res.msg)
          }
        } catch (error) {
          console.error(error)
        }
      }).catch(error=>{
        this.$toast(error)
      });
       
    },

    // 获取省市区数据
    async getRegionList() {
      // const res = await this.$post(this.$api.regionList, {})
      try {
        const temp = this.dataRegionList || []
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

    // 设置默认地址 sessionStorage
    handleOrderDetail() {
      const getOrderDetail = JSON.parse(window.sessionStorage.getItem('orderDetail')) || {}
      const orderDetail = Object.assign({}, getOrderDetail, { checkedAddress: this.form })
      window.sessionStorage.setItem('orderDetail', JSON.stringify(orderDetail))
    }
  }
}
</script>

<style lang="less" scoped>
.add-addres {
  text-align: center;
  position: relative;
  background: #f5f5f5;

  // /deep/ .van-cell:not(:last-child):after {
  //   position: absolute;
  //   content: " ";
  //   pointer-events: none;
  //   right: 0;
  //   bottom: 0;
  //   left: 15px;
  //   margin-right: 15px;
  // }

  /deep/ .van-cell {
    padding: 13px 15px;
  }

  /deep/ .van-field__control {
    font-size: 16px;
    color: #333;
  }

  /deep/ .van-popup {
    height: 264px;
  }

  /deep/ .van-button--danger {
    height: 44px;
    line-height: 44px;
    font-size: 16px;
    border: 0px;
    background:linear-gradient(225deg,rgba(10,211,238,1) 0%,rgba(10,190,213,1) 100%);
    color: #fff;
  }

  .region {
    position: relative;

    &__bedeck {
      right: 10px;
      top: 11px;
      color: #ccc;
      font-size: 20px;
      position: absolute;
    }
  }

  &__btn-save {
    width: 335px;
    margin-top: 70px;
    background: #333;
  }

  &__btn-del {
    width: 335px;
    border-radius: 2px;
  }

  &__area {
    bottom: 0;
    width: 375px;
    position: fixed;
  }
}
</style>
