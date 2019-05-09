import axios from 'axios'
import bodyDecoder from '../util/bodyDecoder.js'

const BACKEND_URL = process.env.VUE_APP_BACKEND_URL

export default {
  state: {
    loggedUser: JSON.parse(localStorage.getItem('loggedUser') || '{}'),
    loggedUserPwas: JSON.parse(localStorage.getItem('loggedUserPwas') || '[]'),
    loggedUserDevToken: localStorage.getItem('loggedUserDevToken') || '',
    currentUser: {},
    currentUserPwas: [],
  },
  mutations: {
    SET_LOGGED_USER(state, { user, pwas }) {
      state.loggedUser = user
      localStorage.setItem('loggedUser', JSON.stringify(user || {}))
      state.loggedUserPwas = pwas
      localStorage.setItem('loggedUserPwas', JSON.stringify(pwas || []))
    },
    UPDATE_LOGGED_USER(state, user) {
      state.loggedUser = user
      localStorage.setItem('loggedUser', JSON.stringify(user || {}))
    },
    ADD_LOGGED_USER_PWA(state, pwa) {
      state.loggedUserPwas.push(pwa)
      localStorage.setItem('loggedUser', JSON.stringify(state.loggedUserPwas || []))
    },
    SET_CURRENT_USER(state, { user, pwas }) {
      state.currentUser = user
      state.currentUserPwas = pwas
    },
    SET_DEV_TOKEN(state, devToken) {
      state.loggedUserDevToken = devToken
      localStorage.setItem('loggedUserDevToken', devToken)
    },
  },
  actions: {
    loadUser(context, { userId, loggedUserEmail }) {
      axios
        .get(`${BACKEND_URL}/users/${userId}`)
        .then(result => {
          const body = bodyDecoder(result.data)
          if (loggedUserEmail) {
            body.user.email = loggedUserEmail
          }
          context.commit(loggedUserEmail ? 'SET_LOGGED_USER' : 'SET_CURRENT_USER', body)
        })
        .catch(console.log)
    },

    updateLoggedUser(context, user) {
      context.commit('UPDATE_LOGGED_USER', user)
    },

    addLoggedUserPwa(context, pwa) {
      context.commit('ADD_LOGGED_USER_PWA', pwa)
    },

    logout(context) {
      context.commit('SET_LOGGED_USER', {})
      context.commit('SET_LOGGED_USER_REVIEW', {}, { root: true })
      context.commit('SET_DEV_TOKEN', '')
    },

    loadDevToken(context, loggedUserId) {
      const userId = loggedUserId || context.getters.getLoggedUser.id
      axios
        .get(`${BACKEND_URL}/users/${userId}/devtoken`)
        .then(result => {
          const body = bodyDecoder(result.data)
          context.commit('SET_DEV_TOKEN', body.devToken)
        })
        .catch(console.log)
    },

    generateDevToken(context) {
      const userId = context.getters.getLoggedUser.id
      axios
        .post(`${BACKEND_URL}/users/${userId}/devtoken`)
        .then(result => {
          const body = bodyDecoder(result.data)
          context.commit('SET_DEV_TOKEN', body.devToken)
        })
        .catch(console.log)
    },

    deleteDevToken(context) {
      const userId = context.getters.getLoggedUser.id
      axios
        .delete(`${BACKEND_URL}/users/${userId}/devtoken`)
        .then(() => {
          context.commit('SET_DEV_TOKEN', '')
        })
        .catch(console.log)
    },
  },
  getters: {
    getLoggedUser(state) {
      return state.loggedUser
    },
    getLoggedUserPwas(state) {
      return state.loggedUserPwas
    },
    getLoggedUserDevToken(state) {
      return state.loggedUserDevToken
    },
    getCurrentUser(state) {
      return state.currentUser
    },
    getCurrentUserPwas(state) {
      return state.currentUserPwas
    },
  },
}
