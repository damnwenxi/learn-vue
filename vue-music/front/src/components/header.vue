<template>
  <div id="header">
    <h3>
      <img src="../assets/images/logo.png" />
      <span>Music</span>
      <span class="hub">hub</span>
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
  h3 {
    vertical-align: middle;
    font-weight: 600;
    color: white;
    margin: 0;
    img {
      height: 40px;
      width: 40px;
    }
    * {
      vertical-align: middle;
    }
    .hub {
      padding: 0 5px;
      margin-left: 5px;
      background-color: $theme-color;
      border-radius: 5px;
      color: $background-color;
    }
  }
}
</style>




