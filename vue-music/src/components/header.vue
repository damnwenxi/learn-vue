<template>
  <div id="header">
    <h3>
      <img src="../assets/images/logo.png" />Jay Chou
    </h3>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "../assets/css/base.scss";

#header {
  width: 100%;
  height: 40px;
  line-height: 40px;
  h3 {
    font-weight: 600;
    color: $theme-color;
    margin: 0;
    word-spacing: 0.5em;
    letter-spacing: 5px;
    img {
      margin-right: 1em;
      height: 40px;
      width: 40px;
    }
    line-height: 40px;
    * {
      vertical-align: middle;
    }
  }
}
</style>




