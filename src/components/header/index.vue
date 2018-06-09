<template>
  <div class="zz-nav">
    <div class="zz-nav__panel">
      <!-- 导航左侧区域 -->
      <div class="zz-nav__left">
        <!-- 存在两种形式按钮 文本和icon 最多两个 -->
        <!-- <span class="zz-nav__iconbtn iconfont icon-back"></span> -->
        <span v-if="hasBack !== false"
          class="zz-nav__iconbtn ionicons ion-ios-arrow-back"
          @click="onHeaderBackEvent"></span>
        <!-- <span class="zz-nav__textbtn">按钮</span> -->
      </div>
      <div class="zz-nav__title">
        <span>
          <slot></slot>
        </span>
      </div>
      <!-- 导航右侧区域 -->
      <div class="zz-nav__right">
        <!-- <span class="zz-nav__textbtn">按钮</span> -->
        <!-- <span class="zz-nav__iconbtn iconfont icon-add"></span> -->
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<script>
  /**
   * @method {Event} on-header-back-event  外部返回事件入参
   */
  export default {
    name: 'z-header',
    props: {
      hasBack: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
      }
    },
    methods: {
      onHeaderBackEvent() {
        let listeners = this.$listeners
        // 判断头部后退事件是否注入，若注入则拦截将事件交给父级
        if (listeners['on-header-back-event']) {
          this.$emit('on-header-back-event')
        } else {
          this.$router.back()
        }
      }
    },
    created() {
    }
  }
</script>
<style lang="less" scoped>
</style>
