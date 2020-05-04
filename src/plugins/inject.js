// import Vconsole from 'vconsole'
import router from '../router'

// const vConsole = new Vconsole()

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // const userData = JSON.parse(sessionStorage.getItem('userData'))

  // if (userData) {
  //   if (to.meta.title) {
  //     document.title = to.meta.title
  //   }
  //   next()
  // } else {
  //   if (to.path === '/login') {
  //     next()
  //   } else {
  //     next('/login')
  //   }
  // }
  next()
})

export default {
  install(Vue) {
    // Vue.prototype.$api = api
    // Vue.prototype.$get = get
    // Vue.prototype.$put = put
    // Vue.prototype.$post = post
    // Vue.prototype.$postFormData = postFormData

    // Vue.use(vConsole)
  }
}
