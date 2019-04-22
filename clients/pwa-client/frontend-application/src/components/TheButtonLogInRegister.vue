<template>
  <div class="is-flex v-center-content">
    <a class="button is-primary" @click="openLoginModalOpen()">
      <b-icon icon="login-variant" />
      <span>Login or create an account</span>
    </a>
    <b-modal :active.sync="isLoginModalOpen">
      <div class="box">
        <div class="mb-3 columns">
          <div class="column is-flex v-center-content">
            <h5 class="title is-5">Register</h5>
            <b-field label="Username">
              <b-input></b-input>
            </b-field>
            <b-field label="Email">
              <b-input></b-input>
            </b-field>
            <a class="button is-link">
              <b-icon icon="account-plus" size="is-small" />
              <span>Register</span>
            </a>
          </div>
          <div class="column is-flex v-center-content">
            <hr class="divider-small is-hidden-tablet" />
            <h5 class="title is-5">Log in</h5>
            <b-field label="Email">
              <b-input></b-input>
            </b-field>
            <a class="button is-link">
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
export default {
  data: function() {
    return {
      isLoginModalOpen: false,
    }
  },
  methods: {
    openLoginModalOpen: function() {
      this.isLoginModalOpen = true
    },
    closeLoginModalOpen: function() {
      this.isLoginModalOpen = false
    },
  },
}
</script>

<style scoped>
</style>