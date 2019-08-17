<template>
  <div class="play-list">
    <ul ref="listWrap">
      <li :key="index" class="list-item" v-for="(item,index) in playList">
        <img :src="item.cover_url_small" />
        <p class="list-title">{{item.title}}</p>
      </li>
    </ul>
  </div>
</template>


<script>
export default {}
</script>

<style lang="scss" scoped>
@import '../../assets/css/base.scss';
.play-list {
    width: 100%;
}
</style>
