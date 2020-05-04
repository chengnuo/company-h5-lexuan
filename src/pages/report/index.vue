<template>
  <div class="equityContainer">
    <img v-for="img in imageList" v-lazy="img">
  </div>
</template>

<script> 
import { Lazyload } from 'vant';
import commonJs from '@/util/common'
import  Vue from 'vue';
 //    loading: 'http://h5.yinli.gdxfhl.com/static/report/loading.gif'
 // Vue.use(Lazyload, {
 //    loading: 'http://h5.yinli.gdxfhl.com/static/report/loading.gif'
 // })
export default {
  data() {
    return {
      imageList:null,
      allImgList:[[
        'http://h5.yinli.gdxfhl.com/static/report/sgs1/1.jpg',
        'http://h5.yinli.gdxfhl.com/static/report/sgs1/2.jpg',
        'http://h5.yinli.gdxfhl.com/static/report/sgs1/3.jpg',
        'http://h5.yinli.gdxfhl.com/static/report/sgs1/4.jpg',
        'http://h5.yinli.gdxfhl.com/static/report/sgs1/5.jpg',
        'http://h5.yinli.gdxfhl.com/static/report/sgs1/6.jpg',
        'http://h5.yinli.gdxfhl.com/static/report/sgs1/7.jpg',
        'http://h5.yinli.gdxfhl.com/static/report/sgs1/8.jpg',
        'http://h5.yinli.gdxfhl.com/static/report/sgs1/9.jpg',
        'http://h5.yinli.gdxfhl.com/static/report/sgs1/10.jpg',
        'http://h5.yinli.gdxfhl.com/static/report/sgs1/11.jpg',
        'http://h5.yinli.gdxfhl.com/static/report/sgs1/12.jpg',
        'http://h5.yinli.gdxfhl.com/static/report/sgs1/13.jpg',
        'http://h5.yinli.gdxfhl.com/static/report/sgs1/14.jpg',
        'http://h5.yinli.gdxfhl.com/static/report/sgs1/15.jpg'
      ],[
        'http://h5.yinli.gdxfhl.com/static/report/routine/a_01@2x.png',
        'http://h5.yinli.gdxfhl.com/static/report/routine/a_02@2x.png',
        'http://h5.yinli.gdxfhl.com/static/report/routine/a_03@2x.png',
        'http://h5.yinli.gdxfhl.com/static/report/routine/a_04@2x.png',
        'http://h5.yinli.gdxfhl.com/static/report/routine/a_05@2x.png'
      ], [
        'http://h5.yinli.gdxfhl.com/static/report/notSpecial/b_01@2x.jpg',
        'http://h5.yinli.gdxfhl.com/static/report/notSpecial/b_02@2x.jpg',
        'http://h5.yinli.gdxfhl.com/static/report/notSpecial/b_03@2x.jpg',
        'http://h5.yinli.gdxfhl.com/static/report/notSpecial/b_04@2x.jpg',
        'http://h5.yinli.gdxfhl.com/static/report/notSpecial/b_05@2x.jpg'
      ]]
    };
  },
  mounted(){
    var type = this.$route.params.type;
    this.imageList = this.allImgList[type];
    var title = '质检报告'
    if(type == 0){
      title = 'SGS检验报告'
    }else if(type == 1){
      title = '常规检验报告'
    }else if(type == 2  ){
      title = '非特检验报告'
    }
    commonJs.setDocumentTitle(title)
  },
  methods:{
    
  }
}

</script>
<style>
  .equityContainer{
    padding: 10px;
  }
  .equityContainer img{
    width: 100%;
    margin-bottom: 10px;
  }
</style>  
