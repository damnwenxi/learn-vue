<template>
  <transition name="slide">
    <div class="singer-detail">
      <music-list :bgimg="discImg" :desc="desc" :songs="songs" :title="title"></music-list>
    </div>
  </transition>
</template>

<script>
import { getDiscDetail } from '../api/recommend'
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
        this._getDiscDetail()
    },
    methods: {
        _getDiscDetail() {
            if (!this.$route.params.id) {
                this.$router.push({
                    path: '/recommend'
                })
                return
            }
            const tid = this.$route.params.id
            getDiscDetail(tid)
                .then(res => {
                    let cd = res.cdlist[0]
                    this.songs = this._normallizeSongs(cd.songlist)
                    this.title = cd.dissname
                    this.desc = cd.desc
                    this.discImg = cd.dir_pic_url2
                })
                .catch(e => {
                    throw e
                })
        },
        _normallizeSongs(list) {
            let ret = []
            list.forEach(item => {
                let musicData = {
                    albumname: item.album.name,
                    songid: item.id,
                    songmid: item.mid,
                    pay: {
                        payplay: item.pay.pay_play
                    },
                    singer: item.singer,
                    songname: item.name,
                    interval: item.interval,
                    albummid: item.album.mid
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


