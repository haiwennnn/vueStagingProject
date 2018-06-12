<template>
  <cells :no-top-line="noTopLine">
    <slot></slot>
  </cells>
  <!-- <div class="zz-cells">
    <slot></slot>
  </div> -->

</template>

<script>
  import Schema from 'async-validator'
  export default {
    name: 'z-form',
    props: {
      value: [Array, Object],
      noTopLine: Boolean,
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
        // var validator = new Schema(this.rules)
        // validator.validate(newVal, (errors, fields) => {
        //   if (errors) {
        //     // validation failed, errors is an array of all errors
        //     // fields is an object keyed by field name with an array of
        //     // errors per field
        //     // return handleErrors(errors, fields);
        //   }
        //   // validation passed
        // })
      }
    },
    methods: {
      validate(cb) {
        let status = true
        if (!this.rules) {
          cb && cb(status)
        } else {
          var validator = new Schema(this.rules)
          console.log(this.value)
          validator.validate(this.value, (errors, fields) => {
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
    }
  }
</script>

<style lang="less" scoped>
</style>

