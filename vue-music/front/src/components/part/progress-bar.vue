<template>
  <div class="progress-bar">
    <div class="time time-current">{{format(currentTime)}}</div>
    <div ref="bar" class="bar">
      <div ref="passedBar" class="passed"></div>
      <div ref="currentBtn" class="current-btn"></div>
    </div>
    <div class="time time-total">{{format(duration)}}</div>
  </div>
</template>

<script>
export default {
  props: ["duration", "currentTime"],
  computed: {
    progress() {
      return this.currentTime / this.duration;
    }
  },
  //   updated() {
  //     console.log(this.progress);
  //     console.log(this.currentTime, this.duration);
  //   },
  watch: {
    progress(newProgress) {
      this.$refs.passedBar.style.width = ~~(newProgress * 100) + "%";
      this.$refs.currentBtn.style.left =
        ~~(newProgress * this.getEleWidth("bar")) - 7 + "px";
    }
  },
  methods: {
    format(time) {
      let minute = this.zeroFix(~~(time / 60));
      let second = this.zeroFix(~~(time % 60));
      return minute + ":" + second;
    },
    zeroFix(num) {
      if (num < 10) {
        num = "0" + num;
      }
      return num;
    },
    getEleWidth(ref) {
      return this.$refs[ref].clientWidth;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/base.scss";
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
      left: 0;
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
