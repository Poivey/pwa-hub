export default {
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
