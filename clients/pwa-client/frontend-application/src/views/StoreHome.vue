<template>
  <section class="section pt-4">
    <div class="container is-flex v-center-content">
      <h1 class="title is-1">{{ '\{\{ logo \}\}' }}</h1>
      <div class="results is-flex is-full-width">
        <PwaTileMedium v-for="pwa in homePwaList" :key="pwa.id" :pwa="pwa" class="mb-2 mx-1" />
      </div>
    </div>
  </section>
</template>

<script>
import PwaTileMedium from '@/components/PwaTileMedium'
import PwaTileSmall from '@/components/PwaTileSmall'
import PwaCarousel from '@/components/PwaCarousel'

export default {
  components: {
    PwaTileMedium,
  },
  computed: {
    homePwaList: function() {
      return this.$store.getters.getHomePwaList
    },
  },
  mounted() {
    this.$store.dispatch('loadHomePwaList')
  },
}
</script>

<style scoped>
.results {
  justify-content: space-evenly;
  flex-wrap: wrap;
}
</style>
