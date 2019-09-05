<template>
  <div class="music-list">
    <div :style="bgStyle" class="bg-img"></div>

    <div @click="resetWraper" class="img-back">
      <h1 class="title" v-html="title"></h1>
      <p @click="back" class="back">
        <i class="iconfont icon-fanhui-yuanshijituantubiao" style="font-size:30px"></i>
      </p>
      <div class="play-btn">
        <button @click="random">
          <i class="iconfont icon-suijibofang"></i> 随机播放
        </button>
      </div>

      <div class="desc">
        <p>{{desc}}</p>
      </div>
    </div>

    <div :class="{'wraper-grow':isScrollTop}" @scroll="handleScroll" class="list-wraper">
      <div class="loading-wraper" v-if="songs.length===0">
        <loading></loading>
      </div>
      <song-list :songs="songs" @select="selectSong"></song-list>
    </div>
  </div>
</template>

<script>
import songList from './song-list'
import loading from './loading'
import { mapActions } from 'vuex'

export default {
    components: { songList, loading },
    data() {
        return {
            isScrollTop: false,
            isScrollDown: false
        }
    },
    props: {
        songs: {
            type: Array,
            default: function() {
                return []
            }
        },
        title: {
            type: String,
            default: ''
        },
        bgimg: {
            type: String,
            default: ''
        },
        desc: {
            type: String,
            default: ''
        }
    },
    computed: {
        bgStyle() {
            return `background-image:url(${this.bgimg})`
        }
    },
    created() {
        // console.log(this.songs);
    },
    methods: {
        random() {
            this.randomPlay({ list: this.songs })
        },
        back() {
            const currentPath = this.$route.fullPath
            if (/.*singer.*/.test(currentPath)) {
                this.$router.push({
                    path: '/singer'
                })
            }
            if (/.*playlist.*/.test(currentPath)) {
                this.$router.push({
                    path: '/'
                })
            }
            if (/.*rank*/.test(currentPath)) {
                this.$router.push({
                    path: '/rank'
                })
            }
        },
        handleScroll() {
            this.isScrollTop = true
        },
        resetWraper() {
            this.isScrollTop = false
        },
        selectSong(song, index) {
            this.selectPlay({
                list: this.songs,
                index: index
            })
        },
        ...mapActions(['selectPlay', 'randomPlay'])
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/base.scss';
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
        background-color: rgba(0, 0, 0, 0.5);

        .desc {
            p {
                padding: 2em;
                color: #fff;
                font-size: 14px;
            }
        }
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
                border: 1px solid $theme-color;
                vertical-align: middle;
                font-size: 16px;
                font-weight: 500;
                height: 30px;
                color: $theme-color;
                background-color: rgba(0, 0, 0, 0.3);
                border-radius: 15px;
                padding: 0 20px;
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
