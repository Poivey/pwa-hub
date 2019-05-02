import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

// const BACKEND_URL = process.env.VUE_APP_BACKEND_URL

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

const modulePwa = {
  state: {
    currentPwa: {},
    pwaReviews: [],
    lastReviewKey: undefined,
    loggedUserReview: {},
  },
  mutations: {
    SET_PWA_INFORMATIONS(state, pwa) {
      state.currentPwa = pwa
    },
    SET_REVIEWS(state, body) {
      state.lastReviewKey = body.lastEvaluatedKey
      state.pwaReviews = body.results
    },
    ADD_REVIEWS(state, body) {
      state.lastReviewKey = body.lastEvaluatedKey
      state.pwaReviews.push(body.results)
    },
    SET_LOGGED_USER_REVIEW(state, review) {
      state.loggedUserReview = review
    },
  },
  actions: {
    loadPwa(context, pwaId) {
      axios
        .get(`${BACKEND_URL}/pwa/${pwaId}`)
        .then(result => {
          context.commit('SET_PWA_INFORMATIONS', result.data)
        })
        .catch(console.log)
    },

    loadPwaReviews(context, pwaId) {
      axios
        .get(`${BACKEND_URL}/pwa/${pwaId}/reviews`)
        .then(result => {
          context.commit('SET_REVIEWS', result.data)
        })
        .catch(console.log)
    },

    loadMorePwaReviews(context) {
      const pwaId = context.getters.getCurrentPwa.id
      axios
        .get(`${BACKEND_URL}/pwa/${pwaId}/reviews`, {
          params: { startKey: lastReviewKey },
        })
        .then(result => {
          context.commit('ADD_REVIEWS', { body: result.data, isNewPage })
        })
        .catch(console.log)
    },

    loadLoggedUserPwaReview(context, loggedUserId) {
      const userId = loggedUserId || context.rootGetters.getLoggedUser.id
      if (userId) {
        axios
          .get(`${BACKEND_URL}/pwa/${pwaId}/reviews${userId}`)
          .then(result => {
            context.commit('SET_LOGGED_USER_REVIEW', result.data)
          })
          .catch(console.log)
      } else {
        context.commit('SET_LOGGED_USER_REVIEW', {})
      }
    },
  },
  getters: {
    getCurrentPwa(state) {
      return state.currentPwa
    },
    getPwaReview(state) {
      return state.pwaReviews
    },
    hasPwaMoreReview(state) {
      return !!state.lastReviewKey
    },
    getLoggedUserReview(state) {
      return state.loggedUserReview
    },
  },
}

const moduleUser = {
  state: {
    loggedUser: {},
    loggedUserPwas: [],
    currentUser: {},
    currentUserPwas: [],
  },
  mutations: {
    SET_LOGGED_USER(state, { user, pwas }) {
      state.loggedUser = user
      state.loggedUserPwas = pwas
    },
    SET_CURRENT_USER(state, { user, pwas }) {
      state.currentUser = user
      state.currentUserPwas = pwas
    },
  },
  actions: {
    loadUser(context, { userId, isLoggedUser }) {
      axios
        .get(`${BACKEND_URL}/user/${userId}`)
        .then(result => {
          context.commit(isLoggedUser ? 'SET_LOGGED_USER' : 'SET_CURRENT_USER', result.data)
        })
        .catch(console.log)
    },

    login(context, email) {
      axios
        .get(`${BACKEND_URL}/login`, {
          headers: { email: email },
        })
        .then(result => {
          context.dispatch('loadUser', { userId: result.data.id, isLoggedUser: true })
          context.dispatch('loadLoggedUserPwaReview', result.data.id, { root: true })
        })
        .catch(console.log)
    },

    logout(context) {
      context.commit('SET_LOGGED_USER', {})
    },
  },
  getters: {
    getLoggedUser(state) {
      return state.loggedUser
    },
    getCurrentUser(state) {
      return state.currentUser
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
    pwa: modulePwa,
    user: moduleUser,
  },
})
