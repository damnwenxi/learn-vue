import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vueLazyLoad from "vue-lazyload";
import axios from 'axios';

Vue.use(vueLazyLoad, {
  loading: require("./assets/images/logo.png"),
  attempt: 1
});
Vue.config.productionTip = false;
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
