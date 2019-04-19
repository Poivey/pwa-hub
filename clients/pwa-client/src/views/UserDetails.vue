<template>
  <section class="section pt-4">
    <div class="container">
      <UserDetailsMainInformations />
      <div v-if="true">
        <UserDetailsUpdateProfile class="mt-3" />
        <hr class="divider-small" />
        <UserDetailsDeveloperOptions />
      </div>
      <hr class="divider-small" />
      <UserDetailsPwaList />
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
  mounted: function() {
    console.log(`hello, world ! this is user details`)
    console.log(`set current user to ${this.$route.params.id}`)
  },
}
</script>

<style scoped>
.divider-small {
  width: 10rem;
  margin-left: auto;
  margin-right: auto;
}
</style>
