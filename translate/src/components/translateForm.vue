<template>
  <div class="row" id="translateForm">
    <!-- <h1>translateForm</h1> -->

    <div class="col-6 offset-3">
      <form class="well form-inline flex" v-on:submit="formSubmit">
        <input class="form-control col-6" type="text" v-model="translateText" placeholder="请输入需要翻译的内容">
        <select class="form-control col-3" v-model="language">
          <option value="en">English</option>
          <option value="ja">Japanese</option>
          <option value="ko">Korean</option>
          <option value="fr">Franch</option>
        </select>
        <input class="form-control btn btn-primary col-3" type="submit" value="翻译">
      </form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'translateForm',
  data () {
    return {
      translateText:"",
      language:""
    }
  },
  methods:{
    formSubmit:function(e){
      // alert(this.translateText);

      // 传递事件到父组件
      this.$emit("formSubmit",this.translateText,this.language);
      // 取消默认事件
      e.preventDefault();
    }
  },
  created:function(){
    this.language = 'en';
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
