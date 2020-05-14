<template>
  <div class="country-area-no">
    <div class="stock">
      <p class="stock__title">常用</p>
      <div class="stock__row">
        <div class="wrap"
             v-for="item in common"
             :key="item.id"
             @click="countryCode(item.number)">
          <span class="left">{{ item.name }}</span>
          <span class="right">+{{ item.number }}</span>
        </div>
      </div>
    </div>
    <div class="stock">
      <p class="stock__title">其他</p>
      <div class="stock__row">
        <div class="wrap box"
             v-for="item in normal"
             :key="item.id"
             @click="countryCode(item.number)">
          <span class="left">{{ item.name }}</span>
          <span class="right">+{{ item.number }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CountryAreaNo',

  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      common: [],
      normal: [],
      pagingData: {
        page: 1,
        limit: 2000
      }
    }
  },

  computed: {
    localVisible: {
      get() {
        return this.visible
      },

      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },

  created() {
    this.initData()
  },

  methods: {
    // 初始化
    async initData() {
      const res = await this.$post(this.$api.areaList, this.pagingData)
      try {
        if (res.code.toString() === '10000') {
          this.common = res.data.common
          this.normal = res.data.normal
        }
      } catch (error) {
        console.error(error)
      }
    },

    // 国家地区编号
    countryCode(number) {
      this.localVisible = false
      this.$parent.getAreaCode(number)
    }
  }
}
</script>

<style lang="less" scoped>
.country-area-no {
  text-align: left;
  width: 335px;
  height: 210px;
  border: 1px solid #ccc;
  border-top: none;
  overflow-y: scroll;

  .stock {
    &__title {
      color: #999;
      font-size: 14px;
      padding: 16px 16px 0 12px;
    }

    &__row {
      padding: 0 16px;

      .wrap {
        display: flex;
        font-weight: bold;
        line-height: 46px;
        padding: 0 10px;
        justify-content: space-between;
        border-bottom: 1px solid #f2f2f2;
      }

      .left {
        color: #666;
      }

      .right {
        color: #333;
      }

      .box:nth-last-child(1) {
        border-bottom: none;
      }
    }
  }
}
</style>
