import axios from 'axios'
import bodyDecoder from '../util/bodyDecoder.js'

const BACKEND_URL = process.env.VUE_APP_BACKEND_URL

const searchPwa = function(context, { givenInput, givenCategory, loadMoreResults }) {
  const input = (givenInput || context.getters.getSearchInput).trim()
  const category = (givenCategory || context.getters.getSearchCategory).toLowerCase()
  const lastSearchResultKey = context.getters.getLastSearchResultKey
  const params = { input }
  if (lastSearchResultKey) {
    params.startKey = lastSearchResultKey
  }
  axios
    .get(`${BACKEND_URL}/search/pwa/${category}`, { params })
    .then(result => {
      context.commit(
        loadMoreResults ? 'ADD_SEARCH_RESULTS' : 'SET_SEARCH_RESULTS',
        bodyDecoder(result.data)
      )
    })
    .catch(error => {
      console.log(error)
    })
}

export default {
  state: {
    searchInput: '',
    searchCategory: '',
    searchResults: [],
    lastSearchResultKey: undefined,
  },
  mutations: {
    SET_SEARCH_INPUT(state, input) {
      state.searchInput = input
    },
    SET_SEARCH_CATEGORY(state, category) {
      state.searchCategory = category
    },
    SET_SEARCH_RESULTS(state, body) {
      state.lastSearchResultKey = body.lastEvaluatedKey
      state.searchResults = body.results
    },
    ADD_SEARCH_RESULTS(state, body) {
      state.lastSearchResultKey = body.lastEvaluatedKey
      state.searchResults.push(...body.results)
    },
  },
  actions: {
    setSearchInput(context, input) {
      context.commit('SET_SEARCH_INPUT', input)
      searchPwa(context, { input })
    },
    setSearchCategory(context, category) {
      context.commit('SET_SEARCH_CATEGORY', category)
      searchPwa(context, { category })
    },
    getMoreResults(context) {
      searchPwa(context, { loadMoreResults: true })
    },
  },
  getters: {
    getSearchInput(state) {
      return state.searchInput
    },
    getSearchCategory(state) {
      return state.searchCategory
    },
    getSearchResults(state) {
      return state.searchResults
    },
    getLastSearchResultKey(state) {
      return state.lastSearchResultKey
    },
  },
}
