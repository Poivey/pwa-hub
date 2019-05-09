import axios from 'axios'
import bodyDecoder from '../util/bodyDecoder.js'

const BACKEND_URL = process.env.VUE_APP_BACKEND_URL

export default {
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
      state.pwaReviews.push(...body.results)
    },
    SET_LOGGED_USER_REVIEW(state, review) {
      state.loggedUserReview = review
    },
    UPDATE_LOGGED_USER_REVIEW(state, { content, rate }) {
      state.loggedUserReview = { content, rate }
    },
  },
  actions: {
    loadPwa(context, pwaId) {
      axios
        .get(`${BACKEND_URL}/pwa/${pwaId}`)
        .then(result => {
          context.commit('SET_PWA_INFORMATIONS', bodyDecoder(result.data))
        })
        .catch(console.log)
    },

    updateCurrentPwa(context, pwa) {
      context.commit('SET_PWA_INFORMATIONS', pwa)
    },

    loadPwaReviews(context, pwaId) {
      axios
        .get(`${BACKEND_URL}/pwa/${pwaId}/reviews`)
        .then(result => {
          context.commit('SET_REVIEWS', bodyDecoder(result.data))
        })
        .catch(console.log)
    },

    loadMorePwaReviews(context) {
      const pwaId = context.getters.getCurrentPwa.id
      const lastReviewKey = context.getters.getLastReviewKey
      axios
        .get(`${BACKEND_URL}/pwa/${pwaId}/reviews`, {
          params: { startKey: lastReviewKey },
        })
        .then(result => {
          context.commit('ADD_REVIEWS', bodyDecoder(result.data))
        })
        .catch(console.log)
    },

    loadLoggedUserPwaReview(context, { loggedUserId, currentPwaId }) {
      const userId = loggedUserId || context.rootGetters.getLoggedUser.id
      const pwaId = currentPwaId || context.getters.getCurrentPwa.id
      if (userId && pwaId) {
        axios
          .get(`${BACKEND_URL}/pwa/${pwaId}/reviews/${userId}`)
          .then(result => {
            console.log(result)
            context.commit('SET_LOGGED_USER_REVIEW', bodyDecoder(result.data))
          })
          .catch(console.log)
      } else {
        context.commit('SET_LOGGED_USER_REVIEW', {})
      }
    },

    updateLoggedUserPwaReview(context, { content, rate }) {
      context.commit('UPDATE_LOGGED_USER_REVIEW', { content, rate })
    },
  },
  getters: {
    getCurrentPwa(state) {
      return state.currentPwa
    },
    getPwaReview(state) {
      return state.pwaReviews
    },
    getLastReviewKey(state) {
      return state.lastReviewKey
    },
    getLoggedUserReview(state) {
      return state.loggedUserReview
    },
  },
}
