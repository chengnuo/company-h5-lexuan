import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueAwesomeSwiper from 'vue-awesome-swiper'

import Vant from 'vant';
import 'vant/lib/index.css';
import inject from './plugins/inject'
import MintUI from 'mint-ui' // mint-ui
import 'mint-ui/lib/style.css' // mint-ui


// require styles
import 'swiper/dist/css/swiper.css'

import clipboard from 'clipboard';
//注册到vue原型上
Vue.prototype.clipboard = clipboard;

Vue.use(VueAwesomeSwiper)

Vue.use(Vant);
Vue.use(inject);
Vue.use(MintUI)



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
