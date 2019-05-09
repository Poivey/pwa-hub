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
  },
  methods: {
    loadUserDetails: function(userId) {
      console.log(`calling load User Details with id : ${userId}`)
      this.$store.dispatch('loadUser', { userId })
    },
  },
  mounted: function() {
    console.log(`monted user details for ${this.$route.params.id}`)
    this.loadUserDetails(this.$route.params.id)
  },
  beforeRouteUpdate(to, from, next) {
    console.log(`beforeRouteUpdate user details for ${to.params.id}`)
    this.loadUserDetails(to.params.id)
    next()
  },
}
</script>

<style scoped>
</style>
