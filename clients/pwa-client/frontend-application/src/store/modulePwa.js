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
    SET_PWA_ICON(state, iconKey) {
      state.currentPwa.iconUrl = iconKey
    },
    ADD_PWA_SCREENSHOT(state, screenshotKey) {
      if (state.currentPwa.screenshots) {
        state.currentPwa.screenshots.push(screenshotKey)
      } else {
        state.currentPwa.screenshots = [screenshotKey]
      }
    },
    DELETE_PWA_SCREENSHOTS(state, screenshotIndexes) {
      if (state.currentPwa.screenshots) {
        state.currentPwa.screenshots = state.currentPwa.screenshots.filter(
          (_, index) => !screenshotIndexes.includes(index)
        )
      }
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

    updateCurrentPwaIcon(context, iconKey) {
      if (context.getters.getCurrentPwa.id) {
        context.commit('SET_PWA_ICON', iconKey)
      }
    },

    addCurrentScreenshot(context, screenshotKey) {
      if (context.getters.getCurrentPwa.id) {
        context.commit('ADD_PWA_SCREENSHOT', screenshotKey)
      }
    },

    deleteCurrentPwaScreenshots(context, screenshotIndexes) {
      if (context.getters.getCurrentPwa.id) {
        context.commit('DELETE_PWA_SCREENSHOTS', screenshotIndexes)
      }
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
