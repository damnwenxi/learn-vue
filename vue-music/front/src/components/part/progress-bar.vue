<template>
  <div class="progress-bar">
    <div class="time time-current">{{format(currentTime)}}</div>
    <div @click="progressClick" class="bar" ref="bar">
      <div class="passed" ref="passedBar"></div>
      <div
        @touchend="progressTouchEnd"
        @touchmove="progressTouchMove"
        @touchstart="progressTouchStart"
        class="current-btn"
        ref="currentBtn"
      ></div>
    </div>
    <div class="time time-total">{{format(duration)}}</div>
  </div>
</template>

<script>
export default {
  props: ['duration', 'currentTime'],
  computed: {
    progress () {
      return this.currentTime / this.duration
    }
  },
  // share touch event infos
  created () {
    this.touch = {}
  },
  watch: {
    progress (newProgress) {
      if (newProgress > 0 && !this.touch.flag) {
        this.setProgress(newProgress)
      }
    }
  },
  methods: {
    //set progress-bar
    setProgress (newProgress) {
      this.$refs.passedBar.style.width = ~~(newProgress * 100) + '%'
      this.$refs.currentBtn.style.left =
        ~~(newProgress * this.getEleWidth('bar')) - 7 + 'px'
    },

    // progress-bar event
    progressTouchStart (e) {
      this.touch.flag = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.passedBar.clientWidth
    },
    progressTouchMove (e) {
      if (!this.touch.flag) {
        return
      }
      this.setProgress(this.getTouchProgress(e))
    },
    progressTouchEnd () {
      this.touch.flag = false
      const progress =
        this.getEleWidth('passedBar') / this.getEleWidth('bar')
      this.$emit('progressChange', progress)
    },

    // get touch progress
    getTouchProgress (e) {
      const deltaX = e.touches[0].pageX - this.touch.startX
      //   console.log(deltaX)
      const offsetX = Math.min(
        this.$refs.bar.clientWidth,
        Math.max(0, this.touch.left + deltaX)
      )
      const progress = offsetX / this.getEleWidth('bar')
      return progress
    },
    // progress click
    progressClick (e) {
      const progress = e.offsetX / this.getEleWidth('bar')
      this.$emit('progressChange', progress)
    },

    format (time) {
      let minute = this.zeroFix(~~(time / 60))
      let second = this.zeroFix(~~(time % 60))
      return minute + ':' + second
    },
    zeroFix (num) {
      if (num < 10) {
        num = '0' + num
      }
      return num
    },
    getEleWidth (ref) {
      return this.$refs[ref].clientWidth
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/base.scss';
.progress-bar {
  position: absolute;
  bottom: 6em;
  padding: 0 2em;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .time {
    font-size: 10px;
    line-height: 50px;
  }
  .bar {
    position: relative;
    margin: 0 12px;
    flex: 1;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.2);
    .passed {
      left: 0;
      top: 0;
      bottom: 0;
      position: absolute;
      height: 2px;
      background-color: #fff;
      //   width: 0;
    }
    .current-btn {
      left: -7px;
      width: 14px;
      height: 14px;
      border-radius: 7px;
      background-color: #fff;
      box-shadow: 0 0 6px #555;
      position: absolute;
      top: -6px;
    }
  }
}
</style>
