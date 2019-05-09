<template>
  <router-link :to="`/user/${loggedUser.id}`" tag="div" class="cursor-pointer">
    <div class="is-flex v-center-content">
      <figure class="image is-128x128">
        <img src="https://bulma.io/images/placeholders/480x480.png" />
      </figure>
      <p class="mt-2">{{ loggedUser.username }}</p>
      <p class="mt-2 has-text-grey-light">{{ loggedUser.email }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  computed: {
    loggedUser: function() {
      return this.$store.getters.getLoggedUser
    },
  },
}
</script>

<style scoped>
</style>