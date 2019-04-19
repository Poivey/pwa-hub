import Vue from 'vue'
import Router from 'vue-router'
import StoreSearch from './views/StoreSearch.vue'
import StoreHome from './views/StoreHome.vue'
import PwaDetails from './views/PwaDetails.vue'
import UserDetails from './views/UserDetails.vue'

Vue.use(Router)

// Documentation -> https://router.vuejs.org

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/search',
      name: 'search',
      component: StoreSearch,
    },
    {
      path: '/pwa/:id',
      name: 'pwa',
      component: PwaDetails,
    },
    {
      path: '/user/:id',
      name: 'user',
      component: UserDetails,
    },
    {
      path: '/*',
      name: 'home',
      component: StoreHome,
    },
  ],
})
