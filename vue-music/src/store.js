import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    singer: {}
  },
  mutations: {
    setSinger(state, singer) {
      state.singer = singer;
    }
  },
  actions: {

  },
  getters: {
    singer: (state) => {
      return state.singer
    }
  }
})
