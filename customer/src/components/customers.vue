<template>
  <div class="customers container">
      <alert v-if="alert" v-bind:message="alert"></alert>
      
      <h1>用户管理系统</h1>
      <input type="text" class="form-control" placeholder="搜索" v-model="filterInput">
      <br>
      <table class="table table-striped">
          <thead>
              <tr>
                  <th>姓名</th>
                  <th>电话</th>
                  <th>邮箱</th>
                  <th></th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="customer in filterBy(customers,filterInput)">
                  <td>{{customer.name}}</td>
                  <td>{{customer.phone}}</td>
                  <td>{{customer.email}}</td>
                  <td><router-link v-bind:to="'/customer/'+customer.id" class="btn btn-default">详情</router-link></td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
import alert from './alert'


export default {
  name: 'customers',
  data () {
    return {
        customers:[],
        alert:'',
        filterInput:""
    }
  },
  methods:{
      fetchCustomers:function(){
          this.$http.get("http://localhost:3000/users").then(function(response){
            //   console.log(response);
            this.customers = response.body;
          })
      },
      filterBy(customers,value){
          return customers.filter(function(customer){
              return customer.name.match(value);
          })
      }
  },
  components:{
      alert
  },
//   组件创建之后立马调用fetchCustomers
  created(){
      if (this.$route.query.alert){
         this.alert =  this.$route.query.alert;
      }
      this.fetchCustomers();
  },
  updated(){
      this.fetchCustomers();    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
