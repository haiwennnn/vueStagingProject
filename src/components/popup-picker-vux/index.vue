<template>
  <div>
    <form-item :label="label"
      @click.native="showValue = true">
      <p v-if="currentValue.length === 0"
        style="color: #444;font-size:.28rem;opacity: 0.3;"
        :style="contentStyle">{{placeholder}}</p>
      <p v-else
        :style="contentStyle">
        {{currentValue | value2name(data,delimiter)}}
      </p>
    </form-item>
    <popup v-model="showValue"
      @on-hide="onPopupHide">
      <div class="zz-picker-hd">
        <div class="zz-picker-action">
          <a href="javascript:;"
            @click="onPopupPickerCancel"
            class="zz-picker-btn">取消</a>
          <div class="zz-picker-title"></div>
          <a href="javascript:;"
            @click="onPopupPickerConfirm"
            class="zz-picker-btn">确定</a>
        </div>
      </div>
      <picker-vux v-model="tempValue"
        :columns="columns"
        :data="data"></picker-vux>
    </popup>
  </div>
</template>
<script>
  import value2name from '@/components/picker-vux/value2name'
  const getObject = function (obj) {
    return JSON.parse(JSON.stringify(obj))
  }

  export default {
    name: 'popup-picker',
    filters: {
      value2name
    },
    props: {
      // 表单绑定值
      value: {
        type: Array,
        default() {
          return []
        }
      },
      label: String,
      placeholder: {
        type: String,
        default: '请选择'
      },
      // 外部入参是否展示组件
      show: Boolean,
      title: {
        type: String,
        default: '请选择'
      },
      cancelText: {
        type: String,
        default: '取消'
      },
      confirmText: {
        type: String,
        default: '确定'
      },
      // 是否展示表单项目
      showCell: {
        type: Boolean,
        default: true
      },
      // 是否禁用选择
      disabled: false,
      // picker列表数据
      data: Array,
      nameKey: [String, Array],
      valueKey: [Array],
      // 列数
      columns: {
        type: Number,
        default: 1
      },
      valueTextAlign: {
        type: String,
        default: 'right'
      }
    },
    data() {
      return {
        // 初始化传入的数据
        currentData: JSON.parse(JSON.stringify(this.data)),
        // 是否展示，内部与popup双向绑定
        showValue: false,
        // 缓存值，用来跟picker双向绑定
        tempValue: getObject(this.value),
        // 初始化选中的值
        currentValue: this.value || [],
        delimiter: '-'
      }
    },
    computed: {
      contentStyle() {
        return {
          'textAlign': this.valueTextAlign
        }
      }
    },
    watch: {
      value(newVal) {
        // if (JSON.stringify(newVal) !== JSON.stringify(this.tempValue)) {
        this.tempValue = getObject(newVal)
        this.currentValue = getObject(newVal)
        // }
      },
      show(newVal) {
        this.showValue = newVal
      },
      showValue(newVal) {
        this.$emit('update:show', newVal)
      }
    },
    methods: {
      onPopupHide() {
        this.tempValue = getObject(this.currentValue)
      },
      // 取消事件
      onPopupPickerCancel() {
        this.tempValue = getObject(this.currentValue)
        this.showValue = false
        this.$emit('on-cancel')
      },
      // 确认选择事件
      onPopupPickerConfirm() {
        this.currentValue = getObject(this.tempValue)
        this.showValue = false
        let value2name = this.$options.filters['value2name']
        this.$emit('input', this.currentValue)
        this.$emit('on-confirm', {
          value: this.currentValue,
          name: value2name(this.currentValue, this.currentData, this.delimiter).split(this.delimiter),
          nameKey: this.nameKey,
          valueKey: this.valueKey
        })
      }
    },
    created() {
      if (typeof this.show !== 'undefined') {
        this.showValue = this.show
      }
      // console.log(this.$options.filters)
    }
  }
</script>
<style lang="less" scoped>
</style>


