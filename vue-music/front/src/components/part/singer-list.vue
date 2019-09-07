<template>
  <div class="singer-list">
    <loading v-show="!singerGroup"/>
    <ul>
      <li :key="singers.title" class="list-group" v-for="singers in singerGroup">
        <h1 :id="singers.title" class="list-group-title">{{singers.title}}</h1>
        <ul>
          <li
            :key="singer.id"
            @click="selectItem(singer)"
            class="list-group-item"
            v-for="singer in singers.items"
          >
            <img :alt="singer.name" v-lazy="singer.avatar" />
            <p>{{singer.name}}</p>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 歌手导航 -->
    <div @click="handleMove" class="list-shortcut">
      <short-list :shortCutList="shortcutList"></short-list>
    </div>
  </div>
</template>

<script>
import { getSingerList } from '../../api/singer'
import { ERR_OK } from '../../api/config'
import Signer from '../../api/singer'
import shortList from './list-shortcut'
import loading from '../part/loading'

const HOT_NAME = '热门'
const HOT_NUM = 10
export default {
    components: { shortList, loading },
    data() {
        return {
            singerGroup: [],
            shortcutList: []
        }
    },
    created() {
        this._getSingerList()
    },
    methods: {
        _getSingerList() {
            getSingerList()
                .then(res => {
                    if (res.code === ERR_OK) {
                        this.singers = res.data.list
                        // console.log(this.singers)
                        this._mapSingerList(this.singers)
                    }
                })
                .catch(e => {
                    // console.log(e)
                })
        },
        // 整理请求到的歌手数据
        _mapSingerList(list) {
            let map = {
                hot: {
                    title: HOT_NAME,
                    items: []
                }
            }
            list.forEach((item, index) => {
                let singer = new Signer(item.Fsinger_mid, item.Fsinger_name)
                if (index <= HOT_NUM) {
                    map.hot.items.push(singer)
                }
                if (!map[item.Findex]) {
                    let ele = {
                        title: item.Findex,
                        items: []
                    }
                    ele.items.push(singer)
                    map[item.Findex] = ele
                } else {
                    map[item.Findex].items.push(singer)
                }
            })

            // sort
            let hot = []
            let ret = []
            for (let key in map) {
                let val = map[key]
                if (val.title.match(/[a-zA-Z]/)) {
                    ret.push(val)
                } else if (val.title === HOT_NAME) {
                    hot.push(val)
                }
            }
            ret.sort((a, b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            let sortedList = hot.concat(ret)
            this.shortcutList = sortedList.map(item => {
                return item.title.substring(0, 1)
            })
            this.singerGroup = sortedList
        },
        // 处理shortcut点击
        handleMove(e) {
            let target = e.target
            // console.log(target)
        },
        selectItem(singer) {
            this.$emit('select', singer)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/base.scss';
.list-group {
    width: 100%;
    .list-group-title {
        text-align: left;
        padding-left: 1em;
        font-size: $font-size-middle;
        background-color: rgba(255, 255, 255, 0.1);
    }
    .list-group-item {
        position: relative;
        margin: 5px 0;
        height: 60px;
        padding: 5px 2em;
        width: 100%;
        text-align: left;
        img {
            width: 50px;
            height: 50px;
            border-radius: 25px;
        }
        p {
            position: absolute;
            top: 0;
            left: 7em;
            height: 60px;
            line-height: 60px;
            display: inline-block;
        }
        &:hover {
            background-color: rgba(255, 255, 255, 0.1);
            cursor: pointer;
        }
    }
}

.singer-list {
    position: absolute;
    width: 100%;
    top: 0;
    bottom: 0;
    ul{
        padding-bottom: 60px;
    }
    .list-shortcut {
        max-width: 30px;
        position: fixed;
        top: 120px;
        bottom: 76px;
        right: 0;
        margin: auto;
    }
}
</style>

