<template>
  <div>
    <div class="box p-1 is-flex carousel">
      <PwaTileSmall v-for="pwa in pwaList" :key="pwa.id" :pwa="pwa" class="mb-0 carousel-item" />
    </div>
  </div>
</template>

<script>
import PwaTileSmall from '@/components/PwaTileSmall.vue'
export default {
  components: {
    PwaTileSmall,
  },
  props: {
    pwaList: {
      type: Array,
      default: () => [],
      required: true,
    },
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
