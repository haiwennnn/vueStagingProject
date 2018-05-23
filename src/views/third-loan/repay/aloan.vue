<template>
  <div class="zz-page-body repay-index-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header>本期明细</z-header>
        <div class="zz-tab__panel white">
          <div class="panel">
              <ul>
                  <li><b>产品名称</b><span>云保贷</span></li>
                  <li><b>合同金额</b><span>￥20000.00</span></li>
                  <li><b>到手金额</b><span>￥20000.00</span></li>
                  <li><b>月利率</b><span>￥20000.00</span></li>
                  <li><b>每月还款金额</b><span>￥20000.00</span></li>
                  <li><b>起止时间</b><span>￥20000.00</span></li>
                  <li><b>首次还款时间</b><span>￥20000.00</span></li>
                  <li><b>借款人姓名</b><span>￥20000.00</span></li>
                  <li><b>借款人身份证</b><span>￥20000.00</span></li>
                  <li><b>还款日</b><span>￥20000.00</span></li>
                  <li><b>还款计划</b><span class="click" @click="popup=true">查看</span></li>
                  <li><b>借款期限</b><span>￥20000.00</span></li>
                  <li><b>收款账户</b><span>￥20000.00</span></li>
                  <li><b>还款账户</b><span>￥20000.00</span></li>
                  <li><b>借款合同</b><span class="click" @click="popup=true">查看</span></li>
              </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="popup" v-if="popup">
        <transition name="fj-mask">
        <div class="popup-mask"></div>
        </transition>
        <transition name="fj-dialog">
        <div class="popup-content">
            <dl class="popup-con">
                <dt>还款计划</dt>
                <dd>
                    <p><em>2017年04月21日 </em><span >¥ 4864.00</span></p>
                    <p><em>2017年04月21日 </em><span >¥ 4864.00</span></p>
                    <p><em>2017年04月21日 </em><span >¥ 4864.00</span></p>
                    <p><em>2017年04月21日 </em><span >¥ 4864.00</span></p>
                    <p><em>2017年04月21日 </em><span >¥ 4864.00</span></p>
                    <p><em>2017年04月21日 </em><span >¥ 4864.00</span></p>
                    <p><em>2017年04月21日 </em><span >¥ 4864.00</span></p>
                    <p><em>2017年04月21日 </em><span >¥ 4864.00</span></p>
                    <p><em>2017年04月21日 </em><span >¥ 4864.00</span></p>
                    <p><em>2017年04月21日 </em><span >¥ 4864.00</span></p>
                    <p><em>2017年04月21日 </em><span >¥ 4864.00</span></p>
                    <p><em>2017年04月21日 </em><span class="s">¥ 4864.00</span></p>
                    <p><em>2017年04月21日 </em><span class="s">¥ 4864.00</span></p>
                    <p><em>2017年04月21日 </em><span class="s">¥ 4864.00</span></p>
                    <p><em>2017年04月21日 </em><span class="s">¥ 4864.00</span></p>
                </dd>
            </dl>
            <div class="popup-close"><i class="ionicons ion-ios-close-outline" @click="popup=false"></i></div>
        </div>
        </transition>
    </div>
  </div>
</template>
<script>
/**
 * 提前结清
 */
export default {
  data () {
    return {
      popup: false
    }
  },
  components: {

  }
}
</script>
<style lang="less" scoped>
.panel {
  padding: .3rem;
  background: #fff;
  margin: 0.3rem;
  border-radius:0.08rem;

  ul{
      list-style: none;
      li{
          list-style: none;
          margin-bottom: .20rem;
          color: #999;
          b{
              display: inline-block;
              width:40%;
              font-weight: 100;
              color: #000;
          }
          .click{
              color:#E06B57;
              &:active{
                  opacity: .5;
              }
          }
      }
  }
}
.popup{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 100;

    .popup-mask{
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,.5) 
    }
    .popup-content{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
    }
    .popup-con{
        background: #FFFFFF;
        border-radius: .16rem; 
        width: 5.1rem;
        dt{
            font-size: .32rem;
            padding: .40rem 0;
            text-align: center;
            font-weight: 200;
            box-shadow: inset 0 -0.01rem 0 0 #CCCCCC;
        }
        dd{
            height: 7.0rem;
            overflow: auto;

            p{
                padding: .2rem .3rem;
                font-size: .24rem;
                color: #CCC;
                em{
                    font-style: normal;
                    display: inline-block;
                    width: 2.30rem;
                }
                span.s{
                    color: #222;
                }
            }
        }
    }
    .popup-close{
        font-size: .80rem;
        color: #FFF;
        text-align: center
    }

    .fj-dialog-enter-active, .fj-dialog-leave-active {
        opacity: 1;
        transition-duration: 400ms;
        transform: translate(-50%, -50%) scale(1)!important;
        transition-property: transform, opacity!important;
    }
    .fj-dialog-leave-active {
        transition-duration: 300ms;
    }
    .fj-dialog-enter {
        opacity: 0;
        transform: translate(-50%, -50%) scale(1.185)!important;
    }
    .fj-dialog-leave-active {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.85)!important;
    }

    .fj-mask-enter, .fj-mask-leave-active {
        opacity: 0;
    }
    .fj-mask-leave-active, .fj-mask-enter-active {
        transition: opacity 300ms;
    }
}
</style>