<template>
	<div class="test">
		<h1>{{title}}</h1>
		<p v-for="user in users">{{user.name}}/{{user.age}}/{{user.gender}}</p>
		<button v-on:click="clicked">click me</button>
		<p v-if="show">隐藏与显示</p>
		<p v-else>或者显示我</p>
		<p v-show="show">v-show</p>

		<!-- 键盘事件 -->
		<input type="text" v-on:keyup="pressKey" v-on:keyup.enter="pressEnter">
		
		<!-- computed 计算属性 -->
		<hr>
		<label for="">firstName:</label>
		<input type="text" v-model="user.firstName">
		<br>
		<label for="">lastName:</label>
		<input type="text" v-model="user.lastName">
		<br>
		<h2>{{fullName}}</h2>

		<!-- props 属性 -->
		<h3>{{msg}}</h3>

	</div>
</template>

<script type="text/javascript">
	export default{
		props:{
			msg:{
				type:String,
				default:"这是默认值！"
			}
		},
		name:"test",
		data(){
			return {
				title:"Hello Vue.js",
				user:{
					firstName:"Hemon",
					lastName:"KK"
				},
				users:[
				{'name':'kk','age':'23','gender':'male'},
				{'name':'kk','age':'23','gender':'male'},
				{'name':'kk','age':'23','gender':'male'},
				{'name':'kk','age':'23','gender':'male'},
				{'name':'kk','age':'23','gender':'male'}
				],
				show:true
			}
		},

		methods:{
			clicked:function(){
				alert("clicked!")
				this.show = !this.show
			},
			pressKey:function(){
				console.log("pressKey")
			},
			pressEnter:function(){
				console.log("pressEnter")
			}
		},
		computed:{
			fullName:function(){
				return this.user.firstName+" "+this.user.lastName;
			}
		}
	}

	
</script>

<style type="text/css" scoped>

</style>