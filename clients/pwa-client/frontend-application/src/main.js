import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import './registerServiceWorker'
import Buefy from 'buefy'

Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')

// TODO savoir comment faire pour remplacer le rôle d'un un service angular
// exemples :
// - plusieurs services pour les requêtes au back
// - service pour se souvenir d'info (userId, devToken ?)

// call http : src/utils/api ? , src/gateway ? export un object avec les requêtes dedans ?
// "service" : mixin (peut regrouper des requêtes souvent faites au même endroit ?)
// https://stackoverflow.com/questions/41164672/whats-the-equivalent-of-angular-service-in-vuejs
// https://juliensalinas.com/fr/connecter-SPA-frontend-vuejs-axios-API-backend/
// https://fr.vuejs.org/v2/cookbook/using-axios-to-consume-apis.html

// persistence : Vuex ?
// https://vuejs.org/v2/guide/state-management.html#Simple-State-Management-from-Scratch
// https://blog.webf.zone/vue-js-answering-the-why-after-15-months-62db797f75cc
// https://vuex.vuejs.org/guide/
