<template>
  <div class="detail container">
      <router-link to="/" class="btn btn-default">返回</router-link>
      <h1 class="page-header">
          {{customer.name}}
          <span class="pull-right">
              <router-link v-bind:to="'/edit/'+customer.id" class="btn btn-primary">编辑</router-link>
              <button class="btn btn-danger" v-on:click="deleteCustomer(customer.id)">删除</button>
          </span>
      </h1>
      <ul class="list-group">
          <li class="list-group-item"><span class="glyphicon glyphicon-asterisk
">  {{customer.name}}</span></li>
          <li class="list-group-item"><span class="glyphicon glyphicon-phone-alt
">  {{customer.phone}}</span></li>
          <li class="list-group-item"><span class="glyphicon glyphicon-asterisk
">  {{customer.email}}</span></li>
        <br>
          <li class="list-group-item"><span class="glyphicon glyphicon-education
">  {{customer.education}}</span></li>
          <li class="list-group-item"><span class="glyphicon glyphicon-phone-alt
">  {{customer.profession}}</span></li>
          <li class="list-group-item"><span class="glyphicon glyphicon-education
">  {{customer.graduationschool}}</span></li>
          <li class="list-group-item"><span class="glyphicon glyphicon-education
">  {{customer.profile}}</span></li>
      </ul>
  </div>
</template>

<script>
export default {
  name: 'about',
  data () {
    return {
        customer:''
    }
  },
  methods:{
      fetchCustomers:function(id){
          this.$http.get("http://localhost:3000/users/"+id).then(function(response){
              console.log(response);
              this.customer = response.body;
          })
      },
      deleteCustomer:function(id){
        //   console.log(id);
          this.$http.delete("http://localhost:3000/users/"+id).then(function(response){
              this.$router.push({path:"/",query:{alert:"用户删除成功！"}});
          })
      }
  },
  created(){
      this.fetchCustomers(this.$route.params.id);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
