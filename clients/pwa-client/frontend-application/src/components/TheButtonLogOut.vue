<template>
  <div class="is-flex v-center-content">
    <a class="button is-link" @click="logout()">
      <b-icon icon="logout-variant" size="is-small" />
      <span>Log out</span>
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('logout')
      this.$toast.open({
        message: 'You are now logged out',
        position: 'is-bottom',
        type: 'is-link',
      })
    },
  },
  // TODO regarder localhost + CORS (unrelated, todo can be deleted)
}
</script>

<style scoped>
</style>