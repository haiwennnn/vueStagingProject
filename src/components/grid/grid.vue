<template>
  <div class="zz-grids">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'grid',
  props: {
    cols: Number
  },
  data() {
    return {

    }
  },
  computed: {
    column() {
      return this.cols || this.$children.length
    }
  },
  methods: {
    calColumn() {
      this.childrenSize = this.$children.length
    }
  },
  created() {
  }
}
</script>
<style lang="less" scoped>
</style>


