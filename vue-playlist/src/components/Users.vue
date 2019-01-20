<template>
  <div class="users">
    <h1>Hello Users</h1>
    <ul>
      <li v-for="user in users">
        <h2>{{user.name}}</h2> 
        <h3>{{user.email}}</h3>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'users',
  data () {
    return {
      users: [
        // {name:'henry',position:'web开发',show:false},
        // {name:'henry',position:'web开发',show:false},
        // {name:'henry',position:'web开发',show:false},
        // {name:'henry',position:'web开发',show:false},
        // {name:'henry',position:'web开发',show:false},
        // {name:'henry',position:'web开发',show:false},
        // {name:'henry',position:'web开发',show:false},
        // {name:'henry',position:'web开发',show:false},
        // {name:'henry',position:'web开发',show:false},
        // {name:'henry',position:'web开发',show:false},
        // {name:'henry',position:'web开发',show:false},
      ],
    }
  },
  created(){
    this.$http.get("https://jsonplaceholder.typicode.com/users").then((data) => {
      // console.log(data);
      this.users = data.body;
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .users{
    width: 100%;
    max-width: 1200px;
    margin: 40px auto;
    padding: 0 20px;
    /*边框和内边距的值是包含在width内的*/
    box-sizing: border-box;
  }

  .users ul{
    display: flex;
    /*flex元素被打断到多行中*/
    flex-wrap: wrap;
    list-style: none;
    padding: 0;

  }

  .users li{
    flex-grow: 1;
    flex-basis: 200px;
    text-align: center;
    padding: 30px;
    border: 1px solid #222;
    margin: 10px;
  }

  

</style>
