<template>
  <div id="recommend">
    <!-- 轮播图 -->
    <slider :imgList="sliders"></slider>

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

    <!-- loading -->
    <loading v-show="!items.length"></loading>
  </div>
</template>

<script type="text/ecmascript-6">
import loading from "../components/part/loading";
import slider from "../components/slider";
import { getRecommend, getDiscList } from "../api/recommend";
export default {
  name: "recommend",
  components: {
    loading,
    slider
  },
  data() {
    return {
      items: [],
      sliders: []
    };
  },
  created() {
    this._getRecommend();
    // this._getDiscList();
  },
  methods: {
    // 轮播图图片接口
    _getRecommend() {
      getRecommend()
        .then(res => {
          this.sliders = res.data.slider;
        })
        .catch(e => {
          console.log(e);
        });
    }
    // qq音乐歌单接口
    // _getDiscList() {
    //   getDiscList()
    //     .then(res => {
    //       console.log(res);
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
    // }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/css/base.scss";
#recommend {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
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

