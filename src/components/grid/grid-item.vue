<template>
  <div class="zz-grid"
    ref="gridItem"
    :class="gridItemClassName"
    :style="gridItemStyles"
    @click="onClick">
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
    gridItemStyles() {
      let column = this.$parent.column
      let styles = {}
      styles.width = `${100 / column}%`
      return styles
    },
    gridItemClassName() {
    }
  },
  methods: {
    onClick() {
      this.$emit('on-item-click')
    }
  },
  created() {
    if (!this.$parent.column) {
      this.$parent.calColumn()
    }
  }
}
</script>
<style lang="less" scoped>

</style>


