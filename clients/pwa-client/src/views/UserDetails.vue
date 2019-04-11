<template>
  <section class="section pt-4">
    <div class="container">
      <UserDetailsMainInformations />
      <hr class="divider-small" />
      <a class="button is-primary">Primary</a>
      <a class="button is-info">Info</a>
      <a class="button is-success">Success</a>
      <a class="button is-link">Link</a>
      <a class="button is-warning">Warning</a>
      <a class="button is-danger">Danger</a>
      <UserDetailsPwaList />
    </div>
  </section>
</template>

<script>
import UserDetailsMainInformations from '@/components/UserDetailsMainInformations.vue'
import UserDetailsPwaList from '@/components/UserDetailsPwaList.vue'

export default {
  components: {
    UserDetailsMainInformations,
    UserDetailsPwaList,
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
