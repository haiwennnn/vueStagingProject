<template>
  <div class="zz-flex-item"
    :style="styles">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'flexbox-item',
  data() {
    return {

    }
  },
  computed: {
    styles() {
      let styles = {}
      return styles
    }
  },
  created() {
  }
}
</script>
<style lang="less" scoped>

</style>
