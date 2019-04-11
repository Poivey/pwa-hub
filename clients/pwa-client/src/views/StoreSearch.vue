<template>
  <section class="section pt-4">
    <div class="container is-flex center-content">
      <StoreSearchCategorySelector class="mb-4" />
      <div class="results is-flex mb-0">
        <!-- <PwaTileMedium
          nickname="poiv8"
          avatar-url="https://i.imgur.com/L1tZTGS.png"
          email="antoine.poivey@gmail.com"
          :comment-count="3"
          :grade-given-count="10"
        /> -->
        <PwaTileMedium class="mb-2" />
        <PwaTileMedium class="mb-2" />
        <PwaTileMedium class="mb-2" />
        <PwaTileMedium class="mb-2" />
        <PwaTileMedium class="mb-2" />
        <PwaTileMedium class="mb-2" />
        <PwaTileMedium class="mb-2" />
        <PwaTileMedium class="mb-2" />
        <PwaTileMedium class="mb-2" />
        <PwaTileMedium class="mb-2" />
      </div>
      <div class="results is-flex mb-4">
        <PwaTileSmall class="mb-2" />
        <PwaTileSmall class="mb-2" />
        <PwaTileSmall class="mb-2" />
        <PwaTileSmall class="mb-2" />
        <PwaTileSmall class="mb-2" />
        <PwaTileSmall class="mb-2" />
        <PwaTileSmall class="mb-2" />
        <PwaTileSmall class="mb-2" />
        <PwaTileSmall class="mb-2" />
        <PwaTileSmall class="mb-2" />
      </div>
      <PwaCarousel class="mb-4" />
      <StoreSearchButtonMoreResults />
    </div>
  </section>
</template>

<script>
import PwaTileMedium from '@/components/PwaTileMedium'
import PwaTileSmall from '@/components/PwaTileSmall'
import StoreSearchCategorySelector from '@/components/StoreSearchCategorySelector.vue'
import StoreSearchButtonMoreResults from '@/components/StoreSearchButtonMoreResults.vue'
import PwaCarousel from '@/components/PwaCarousel.vue'

export default {
  components: {
    PwaTileMedium,
    PwaTileSmall,
    StoreSearchCategorySelector,
    StoreSearchButtonMoreResults,
    PwaCarousel,
  },
}
</script>

<style scoped>
.results {
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.center-content {
  flex-direction: column;
  align-items: center;
}
</style>
