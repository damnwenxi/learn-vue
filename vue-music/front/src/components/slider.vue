<template>
  <div class="slider">
    <ul class="img-list">
      <li class="img-item" v-show="index === active" v-for="(img,index) in imgList" :key="img.id">
        <a :href="img.linkUrl" target="_blank">
          <img :src="img.picUrl" :alt="img.id" />
        </a>
      </li>
    </ul>
    <ul class="dot-list">
      <li
        class="dot-item"
        :class="{'dot-active':i-1 === active}"
        @click="changeImg(i-1)"
        v-for="i in imgList.length"
        :key="i"
      ></li>
    </ul>
  </div>
</template>

<script>
import { setInterval } from "timers";
export default {
  props: {
    imgList: {
      type: Array
    }
  },
  data() {
    return {
      active: 0
    };
  },
  methods: {
    changeImg(i) {
      this.active = i;
    },
    autoPlay() {
      this.active += 1;
      //   console.log(this.active);
      if (this.active === this.imgList.length) {
        this.active = 0;
      }
    },
    play() {
      setInterval(this.autoPlay, 5000);
    }
  },
  mounted() {
    this.play();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/base.scss";
.slider {
  position: relative;
  width: 100%;
  .img-list {
    width: 100%;
    a,
    img {
      width: 100%;
    }
  }

  .dot-list {
    position: absolute;
    bottom: 2em;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    .dot-item {
      margin: 0 1em;
      width: 10px;
      height: 10px;
      border-radius: 5px;
      background-color: rgba(255, 255, 255, 0.6);
      &:hover {
        background-color: $theme-color;
        cursor: pointer;
      }
    }
    .dot-active {
      background-color: $theme-color;
    }
  }
}
</style>

