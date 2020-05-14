<!-- 意见反馈-反馈问题 -->
<template>
  <div class="feedbackQuestions">
    <!-- <div class="bg"></div> -->
    <div class="feedbackQuestionsTitle">
      问题和意见
    </div>
    <!-- label="留言" -->
    <!-- maxlength="50" -->
    <div class="questionsAndCommentsInput">
      <van-field v-model="message"
                 rows="7"
                 autosize
                 type="textarea"
                 placeholder="请描述遇到的问题，上传页面截图更快解决哦~"
                 show-word-limit />
    </div>

    <div class="feedbackQuestionsTitle">
      问题截图
    </div>
    <!-- 截图 -->
    <div class="screenshot clearfix">
      <div class="item">
        <img class="img"
             src="../../assets/img/home/banner.jpg" />
      </div>
      <div class="item">
        <img class="img"
             src="../../assets/img/home/banner.jpg" />
      </div>
      <div class="item">
        <img class="img"
             src="../../assets/img/home/banner.jpg" />
      </div>
      <div class="item">
        <img class="img"
             src="../../assets/img/home/banner.jpg" />
      </div>
      <div class="item">
        <img class="img"
             src="../../assets/img/home/banner.jpg" />
      </div>
      <div class="item">
        <img class="img"
             src="../../assets/img/home/banner.jpg" />
      </div>
      <div class="item">
        <img class="img"
             src="../../assets/img/home/banner.jpg" />
      </div>
    </div>

    <!-- 提交 -->
    <div class="commitBtn">
      提 交
    </div>
  </div>
</template>
<script >
import { Toast } from 'vant';

import commonJs from '@/util/common'
import { apiShopMobileMsgNotifyList } from '@/api/my'


export default {
  name: 'FeedbackQuestions',
  data() {
    return {
      message: '',
    }
  },
  mounted() {


  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.feedbackQuestions {
  .bg {
    width: 100%;
    height: 100%;
    background: #fff;
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }
  & .feedbackQuestionsTitle {
    padding: 16px 19px 10px 19px;
  }
  & .questionsAndCommentsInput {
    width: 375px;
    height: 180px;
    background: rgba(255, 255, 255, 1);
    overflow: hidden;
  }
  & .screenshot {
    width: 335px;
    min-height: 60px;
    background: rgba(255, 255, 255, 1);
    padding: 15px 20px 0px 20px;
    & .item {
      float: left;
      margin-right: 15px;
      margin-bottom: 15px;
      & .img {
        width: 60px;
        height: 60px;
        & img {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .commitBtn {
    width: 335px;
    height: 44px;
    line-height: 44px;
    background: linear-gradient(
      45deg,
      rgba(230, 0, 23, 1) 0%,
      rgba(204, 0, 20, 1) 100%
    );
    border-radius: 22px;
    margin: 0 auto;
    text-align: center;
    margin-top: 30px;


    font-size:16px;
    font-family:PingFangSC-Semibold,PingFang SC;
    font-weight:600;
    color:rgba(255,255,255,1);
  }
}
</style>