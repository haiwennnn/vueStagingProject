<template>
  <input :type="type || 'text'"
    v-model="currentValue"
    :placeholder="placeholder"
    :style="inputStyle"
    class="zz-input">
</template>

<script>
  export default {
    name: 'z-input',
    props: {
      value: [String, Number],
      type: String,
      placeholder: String,
      valueTextAlign: {
        type: String,
        default: 'right'
      }
    },
    computed: {
      inputStyle() {
        return {
          'textAlign': this.valueTextAlign
        }
      }
    },
    watch: {
      value(newVal) {
        if (newVal !== this.currentValue) {
          this.currentValue = newVal || ''
        }
      },
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
      this.currentValue = this.value || ''
    }
  }
</script>

<style lang="less">
</style>


