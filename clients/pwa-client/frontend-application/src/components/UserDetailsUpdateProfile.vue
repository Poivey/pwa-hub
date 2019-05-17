<template>
  <div class="is-flex v-center-content">
    <a class="button is-link" @click="openUpdateUserModal()">
      <b-icon icon="account-edit" />
      <span>Edit your profile</span>
    </a>
    <b-modal :active.sync="isUpdateUserModalOpen">
      <div class="box">
        <div class="mb-3">
          <h3 class="title is-4">
            Update your profile
          </h3>
          <b-field label="Username">
            <b-input v-model="newUsername"></b-input>
          </b-field>
          <b-field label="Email">
            <b-input type="email" v-model="newEmail"></b-input>
          </b-field>
          <b-field label="New profile picture" class="mb-2">
            <b-upload @input="uploadPicture" :disabled="isUploading" accept="image/*">
              <a class="button is-link" :disabled="isUploading">
                <b-icon icon="upload"></b-icon>
                <span>Click to upload</span>
              </a>
            </b-upload>
          </b-field>
        </div>
        <a class="button is-info" @click="closeUpdateUserModal()">
          <b-icon icon="close" />
          <span>Back</span>
        </a>
        <a class="button is-success ml-2" :disabled="isDisabled" @click="updateUser()">
          <b-icon icon="account-edit" />
          <span>Validate these changes</span>
        </a>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import bodyDecoder from '../util/bodyDecoder.js'
import { uploadUserPicture } from '../util/imageStorage.js'

export default {
  data: function() {
    return {
      isUpdateUserModalOpen: false,
      isUploading: false,
      newUsername: '',
      newEmail: '',
    }
  },
  computed: {
    loggedUser: function() {
      return this.$store.getters.getLoggedUser
    },
    isDisabled: function() {
      return !(this.newUsername && this.newEmail)
    },
  },
  methods: {
    openUpdateUserModal: function() {
      this.newUsername = this.loggedUser.username || ''
      this.newEmail = this.loggedUser.email || ''
      this.isUpdateUserModalOpen = true
    },
    closeUpdateUserModal: function() {
      this.isUpdateUserModalOpen = false
    },
    uploadPicture: function(file) {
      if (file.size > 2 * 1024 * 1024) {
        this.$toast.open({
          message: `Please select file < 2 Mo`,
          position: 'is-bottom',
          type: 'is-warning',
        })
        return
      }
      this.$toast.open({
        message: `🕗 Updating ${file.name}...`,
        position: 'is-bottom',
        type: 'is-link',
      })
      this.isUploading = true
      uploadUserPicture(file, this.loggedUser.id, this.loggedUser.email)
        .then(response => {
          this.$store.dispatch('updateLoggedUserPicture', {
            pictureUrl: response.Key,
            isCurrentUser: true,
          })
          this.$toast.open({
            message: `Your profile picture has been updated`,
            position: 'is-bottom',
            type: 'is-success',
          })
        })
        .catch(error => {
          this.$toast.open({
            message: `An error occurred, please try again later`,
            position: 'is-bottom',
            type: 'is-danger',
          })
        })
        .finally(() => (this.isUploading = false))
    },
    updateUser: function() {
      if (!this.isDisabled && this.loggedUser.id && this.loggedUser.email) {
        const username = this.newUsername
        const email = this.newEmail
        const url = `${process.env.VUE_APP_BACKEND_URL}/users/${this.loggedUser.id}`
        axios
          .put(url, { email, username }, { headers: { email: this.loggedUser.email } })
          .then(result => {
            const body = bodyDecoder(result.data)
            this.$store.dispatch('updateLoggedUser', body)
            this.$toast.open({
              message: 'Your informations have been updated',
              position: 'is-bottom',
              type: 'is-success',
            })
            this.closeUpdateUserModal()
          })
          .catch(error => {
            console.log(error.response)
            if (error.response.status === 409) {
              this.$toast.open({
                message: 'Update failed, this email is already taken',
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
