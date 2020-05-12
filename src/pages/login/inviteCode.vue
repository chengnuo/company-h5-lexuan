<template>
  <div class="login">
    <!-- logo -->
    <div class="login__logo">
      <!-- <img class="img"
           src="../../../assets/img/login/App Icon 60 x 60@2x.png"
           alt=""> -->
      <p class="title"
         style="margin-top: 93px;">输入邀请码
        <p />
    </div>

    <!-- 表单 -->
    <div class="login__form">

      <CountryAreaNo class="decorate"
                     v-click-outside="onClickOutside"
                     v-show="checkDialog.visible"
                     :visible.sync="checkDialog.visible" />

      <div class="mobile">
        <img class="mobile--icon"
             src="../../assets/img/login/inviteCode-icon.png"
             alt="">

        <van-field class="mobile--input"
                   clearable
                   type="tel"
                   v-model="form.inviteCode"
                   placeholder="输入邀请码"
                   @input="handleCode" />
      </div>
    </div>

    <!-- 底部 -->
    <div class="login__footer"
         v-if="!checkDialog.visible">
      <van-button class="btn-save"
                  type="danger"
                  @click="actRegisterAndLogin"
                  :disabled="(form.inviteCode.length>0)?false:true">绑 定</van-button>
    </div>
  </div>
</template>

<script>
import clickOutside from '@/util/bind'
import CountryAreaNo from './CountryAreaNo'
import { apiRegister } from '@/api/login'
import { apiGoodsList } from '@/api/goods'
import commonJs from '@/util/common'

import { Dialog } from 'vant';

export default {
  name: 'actLogin',

  components: {
    CountryAreaNo
  },

  directives: {
    clickOutside
  },

  data() {
    return {
      type: null,
      authTime: 0,
      inviteCode: '',
      isShow: false,
      tempCode: null,
      child: null,
      disabledBtn: true,
      sendAuthCode: true,
      checkDialog: {
        visible: false,
        number: '86'
      },
      form: {
        code: '',
        mobile: '',
        inviteCode: ''
      }
    }
  },

  created() {
  },

  mounted() {

  },

  methods: {

    // 获取验证码
    async getAuthCode() {
      const paramsData = Object.assign({}, {
        type: 6,
        areaCode: this.checkDialog.number === null ? '86' : this.checkDialog.number,
        mobile: this.form.mobile
      })
      const res = await this.$post(this.$api.authCode, paramsData)

      try {
        if (res.code.toString() === '10004' || res.code.toString() === '10029' || res.code.toString() === '10014') {
          this.authTime = 60
          this.sendAuthCode = false
          const authTimeTimer = setInterval(() => {
            this.authTime--
            if (this.authTime <= 0) {
              this.sendAuthCode = true
              clearInterval(authTimeTimer)
            }
          }, 1000)
          return
        } else if (res.code.toString() === '10028') {
          this.$toast('该手机号码已经注册')
          return
        }

        this.$toast(res.msg)
      } catch (error) {
        console.error(error)
      }
    },

    // 校验验证码
    async verifyAuthCode() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/

      if (this.form.mobile === null || !this.form.mobile) {
        this.$toast('请输入手机号码')
      } else if (!reg.test(this.form.mobile)) {
        this.$toast('手机格式不正确')
      } else if (this.form.code === null) {
        this.$toast('请输入验证码')
      } else {
        const res = await this.$post(this.$api.checkCode, this.form)
        try {
          if (res.code.toString() === '10000') {
            this.register()
          } else if (res.code.toString() === '10017' || res.code.toString() === '10019') {
            this.$toast(res.msg)
          }
        } catch (error) {
          console.error(error)
        }
      }
    },

    // 判断按钮是否禁用
    handleCode() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/
      if (reg.test(this.form.mobile) && this.form.code.length >= 1) {
        this.disabledBtn = false
      } else {
        this.disabledBtn = true
      }
    },

    // 校验
    verifyTel() {
      const reg = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/

      if (this.form.mobile === null || !this.form.mobile) {
        this.$toast('请输入手机号码')
      } else if (!reg.test(this.form.mobile)) {
        this.$toast('手机格式不正确')
      } else {
        this.getAuthCode()
      }
    },

    // 事件处理
    onClickOutside() {
      if (this.child && !this.child.contains(event.target)) {
        this.checkDialog.visible = false
      }
    },

    // 国家地区编号显示
    handleAreaCode() {
      this.child = this.$refs.areaNo

      Object.assign(this.checkDialog, {
        visible: true,
        number: this.checkDialog.number !== '86' ? this.checkDialog.number : '86'
      })
    },

    // 获取国家地区编号
    getAreaCode(number) {
      this.checkDialog.number = number.toString()
    },

    // 注册并且登录
    actRegisterAndLogin() {
      const data = Object.assign({}, this.form, {
        mobile: this.$route.query.mobile,
        code: this.$route.query.code,
        inviteCode: this.form.inviteCode,
        dataType: 1,
      })

      apiRegister(data).then(res => {
        if (res.code.toString() === '10000') {

          

          // 登录后，跳转详情

          let queryInviteCode = this.form.inviteCode || '';
          let inviteCode = res.data.inviteCode || '';
          window.sessionStorage.setItem('goodId', JSON.stringify({
            path: `${window.location.origin}/goodDetail?inviteCode=${queryInviteCode}`,
          }))
          const getInviteCodeRedirectUrlFn = commonJs.getInviteCodeRedirectUrlFn();
          console.log('getInviteCodeRedirectUrlFn', getInviteCodeRedirectUrlFn)
          if (getInviteCodeRedirectUrlFn && getInviteCodeRedirectUrlFn.redirectUrl) { // 跳转逻辑，如果商品详情存在 redirectUrl 就跳转到登录
            window.location.href = `${getInviteCodeRedirectUrlFn.redirectUrl}?inviteCode=${inviteCode}`
          } else {
            if (res.data.dataType == 1) { // 已经注册的用户
              // Dialog.confirm({
              //   // title: '标题',
              //   message: `你已经是乐选用户，无需注册。点击“确定”，跳转乐选首页。`
              // }).then(() => {
              //   this.$router.push({
              //     path: `/index` // 商品详情
              //   })
              // }).catch(() => {
              //   // on cancel
              // });

              this.$router.push({
                path: `/index` // 商品详情
              })
            }else{
              this.$router.push({
                path: `/goodDetail?inviteCode=${inviteCode}` // 商品详情
              })
            }
            // window.location.href = `/goodDetail?inviteCode=${inviteCode}` // 商品详情
            // 现在跳download
            // this.$router.push({
            //   path: `download` // 跳到app
            // })
          }

          commonJs.setInviteCodeRedirectUrlFn({
            firstInviteCode: {
              inviteCode: this.form.inviteCode || '',
              type: this.$route.query.type || ''
            },
            loginInviteCode: {
              inviteCode: res.data.inviteCode || '',
            },
            redirectUrl: null
          }) // 设置获取-首次和登录后的inviteCode
          window.sessionStorage.setItem('userData', JSON.stringify(res.data)) // 这个保持跟之前一样。
          // this.$router.push({
          //   path: '/goodDetail/1182163'
          // })

        } else {
          this.$toast(res.msg)
        }

      }).catch(error => {
        this.$toast(error)
      })
    }

  }
}
</script>

<style lang="less" scoped>
.login {
  height: 100vh;
  background: #fff;
  text-align: center;

  &__logo {
    padding: 28px 0 30px;
    text-align: center;

    .img {
      width: 77px;
      height: 77px;
      margin: 0 auto;
    }

    .title {
      color: #333;
      font-size: 20px;
      margin-top: 10px;
      line-height: 28px;
      font-weight: bold;
    }
  }

  &__form {
    .mobile {
      width: 335px;
      display: flex;
      height: 44px;
      margin: 0 auto;
      line-height: 44px;
      border-radius:22px;
      border: 1px solid #ccc;

      &--icon {
        width: 24px;
        height: 24px;
        margin-top: 10px;
        padding-left: 20px;
      }

      &--region {
        font-size: 16px;
        padding: 0 11px 0 10px;
        color: #c89651;
        display: inline-block;
      }

      &--bedeck {
        width: 2px;
        height: 24px;
        margin-top: 10px;
        background: #e6e6e6;
        display: inline-block;
      }

      &--input {
        text-indent: 10px;
        border-radius:22px;

        input::-webkit-input-placeholder {
          color: #ccc;
          font-size: 16px;
          padding-left: 10px;
        }
      }

      &--code {
        top: 0;
        right: 20px;
        font-size: 14px;
        color: #aa9160;
        position: absolute;
      }

      &--count-down {
        color: #ccc;
      }
    }

    .modifier {
      margin-top: 20px;
      position: relative;

      /deep/ .van-cell {
        width: 150px;
      }
    }

    .decorate {
      margin: 0 auto;
    }
  }

  &__footer {
    .btn-save {
      width: 335px;
      margin: 46px 0 10px;
      background: #333;
    }

    .describe {
      color: #ccc;
      font-size: 12px;
      line-height: 18px;

      span {
        color: #aa9160;
      }
    }
  }

  /deep/ .van-cell {
    font-size: 16px;
  }

  /deep/ .van-button--danger {
    font-size: 16px;
    background:linear-gradient(45deg,rgba(230,0,23,1) 0%,rgba(204,0,20,1) 100%);
    border-radius:22px;
  }
}
</style>
