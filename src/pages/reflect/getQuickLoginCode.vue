<!-- 登录授权中间页 -->
<template>
  <div class="getCode">
    <span class="getCodeContent">微信授权中...</span>
  </div>
</template>

<script>

import { Toast } from 'vant'
import commonJs from '@/util/common'

export default {
  name: 'getCode',
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
      // 缓存数据
      const query = this.$route.query
      const params = this.$route.params
      if (!commonJs.getInviteCodeRedirectUrlFn().firstInviteCode) {
        commonJs.setInviteCodeRedirectUrlFn({
          firstInviteCode: this.$route.query || '',
          loginInviteCode: '',
          redirectUrl: `${window.location.origin}${window.location.pathname}`
          // redirectUrl: `${window.location.origin}/becomeServiceProvider`
        }) // 设置获取-首次和登录后的inviteCode111
      }


      const code = this.$route.query.code
      this.apiLoginAuthWx(code)
    },
    // 微信快捷登录23123
    async apiLoginAuthWx(code){
      console.log(1)
      const getInviteCodeRedirectUrlFn = commonJs.getInviteCodeRedirectUrlFn()
      console.log(2)
      let inviteCode = getInviteCodeRedirectUrlFn.firstInviteCode.inviteCode || ''
      let loginAuthWxData = Object.assign({}, {
        code: code,
        sysCnl: "WX-PUBLIC",
        source: 'h5',
        tradeType: 'JSAPI',
        operType: '1',
      })
      console.log(3)
      console.log('getInviteCodeRedirectUrlFn', getInviteCodeRedirectUrlFn)
      console.log('inviteCode', inviteCode)
      const resLoginAuthWx = await this.$post(this.$api.loginAuthWx, loginAuthWxData)
      console.log('resLoginAuthWx', resLoginAuthWx)
      if (resLoginAuthWx.code.toString() === '10000') {
        // window.sessionStorage.setItem('userData', JSON.stringify(resLoginAuthWx.data)) // 这个保持跟之前一样。
        // window.location.href = `/becomeServiceProvider?inviteCode=${inviteCode}`

        const getInviteCodeRedirectUrlFn = commonJs.getInviteCodeRedirectUrlFn()
        window.sessionStorage.setItem('userData', JSON.stringify(resLoginAuthWx.data)) // 这个保持跟之前一样。
        const inviteCode = resLoginAuthWx.data.inviteCode || ''
        if (getInviteCodeRedirectUrlFn && getInviteCodeRedirectUrlFn.redirectUrl) { // 跳转逻辑，如果商品详情存在 redirectUrl 就跳转到登录
          window.location.href = `${getInviteCodeRedirectUrlFn.redirectUrl}?inviteCode=${inviteCode}`
        }else{
          window.location.href = `/reflect?inviteCode=${inviteCode}`
        }
        
      } else if (resLoginAuthWx.code.toString() === '10036'){
        // this.apiLoginAuthWxBind(resLoginAuthWx); // 绑定的时候
        // window.sessionStorage.setItem('loginAuthWxBind', JSON.stringify(resLoginAuthWx.data)) // 这个保持跟之前一样。
        // window.location.href = `/reflect/quickLoginBind?inviteCode=${inviteCode}`
        Toast('该微信尚未绑定幸福引力账号');
        this.$router.push({
          name: 'ReflectQuickLogin',
          query: {
            inviteCode: inviteCode,
          }
        })
      }else if (resLoginAuthWx.code.toString() === '10060'){
        // 10060: 用户不存在，当source = h5 跳登录
        // this.$router.push({
        //   name: 'reflectLogin',
        //   query: {
        //     inviteCode: inviteCode,
        //   }
        // })
        Toast('该微信尚未绑定幸福引力账号');
        this.$router.push({
          name: 'ReflectQuickLogin',
          query: {
            inviteCode: inviteCode,
          }
        })
      }else{
        Toast(resLoginAuthWx.msg)
      }
    },
    

  },
  components: {}
}
</script>

<style lang="less" scoped>
.getCode {
  background: #f5f5f5;
  position: absolute;
  width: 100%;
  height: 100%;
  text-align: center;
  .getCodeContent{
    top: 50%;
    margin-top: -22px;  /* margin-top值为自身高度的一半 */
    margin-left: -50px;  /* margin-top值为自身高度的一半 */
    position: absolute;
    padding:0;
  }
}
</style>
