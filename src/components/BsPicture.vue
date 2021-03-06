<template>
 <div class="pic-img h-p-100">
	<div class="img-container h-p-100" @mousemove="!moveEvent && mouseMove($event)" @mouseleave="!leaveEvent && mouseLeave($event)" @mouseover="mouseover($event)">
		<img ref="img" @load="imgLoaded" :src="url" style="width:100%;height:100%">
		<div v-if="!hideZoom && imgLoadedFlag" :class="['img-selector',{'circle':type === 'circle'}]" :style="[imgSelectorSize,imgSelectorPosition,!outShow && imgSelectorBg ,!outShow && imgBgPosition]"> </div>
	</div>
  <div v-if="outShow" v-show="!hideOutShow" class="img-out-show" :style="[imgOutShowSize,imgSelectorBg,imgBgPosition]"></div>
  </div>
</template>

<script>
export default {
  name: 'vue-photo-zoom-pro',
  data () {
    return {
      selector: {
        width: 166,
        halfWidth: 83,
        top: 0,
        left: 0,
        bgTop: 0,
        bgLeft: 0,
        rightBound: 0,
        bottomBound: 0,
        absoluteLeft: 0,
        absoluteTop: 0
      },
      imgInfo: {},
      hideOutShow: true,
      imgLoadedFlag: false,
      screenWidth: document.body.clientWidth,
      timer: null,
      hideZoom: true
    }
  },
  props: {
    url: String,
    highUrl: String,
    type: {
      type: String,
      default: 'square',
      validator: function (value) {
        return ['circle', 'square'].indexOf(value) !== -1
      }
    },
    scale: {
      type: Number,
      default: 3
    },
    moveEvent: {
      type: [Object, MouseEvent],
      default: null
    },
    leaveEvent: {
      type: [Object, MouseEvent],
      default: null
    },
    // hideZoom: {
    //   type: Boolean,
    //   default: false
    // },
    outShow: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    moveEvent (e) {
      this.mouseMove(e)
    },
    leaveEvent (e) {
      this.mouseLeave(e)
    },
    url () {
      this.imgLoadedFlag = false
    },
    screenWidth (val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = setTimeout(() => {
          this.imgLoaded()
          clearTimeout(this.timer)
          this.timer = null
        }, 400)
      }
    }
  },
  computed: {
    imgSelectorPosition () {
      let { top, left } = this.selector
      return {
        top: `${top}px`,
        left: `${left}px`
      }
    },
    imgSelectorSize () {
      let width = this.selector.width
      return {
        width: `${width}px`,
        height: `${width}px`
      }
    },
    imgOutShowSize () {
      let {
        scale,
        selector: { width }
      } = this
      return {
        width: `${width * scale}px`,
        height: `${width * scale}px`
      }
    },
    imgSelectorBg () {
      let {
        scale,
        url,
        highUrl,
        imgInfo: { height, width }
      } = this
      return {
        backgroundImage: `url(${highUrl || url})`,
        backgroundSize: `${width * scale}px ${height * scale}px`
      }
    },
    imgBgPosition () {
      let { bgLeft, bgTop } = this.selector
      return {
        backgroundPosition: `${bgLeft}px ${bgTop}px`
      }
    }
  },
  methods: {
    imgLoaded () {
      let imgInfo = this.$refs['img'].getBoundingClientRect()
      if (JSON.stringify(this.imgInfo) === JSON.stringify(imgInfo)) { // 位置不变不更新
        return
      }
      this.imgLoadedFlag = true
      let { width, height, left, top } = (this.imgInfo = imgInfo)
      let selector = this.selector
      let { width: selectorWidth, halfWidth: selectorHalfWidth } = selector
      let { scrollLeft, scrollTop } = document.documentElement
      selector.rightBound = width - selectorWidth
      selector.bottomBound = height - selectorWidth
      selector.absoluteLeft = left + selectorHalfWidth + scrollLeft
      selector.absoluteTop = top + selectorHalfWidth + scrollTop
    },
    reset () {
      Object.assign(this.selector, {
        top: 0,
        left: 0,
        bgLeft: 0,
        bgTop: 0
      })
    },
    mouseover (e) {
      this.hideZoom = false
    },
    mouseMove (e) {
      if (!this.hideZoom && this.imgLoadedFlag) {
        this.imgLoaded() // 防止img位置变化
        let { pageX, pageY } = e
        let { scale, selector } = this
        let {
          halfWidth,
          absoluteLeft,
          absoluteTop,
          rightBound,
          bottomBound
        } = selector
        let x = pageX - absoluteLeft // 选择器的x坐标 相对于图片
        let y = pageY - absoluteTop // 选择器的y坐标
        if (this.outShow) {
          halfWidth = 0
          this.hideOutShow = false
        }
        selector.top = y > 0 ? (y < bottomBound ? y : bottomBound) : 0
        selector.left = x > 0 ? (x < rightBound ? x : rightBound) : 0
        selector.bgLeft = halfWidth - (halfWidth + x) * scale // 选择器图片的坐标位置
        selector.bgTop = halfWidth - (halfWidth + y) * scale
      }
    },
    mouseLeave () {
      if (this.outShow) {
        this.hideOutShow = true
      }
      this.hideZoom = true
    }
  }
}
</script>

<style lang="scss" scoped>
.pic-img {
  position: relative;
}
.img-container {
  position: relative;
}

.img-selector {
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  background-repeat: no-repeat;
  cursor: move;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.img-selector.circle {
  border-radius: 50%;
}

.img-out-show {
  z-index: 999;
  background-color: #fff;
  position: absolute;
  top: 0;
  right: 0;
  background-repeat: no-repeat;
  transform: translate(100%, 0);
  border: 1px solid rgba(0, 0, 0, 0.1);
}

</style>
