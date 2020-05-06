<template>
  <div class="shoppingCart">
    <div class="headerbar">
      购物车
      <div class="editor">编辑</div>
    </div>

    <div class="list">
      <div class="items">
        <div class="item clearfix">
          <img class="leftbar fl"
               src="../../assets/img/shoppingCart/choice_01@2x2.png"
               alt="" />
          <div class="centerbar fl">
            <img class="img"
                 src="../../assets/img/shoppingCart/1.png"
                 alt="" />
          </div>
          <div class="rightbar fl">
            <div class="headerbar">
              青春泉7号睡眠面膜
            </div>
            <div class="bodybar">
              30ml;粉色
            </div>
            <div class="footerbar clearfix">
              <div class="leftbarTwo fl">¥786.00 </div>
              <div class="rightbarTwo fr">xxx</div>
            </div>
          </div>
        </div>
        <div class="line"></div>
      </div>

      <div class="items">
        <div class="item clearfix">
          <img class="leftbar fl"
               src="../../assets/img/shoppingCart/choice_01@2x2.png"
               alt="" />
          <div class="centerbar fl">
            <img class="img"
                 src="../../assets/img/shoppingCart/1.png"
                 alt="" />
          </div>
          <div class="rightbar fl">
            <div class="headerbar">
              青春泉7号睡眠面膜
            </div>
            <div class="bodybar">
              30ml;粉色
            </div>
            <div class="footerbar clearfix">
              <div class="leftbarTwo fl">¥786.00 </div>
              <div class="rightbarTwo fr">xxx</div>
            </div>
          </div>
        </div>
        <div class="line"></div>
      </div>

      <div class="items">
        <div class="item clearfix">
          <img class="leftbar fl"
               src="../../assets/img/shoppingCart/choice_01@2x2.png"
               alt="" />
          <div class="centerbar fl">
            <img class="img"
                 src="../../assets/img/shoppingCart/1.png"
                 alt="" />
          </div>
          <div class="rightbar fl">
            <div class="headerbar">
              青春泉7号睡眠面膜
            </div>
            <div class="bodybar">
              30ml;粉色
            </div>
            <div class="footerbar clearfix">
              <div class="leftbarTwo fl">¥786.00 </div>
              <div class="rightbarTwo fr">xxx</div>
            </div>
          </div>
        </div>
        <div class="line"></div>
      </div>

    </div>
  </div>
</template>

<script> 
import commonJs from '@/util/common'

export default {
  name: 'ShoppingCart',
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {},

}
</script>

<style  lang="less">
.shoppingCart {
  & > .headerbar {
    width: 375px;
    height: 44px;
    line-height: 44px;
    background: rgba(255, 255, 255, 1);
    text-align: center;

    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    & .editor {
      position: absolute;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(198, 28, 28, 1);
      line-height: 21px;
      top: 13px;
      right: 21px;
      cursor: pointer;
    }
  }
  & .list {
    margin-top: 10px;
    & .items {
      & .item {
        width: 375px;
        height: 100px;
        background: rgba(255, 255, 255, 1);
        & .leftbar {
          width: 18px;
          height: 18px;
          padding: 41px 19px 41px 20px;
        }
        & .centerbar {
          width: 70px;
          height: 70px;
          background: rgba(247, 247, 247, 1);
          margin: 15px 0;
          .img {
            width: 100%;
            height: 100%;
          }
        }
        & .rightbar {
          margin-left: 10px;
          width: 238px;
          & .headerbar {
            font-size: 15px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(51, 51, 51, 1);
            line-height: 21px;
            margin-top: 14px;
          }
          & .bodybar {
            font-size: 13px;
            font-family: PingFangSC-Regular, PingFang SC;
            font-weight: 400;
            color: rgba(153, 153, 153, 1);
            line-height: 18px;
          }
          & .footerbar {
            & .leftbarTwo {
              font-size: 16px;
              font-family: PingFangSC-Semibold, PingFang SC;
              font-weight: 600;
              color: rgba(51, 51, 51, 1);
              line-height: 22px;
              margin-top: 10px;
            }
            & .rightbarTwo {
              margin-top: 4px;
              margin-right: 14px;
            }
          }
        }
      }
      & .line {
        width: 223px;
        height: 1px;
        background: rgba(242, 242, 242, 1);
      }
    }
  }

  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .clearfix::after {
    clear: both;
    content: " ";
    visibility: hidden;
    height: 0;
  }
}
</style>
