<template>
  <div v-if="false" class="loading">
    <img src="../../assets/images/loading.gif" alt="loading" />
    <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "正在加载..."
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/base.scss";

.loading {
  margin: 1em;
  width: 100%;
  text-align: center;
  img {
    height: 20px;
  }
  .desc {
    line-height: 20px;
    font-size: $font-size-small;
    color: $font-color;
  }
}
</style>


