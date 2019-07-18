<template>
  <div class="music-list">
    <div class="bg-img" :style="bgStyle"></div>

    <div class="img-back" @click="resetWraper">
      <h1 class="title" v-html="title"></h1>
      <p class="back" @click="back">《</p>
      <div class="play-btn">
        <button>随机播放</button>
      </div>
    </div>

    <div class="list-wraper" :class="{'wraper-grow':isScrollTop}" @scroll="handleScroll">
      <div class="loading-wraper" v-if="songs.length===0">
        <loading></loading>
      </div>
      <song-list :songs="songs"></song-list>
    </div>
  </div>
</template>

<script>
import songList from "./song-list";
import loading from "./loading";
export default {
  components: { songList, loading },
  data() {
    return {
      isScrollTop: false,
      isScrollDown: false
    };
  },
  props: {
    songs: {
      type: Array,
      default: function() {
        return [];
      }
    },
    title: {
      type: String,
      default: ""
    },
    bgimg: {
      type: String,
      default: ""
    }
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgimg})`;
    }
  },
  created() {
    // console.log(this.songs);
  },
  methods: {
    back() {
      this.$router.push({
        path: "/singer"
      });
    },
    handleScroll() {
      this.isScrollTop = true;
    },
    resetWraper() {
      this.isScrollTop = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/base.scss";
.music-list {
  position: relative;
  top: 0;
  height: 100%;
  width: 100%;
  .bg-img {
    width: 100%;
    height: 40%;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .img-back {
    position: absolute;
    top: 0;
    width: 100%;
    height: 40%;
    background-color: rgba(0, 0, 0, 0.2);

    .title {
      text-align: center;
      font-size: 18px;
      color: white;
      font-weight: 600px;
      line-height: 44px;
    }
    .back {
      position: absolute;
      top: 0;
      left: 1em;
      line-height: 44px;
      font-size: 18px;
      color: white;
      &:hover {
        color: $theme-color;
        cursor: pointer;
      }
    }
    .play-btn {
      position: absolute;
      bottom: 1em;
      left: 0;
      right: 0;
      button {
        font-size: 16px;
        font-weight: 500;
        color: white;
        border: none;
        height: 30px;
        background-color: rgba(0, 0, 0, 0.6);
        border-radius: 15px;
        line-height: 30px;
        padding: 0 20px;
        &:hover {
          color: $theme-color;
          cursor: pointer;
        }
      }
    }
  }
  .list-wraper {
    width: 100%;
    position: absolute;
    bottom: 0;
    top: 40%;
    background-color: $background-color;
    z-index: 4;
    overflow: scroll;
    .loading-wraper {
      margin-top: 2em;
      width: 100%;
    }
    transition: 0.5s top;
  }
  .wraper-grow {
    top: 10%;
    transition: 0.5s top;
  }
}
</style>
