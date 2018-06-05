<template>
  <div class="zz-cell">
    <div class="zz-cell__hd">
      <label class="zz-cell-label"
        :style="styles"
        v-if="label">{{label}}</label>
    </div>
    <div class="zz-cell__bd">
      <slot></slot>
    </div>
    <div class="zz-cell__ft">
      <div class="input-clear-all"
        v-if="clearAllBtn"
        @click="handleClearAllEvent">
        <span class="zz-close"></span>
      </div>
      <div class="input-error-tip"
        v-if="errorTipBtn"
        @click="handleClickErrorTipEvent">
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
      },
      clearAllBtn: Boolean,
      errorTipBtn: Boolean
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

      }
    },
    methods: {
      handleClearAllEvent() {
        this.$emit('on-clear-all')
      },
      handleClickErrorTipEvent() {
        console.log('on-click-error-tip')
        this.$emit('on-click-error-tip')
      }
    }
  }
</script>

<style lang="less" scoped>
</style>


