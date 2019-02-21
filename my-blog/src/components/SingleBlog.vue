<template>
	<div v-theme="'wide'" class="single-blog">
		<div class="item">
	      <h2>{{blog.title}}</h2>
	      <article>{{blog.content}}</article>
		  <p>作者：{{blog.author}}</p>
		  <p>分类：{{blog.categories}}</p>
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
			this.$http.get("https://wd8587891064eqnnsv.wilddogio.com/posts/"+this.id+".json").then(function(data){

				// this.blog = data.body;
				// console.log(data);
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

.single-blog{
	margin: 10px auto;
}

	
</style>