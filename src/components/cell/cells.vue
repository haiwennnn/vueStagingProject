<template>
  <div class="zz-cells"
    :class="className">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'Cells',
    props: {
      noTopLine: Boolean
    },
    computed: {
      className() {
        return {
          'no-top-line': this.noTopLine
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .zz-cells.no-top-line {
    &:before {
      display: none;
    }
  }
</style>


