<template>
  <div class="address-list">
    <!-- 列表 -->
    <div class="wrap"
         v-for="item in addressList"
         :key="item.id">
      <mt-cell-swipe :right="[
                      {
                        content: '删除',
                        style: { background: '#333', color: '#fff' },
                        handler: () => delAddress(item.id)
                      }
                    ]">
        <div class="left"
             @click="handleConfig(item.id)">
          <van-radio-group v-model="isDefault">
            <van-radio :name="item.id"
                       checked-color="#faa702">
              <img
                class="choiceImg"
                slot="icon"
                slot-scope="props"
                :src="props.checked ? choiceImg : choiceImgNone"
              >
              <p class="left__name">
                <span class="name">{{ item.name }}</span>
                <span class="mobile">{{ item.mobile }}</span>
              </p>
              <p class="left__site">
                <span v-if="item.provinceName !== item.cityName">{{ item.provinceName + item.cityName + item.areaName + item.address }}</span>
                <span v-else>{{ item.cityName + item.areaName + item.address }}</span>
              </p>
            </van-radio>
          </van-radio-group>
        </div>
        <div class="right">
          <i class="right--bedeck" />
          <router-link :to="{ name: 'AddAddress', query: { id: item.id } }">
            <span class="right__edit">编辑</span>
          </router-link>
        </div>
      </mt-cell-swipe>
    </div>

    <!-- 新增 -->
    <div class="new" @click="handleGoAddAddress">
      <!-- <router-link :to="{ name: 'AddAddress' }"> -->
        <div class="new__left">
          <img src="../../assets/img/address/add_01@2x.png"
               alt="">
          <span>新增收货地址</span>
        </div>
        <div class="new__right">
          <van-icon name="arrow"
                    color="#ccc"
                    size="20" />
        </div>
      <!-- </router-link> -->
    </div>

    <!-- 操作按钮 -->
    <div class="address-list__btn-default">
      <van-button type="info"
                  @click="setDefaultAddress">完&nbsp;&nbsp;&nbsp;成</van-button>
    </div>
  </div>
</template>

<script>

import commonJs from '@/util/common'
import {  apiAddressList, apiOperateDefault, apiAddressDelete } from '@/api/address'
import choiceImg from '../../assets/img/address/choice_01@2x.png'
import choiceImgNone from '../../assets/img/address/choice_01@2x2.png'


export default {
  name: 'Address',

  data() {
    return {
      ids: null,
      isDefault: '',
      addressList: [],
      pagingData: {
        page: 1,
        limit: 20
      },
      choiceImg,
      choiceImgNone,
    }
  },

  created() {
    this.initData()
  },
  mounted(){
    commonJs.outSideShare();
  },

  methods: {
    // 初始化
    async initData() {
      apiAddressList(this.pagingData).then((res)=>{
        if(res.code.toString() === '10000'){
          this.addressList = res.data.items
          const temp = []
          this.addressList.forEach(v => {
            if (v.isDefault === 1) {
              temp.push(v.id)
              this.isDefault = parseInt(temp.join())
            }
          })
        }else{
          this.$toast(res.msg)
        }
      }).catch(error=>{
        this.$toast(error)
      })
    },

    // 获取默认地址ID
    handleConfig(id) {
      this.ids = id
    },

    // 设置默认地址
    async setDefaultAddress() {
      // if (this.addressList.length > 0 && !this.ids) {
      //   this.ids = this.addressList[0].id
      // }
      console.log('this.addressList', this.addressList)
      if (!this.ids && this.addressList.length >= 1) {
        this.ids = this.addressList[0].id
      } else if (!this.ids) {
        this.$toast('请新增一条收货地址')
        return
      }

      const paramsData = Object.assign({}, {
        id: this.ids,
        isDefault: 1
      })

      apiOperateDefault(paramsData).then(res=>{
        if(res.code.toString() === '10000'){
          this.$toast('设置默认地址成功！')
          this.initData()
          this.$nextTick(() => {
            this.handleOrderDetail() // 设置默认地址 sessionStorage
          })
        }
      }).catch(error=>{
        this.$toast(error)
      })
    },

    // 删除
    async delAddress(id) {      
      // const res = await this.$post(this.$api.addressDelete, { id: id })
      apiAddressDelete({ id: id }).then(res=>{
        if(res.code.toString() === '10000'){
          this.$dialog.confirm({
            message: '确定要删除该地址？'
          }).then(() => {
            this.initData()
          }).catch(() => {
          })
        }
      }).catch(error=>{
        this.$toast(error)
      })
    },

    // 设置默认地址 sessionStorage
    handleOrderDetail() {
      const getOrderDetail = JSON.parse(window.sessionStorage.getItem('orderDetail')) || {}

      if (this.ids) {
        const addressList = this.addressList.filter((item) => {
          if (item.id === this.ids) {
            return item.id
          }
        })

        const orderDetail = Object.assign({}, getOrderDetail, {
          checkedAddress: addressList[0]
        })

        window.sessionStorage.setItem('orderDetail', JSON.stringify(orderDetail))
      } else {
        const addressList = this.addressList.filter((item) => {
          if (item.isDefault === 1) {
            return item.id
          }
        })
        const orderDetail = Object.assign({}, getOrderDetail, {
          checkedAddress: addressList[0]
        })
        window.sessionStorage.setItem('orderDetail', JSON.stringify(orderDetail))
      }

      this.$router.push({
        name: 'Order'
      })
    },
    // 跳去新增
    handleGoAddAddress(){
      this.$router.push({
        name: 'AddAddress'
      })
    },
  }
}
</script>

<style lang="less" scoped>
.address-list {
  background: #f5f5f5;

  .wrap {
    display: flex;
    background: #fff;
    position: relative;
    justify-content: space-between;
    // border-bottom: 1px solid #f5f5f5;
  
    .left {
      padding-left: 10px;
      .choiceImg{
        width: 18px;
        height: 18px;
      }
      /deep/ .van-radio__label{
        padding-left: 1px;
      }

      &__name {
        line-height: 22px;
        font-size: 16px;
        color: #333;
        width: 255px;
        margin: 14px 0 10px;

        .name {
          padding-right: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: top;
          max-width: 140px;
          display: inline-block;
        }
      }

      &__site {
        color: #999;
        font-size: 14px;
        line-height: 20px;
        width: 255px;
        padding-bottom: 14px;
      }
    }

    .right {
      right: 0;
      top: 50%;
      margin-top: -10px;
      position: absolute;

      &__edit {
        color: #666;
        font-size: 14px;
        padding-right: 20px;
        vertical-align: middle;
      }

      &--bedeck {
        display: inline-block;
        width: 1px;
        height: 18px;
        background: #ccc;
        margin-right: 10px;
        vertical-align: middle;
      }
    }
  }

  .wrap:nth-last-child(1) {
    border-bottom: none;
  }

  .new {
    display: flex;
    background: #fff;
    line-height: 60px;
    margin-top: 10px;
    padding-left: 48px;
    position: relative;
    justify-content: space-between;

    &__left {
      > img {
        width: 18px;
        height: 18px;
        margin-right: 5px;
        display: inline-block;
        position: absolute;
        left: 20px;
        top: 20px;
      }

      > span {
        color: #333;
        display: inline-block;
      }
    }

    &__right {
      right: 15px;
      top: 5px;
      position: absolute;
    }
  }

  &__btn-default {
    text-align: center;
    margin-top: 70px;
  }

  /deep/ .van-button--info {
    height: 44px;
    line-height: 44px;
    width: 335px;
    font-size: 16px;
    border: 0px;
    background:linear-gradient(225deg,rgba(10,211,238,1) 0%,rgba(10,190,213,1) 100%);
    color: #fff;
  }

  /deep/ .mint-cell-swipe-button {
    padding: 0 15px;
    line-height: 78px;
  }

  /deep/ .mint-cell,
  /deep/ .mint-cell-value {
    width: 375px;
  }
  /deep/ .mint-cell{
    background: none;
  }
}

</style>
