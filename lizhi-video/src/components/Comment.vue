<template>
  <div class="comment">
    <h1 class="title">这个世界会好吗</h1>
    <div class="container">
      <ul class="list-wrap">
        <li class="list-item">
          <img alt class="avatar" src="../assets/img/avatar.jpg" />
          <p class="text">
            <strong>李志&nbsp;</strong>说：
            <br />你好，会的。
          </p>
          <span class="reply">回复</span>
          <span class="vote">牛逼&nbsp;(587)</span>
        </li>
        <hr class="line" />

        <li class="list-item">
          <img alt class="avatar" src="../assets/img/avatar.jpg" />
          <p class="text">你好，会的。</p>
        </li>
        <li class="list-item">
          <img alt class="avatar" src="../assets/img/avatar.jpg" />
          <p class="text">你好，会的。</p>
        </li>
        <li class="list-item">
          <img alt class="avatar" src="../assets/img/avatar.jpg" />
          <p class="text">你好，会的。</p>
        </li>
        <li class="list-item">
          <img alt class="avatar" src="../assets/img/avatar.jpg" />
          <p class="text">你好，会的。</p>
        </li>
        <li class="list-item">
          <img alt class="avatar" src="../assets/img/avatar.jpg" />
          <p class="text">你好，会的。</p>
        </li>
        <li class="list-item">
          <img alt class="avatar" src="../assets/img/avatar.jpg" />
          <p class="text">你好，会的。</p>
        </li>
        <li class="list-item">
          <img alt class="avatar" src="../assets/img/avatar.jpg" />
          <p class="text">你好，会的。</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
.comment {
    .title {
        text-align: left;
        border-left: 5px solid rgb(229, 108, 100);
        padding-left: 1em;
        margin: 2em 0;
    }
    .container {
        .list-wrap {
            .list-item {
                // border-bottom: 1px solid #91959b;
                margin: 20px 0;
                max-height: 120px;
                padding: 1em 0;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .avatar {
                    width: 60px;
                    height: 60px;
                    border-radius: 30px;
                    margin-right: 2em;
                }
                .text {
                    flex-grow: 1;
                    strong {
                        color: rgb(229, 108, 100);
                    }
                }
                .reply,
                .vote {
                    color: rgb(229, 108, 100);
                    margin: 0 1em;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>