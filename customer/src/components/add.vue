<template>
  <div class="add container">
      <alert v-if="alert" v-bind:message="alert"></alert>
      <h1>添加用户</h1>
      <form v-on:submit="addCustomer">
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
            <button type="submit" class="btn btn-primary">添加</button>
      </form>
  </div>
</template>

<script>
import alert from './alert'
export default {
  name: 'add',
  data () {
    return {
        customer:{},
        alert:""
    }
  },
  methods:{
      addCustomer(e){
          if (!this.customer.name||!this.customer.phone||!this.customer.email){
              this.alert = "请添加对应的信息！"
          }else{
              let newCustomer = {
                  name:this.customer.name,
                  phone:this.customer.phone,
                  email:this.customer.email,
                  education:this.customer.education,
                  graduationschool:this.customer.graduationschool,
                  profession:this.customer.profession,
                  profile:this.customer.profile
              }
              this.$http.post("http://localhost:3000/users",newCustomer).then(
                  function(response){
                      this.$router.push({path:'/',query:{alert:"用户信息添加成功！"}})
                  }
              )
          }
          e.preventDefault();
      }
  },
  components:{
      alert
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
