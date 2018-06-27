<template>
  <form-item :label="label"
    :error-tip-btn="errorTipBtn"
    :clear-all-btn="clearAllBtnStatus"
    :label-width="labelWidth"
    @on-clear-all="onClearAll"
    @on-click-error-tip="onClickErrorTip">
    <z-input v-if="type === 'text'"
      ref="textInput"
      :placeholder="'请输入'"
      v-model="currentValue"
      :value-text-align="valueTextAlign"></z-input>
    <z-input v-if="type === 'number'"
      :type="type"
      ref="numberInput"
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
      labelWidth: {
        type: Number
      },
      clearAllBtn: false,
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
        rule: [],
        validator: null,
        errorTipBtn: false,
        errorMessage: ''
      }
    },
    computed: {
      clearAllBtnStatus() {
        if (this.clearAllBtn && this.currentValue) {
          return true
        }
        return false
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
        if (this.validator) {
          this.validator.validate(d, (errors, fields) => {
            if (errors) {
              if (errors.length > 0) {
                this.errorTipBtn = true
                this.errorMessage = errors[0].message
              }
            } else {
              this.errorTipBtn = false
            }
          })
        }
        if (newVal !== this.currentValue) {
          this.currentValue = newVal || ''
        }
      }
    },
    methods: {
      onClickErrorTip() {
        this.$zzz.toast.text(this.errorMessage)
      },
      onClearAll() {
        this.currentValue = ''
        // let refs = this.$refs
        // this.$nextTick(() => {
        // console.log(this)
        // })
      }
    },
    created() {
      if (this.$parent.$parent.rules && this.$parent.$parent.rules[this.prop]) {
        this.rule = this.$parent.$parent.rules[this.prop]
        this.validator = new Schema(this.$parent.$parent.rules)
      }
    },
    mounted() {
    }
  }
</script>
<style lang="less" scoped>
  .zz-cell {
    padding: 0.15rem 0.3rem;
  }
</style>


