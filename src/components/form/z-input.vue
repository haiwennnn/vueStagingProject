<template>
  <input :type="type || 'text'"
    v-model="currentValue"
    :placeholder="placeholder"
    class="zz-input">
</template>

<script>
  export default {
    name: 'z-input',
    props: {
      value: [String, Number],
      type: String,
      placeholder: String
    },
    watch: {
      currentValue(newVal) {
        this.$emit('input', newVal)
        this.$emit('on-change', newVal)
      }
    },
    data() {
      return {
        currentValue: ''
      }
    },
    created() {
      console.log(this.value)
      this.currentValue = this.value || ''
    }
  }
</script>

<style lang="less">
</style>


