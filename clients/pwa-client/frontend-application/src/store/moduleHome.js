// This module is a VERY temporary solution
// It uses backend search to get enough PWA to fill home page
// The home page will need a better solution

import axios from 'axios'
import bodyDecoder from '../util/bodyDecoder.js'

const BACKEND_URL = process.env.VUE_APP_BACKEND_URL

const loadHomeData = function(context, lastEvaluatedKey, invocationCount) {
  console.log(`call loadHomeData with count ${invocationCount}`)
  if ((!lastEvaluatedKey && invocationCount) || invocationCount > 3) {
    context.commit('SET_HOME_LOADED', true)
    return
  }
  const params = {}
  if (lastEvaluatedKey) {
    params.startKey = lastEvaluatedKey
  }
  axios
    .get(`${BACKEND_URL}/search/pwa`, { params })
    .then(result => {
      const body = bodyDecoder(result.data)
      context.commit('ADD_HOME_PWA', body.results)
      loadHomeData(context, body.lastEvaluatedKey, (invocationCount || 0) + 1)
    })
    .catch(error => {
      console.log(error)
    })
}

export default {
  state: {
    homePwaList: [],
    isHomeLoaded: false,
  },
  mutations: {
    ADD_HOME_PWA(state, pwaList) {
      state.homePwaList.push(...pwaList)
    },
    SET_HOME_LOADED(state, isHomeLoaded) {
      state.isHomeLoaded = isHomeLoaded
    },
  },
  actions: {
    loadHomePwaList(context) {
      if (!context.getters.isHomeLoaded) {
        loadHomeData(context)
      }
    },
  },
  getters: {
    getHomePwaList(state) {
      return state.homePwaList
    },
    isHomeLoaded(state) {
      return state.isHomeLoaded
    },
  },
}
