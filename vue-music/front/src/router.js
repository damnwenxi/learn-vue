import Vue from "vue";
import Router from "vue-router";
import rank from "./views/rank";
import recommend from "./views/recommend";
import singer from "./views/singer";
import search from "./views/search";
import singerDetail from "./views/singerDetail";
import playlistDetail from "./views/playlistDetail";
import rankDetail from './views/rankDetail';

Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [
    {
      path: "/",
      redirect: "/recommend"
    },
    {
      path: "/recommend",
      name: "recommend",
      component: recommend
    },
    {
      path: "/singer",
      name: "singer",
      component: singer
      // lazy load router
      // component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: "/singer/:id",
      component: singerDetail
    },
    {
      path: "/playlist/:id",
      component: playlistDetail
    },
    {
      path: "/search",
      name: "search",
      component: search
    },
    {
      path: "/rank",
      name: "rank",
      component: rank
    },
    {
      path: "/rank/:id",
      component: rankDetail
    },
  ]
});
