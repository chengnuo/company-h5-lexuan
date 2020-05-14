<!-- 登录授权中间页 -->
<template>
  <div class="loginMiddleware">
    <span class="loginMiddlewareContent">微信授权中...</span>
  </div>
</template>

<script>

import commonJs from '@/util/common'

export default {
  name: 'loginMiddleware',
  data() {
    return {
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    // 初始化
    init() {
      this.loginAuthorization()
    },
    // 授权
    /**
     * @method query.loginSource 授权来源
     */
    loginAuthorization() {
      const query = this.$route.query
      // 判断来源使用appid
      let appid = commonJs.config.appidTixian
      // if(query.loginSource==='testXFyinli' || query.loginSource==='XFyinli' ){
      //   // appid = commonJs.config.appidXFYL
      //   appid = commonJs.config.appid // 暂时改回1
      // }

      console.log('appid', appid)
      
      const state = Math.random().toString()
      let inviteCode = query.inviteCode || ''
      const redirect_uri = encodeURIComponent(`${commonJs.getUrl()}/reflect/index?loginSource=${query.loginSource}&inviteCode=${inviteCode}&myappid=${appid}&t=${state}`)
      // alert(1)
      location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri}&response_type=code&scope=snsapi_userinfo&state=${state}#wechat_redirect`
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.loginMiddleware {
  background: #f5f5f5;
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  .loginMiddlewareContent {
    top: 50%;
    margin-top: -22px; /* margin-top值为自身高度的一半 */
    margin-left: -50px; /* margin-top值为自身高度的一半 */
    position: absolute;
    padding: 0;
  }
}
</style>
