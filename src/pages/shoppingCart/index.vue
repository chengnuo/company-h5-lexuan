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
              <div class="rightbarTwo fr">
                <div class="purchaseQuantity">
                  <van-cell center
                            class="addCartNumsLayout">
                    <van-stepper v-model="purchaseQuantity"
                                 class="addCartNums"
                                 :disable-input='true'
                                 @change="changePurchaseQuantity" />
                  </van-cell>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="line fr"></div>
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
              <div class="rightbarTwo fr">
                <div class="purchaseQuantity">
                  <van-cell center
                            class="addCartNumsLayout">
                    <van-stepper v-model="purchaseQuantity"
                                 class="addCartNums"
                                 :disable-input='true'
                                 @change="changePurchaseQuantity" />
                  </van-cell>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="line fr"></div>
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
              <div class="rightbarTwo fr">
                <div class="purchaseQuantity">
                  <van-cell center
                            class="addCartNumsLayout">
                    <van-stepper v-model="purchaseQuantity"
                                 class="addCartNums"
                                 :disable-input='true'
                                 @change="changePurchaseQuantity" />
                  </van-cell>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="line fr"></div>
      </div>

    </div>

    <div class="buy clearfix">
      <div class="leftbar fl">
        <img class="img fl clearfix"
             src="../../assets/img/shoppingCart/choice_01@2x2.png"
             alt="" />
        <span class="fl checkboxAll">全选</span>
      </div>
      <div class="centerbar fl">
        ¥6,014.00
      </div>
      <div class="rightbar fr">
        结算
      </div>
    </div>

    <bottomBanner :index="3" />
  </div>
</template>

<script> 
import commonJs from '@/util/common'
import bottomBanner from '@/components/bottomBanner';

export default {
  name: 'ShoppingCart',
  components: {
    bottomBanner,
  },
  data() {
    return {
      purchaseQuantity: 0,
    }
  },
  mounted() {

  },
  methods: {
    changePurchaseQuantity() { },
  },

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
              /deep/ .van-cell{
                padding: 0;
              }
              .addCartNumsLayout {
                .addCartNums {
                  border-radius: 5px;
                  border: 1px solid rgba(204, 204, 204, 1);
                  float: right;
                  /deep/ .van-stepper__minus {
                    background: #fff;
                    color: rgba(51, 51, 51, 1);
                    width: 23px;
                    background: url(../../assets/img/goods/-_01@2x.png) center
                      12px no-repeat;
                    background-size: 10px 2px;
                  }
                  /deep/ .van-stepper__input {
                    background: #fff;
                    color: rgba(51, 51, 51, 1);
                    font-weight: 700;
                    margin: 0;
                    width: 23px;
                  }
                  /deep/ .van-stepper__plus {
                    background: #fff;
                    color: rgba(51, 51, 51, 1);
                    width: 23px;
                    background: url(../../assets/img/goods/+_01@2x.png) center
                      8px no-repeat;
                    background-size: 10px 10px;
                  }
                  /deep/ .van-stepper__minus--disabled {
                    color: #cccccc;
                    background: url(../../assets/img/goods/-_01@2x1.png) center
                      12px no-repeat;
                    background-size: 10px 2px;
                  }
                  /deep/ .van-stepper__plus--disabled {
                    color: #cccccc;
                    background: url(../../assets/img/goods/+_02@2x.png) center
                      8px no-repeat;
                    background-size: 10px 10px;
                  }
                  /deep/ .van-stepper__minus:before {
                    background: none;
                    position: relative;
                  }
                  /deep/ .van-stepper__minus:after {
                    background: none;
                    position: relative;
                  }
                  /deep/ .van-stepper__plus:before {
                    background: none;
                    position: relative;
                  }
                  /deep/ .van-stepper__plus:after {
                    background: none;
                    position: relative;
                  }
                  
                }
              }
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

  & .buy {
    width: 375px;
    height: 50px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px -1px 5px 0px rgba(0, 0, 0, 0.05);
    position: absolute;
    bottom: 58px;
    & .leftbar {
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      line-height: 17px;
      margin-left: 20px;
      margin-top: 16px;
      & .img {
        width: 18px;
        height: 18px;
      }
      & .checkboxAll {
        margin-left: 10px;
      }
    }
    & .centerbar {
      margin-left: 90px;
      margin-top: 14px;
    }
    & .rightbar {
      width: 120px;
      height: 50px;
      background: linear-gradient(
        45deg,
        rgba(237, 73, 73, 1) 0%,
        rgba(198, 28, 28, 1) 100%
      );
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 50px;
      text-align: center;
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
