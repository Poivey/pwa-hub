<template>
  <section class="section pt-4">
    <div class="container is-flex v-center-content">
      <StoreSearchCategorySelector class="mb-4" />
      <div class="results is-flex is-full-width mb-2">
        <div v-if="!searchResults.length" class="box">
          Nothing here 😢
        </div>
        <PwaTileMedium v-for="pwa in searchResults" :key="pwa.id" :pwa="pwa" class="mb-2 mx-1" />
      </div>
      <StoreSearchButtonMoreResults v-if="hasMoreResults" />
    </div>
  </section>
</template>

<script>
import PwaTileMedium from '@/components/PwaTileMedium'
import StoreSearchCategorySelector from '@/components/StoreSearchCategorySelector'
import StoreSearchButtonMoreResults from '@/components/StoreSearchButtonMoreResults'

export default {
  components: {
    PwaTileMedium,
    StoreSearchCategorySelector,
    StoreSearchButtonMoreResults,
  },
  computed: {
    searchResults: function() {
      return this.$store.getters.getSearchResults
    },
    hasMoreResults: function() {
      return !!this.$store.getters.getLastSearchResultKey
    },
  },
}
</script>

<style scoped>
.results {
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>
