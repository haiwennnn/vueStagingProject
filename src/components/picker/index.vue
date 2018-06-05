<template>
  <div class="zz-picker">
    <div class="zz-picker-hd">
      <div class="zz-picker-action">
        <a href="javascript:;"
          class="zz-picker-btn">取消</a>
        <div class="zz-picker-title"></div>
        <a href="javascript:;"
          class="zz-picker-btn">确定</a>
      </div>
    </div>
    <div class="zz-picker-bd">
      <div class="zz-picker-group"
        v-for="(group,index) in data"
        :id="`pickerGroup${index}`"
        :data-index="index"
        :key="`group${index}`">
        <div class="zz-picker-mask"></div>
        <div class="zz-picker-indicator"
          :id="`pickerIndicator${index}`"></div>
        <div class="zz-picker-content"
          :id="`pickerContent${index}`">
          <div class="zz-picker-item"
            v-for="(item,itemIndex) in group"
            :key="`item${itemIndex}`">{{item.name}}</div>
          <!-- <div class="zz-picker-item">选项二</div>
          <div class="zz-picker-item">选项三</div> -->
        </div>
      </div>
      <!-- <div class="zz-picker-group">
        <div class="zz-picker-mask"></div>
        <div class="zz-picker-indicator"></div>
        <div class="zz-picker-content">
          <div class="zz-picker-item">选项一</div>
          <div class="zz-picker-item">选项二</div>
          <div class="zz-picker-item">选项三</div>
          <div class="zz-picker-item">选项二</div>
          <div class="zz-picker-item">选项四</div>
        </div>
      </div> -->
    </div>
    <div class="zz-picker-ft"></div>
  </div>
</template>
<script>
  import Render from './render'
  import Animate from './animate'
  import Scroller from './scroller'
  export default {
    name: 'picker',
    data() {
      return {
        data: [[{
          name: '',
          value: ''
        }, {
          name: '',
          value: ''
        }, {
          name: '',
          value: ''
        }, {
          name: '2009届5班',
          value: '1'
        }, {
          name: '2010届4班',
          value: '2'
        }, {
          name: '2010届5班',
          value: '3'
        }, {
          name: '2010届6班',
          value: '4'
        }, {
          name: '2011届4班',
          value: '5'
        }]],
        // 联动模式下的列数？？
        columns: 1,
        currentValue: ['5']
      }
    },
    methods: {
      initEventListener(container, scroller) {
        if ('ontouchstart' in window) {
          container.addEventListener('touchstart', function (e) {
            // Don't react if initial down happens on a form element
            if (e.target.tagName.match(/input|textarea|select/i)) {
              return
            }

            scroller.doTouchStart(e.touches, e.timeStamp)
            e.preventDefault()
          }, false)

          document.addEventListener('touchmove', function (e) {
            scroller.doTouchMove(e.touches, e.timeStamp)
          }, false)

          document.addEventListener('touchend', function (e) {
            scroller.doTouchEnd(e.timeStamp)
          }, false)
        } else {
          var mousedown = false

          container.addEventListener('mousedown', function (e) {
            // Don't react if initial down happens on a form element
            if (e.target.tagName.match(/input|textarea|select/i)) {
              return
            }

            scroller.doTouchStart([{
              pageX: e.pageX,
              pageY: e.pageY
            }], e.timeStamp)

            mousedown = true
          }, false)

          document.addEventListener('mousemove', function (e) {
            if (!mousedown) {
              return
            }

            scroller.doTouchMove([{
              pageX: e.pageX,
              pageY: e.pageY
            }], e.timeStamp)

            mousedown = true
          }, false)

          document.addEventListener('mouseup', function (e) {
            if (!mousedown) {
              return
            }
            scroller.doTouchEnd(e.timeStamp)
            mousedown = false
          }, false)
        }
      }
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        let vm = this
        Scroller.setAnimate(Animate)
        let container = []
        let content = []
        let indicator = []
        let scroller = []
        for (let index = 0; index < this.columns; index++) {
          container.push(document.getElementById('pickerGroup' + index))
          content.push(document.getElementById('pickerContent' + index))
          indicator.push(document.getElementById('pickerIndicator' + index))
          let _scroller = new Scroller(Render(content[index]), {
            scrollingX: false,
            paging: true,
            scrollerIndex: index,
            scrollerData: this.data[index],
            scrollerValue: this.currentValue,
            onSelect: (value) => {
              console.log(value)
            }
          })
          scroller.push(_scroller)
          let rect = container[index].getBoundingClientRect()
          scroller[index].setPosition(rect.left + container[index].clientLeft, rect.top + container[index].clientTop)
          scroller[index].setDimensions(container[index].clientWidth, indicator[index].clientHeight, content[index].offsetWidth, content[index].offsetHeight)
          vm.initEventListener(container[index], scroller[index])
        }
      })
    }
  }
</script>
<style lang="less" scoped>
</style>


