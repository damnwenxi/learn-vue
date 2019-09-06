<template>
  <div class="player">
    <transition name="normal">
      <div class="full-size-player" v-show="isFullScreen">
        <div class="background">
          <img :src="currentSong.image" height="100%" width="100%" />
        </div>
        <div class="top">
          <div @click="back" class="back">
            <i class="iconfont icon-xiangxia" style="font-size:25px"></i>
          </div>
          <h1 class="title" v-html="currentSong.name"></h1>
          <h2 class="subtitle" v-html="currentSong.singer"></h2>
        </div>
        <div class="middle">
          <transition name="slide-fade">
            <!-- 唱片 -->
            <div class="middle-l" v-if="currentTab === 'disc'">
              <div class="cd-wrapper">
                <div :class="isRotate" class="cd">
                  <img :src="currentSong.image" class="image" />
                </div>
              </div>
            </div>
          </transition>
          <transition name="slide-fade">
            <!-- 歌词 -->
            <div class="middle-r" v-if="currentTab === 'lyric'">
              <div class="lyric-wrap" ref="lyricWrap">
                <p class="no-lyric" v-if="!currentLyric">暂无歌词</p>
                <p
                  :class="{'current-lyric':currentLyricLine === index}"
                  :key="index"
                  v-else
                  v-for="(line,index) in currentLyric.lines"
                >{{line.txt}}</p>
              </div>
            </div>
          </transition>
          <!-- 切换snip -->
          <div class="snip-wrap">
            <span :class="{'active':currentTab === 'disc'}" @click="switchTab" class="snip"></span>
            <span :class="{'active':currentTab === 'lyric'}" @click="switchTab" class="snip"></span>
          </div>
          <!-- 加载动画 -->
          <loading v-if="!canplay"></loading>
          <!-- 进度条 -->
          <progress-bar
            :currentTime="currentTime"
            :duration="duration"
            @progressChange="handleProgressChange"
          ></progress-bar>
        </div>
        <div class="bottom">
          <div class="operators">
            <div class="icon i-left">
              <i :class="getModeStyle" @click="switchMode" class="iconfont" style="font-size:24px"></i>
            </div>
            <div class="icon i-left">
              <i
                :class="disable"
                @click="switchSong(-1)"
                class="iconfont icon-shangyishou-yuanshijituantubiao"
                style="font-size:30px"
              ></i>
            </div>
            <div class="icon i-center">
              <i :class="isPlayed" @click="playToggle" class="iconfont" style="font-size:50px"></i>
            </div>
            <div class="icon i-right">
              <i
                :class="disable"
                @click="switchSong(1)"
                class="iconfont icon-xiayishou-yuanshijituantubiao"
                style="font-size:30px"
              ></i>
            </div>
            <div class="icon i-right">
              <i class="iconfont icon-shoucang-yuanshijituantubiao" style="font-size:35px"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <transition name="mini">
      <div @click="setFullScreen" class="mini-player" v-show="!isFullScreen">
        <div :class="isRotate" class="icon">
          <img :src="currentSong.image || DEFAULT_IMG" height="40" width="40" />
        </div>
        <div class="text">
          <h2 class="name" v-html="currentSong.name"></h2>
          <p class="desc" v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <i
            :class="isPlayed"
            @click.stop="playToggle"
            class="iconfont"
            style="font-size:30px;margin:0 1em"
          ></i>
        </div>
        <div class="control">
          <i class="iconfont icon-liebiao" style="font-size:30px;line-height:60px"></i>
        </div>
      </div>
    </transition>

    <!-- 播放器 -->
    <audio
      :src="playUrl"
      @canplay="canPlay"
      @ended="switchSong(1)"
      @timeupdate="timeUpdate"
      ref="audio"
    ></audio>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { getPlayUrl, getSongMid } from '../api/song'
import progressBar from './part/progress-bar'
import loading from './part/loading'
import { shaffle } from '../api/util'
import Lyric from 'lyric-parser'

export default {
  components: {
    progressBar,
    loading
  },
  data () {
    return {
      playUrl: '',
      canplay: false,
      currentTime: 0,
      duration: 0,
      isRotate: '',
      DEFAULT_IMG: require('../assets/images/logo.png'),
      currentLyric: null,
      currentLyricLine: 0,
      currentTab: 'disc'
    }
  },
  computed: {
    getModeStyle () {
      switch (this.mode) {
        case 0:
          return 'icon-xunhuanbofang'
        case 1:
          return 'icon-danquxunhuan'
        case 2:
          return 'icon-suijibofang'
        default:
          return 'icon-xunhuanbofang'
      }
    },
    progress () {
      return ~~(this.currentTime / this.totalTime)
    },
    disable () {
      if (!this.canplay) {
        return 'disable-btn'
      }
      return ''
    },
    ...mapGetters([
      'isFullScreen',
      'playlist',
      'currentSong',
      'isPlaying',
      'currentIndex',
      'mode',
      'sequenceList'
    ]),
    isPlayed () {
      return this.isPlaying
        ? 'icon-zanting-yuanshijituantubiao'
        : 'icon-bofang-yuanshijituantubiao'
    }
  },
  methods: {
    switchTab () {
      if (this.currentTab === 'disc') {
        this.currentTab = 'lyric'
        return
      }
      if (this.currentTab === 'lyric') {
        this.currentTab = 'disc'
        return
      }
    },
    // switch play mode
    switchMode () {
      this.currentLyric = null
      this.setMode((this.mode + 1) % 3)
      // console.log(this.mode)

      let list = []
      if (this.mode === 2) {
        // 打乱数组
        list = shaffle(this.playlist)
      } else {
        list = this.sequenceList
      }
      this.resetCurrentSong
      this.setPlayList(list)
    },

    resetCurrentSong (list) {
      let index = list.findIndex(item => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    },

    handleProgressChange (progress) {
      let current = progress * this.$refs.audio.duration
      this.$refs.audio.currentTime = current
    },
    // canplay
    canPlay (e) {
      this.duration = ~~e.target.duration
      this.canplay = true
      this.play()
    },
    // timeupdate
    timeUpdate (e) {
      this.currentTime = ~~e.target.currentTime
    },
    // 切歌
    switchSong (n) {
      if(this.currentLyric){
        this.currentLyric.stop()
      }
      this.currentLyric = null
      this.isRotate = 'rotate pause'
      this.setPlayingState(false)
      this.setCurrentSong('')
      const len = this.playlist.length
      // the playing mode is loop
      if (this.mode === 1) {
        this.$refs.audio.currentTime = 0
      } else {
        // debugger
        this.setCurrentIndex(this.currentIndex + n)
        if (this.currentIndex < 0 || this.currentIndex > len - 1) {
          this.setCurrentIndex(0)
        }
      }
    },
    // 播放暂停控制
    playToggle () {
      this.setPlayingState(!this.isPlaying)
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    // 返回
    back () {
      this.setFullScreen(false)
    },
    // 全屏显示
    setFullScreen () {
      this.setFullScreen(true)
    },
    ...mapMutations([
      'setFullScreen',
      'setPlayingState',
      'setCurrentIndex',
      'setMode',
      'setPlayList',
      'setCurrentSong'
    ]),

    // 获取播放链接
    _getPlayUrl () {
      let mid = this.currentSong.mid
      if(!mid){
        getSongMid(this.currentSong.albummid).then(res=>{
          let songs = res.data.list
          mid = songs.filter(song=>{
            return song.songid = this.currentSong.id
          })[0].songmid
          getPlayUrl(mid).then(res => {
            this.playUrl = res.sip[0] + res.midurlinfo.purl
          })
          this.currentSong
            .getLyric(mid)
            .then(lyric => {
              this.currentLyricLine = 0
              this.currentLyric = new Lyric(lyric, this.lyricHandle)
            })
            .catch(() => {
              this.currentLyric.stop()
              this.currentLyric = null
            })
        })
      }else{
        getPlayUrl(mid).then(res => {
          this.playUrl = res.sip[0] + res.midurlinfo.purl
        })
        this.currentSong
          .getLyric(mid)
          .then(lyric => {
            this.currentLyricLine = 0
            this.currentLyric = new Lyric(lyric, this.lyricHandle)
          })
          .catch(() => {
            this.currentLyric.stop()
            this.currentLyric = null
          })
      }
    },
    // 歌词回调
    lyricHandle ({ lineNum }) {
      this.currentLyricLine = lineNum
      if (lineNum === 0 && this.$refs.lyricWrap) {
        this.$refs.lyricWrap.style.top = 0
      }
      if (this.$refs.lyricWrap && lineNum > 5) {
        this.$refs.lyricWrap.style.top = -((lineNum - 5) * 36) + 'px'
      }
    },
    // play
    play () {
      if (this.currentLyric) {
        this.currentLyric.stop()
      }

      this.$nextTick(() => {
        this.setPlayingState(true)
        this.$refs.audio.play()
        this.isRotate = 'rotate'
        if (this.currentLyric) {
          this.currentLyric.play()
        }
      })
    }
  },
  watch: {
    currentSong (newSong, oldSong) {
      // console.log(newSong)
      if (newSong.id === oldSong.id) {
        return
      }
      if (newSong.ispay) {
        // console.log('付费歌曲，已为您切换到下一首')
        this.switchSong(1)
      }
      if(this.currentLyric){
        this.currentLyric.stop()
        this.currentLyric = null
      }
      this._getPlayUrl()
    },
    isPlaying (newState) {
      const audio = this.$refs.audio
      this.$nextTick(() => {
        if (newState && this.canplay) {
          audio.play()
          this.isRotate = 'rotate'
          // this.currentLyric.play()
        } else {
          audio.pause()
          this.isRotate = 'rotate pause'
          // this.currentLyric.stop()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/base.scss';
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
      filter: blur(30px);
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
      z-index: -1;
      height: 100%;
      position: relative;
      padding: 5em 0;
      .snip-wrap {
        position: absolute;
        bottom: 150px;
        left: 0;
        right: 0;
        text-align: center;
        .snip {
          transition: width 0.2s;
          z-index: 100;
          margin: 5px;
          display: inline-block;
          width: 10px;
          height: 10px;
          border-radius: 5px;
          background-color: rgba(255, 255, 255, 0.4);
        }
        .active {
          background-color: rgba(255, 205, 50, 0.4);
          width: 20px;
        }
      }
      .middle-r {
        padding: 2em;
        overflow-y: hidden;
        position: absolute;
        top: 80px;
        bottom: 200px;
        width: 100%;
        box-shadow: 0 0 -10px #ddd;
        .no-lyric {
          position: fixed;
          width: 100%;
          top: 50%;
          left: 0;
        }
        .lyric-wrap {
          position: relative;
          top: 0;
          transition: top 1s;
        }
        p {
          font-size: 14px;
          line-height: 36px;
        }
        .current-lyric {
          color: #fff;
        }
      }

      .cd {
        width: 300px;
        height: 300px;
        overflow: hidden;
        border-radius: 150px;
        margin: 1em auto;
        border: 5px solid rgba(255, 255, 255, 0.3);
        box-shadow: 0 0 30px #777;
      }
      .rotate {
        animation: 20s rotate linear infinite;
      }
      .pause {
        animation-play-state: paused;
      }
    }
    .bottom {
      position: absolute;
      bottom: 1em;
      width: 100%;
      .operators {
        padding: 0 2em 1.5em 2em;
        width: 100%;
        display: flex;
        justify-content: space-between;
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
          .disable-btn {
            color: rgba(255, 255, 255, 0.2);
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
    .rotate {
      animation: 20s rotate linear infinite;
    }
    .pause {
      animation-play-state: paused;
    }

    padding: 0 1.2em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      margin-right: 1em;
      img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        vertical-align: middle;
      }
    }
    .text {
      flex: 1;
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
    }
  }

  // animation
  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s ease;
  }
  .slide-fade-enter,
  .slide-fade-leave-to {
    transform: translateY(10px);
    opacity: 0;
  }
}
</style>


