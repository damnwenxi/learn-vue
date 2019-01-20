<template>
  <div class="update container">
      <alert v-if="alert" v-bind:message="alert"></alert>
      <h1>更新用户信息</h1>
      <form v-on:submit="updateCustomer">
          <div class="well">
              <h4>用户信息</h4>
              <div class="form-group">
                  <label for="">姓名</label>
                  <input type="text" class="form-control" placeholder="name" v-model="customer.name">
              </div>
              <div class="form-group">
                  <label for="">电话</label>
                  <input type="text" class="form-control" placeholder="phone number" v-model="customer.phone">
              </div>
              <div class="form-group">
                  <label for="">邮箱</label>
                  <input type="text" class="form-control" placeholder="email" v-model="customer.email">
              </div>
              <div class="form-group">
                  <label for="">学历</label>
                  <input type="text" class="form-control" placeholder="education" v-model="customer.education">
              </div>
              <div class="form-group">
                  <label for="">毕业学校</label>
                  <input type="text" class="form-control" placeholder="graduationschool" v-model="customer.graduationschool">
              </div>
              <div class="form-group">
                  <label for="">职业</label>
                  <input type="text" class="form-control" placeholder="profession" v-model="customer.profession">
              </div>
              <div class="form-group">
                  <label for="">个人简历</label>
                  <textarea class="form-control" rows="3" placeholder="edit hear" v-model="customer.profile"></textarea>
              </div>
            </div>
            <button type="submit" class="btn btn-primary">更新</button>
      </form>
  </div>
</template>

<script>
import alert from './alert'
export default {
  name: 'edit',
  data () {
    return {
        customer:{},
        alert:''
    }
  },
  methods:{
      fetchCustomer(id){
          this.$http.get("http://localhost:3000/users/"+id).then(function(response){
              this.customer = response.body;
          })
      },

      updateCustomer(e){
          if (!this.customer.name||!this.customer.phone||!this.customer.email){
              this.alert = "请添加对应的信息！"
          }else{
              let updateCustomer = {
                  name:this.customer.name,
                  phone:this.customer.phone,
                  email:this.customer.email,
                  education:this.customer.education,
                  graduationschool:this.customer.graduationschool,
                  profession:this.customer.profession,
                  profile:this.customer.profile
              }
              this.$http.put("http://localhost:3000/users/"+this.$route.params.id,updateCustomer).then(
                  function(response){
                      this.$router.push({path:'/',query:{alert:"用户信息更新成功！"}})
                  }
              )
          }
          e.preventDefault();
      }
   },
   created(){
       this.fetchCustomer(this.$route.params.id);
   },
   components:{
       alert
   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
