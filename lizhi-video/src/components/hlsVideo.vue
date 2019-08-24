<template>
  <div class="video">
    <video
      @pause="pause"
      @play="play"
      autoplay="false"
      controls
      height="100%"
      ref="video"
      width="100%"
    ></video>
  </div>
</template>

<script>
import Hls from 'hls.js'
import { HLS_CONFIG } from './common/config'
export default {
    props: ['source'],
    data() {
        return {
            // source: 'http://198.181.33.20/hls/people/people.m3u8'
            isPlaying: false
        }
    },
    mounted() {
        // 判断浏览器是否支持Hls
        if (Hls.isSupported()) {
            console.log('hls.js supported!')
            let video = this.$refs.video
            let hls = new Hls(HLS_CONFIG)
            hls.loadSource(this.source)
            hls.attachMedia(video)

            hls.on(Hls.Events.MEDIA_ATTACHED, function() {
                video.pause()
            })
        } else {
            alert('您的浏览器不支持此视频格式，请使用Chrome或者火狐')
        }
    },
    methods: {
        play() {
            this.isPlaying = true
            this.$emit('control', 'play')
        },
        pause() {
            this.isPlaying = false
            this.$emit('control', 'pause')
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
