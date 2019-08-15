<template>
  <transition name="slide">
    <div class="singer-detail">
      <music-list :bgimg="singer.avatar" :songs="songs" :title="singer.name"></music-list>
    </div>
  </transition>
</template>

<script>
import { getSingerDetail } from '../api/singer'
import { mapGetters } from 'vuex'
import { createSong } from '../api/song'
import musicList from '../components/part/music-list'

export default {
    components: {
        musicList
    },
    data() {
        return {
            songs: []
        }
    },
    created() {
        this._getDetail()
    },
    methods: {
        _getDetail() {
            if (!this.singer.id) {
                this.$router.push({
                    path: '/singer'
                })
                return
            }
            getSingerDetail(this.singer.id)
                .then(res => {
                    this.songs = this._normallizeSongs(res.data.list)
                })
                .catch(e => {
                    console.log(e)
                })
        },
        _normallizeSongs(list) {
            let ret = []
            list.forEach(item => {
                let musicData = item.musicData
                if (musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData))
                }
            })
            return ret
        }
    },
    computed: {
        ...mapGetters(['singer'])
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


