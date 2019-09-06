<template>
  <div id="recommend">
    <!-- 轮播图 -->
    <slider :imgList="sliders"></slider>

    <div class="recommend-list">
      <h1 class="recommend-title">热门歌单推荐</h1>
      <ul>
        <li :key="index" @click="goToPlaylist(item.tid)" class="item" v-for="(item,index) in items">
          <div class="icon">
            <img v-lazy="item.cover_url_small" height="60" width="60" />
          </div>
          <div class="desc">
            <h2>{{item.title}}</h2>
            <p>{{formatDate(item.modify_time)}}</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- loading -->
    <loading v-show="!items.length"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
import loading from '../components/part/loading'
import slider from '../components/slider'
import { getRecommend, getDiscList } from '../api/recommend'
export default {
    name: 'recommend',
    components: {
        loading,
        slider
    },
    data() {
        return {
            items: [],
            sliders: []
        }
    },
    created() {
        this._getRecommend()
        this._getDiscList()
    },
    methods: {
        // 轮播图图片接口
        _getRecommend() {
            getRecommend()
                .then(res => {
                    this.sliders = res.data.slider
                })
                .catch(e => {
                    console.log(e)
                })
        },
        // qq音乐歌单接口
        _getDiscList() {
            getDiscList()
                .then(res => {
                    this.items = res.playlist.v_playlist
                })
                .catch(err => {
                    throw err
                })
        },
        // 歌单跳转
        goToPlaylist(id) {
            this.$router.push({
                path: `/playlist/${id}`
            })
        },
        formatDate(str) {
            const date = new Date(str * 1000)
            const fullYear = date.getFullYear()
            let month = date.getMonth() + 1
            let day = date.getDay() + 1
            let hour = date.getHours() + 1
            let minute = date.getMinutes() + 1
            let second = date.getSeconds() + 1

            month = month < 10 ? '0' + month : month
            day = day < 10 ? '0' + day : day
            hour = hour < 10 ? '0' + hour : hour
            minute = minute < 10 ? '0' + minute : minute
            second = second < 10 ? '0' + second : second

            return (
                fullYear +
                '/' +
                month +
                '/' +
                day +
                ' ' +
                hour +
                ':' +
                minute +
                ':' +
                second
            )
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/css/base.scss';
#recommend {
    width: 100%;
    margin: 0 auto;
    .recommend-title {
        font-size: $font-size-h;
        color: $theme-color;
    }
    ul {
        width: 100%;
        padding-bottom: 70px;
        li {
            text-align: left;
            box-sizing: border-box;
            display: flex;
            width: 100%;
            padding: 0 1em;
            margin: 10px auto;
            height: 60px;
            .icon {
                flex: 1;
                img {
                }
            }
            .desc {
                flex: 4;
                h2 {
                    font-size: $font-size-middle;
                    line-height: 35px;
                }
                p {
                    font-size: $font-size-small;
                    line-height: 25px;
                }
            }
            &:hover {
                background-color: rgba(255, 255, 255, 0.2);
                cursor: pointer;
            }
        }
    }
}
</style>

