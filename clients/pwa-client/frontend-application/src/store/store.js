import Vue from 'vue'
import Vuex from 'vuex'
import moduleHome from './moduleHome'
import modulePwa from './modulePwa'
import moduleSearch from './moduleSearch'
import moduleTheme from './moduleTheme'
import moduleUser from './moduleUser'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    home: moduleHome,
    pwa: modulePwa,
    search: moduleSearch,
    theme: moduleTheme,
    user: moduleUser,
  },
})
