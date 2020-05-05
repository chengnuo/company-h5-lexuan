import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)


const routerData = {
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/goodDetail',
      name: 'GoodDetail',
      meta: {
        title: '乐选'
      },
      component: () => import('@/pages/goods/goodDetail')
    },
    // {
    //   path: '/goodDetail/:id',
    //   name: 'GoodDetail',
    //   meta: {
    //     title: '商品详情'
    //   },
    //   component: () => import('@/pages/goods/goodDetail')
    // },
    {
      path: '/',
      name: 'Login',
      meta: {
        title: '乐选'
      },
      component: () => import('@/pages/login/login') // 乐选注册
    },
    {
      path: '/login',
      name: 'Login',
      meta: {
        title: '乐选'
      },
      component: () => import('@/pages/login/login') // 乐选注册
    },
    {
      path: '/signIn',
      name: 'SignIn',
      meta: {
        title: '乐选'
      },
      component: () => import('@/pages/login/signIn') // 乐选登录
    },
    {
      path: '/passwordLogin',
      name: 'PasswordLogin',
      meta: {
        title: '登录' // 密码登录
      },
      component: () => import('@/pages/login/passwordLogin')
    },
    {
      name: 'QuickLogin',
      path: '/quickLogin',
      meta: {
        title: '幸福引力'
      },
      component: () => import('@/pages/login/quickLogin')
    }, {
      name: 'QuickLoginBind',
      path: '/quickLoginBind',
      meta: {
        title: '幸福引力'
      },
      component: () => import('@/pages/login/quickLoginBind')
    },
    {
      path: '/verificationCode',
      name: 'ActVerificationCode',
      meta: {
        title: '登录/注册'
      },
      component: () => import('@/pages/login/verificationCode')
    },
    {
      path: '/inviteCode',
      name: 'ActInviteCode',
      meta: {
        title: '登录/注册'
      },
      component: () => import('@/pages/login/inviteCode')
    },
    // {
    //   path: '/girl/userAgreement',
    //   name: 'GirlUserAgreement',
    //   meta: {
    //     title: '用户协议' // 女郎
    //   },
    //   component: () => import('@/pages/login/girl/userAgreement')
    // },
    // {
    //   path: '/girl/privacy',
    //   name: 'GirlPrivacy',
    //   meta: {
    //     title: '隐私政策' // 女郎
    //   },
    //   component: () => import('@/pages/login/girl/privacy')
    // },
    // {
    //   path: '/player/userAgreement',
    //   name: 'PlayerUserAgreement',
    //   meta: {
    //     title: '用户协议' // 玩家
    //   },
    //   component: () => import('@/pages/login/player/userAgreement')
    // },
    // {
    //   path: '/player/privacy',
    //   name: 'PlayerPrivacy',
    //   meta: {
    //     title: '隐私政策' // 玩家
    //   },
    //   component: () => import('@/pages/login/player/privacy')
    // },
    {
      path: '/yinli/userAgreement',
      name: 'YinliUserAgreement',
      meta: {
        title: '用户协议' // 乐选
      },
      component: () => import('@/pages/login/yinli/userAgreement')
    },
    {
      path: '/yinli/privacy',
      name: 'YinliPrivacy',
      meta: {
        title: '隐私政策' // 乐选
      },
      component: () => import('@/pages/login/yinli/privacy')
    },
    {
      path: '/yinli/authorizedInformation',
      name: 'AuthorizedInformation',
      meta: {
        title: '代理经销商网络服务协议' // 乐选-加盟合作协议书-代理经销商网络服务协议
      },
      component: () => import('@/pages/login/yinli/authorizedInformation')
    },
    {
      path: '/yinli/biscuitMiddle',
      name: '/yinli/biscuitMiddle',
      meta: {
        title: '引力饼干页面' // 引力饼干页面
      },
      component: () => import('@/pages/yinli/biscuitMiddle')
    },
    {
      path: '/address',
      name: 'Address',
      meta: {
        title: '我的地址'
      },
      component: () => import('@/pages/address')
    },
    {
      path: '/add-address',
      name: 'AddAddress',
      component: () => import('@/pages/address/addAddress')
    },
    {
      path: '/order',
      name: 'Order',
      meta: {
        title: '订单确认'
      },
      component: () => import('@/pages/order/index')
    },
    {
      path: '/underLineOrder',
      name: 'UnderLineOrder',
      meta: {
        title: '线下购买'
      },
      component: () => import('@/pages/order/underLineOrder')
    },
    {
      path: '/order/detail/:orderNo',
      name: 'OrderDetail',
      meta: {
        title: '订单详情'
      },
      component: () => import('@/pages/order/detail')
    },
    {
      path: '/my',
      name: 'my',
      meta: {
        title: '我的'
      },
      component: () => import('@/pages/my/index')
    },
    {
      path: '/logistics',
      name: 'logistics',
      meta: {
        title: '物流信息'
      },
      component: () => import('@/pages/logistics/index')
    },
    {
      path: '/listShip',
      name: 'listShip',
      meta: {
        title: '物流信息'
      },
      component: () => import('@/pages/logistics/listShip')
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      meta: {
        title: '我的订单'
      },
      component: () => import('@/pages/myOrder/index')
    },
    {
      path: '/paySucceed',
      name: 'paySucceed',
      meta: {
        title: '支付成功'
      },
      component: () => import('@/pages/order/paySucceed')
    },
    {
      path: '/underLinePaySucceed',
      name: 'UnderLinePaySucceed',
      meta: {
        title: '线下进货' // 线下进货支付成功
      },
      component: () => import('@/pages/order/underLinePaySucceed')
    },
    {
      path: '/pay/payAgree',
      name: 'payAgree',
      meta: {
        title: '支付协议'
      },
      component: () => import('@/pages/pay/payAgree')
    },
    {
      path: '/help',
      name: 'help',
      meta: {
        title: '帮助'
      },
      component: () => import('@/pages/help/index')
    },
    {
      path: '/pay',
      name: 'Pay',
      meta: {
        title: '支付'
      },
      component: () => import('@/pages/pay/index')
    },
    {
      path: '/payMiddleware',
      name: 'PayMiddleware',
      meta: {
        title: '支付平台'
      },
      component: () => import('@/pages/pay/payMiddleware')
    },
    {
      path: '/underLineAllOrder',
      name: 'underLineAllOrder',
      meta: {
        title: '线下发货'
      },
      component: () => import('@/pages/underLineAllOrder/index')
    },
    {
      path: '/underLineAllOrder/deliverGoods',
      name: 'DeliverGoods',
      meta: {
        title: '发货'
      },
      component: () => import('@/pages/underLineAllOrder/deliverGoods')
    },
    {
      path: '/underLineAllOrder/payment',
      name: 'underLineAllOrderPayment',
      meta: {
        title: '发货成功'
      },
      component: () => import('@/pages/underLineAllOrder/payment')
    },
    {
      path: '/download',
      name: 'download',
      meta: {
        title: '下载'
      },
      component: () => import('@/pages/download/index')
    },
    {
      path: '/report/:type',
      name: 'report',
      meta: {
        title: '检验报告'
      },
      component: () => import('@/pages/report/index')
    },
    {
      path: '/reportJump',
      name: 'reportJump',
      meta: {
        title: '质检报告'
      },
      component: () => import('@/pages/report/jump')
    },
    {
      path: '/introduce',
      name: 'introduce',
      meta: {
        title: '公司简介'
      },
      component: () => import('@/pages/introduce/index')
    },
    {
      path: '/sweepCode',
      name: 'sweepCode',
      meta: {
        title: 'XFHL防伪查询'
      },
      component: () => import('@/pages/sweepCode/index')
    },
    {
      path: '/sweepCodeSucc',
      name: 'sweepCodeSucc',
      meta: {
        title: 'XFHL防伪查询'
      },
      component: () => import('@/pages/sweepCode/success')
    },
    {
      path: '/sweepCodeError',
      name: 'sweepCodeError',
      meta: {
        title: 'XFHL防伪查询'
      },
      component: () => import('@/pages/sweepCode/error')
    },
    {
      path: '/paySuccess/payment',
      name: 'paySuccess',
      meta: {
        title: '支付成功'
      },
      component: () => import('@/pages/paySuccess/payment')
    },
    {
      path: '/paySuccess/bondpayment',
      name: 'Bondpayment',
      meta: {
        title: '支付成功'
      },
      component: () => import('@/pages/paySuccess/bondpayment')
    },
    {
      path: '/my/iWantToUpgrade',
      name: 'MyIWantToUpgrade',
      meta: {
        title: '我要升级'
      },
      component: () => import('@/pages/my/iWantToUpgrade')
    },
    {
      path: '/my/upgradeProgress',
      name: 'MyUpgradeProgress',
      meta: {
        title: '升级进度'
      },
      component: () => import('@/pages/my/upgradeProgress'),
    },
    {
      path: '/my/notice',
      name: 'MyNotice',
      meta: {
        title: '我的通知'
      },
      component: () => import('@/pages/my/notice'),
    },
    {
      path: '/index',
      name: 'Index',
      meta: {
        title: '首页'
      },
      component: () => import('@/pages/index/home')
    },
    {
      path: '/start',
      name: 'Start',
      meta: {
        title: '乐选'
      },
      component: () => import('@/pages/index/start')
    },
    {
      path: '/my/certificateAuthorization',
      name: 'MyCertificateAuthorization',
      meta: {
        title: '授权书' // 乐选-授权书录入1
      },
      component: () => import('@/pages/my/certificateAuthorization')
    },
    {
      path: '/my/customAdvertisingSpace',
      name: 'CustomAdvertisingSpace',
      meta: {
        title: '广告位' // 乐选-广告位
      },
      component: () => import('@/pages/my/customAdvertisingSpace')
    },
    {
      path: '/my/customNavigationBar',
      name: 'CustomNavigationBar',
      meta: {
        title: '导航栏' // 乐选-导航栏
      },
      component: () => import('@/pages/my/customNavigationBar')
    },
    {
      path: '/my/customAuxiliaryBlank',
      name: 'CustomAuxiliaryBlank',
      meta: {
        title: '辅助线空白' // 乐选-辅助空白
      },
      component: () => import('@/pages/my/customAuxiliaryBlank')
    },
    {
      path: '/my/customAuxiliaryLine',
      name: 'CustomAuxiliaryLine',
      meta: {
        title: '辅助线空白' // 乐选-辅助线
      },
      component: () => import('@/pages/my/customAuxiliaryLine')
    },
    {
      path: '/setUp',
      name: 'SetUp',
      meta: {
        title: '设置' // 乐选-授权书
      },
      component: () => import('@/pages/setUp/index')
    },
    {
      path: '/setUp/inputCode',
      name: 'SetUpInputCode',
      meta: {
        title: '设置' // 乐选-授权书
      },
      component: () => import('@/pages/setUp/inputCode')
    },
    {
      path: '/setUp/passWord',
      name: 'SetUpPassWord',
      meta: {
        title: '设置' // 乐选-授权书
      },
      component: () => import('@/pages/setUp/passWord')
    },
    {
      path: '/setUp/sendCode',
      name: 'SetUpSendCode',
      meta: {
        title: '设置' // 乐选-授权书
      },
      component: () => import('@/pages/setUp/sendCode')
    },

    {
      path: '/my/certificateAuthorizationBook',
      name: 'MyCertificateAuthorizationBook',
      meta: {
        title: '授权书' // 乐选-授权书
      },
      component: () => import('@/pages/my/certificateAuthorizationBook')
    },
    {
      path: '/act/countyStore',
      name: 'actCountyStore',
      meta: {
        title: '活动页'
      },
      component: () => import('@/pages/act/countyStore/index')
    },
    {
      path: '/act/countyStore/rule',
      name: 'countyStoreRule',
      meta: {
        title: '规则详情'
      },
      component: () => import('@/pages/act/countyStore/rule')
    },

    {
      path: '/act/countyStore/record',
      name: 'countyStoreRecord',
      meta: {
        title: '使用记录'
      },
      component: () => import('@/pages/act/countyStore/record')
    },
    {
      path: '/act/countyStore/invitationPoster',
      name: 'countyStoreInvitationPoster',
      meta: {
        title: '邀请海报'
      },
      component: () => import('@/pages/act/countyStore/invitationPoster')
    },
    {
      path: '/act/countyStore/deliveryGoodsSucceed',
      name: 'countyStoreDeliveryGoodsSucceed',
      meta: {
        title: '提货成功'
      },
      component: () => import('@/pages/act/countyStore/deliveryGoodsSucceed')
    },
    {
      path: '/pay/addBandCard',
      name: 'addBandCard',
      meta: {
        title: '绑定银行卡'
      },
      component: () => import('@/pages/pay/addBandCard')
    },
    {
      path: '/pay/verificationBankCards',
      name: 'VerificationBankCards',
      meta: {
        title: '验证银行卡信息'
      },
      component: () => import('@/pages/pay/verificationBankCards')
    },
    {
      path: '/pay/bandList',
      name: 'bandList',
      meta: {
        title: '选择银行'
      },
      component: () => import('@/pages/pay/bandList')
    },
    {
      path: '/pay/payAuthentication',
      name: 'PayAuthentication',
      meta: {
        title: '身份验证'
      },
      component: () => import('@/pages/pay/payAuthentication')
    },
    {
      path: '/pay/bindingSucceed',
      name: 'PayBindingSucceed',
      meta: {
        title: '绑定成功'
      },
      component: () => import('@/pages/pay/bindingSucceed')
    },
    {
      path: '/pay/payment',
      name: 'Payment',
      meta: {
        title: '支付成功'
      },
      component: () => import('@/pages/pay/payment')
    },
    {
      path: '/pay/inputCode',
      name: 'inputCode',
      meta: {
        title: '支付验证'
      },
      component: () => import('@/pages/pay/inputCode')
    },
    {
      path: '/recharge/price',
      name: 'rechargePrice',
      meta: {
        title: '进货'
      },
      component: () => import('@/pages/recharge/price')
    },
    {
      path: '/recharge/login',
      name: 'rechargeLogin',
      meta: {
        title: '登录'
      },
      component: () => import('@/pages/recharge/login')
    },
    {
      path: '/recharge/paySucceed',
      name: 'rechargePaySucceed',
      meta: {
        title: '支付成功'
      },
      component: () => import('@/pages/recharge/paySucceed')
    },
    {
      path: '/recharge/record',
      name: 'rechargeRecord',
      meta: {
        title: '进货记录'
      },
      component: () => import('@/pages/recharge/record')
    },
    {
      path: '/bond/price',
      name: 'bondPrice',
      meta: {
        title: '保证金'
      },
      component: () => import('@/pages/bond/price')
    }, {
      path: '/bond/login',
      name: 'bondLogin',
      meta: {
        title: '登录'
      },
      component: () => import('@/pages/bond/login')
    }, {
      path: '/bond/paySucceed',
      name: 'bondPaySucceed',
      meta: {
        title: '支付成功'
      },
      component: () => import('@/pages/bond/paySucceed')
    }, {
      path: '/bond/record',
      name: 'bondRecord',
      meta: {
        title: '进货记录'
      },
      component: () => import('@/pages/bond/record')
    }, 
    {
      path: '/integral',
      name: 'integral',
      meta: {
        title: '幸福积分'
      },
      component: () => import('@/pages/integral/index')
    },
    
  ]
}
const router = new Router(routerData)

router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g;
  const isChunkLoadFailed = error.message.match(pattern);
  const targetPath = router.history.pending.fullPath;
  if (isChunkLoadFailed) {
    router.replace(targetPath);
  }
});


export default router