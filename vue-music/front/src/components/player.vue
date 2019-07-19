<template>
  <div class="player">
    <transition name="normal">
      <div class="full-size-player" v-show="isFullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image" />
        </div>
        <div class="top">
          <div class="back" @click="back">
            <i style="font-size:25px" class="iconfont icon-xiangxia"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <div class="middle-l">
            <div class="cd-wrapper">
              <div class="cd">
                <img class="image" :src="currentSong.image" />
              </div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="operators">
            <div class="icon i-left">
              <i style="font-size:26px" class="iconfont icon-xunhuanbofang"></i>
            </div>
            <div class="icon i-left">
              <i
                style="font-size:30px"
                @click="switchSong(-1)"
                class="iconfont icon-shangyishou-yuanshijituantubiao"
              ></i>
            </div>
            <div class="icon i-center">
              <i style="font-size:40px" @click="playToggle" class="iconfont" :class="isPlayed"></i>
            </div>
            <div class="icon i-right">
              <i
                style="font-size:30px"
                @click="switchSong(1)"
                class="iconfont icon-xiayishou-yuanshijituantubiao"
              ></i>
            </div>
            <div class="icon i-right">
              <i style="font-size:35px" class="iconfont icon-shoucang-yuanshijituantubiao"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="mini">
      <div class="mini-player" @click="setFullScreen" v-show="!isFullScreen">
        <div class="icon">
          <img width="40" height="40" :src="currentSong.image" />
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <i style="font-size:30px" @click.stop="playToggle" class="iconfont" :class="isPlayed"></i>
        </div>
        <div class="control">
          <i
            style="font-size:30px;line-height:60px"
            class="iconfont icon-zhankai-yuanshijituantubiao"
          ></i>
        </div>
      </div>
    </transition>

    <!-- 播放器 -->
    <audio @ended="switchSong(1)" ref="audio" :src="playUrl"></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getPlayUrl } from "../api/song";
export default {
  data() {
    return {
      playUrl: ""
    };
  },
  computed: {
    ...mapGetters([
      "isFullScreen",
      "playlist",
      "currentSong",
      "isPlaying",
      "currentIndex"
    ]),
    isPlayed() {
      return this.isPlaying
        ? "icon-zanting-yuanshijituantubiao"
        : "icon-bofang-yuanshijituantubiao";
    }
  },
  methods: {
    // 切歌
    switchSong(n) {
      const len = this.playlist.length;
      this.setCurrentIndex(this.currentIndex + n);
      if (this.currentIndex < 0 || this.currentIndex > len - 1) {
        this.setCurrentIndex(0);
      }
    },
    // 播放暂停控制
    playToggle() {
      this.setPlayingState(!this.isPlaying);
      // console.log(this.playlist);
    },
    // 返回
    back() {
      this.setFullScreen(false);
    },
    // 全屏显示
    setFullScreen() {
      this.setFullScreen(true);
    },
    ...mapMutations(["setFullScreen", "setPlayingState", "setCurrentIndex"]),
    // 获取播放链接
    _getPlayUrl() {
      const mid = this.currentSong.mid;
      getPlayUrl(mid)
        .then(res => {
          if (!res.midurlinfo.purl) {
            alert("付费歌曲，无法播放");
            return;
          }
          this.playUrl = res.sip[0] + res.midurlinfo.purl;
          this.$nextTick(() => {
            this.setPlayingState(true);
            this.$refs.audio.play();
          });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  watch: {
    currentSong() {
      this._getPlayUrl();
    },
    isPlaying(newState) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        if (newState) {
          audio.play();
        } else {
          audio.pause();
        }
      });
    },
    currentIndex(newIndex) {}
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/base.scss";
.player {
  .full-size-player {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    background-color: $background-color;
    .background {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);
    }
    .top {
      .back {
        position: absolute;
        left: 1em;
        top: 10px;
        &:hover {
          color: $theme-color;
          cursor: pointer;
        }
      }
      background: none;
      color: white;
      .title {
        margin: 10px 0;
        font-size: $font-size-h;
      }
      .subtitle {
        font-size: $font-size-middle;
      }
    }
    .middle {
      margin-top: 5em;
      .cd {
        width: 300px;
        height: 300px;
        overflow: hidden;
        border-radius: 150px;
        margin: 1em auto;
        border: 5px solid rgba(255, 255, 255, 0.2);
      }
    }
    .bottom {
      position: absolute;
      bottom: 1em;
      width: 100%;
      .operators {
        padding: 2em;
        width: 100%;
        display: flex;
        justify-content: space-around;
        .icon {
          font-size: 30px;
          text-align: center;
          vertical-align: middle;
          align-items: center;
          i {
            line-height: 48px;
          }
          &:hover {
            color: $theme-color;
            cursor: pointer;
          }
        }
      }
    }
    &.normal-enter-active,
    &.normal-leave-active {
      transition: all 0.4s;
      .top,
      .bottom {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    &.normal-enter,
    &.normal-leave-to {
      opacity: 0;
      .top {
        transform: translate3d(0, -100px, 0);
      }
      .bottom {
        transform: translate3d(0, 100px, 0);
      }
    }
  }

  // miniplayer
  .mini-player {
    z-index: 100;
    width: 100%;
    position: fixed;
    bottom: 0;
    height: 60px;
    background-color: #333;
    &.mini-enter-active,
    &.mini-leave-active {
      transition: all 0.4s;
    }
    &.mini-enter,
    &.mini-leave-to {
      opacity: 0;
    }

    padding: 0 1em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      flex: 1;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        vertical-align: middle;
      }
    }
    .text {
      flex: 4;
      text-align: left;
      .name {
        font-size: $font-size-middle;
        color: #eee;
      }
      .desc {
        color: #999;
        font-size: $font-size-small;
      }
    }
    .control {
      flex: 1;
    }
  }
}
</style>


