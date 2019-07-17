<template>
  <div class="singer-list">
    <ul>
      <li class="list-group" v-for="singers in singerGroup" :key="singers.title">
        <h1 :id="singers.title" class="list-group-title">{{singers.title}}</h1>
        <ul>
          <li
            @click="selectItem(singer)"
            class="list-group-item"
            v-for="singer in singers.items"
            :key="singer.id"
          >
            <img v-lazy="singer.avatar" :alt="singer.name" />
            <p>{{singer.name}}</p>
          </li>
        </ul>
      </li>
    </ul>
    <!-- 歌手导航 -->
    <div class="list-shortcut" @click="handleMove">
      <short-list :shortCutList="shortcutList"></short-list>
    </div>
  </div>
</template>

<script>
import { getSingerList } from "../../api/singer";
import { ERR_OK } from "../../api/config";
import Signer from "../../api/singer";
import shortList from "./list-shortcut";
const HOT_NAME = "热门";
const HOT_NUM = 10;
export default {
  components: { shortList },
  data() {
    return {
      singerGroup: [],
      shortcutList: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    _getSingerList() {
      getSingerList()
        .then(res => {
          if (res.code === ERR_OK) {
            this.singers = res.data.list;
            // console.log(this.singers);
            this._mapSingerList(this.singers);
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    // 整理请求到的歌手数据
    _mapSingerList(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        let singer = new Signer(item.Fsinger_mid, item.Fsinger_name);
        if (index <= HOT_NUM) {
          map.hot.items.push(singer);
        }
        if (!map[item.Findex]) {
          let ele = {
            title: item.Findex,
            items: []
          };
          ele.items.push(singer);
          map[item.Findex] = ele;
        } else {
          map[item.Findex].items.push(singer);
        }
      });

      // sort
      let hot = [];
      let ret = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val);
        } else if (val.title === HOT_NAME) {
          hot.push(val);
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      let sortedList = hot.concat(ret);
      this.shortcutList = sortedList.map(item => {
        return item.title.substring(0, 1);
      });
      this.singerGroup = sortedList;
    },
    // 处理shortcut点击
    handleMove(e) {
      let target = e.target;
      console.log(target);
    },
    selectItem(singer) {
      this.$emit("select", singer);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/base.scss";
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
  height: 100%;
  .list-shortcut {
    position: fixed;
    right: 0;
    top: 105px;
  }
  height: 100%;
  overflow-y: scroll;
}
</style>

