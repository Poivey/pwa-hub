<template>
  <div class="is-flex v-center-content">
    <a class="button is-primary" @click="openLoginModal()">
      <b-icon icon="login-variant" />
      <span>Login or create an account</span>
    </a>
    <b-modal :active.sync="isLoginModalOpen">
      <div class="box">
        <div class="mb-3 columns">
          <div class="column is-flex v-center-content">
            <h5 class="title is-5">Register</h5>
            <b-field label="Username">
              <b-input v-model="registerUsername"></b-input>
            </b-field>
            <b-field label="Email">
              <b-input v-model="registerEmail"></b-input>
            </b-field>
            <a class="button is-link" :disabled="isRegisterDisabled" @click="register()">
              <b-icon icon="account-plus" size="is-small" />
              <span>Register</span>
            </a>
          </div>
          <div class="column is-flex v-center-content">
            <hr class="divider-small is-hidden-tablet" />
            <h5 class="title is-5">Log in</h5>
            <b-field label="Email">
              <b-input v-model="loginEmail"></b-input>
            </b-field>
            <a class="button is-link" :disabled="isLoginDisabled" @click="login()">
              <b-icon icon="login-variant" size="is-small" />
              <span>Log in</span>
            </a>
          </div>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import axios from 'axios'
import bodyDecoder from '../util/bodyDecoder.js'

export default {
  data: function() {
    return {
      isLoginModalOpen: false,
      loginEmail: '',
      registerEmail: '',
      registerUsername: '',
    }
  },
  computed: {
    isLoginDisabled: function() {
      return !this.loginEmail
    },
    isRegisterDisabled: function() {
      return !this.registerEmail || !this.registerUsername
    },
  },
  methods: {
    openLoginModal: function() {
      this.isLoginModalOpen = true
    },
    closeLoginModal: function() {
      this.isLoginModalOpen = false
    },
    register: function() {
      if (!this.isRegisterDisabled) {
        axios
          .post(`${process.env.VUE_APP_BACKEND_URL}/users`, {
            email: this.registerEmail,
            username: this.registerUsername,
          })
          .then(result => {
            const body = bodyDecoder(result.data)
            console.log(body)
            this.$store.dispatch('updateLoggedUser', body)
            this.$toast.open({
              message: 'Your account has beed created',
              position: 'is-bottom',
              type: 'is-success',
            })
            this.closeLoginModal()
          })
          .catch(error => {
            console.log(error)
            if (error.response.status === 409) {
              this.$toast.open({
                message: 'Failed to register, this email is already used',
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
    login: function() {
      if (!this.isLoginDisabled) {
        const email = this.loginEmail
        axios
          .get(`${process.env.VUE_APP_BACKEND_URL}/login`, { headers: { email } })
          .then(result => {
            const body = bodyDecoder(result.data)
            console.log(body)
            this.$store.dispatch('loadUser', { userId: body.id, loggedUserEmail: email })
            this.$store.dispatch('loadLoggedUserPwaReview', { loggedUserId: body.id })
            this.$store.dispatch('loadDevToken', body.id)
            this.$toast.open({
              message: 'You are now logged in',
              position: 'is-bottom',
              type: 'is-success',
            })
            this.closeLoginModal()
          })
          .catch(error => {
            console.log(error)
            this.$toast.open({
              message: 'Failed to log in, please check your email is correct',
              position: 'is-bottom',
              type: 'is-danger',
            })
          })
      }
    },
  },
}
</script>

<style scoped>
</style>