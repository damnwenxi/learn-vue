<template>
  <div class="home">
    <div class="banner">
      <h1 class="nav">
        <i class="iconfont icon-menu menu"></i>
        <i class="iconfont icon-share share"></i>
      </h1>

      <div class="avatar">
        <img alt="南京市民李先生" src="../assets/img/lizhi.png" />
        <p>南京市民李先生</p>
      </div>

      <div class="mask"></div>

      <!-- <hls-video :source="source"></hls-video> -->
    </div>

    <div class="content">
      <ul class="list-wrap">
        <li class="list-item"></li>
        <li class="list-item"></li>
        <li class="list-item"></li>
        <li class="list-item"></li>
        <li class="list-item"></li>
      </ul>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import hlsVideo from '@/components/hlsVideo'
export default {
    name: 'home',
    components: {
        hlsVideo
    },
    data() {
        return {
            source: 'http://198.181.33.20/hls/people/people.m3u8'
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/base.scss';

.home {
    .banner {
        position: relative;
        height: 560px;
        background-image: url('../assets/img/banner.png');
        background-size: cover;
        .mask {
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            z-index: 0;
        }
        .nav {
            top: 1em;
            width: 100%;
            position: absolute;
            z-index: 1;
            i {
                font-size: $title-size;
                cursor: pointer;
            }
            .share {
                position: absolute;
                right: 2em;
                animation: 1s right-in;
            }
            .menu {
                position: absolute;
                left: 2em;
                animation: 1s left-in;
            }
            @keyframes right-in {
                0% {
                    right: -2em;
                }
                100% {
                    right: 2em;
                }
            }
            @keyframes left-in {
                0% {
                    left: -2em;
                }
                100% {
                    left: 2em;
                }
            }
            color: rgb(194, 151, 117);
        }
        .avatar {
            position: absolute;
            left: 0;
            right: 0;
            top: 50%;
            margin-top: -90px;
            bottom: 0;
            padding: 1em;
            z-index: 1;
            img {
                width: 160px;
                height: 160px;
            }
            animation: 0.5s bottom-in;
        }
        @keyframes bottom-in {
            0% {
                margin-top: -50px;
            }
            100% {
                margin-top: -90px;
            }
        }
    }

    .content {
        width: 100%;
        background: red;
        .list-wrap {
            display: flex;
            width: 90%;
            margin: 0 auto;
            align-content: flex-start;
            align-items: flex-start;
            justify-content: space-around;
            flex-wrap: wrap;

            .list-item {
                flex-grow: 1;
                min-width: 240px;
                min-height: 180px;
                background-color: green;
                margin: 1em;
            }
        }
    }
}
</style>
