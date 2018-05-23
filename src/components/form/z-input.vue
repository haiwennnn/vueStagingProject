<template>
  <input type="text"
    :placeholder="placeholder"
    class="zz-input">
</template>

<script>
  export default {
    name: 'z-input',
    props: {
      value: String,
      placeholder: String
    },
    data() {
      return {}
    }
  }
</script>

<style lang="less">
</style>


