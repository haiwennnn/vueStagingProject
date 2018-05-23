<template>
  <div class="zz-flex-item"
    @click="flexItemClick"
    :style="itemStyles">
    <slot></slot>
  </div>
</template>
<script>
  /**
   * flex子元素
   * 组件默认值
   * flex:0 1 auto (默认值)
   * align-self:flex-start (默认值)
   */
  export default {
    name: 'flexbox-item',
    props: {
      flex: String,
      grow: {
        type: Number,
        default: 0
      },
      shrink: {
        type: Number,
        default: 1
      },
      basis: {
        type: [Number, String],
        default: 0
      },
      align: String
    },
    data() {
      return {

      }
    },
    computed: {
      itemStyles() {
        let styles = {}
        let flex = this.flex
        if (flex) {
          let flexCssStyle = ''
          if (flex === '1') {
            flexCssStyle = `1 1 0%`
          } else if (flex === 'auto') {
            flexCssStyle = `1 1 auto`
          } else if (flex === 'none') {
            flexCssStyle = `0 0 auto`
          } else {
            flexCssStyle = `0 1 auto`
          }
          styles.flex = flexCssStyle
        } else {
          let basis = this.basis === 'auto' ? this.basis : `${this.basis * 100}%`
          styles.flex = `${this.grow} ${this.shrink} ${basis}`
          styles['align-self'] = this.align
          styles['-webkit-align-self'] = this.align
        }

        // 计算gutter
        let gutter = this.$parent.gutter
        let dir = this.$parent.dir || 'row'
        let marginName = ''
        switch (dir) {
          case 'row':
            marginName = 'marginLeft'
            break
          case 'row-reverse':
            marginName = 'marginRight'
            break
          case 'column':
            marginName = 'marginTop'
            break
          case 'column-reverse':
            marginName = 'marginBottom'
            break
        }
        if (gutter && gutter !== 0) {
          gutter = `${gutter / 100}rem`
          styles[marginName] = gutter
        }
        return styles
      }
    },
    methods: {
      flexItemClick() {
        this.$emit('on-item-click')
      }
    },
    created() {
    }
  }
</script>
