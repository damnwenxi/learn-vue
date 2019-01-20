<template>
	<div class="user">
		<h1>User</h1>

		<!-- 添加用户信息 -->
		<form v-on:submit="addUser">
			<input type="text" v-model="userinfo.name" placeholder="enterName">
			<input type="text" v-model="userinfo.age" placeholder="enterAge">
			<input type="submit" value="add">
		</form>
		<!-- 展示用户信息 -->
		<ul>
			<li v-for="user in users">
				<input type="checkbox" class="toggle" v-model="user.contacted">
				<span :class="{contacted:user.contacted}">
					{{user.name}} : {{user.age}}
					<button v-on:click="deleteUser(user)">del</button>
				</span>
			</li>
		</ul>

	</div>
</template>

<script type="text/javascript">
	export default{

		name:"user",
		data(){
			return {
				userinfo:{},
				users:[
				// {'name':'emily','age':23,'contacted':false},
				// {'name':'buffy','age':24,'contacted':false},
				// {'name':'nunfy','age':27,'contacted':false}
				]
			}
		},

		methods:{
			addUser:function(e){
				this.users.push({
					name:this.userinfo.name,
					age:this.userinfo.age,
					contacted:false
				});
				e.preventDefault();
			},
			deleteUser:function(user){
				this.users.splice(this.users.indexOf(user),1)
			}
		},
		created:function(){
			this.$http.get("https://jsonplaceholder.typicode.com/users").then(function(response){
				// console.log(response);
				this.users=response.body;
			})
		}
	}

	
</script>

<style type="text/css" scoped>
	.contacted{
		text-decoration: line-through;
	}
</style>