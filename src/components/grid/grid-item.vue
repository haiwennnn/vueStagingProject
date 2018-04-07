<template>
  <div class="zz-grid"
    :style="styles">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'grid-item',
  data() {
    return {

    }
  },
  computed: {
    styles() {
      let column = this.$parent.column
      if (!column || column === 3) {
        return
      }
      let styles = {}
      styles.width = `${100 / column}%`
      return styles
    }
  },
  created() {
    if (!this.$parent.column) {
      this.$parent.countColumn()
    }
  }
}
</script>
<style lang="less" scoped>

</style>


