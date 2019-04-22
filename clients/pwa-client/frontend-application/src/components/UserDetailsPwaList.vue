<template>
  <div class="container is-flex v-center-content">
    <h3 class="title is-5 mb-3 mt-0">Available PWAs</h3>
    <div class="is-flex flex-column mb-0">
      <PwaTileMedium class="mb-2" />
      <PwaTileMedium class="mb-2" />
      <PwaTileMedium class="mb-2" />
      <PwaTileMedium class="mb-2" />
      <PwaTileMedium class="mb-2" />
      <PwaTileMedium class="mb-2" />
      <PwaTileMedium class="mb-2" />
      <PwaTileMedium class="mb-2" />
    </div>
  </div>
</template>

<script>
import PwaTileMedium from '@/components/PwaTileMedium.vue'
export default {
  components: {
    PwaTileMedium,
  },
}
</script>

<style scoped>
</style>
