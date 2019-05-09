<template>
  <div class="is-flex v-center-content">
    <a class="button is-warning" @click="openUpdatePwaModal()">
      <b-icon icon="pencil" />
      <span>Edit this PWA</span>
    </a>
    <b-modal :active.sync="isUpdatePwaModalOpen">
      <div class="box">
        <div class="mb-3">
          <h3 class="title is-4">Edit {{ currentPwa.name }} informations</h3>

          <b-field label="PWA name">
            <b-input v-model="updatedPwa.name"></b-input>
          </b-field>

          <b-field label="PWA url">
            <b-input v-model="updatedPwa.url"></b-input>
          </b-field>

          <b-field label="Category">
            <b-select v-model="updatedPwa.category" icon="filter">
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
              </option>
            </b-select>
          </b-field>

          <b-field label="PWA description">
            <b-input
              v-model="updatedPwa.description"
              size="is-small"
              maxlength="5000"
              type="textarea"
            ></b-input>
          </b-field>
        </div>
        <a class="button is-info" @click="closeUpdateUserModal()">
          <b-icon icon="close" />
          <span>Back</span>
        </a>
        <a class="button is-success ml-2" :disabled="isDisabled" @click="updatePwaInformations()">
          <b-icon icon="pencil" />
          <span>Validate these changes</span>
        </a>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import bodyDecoder from '../util/bodyDecoder.js'
import categories from '../util/categories.js'

export default {
  data: function() {
    return {
      isUpdatePwaModalOpen: false,
      categories: categories,
      updatedPwa: {
        name: '',
        url: '',
        category: categories[0],
        description: '',
      },
    }
  },
  computed: {
    currentPwa: function() {
      return this.$store.getters.getCurrentPwa
    },
    devToken: function() {
      return this.$store.getters.getLoggedUserDevToken
    },
    isDisabled: function() {
      return !(
        this.updatedPwa.name &&
        this.updatedPwa.url &&
        this.categories.includes(this.updatedPwa.category) &&
        this.updatedPwa.description
      )
    },
  },
  methods: {
    openUpdatePwaModal: function() {
      this.updatedPwa.name = this.currentPwa.name
      this.updatedPwa.url = this.currentPwa.url
      this.updatedPwa.category = this.currentPwa.category
      this.updatedPwa.description = this.currentPwa.description
      this.isUpdatePwaModalOpen = true
    },
    closeUpdatePwaModal: function() {
      this.isUpdatePwaModalOpen = false
    },
    updatePwaInformations: function() {
      if (!this.isDisabled && this.currentPwa.id && this.devToken) {
        const url = `${process.env.VUE_APP_BACKEND_URL}/pwa/${this.currentPwa.id}`
        axios
          .put(url, { ...this.updatedPwa }, { headers: { devtoken: this.devToken } })
          .then(result => {
            const body = bodyDecoder(result.data)
            this.$store.dispatch('updateCurrentPwa', body)
            this.$toast.open({
              message: 'PWA informations have been updated',
              position: 'is-bottom',
              type: 'is-success',
            })
            this.closeUpdatePwaModal()
          })
          .catch(error => {
            console.log(error.response)
            if (error.response.status === 409) {
              this.$toast.open({
                message: 'Update failed, this url is already used',
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