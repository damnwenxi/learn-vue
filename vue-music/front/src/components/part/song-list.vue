<template>
  <div class="song-list">
    <ul ref="songlist">
      <li
        :key="song.id"
        @click="selectSong(song,index)"
        class="song-item"
        v-for="(song,index) in songs"
      >
        <h2 class="song-title">{{song.name}}</h2>
        <p class="song-desc">{{song.album}}</p>
        <span class="ispay" v-show="song.ispay">付费歌曲</span>
      </li>
    </ul>
  </div>
</template>


<script>
export default {
    props: {
        songs: {
            type: Array,
            default: function() {
                return []
            }
        }
    },
    created() {
        // console.log(this.songs);
    },
    methods: {
        selectSong(song, index) {
            if (song.ispay) {
                // console.log("付费歌曲，无法播放")
                return
            }
            this.$emit('select', song, index)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/base.scss';
.song-list {
    width: 100%;
    .song-item {
        position: relative;
        text-align: left;
        width: 100%;
        padding: 5px 1.4em;
        margin: 10px 0;
        &:hover {
            cursor: pointer;
            background-color: rgba(255, 255, 255, 0.1);
        }
        .song-title {
            font-size: $font-size-h;
            color: #ddd;
        }
        .song-desc {
            font-size: $font-size-middle;
            color: #aaa;
        }
        .ispay {
            height: 20px;
            right: 2.4em;
            top: calc(50% - 10px);
            position: absolute;
            font-size: 10px;
            color: $theme-color;
            border: 1px solid $theme-color;
            border-radius: 5px;
            padding: 0 3px;
        }
    }
}
</style>
