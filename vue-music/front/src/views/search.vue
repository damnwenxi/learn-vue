<template>
  <div class="search">
    <loading v-show="!hotkeys"/>
    <div class="search-box">
      <input @keydown="isEnter($event)" class="txt-input" v-model="keyword" type="text" placeholder="搜索">
      <button type="submit" @click="search" class="search"> <i class="iconfont icon-search"></i></button>
    </div>
    <div class="clear-fixed" style="clear:both;height:40px"></div>
    <div class="hot-box">
      <p class="hot-title">热门搜索</p>
        <ul class="hot-wrap">
          <li @click="hotKeySearch(key.k)" class="hot-item" v-for="(key, index) in hotkeys" :key="index">
            {{key.k}}
          </li>
        </ul>
    </div>
    <div class="result-box">
      <loading v-show="!songs && tempLoading"/>
      <ul class="result-wrap">
        <li @click="playSong(song)" class="result-item" v-for="(song, index) in songs" :key="index">
          <p class="song">
            {{song.title}} &nbsp;&nbsp;- <span class="singer">{{song.singer|singerFormat}}</span>
          </p>
          <p class="highlight" v-html="song.subtitle || song.title_hilight "></p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import {getHotKey, getSearchResult} from '../api/search'
import {mapMutations} from 'vuex'
import {createSong} from '../api/song'
import loading from '../components/part/loading'

export default {
  name: "search",
  components:{
    loading
  },
  data(){
    return {
      keyword:'',
      hotkeys:'',
      songs:'',
      tempLoading:false
    }
  },
  created(){
    getHotKey().then(res=>{
      if(res.code === 0){
        this.keyword = res.data.special_key
        this.hotkeys = res.data.hotkey.slice(0,10)
      }
    }).catch(e=>{
      console.log(e)
    })
  },
  methods: {
    search(){
      this.tempLoading = true
      getSearchResult(this.keyword).then(res=>{
        if(res.code === 0){
          this.songs = res.data.song.list
          this.tempLoading = false
        }
      }).catch(e=>{
        console.log(e)
      })
    },
    hotKeySearch(k){
      this.keyword = k
      this.search()
    },
    isEnter(e){
      if(e.which == 13){
        this.search()
      }
    },
    playSong(song){
      let params = {
        pay:song.pay,
        songmid:song.mid,
        singer:song.singer,
        songname:song.name,
        albumname:song.album.name,
        interval:song.interval,
        albummid:song.album.mid
      }
      this.setCurrentSong(createSong(params))
      this.setPlayingState(true)
      this.setFullScreen(true)
    },
    ...mapMutations([
      'setFullScreen',
      'setPlayingState',
      'setCurrentSong'
    ]),
  },
  filters: {
    singerFormat(arr){
      let singer = arr.map(singer=>{
        return singer.name
      }).join(',')
      return singer
    }
  }
};
</script>

<style lang="scss" scoped>
.search{
  font-size: 0.9em;
  div{
    width: 100%;
    flex-shrink: 0;
  }
  .search-box{
    position: fixed;
    top: 84px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, .1);
    background: #222;

    .txt-input{
      background: transparent;
      border: none;
      font-size: 0.9em;
      padding-left: 2em;
      line-height: 40px;
      flex-grow: 1;
      color: #fff;
    }
    .search{
      cursor: pointer;
      background: transparent;
      padding: 0 2em;
      height: 40px;
      line-height: 40px;
      border: none;
      color: #fff;
      .iconfont{
        font-size: 1.4em;
      }
    }
  }

  .hot-box{
    .hot-title{
      font-size: 0.9em;
      line-height: 30px;
      text-align: left;
      padding-left: 1em;
    }
    .hot-wrap{
      display: flex;
      justify-content: flex-start;
      margin: 0 1em;
      flex-wrap: wrap;
      align-items: center;
      .hot-item{
        padding: 0 10px;
        background: rgba(255,255,255,.1);
        font-size: 0.9em;
        border-radius: 4px;
        margin:5px 10px;
        margin-left: 0;
        cursor: pointer;
      }
    }
  }

  .result-box{
    flex-grow: 1;
    text-align: left;
    font-size: 14px;
    .result-wrap{
      padding: 0 1em 70px 1em;
      overflow: auto;
      .result-item{
        width: 100%;
        margin: 10px 0;
        border-bottom: 1px solid rgba(255, 255, 255, .1);
        cursor: pointer;
        .song{
          .singer{
            font-size: 10px;
            color: rgba(255, 255, 255, .4)
          }
        }
        .highlight{
          color:#ffcd32;
          font-size: 10px;
        }
      }
    }
  }
}
</style>
