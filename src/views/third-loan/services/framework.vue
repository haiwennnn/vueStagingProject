<template>
  <div class="zz-page-body protocol-page">
    <div class="zz-page-body">
      <div class="zz-tab">
        <z-header @on-header-back-event="pageBack">{{frameInfo.title}}</z-header>
        <div class="zz-tab__panel">
          <iframe v-if="frameInfo.src"
            :src="frameInfo.src"
            frameborder="0"></iframe>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        frameInfo: {
          src: '',
          title: ''
        }
      }
    },
    computed: {
      frameStyle() {
        let dpr = window.devicePixelRatio
        return {
          width: `${1 / dpr * 100}%`,
          transform: `scale(${dpr})`,
          transformOrigin: '0 0'
        }
      }
    },
    methods: {
      pageBack() {
        this.$router.back()
      }
    },
    created() {
      let frameInfo = {}
      frameInfo.title = decodeURIComponent(this.$route.query.title || '')
      this.frameInfo = frameInfo
    },
    mounted() {
      this.$nextTick(() => {
        let src = decodeURIComponent(this.$route.query.url || '')
        this.$set(this.frameInfo, 'src', src)
      })
    }
  }
</script>
<style lang="less" scoped>
  iframe {
    // position: absolute;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>


