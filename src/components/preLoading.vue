<template>
  <div class="preLoading"
       ref="load"
       v-if="preLoad">
    <span class="preLoading__bedeck" />
  </div>
</template>

<script>
export default {
  name: 'preLoading',

  data() {
    return {
      preLoad: true
    }
  },

  mounted() {
    this.preLoadingHeight()
  },

  methods: {
    preLoadingHeight() {
      const height = `${document.documentElement.clientHeight}` || '100%'
      this.$refs.load.style.height = `${height}px`
    }
  }
}
</script>

<style lang="less" scoped>
.preLoading {
  top: 0;
  left: 0;
  width: 100%;
  position: fixed;
  background: #fff;
  z-index: 1999;

  &__bedeck {
    top: 45%;
    left: 50%;
    width: 80px;
    height: 80px;
    margin-left: -40px;
    margin-top: -60px;
    background: url(../assets/xfyl.gif) left top no-repeat;
    background-size: 100%;
    position: absolute;
  }
}
</style>
