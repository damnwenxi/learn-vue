import Vue from 'vue'
import Vuex from 'vuex'
import { shaffle } from './api/util'

Vue.use(Vuex)


// 定义一个播放模式语义化对象
const playMode = {
  // 顺序播放
  sequence: 0,
  // 单曲循环
  loop: 1,
  // 随机播放
  random: 2
}

function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}

export default new Vuex.Store({
  state: {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    mode: playMode.sequence,
    currentIndex: -1,
    currentSong: ''
  },
  mutations: {
    setSinger(state, singer) {
      state.singer = singer;
    },
    setPlayingState(state, flag) {
      state.playing = flag;
    },
    setFullScreen(state, flag) {
      state.fullScreen = flag
    },
    setPlayList(state, list) {
      state.playlist = list
    },
    setSequenceList(state, list) {
      state.sequenceList = list
    },
    setMode(state, mode) {
      state.mode = mode
    },
    setCurrentIndex(state, index) {
      state.currentIndex = index
    },
    setCurrentSong(state,song){
      state.currentSong = song
    }
  },
  actions: {
    // choose a song and play it
    selectPlay({ commit, state }, { list, index }) {
      commit('setSequenceList', list)
      commit('setPlayList', list)
      commit('setCurrentIndex', index)
      commit('setFullScreen', true)
      commit('setPlayingState', true)
    },
    // random play
    randomPlay({ commit }, { list }) {
      commit('setSequenceList', list)
      commit('setMode', 2)
      let randomList = shaffle(list)
      commit('setPlayList', randomList)
      commit('setCurrentIndex', 0)
      commit('setFullScreen', true)
      commit('setPlayingState', true)
    }

  },
  getters: {
    singer: (state) => {
      return state.singer
    },
    isPlaying: (state) => {
      return state.playing
    },
    isFullScreen: (state) => {
      return state.fullScreen
    },
    playlist: (state) => {
      return state.playlist
    },
    sequenceList: (state) => {
      return state.sequenceList
    },
    mode: (state) => {
      return state.mode
    },
    currentIndex: (state) => {
      return state.currentIndex
    },
    currentSong: (state) => {
      return state.currentSong || state.playlist[state.currentIndex] || {}
    }
  }
})
