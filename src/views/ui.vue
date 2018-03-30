<template>
  <div class="zz-page-body signature-page">
    <div class="zz-page-body">
      <div class="zz-tab zz-tab_inios">
        <z-header>测试标题</z-header>
        <div class="zz-tab__panel zz-tab__panel_hastabbar">
          <p>flexbox</p>
          <div class="zz-flex">
            <div class="zz-flex-item">
              <div class="demo-flex-item"
                @click="dialogStatus = true">{{dialogStatus}}</div>
            </div>
            <div class="zz-flex-item">
              <div class="demo-flex-item">2</div>
            </div>
            <div class="zz-flex-item">
              <div class="demo-flex-item">2</div>
            </div>
          </div>
          <div class="zz-flex">
            <div class="zz-flex-item">
              <div class="demo-flex-item">1</div>
            </div>
            <div class="zz-flex-item">
              <div class="demo-flex-item">2</div>
            </div>
            <div class="zz-flex-item">
              <div class="demo-flex-item">3</div>
            </div>
            <div class="zz-flex-item">
              <div class="demo-flex-item">4</div>
            </div>
          </div>
          <p>grids</p>
          <div class="zz-grids zz-grids_4">
            <div class="zz-grid">1</div>
            <div class="zz-grid">2</div>
            <div class="zz-grid">3</div>
            <div class="zz-grid">4</div>
            <div class="zz-grid">5</div>
            <div class="zz-grid">3</div>
          </div>
          <div class="zz-grids">
            <div class="zz-grid">1</div>
            <div class="zz-grid">2</div>
            <div class="zz-grid">3</div>
            <div class="zz-grid">4</div>
            <div class="zz-grid">5</div>
            <div class="zz-grid">3</div>
          </div>
          <p>divider</p>
          <div class="zz-divider">
            <span class="zz-divider__tips">
              <i class="iconfont icon-loading iconfont_rotate"></i>数据正在加载中</span>
          </div>
          <div class="zz-divider zz-divider_dot"></div>
          <!-- 基本按钮 -->
          <p>基本按钮</p>
          <input class="zz-btn"
            type="button"
            name=""
            value="zz-btn_button">
          <button class="zz-btn zz-btn_default">default_button</button>
          <button class="zz-btn zz-btn_warn">warn_button</button>
          <!-- disabled 按钮 -->
          <p>disabled按钮</p>
          <input class="zz-btn zz-btn_disabled"
            type="button"
            name=""
            value="disabled_button">
          <button class="zz-btn zz-btn_default zz-btn_disabled">disabled_default_button</button>
          <button class="zz-btn zz-btn_warn zz-btn_disabled">disabled_warn_button</button>
          <p>iconfont按钮</p>
          <button class="zz-btn zz-btn_default">
            <i class="iconfont icon-loading iconfont_rotate"></i>
            loading按钮
          </button>
          <button class="zz-btn zz-btn_warn">
            <i class="iconfont icon-loading iconfont_rotate"></i>
            warn_loading按钮
          </button>
          <button class="zz-btn zz-btn_default zz-btn_disabled">
            <i class="iconfont icon-loading iconfont_rotate"></i>
            disabled_loading按钮
          </button>
          <p>cell</p>
          <div class="zz-cells__title">cell标题</div>
          <div class="zz-cells">
            <div class="zz-cell">
              <div class="zz-cell__hd">标题文字</div>
              <div class="zz-cell__bd">
                <p>内容文字</p>
              </div>
              <div class="zz-cell__ft">说明文字
                <span class="zz-badge zz-badge_dot"></span>
              </div>
            </div>
            <div class="zz-cell zz-cell_swiped">
              <div class="zz-cell__bd"
                style="transform: translateX(-1.2rem)">
                <div class="zz-cell">
                  <div class="zz-cell__hd">标题文字</div>
                  <div class="zz-cell__bd">
                    <p>内容文字</p>
                  </div>
                  <div class="zz-cell__ft">说明文字</div>
                </div>
              </div>
              <div class="zz-cell__ft">
                <div class="zz-swiped-btn zz-swiped-btn_default">删除</div>
                <div class="zz-swiped-btn zz-swiped-btn_warn">删除</div>
              </div>
            </div>
            <div class="zz-cell zz-cell_access">
              <div class="zz-cell__hd">标题文字</div>
              <div class="zz-cell__bd">
                <p>内容文字</p>
              </div>
              <div class="zz-cell__ft">说明文字
                <span class="zz-badge zz-badge_dot"></span>
              </div>
            </div>
            <div class="zz-cell">
              <div class="zz-cell__hd">
                <img src="../assets/demo/icon_tabbar.png"
                  style="display: block;width: .6rem;">
              </div>
              <div class="zz-cell__bd">
                <p>内容文字内容文字内容文字内容文字内容文字内容文字</p>
              </div>
              <div class="zz-cell__ft">footer</div>
            </div>
            <div class="zz-cell zz-cell_access">
              <div class="zz-cell__hd">
                <img src="../assets/demo/icon_tabbar.png"
                  style="display: block;width: .8rem;">
              </div>
              <div class="zz-cell__bd">
                <p>内容文字内容文字内容文字内容文字内容文字内容文字</p>
              </div>
              <div class="zz-cell__ft">footer</div>
            </div>
            <div class="zz-cell">
              <div class="zz-cell__hd">
                <img src="../assets/demo/icon_tabbar.png"
                  style="display: block;width: .8rem;">
              </div>
              <div class="zz-cell__bd">
                <p>内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字内容文字文字</p>
              </div>
              <div class="zz-cell__ft">footer</div>
            </div>
          </div>
        </div>
        <div class="zz-tabbar">
          <div class="zz-tabbar__item zz-tabbar__item_active">
            <div>
              <img src="../assets/demo/icon_tabbar.png"
                alt="">
              <span class="zz-badge">1</span>
            </div>
            <p>首页</p>
          </div>
          <div class="zz-tabbar__item">
            <div>
              <img src="../assets/demo/icon_tabbar.png"
                alt="">
              <span class="zz-badge">99+</span>
            </div>
            <p>首页</p>
          </div>
          <div class="zz-tabbar__item">
            <div>
              <img src="../assets/demo/icon_tabbar.png"
                alt="">
              <span class="zz-badge">88</span>
            </div>
            <p>首页</p>
          </div>
          <div class="zz-tabbar__item">
            <div>
              <img src="../assets/demo/icon_tabbar.png"
                alt="">
              <span class="zz-badge zz-badge_dot"></span>
            </div>
            <p>首页</p>
          </div>
        </div>
      </div>
      <z-dialog v-model="dialogStatus">
        <div class="zz-dialog__hd">
          <div class="zz-dialog-title">dialog标题</div>
        </div>
        <div class="zz-dialog__bd">
          dialog body
        </div>
        <div class="zz-dialog__ft">
          <div class="zz-dialog-btn"
            @click="dialogStatus = false">
            dialogBtn
          </div>
        </div>
      </z-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        dialogStatus: false
      }
    },
    methods: {
    },
    created() {
      // this.$zzz.toast.show({
      //   text: '正在校验签名',
      //   type: 'loading',
      //   position: 'middle',
      //   time: 0,
      //   isShowMask: true
      // })
      // this.$zzz.toast.show({
      //   text: '签名成功',
      //   type: 'done',
      //   position: 'middle',
      //   time: 0,
      //   isShowMask: true
      // })

    },
    mounted() {
      this.$nextTick(() => {
        console.log(this.$el)
      })
    }
  }
</script>
<style lang="less" scoped>
  .zz-grid {
    height: 0.8rem;
    line-height: 0.8rem;
    text-align: center;
  }
  .zz-tab__panel {
    & > p {
      line-height: 0.6rem;
      padding: 0.3rem 0 0.1rem 0.3rem;
      font-size: 0.22rem;
    }
  }

  .zz-flex {
    width: 7rem;
    height: 0.8rem;
    margin: 0.15rem auto 0;
  }
  .demo-flex-item {
    margin: 0.1rem;
    padding: 0.05rem 0.2rem;
    background-color: coral;
    text-align: center;
    border-radius: 10px;
  }
</style>
