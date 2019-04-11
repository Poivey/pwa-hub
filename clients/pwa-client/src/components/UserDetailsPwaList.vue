<template>
  <div class="container is-flex center-content">
    <h3 class="title is-5 mb-3 mt-0">Available PWAs</h3>
    <div class="published-pwa-wrapper is-flex mb-0">
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
.published-pwa-wrapper {
  flex-direction: column;
}
.center-content {
  flex-direction: column;
  align-items: center;
}
</style>
