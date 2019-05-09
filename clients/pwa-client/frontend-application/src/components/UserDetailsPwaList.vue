<template>
  <div class="container is-flex v-center-content">
    <h3 class="title is-5 mb-3 mt-0">Available PWAs</h3>
    <div class="is-flex flex-column mb-0">
      <PwaTileMedium v-for="pwa in pwas" :key="pwa.id" :pwa="pwa" class="mb-2" />
    </div>
  </div>
</template>

<script>
import PwaTileMedium from '@/components/PwaTileMedium.vue'
export default {
  components: {
    PwaTileMedium,
  },
  computed: {
    pwas() {
      const currentUsername = this.$store.getters.getCurrentUser.username
      const currentUserPwas = this.$store.getters.getCurrentUserPwas || []
      return currentUserPwas.map(pwa => {
        pwa.creatorUsername = currentUsername
        return pwa
      })
    },
  },
}
</script>

<style scoped>
</style>
