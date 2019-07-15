<template>
  <div id="recommend">
    <loading v-if="!items.length" title="自定义标题"></loading>
    <div class="recommend-list">
      <h1 class="recommend-title">热门歌单推荐</h1>
      <ul>
        <li v-for="item in items" :key="item.url" class="item">
          <div class="icon">
            <img width="60" height="60" :src="item.url" />
          </div>
          <div class="desc">
            <h2>{{item.tags}}</h2>
            <p>{{item.c_date}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import loading from "../components/part/loading";
export default {
  components: {
    loading
  },
  data() {
    return {
      items: {}
    };
  },
  created() {
    this._getItems();
  },
  methods: {
    _getItems() {
      fetch("http://kkboom.cn:9876/images?num=0")
        .then(res => {
          return res.json();
        })
        .then(body => {
          this.items = body.img_list;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/base.scss";
#recommend {
  width: 100%;
  .recommend-title {
    font-size: $font-size-h;
    color: $theme-color;
  }
  ul {
    width: 100%;
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

