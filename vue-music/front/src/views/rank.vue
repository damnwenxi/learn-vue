<template>
  <div id="rank">rank</div>
</template>

<script>

export default {
  name: "rank",
  data () {
    return {
      list:''
    }
  },
  created () {
    let params = {"req_0":{"module":"musicToplist.ToplistInfoServer","method":"GetAll","param":{}},"comm":{"g_tk":5381,"uin":0,"format":"json","ct":23,"cv":0}}
    let data = params.toString()
    this.$axios.post('https://u.y.qq.com/cgi-bin/musicu.fcg?_='+Date.now(),{
      headers:{
        'Content-Type': 'application/json'
      }
    },data).then(res=>{
      console.log(res)
    })
  }
};
</script>

<style lang="scss" scoped>
</style>

