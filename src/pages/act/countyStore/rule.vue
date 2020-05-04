<template>
  <div class="ruleContainer">
    <div v-for="(img, index) in imageList" :key="img" :class="`imgLayout${index+1}`">
      <img :loading="imgXfylGif"  v-lazy="img">
    </div>
    <goBack/>
  </div>
</template>

<script> 
import { Lazyload } from 'vant';
import commonJs from '@/util/common'
import goBack from '@/components/goBack';
import  Vue from 'vue';
 //    loading: 'http://test-h5.yinli.gdxfhl.com/static/report/loading.gif'
 Vue.use(Lazyload, {
    loading: 'http://test-h5.yinli.gdxfhl.com/static/xfyl.gif',
 })
import imgXfylGif from '../../../assets/xfyl.gif'

export default {
  name:'countyStoreRule',
  data() {
    return {
      imageList: null,
      imgXfylGif
    };
  },
  components:{
    goBack
  },
  mounted(){ 
    this.imageList = [
      commonJs.config.prefixH5Url + '/static/countystoreimg/bg_01@2x.jpg',
      commonJs.config.prefixH5Url + '/static/countystoreimg/bg_02@2x.jpg',
      commonJs.config.prefixH5Url + '/static/countystoreimg/bg_03@2x.jpg',
    ]

    commonJs.outSideShare();
    commonJs.setDocumentTitle('规则详情')
  },
  methods:{
    
  }
}

</script>
<style scoped lang="less"> 
  .ruleContainer {
    img{
      width: 100%; 
    }
    .imgLayout1{
      width: 100%; 
      text-align: center;
    }
    .imgLayout2{
      width: 100%; 
      text-align: center;
    }
    .imgLayout3{
      width: 100%; 
      text-align: center;
    }
    img[lazy="loading"]{
      width: 80px;
      height: 80px;
      display: inline-block;
      margin-top: 100px;
      margin-bottom: 300px;
    }
  }
</style>  
