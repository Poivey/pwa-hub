<template>
  <div>
    <div class="box p-1 is-flex carousel">
      <PwaTileSmall class="mb-0 carousel-item" />
      <PwaTileSmall class="mb-0 carousel-item" />
      <PwaTileSmall class="mb-0 carousel-item" />
      <PwaTileSmall class="mb-0 carousel-item" />
      <PwaTileSmall class="mb-0 carousel-item" />
      <PwaTileSmall class="mb-0 carousel-item" />
      <PwaTileSmall class="mb-0 carousel-item" />
    </div>
  </div>
</template>

<script>
import PwaTileSmall from '@/components/PwaTileSmall.vue'
export default {
  components: {
    PwaTileSmall,
  },
}
</script>

<style scoped>
.carousel {
  align-items: center;
  width: 300px;
  overflow: auto;
}
.carousel-item {
  flex-shrink: 0;
}
.carousel-item + .carousel-item {
  margin-left: 0.25rem;
}
</style>
