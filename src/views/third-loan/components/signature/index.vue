<template>
  <div class="signature-panel">
    <div class="signature__main"
      ref="signatureMain">
      <div class="signature-drawing-bg"
        ref="drawingBg"></div>
      <div class="signature-drawing-board">
        <div class="signature-drawing-text">请使用正楷字体签名</div>
        <div class="drawing-board-frame"></div>
        <canvas id="drawingBoard"
          ref="drawingBoard"
          width="300"
          height="600"></canvas>
      </div>
    </div>
    <div class="signature__tool"
      ref="signatureTool">
      <div class="back"
        v-if="!hideBack"
        @click="$router.back()">
        <i class="ion ion-ios-arrow-back"></i>
      </div>
      <div class="refresh"
        @click="clear">重签</div>
      <div class="confirm-sign"
        @click="getImg">确认</div>
    </div>
    <div class="signature__foot">
      <div class="cache-img">
        <img :src="signature"
          ref='signImg'>
      </div>
      <div class="roate-img-canvas">
        <canvas ref="rotateCanvas"></canvas>
      </div>
    </div>
  </div>
</template>
<script>
  var sp = require('@/lib/signature-pad.js')
  export default {
    props: {
      hideBack: Boolean
    },
    data() {
      return {
        mounted: false,
        beginSignature: true,
        sdb: null,
        signature: '',
        canvasWidth: 300
      }
    },
    watch: {

    },
    methods: {
      /**
       * 清除重写
       */
      clear: function () {
        this.sdb.clear()
      },
      /**
       * 判断是否绘制
       */
      checkDraw: function (imgData) {
        let pxCount = 0
        for (let i = 0; i < imgData.data.length; i += 4) {
          if (imgData.data[i + 3] === 255) {
            pxCount = 1
            return pxCount
          }
        }
        return pxCount
      },
      /**
       * 获取图片
       */
      getImg: function () {
        let vm = this
        let drawingBoard, ctx, imgData, hasData
        drawingBoard = this.$refs.drawingBoard
        ctx = drawingBoard.getContext('2d')
        imgData = ctx.getImageData(0, 0, drawingBoard.width, drawingBoard.height)
        hasData = this.checkDraw(imgData)
        if (hasData === 0) {
          this.$zzz.toast.text('您未签名，请签名', '', '90')
          return
        }
        this.signature = this.sdb.toDataURL()
        let cas = this.$refs.rotateCanvas
        this.$nextTick(() => {
          this.$refs.signImg.onload = () => {
            cas.setAttribute('height', this.$refs.signImg.naturalWidth)
            cas.setAttribute('width', this.$refs.signImg.naturalHeight)
            let ctx = cas.getContext('2d')
            ctx.translate(0, this.$refs.signImg.naturalWidth)
            ctx.rotate(-90 * Math.PI / 180)
            ctx.drawImage(this.$refs.signImg, 0, 0, this.$refs.signImg.naturalWidth, this.$refs.signImg.naturalHeight)
            this.$refs.signImg.onload = null
            this.signature = cas.toDataURL('image/png', 0.5)

            let d = this.sdb.toData()
            console.log(d)
            let _d = []
            d.forEach(function (d1, index) {
              d1.forEach(function (point, index) {
                if (index % (5 * window.devicePixelRatio) === 0) {
                  _d.push(parseInt(point.y))
                  _d.push(parseInt(vm.canvasWidth - point.x))
                } else if (index === d1.length - 1) {
                  _d.push(parseInt(point.y))
                  _d.push(parseInt(vm.canvasWidth - point.x))
                }
              })
              _d.push(-1)
              _d.push(0)
            })
            // 签名成功给父页面(组件)传递结果，页面移交到父页面
            this.$emit('on-sign-complete', {
              signImg: this.signature,
              signTrack: _d
            })
          }
        })
      },
      initDrawBoard() {
        let signatureMain, drawingBg, drawingBoard, signatureTool, signatureMainStyle

        signatureMain = this.$refs.signatureMain
        drawingBg = this.$refs.drawingBg
        drawingBoard = this.$refs.drawingBoard
        signatureTool = this.$refs.signatureTool

        signatureMainStyle = window.getComputedStyle(signatureMain)
        // 设置背景宽高
        drawingBg.style.width = signatureMainStyle.height
        drawingBg.style.height = signatureMainStyle.width
        drawingBg.style.left = signatureMainStyle.width
        // 设置工具条样式
        signatureTool.style.width = signatureMainStyle.height
        signatureTool.style.left = signatureMainStyle.width
        // 设置画布背景高宽
        drawingBg.setAttribute('height', signatureMainStyle.height)
        drawingBg.setAttribute('width', signatureMainStyle.width)
        // 设置canvas宽高
        this.canvasWidth = parseInt(signatureMainStyle.width)
        drawingBoard.setAttribute('height', signatureMainStyle.height)
        drawingBoard.setAttribute('width', signatureMainStyle.width)

        setTimeout(() => {
          this.sdb = new sp.SignaturePad(drawingBoard, {
            lineColor: '#000',
            minWidth: 0.7,
            boardColor: 'transparent'
          })
        }, 500)
      }
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        this.initDrawBoard()
      })
    }
  }
</script>
<style lang="less" scoped>
  .signature-panel {
    position: absolute;
    width: 100%;
    height: 100%;
    .signature__main {
      position: relative;
      height: 100%;
      overflow: hidden;
      z-index: 5;
      .signature-drawing-bg {
        position: absolute;
        top: 0;
        transform-origin: 0% 0%;
        transform: rotate(90deg);
        background-image: url("../../../../assets/sign/sign-bg.png");
        background-repeat: no-repeat;
        background-size: cover;
      }

      .signature-drawing-board {
        height: 100%;
        .signature-drawing-text {
          position: absolute;
          top: 50%;
          left: 0%;
          width: 100%;
          text-align: center;
          font-size: 0.4rem;
          color: #222;
          z-index: 2;
          -webkit-transform: translateY(-50%) rotate(90deg);
          transform: translateY(-50%) rotate(90deg);
        }
        .drawing-board-frame {
          position: absolute;
          width: 100%;
          height: 100%;
          padding: 0.4rem;
          box-sizing: border-box;
          &:after {
            content: "";
            // position: absolute;
            display: block;
            width: 100%;
            height: 100%;
            border: 2px solid #ddd;
          }
        }
        canvas {
          position: relative;
          z-index: 4;
        }
      }
    }
    .signature__tool {
      position: absolute;
      height: 0.9rem;
      top: 0;
      transform-origin: 0% 0%;
      transform: rotate(90deg);
      z-index: 10;
      .back {
        position: absolute;
        left: 0.3rem;
        top: 0.15rem;
        width: 0.9rem;
        height: 0.64rem;
        line-height: 0.64rem;
        font-size: 0.48rem;
        text-align: center;
      }
      .refresh {
        position: absolute;
        right: 2rem;
        top: 0.15rem;
        width: 0.9rem;
        height: 0.64rem;
        line-height: 0.64rem;
        padding: 0 0.15rem;
        font-size: 0.3rem;
        color: #444444;
        background-image: url("../../../../assets/sign/refresh.png");
        background-repeat: no-repeat;
        background-position: 90% 50%;
      }
      .confirm-sign {
        position: absolute;
        top: 0.15rem;
        right: 0.3rem;
        width: 1.2rem;
        height: 0.64rem;
        line-height: 0.64rem;
        background: #fc834e;
        border-radius: 0.04rem;
        font-size: 0.3rem;
        color: #ffffff;
        text-align: center;
      }
    }
    .signature__foot {
      .cache-img {
        display: none;
        position: absolute;
        bottom: 0;
        left: 50%;
        width: 4rem;
        background-color: #efefef;
        transform: translate(-50%, 0);
        img {
          width: 100%;
        }
      }
      .roate-img-canvas {
        position: absolute;
        left: 0;
        top: 0;
        display: none;
      }
    }
  }
</style>


