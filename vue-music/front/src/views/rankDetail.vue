<template>
  <transition name="slide">
    <div class="singer-detail">
      <music-list :bgimg="discImg" :desc="desc" :songs="songs" :title="title"></music-list>
    </div>
  </transition>
</template>

<script>
import { getDiscDetail } from '../api/rank'
import { mapGetters } from 'vuex'
import { createSong } from '../api/song'
import musicList from '../components/part/music-list'

export default {
    components: {
        musicList
    },
    data() {
        return {
            songs: [],
            discImg: '',
            title: '',
            desc: ''
        }
    },
    created() {
        this._getRankDetail()
    },
    methods: {
        _getRankDetail() {
            if (!this.$route.params.id) {
                this.$router.push({
                    path: '/recommend'
                })
                return
            }
            const topId = this.$route.params.id
            getDiscDetail(topId)
                .then(res => {
                    let data = res.detail.data.data
                    this.discImg = data.headPicUrl
                    this.desc = data.intro
                    this.title = data.title
                    this.songs = this._normallizeSongs(data.song)
                })
                .catch(e => {
                    console.log(e)
                    throw e
                })
        },
        _normallizeSongs(list) {
            let ret = []
            list.forEach(item => {
                let musicData = {
                    songid: item.songId,
                    singer: item.singerName,
                    songname: item.title,
                    albummid: item.albumMid
                }
                ret.push(createSong(musicData))
            })
            return ret
        }
    },
    computed: {
        ...mapGetters(['playlist'])
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/base.scss';
.singer-detail {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: $background-color;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
    transform: translate3d(100%, 0, 0);
}
</style>


