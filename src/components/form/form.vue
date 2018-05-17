<template>
  <div class="zz-form">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'z-form',
    props: {
      labelWidth: {
        type: Number
      },
      labelPosition: {
        type: String,
        default: 'left'
      }
    },
    data() {
      return {
      }
    }
  }
</script>

<style lang="less" scoped>
</style>

