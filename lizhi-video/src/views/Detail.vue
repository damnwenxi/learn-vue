<template>
  <div class="detail">
    <h1 class="title-wrap">
      <img
        :class="{'rotate-pause':!isPlaying}"
        class="disc"
        ref="disc"
        src="../assets/img/lizhi.png"
      />
      <span class="title">This is an detail page</span>

      <p class="options">
        <i class="icon-xihuandianjihou iconfont" style="font-size:22px;"></i> 喜欢
        <i class="icon-fire iconfont" style="font-size:18px;"></i> 热度
        <i class="icon-share iconfont" style="font-size:18px;"></i>
        分享
      </p>
    </h1>

    <div class="video-wrap">
      <hls-video :source="source" @control="controlEvent" ref="video"></hls-video>
    </div>

    <div class="desc-wrap">
      <p class="desc">
        李志，中国大陆男歌手，太合音乐集团旗下的麦田音乐厂牌音乐人，现居江苏省南京市。现由于不明原因自2019年4月起被中国大陆封禁。 维基百科
        生于： 1978 年 11 月 13 日（40 岁)，中华人民共和国常州市金坛区
        出道作品： 《被禁忌的游戏》
        音乐类型： 民谣（早期）、流行（部分）、摇滚、迷幻摇滚
        代表作品： 《天空之城》《关于郑州的记忆》《这个世界会好吗》
      </p>
    </div>

    <hr class="line" />
    <div class="comment-wrap">
      <comment></comment>
    </div>

    <div class="say">
      <div class="msg-wrap">
        <input class="msg-input" placeholder="说点什么..." type="text" />
        <button class="send-btn">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
import hlsVideo from '@/components/hlsVideo'
import Comment from '@/components/Comment'

export default {
    components: {
        hlsVideo,
        Comment
    },
    data() {
        return {
            source: 'http://198.181.33.20/hls/people/people.m3u8',
            isPlaying: false
        }
    },
    mounted() {
        let video = this.$refs['video']
        this.isPlaying = video.isPlaying
    },
    methods: {
        controlEvent(type) {
            switch (type) {
                case 'pause':
                    this.isPlaying = false
                    break
                case 'play':
                    this.isPlaying = true
                    break
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.detail {
    .title-wrap {
        text-align: left;
        max-width: 1080px;
        margin: 0 auto;
        padding: 2em 0;
        .disc {
            vertical-align: middle;
            width: 100px;
            height: 100px;
            border-radius: 55px;
            border: 5px solid #abc;
            animation-fill-mode: forwards;
            animation: 6s rotated linear infinite;
        }
        .rotate-pause {
            animation-play-state: paused;
        }
        @keyframes rotated {
            0% {
                transform: rotate(0deg);
            }
            50% {
                transform: rotate(180deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        .title {
            padding-left: 1em;
            vertical-align: middle;
        }

        .options {
            line-height: 110px;
            vertical-align: middle;
            float: right;
            font-size: 16px;
            i {
                margin-left: 1em;
            }
        }
    }
    .video-wrap {
        max-width: 1080px;
        margin: 0 auto;
    }
    .desc-wrap {
        max-width: 1080px;
        max-height: 360px;
        margin: 0 auto;
        padding: 2em 0;
        .desc {
            text-align: left;
            color: #cecbcb;
        }
    }
    // .line {
    //     margin: 1em;
    //     border-bottom: none;
    //     border-color: #91959b;
    // }
    .comment-wrap {
        max-width: 1080px;
        margin: 0 auto;
    }
    .say {
        width: 100%;
        position: fixed;
        bottom: 0;
        height: 50px;
        background-color: #323135;
        .msg-wrap {
            max-width: 1080px;
            margin: 0 auto;
            height: 100%;
            display: flex;
            justify-content: space-between;

            .msg-input {
                background-color: #cecbcb;
                border: none;
                padding-left: 1em;
                font-size: 16px;
                margin: 5px 0;
                flex-grow: 1;
            }
            .send-btn {
                color: #ddd;
                border: none;
                font-size: 16px;
                margin: 5px 0;
                background-color: #a99790;
                width: 200px;
            }
        }
    }
}
</style>