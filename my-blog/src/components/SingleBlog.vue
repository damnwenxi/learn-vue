<template>
	<div class="single-blog">
		<div class="item">
	      <h2>{{blog.title}}</h2>
	      <article>{{blog.body}}</article>
	    </div>
	</div>
</template>

<script>
	export default{
		name:"single-blog",
		data(){
			return{
				id:this.$route.params.id,
				blog:{}
			}
		},
		created(){
			this.$http.get("https://jsonplaceholder.typicode.com/posts/"+this.id).then(function(data){

				this.blog = data.body;
			})
		}
	}
</script>

<style scoped>
.item{
    padding: 20px;
    border-radius: 5px;
    background-color: #ddd;
    margin-top: 10px;
  }

	
</style>