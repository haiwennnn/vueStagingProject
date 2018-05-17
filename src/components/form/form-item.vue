<template>
  <div class="zz-form-item">
    <div class="zz-form__hd">
      <label class="zz-form-label"
        v-if="label">{{label}}</label>
    </div>
    <div class="zz-form__bd">
      <slot></slot>
    </div>
    <div class="zz-form__ft">
      <div class="input-clear-all" v-if="clearAllBtn">
        <span class="zz-close"></span>
      </div>
      <div class="input-error-tip" v-if="errorTipBtn">
        <span class="ionicons ion-ios-information"></span>
      </div>
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
      rules: {
        type: Array
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


