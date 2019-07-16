<template>
  <div id="tab">
    <router-link class="link-item" tab="div" to="/recommend">
      <span class="link">推荐</span>
    </router-link>
    <router-link class="link-item" tab="div" to="/singer">
      <span class="link">歌手</span>
    </router-link>
    <router-link class="link-item" tab="div" to="/rank">
      <span class="link">排行</span>
    </router-link>
    <router-link class="link-item" tab="div" to="/search">
      <span class="link">搜索</span>
    </router-link>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/css/base.scss";
#tab {
  width: 100%;
  display: flex;
  height: 44px;
  line-height: 44px;
  .link-item {
    flex: 1;
    text-align: center;
    .link {
      padding-bottom: 5px;
      font-size: $font-size-middle;
    }
    &.router-link-active {
      .link {
        color: $theme-color;
        border-bottom: 2px solid $theme-color;
      }
    }
  }
}
</style>


