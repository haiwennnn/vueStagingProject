<template>
  <div class="zz-form-item">
    <div class="zz-form__hd">
      <label class="zz-form-label"
        :style="styles"
        v-if="label">{{label}}</label>
    </div>
    <div class="zz-form__bd">
      <slot></slot>
    </div>
    <div class="zz-form__ft">
      <div class="input-clear-all"
        v-if="clearAllBtn">
        <span class="zz-close"></span>
      </div>
      <div class="input-error-tip"
        v-if="errorTipBtn">
        <span class="ionicons ion-ios-information"></span>
      </div>
      <slot name="ft"></slot>
    </div>

  </div>
</template>
<script>
  export default {
    name: 'form-item',
    props: {
      label: {
        type: String
      },
      prop: {
        type: String
      },
      labelFor: {
        type: String
      },
      labelWidth: {
        type: Number
      },
      align: {
        type: String,
        default: 'left'
      },
      rules: {
        type: Array
      }
    },
    computed: {
      styles() {
        return {
          width: this.labelWidth ? `${this.labelWidth / 100}rem` : (this.$parent.labelWidth ? `${this.$parent.labelWidth / 100}rem` : false),
          textAlign: this.align
        }
      }
    },
    data() {
      return {
        clearAllBtn: false,
        errorTipBtn: false
      }
    }
  }
</script>

<style lang="less" scoped>
</style>


