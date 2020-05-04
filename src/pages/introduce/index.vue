<template>
  <div class="introduceContainer">
    <img src="../../assets/img/introduce/logo.png" alt="" class="header">
    <ul>
      <li>
        <div class="title">
          <span>COMPANY PROFILE</span>
          <em>公司介绍</em>
          <i></i>
        </div>             
        <aliyunPlayer sourceUrl="https://static-mpmall.mingpinmao.cn/videos/20191115/HappyFoxDevelopEvents.mp4"
          coverUrl="http://www.xingfuhuli.com/video/about/HappyFoxDevelopEvents.jpg" :playerSize="[1,0.52]"></aliyunPlayer>
          
        <p class="content" style="margin-top:20px;">
          幸福狐狸是一家集研发设计、市场营销等现代企业管理架构为一身的全品类综合型公司。作为行业的翘楚，公司_直致力于推动大健康产业的发展，不仅成功打造了幸福狐狸、 XFHL、0.18、乐尚丽、浪漫电波、蜜月温度、轻瘦 APP、秘女郎、国仁堂等多个自主品牌，更把铸造百年民族企业和品牌作为终生使命，为全球消费者持续创造更多更优质的产品服务与更美好的幸福生活。
        </p>
      </li>
      <li>
        <div class="title">
          <span>NEWS INFORMATION</span>
          <em>新闻资讯</em>
          <i></i>
        </div>
        <img src="../../assets/img/introduce/two.png" class="contentImg">
        <p class="content" style="margin-bottom:20px;">
          2016年12月1日，由联合国开发计划署、新华社《瞭望东方周刊》联合主办的“2016中国幸福城市可持续发展国际论坛”在京举行。幸福集团作为特别受邀的合作伙伴，在此次万众瞩目的盛会中，与联合国开发计划署及获得提名的中国幸福城市市长代表团共同探讨“幸福”这个议题。
        </p>
        <p class="content">
          2016年10月22日，在北京鸟巢旁的国家体育场，幸福集团倾情助力中国外交部举办的第八届 大爱无国界 国际义卖活动。幸福集团一直致力于将开展慈善活动作为企业文化的一部分，并长期坚持下去，为弘扬慈善文化尽绵薄之力。同时，幸福狐狸还希望能通过慈善活动影响更多的企业和个人参与到社会公益活动中，履行社会责任感，传播互助互爱的传统美德。
        </p>
      </li><li>
        <div class="title">
          <span>COMPANY PROFILE</span>
          <em>公司介绍</em>
          <i></i>
        </div>
        <img src="../../assets/img/introduce/three.png" class="contentImg">
        <p class="content">幸福狐狸心怀大爱，致力于打造大健康市场新生态，将健康的生活理念传至千万个家庭！为了实现这一梦想，幸福狐狸在深入研究大健康领域的同时，与行业领先企业北京同仁堂兴安保健科技有限责任公司保健食品分公司、富迪健康科技、东莞思朗食品等，以及与外交部达成了战略合作关系，强强联合，光环叠加，在食品、 药品、内衣、护肤品、化妆品、私护等健康领域进行了深入的研究，生产出了令无数家庭受益的高科技健康产品，将健康大爱更好的传递下去！
        </p>
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

    commonJs.setDocumentTitle('公司介绍');
  },
  methods:{
    
  },
  components: {
    aliyunPlayer
  }
}

</script>
<style lang="less">
  .introduceContainer{
    background:#fff;
    .header{
      width:140px;
      height:88px;
      margin:0 auto;
      padding: 50px 0;
    }
    ul{
      padding: 0 15px;
      li{
        padding-bottom:50px;
        .title{
          position:relative;
          margin-bottom: 20px;
          span{
            height:25px;
            font-size:18px;
            font-weight:500;
            color:rgba(204,204,204,1);
            line-height:25px;
            display: block;
            margin-left:10px;
          }
          em{
            font-size:22px;
            font-weight:500;
            color:rgba(153,153,153,1);
            line-height:30px;
            display: block;
            margin-left: 10px;
          }
          i{
            width: 2px;
            height:46px;
            position: absolute;
            left:0;
            top:5px;
            background: rgba(204,204,204,1);
          }
        }
        .contentImg{ 
          width:345px;
          margin-bottom: 20px;

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
