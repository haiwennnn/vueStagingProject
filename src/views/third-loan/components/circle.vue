<template>
  <div class="fj-circle">
    <svg viewBox="0 0 100 100" style="transform: rotate(-143deg);">
      <path :d="pathString"
        :stroke="trailColor"
        :stroke-width="trailWidth"
        :stroke-linecap="strokeLinecap"
        :fill-opacity="0"
        :style="pathBgStyle"
        />
      <path :d="pathString"
        :stroke-linecap="strokeLinecap"
        :stroke="strokeColor"
        :stroke-width="strokeWidth"
        fill-opacity="0" :style="pathStyle"/>
    </svg>
    <div class="fj-circle-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
/**
* Fork from https://github.com/react-component/progress
* MIT license
*/
export default {
  name: 'z-circle',
  props: {
    strokeWidth: {
      type: Number,
      default: 1
    },
    strokeColor: {
      type: [Array, String],
      default: '#3FC7FA'
    },
    trailWidth: {
      type: Number,
      default: 1
    },
    trailColor: {
      type: String,
      default: '#D9D9D9'
    },
    percent: {
      type: Number,
      default: 0
    },
    strokeLinecap: {
      type: String,
      default: 'round'
    },
    anticlockwise: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    radius () {
      return 50 - this.strokeWidth / 2
    },
    pathString () {
      return `M 50,50 m 0,-${this.radius}
      a ${this.radius},${this.radius} 0 1 1 0,${2 * this.radius}
      a ${this.radius},${this.radius} 0 1 1 0,-${2 * this.radius}`
    },
    len () {
      return Math.PI * 2 * this.radius
    },
    pathStyle () {
      return {
        'stroke-dasharray': `${this.len}px ${this.len}px`,
        'stroke-dashoffset': `${((this.anticlockwise ? this.percent * 0.8 - 100 : 100 - this.percent * 0.8) / 100 * this.len)}px`,
        'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      }
    },
    pathBgStyle () {
      return {
        'stroke-dasharray': `${this.len}px ${this.len}px`,
        'stroke-dashoffset': `${((this.anticlockwise ? 80 - 100 : 100 - 80) / 100 * this.len)}px`,
        'transition': 'stroke-dashoffset 0.6s ease 0s, stroke 0.6s ease'
      }
    },
    isGradient () {
      return typeof this.strokeColor !== 'string'
    }
  }
}
</script>

<style lang="less" scoped>
.fj-circle {
  position: relative;
  width: 100%;
  height: 100%;
}
.fj-circle-content {
  width: 100%;
  text-align: center;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}
</style>