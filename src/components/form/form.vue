<template>
  <div class="zz-cells">
    <slot></slot>
  </div>
</template>

<script>
  import Schema from 'async-validator'
  export default {
    name: 'z-form',
    props: {
      value: [Array, Object],
      labelWidth: {
        type: Number
      },
      rules: Object,
      labelPosition: {
        type: String,
        default: 'left'
      }
    },
    data() {
      return {
      }
    },
    watch: {
      value(newVal) {
        console.log(this.newVal)
        var validator = new Schema(this.rules)
        validator.validate(newVal, (errors, fields) => {
          console.log(fields)
          console.log(errors)
          if (errors) {
            // validation failed, errors is an array of all errors
            // fields is an object keyed by field name with an array of
            // errors per field
            // return handleErrors(errors, fields);
          }
          // validation passed
        })
      }
    },
    methods: {
      validate(cb) {
        let status = true
        // let keys = Object.keys(this.value)
        // console.log(keys)
        if (!this.rules) {
          cb && cb(status)
        } else {
          var validator = new Schema(this.rules)
          validator.validate(this.value, (errors, fields) => {
            console.log(fields)
            console.log(errors)
            if (errors) {
              status = false
              cb && cb(status)
            } else {
              cb && cb(status)
            }
          })
        }
      }
    },
    created() {
      console.log(this.value)
    }
  }
</script>

<style lang="less" scoped>
</style>

