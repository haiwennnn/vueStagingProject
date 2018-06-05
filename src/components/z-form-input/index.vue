<template>
  <form-item :label="label"
    :errorTipBtn="errorTipBtn"
    @on-click-error-tip="onClickErrorTip">
    <z-input v-if="type === 'text'"
      :placeholder="'请输入'"
      v-model="currentValue"
      :value-text-align="valueTextAlign"></z-input>
    <z-input v-if="type === 'number'"
      :type="type"
      :placeholder="'请输入'"
      v-model.number="currentValue"
      :value-text-align="valueTextAlign"></z-input>
  </form-item>
</template>
<script>
  import Schema from 'async-validator'
  export default {
    name: 'form-input',
    props: {
      // 表单绑定值
      value: [String, Number],
      type: {
        type: String,
        default: 'text'
      },
      prop: String,
      label: String,
      placeholder: {
        type: String,
        default: '请选择'
      },
      // 是否禁用选择
      disabled: false,
      valueTextAlign: {
        type: String,
        default: 'right'
      }
    },
    data() {
      return {
        currentValue: this.value || '',
        rule: (this.$parent.rules && this.$parent.rules[this.prop]) || [],
        validator: '',
        errorTipBtn: false,
        errorMessage: ''
      }
    },
    watch: {
      currentValue(newVal) {
        if (newVal !== this.value) {
          this.$emit('input', newVal)
        }
      },
      value(newVal) {
        let d = {}
        d[this.prop] = newVal
        this.validator.validate(d, (errors, fields) => {
          // console.log(errors)
          if (errors) {
            // validation failed, errors is an array of all errors
            // fields is an object keyed by field name with an array of
            // errors per field
            // return handleErrors(errors, fields);
            if (errors.length > 0) {
              this.errorTipBtn = true
              this.errorMessage = errors[0].message
            }
          } else {
            this.errorTipBtn = false
          }
        })
        if (newVal !== this.currentValue) {
          this.currentValue = newVal || ''
        }
      }
    },
    methods: {
      onClickErrorTip() {
        console.log('on-click-error-tip11')
        this.$zzz.toast.text(this.errorMessage)
      }
    },
    created() {
      console.log(this.rule)
      if (this.rule) {
        this.validator = new Schema(this.$parent.rules)
      }
    }
  }
</script>
<style lang="less" scoped>
  .zz-cell {
    padding: 0.15rem 0.3rem;
  }
</style>


