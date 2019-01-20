// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

// 引入router模块
import VueRouter from 'vue-router'
// 引入resource模块
import VueResource from 'vue-resource'


// import Users from './components/Users'
import home from './components/home'
import HelloWorld from './components/HelloWorld'

Vue.config.productionTip = false
// 使用路由
Vue.use(VueRouter)

Vue.use(VueResource)


// 配置路由
const router = new VueRouter({
	routes:[
		{path:'/',component:home},
		{path:'/hello',component:HelloWorld}
	],
	mode:"history"
})

// 注册全局组件
// Vue.component("users",Users);


/* eslint-disable no-new */
new Vue({
	router,
    el: '#app',
  	components: { App },
  	template: '<App/>'
})
