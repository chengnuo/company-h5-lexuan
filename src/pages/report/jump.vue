<template>
  <div class="reportJumpContainer">
    <ul> 
      <li>
        <div class="title">
          <span>前言</span>
          <i></i>
        </div>
        <p class="content">
          幸福狐狸植物精油是经过国家正规合法备案的产品，通过国际SGS三项检验和国家标准部门严格检测，结果均显示合格。
        </p>
      </li>
      <li>
         <div class="title">
          <span>国家备案</span>
          <i></i>
        </div>
        <p class="content">
          由国家药品监督管理局主办的国产非特殊用途化妆品备案信息服务平台上，可以查到产品的生产企业及地址、实际生产企业及地址、产品主要成分、产品包装等信息。
        </p>
        <p class="content" style="margin-top: 10px;">
         幸福狐狸植物精油都有相应备案信息，说明我们企业资质、质检、标签标识等均合格。
        </p>
        <img src="../../assets/img/report/pic_00@2x.png" class="contentImg">
      </li>
      <li>
        <div class="title">
          <span>SGS检验报告</span>
          <i></i>
        </div>
        <p class="content">
          SGS，瑞士通用公证行，成立于1878年，在中国叫通标标准技术服务有限公司，SGS作为一个公正严谨的第三方，已经在全球累积了广泛的公信力，众多国际采购组织甚至政府海关要求商家（入口商、出口商）提供SGS报告。幸福狐狸植物精油已通过SGS三大项目检测，质量合格可使用。
        </p>
        <div @click="jump(0)">
          <img src="../../assets/img/report/pic_01@2x.png" class="contentImg">
        </div>
      </li>
      <li>
        <div class="title">
          <span>常规检验报告</span>
          <i></i>
        </div>
        <p class="content">
          幸福狐狸植物精油，按照国家标准严格把控质量生产，在国家质量监督检测中心检测中，常规17项全合格。色泽、气味、外观、相对密度、耐热、耐寒、酸值、过氧化值、菌落总数、霉菌和酵母菌总数、耐热大肠菌数、金黄色葡萄球菌、铜绿假单胞菌、铅、汞、砷、镉等17个指标全部达标。
        </p>
        <div @click="jump(1)">
          <img src="../../assets/img/report/pic_02@2x.png" class="contentImg">
        </div>
      </li> 
      <li>
        <div class="title">
          <span>非特检验报告</span>
          <i></i>
        </div>
        <p class="content">
          幸福狐狸植物精油还在广东省国产非特化妆品备案检验机构进行了微生物检验项目和卫生化学检验项目，结果均合格。
        </p>
        <p class="content" style="margin-top: 10px;">
         微生物检验项目包括：菌落总数、霉菌和酵母菌总数耐热大肠菌数、金黄色葡萄球菌等，结果均未检出微生物。
        </p>
        <p class="content" style="margin-top: 10px;">
         卫生化学检验项目包括铅、砷、汞、镉，含量均远低于最低限值。
        </p>
        <div @click="jump(2)">
          <img src="../../assets/img/report/pic_03@2x.png" class="contentImg">
        </div>
      </li>
    </ul>
  </div>
</template>

<script> 
import { Lazyload } from 'vant';
import aliyunPlayer from '@/components/aliyunPlayer'
import commonJs from '@/util/common'
import  Vue from 'vue';
 Vue.use(Lazyload, {
    loading: 'http://h5.mingpinmao.cn/static/loading.gif'
 })
export default {
  name:'introduce',
  data() {
    return {
     
    };
  },
  mounted(){  
    commonJs.setDocumentTitle('质检报告');
  },
  methods:{
    jump(type){
      commonJs.openNewWebView('http://h5.yinli.gdxfhl.com/report/' + type);
    }
  },
  components: {
    aliyunPlayer
  }
}

</script>
<style lang="less">
  .reportJumpContainer{
    background:#fff;
    .header{
      width:140px;
      height:88px;
      margin:0 auto;
      padding: 50px 0;
    }
    ul{
      padding: 0 15px;
      padding-bottom: 40px;
      li{
        padding-top:50px;
        .title{
          position:relative;
          margin-bottom: 10px;
          padding-left:10px;
          span{
            height:30px;
            font-size:22px;
            font-weight:500;
            color:rgba(153,153,153,1);
            line-height:30px
          }
          i{
            width: 2px;
            height:24px;
            position: absolute;
            left:0;
            top:3px;
            background: rgba(204,204,204,1);
          }
        }
        .contentImg{ 
          width:345px;
          margin-top: 10px;
          display: block;
        }
        .content{
          font-size:12px;
          font-weight:400;
          color:rgba(102,102,102,1);
          line-height:20px;
        }
      }
    }
  } 
</style>  
