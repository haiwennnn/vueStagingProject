<template>
  <div class="zz-flex"
    :style="flexStyle"
    :class="flexClassName">
    <slot></slot>
  </div>
</template>
<script>
/**
 * flex容器
 * 组件默认值
 * flex-direction:row (默认值)
 * flex-wrao:nowrap (默认值)
 * align-content:center (未设置)
 * align-items:center (子元素侧轴排列方式)
 * justify-content:flex-start (默认值)
 */
export default {
  name: 'flexbox',
  props: {
    gutter: {
      type: Number,
      default: 15
    },
    dir: String,
    wrap: String,
    align: String,
    justify: String
  },
  data() {
    return {

    }
  },
  computed: {
    flexStyle() {
      return {
        'flex-direction': this.dir,
        '-webkit-flex-direction': this.dir,
        'flex-wrap': this.wrap,
        '-webkit-flex-wrap': this.wrap,
        'align-items': this.align,
        '-webkit-align-items': this.align,
        'justify-content': this.justify,
        '-webkit-justify-content': this.justify
      }
    },
    flexClassName() {

    }
  },
  methods: {

  }
}
</script>
<style lang="less" scoped>
.zz-flex {
  display: flex;
  align-content: center;
  align-items: center;
  .zz-flex-item{
    &:first-child{
      margin: 0 !important;
    }
  }
}
</style>


