<template>
  <div class="rank">
    <loading v-show="!list"/>
    <ul class="rank-wrap">
      <li @click="selectRank(item.topId)" class="rank-item" v-for="(item, index) in list" :key="index">
        <img class="cover" v-lazy="item.headPicUrl">
        <div class="rank-info">
          <p class="title line-limit-length">{{item.title}}</p>
          <p class="song line-limit-length">{{item.song[0].title}} <span>-{{item.song[0].singerName}}</span> </p>
          <p class="song line-limit-length">{{item.song[1].title}} <span>-{{item.song[0].singerName}}</span></p>
          <p class="song line-limit-length">{{item.song[2].title}} <span>-{{item.song[0].singerName}}</span></p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {PURL_SERVER} from '../api/config'
import loading from '../components/part/loading'

export default {
  name: "rank",
  components:{loading},
  data () {
    return {
      list:''
    }
  },
  created () {
    this.$axios.get(PURL_SERVER+'/rank').then(res=>{
      let prelist = res.data.rankList
      let rankList = []
      prelist.forEach(ele => {
        rankList = rankList.concat(ele.toplist)
      });
      this.list = rankList
    }).catch(e=>{
      console.log(e)
    })
  },
  methods: {
    selectRank(id){
      this.$router.push({
        path:'/rank/'+id
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.rank{
    min-height: 100%;
    background-color: rgba(255, 255, 255, .1);
    padding: 10px;
  .rank-wrap{
    margin-bottom: 60px;
    .rank-item{
      display: flex;
      background-color: #222;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      text-align: left;
      .cover{
        width: 100px;
        height: 100px;
        flex-shrink: 0;
      }
      .rank-info{
        color:rgba(255, 255, 255, 0.8);
        flex-grow: 1;
        padding: 0 1em;
        overflow: hidden;
        .title{
          white-space:nowrap;
          font-weight: 600;
          line-height:28px;
        }
        .song{
          white-space:nowrap;
          font-size: 14px;
          span{
            text-overflow: ellipsis;
            color:rgba(255, 255, 255, 0.5);
          }
        }

        .line-limit-length {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap; //文本不换行，这样超出一行的部分被截取，显示...
        }
      }
    }

  }
}
</style>

