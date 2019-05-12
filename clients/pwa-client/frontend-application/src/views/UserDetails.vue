<template>
  <section class="section pt-4">
    <div class="container">
      <UserDetailsMainInformations />
      <div v-if="isLoggedUser">
        <UserDetailsUpdateProfile class="mt-3" />
        <hr class="divider-small" />
        <UserDetailsDeveloperOptions />
      </div>
      <div v-if="hasCurrentUserCreatedPwa">
        <hr class="divider-small" />
        <UserDetailsPwaList />
      </div>
    </div>
    <b-loading :active.sync="isLoading"></b-loading>
  </section>
</template>

<script>
import UserDetailsDeveloperOptions from '@/components/UserDetailsDeveloperOptions.vue'
import UserDetailsMainInformations from '@/components/UserDetailsMainInformations.vue'
import UserDetailsPwaList from '@/components/UserDetailsPwaList.vue'
import UserDetailsUpdateProfile from '@/components/UserDetailsUpdateProfile.vue'

export default {
  components: {
    UserDetailsDeveloperOptions,
    UserDetailsMainInformations,
    UserDetailsPwaList,
    UserDetailsUpdateProfile,
  },
  computed: {
    isLoggedUser: function() {
      const loggedUser = this.$store.getters.getLoggedUser
      return loggedUser && loggedUser.id === this.$route.params.id
    },
    hasCurrentUserCreatedPwa: function() {
      return !!this.$store.getters.getCurrentUserPwas.length
    },
    isLoading: function() {
      const routeUserId = this.$route.params.id
      return routeUserId !== this.$store.getters.getCurrentUser.id
    },
  },
  methods: {
    loadUserDetails: function(userId) {
      this.$store.dispatch('loadUser', { userId })
    },
  },
  mounted: function() {
    this.loadUserDetails(this.$route.params.id)
  },
  beforeRouteUpdate(to, from, next) {
    this.loadUserDetails(to.params.id)
    next()
  },
}
</script>

<style scoped>
</style>
