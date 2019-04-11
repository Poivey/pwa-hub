import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const moduleTheme = {
  state: {
    isDarkTheme: localStorage.getItem('isDarkTheme'),
  },
  mutations: {
    SET_DARK_THEME(state, darkThemeStatus) {
      state.isDarkTheme = darkThemeStatus
      localStorage.setItem('isDarkTheme', darkThemeStatus ? 'true' : '')
    },
  },
  actions: {
    setDarkThemeStatus(context, darkThemeStatus) {
      context.commit('SET_DARK_THEME', darkThemeStatus)
    },
  },
  getters: {
    isDarkThemeActive(state) {
      return state.isDarkTheme
    },
  },
}

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    theme: moduleTheme,
  },
})
