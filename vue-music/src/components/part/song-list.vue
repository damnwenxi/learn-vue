<template>
  <div class="song-list">
    <ul ref="songlist">
      <li v-for="song in songs" :key="song.id" class="song-item">
        <h2 class="song-title">{{song.name}}</h2>
        <p class="song-desc">{{song.album}}</p>
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
        return [];
      }
    }
  },
  created() {
    // console.log(this.songs);
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/base.scss";
.song-list {
  width: 100%;
  .song-item {
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
  }
}
</style>
