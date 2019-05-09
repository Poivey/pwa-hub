<template>
  <div class="is-flex v-center-content">
    <b-switch v-model="isDeveloperModeEnabled">
      Open developer mode <b-icon icon="wrench" size="is-small" />
    </b-switch>
    <div v-if="isDeveloperModeEnabled">
      <div class="is-flex v-center-content mt-3">
        <h3 class="title">Developer token</h3>
        <div class="box has-text-centered">
          {{
            devToken ||
              'You can generate a developer token to register new PWA and update their informations.'
          }}
        </div>
        <div>
          <a class="button is-link" @click="generateDevToken()">Generate a new token</a>
          <a class="button is-danger ml-2" :disabled="!devToken" @click="deleteDevToken()">
            Delete this token
          </a>
        </div>
      </div>
      <div class="is-flex v-center-content mt-3" v-if="devToken">
        <h3 class="title">Register a new PWA</h3>
        <div class="is-full-width">
          <b-field label="PWA name">
            <b-input v-model="newPwa.name"></b-input>
          </b-field>

          <b-field label="PWA url">
            <b-input v-model="newPwa.url"></b-input>
          </b-field>

          <b-field label="Category">
            <b-select v-model="newPwa.category" icon="filter">
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </b-select>
          </b-field>

          <b-field label="PWA description">
            <b-input
              v-model="newPwa.description"
              size="is-small"
              maxlength="5000"
              type="textarea"
            ></b-input>
          </b-field>
        </div>
        <a class="button is-link" @click="registerPwa()" :disabled="isNewPwaCreationDisabled">
          Register a PWA
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import bodyDecoder from '../util/bodyDecoder.js'
import categories from '../util/categories.js'

export default {
  data: function() {
    return {
      isDeveloperModeEnabled: false,
      categories: categories,
      newPwa: {
        name: '',
        url: '',
        category: categories[0],
        description: '',
      },
    }
  },
  computed: {
    devToken: function() {
      return this.$store.getters.getLoggedUserDevToken
    },
    isNewPwaCreationDisabled: function() {
      return !(
        this.devToken &&
        this.newPwa.name &&
        this.newPwa.url &&
        this.newPwa.description &&
        this.categories.includes(this.newPwa.category)
      )
    },
  },
  methods: {
    generateDevToken: function() {
      this.$store.dispatch('generateDevToken')
    },
    deleteDevToken: function() {
      this.$store.dispatch('deleteDevToken')
    },
    registerPwa: function() {
      if (!this.isNewPwaCreationDisabled) {
        axios
          .post(
            `${process.env.VUE_APP_BACKEND_URL}/pwa`,
            { ...this.newPwa },
            { headers: { devtoken: this.devToken } }
          )
          .then(result => {
            const createdPwa = bodyDecoder(result.data)
            this.$store.dispatch('addLoggedUserPwa', createdPwa)
            this.$toast.open({
              message: `You created ${createdPwa.name}`,
              position: 'is-bottom',
              type: 'is-success',
            })
            this.$router.push(`/pwa/${createdPwa.id}`)
          })
          .catch(error => {
            console.log(error)
            if (error.response.status === 409) {
              this.$toast.open({
                message: 'Creation failed, this url is taken by another PWA',
                position: 'is-bottom',
                type: 'is-danger',
              })
            } else {
              this.$toast.open({
                message: 'There was an error, please try again later',
                position: 'is-bottom',
                type: 'is-danger',
              })
            }
          })
      }
    },
  },
}
</script>

<style scoped>
</style>
