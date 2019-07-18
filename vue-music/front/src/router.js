import Vue from 'vue'
import Router from 'vue-router'
import rank from './views/rank'
import recommend from './views/recommend'
import singer from './views/singer'
import search from './views/search'
import singerDetail from './views/singerDetail'



Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      name: 'recommend',
      component: recommend
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer
      // lazy load router
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/singer/:id',
      component: singerDetail
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank
    }
  ]
})
