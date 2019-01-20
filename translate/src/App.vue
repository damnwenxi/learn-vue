<template>
  <div id="app">
    <h1>在线翻译</h1>
    <h5 class="text-muted">快速 / 高效 / 便捷</h5>
    <translateForm v-on:formSubmit="translate"></translateForm>
    <translateOutput v-bind:text="translatedText"></translateOutput>
  </div>
</template>

<script>

import translateForm from './components/translateForm'
import translateOutput from './components/translateOutput'

export default {
  name: 'App',
  data:function(){
    return {
      translatedText:""
    }
  },
  components: {
    translateForm,
    translateOutput
  },
  methods:{
    translate:function(text,lang){
      // alert(text);
      this.$http.get('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20181216T083105Z.687012c87a141be1.a221d962ddf2a213bfa3a0d9a655be3413df1e57&text='+text+'&lang='+lang+'').then((response)=>{
        // console.log(response.body.text[0]);
          this.translatedText=response.body.text[0];
      })
    }
  }

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
